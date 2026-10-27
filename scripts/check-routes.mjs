import fs from "node:fs";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const localEnv = fs.existsSync(new URL("../.env.local", import.meta.url))
  ? fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
  : "";
const api =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  localEnv.match(/^NEXT_PUBLIC_API_BASE_URL=(.+)$/m)?.[1]?.trim();
if (!api)
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is required for real backend validation.",
  );
const json = async (pathname) =>
  (
    await fetch(`${api.replace(/\/$/, "")}/${pathname}`, {
      signal: AbortSignal.timeout(20000),
    })
  ).json();
const [videos, channels] = await Promise.all([
  json("landing/videos?page=1&per_page=25"),
  json("landing/channels?page=1"),
]);
const video = videos.data[0];
const channel = channels.data.find((item) => item.username);
const playlistIndex = await json("play-list/index?page=1");
const playlist = playlistIndex.data.find(
  (item) => item.is_public === true || item.is_public === 1,
);
const report = [];
async function check(pathname, expectations = {}) {
  const response = await fetch(base + pathname, {
    headers: { "User-Agent": "Googlebot" },
    signal: AbortSignal.timeout(120000),
  });
  const html = await response.text();
  const checks = {
    status: response.status === (expectations.status || 200),
    ...(expectations.text
      ? { serverContent: html.includes(expectations.text) }
      : {}),
    ...(expectations.canonical
      ? {
          canonical:
            html.includes('rel="canonical"') &&
            html.includes(expectations.canonical),
        }
      : {}),
    ...(expectations.noindex ? { noindex: /noindex/.test(html) } : {}),
    noServerError:
      !html.includes("NEXT_HTTP_ERROR_FALLBACK;500") &&
      !html.includes("Set NEXT_PUBLIC_API_BASE_URL"),
  };
  report.push({ path: pathname, status: response.status, checks });
  console.log(JSON.stringify(report.at(-1)));
  return html;
}
await check("/", { text: video.title, canonical: "/" });
await check(`/v/${video.id}`, {
  text: video.title,
  canonical: `/v/${video.id}`,
});
await check(`/${encodeURIComponent(channel.username)}`, {
  text: channel.name,
  canonical: channel.username,
});
if (playlist)
  await check(`/playlists/${playlist.id}`, {
    text: playlist.name,
    canonical: `/playlists/${playlist.id}`,
  });
await check(`/search/${encodeURIComponent(video.title.split(" ")[0])}`, {
  noindex: true,
});
await check("/login", { noindex: true });
const routes = JSON.parse(
  fs.readFileSync(new URL("../reports/routes.json", import.meta.url)),
);
for (const [route] of routes.filter(([route]) =>
  /^\/(dashboard|user-dashboard)/.test(route),
)) {
  await check(
    route.replace(":id", String(video.id)).replace(":playlistId", "1"),
    { noindex: true },
  );
}
await check("/v/999999999999", { status: 404, noindex: true });
await check("/migration-missing-channel-019292", {
  status: 404,
  noindex: true,
});
await check("/missing/nested/path", { status: 404, noindex: true });
await check("/robots.txt", { text: "Disallow: /dashboard" });
await check("/manifest.webmanifest", { text: "اربعین تی وی" });
await check("/sitemap.xml", { text: `/v/${video.id}` });
fs.writeFileSync(
  new URL("../reports/routes-validation.json", import.meta.url),
  JSON.stringify(report, null, 2),
);
if (report.some((row) => Object.values(row.checks).some((ok) => !ok)))
  process.exitCode = 1;
