import 'server-only';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { normalizePaginatedResponse } from '@/utils/pagination';

export class BackendError extends Error {
  constructor(status, pathname) { super(`Backend request failed (${status}): ${pathname}`); this.status = status; }
}
// Anonymous requests only; never forward cookies or authorization.
export const publicRequest = cache(async (pathname) => {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error('Set NEXT_PUBLIC_API_BASE_URL in next/.env.local.');
  const url = new URL(pathname.replace(/^\//, ''), `${base.replace(/\/$/, '')}/`);
  const response = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store', signal: AbortSignal.timeout(15_000) });
  if (response.status === 404) notFound();
  if (!response.ok) throw new BackendError(response.status, pathname.split('?')[0]);
  return response.json();
});
export function landingPage(payload) {
  const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload?.data?.data) ? payload.data.data : [];
  return { items, totalPages: Number(payload?.last_page || payload?.meta?.last_page || payload?.pagination?.last_page || 1) || 1,
    totalItems: Number(payload?.total || payload?.meta?.total || items.length) || items.length };
}
export const landingVideos = cache(async (channelId, page = 1) => landingPage(await publicRequest(
  `/landing/videos?page=${page}&per_page=25${channelId ? `&channel_id=${encodeURIComponent(channelId)}` : ''}`,
)));
export const landingChannels = cache(async () => {
  const first = landingPage(await publicRequest('/landing/channels?page=1'));
  const items = [...first.items];
  for (let page = 2; page <= first.totalPages; page++) items.push(...landingPage(await publicRequest(`/landing/channels?page=${page}`)).items);
  return [...new Map(items.map(item => [String(item.id), item])).values()];
});
export const publicPlaylists = cache(async () => {
  const first = normalizePaginatedResponse(await publicRequest('/play-list/index?page=1'));
  const items = [...first.items];
  for (let page = 2; page <= first.totalPages; page++) items.push(...normalizePaginatedResponse(await publicRequest(`/play-list/index?page=${page}`)).items);
  return items.filter(item => item.is_public === true || item.is_public === 1 || item.is_public === '1');
});
// The landing API omits usernames for many channels. Keep only the public
// username/id directory for five minutes; content itself remains uncached.
const completeChannelDirectory = unstable_cache(async () => {
  const channels = await landingChannels();
  const result = channels.filter(channel => channel.username);
  const missing = channels.filter(channel => !channel.username);
  for (let start = 0; start < missing.length; start += 5) {
    const details = await Promise.all(missing.slice(start, start + 5).map(async channel => {
      try {
        const payload = await publicRequest(`/channel/show/${encodeURIComponent(channel.id)}`);
        return { id: channel.id, username: payload.data?.username };
      } catch (error) {
        if ([401, 403].includes(error.status) || error.digest === 'NEXT_HTTP_ERROR_FALLBACK;404') return null;
        throw error;
      }
    }));
    result.push(...details.filter(channel => channel?.username));
  }
  return result.map(({ id, username }) => ({ id, username }));
}, ['public-channel-directory'], { revalidate: 300 });
export const channelDirectory = cache(completeChannelDirectory);
export const channelByUsername = cache(async (username) => {
  const channels = await landingChannels();
  let channel = channels.find(item => String(item.username || item.slug || '').toLowerCase() === username.toLowerCase());
  if (!channel) channel = (await channelDirectory()).find(item => String(item.username || '').toLowerCase() === username.toLowerCase());
  if (!channel) notFound();
  const payload = await publicRequest(`/channel/show/${encodeURIComponent(channel.id)}`);
  return { channelId: channel.id, payload };
});
export const videoDetail = cache(async (id) => {
  let payload;
  try { payload = await publicRequest(`/video/show/${encodeURIComponent(id)}`); }
  catch (error) { if (error.status === 401 || error.status === 403) return null; throw error; }
  if (!payload?.data?.id) notFound();
  return payload;
});
export const playlistDetail = cache(async (id, page = 1) => {
  let payload;
  try { payload = await publicRequest(`/play-list/show/${encodeURIComponent(id)}?page=${page}`); }
  catch (error) { if (error.status === 401 || error.status === 403) return null; throw error; }
  const root = payload?.data ?? payload ?? {};
  const playlist = root?.play_list ?? root?.playlist ?? root?.data?.play_list ?? null;
  if (!playlist) notFound();
  if (playlist.is_public === false || playlist.is_public === 0 || playlist.is_public === '0') return null;
  const explicitItems = Array.isArray(root?.data?.videos) ? root.data.videos : Array.isArray(root?.videos) ? root.videos : undefined;
  return { playlist, ...normalizePaginatedResponse(payload, explicitItems) };
});
