const key = "4ffb0640551f4b0d877560e095fa32f6";
const host = "taxmathkit.com";
const paths = [
  "",
  "/guides",
  "/methodology",
  "/tools/income-tax-calculator",
  "/tools/paycheck-tax-calculator",
  "/tools/sales-tax-calculator",
  "/tools/reverse-sales-tax-calculator",
  "/tools/capital-gains-tax-calculator",
  "/tools/lottery-tax-calculator",
  "/tools/california-tax-calculator",
  "/tools/self-employment-tax-calculator",
  "/tools/1099-tax-calculator",
  "/tools/quarterly-tax-calculator",
  "/tools/car-sales-tax-calculator",
  "/tools/vat-calculator",
];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: paths.map((path) => `https://${host}${path}`) }),
});

if (!response.ok) throw new Error(`IndexNow submission failed: ${response.status} ${await response.text()}`);
console.log(`IndexNow accepted ${paths.length} URLs (${response.status}).`);
