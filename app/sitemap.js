import { channelDirectory, landingVideos, publicPlaylists } from '@/lib/public-api';
import { siteUrl } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export default async function sitemap() {
  const [channels, first, playlists] = await Promise.all([channelDirectory(), landingVideos(null), publicPlaylists()]);
  const videos = [...first.items];
  for (let start = 2; start <= first.totalPages; start += 4) {
    const pages = await Promise.all(Array.from({ length: Math.min(4, first.totalPages - start + 1) }, (_, i) => landingVideos(null, start + i)));
    for (const page of pages) videos.push(...page.items);
  }
  // Discover only genuinely public landing content; do not enumerate private endpoints.
  const paths = ['/', ...channels.filter(c => c.username || c.slug).map(c => `/${encodeURIComponent(c.username || c.slug)}`), ...videos.map(v => `/v/${encodeURIComponent(v.id)}`), ...playlists.map(p => `/playlists/${encodeURIComponent(p.id)}`)];
  return [...new Set(paths)].map(path => ({ url: new URL(path, siteUrl).href }));
}
