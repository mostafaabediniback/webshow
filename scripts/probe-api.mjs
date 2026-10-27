import fs from "node:fs";
const env = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const base = env.match(/^NEXT_PUBLIC_API_BASE_URL=(.+)$/m)[1].trim();
const get = async (pathname) => {
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/${pathname}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    console.log(
      JSON.stringify({
        path: pathname,
        status: response.status,
        keys: Object.keys(data),
        itemKeys: Object.keys(data?.data?.[0] || data?.data?.data?.[0] || {}),
      }),
    );
    return data;
  } catch (error) {
    console.log(
      JSON.stringify({
        path: pathname,
        error: error.message,
        cause: error.cause?.code,
      }),
    );
  }
};
const [channels, videos] = await Promise.all([
  get("landing/channels?page=1"),
  get("landing/videos?page=1&per_page=25"),
]);
const channel = channels?.data?.[0] || channels?.data?.data?.[0];
const video = videos?.data?.[0] || videos?.data?.data?.[0];
if (channel) await get(`channel/show/${channel.id}`);
if (video) await get(`video/show/${video.id}`);
