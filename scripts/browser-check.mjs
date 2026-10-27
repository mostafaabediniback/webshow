import fs from "node:fs";
import { chromium } from "playwright";

const root = new URL("../reports/browser/", import.meta.url);
fs.mkdirSync(root, { recursive: true });
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const report = {
  base,
  checks: [],
  consoleErrors: [],
  pageErrors: [],
  screenshots: [],
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  locale: "fa-IR",
  serviceWorkers: "block",
});
await context.addInitScript(() =>
  localStorage.setItem(
    "arbaeentv:pwa-install-preference",
    JSON.stringify({ never: true }),
  ),
);
const page = await context.newPage();
page.on("pageerror", (error) => report.pageErrors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") report.consoleErrors.push(message.text());
});
const check = (name, ok, detail) => {
  report.checks.push({ name, ok, ...(detail ? { detail } : {}) });
  console.log(JSON.stringify(report.checks.at(-1)));
};
const shot = async (name) => {
  await page.screenshot({
    path: new URL(name, root).pathname.replace(/^\/(\w:)/, "$1"),
    fullPage: false,
  });
  report.screenshots.push(name);
};
try {
  await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
  await page.locator("article").first().waitFor({ timeout: 20000 });
  check(
    "home shows real video cards",
    (await page.locator("article").count()) >= 1,
  );
  check("no nested anchors", (await page.locator("a a").count()) === 0);
  check(
    "RTL and Vazir font",
    (await page.locator("html").getAttribute("dir")) === "rtl" &&
      (await page
        .locator("body")
        .evaluate((e) => getComputedStyle(e).fontFamily.includes("Vazir"))),
  );
  await page.evaluate(() => document.fonts.ready);
  await shot("next-home-desktop.png");
  const videoHref = await page
    .locator("article a")
    .first()
    .getAttribute("href");
  const channelHref = await page
    .locator('article a[href]:not([href^="/v/"]):not([href="/"])')
    .first()
    .getAttribute("href");
  await page
    .getByRole("button", { name: "شرایط استفاده", exact: true })
    .click();
  check(
    "terms modal opens",
    await page
      .getByText("با استفاده از وب‌سایت و خدمات اربعین‌تی‌وی", { exact: false })
      .isVisible(),
  );
  await page.keyboard.press("Escape");
  check(
    "terms modal closes with Escape",
    (await page
      .getByText("با استفاده از وب‌سایت و خدمات اربعین‌تی‌وی", { exact: false })
      .count()) === 0,
  );
  const channels = page.locator('[aria-label="فهرست کانال‌ها"] > button');
  if ((await channels.count()) > 1) {
    await channels.nth(1).click();
    await page.waitForLoadState("networkidle");
    check(
      "channel filter shows selected banner",
      await page.getByText("نمایش ویدیوهای", { exact: false }).isVisible(),
    );
    await channels.first().click();
  }
  await page.goto(base + videoHref, { waitUntil: "networkidle" });
  check(
    "video heading and native player",
    !!(await page.locator("h1").textContent()) &&
      (await page.locator("video").count()) === 1,
  );
  check(
    "video source is populated",
    Boolean(await page.locator("video").getAttribute("src")),
  );
  const quality = page.getByRole("button", { name: /^\d+p$/ }).first();
  if (await quality.count()) {
    await quality.click();
    check(
      "quality selector opens",
      await page
        .getByRole("button", { name: "خودکار", exact: true })
        .isVisible(),
    );
    await page.getByRole("button", { name: "خودکار", exact: true }).click();
    check(
      "auto quality can be selected",
      await page.getByRole("button", { name: /^Auto/ }).isVisible(),
    );
  }
  await shot("next-video-desktop.png");
  if (channelHref) {
    await page.goto(base + channelHref, { waitUntil: "networkidle" });
    check(
      "channel opens by direct URL",
      !!(await page.locator("h1").textContent()),
    );
    await page.reload({ waitUntil: "networkidle" });
    check(
      "channel survives reload without navigation state",
      !!(await page.locator("h1").textContent()),
    );
    await shot("next-channel-desktop.png");
  }
  await page.goto(base + "/search/" + encodeURIComponent("مقاومت"), {
    waitUntil: "networkidle",
  });
  check(
    "search direct URL preserves parameter",
    (await page.locator("h1").textContent()).includes("مقاومت"),
    await page.locator("h1").textContent(),
  );
  await page.goto(base + "/login", { waitUntil: "networkidle" });
  check(
    "login renders form",
    (await page.locator('form input[type="password"]').count()) === 1,
  );
  await page.getByRole("button", { name: "ورود", exact: true }).click();
  check(
    "login validation rejects empty input",
    await page.getByText("شماره موبایل الزامی است").isVisible(),
  );
  await page
    .getByRole("button", { name: "ثبت‌نام در سامانه", exact: true })
    .click();
  check(
    "registration phone form renders",
    (await page.locator('form input[type="tel"]').count()) === 1,
  );
  await shot("next-register-desktop.png");
  const routes = JSON.parse(
    fs.readFileSync(new URL("../reports/routes.json", import.meta.url)),
  );
  for (const [route] of routes.filter(([route]) =>
    /^\/(dashboard|user-dashboard)/.test(route),
  )) {
    await page.goto(
      base + route.replace(":id", "915").replace(":playlistId", "1"),
      { waitUntil: "networkidle" },
    );
    await page.waitForURL("**/login", { timeout: 10000 });
    check(`guest redirect ${route}`, new URL(page.url()).pathname === "/login");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  check(
    "mobile has no horizontal overflow",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  );
  await shot("next-home-mobile.png");
  await page.getByRole("button", { name: "جستجو", exact: true }).click();
  check(
    "mobile search opens",
    (await page.locator("input").filter({ visible: true }).count()) > 0,
  );
  await page.goto(base + videoHref, { waitUntil: "networkidle" });
  check(
    "mobile video has no horizontal overflow",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  );
  await shot("next-video-mobile.png");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.locator("h3").first().waitFor({ timeout: 20000 });
  await page.evaluate(() => document.fonts.ready);
  await shot("original-home-desktop.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await shot("original-home-mobile.png");
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    serviceWorkers: "block",
  });
  const crawler = await noJs.newPage();
  for (const [path, selector] of [
    ["/", "article"],
    [videoHref, "video[src]"],
    [channelHref, "h1"],
    ["/playlists/15", "h1"],
  ]) {
    if (!path) continue;
    const response = await crawler.goto(base + path, {
      waitUntil: "load",
      timeout: 60000,
    });
    check(
      `crawlable without JavaScript ${path}`,
      response.status() === 200 &&
        (await crawler.locator(selector).count()) > 0,
    );
  }
  await noJs.close();
} catch (error) {
  check("browser workflow completed", false, error.stack);
} finally {
  await browser.close();
  report.pageErrors = [...new Set(report.pageErrors)];
  report.consoleErrors = [...new Set(report.consoleErrors)];
  fs.writeFileSync(
    new URL("../reports/browser-validation.json", import.meta.url),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify({
      pageErrors: report.pageErrors,
      consoleErrors: report.consoleErrors.slice(0, 12),
    }),
  );
  if (report.checks.some((check) => !check.ok) || report.pageErrors.length)
    process.exitCode = 1;
}
