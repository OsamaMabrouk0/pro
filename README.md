# Portfolio website

This is a static HTML, CSS, and JavaScript project prepared for GitHub Pages. It does not need Node.js, a package manager, a build command, or a GitHub Actions workflow. The `.nojekyll` file disables Jekyll processing for this plain static project.

## Publish with GitHub Pages

1. Upload every file and folder in this project to the root of your GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the site (usually `main`) and the `/ (root)` folder, then save.
5. Open the Pages URL shown by GitHub after deployment.

All internal assets and application files use relative paths, so the site works on a project URL such as `https://username.github.io/repository/` as well as a custom domain.

## Change content

- Arabic and English text: `src/locales/ar.json` and `src/locales/en.json`.
- Social links, project links, and résumé URL: `src/data/site.json`.
- Theme colors, typography, and shared design tokens: `src/styles/tokens.css`.
- Layout, components, responsive rules, and animations: `src/styles/main.css`.
- Page interactions: `src/scripts/main.js` and `src/scripts/loader.js`.
- Profile image: `assets/images/profile.jpg`.

Keep the keys in the two locale files aligned when editing translations. External URLs should be changed only in `src/data/site.json`.

## Résumé file

The original HTML referenced a résumé hosted at another URL; the PDF was not part of the supplied file, so that original URL is preserved in `src/data/site.json` under `links.resume`. To host the PDF alongside this site, add it under `assets/documents/` and change that setting to `./assets/documents/your-file.pdf`.

## Preview locally

Open a terminal in the project folder and run one of these static servers:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Do not open `index.html` as a `file://` URL because browsers block `fetch()` of the JSON settings and locale files in that mode.
