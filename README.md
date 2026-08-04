# TaxMathKit

TaxMathKit is an English-language library of transparent tax calculators. The first release includes 12 focused tools for US federal income tax, paychecks, 1099 and self-employment income, quarterly payments, sales tax, reverse sales tax, capital gains, lottery winnings, California income tax, vehicle sales tax and VAT.

## Product principles

- Show the formula instead of hiding it behind a result.
- Attach primary tax-authority sources to each calculator.
- Name the tax year, assumptions and important exclusions.
- Keep calculator inputs in the browser and require no account.
- Treat results as educational planning estimates, never filing advice.

## Run locally

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run lint
npm test
```

The production build uses vinext for Cloudflare Workers-compatible output. Hosting configuration lives in `.openai/hosting.json`.

## Rate sources

Calculator pages link directly to the IRS, Social Security Administration, California Franchise Tax Board and European Commission materials used for their rate sets. See `/methodology` for calculation and maintenance conventions.

## Disclaimer

TaxMathKit is an independent educational project. It is not affiliated with any tax authority and does not provide tax, legal, accounting or financial advice.
