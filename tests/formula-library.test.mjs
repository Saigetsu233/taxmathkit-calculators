import assert from "node:assert/strict";
import test from "node:test";
import { calculate1099Tax, calculateFederalIncomeTax, calculateSalesTax, calculateSelfEmploymentTax } from "../formula-library/index.js";

test("standalone federal formula matches the 2026 single example", () => {
  const result = calculateFederalIncomeTax({ grossIncome: 85000 });
  assert.equal(result.taxableIncome, 68900);
  assert.equal(result.tax, 9870);
});

test("standalone self-employment formula uses the 92.35 percent base", () => {
  const result = calculateSelfEmploymentTax({ netProfit: 60000 });
  assert.equal(result.seBase, 55410);
  assert.equal(result.total, 8477.73);
});

test("1099 formula separates profit and tax layers", () => {
  const result = calculate1099Tax({ revenue: 90000, businessExpenses: 20000 });
  assert.equal(result.profit, 70000);
  assert.ok(result.incomeTax > 0 && result.selfEmployment.total > 0);
});

test("sales tax formula adds a caller-verified rate", () => {
  assert.deepEqual(calculateSalesTax({ preTaxPrice: 100, ratePercent: 8.25 }), { preTaxPrice: 100, tax: 8.25, total: 108.25 });
});
