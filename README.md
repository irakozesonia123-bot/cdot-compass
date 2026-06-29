# CDOT Compass

A career‑discovery prototype designed to help interns explore divisions, projects, mentors, resources, events, and career pathways across CDOT — in one place, in minutes instead of weeks.

## 🚀 Live Demo

**→ [cdot-compass.vercel.app](https://cdot-compass.vercel.app)**

No sign‑in required — open the link and start exploring.

---

> **Disclaimer:** CDOT Compass is an independent **Innovation Challenge prototype** created during a summer internship. It is **not an official CDOT product**. All employee profiles, project records, resources, events, and recommendations shown in the prototype are **fictional / representative sample data** for demonstration purposes only.

---

## Why I built this

During my internship, I noticed that many valuable opportunities already existed across CDOT — coffee chats, mentors, divisions, projects, events — but they were often difficult for interns to discover unless they knew where to look or who to ask. CDOT Compass doesn't create new programs; it makes the opportunities that already exist **visible, searchable, and easy to act on**.

## Features

- **Dashboard** — a personalized home base (recommendations, recently viewed, saved items, progress)
- **Explore Divisions** + **Division detail** pages
- **People Directory** + **Employee Profiles**
- **Project Explorer** + **Project detail** (cross‑division collaboration, phase tracking)
- **Resources**, **Events** (with calendar export), and **Employee Spotlights**
- **Compass Guide** — a career‑discovery questionnaire with explainable recommendations + a Career Path Explorer
- **Coffee Chat** and **Job Shadow** demo flows (with a copy‑ready outreach message)
- **Global search** (⌘K), **notification center**, **saved items**, **profile**, and an **Executive Impact** page

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router · local JSON data. Front‑end only — no backend, authentication, or external APIs; the app runs fully offline.

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**.

Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # TypeScript, no emit
```

## Suggested demo path

Dashboard → Explore → a Division → People → an Employee Profile → Request Coffee Chat → Projects → Compass Guide → personalized Results → Executive Impact / Spotlights.

## Screenshots

| Dashboard | Explore Divisions |
| --- | --- |
| ![Dashboard](docs/screenshots/01-dashboard.png) | ![Explore Divisions](docs/screenshots/02-explore-divisions.png) |

| Project detail | Employee profile |
| --- | --- |
| ![Project detail](docs/screenshots/05-project-detail.png) | ![Employee profile](docs/screenshots/04-employee-profile.png) |

| Compass Guide | Executive Impact |
| --- | --- |
| ![Compass Guide](docs/screenshots/06-compass-guide.png) | ![Executive Impact](docs/screenshots/07-executive-impact.png) |

| Global search (⌘K) | Coffee chat |
| --- | --- |
| ![Global search](docs/screenshots/09-global-search.png) | ![Coffee chat](docs/screenshots/08-coffee-chat.png) |

## Project structure

```
src/
  components/   reusable UI (common, layout, navigation, division, employee, project, …)
  pages/        one component per route
  layouts/      app shell
  hooks/        bookmarks, recently viewed, notifications, demo actions
  utils/        data loaders, search, filtering, recommendations
  config/       navigation, accents, intern profile, notifications
  data/         local JSON sample data (fictional)
  assets/       bundled imagery
scripts/        seed-data generator + screenshot helper (dev only)
```

## Notes

- **Not deployed.** This repository is shared for code review and local demonstration. It is intentionally **not hosted publicly** so it can't be mistaken for an official CDOT service.
- **All data is fictional.** Sample employees, projects, and content were generated for the prototype.
- **Imagery:** royalty‑free transportation photos (Unsplash) bundled locally; avatars are placeholder/illustration sources. The CDOT‑styled mark is an original, stylized prototype logo — not the official CDOT logo asset.

---

*Independent Innovation Challenge prototype. Not affiliated with or endorsed by the Colorado Department of Transportation.*
