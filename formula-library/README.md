# TaxMathKit formula library

Dependency-free ES module formulas for the four priority public calculators:

- 2026 federal ordinary income tax;
- self-employment tax using the 92.35% base and 2026 Social Security wage base;
- combined 1099 profit, SE-tax, income-tax, and reserve planning;
- forward sales tax using a rate supplied and verified by the caller.

```js
import { calculateSelfEmploymentTax } from "./index.js";

const result = calculateSelfEmploymentTax({ netProfit: 60000 });
console.log(result.total);
```

These are educational planning formulas, not a tax return engine. See [TaxMathKit methodology](https://taxmathkit.com/methodology), [downloadable source tables](https://taxmathkit.com/resources), and the source links on each calculator before relying on a result.
