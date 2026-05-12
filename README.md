# TSAT Calculator

A simple web app for calculating transferrin saturation (TSAT).

TSAT is calculated from:

```text
TSAT = Serum iron / TIBC x 100
```

The result is displayed as a percentage with one decimal place.

## Features

- Next.js App Router
- TypeScript
- Responsive UI for iPhone Safari
- Tap-friendly input fields
- Validation for empty, non-numeric, zero, and negative values
- Unit tests for TSAT calculation and validation

## Inputs

- Serum iron (ug/dL)
- TIBC (ug/dL)

## Local Development

Install project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in a browser.

## Verification

Run automated tests:

```bash
npm test
```

Run the production build:

```bash
npm run build
```

## Deployment

This project is ready to deploy on Vercel. Push a branch to GitHub and open a
pull request to generate a Vercel Preview deployment.
