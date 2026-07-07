# TBEC QMX — Project Brain

## Identity

- **Product:** TBEC QMX (Quantity Measurement & Exchange)
- **Org:** TBEC Engineering Group (Watsaba Boss / TBEC)
- **Purpose:** Multi-tenant enterprise B2B engineering SaaS for international-standard construction tender management, digital takeoff (SMM7 / CESMM4), and material rate syncing
- **URL concept:** `qmx.tbecgroup.org`
- **Design system:** "QuantifyPro" on Google Stitch (project ID `8908668467853350098`)

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2.10 |
| Rendering | Turbopack (App Router) | — |
| Language | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | v4 (`@theme inline`) |
| Fonts | Inter (UI) + JetBrains Mono (data) | via next/font/google |
| Icons | Material Symbols Outlined | CDN Google Fonts |
| Design MCP | `@_davideast/stitch-mcp` | npm proxy → `stitch.googleapis.com/mcp` |

## Critical Next.js 16 Deviations

1. `next/image` — `priority` prop **deprecated**; use `preload` instead
2. `@theme inline` block in CSS replaces `tailwind.config.js` extend
3. Check `node_modules/next/dist/docs/` before writing any code

## Project Structure

```
tbec-qmx/
├── app/
│   ├── (main)/                  # Route group: app shell (sidebar + header)
│   │   ├── layout.tsx           # Shared sidebar + header layout
│   │   ├── dashboard/page.tsx   # KPI cards + phase progress + recent table
│   │   ├── takeoff/page.tsx     # Blueprint viewer + measurement stream
│   │   ├── boq/page.tsx         # SMM7 bill items table + export
│   │   └── rates/page.tsx       # Material rate master with tabs
│   ├── globals.css              # Stitch design tokens (@theme inline)
│   ├── layout.tsx               # Root layout (Inter + JetBrains Mono + Material Symbols)
│   └── page.tsx                 # Landing page (4 module cards)
├── scripts/
│   ├── fetch-screens.ps1        # Fetch Stitch screen metadata
│   └── download-all.ps1         # Bulk download all 15 screens' HTML/screenshots
├── stitch-output/
│   └── code/                    # Downloaded Stitch screen files (HTML/PNG/JSON)
├── DESIGN.md                    # Stitch design system source of truth
├── AGENTS.md                    # Next.js 16 rules reminder
├── PROJECT_BRAIN.md             # ← YOU ARE HERE
├── opencode.json                # Stitch MCP server config
└── .env                         # STITCH_API_KEY (gitignored)
```

## Routes

| Path | Page | Stitch Reference | Key Features |
|---|---|---|---|
| `/` | Landing | — | 4 module cards + standards ref |
| `/dashboard` | Dashboard | `Multi-Tenant Dashboard & Phase Wizard`, `Master Project Dashboard` | KPI strip, phase progress bars, estimations table |
| `/takeoff` | Takeoff Canvas | `Interactive Takeoff Workspace`, `Interactive Takeoff Canvas` | Split pane: blueprint viewer + measurement stream; phase switcher |
| `/boq` | BoQ Generator | `Phase-Driven BoQ Generator`, `BoQ Generator` | SMM7 items table, KPI strip, grand total, export |
| `/rates` | Material Master | `Material Master Rate Database`, `Global Material Rate Master` | Category tabs, materials table, wastage coefficients |

## Design System (from Stitch)

**Palette (Material 3):**
- Primary/Container: #9d4300 / #f97316 (Construction Orange)
- Inverse-surface: #213145 (Industrial Slate — sidebar)
- Surface: #f8f9ff | Surface-container: #e5eeff | Surface-dim: #cbdbf5
- Secondary: #545f73 | Tertiary: #006591 (Technical Blue)
- Error: #ba1a1a | Outline: #8c7164 | Outline-variant: #e0c0b1

**Typography:**
- All UI: Inter
- Numerical data: JetBrains Mono
- display: 24px/32px/600/-0.02em | headline: 18px/24px/600/-0.01em
- body-lg: 14px/20px/400 | body-sm: 12px/16px/400
- label-caps: 11px/16px/700/0.05em | data-mono: 12px/16px/400

**Layout:**
- Sidebar: fixed 240px, inverse-surface bg, left orange border on active
- Header: 40px (h-10), surface-container-lowest
- Border radius: NONE (0px/rounded-none throughout — "sharp drafting aesthetic")
- Row height (tables): 32px with zebra striping

**Key patterns:**
- All corners sharp (rounded-none) — no rounded corners anywhere
- No shadows — depth via tonal layering and borders
- Sidebar nav: dark bg, 3px left border accent (primary-container) on active
- Data tables: sticky header, `bg-surface-dim` header, zebra rows, `h-8` rows
- KPI cards: border, 1px, flex-between layout, data-mono values
- Status badges: 9px label-caps uppercase with colored bg
- Phase progress: thin 8px bars, colored fill, grid layout

## Data Conventions

- Use **realistic engineering data** — no placeholders (SMM7/CESMM4 codes, concrete grades, etc.)
- Currency: USD ($)
- Wastage expressed as percentage
- Measurements: m, m², m³, t, kg, hr, day
- Bill codes follow SMM7 format: `E10.1`, `F10.111`, `D20.2`, etc.

## Stitch API

- **Endpoint:** `https://stitch.googleapis.com/mcp` (POST, JSON-RPC 2.0)
- **Auth:** `X-Goog-Api-Key` header
- **Project ID:** `8908668467853350098`
- **Screen download:** append `&key=<API_KEY>` to `downloadUrl`
- **Tools available:** `list_projects`, `get_screen`, `list_screens`
- **Config:** `opencode.json` (local MCP stdio proxy via `@_davideast/stitch-mcp`)

## Current State

- [x] Next.js scaffold + Stitch MCP connected
- [x] DESIGN.md extracted from Stitch
- [x] All 15 Stitch screens downloaded (HTML, PNG, JSON)
- [x] globals.css with full design tokens
- [x] Shared app shell (sidebar + header)
- [x] 4 route pages built (dashboard, takeoff, boq, rates)
- [x] Build passes cleanly (Next.js 16 static generation)
- [ ] Active nav state in sidebar (currently all hover-only, no JS for current route)
- [ ] Client-side navigation (currently `<a>` tags cause full reload)
- [ ] Responsive/mobile adaptation
- [ ] Real DWG/PDF upload for takeoff blueprint
- [ ] Live data persistence (DB, API)
- [ ] Authentication / tenant switching
- [ ] Dark mode toggle (design supports via `darkMode: "class"`)

## Key Files Reference

- `app/layout.tsx:15` — metadata title/description
- `app/globals.css:1-5` — `@theme inline` block start (colors/fonts/sizes)
- `app/(main)/layout.tsx:4-10` — nav items array
- `app/page.tsx:2-39` — landing page screens array
- `app/(main)/dashboard/page.tsx:1-5` — projects data array
- `app/(main)/takeoff/page.tsx:5-11` — measurements data array
- `app/(main)/boq/page.tsx:1-9` — boqItems data array
- `app/(main)/rates/page.tsx:6-16` — materials data array + `tabs` array

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm start            # Start production server
.\scripts\download-all.ps1 -ApiKey "<KEY>"   # Re-download Stitch screens
```
