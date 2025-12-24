# Banking App Frontend

Short instructions to run the project locally.

## Requirements
- Node.js v16+ (or compatible)
- npm (or yarn)

## Quick Start
1. Open a terminal and go to the project folder:

	cd ./frontend-oredata-demo-banking-app

2. Install dependencies:

```bash
npm install
```

3. Create environment file from the example and set your API URL:

```bash
cp .env.example .env
# then edit .env and set REACT_APP_API_BASE_URL
```

4. Start development server:

```bash
npm start
```

## Environment variables
- `REACT_APP_API_BASE_URL` — base URL for backend API (used in `src/api/axios.js`).

## Available scripts
- `npm start` — run development server
- `npm run build` — create production build
- `npm test` — run tests

## Notes
- The app reads the API base URL from `process.env.REACT_APP_API_BASE_URL`.
- If unauthorized responses occur, the app redirects to `/login` and clears auth state.

If you want, I can also add a `.env.local` to gitignore or commit a sample `.env.example` now.
