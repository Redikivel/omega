# Omega Garden: current-state report

> **Update:** The Perenual integration (`api/generate.py`, `vercel.json`) has since been removed. Plant search now runs fully client-side against the local catalog `data/plants.json` (see `data/README.md`); users can pick or override the watering need, with the catalog value marked as recommended. Sections below describing the API reflect the state at the time of the audit.

## Scope and evidence

This report describes the tracked code in `apps/garden` as it exists in this repository. The Garden app consists of `index.html`, `app.js`, `style.css`, `api/generate.py`, and `vercel.json`. No Garden-specific README, package manifest, dependency lockfile, database schema, migration, or test files are present in the tracked repository. The repository root `README.md` is empty. The separate `apps/cv` application is not part of Garden's implementation.

## 1. Current architecture

Garden is a single-page, browser-rendered application served as static files, with one Python serverless function for plant-catalogue search:

- `index.html` defines the single screen and its add/edit dialogs.
- `app.js` owns application state, rendering, local persistence, watering-status calculations, translations, and event handling.
- `style.css` contains the visual system, components, and responsive rules.
- `api/generate.py` calls the Perenual species-list API, maps the response to Garden's client-side shape, and returns JSON.
- `vercel.json` rewrites `/api/search` to `/api/generate`.

There is no client-side router, separate frontend build step, application server, or server-side plant store evidenced in the source. Plant data is read from and written to the browser's `localStorage`; the API is used only for plant search.

## 2. Technologies and frameworks

| Area | Evidence in the repository |
|---|---|
| Frontend | HTML, CSS, and vanilla JavaScript; no frontend framework or package manifest is present. |
| Backend/API | Python standard-library HTTP, JSON, URL, and environment-variable modules in `api/generate.py`; no third-party Python package imports are present. |
| Hosting/routing | Vercel-style Python function under `api/` and a Vercel rewrite in `vercel.json`. |
| External service | Perenual species-list API; the function reads `PERENUAL_API_KEY` from its environment. |
| External assets | Google Fonts (`DM Mono` and `Fraunces`) are loaded by the page. |

## 3. Existing pages and routes

- **`/`**: the only page, defined by `index.html`. It contains the dashboard, plant list, add-plant flow, and edit-plant dialog; there are no separate profile or history pages.
- **`/api/generate?q=<query>`**: the Python function's documented route; accepts GET and OPTIONS and requires a query of at least two characters.
- **`/api/search?q=<query>`**: the route called by the browser; Vercel rewrites it to `/api/generate`.

There is no implemented `/api/plant` route. The header comment in `app.js` mentions `/api/plant?id=…`, but neither a corresponding function nor a rewrite exists.

## 4. Existing components

The page's main UI consists of:

- Header, language selector, and add-plant action.
- “Today / needs watering” strip and count.
- Search field, all/needs-watering filters, plant-card grid, and empty state.
- Three-step add flow: catalogue search, selected-plant preview, and configuration (custom name, optional location, pot size).
- Edit dialog for custom name, location, pot size, and deletion.
- Live-region toast messages.

The cards and today strip are generated from JavaScript rather than separate component files. CSS supplies the card, water/status indicators, dialogs, buttons, toast, and mobile layouts.

## 5. Existing data models

There is no database-backed model or formal schema. The persisted value is a JSON object under the `omega_garden_v1` local-storage key, containing `plants` and `lang`.

A plant object is assembled in `confirmAddPlant()` and currently includes:

| Field | Purpose evidenced by use |
|---|---|
| `id` | Client-generated identifier. |
| `customName`, `species`, `scientificName`, `imageUrl` | User-facing name and catalogue information. |
| `location`, `potSize`, `wateringNeed`, `lightNeed` | Editable location/pot size and mapped care attributes used by the watering estimate. |
| `waterLevel`, `lastWateredAt` | Starting/current estimated water level and most recent watering time. |
| `addedAt`, `updatedAt` | Creation and last-update timestamps. |
| `temperature`, `humidity`, `soilType`, `growthRate`, `funFact` | Optional fields initialized from the catalogue result or set to `null`; no measurement or recommendation logic currently consumes them. |

The API response is a separate catalogue shape (`id`, `commonName`, `scientificName`, `imageUrl`, `wateringNeed`, `lightNeed`, and optional catalogue attributes), mapped from Perenual in `map_plant()`.

## 6. Current feature status

