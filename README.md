# PlanHub — Usage-Based Pricing Prototype

A clickable prototype for user research (Micro Subs, Aug 2026). It presents **two pricing
concepts** for PlanHub that replace geography-based coverage with **metered project unlocks +
roam-anywhere access**, switchable by a feature flag.

- **Concept A — Monthly Subscription:** a set number of project unlocks each month ($99 / 10
  projects). Resets on the 1st; unused unlocks lapse; no top-ups.
- **Concept B — Prepaid Balance:** buy a balance of credits (from $99 / 10). Credits roll over,
  never expire, and you top up when you run low.

Both share the same finder, the same free "evaluation layer" on each project, and the same
one-unlock-reveals-everything paywall — so the only variable under test is the pricing model.

## Live demo

**https://czanck.github.io/planhub-pricing-prototype/**

Deployed automatically from `main` via GitHub Actions (see `.github/workflows/deploy.yml`).

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (the app is served under the `/planhub-pricing-prototype/` base path).

```bash
npm run build     # typecheck + production build to dist/
npm run preview   # preview the production build
```

## Using it in a session (for the moderator)

1. The **Start screen** (`/`) lets you pick Concept A or B before handing off.
2. A discreet **A · Subscription / B · Prepaid** toggle sits in the top bar — flip concepts
   anytime. Each concept keeps its **own** balance and unlocked-project set, so a participant can
   evaluate the same project fresh under each one (counterbalanced order).
3. The **Prototype settings** menu (top bar, "Research only") lets you:
   - jump the balance to **Normal / Low · 2 / Zero** (the "2 remaining" state matches the script),
   - **Simulate month reset** (Concept A),
   - **Reset session data** between participants, or go **Back to start**.

The scripted flow for each concept: view the offer (Membership) → purchase → see status → open a
project → read the free evaluation layer → **unlock** (spend) → see the full project → hit the
low / zero-balance state.

## Editing the numbers

All prices, plan sizes, packs, starting balances, and the "scripted 2 remaining" state live in one
file: **`src/config/pricing.ts`**. Company/user details are in `src/data/company.ts`; the ~24 mock
projects are in `src/data/projects.ts`.

## Tech

Vite + React + TypeScript + React Router (HashRouter) + Tailwind CSS v4. No backend — state is held
in React context and persisted to `localStorage`. All data is illustrative.

## Project structure

```
src/
  config/pricing.ts     tiers, packs, starting numbers  ← edit here
  context/              feature-flag + balance state (per-concept islands) + persistence
  data/                 mock projects + company
  layout/               app shell, sidebar, top bar, balance widget
  components/            unlock modal, project fit, market intel, nudges, researcher panel, …
  pages/                start, welcome/migration, finder, project, membership, purchase, unlocked
```
