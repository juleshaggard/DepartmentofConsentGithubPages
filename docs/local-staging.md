# Local Staging

This project is deployed to GitHub Pages under the base path:

```text
/DepartmentofConsentGithubPages/
```

That base path matters in local staging. The built HTML points CSS, JS, and
image URLs at paths like:

```text
/DepartmentofConsentGithubPages/assets/styles-xxxxx.css
```

Plain Vite preview does not serve those files at the base path in this setup.
It can show the HTML while the CSS request returns the app's 404 page, which
makes the preview look unstyled.

## Correct Preview Flow

```bash
npm run local:staging
```

That command does two things:

```bash
npm run build:pages:local
npm run preview:pages
```

Then open:

```text
http://127.0.0.1:4173/DepartmentofConsentGithubPages/
```

Optional port override:

```bash
PORT=4174 npm run preview:pages
```

If you already have a server running and only changed code, rebuild the local
staging output first:

```bash
npm run build:pages:local
```

Then refresh the browser.

## Verification

Check the page:

```bash
curl -I http://127.0.0.1:4173/DepartmentofConsentGithubPages/
```

Check the stylesheet. Replace the filename with the current build output from
`dist/client/assets`:

```bash
css_file=$(basename "$(ls dist/client/assets/styles-*.css | head -1)")
curl -I "http://127.0.0.1:4173/DepartmentofConsentGithubPages/assets/$css_file"
```

The stylesheet response must be:

```text
HTTP/1.1 200 OK
Content-Type: text/css; charset=utf-8
```

If it returns `404` or `text/html`, the preview server is wrong and the browser
will not show the styled site.

The preview server also checks `dist/client/index.html` before serving. If the
HTML was built for the custom-domain root path (`/`) but the preview is running
under `/DepartmentofConsentGithubPages/`, it exits with instructions instead of
serving a blank hydrated app.

## What Not To Do

Do not use the production custom-domain build for local staging:

```bash
npm run build:pages
```

That command is for deployment to `https://departmentofconsent.com/`, where the
asset and router base path is `/`. Local staging at
`/DepartmentofConsentGithubPages/` needs:

```bash
npm run build:pages:local
```

Do not use this for GitHub Pages staging:

```bash
npm run preview
```

That command is useful for a normal Vite root build, but it is misleading for
this repository's GitHub Pages output because the generated asset URLs include
the `/DepartmentofConsentGithubPages/` prefix.
