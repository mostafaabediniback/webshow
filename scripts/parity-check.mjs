import fs from 'node:fs';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';

// Run against a running Next server; optionally run the same public checks
// against the unmodified ZIP extracted and served separately with Vite.
const nextBase = process.env.TEST_BASE_URL || 'http://localhost:3000';
const referenceBase = process.env.REACT_BASE_URL;
const report = { checks: [], pageErrors: [], scope: 'Public live API reads; pagination failures and role checks use intercepted API fixtures.' };
const output = new URL('../reports/browser/', import.meta.url);
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const run = async (name, action) => {
  try { await action(); report.checks.push({ name, ok: true }); }
  catch (error) { report.checks.push({ name, ok: false, error: error.message }); }
  console.log(JSON.stringify(report.checks.at(-1)));
};
async function contextFor(base, options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'fa-IR', serviceWorkers: 'block', ...options });
  await context.addInitScript(origin => {
    if (location.origin === origin) localStorage.setItem('arbaeentv:pwa-install-preference', JSON.stringify({ never: true }));
  }, new URL(base).origin);
  context.on('page', page => page.on('pageerror', error => report.pageErrors.push({ base, message: error.message })));
  return context;
}
const go = (page, url) => page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
const videoLinks = page => page.locator('aside').getByRole('heading', { name: 'ویدیوهای مرتبط', exact: true }).locator('..').locator('a[href^="/v/"]');