| Feature | Status from current code |
|---|---|
| Plant management | **Basic implementation:** add from catalogue, rename, edit location/pot size, and delete; records are device/browser-local. |
| Plant overview | **Implemented:** cards, search, due-status filter, water-level estimate, and empty state. |
| Plant profiles | **Partial:** catalogue identity and a few care/location fields appear on cards and in the edit dialog; no dedicated detail/profile view or broader care plan exists. |
| Watering reminders | **Partial:** a dashboard strip/filter flags plants below a heuristic level. No scheduled, push, email, or operating-system notification is implemented. |
| Care history | **Not implemented as history:** only the latest `lastWateredAt` is retained; watering overwrites it and no event list or history view exists. |
| Localization | **Implemented in the client:** translation dictionaries and a language selector are present for German, English, French, Spanish, Portuguese, Italian, Dutch, Polish, Japanese, and Chinese. |
| Accounts and cross-device sync | **Not present:** there are no user/account flows or remote plant records. |
| Analytics and personalized recommendations | **Not present** beyond the local heuristic status display. |
| Sensor support | **Not present:** no sensor registration, ingestion endpoint, measurement records, or hardware integration exists. |

The displayed water percentage is a time-based estimate, not a soil-moisture reading. `getDailyDecay()` applies constants based on catalogue watering need, mapped light, and pot size; `getCurrentWaterLevel()` reduces the stored starting level according to elapsed time since the last watering. The display is refreshed every minute.

## 7. Missing MVP features

Compared with the plant-management, overview, watering-reminder, care-history, and plant-profile goals:

- **Care history:** watering actions are not recorded as separate events, so users cannot inspect prior care.
- **Actionable reminders:** due plants are shown in the app, but there is no scheduled notification or reminder-delivery mechanism.
- **Complete plant profiles:** there is no dedicated profile/detail view or comprehensive editable care preferences.
- **Durable/shared data:** plants exist only in one browser's local storage and are not backed up or synchronized.
- **Transparent care guidance:** the app presents its time-decay estimate as a water level/status, but does not expose the estimate's heuristic basis or capture observed conditions.

Accounts, historical analytics, and notifications are later roadmap items in the project vision; their absence is not treated here as an MVP defect except where reminder delivery is specifically part of the MVP goal.

## 8. Technical debt

- **Responsibilities are concentrated in one large script.** `app.js` contains translations, persistence, watering calculations, HTML rendering, API integration, and modal/event behavior. A small separation by responsibility would improve testability without requiring a framework.
- **The data format has no explicit validation or migration.** The storage key is version-labelled, but loading accepts parsed `plants` values directly and no schema migration is defined.
- **Search error handling does not distinguish HTTP failure from an empty result.** The client parses JSON without checking `response.ok`; server errors that return `{plants: [], error: ...}` are shown as “no results.” The catch-path error text is also hard-coded in German.
- **Search requests can race.** A debounce limits request frequency, but earlier requests are not cancelled or checked against the latest query before results render.
- **Comments are stale.** The `app.js` header refers to a `/api/plant` route that is not implemented; the actual plant lookup call is only `/api/search`.
- **No automated test coverage or project test/build commands are present** in the tracked Garden files.
- **External dependencies affect core add flow.** Adding a plant requires a successful Perenual search and an API key configured in Vercel; there is no manual species-entry fallback.

## 9. Readiness for future sensor integration

**Current readiness: low at the data/integration layer, with a reasonable seam in the user-facing watering status.** The existing plant object contains optional environmental fields, but they are only initialized as empty/catalogue-derived values and are not sensor observations. The app has no sensor identity, plant-to-sensor relationship, timestamped measurements, ingestion path, or persisted backend. The estimated `waterLevel` is a client-side time calculation and must not be treated as measured moisture.

Sensor support does not need to block the MVP. To preserve a clean future path, keep manually recorded care events distinct from sensor measurements. When sensors are introduced, model sensor identity and time-stamped readings separately and associate them with a plant; do not overload `waterLevel` or the current catalogue fields to represent raw readings. A replaceable source for the current status/recommendation calculation would be a useful seam, but there is no need to build the sensor pipeline now.

## 10. Recommended next milestone

**Implement care history as a local-first MVP milestone.** Record each watering as a timestamped care event instead of only overwriting `lastWateredAt`, and expose that history in a simple plant detail/profile view. Keep the existing overview and due indicator working from the latest care event, and preserve browser-only operation so hardware, accounts, and a backend remain out of scope. This closes a stated MVP gap while establishing a sensor-agnostic care record that can later coexist with separate sensor measurements.

### Source references

- Page and UI structure: `apps/garden/index.html`
- State, persistence, watering estimate, and UI behavior: `apps/garden/app.js`
- Styling and responsive layouts: `apps/garden/style.css`
- Catalogue integration and response mapping: `apps/garden/api/generate.py`
- API rewrite: `apps/garden/vercel.json`
