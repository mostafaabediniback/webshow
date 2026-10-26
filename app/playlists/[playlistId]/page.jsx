import PlaylistDetail from '@/features/PlaylistDetail';
import QueryHydration from '@/lib/QueryHydration';
import { playlistDetail } from '@/lib/public-api';
import { pageMetadata } from '@/lib/seo';
import AuthGuard from '@/components/AuthGuard';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { playlistId } = await params;
  const data = await playlistDetail(playlistId);
  if (!data) return pageMetadata('پلی‌لیست', 'برای مشاهدهٔ این پلی‌لیست وارد حساب خود شوید.', `/playlists/${encodeURIComponent(playlistId)}`, { noindex: true });
  const { playlist } = data;
  return pageMetadata(playlist.name, `ویدیوهای پلی‌لیست ${playlist.name} در اربعین تی وی.`, `/playlists/${encodeURIComponent(playlistId)}`);
}
export default async function Page({ params }) {
  const { playlistId } = await params;
  const data = await playlistDetail(playlistId);
  if (!data) return <AuthGuard><PlaylistDetail /></AuthGuard>;
  return <QueryHydration entries={[[['playlist', playlistId, 1, 25], data]]}><h1 className="sr-only">{data.playlist.name}</h1><PlaylistDetail /></QueryHydration>;
}
