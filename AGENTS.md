# Agent Notes

## Local GitHub Pages staging

For user-facing local staging of the built site, use the base-path-aware server:

```bash
npm run build:pages:local
npm run preview:pages
```

Open:

```text
http://127.0.0.1:4173/DepartmentofConsentGithubPages/
```

Do not use plain `npm run preview` for this staging view. Vite preview serves
static assets from `/assets/...`, but the GitHub Pages build emits HTML that
expects `/DepartmentofConsentGithubPages/assets/...`. The result is an HTML page
with missing CSS and images.

More detail: [docs/local-staging.md](docs/local-staging.md).