async function publicChecks(base, label) {
  const context = await contextFor(base);
  const page = await context.newPage();
  let videoHref, channelHref;
  await run(`${label}: desktop channel arrows, wheel, edges and keyboard`, async () => {
    await go(page, base);
    const region = page.getByRole('region', { name: 'فهرست کانال‌ها' });
    await expect(region).toBeVisible();
    const left = page.getByRole('button', { name: 'اسکرول کانال‌ها به چپ', exact: true });
    const right = page.getByRole('button', { name: 'اسکرول کانال‌ها به راست', exact: true });
    await expect(left).toBeEnabled();
    await expect(right).toBeDisabled();
    await left.click();
    await expect.poll(() => region.evaluate(e => e.scrollLeft)).toBeLessThan(-100);
    await expect(right).toBeEnabled();
    const before = await region.evaluate(e => e.scrollLeft);
    await region.hover(); await page.mouse.wheel(0, 150);
    await expect.poll(() => region.evaluate(e => e.scrollLeft)).toBeLessThan(before - 50);
    await region.focus();
    const keyboardStart = await region.evaluate(e => e.scrollLeft);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => region.evaluate(e => e.scrollLeft)).toBeLessThan(keyboardStart);
    await region.evaluate(e => { e.scrollLeft = -e.scrollWidth; });
    await expect(left).toBeDisabled();
    await region.evaluate(e => { e.scrollLeft = 0; });
    await expect(right).toBeDisabled();
    videoHref = await page.locator('a[href^="/v/"]').first().getAttribute('href');
    channelHref = await page.locator('a[href]').filter({ has: page.locator('img[alt]') }).evaluateAll(es => es.map(e => e.getAttribute('href')).find(h => /^\/[^/]+$/.test(h) && h !== '/login'));
  });
  await run(`${label}: channel image filter and reset`, async () => {
    const region = page.getByRole('region', { name: 'فهرست کانال‌ها' });
    await region.locator('button').nth(2).locator('img').click();
    await expect(page.getByText('نمایش ویدیوهای', { exact: false })).toBeVisible();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('نمایش ویدیوهای', { exact: false })).toBeVisible();
    await region.locator('button').first().click();
    await expect(page.getByText('نمایش ویدیوهای', { exact: false })).toHaveCount(0);
  });
  await run(`${label}: home loads the next page on scroll`, async () => {
    await go(page, base);
    const count = await page.locator('a[href^="/v/"]').count();
    await page.getByText('برای بارگذاری ویدیوهای بیشتر اسکرول کنید.', { exact: true }).scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('a[href^="/v/"]').count(), { timeout: 30000 }).toBeGreaterThan(count);
  });
  await run(`${label}: related starts at five, expands by five and resets on navigation`, async () => {
    expect(videoHref).toBeTruthy();
    await go(page, base + videoHref);
    await expect(videoLinks(page)).toHaveCount(5, { timeout: 30000 });
    await expect(page.locator('footer')).toHaveCount(0);
    const more = page.getByRole('button', { name: 'نمایش بیشتر', exact: true });
    await more.click(); await expect(videoLinks(page)).toHaveCount(10);
    const hrefs = await videoLinks(page).evaluateAll(es => es.map(e => e.getAttribute('href')));
    expect(new Set(hrefs).size).toBe(hrefs.length); expect(hrefs).not.toContain(videoHref);
    await videoLinks(page).first().click();
    await expect(videoLinks(page)).toHaveCount(5, { timeout: 30000 });
    expect(new URL(page.url()).pathname).not.toBe(videoHref);
    await page.goBack({ waitUntil: 'networkidle' });
    await expect(videoLinks(page)).toHaveCount(10);
    await page.screenshot({ path: new URL(`${label}-video-desktop.png`, output).pathname.replace(/^\/(\w:)/, '$1') });
  });
  await run(`${label}: player quality and download menus`, async () => {
    await expect(page.locator('video')).toHaveAttribute('src', /.+/);
    const quality = page.getByRole('button', { name: /^\d+p$/ }).first();
    if (await quality.count()) {
      await quality.click(); await page.getByRole('button', { name: 'خودکار', exact: true }).click();
      await expect(page.getByRole('button', { name: /^Auto/ })).toBeVisible();
      await page.getByRole('button', { name: 'دانلود', exact: true }).click();
      await expect(page.getByRole('button', { name: /^\d+p$/ }).first()).toBeVisible();
      await page.locator('h1').click();
    }
  });
  if (label === 'next') {
    await run('next: channel direct URL and reload', async () => {
      expect(channelHref).toBeTruthy();
      await go(page, base + channelHref); await expect(page.locator('h1')).not.toBeEmpty();
      const title = await page.locator('h1').innerText();
      await page.reload({ waitUntil: 'networkidle' }); await expect(page.locator('h1')).toHaveText(title);
    });
    for (const query of ['مقاومت', 'کد%20', '50% تخفیف', 'a/b?x=1']) {
      await run(`next: search parameter preserved ${query}`, async () => {
        await go(page, base + '/search/' + encodeURIComponent(query));
        await expect(page.locator('h1')).toHaveText('نتایج جستجو: ' + query);
      });
    }
  }
  await run(`${label}: terms modal opens and closes`, async () => {
    await go(page, base);
    await page.getByRole('button', { name: 'شرایط استفاده', exact: true }).click();
    await expect(page.getByText('با استفاده از وب‌سایت و خدمات اربعین‌تی‌وی', { exact: false })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByText('با استفاده از وب‌سایت و خدمات اربعین‌تی‌وی', { exact: false })).toHaveCount(0);
  });
  await run(`${label}: login and registration validation`, async () => {
    await go(page, base + '/login');
    await page.getByRole('button', { name: 'ورود', exact: true }).click();
    await expect(page.getByText('شماره موبایل الزامی است')).toBeVisible();
    await page.getByRole('button', { name: 'ثبت‌نام در سامانه', exact: true }).click();
    await expect(page.locator('form input[type="tel"]')).toBeVisible();
  });
  await run(`${label}: mobile overflow, channel scroll and search`, async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await go(page, base);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const region = page.getByRole('region', { name: 'فهرست کانال‌ها' });
    await region.evaluate(e => { e.scrollLeft = -200; });
    await expect.poll(() => region.evaluate(e => e.scrollLeft)).toBeLessThan(-100);
    await page.getByRole('button', { name: 'جستجو', exact: true }).click();
    await expect(page.locator('input').filter({ visible: true }).first()).toBeVisible();
    await page.screenshot({ path: new URL(`${label}-home-mobile.png`, output).pathname.replace(/^\/(\w:)/, '$1') });
    await go(page, base + videoHref); await expect(videoLinks(page)).toHaveCount(5, { timeout: 30000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('footer')).toHaveCount(0);
  });
  await context.close();
  return videoHref;
}

