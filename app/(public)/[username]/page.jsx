import ProfileChannel from '@/features/ProfileChannel';
import VideoGrid from '@/components/VideoGrid';
import QueryHydration from '@/lib/QueryHydration';
import { channelByUsername, landingVideos } from '@/lib/public-api';
import { pageMetadata, plainText } from '@/lib/seo';
import { decodeRouteParam } from '@/lib/route-params';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { username } = await params;
  const { payload } = await channelByUsername(username);
  const channel = payload.data;
  return pageMetadata(channel.name || username, plainText(channel.description) || `ویدیوهای کانال ${channel.name || username} در اربعین تی وی.`, `/${encodeURIComponent(username)}`, { image: channel.image });
}
export default async function ChannelPage({ params }) {
  const username = decodeRouteParam((await params).username);
  const { channelId, payload } = await channelByUsername(username);
  const videos = await landingVideos(channelId);
  return <QueryHydration entries={[
    [['channelDetail', channelId], payload],
    [['landing-videos-infinite', channelId, 25], { pages: [videos], pageParams: [1] }],
  ]}><ProfileChannel key={username} initialChannelId={channelId} initialItems={videos.items} initialGrid={<VideoGrid items={videos.items} />} /></QueryHydration>;
}
