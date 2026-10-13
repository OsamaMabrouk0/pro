const r=document.documentElement,$=id=>document.getElementById(id);
const scriptUrl=document.currentScript.src;
const dataUrl=name=>new URL('../'+name,scriptUrl);
const storageGet=key=>{try{return localStorage.getItem(key)}catch(e){return null}};
const storageSet=(key,value)=>{try{localStorage.setItem(key,value)}catch(e){}};
let siteConfig=null,currentLocale=null;
const interpolate=value=>value.replace(/\{year\}/g,String(new Date().getFullYear()));
function applyLocale(locale){currentLocale=locale;r.lang=locale.meta.lang;r.dir=locale.meta.dir;document.title=locale.meta.title;window.__localeStrings=locale.strings;document.querySelectorAll('[data-i18n]').forEach(el=>{const value=locale.strings[el.dataset.i18n];if(typeof value==='string')el.textContent=interpolate(value)});document.querySelectorAll('[data-i18n-aria-label]').forEach(el=>{const value=locale.attributes[el.dataset.i18nAriaLabel];if(typeof value==='string')el.setAttribute('aria-label',value)});document.querySelectorAll('[data-i18n-alt]').forEach(el=>{const value=locale.attributes[el.dataset.i18nAlt];if(typeof value==='string')el.setAttribute('alt',value)});const status=$('lds');if(status&&window.__loaderStatus)status.textContent=locale.strings[window.__loaderStatus]||window.__loaderStatus;if(window.__measureLoader)window.__measureLoader();}
function hydrateLinks(config){document.querySelectorAll('[data-link]').forEach(el=>{const value=config.links[el.dataset.link];if(value){el.href=value}else{el.removeAttribute('href');el.setAttribute('aria-disabled','true')}});const image=document.querySelector('.fig img');if(image&&config.site.profileImage)image.src=config.site.profileImage}
async function fetchLocale(language){const response=await fetch(dataUrl('locales/'+language+'.json'));if(!response.ok)throw new Error('Unable to load locale '+language);return response.json()}
async function boot(){try{siteConfig=await (await fetch(dataUrl('data/site.json')).then(response=>{if(!response.ok)throw new Error('Unable to load site settings');return response})).json();const saved=storageGet(siteConfig.site.languageStorageKey);let language=saved||siteConfig.site.defaultLanguage;let locale;try{locale=await fetchLocale(language)}catch(e){language='ar';locale=await fetchLocale('ar')}hydrateLinks(siteConfig);applyLocale(locale);if(window.__resolveContent)window.__resolveContent();initApp(siteConfig)}catch(error){const label=$('lds');if(label)label.textContent='CONTENT LOAD ERROR';if(window.__resolveContent)window.__resolveContent();console.error(error)}}