async function filterRegression() {
  const context = await contextFor(nextBase); const page = await context.newPage();
  await run('next: infinite scroll reconnects after a loading filter replaces the list', async () => {
    await go(page, nextBase);
    const first = await page.locator('article').first().evaluate(e => ({ title: e.querySelector('h2').textContent, cover_link: e.querySelector('img').src }));
    const calls = [];
    await page.route('**/landing/videos?**', async route => {
      const url = new URL(route.request().url());
      if (!url.searchParams.has('channel_id')) return route.continue();
      const number = Number(url.searchParams.get('page') || 1); calls.push(number);
      // Force a loading render before the sentinel mounts, including a second
      // filter with the same hasNextPage value as the first.
      await new Promise(resolve => setTimeout(resolve, 250));
      await route.fulfill({ json: { data: Array.from({ length: number === 3 ? 5 : 25 }, (_, i) => ({ ...first, id: number * 10000 + i, title: `fixture-${number}-${i}` })), last_page: 3, total: 55 } });
    });
    for (const index of [1, 2]) {
      await page.getByRole('region', { name: 'فهرست کانال‌ها' }).locator('button').nth(index).click();
      await expect(page.locator('article')).toHaveCount(25);
      await page.getByText('برای بارگذاری ویدیوهای بیشتر اسکرول کنید.', { exact: true }).scrollIntoViewIfNeeded();
      await expect(page.locator('article')).toHaveCount(50, { timeout: 15000 });
      await page.getByText('برای بارگذاری ویدیوهای بیشتر اسکرول کنید.', { exact: true }).scrollIntoViewIfNeeded();
      await expect(page.locator('article')).toHaveCount(55, { timeout: 15000 });
      await expect(page.getByText('همه ویدیوها نمایش داده شدند.', { exact: true })).toBeVisible();
      await page.evaluate(() => scrollTo(0, 0));
    }
    expect(calls).toEqual([1, 2, 3, 1, 2, 3]);
  });
  await context.close();
}

async function relatedRegression(videoHref) {
  const context = await contextFor(nextBase); const page = await context.newPage();
  await run('next: related deduplicates, expands cached items, retries pagination and stops at the end', async () => {
    let failNext = true;
    const id = Number(videoHref.split('/').pop());
    const item = n => ({ id: n, title: `related-fixture-${n}`, cover_link: '/assets/img/cover.jpg' });
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (!/\/video\/\d+$/.test(url.pathname)) return route.continue();
      const number = Number(url.searchParams.get('page') || 1);
      expect(url.searchParams.get('per_page')).toBe('5');
      if (number === 2 && failNext) return route.fulfill({ status: 503, json: { message: 'fixture pagination failure' } });
      const items = number === 1
        ? [item(id), ...Array.from({ length: 24 }, (_, i) => item(20000 + i)), item(20000)]
        : [item(20023), ...Array.from({ length: 4 }, (_, i) => item(20024 + i))];
      return route.fulfill({ json: { data: items, last_page: 2, total: 31 } });
    });
    await go(page, nextBase + videoHref);
    await expect(videoLinks(page)).toHaveCount(5);
    for (const count of [10, 15, 20]) {
      await page.getByRole('button', { name: 'نمایش بیشتر', exact: true }).click();
      await expect(videoLinks(page)).toHaveCount(count);
    }
    await page.getByRole('button', { name: 'نمایش بیشتر', exact: true }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'دریافت ویدیوهای بیشتر' })).toBeVisible({ timeout: 20000 });
    await expect(videoLinks(page)).toHaveCount(24);
    failNext = false;
    await page.getByRole('button', { name: 'تلاش دوباره', exact: true }).click();
    await expect(videoLinks(page)).toHaveCount(25);
    await page.getByRole('button', { name: 'نمایش بیشتر', exact: true }).click();
    await expect(videoLinks(page)).toHaveCount(28);
    await expect(page.getByRole('button', { name: 'نمایش بیشتر', exact: true })).toHaveCount(0);
    const hrefs = await videoLinks(page).evaluateAll(es => es.map(e => e.getAttribute('href')));
    expect(new Set(hrefs).size).toBe(28); expect(hrefs).not.toContain(videoHref);
  });
  await context.close();
}

