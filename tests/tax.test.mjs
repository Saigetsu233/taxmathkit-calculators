import assert from "node:assert/strict";
import test from "node:test";
import { getGuidesForTool, guides } from "../app/lib/guides.ts";
import { estimateFederalIncome, longTermCapitalGainsTax, selfEmploymentTax } from "../app/lib/tax.ts";
import { getTool } from "../app/lib/tools.ts";

test("2026 single filer uses the published standard deduction and brackets", () => {
  const result = estimateFederalIncome({ grossIncome: 85_000, year: 2026, status: "single" });
  assert.equal(result.taxableIncome, 68_900);
  assert.equal(result.tax, 9_870);
  assert.equal(result.marginalRate, 0.22);
});

test("long-term capital gains stack above ordinary taxable income", () => {
  const result = longTermCapitalGainsTax({ ordinaryTaxableIncome: 40_000, gain: 20_000, year: 2026, status: "single" });
  assert.equal(result.atZero, 9_450);
  assert.equal(result.atFifteen, 10_550);
  assert.equal(result.tax, 1_582.5);
});

test("self-employment tax uses 92.35 percent and excludes additional Medicare from the half deduction", () => {
  const result = selfEmploymentTax(300_000, 0, "single");
  assert.equal(result.seBase, 277_050);
  assert.equal(result.deductibleHalf, (result.socialSecurity + result.medicare) / 2);
  assert.ok(result.additionalMedicare > 0);
});

test("three priority clusters contain four distinct, source-backed guides each", () => {
  assert.equal(guides.length, 12);
  assert.equal(new Set(guides.map((guide) => guide.slug)).size, guides.length);
  for (const category of ["Federal income", "1099 & self-employment", "Sales tax"]) {
    const cluster = guides.filter((guide) => guide.category === category);
    assert.equal(cluster.length, 4, category);
    assert.equal(new Set(cluster.map((guide) => guide.intent)).size, 4, category);
    assert.ok(cluster.every((guide) => guide.sections.length >= 3 && guide.sources.length >= 2), category);
  }
});

test("priority tools expose worked examples, error checks, and guide links", () => {
  for (const slug of ["income-tax-calculator", "1099-tax-calculator", "self-employment-tax-calculator", "sales-tax-calculator"]) {
    const tool = getTool(slug);
    assert.ok(tool?.workedExample, slug);
    assert.ok((tool?.commonMistakes?.length ?? 0) >= 4, slug);
    assert.equal(getGuidesForTool(slug).length, 4, slug);
  }
});