function initApp(config){
const storedTheme=storageGet(config.site.themeStorageKey);if(storedTheme)r.dataset.theme=storedTheme
const isD=()=>r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
const sync=()=>$('th').setAttribute('aria-checked',String(isD()));
sync();matchMedia('(prefers-color-scheme:dark)').addEventListener('change',sync);
$('th').onclick=e=>{const n=isD()?'light':'dark';const apply=()=>{r.dataset.theme=n;sync();storageSet(config.site.themeStorageKey,n)};
if(!document.startViewTransition||matchMedia('(prefers-reduced-motion:reduce)').matches){apply();return}
const b=e.currentTarget.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
document.startViewTransition(apply).ready.then(()=>r.animate({clipPath:['circle(0 at '+x+'px '+y+'px)','circle('+R+'px at '+x+'px '+y+'px)']},{duration:750,easing:'cubic-bezier(.7,0,.2,1)',pseudoElement:'::view-transition-new(root)'}))};
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
const SC=['top','about','work','services','stack','contact'].map($),BA=[...document.querySelectorAll('.bn a')],MK=document.querySelector('.bn i');
const OFFS=()=>parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||84;
const PS=()=>{const mx=Math.max(0,document.documentElement.scrollHeight-innerHeight),o=OFFS(),P=SC.map(e=>Math.min(mx,Math.max(0,e.offsetTop-o)));for(let i=1;i<P.length;i++)if(P[i]<=P[i-1])P[i]=P[i-1]+1;return P};
const fOf=y=>{const P=PS();let q=0;while(q<5&&y>=P[q+1])q++;return q<5?q+Math.max(0,Math.min(1,(y-P[q])/Math.max(1,P[q+1]-P[q]))):5};
const goF=f=>{const P=PS(),i=Math.min(Math.floor(f),4);scrollTo({top:P[i]+(f-i)*(P[i+1]-P[i]),behavior:'instant'})};
const goTo=i=>{scrollTo({top:PS()[i],behavior:'smooth'})};
const upd=()=>{$('rm').style.top=(scrollY/Math.max(1,document.body.scrollHeight-innerHeight)*(innerHeight-6))+'px';const L=document.querySelectorAll('.rl a');if(document.body.dataset.v==='case'){BA.forEach(a=>a.classList.remove('on'));L.forEach(a=>a.classList.remove('on'));return}const f=fOf(scrollY),k=Math.round(f),RM=$('mk');BA.forEach((a,i)=>a.classList.toggle('on',i===k));L.forEach((a,j)=>a.classList.toggle('on',j===k));if(!window.DG){RM.style.setProperty('--f',f);MK.style.setProperty('--i',f)}RM.setAttribute('aria-valuenow',k)};
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
addEventListener('pointermove',e=>{$('cx').style.top=e.clientY+'px';$('cy').style.left=e.clientX+'px';const c=$('co');c.style.left=e.clientX+14+'px';c.style.top=e.clientY+14+'px';c.textContent=e.clientX+' , '+e.clientY});
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('details').forEach(o=>{if(o!==d)o.open=false})}));
(function(){const h=$('home'),c=$('case');function route(){const v=location.hash==='#case';c.hidden=!v;h.hidden=v;document.body.dataset.v=v?'case':'home';if(v){scrollTo(0,0)}else{const t=location.hash&&document.querySelector(location.hash);if(t)t.scrollIntoView()}upd()}addEventListener('hashchange',route);route()})();
document.querySelectorAll('.av').forEach(i=>i.src=document.querySelector('.fig img').src);
(function(){const mk=$('mk'),rl=mk.parentElement;let off=0,sx=0,moved=false,drag=false;
const getF=()=>parseFloat(mk.style.getPropertyValue('--f'))||0;
const fAt=x=>{const r=rl.getBoundingClientRect();const position=document.documentElement.dir==='rtl'?r.right-x:x-r.left;return Math.max(0,Math.min(5,position/r.width*6-off))};
mk.addEventListener('pointerdown',e=>{if(document.body.dataset.v==='case')return;const r=rl.getBoundingClientRect();off=((document.documentElement.dir==='rtl'?r.right-e.clientX:e.clientX-r.left)/r.width*6)-getF();sx=e.clientX;moved=false;drag=true;mk.setPointerCapture(e.pointerId);mk.classList.add('dg');window.DG=true;e.preventDefault()});
mk.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-sx)>5)moved=true;const f=fAt(e.clientX);mk.style.setProperty('--f',f);MK.style.setProperty('--i',f);goF(f)});
const end=()=>{if(!drag)return;drag=false;window.DG=false;mk.classList.remove('dg');if(!moved){const r=rl.getBoundingClientRect();goTo(Math.max(0,Math.min(5,Math.floor((document.documentElement.dir==='rtl'?r.right-sx:sx-r.left)/r.width*6))))}upd()};
mk.addEventListener('pointerup',end);mk.addEventListener('pointercancel',end);
mk.addEventListener('keydown',e=>{const k=Math.round(getF());let n=k;if(e.key==='ArrowLeft'||e.key==='ArrowDown')n=Math.min(5,k+1);else if(e.key==='ArrowRight'||e.key==='ArrowUp')n=Math.max(0,k-1);else if(e.key==='Home')n=0;else if(e.key==='End')n=5;else return;e.preventDefault();goTo(n)});
})();
(function(){const a=document.querySelector('.mkl');if(!a)return;const l2=a.querySelector('.l2'),m1=a.querySelector('.l1 b'),m2=l2.querySelector('b');
const apply=()=>{const t=l2.style.transition;l2.style.transition='none';l2.style.transform='none';const r1=m1.getBoundingClientRect(),r2=m2.getBoundingClientRect();a.style.setProperty('--sh',((r1.left+r1.width/2)-(r2.left+r2.width/2))+'px');l2.style.transform='';void l2.offsetWidth;l2.style.transition=t};
const go=()=>{apply();setTimeout(()=>l2.classList.add('on'),250)};(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{apply();if(window.__rdy)go();else addEventListener('rdy',go)});
addEventListener('resize',apply)})();
(function(){const mk=document.querySelector('.bn i');if(!mk)return;const bn=mk.parentElement,hm=$('mk');let off=0,sx=0,moved=false,last=0,drag=false;
const getF=()=>parseFloat(mk.style.getPropertyValue('--i'))||0;
const go=goF;
mk.addEventListener('pointerdown',e=>{if(document.body.dataset.v==='case')return;const r=bn.getBoundingClientRect(),c=getF();off=((document.documentElement.dir==='rtl'?r.right-e.clientX:e.clientX-r.left)/r.width*6)-c;sx=e.clientX;moved=false;last=Math.round(c);drag=true;mk.setPointerCapture(e.pointerId);mk.classList.add('dg');window.DG=true;e.preventDefault()});
mk.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-sx)>5)moved=true;const r=bn.getBoundingClientRect(),f=Math.max(0,Math.min(5,((document.documentElement.dir==='rtl'?r.right-e.clientX:e.clientX-r.left)/r.width*6)-off));mk.style.setProperty('--i',f);hm.style.setProperty('--f',f);go(f);const n=Math.round(f);if(n!==last){last=n;try{navigator.vibrate&&navigator.vibrate(6)}catch(_){}}});
const end=()=>{if(!drag)return;drag=false;window.DG=false;mk.classList.remove('dg');if(!moved){const r=bn.getBoundingClientRect();goTo(Math.max(0,Math.min(5,Math.floor((document.documentElement.dir==='rtl'?r.right-sx:sx-r.left)/r.width*6))))}upd()};
mk.addEventListener('pointerup',end);mk.addEventListener('pointercancel',end);
})();
document.addEventListener('click',e=>{const a=e.target.closest('.bn a,.rl a');if(!a||document.body.dataset.v==='case'||e.defaultPrevented)return;const i=[...a.parentElement.querySelectorAll(':scope>a')].indexOf(a);if(i<0)return;e.preventDefault();goTo(i)});
$('lang').addEventListener('click',async()=>{const next=currentLocale.meta.lang==='ar'?'en':'ar';try{const locale=await fetchLocale(next);applyLocale(locale);storageSet(config.site.languageStorageKey,next);upd()}catch(error){console.error(error)}});
$('rp').addEventListener('click',()=>{if(window.__ldReplay)window.__ldReplay()});
}
boot();