async function touchRegression() {
  const context = await contextFor(nextBase, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await run('next: mobile channel swipe uses native touch scrolling', async () => {
    await go(page, nextBase);
    const region = page.getByRole('region', { name: 'فهرست کانال‌ها' });
    const box = await region.boundingBox();
    const client = await context.newCDPSession(page);
    const y = box.y + box.height / 2;
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 90, y }] });
    for (let x = 110; x <= 310; x += 25) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
      await page.waitForTimeout(20);
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect.poll(() => region.evaluate(e => e.scrollLeft)).toBeLessThan(-100);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await client.detach();
  });
  await context.close();
}

async function roleChecks() {
  const routes = JSON.parse(fs.readFileSync(new URL('../reports/routes.json', import.meta.url)));
  const guest = await contextFor(nextBase); const guestPage = await guest.newPage();
  for (const [route] of routes.filter(([route]) => /^\/(dashboard|user-dashboard)/.test(route))) {
    await run(`next: guest guard ${route}`, async () => {
      await go(guestPage, nextBase + route.replace(':id', '1').replace(':playlistId', '1'));
      await expect(guestPage).toHaveURL(nextBase + '/login', { timeout: 15000 });
    });
  }
  await guest.close();
  for (const [role, paths] of [
    ['super_admin', ['/dashboard', '/dashboard/channels', '/dashboard/videos', '/dashboard/users', '/dashboard/categories', '/dashboard/upload', '/dashboard/videos/1', '/dashboard/playlists/1']],
    ['admin', ['/dashboard/user-videos', '/dashboard/user-upload', '/dashboard/settings']],
    ['user', ['/user-dashboard', '/user-dashboard/create-channel']],
  ]) {
    const context = await contextFor(nextBase);
    await context.addInitScript(({ role, origin }) => {
      if (location.origin !== origin) return;
      for (const [key, value] of Object.entries({ token: 'local-fixture-token', role, user_id: '1', channel_id: '1', name: 'کاربر آزمایشی' })) sessionStorage.setItem(key, value);
    }, { role, origin: new URL(nextBase).origin });
    // Every request bearing our synthetic session is intercepted locally.
    // This includes all writes; fixture credentials never reach the backend.
    await context.route('**/*', async route => {
      const request = route.request();
      if (!request.headers().authorization?.includes('local-fixture-token')) return route.continue();
      const pathname = new URL(request.url()).pathname;
      let data = [];
      if (/\/channel\/show(?:\/\d+)?$/.test(pathname)) data = { id: 1, name: 'کانال آزمایشی', username: 'fixture', socials: {}, image: '/assets/img/user.png' };
      if (/\/user\/me$/.test(pathname)) data = { id: 1, name: 'کاربر آزمایشی', role, channel_id: 1 };
      if (/\/play-list\/show\//.test(pathname)) data = { play_list: { id: 1, name: 'پلی‌لیست آزمایشی', is_public: 1 }, videos: [] };
      await route.fulfill({ json: { data, last_page: 1, current_page: 1, total: 0 } });
    });
    const page = await context.newPage();
    for (const path of paths) await run(`next: ${role} renders ${path} with API fixtures`, async () => {
      await go(page, nextBase + path);
      await expect(page).toHaveURL(nextBase + path);
      await expect(page.getByLabel('در حال بررسی نشست')).toHaveCount(0);
      await expect(page.locator('body')).not.toContainText('مشکلی پیش آمد');
      expect((await page.locator('body').innerText()).trim().length).toBeGreaterThan(30);
      if (path === '/dashboard/settings') {
        await page.getByRole('button', { name: 'تنظیمات شبکه‌های اجتماعی', exact: true }).click();
        await expect(page.locator('input').first()).toBeVisible();
        await page.getByRole('button', { name: 'تنظیمات کانال', exact: true }).click();
      }
    });
    await run(`next: ${role} restricted route redirects`, async () => {
      const target = role === 'user' ? '/user-dashboard' : role === 'admin' ? '/dashboard/user-videos' : '/dashboard';
      await go(page, nextBase + (role === 'super_admin' ? '/user-dashboard' : '/dashboard/channels'));
      await expect(page).toHaveURL(nextBase + target);
    });
    await context.close();
  }
}

async function playlistChecks() {
  const env = fs.existsSync(new URL('../.env.local', import.meta.url)) ? fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8') : '';
  const api = (process.env.NEXT_PUBLIC_API_BASE_URL || env.match(/^NEXT_PUBLIC_API_BASE_URL=(.+)$/m)?.[1]?.trim())?.replace(/\/$/, '');
  if (!api) throw new Error('Set NEXT_PUBLIC_API_BASE_URL to test public playlists.');
  const get = async pathname => (await fetch(api + pathname, { signal: AbortSignal.timeout(20000) })).json();
  const landing = await get('/landing/videos?page=1');
  let video;
  for (const item of landing.data) {
    const payload = await get('/video/show/' + item.id);
    if (payload.data?.playlists?.length) { video = payload.data; break; }
  }
  if (!video) {
    report.checks.push({ name: 'public playlist checks', ok: true, skipped: 'No video with an attached playlist in the first landing page.' });
    return;
  }
  for (const [base, label] of [[nextBase, 'next'], ...(referenceBase ? [[referenceBase, 'react']] : [])]) {
    const context = await contextFor(base); const page = await context.newPage();
    await run(`${label}: attached playlist loads, scrolls separately and opens another video`, async () => {
      await go(page, base + '/v/' + video.id);
      const panel = page.getByRole('region', { name: 'پلی‌لیست ویدیو', exact: true });
      await expect(panel).toBeVisible();
      const links = panel.locator('a[href^="/v/"]');
      await expect(links.first()).toBeVisible();
      const scroller = panel.locator('.overflow-y-auto');
      if (await scroller.evaluate(e => e.scrollHeight > e.clientHeight)) {
        await scroller.hover(); await page.mouse.wheel(0, 350);
        await expect.poll(() => scroller.evaluate(e => e.scrollTop)).toBeGreaterThan(0);
      }
      const href = await links.evaluateAll((es, id) => es.map(e => e.getAttribute('href')).find(h => h !== '/v/' + id), video.id);
      expect(href).toBeTruthy();
      await panel.locator(`a[href="${href}"]`).click();
      await expect(page).toHaveURL(base + href);
      await expect(page.locator('video')).toHaveAttribute('src', /.+/, { timeout: 30000 });
    });
    await run(`${label}: native player plays, pauses and seeks`, async () => {
      const player = page.locator('video');
      await expect.poll(() => player.evaluate(e => e.readyState), { timeout: 30000 }).toBeGreaterThan(1);
      await player.evaluate(e => e.play());
      await expect.poll(() => player.evaluate(e => e.currentTime), { timeout: 10000 }).toBeGreaterThan(0.2);
      await player.evaluate(e => e.pause());
      expect(await player.evaluate(e => e.paused)).toBe(true);
      const target = await player.evaluate(e => { const target = Math.min(5, e.duration / 3); e.currentTime = target; return target; });
      await expect.poll(() => player.evaluate(e => e.seeking), { timeout: 15000 }).toBe(false);
      expect(await player.evaluate(e => e.currentTime)).toBeCloseTo(target, 0);
    });
    await context.close();
  }
  const context = await contextFor(nextBase); const page = await context.newPage();
  await run('next: public playlist direct URL and reload', async () => {
    const first = video.playlists[0]; const id = typeof first === 'object' ? first.id : first;
    await go(page, nextBase + '/playlists/' + id);
    await expect(page.locator('h1')).not.toBeEmpty();
    await expect(page.locator('a[href^="/v/"]').first()).toBeVisible();
    const heading = await page.locator('h1').innerText();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toHaveText(heading);
  });
  await context.close();
}

try {
  if (process.env.PARITY_ONLY === 'playlists') {
    await playlistChecks();
  } else {
    if (referenceBase) await publicChecks(referenceBase, 'react');
    const videoHref = await publicChecks(nextBase, 'next');
    await filterRegression();
    await relatedRegression(videoHref);
    await touchRegression();
    await roleChecks();
    await playlistChecks();
  }
} finally {
  await browser.close();
  fs.writeFileSync(new URL(`../reports/parity${process.env.PARITY_ONLY === 'playlists' ? '-playlists' : ''}-validation.json`, import.meta.url), JSON.stringify(report, null, 2) + '\n');
  if (report.checks.some(check => !check.ok) || report.pageErrors.length) process.exitCode = 1;
}
