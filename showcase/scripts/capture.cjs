/* eslint-disable @typescript-eslint/no-require-imports -- standalone Node capture tool, outside website runtime */
// Capture only: never changes website source or injects presentation content.
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/home/ridwan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright",
);
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const base = process.env.ORI_CAPTURE_URL || "http://localhost:3026";
const root = path.resolve(__dirname, "../public/media");
const only = process.env.ORI_CAPTURE_ONLY;
const report =
  only && fs.existsSync(root + "/capture-manifest.json")
    ? JSON.parse(fs.readFileSync(root + "/capture-manifest.json"))
    : {
        origin: base,
        capturedAt: new Date().toISOString(),
        checks: [],
        clips: [],
      };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function ready(p) {
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    scrollTo(0, 0);
  });
  await p
    .locator("img")
    .evaluateAll((es) =>
      Promise.all(es.map((e) => e.decode().catch(() => {}))),
    );
  await p.waitForTimeout(1100);
}
async function scroll(p, to, duration = 1800) {
  await p.evaluate(
    ({ to, duration }) =>
      new Promise((resolve) => {
        const start = scrollY,
          t0 = performance.now();
        function tick(t) {
          const x = Math.min(1, (t - t0) / duration);
          const ease = x * x * (3 - 2 * x);
          scrollTo(0, start + (to - start) * ease);
          if (x < 1) requestAnimationFrame(tick);
          else resolve();
        }
        requestAnimationFrame(tick);
      }),
    { to, duration },
  );
}
(async () => {
  fs.mkdirSync(root + "/stills", { recursive: true });
  fs.mkdirSync(root + "/raw", { recursive: true });
  const b = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
    headless: true,
  });
  // Verify all public routes, loaded fonts/images, real controls and motion.
  for (const width of only ? [] : [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 1000 },
      deviceScaleFactor: 2,
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    for (const route of ["", "services", "lookbook", "book"]) {
      assert.equal((await p.goto(base + "/" + route)).status(), 200);
      await ready(p);
      assert(
        await p.evaluate(
          () =>
            document.fonts.check("16px Manrope") &&
            document.fonts.check('48px "Instrument Serif"'),
        ),
      );
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert(
        await p
          .locator("img")
          .evaluateAll((es) =>
            es.every((e) => e.complete && e.naturalWidth > 0),
          ),
      );
      await p.screenshot({
        path: `${root}/stills/${route || "home"}-${width}.png`,
      });
      report.checks.push(
        `${route || "home"} at ${width}px: loaded fonts/images, no overflow`,
      );
    }
    await p.goto(base + "/lookbook");
    await ready(p);
    await p
      .getByRole("button", { name: "Natural Haircare", exact: true })
      .click();
    assert.equal(
      await p.locator('button[aria-labelledby^="look-"]').count(),
      1,
    );
    await p.getByRole("button", { name: "All", exact: true }).click();
    await p.locator('button[aria-labelledby^="look-"]').first().click();
    await p.locator("dialog[open]").waitFor();
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("dialog[open]").count(), 0);
    if (width === 390) {
      await p.getByRole("button", { name: "Menu", exact: true }).click();
      await p.keyboard.press("Escape");
      assert.equal(
        await p.locator("#mobile-navigation").evaluate((e) => e.open),
        false,
      );
    }
    assert.deepEqual(errors, []);
    await p.close();
  }
  async function record(name, viewport, route, prepare, action) {
    if (only && !only.split(",").includes(name)) return;
    const density = name === "booking-mobile" ? 2 : 1;
    const ctx = await b.newContext({
      viewport,
      deviceScaleFactor: density,
      recordVideo: { dir: root + "/raw", size: viewport },
    });
    const p = await ctx.newPage();
    await p.goto(base + route);
    await ready(p);
    if (prepare) await prepare(p);
    await sleep(300);
    const start = performance.now();
    await action(p);
    const activeSeconds = (performance.now() - start) / 1000;
    const video = p.video();
    await ctx.close();
    const output = root + "/raw/" + name + ".webm";
    await video.saveAs(output);
    await video.delete();
    report.clips = report.clips.filter((c) => c.name !== name);
    report.clips.push({
      name,
      route,
      viewport,
      activeSeconds,
      rawFile: "raw/" + name + ".webm",
      trimRule:
        "Use final activeSeconds of the raw recording; loading lead-in excluded in prepared clips.",
    });
    console.log("Captured", name, activeSeconds.toFixed(2) + "s");
  }
  await record(
    "home-desktop",
    { width: 1440, height: 1000 },
    "/",
    null,
    async (p) => {
      await sleep(1000);
      await scroll(p, 580, 3800);
      await sleep(1400);
    },
  );
  await record(
    "home-mobile",
    { width: 540, height: 1000 },
    "/",
    null,
    async (p) => {
      await sleep(800);
      await scroll(p, 620, 2800);
      await sleep(1200);
    },
  );
  await record(
    "services-desktop",
    { width: 1440, height: 1000 },
    "/services",
    async () => {
      await sleep(400);
    },
    async (p) => {
      await sleep(600);
      await scroll(p, 500, 1800);
      await sleep(900);
    },
  );
  await record(
    "lookbook-desktop",
    { width: 1440, height: 1000 },
    "/lookbook",
    async (p) => {
      await scroll(p, 470, 800);
      await sleep(400);
    },
    async (p) => {
      await sleep(800);
      await p
        .getByRole("button", { name: "Natural Haircare", exact: true })
        .click();
      await sleep(750);
      await p.getByRole("button", { name: "All", exact: true }).click();
      await sleep(550);
      await scroll(p, 800, 1000);
      await sleep(700);
    },
  );
  await record(
    "booking-mobile",
    { width: 390, height: 525 },
    "/book?service=knotless-braids",
    async (p) => {
      assert(await p.locator("input[value=knotless-braids]").isChecked());
      await p.getByRole("button", { name: "Continue", exact: true }).click();
      await p.evaluate(() =>
        scrollTo(
          0,
          document.querySelector("#booking-stage-title").getBoundingClientRect()
            .top +
            scrollY -
            32,
        ),
      );
    },
    async (p) => {
      await sleep(550);
      const date = p.getByLabel("Preferred date", { exact: true });
      const chosen = await date.getAttribute("min");
      await date.fill(chosen);
      await sleep(700);
      await p.getByRole("button", { name: "Continue", exact: true }).click();
      await p.evaluate(() =>
        scrollTo(
          0,
          document.querySelector("#booking-stage-title").getBoundingClientRect()
            .top +
            scrollY -
            32,
        ),
      );
      await sleep(650);
      await p.locator("input[value=afternoon]").check();
      await sleep(650);
      await p
        .getByRole("button", { name: "Review request", exact: true })
        .click();
      await p.evaluate(() =>
        scrollTo(
          0,
          document.querySelector("#booking-stage-title").getBoundingClientRect()
            .top +
            scrollY -
            32,
        ),
      );
      await sleep(1300);
      await p.screenshot({ path: root + "/stills/booking-review.png" });
      await p
        .getByRole("button", { name: "Complete demo", exact: true })
        .click();
      await p
        .getByText(
          "Demo complete — this was a preview. No appointment was booked.",
          { exact: true },
        )
        .waitFor();
      await p.evaluate(() =>
        scrollTo(
          0,
          document.querySelector("#booking-stage-title").getBoundingClientRect()
            .top +
            scrollY -
            32,
        ),
      );
      await sleep(1400);
      await p.screenshot({ path: root + "/stills/booking-complete.png" });
      report.checks.push(
        "Real booking service preselection/date/time/review/completion: no appointment booked",
      );
    },
  );
  await b.close();
  fs.writeFileSync(
    root + "/capture-manifest.json",
    JSON.stringify(report, null, 2),
  );
  console.log("Capture and verification complete");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
