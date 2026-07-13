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
npm run build:pages
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

## What Not To Do

Do not use this for GitHub Pages staging:

```bash
npm run preview
```

That command is useful for a normal Vite root build, but it is misleading for
this repository's GitHub Pages output because the generated asset URLs include
the `/DepartmentofConsentGithubPages/` prefix.
