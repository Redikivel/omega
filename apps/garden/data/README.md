# Omega Garden – Pflanzenkatalog (`plants.json`)

Eigener, lizenzfreier Katalog mit Gieß- und Lichtbedarf. Ersetzt Perenual als
primäre Datenquelle (Perenual Free liefert keine Gießdaten).

## Abdeckungsziel

95 % der Suchanfragen sollen einen Gießvorschlag liefern. Erreicht wird das
über drei Ebenen:

| Rang      | Zweck                                           | Beispiel              |
|-----------|--------------------------------------------------|-----------------------|
| `species` | Häufige Arten mit exakten Werten                 | `Monstera deliciosa`  |
| `genus`   | Rückfall für Sorten/seltene Arten einer Gattung  | `Philodendron`        |
| `family`  | Letzter Rückfall für sehr einheitliche Gruppen   | `Cactaceae`           |

Die 95 % sind eine Schätzung (Pflanzenbesitz folgt einer Long-Tail-Verteilung).
Messbar wird sie erst, wenn Suchanfragen ohne Katalogtreffer gezählt werden.

## Schema (v1)

| Feld             | Typ                     | Werte / Hinweis                                              |
|------------------|-------------------------|--------------------------------------------------------------|
| `id`             | string                  | Stabiler Slug des wissenschaftlichen Namens. Nie ändern.      |
| `rank`           | string                  | `species` \| `genus` \| `family`                              |
| `scientificName` | string                  | Aktuell akzeptierter Name                                     |
| `synonyms`       | string[] (optional)     | Alte/gebräuchliche Namen, z. B. `Sansevieria trifasciata`     |
| `family`         | string                  | Botanische Familie                                            |
| `names.de/en`    | string[]                | Trivialnamen, erster Eintrag = Anzeigename                    |
| `wateringNeed`   | string                  | `low` \| `medium` \| `high` (= `BASE_DECAY` in `app.js`)      |
| `lightNeed`      | string                  | `full sun` \| `part shade` \| `low light` (= `LIGHT_ADJ`)     |
| `winterRest`     | boolean                 | Im Winter weniger gießen (für spätere Saisonlogik)            |
| `type`           | string                  | z. B. `foliage`, `succulent`, `herb`, `orchid`                |
| `environment`    | string                  | `indoor` \| `outdoor` \| `both`                               |

Eine Zeile pro Eintrag, damit Git-Diffs lesbar bleiben.

## Geplanter Zugriff

- **Laden:** statische Datei, einmal per `fetch('/data/plants.json')` beim ersten
  Öffnen des Hinzufügen-Dialogs, danach im Speicher. ~78 KB roh, ~12 KB gzip,
  CDN- und Browser-Cache durch Vercel.
- **Index:** beim Laden pro Eintrag alle Namen normalisieren
  (Kleinschreibung, `ß→ss`, Akzente entfernen, `ae/oe/ue→a/o/u`).
- **Suche:** lineare Suche über alle Schlüssel mit Ranking
  exakt > Präfix > Wortanfang > enthält, danach `species` vor `genus` vor `family`.
  Gemessen < 1 ms pro Anfrage. Ein Trie/Suchindex lohnt sich erst bei > 10.000 Einträgen.
- **Sorten-Rückfall:** Kein Treffer bei `Philodendron Birkin` → erneut mit dem
  ersten Wort suchen → Gattung `Philodendron`.
- **Kein Treffer:** Hinweis „keine Pflegedaten" + Button „Eigene Pflanze anlegen";
  der Gießbedarf wird dann manuell gewählt (Pflicht). Eine externe API wird
  derzeit nicht verwendet; geplant ist später eine optionale KI-Suche.
- **Empfehlung:** Bei Katalogtreffern ist der Katalogwert vorausgewählt und mit
  „(empfohlen)" markiert, bleibt aber änderbar (auch im Bearbeiten-Dialog).
- **Referenz:** gespeicherte Pflanzen speichern `catalogId` (= `id`),
  `wateringSource` und `lightSource` (`catalog` = Empfehlung übernommen,
  `user` = eigene Wahl, `null` = nicht gesetzt). Katalogfakten wie `family`,
  `environment` und `winterRest` werden in der Detailansicht über `catalogId`
  nachgeschlagen statt kopiert, damit Katalogkorrekturen und
  Sensor-Schwellwerte zugeordnet werden können. `loadCatalog()` füllt dafür
  zusätzlich die Map `catalogById`, weil der Jahreszeit-Faktor `winterRest`
  synchron in jedem Render braucht.

## Jahreszeit-Faktor

`winterRest` ist seit der Pflege-Historie nicht mehr nur Anzeige, sondern
steuert die Gießrate: `getDailyDecay()` multipliziert den Grundwert mit einem
Monatsfaktor (`SEASON_FACTOR` in `app.js`). Pflanzen mit `winterRest: true`
werden im Winter stärker gedrosselt (bis 0,60) als immergrüne (bis 0,85).

**Bekannte Einschränkung:** Die Faktoren gehen von der **Nordhalbkugel** aus.
Für die Südhalbkugel müsste der Monatsindex um 6 verschoben werden – das
erfordert eine Ortsangabe pro Nutzer und ist bewusst offen gelassen.

## Pflege-Historie (`localStorage`)

Gießvorgänge liegen seit `schemaVersion: 2` in einem eigenen Top-Level-Array,
getrennt von den Pflanzen – analog zu einer späteren `care_events`-Tabelle:

```json
{ "schemaVersion": 2, "lang": "de", "plants": [ … ],
  "careEvents": [ { "id": "…", "plantId": "…", "type": "water", "at": "ISO" } ] }
```

- `type` ist von Anfang an vorhanden, damit `fertilize`/`repot` später ohne
  Schema-Änderung passen. Sensor-Messwerte kämen in ein **eigenes** Array.
- `plant.lastWateredAt` bleibt als Cache bestehen, weil `getCurrentWaterLevel()`
  für jede Pflanze bei jedem Render läuft; die Events sind die Quelle der
  Wahrheit und werden bei jedem Schreibvorgang gespiegelt.
- Die Migration von v1 legt pro Pflanze ein Event aus `lastWateredAt` an und
  sichert die Rohdaten vorher unter `omega_garden_v1_backup`.
- **Noch offen:** kein Pruning. ~85 Byte pro Event, 20 Pflanzen × 2×/Woche × 5
  Jahre ≈ 0,9 MB von ~5 MB Budget – unkritisch, aber vor einem Multi-User-Sync
  zu klären.

## Zukunft (Sensoren / Datenbank)

- Feuchte-Schwellwerte werden aus `wateringNeed` abgeleitet, nicht pro Pflanze
  gespeichert (keine doppelte Wahrheit).
- Bei einer Datenbank dient diese Datei als Seed für eine `plant_species`-Tabelle;
  die `id` bleibt der Schlüssel.

## Pflege

Werte basieren auf allgemein bekanntem Gärtnerwissen und sind Startwerte, keine
Messwerte. Daten aus Perenual oder anderen Katalogen nicht kopieren (Lizenz).
