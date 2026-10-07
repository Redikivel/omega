# Omega

Monorepo for the Omega ecosystem. Everything is deployed as **one** Vercel project from the repository root.

| Path | Content | Served at |
|------|---------|-----------|
| `index.html`, `404.html`, `hub/` | Hub landing page and not-found page | `/` |
| `apps/cv/` | Omega CV | `/cv/` |
| `apps/garden/` | Omega Garden | `/garden/` |
| `api/` | Serverless Python functions (Vercel only detects them in the root) | `/api/<name>/` |
| `shared/` | Assets shared across the hub and apps | `/shared/` |
| `impressum/`, `privacy/`, `terms/` | Legal pages (German, legally binding) | `/impressum/`, `/privacy/`, `/terms/` |

Routing is defined in `vercel.json`. `trailingSlash: true` is required because the apps use relative asset paths.

## Deploy

1. Create a Vercel project for this repository with the **repository root** as Root Directory (framework preset: Other).
2. Add the environment variable `GEMINI_API_KEY` (used by `api/generate.py`).

## Shared conventions

- `localStorage.omega_lang` holds the language chosen in the hub or any app.
- Every app links back to the hub via `href="/"`.
- No third-party requests on page load: fonts are self-hosted (`apps/garden/fonts/`), the hub and CV use system fonts.
  Anything that adds an external request (fonts, analytics, embeds, new APIs) must also be added to `privacy/index.html`.

## Legal pages

The texts are a starting point based on what the code actually does – not legal advice.
They state that Vercel hosts the site and that CV uses the free Gemini tier; update `privacy/index.html`
when either changes (e.g. moving to self-hosting or enabling Gemini billing).
The legal pages share the hub's topbar and footer; if those change in `index.html`, update the three pages as well.