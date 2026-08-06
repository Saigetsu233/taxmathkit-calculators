import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("four priority tools expose formula flows, actions, and embeds", async () => {
  for (const slug of ["income-tax-calculator", "1099-tax-calculator", "self-employment-tax-calculator", "sales-tax-calculator"]) {
    const tool = await render(`/tools/${slug}`);
    assert.equal(tool.status, 200, slug);
    const html = await tool.text();
    assert.match(html, /formula-flow/, slug);
    assert.match(html, /Save inputs locally/, slug);
    assert.match(html, /Free to embed/, slug);
    const embed = await render(`/embed/${slug}`);
    assert.equal(embed.status, 200, `embed ${slug}`);
    assert.match(await embed.text(), /Powered by TaxMathKit/, slug);
  }
});

test("resources, methodology, and version log render", async () => {
  const resources = await render("/resources");
  assert.equal(resources.status, 200);
  const resourceHtml = await resources.text();
  assert.match(resourceHtml, /federal-tax-brackets-2025-2026\.csv/);
  assert.match(resourceHtml, /us-state-sales-tax-official-links\.csv/);
  for (const [path, expected] of [["/methodology", "Source review ledger"], ["/changelog", "What changed"]]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(expected));
  }
});
