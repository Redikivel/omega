# Omega

Monorepo for the Omega ecosystem. Everything is deployed as **one** Vercel project from the repository root.

| Path | Content | Served at |
|------|---------|-----------|
| `index.html`, `404.html`, `hub/` | Hub landing page and not-found page | `/` |
| `apps/cv/` | Omega CV | `/cv/` |
| `apps/garden/` | Omega Garden | `/garden/` |
| `api/` | Serverless Python functions (Vercel only detects them in the root) | `/api/<name>/` |
| `shared/` | Assets shared across the hub and apps | `/shared/` |

Routing is defined in `vercel.json`. `trailingSlash: true` is required because the apps use relative asset paths.

## Deploy

1. Create a Vercel project for this repository with the **repository root** as Root Directory (framework preset: Other).
2. Add the environment variable `GEMINI_API_KEY` (used by `api/generate.py`).

## Shared conventions

- `localStorage.omega_lang` holds the language chosen in the hub or any app.
- Every app links back to the hub via `href="/"`.