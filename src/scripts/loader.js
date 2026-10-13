(function(){var ld=document.getElementById('ld'),H=document.documentElement,pp=document.getElementById('ldp'),ls=document.getElementById('lds'),a2=ld.querySelector('.a2'),m1=ld.querySelector('.a1 b'),m2=a2.querySelector('b');
var p=0,target=12,done=false,exiting=false,t0=Date.now(),raf=0,tmr=[];var contentReady=new Promise(function(resolve){window.__resolveContent=resolve});window.__loaderStatus='loader_loading_fonts';H.classList.add('ld');
function set(v){p=v;ld.style.setProperty('--p',v);ld.style.setProperty('--q',v/100);pp.textContent=String(Math.round(v)).padStart(2,'0')}
function lab(t){window.__loaderStatus=t;var words=window.__localeStrings;ls.textContent=words&&words[t]||t}
function measure(){a2.style.transform='none';var r1=m1.getBoundingClientRect(),r2=m2.getBoundingClientRect();ld.style.setProperty('--sh',((r1.left+r1.width/2)-(r2.left+r2.width/2))+'px');a2.style.transform=''}
window.__measureLoader=measure;
function tick(){cancelAnimationFrame(raf);set(p+(target-p)*(done?.2:.07));if(done&&p>99.5){set(100);exit();return}raf=requestAnimationFrame(tick)}
function exit(){if(exiting)return;exiting=true;var q=Date.now()-t0<350;ld.classList.toggle('q',q);if(!q)ld.classList.add('lock');
tmr.push(setTimeout(function(){ld.classList.add('out');
tmr.push(setTimeout(function(){H.classList.remove('ld');H.classList.add('rdy');window.__rdy=true;dispatchEvent(new Event('rdy'))},q?60:260));
tmr.push(setTimeout(function(){ld.classList.add('gone');ld.classList.remove('out','lock','q')},q?520:980))},q?0:420))}
function finish(){if(done)return;done=true;lab('loader_ready');target=100;tick()}
var fonts=document.fonts&&document.fonts.load?Promise.all([document.fonts.load('700 1em "Reem Kufi"','أسامة مبروك'),document.fonts.load('300 1em "IBM Plex Sans Arabic"','أسامة'),document.fonts.load('400 1em "IBM Plex Mono"','OSAMA')]).catch(function(){}):Promise.resolve();
var loaded=new Promise(function(r){document.readyState==='complete'?r():addEventListener('load',r)});
document.addEventListener('DOMContentLoaded',function(){target=Math.max(target,45);measure()});
fonts.then(function(){target=Math.max(target,75);lab('loader_loading_page');measure()});
Promise.all([fonts,loaded,contentReady]).then(finish);setTimeout(finish,8000);
addEventListener('resize',measure);measure();tick();
window.__ldReplay=function(){tmr.forEach(clearTimeout);tmr=[];cancelAnimationFrame(raf);ld.classList.remove('gone','out','lock','q');H.classList.remove('rdy');H.classList.add('ld');done=false;exiting=false;t0=Date.now();set(0);target=12;lab('loader_loading_fonts');measure();tick();
tmr.push(setTimeout(function(){target=45},600));tmr.push(setTimeout(function(){target=75;lab('loader_loading_page')},1300));tmr.push(setTimeout(function(){finish()},2100))};
})();
