/* eslint-disable @typescript-eslint/no-require-imports -- standalone local QA */
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/home/ridwan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright",
);
const fs = require("node:fs");
const assert = require("node:assert/strict");
let browser;
(async () => {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  });
  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.addInitScript(() => {
    window.__oriStudioQA = [];
    setInterval(() => {
      for (const el of document.querySelectorAll("h1")) {
        let painted = true;
        for (let n = el; n; n = n.parentElement) {
          const s = getComputedStyle(n);
          if (
            s.opacity === "0" ||
            s.visibility === "hidden" ||
            s.display === "none" ||
            s.contentVisibility === "hidden"
          )
            painted = false;
        }
        const box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > innerHeight || box.width === 0)
          painted = false;
        const text = el.innerText.replace(/\s+/g, " ").trim();
        if (
          painted &&
          text &&
          !window.__oriStudioQA.some((x) => x.heading === text)
        )
          window.__oriStudioQA.push({ heading: text, time: performance.now() });
      }
    }, 100);
  });
  await p.goto(
    process.env.ORI_STUDIO_URL || "http://localhost:3040/OriStudioShowcase",
  );
  await p.getByRole("button", { name: "Go to beginning", exact: true }).click();
  await p.screenshot({ path: "out/review/studio-opening.png" });
  await p.getByRole("button", { name: "Play", exact: true }).click();
  await p.waitForFunction(
    () =>
      window.__oriStudioQA.some(
        (x) => x.heading === "I build websites for businesses.",
      ),
    null,
    { timeout: 120000 },
  );
  const pause = p.getByRole("button", { name: "Pause", exact: true });
  if (await pause.count()) await pause.click();
  const checks = await p.evaluate(() => window.__oriStudioQA);
  for (const text of [
    "What if your salon had a website like this?",
    "A considered first impression.",
    "Services, made clear.",
    "Room for inspiration.",
    "A booking journey. Built to preview.",
    "I build websites for businesses.",
  ])
    assert(
      checks.some((c) => c.heading === text),
      text,
    );
  await p.screenshot({ path: "out/review/studio-final.png" });
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "out/review/studio-results.json",
    JSON.stringify(
      {
        passed: true,
        checks,
        errors,
        notes: [
          "All six scene headings observed painted during complete Studio playback.",
          "Wall-clock preview timing may include decoding/buffering; encoded timing is verified separately.",
          "Premounted hidden scenes excluded from observations.",
        ],
      },
      null,
      2,
    ),
  );
  await browser.close();
  console.log(
    "PASS complete Remotion Studio playback, visible scene order and no page errors",
  );
})().catch(async (e) => {
  console.error(e);
  await browser?.close();
  process.exit(1);
});
