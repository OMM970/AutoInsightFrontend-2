# AutoInsight

AI-powered used-car intelligence platform — frontend prototype.

Know the car before you buy it: search dealers, browse inventory, review AI-simulated
inspection data and maintenance predictions, estimate ownership cost, and track real
expenses against the estimate after purchase.

## Tech stack

- React + Vite
- Material UI (MUI)
- React Router
- Recharts
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/       Reusable UI building blocks (layout, cards, badges, charts)
  context/          AppContext — global expense/owned-car state (mock, in-memory)
  data/             Mock data: dealers, cars, inspection reports, AI predictions, expenses
  pages/            One component per route (Home, SearchShops, ShopListing, CarDetails,
                     Inspection, AIAnalysis, OwnershipCost, Dashboard, AddExpense)
  services/         Service layer — dealerService, vehicleService, inspectionService,
                     predictionService, expenseService. Each currently reads mock data
                     but is written so the internals can be swapped for real API calls
                     (e.g. `fetch('/api/dealers')`) without changing calling code.
  theme.js          MUI theme + design tokens (colors, type)
  utils/format.js   Currency/date/number formatting helpers
```

## Notes on mock data

- No backend or AI model is implemented. `services/predictionService.js` and
  `services/inspectionService.js` simulate network latency and return static,
  hand-authored data from `data/predictions.js` and `data/inspectionData.js`.
- `services/expenseService.js` keeps expenses in an in-memory array for the session,
  wired through `context/AppContext.jsx` so "Add Expense" updates the dashboard
  immediately, without persistence between reloads.
- Replacing mock data with a real backend should only require rewriting the bodies
  of the functions in `src/services/*`, since pages call the service layer rather
  than importing `src/data/*` directly (with the exception of the dashboard, which
  reads `getPrediction` directly for the predicted-vs-actual chart).

## Routes

| Route | Page |
|---|---|
| `/` | Home / landing |
| `/dealers` | Search dealers |
| `/dealers/:dealerId` | Dealer's car listing + filters |
| `/cars/:carId` | Car details |
| `/cars/:carId/inspection` | Inspection report |
| `/cars/:carId/ai-analysis` | AI vehicle assessment |
| `/cars/:carId/ownership-cost` | Ownership cost calculator |
| `/dashboard` | Customer dashboard (predicted vs actual, expense history, AI forecast) |
| `/dashboard/add-expense` | Add expense form |
