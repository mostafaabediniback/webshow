import Home from '@/features/Home';
import VideoGrid from '@/components/VideoGrid';
import QueryHydration from '@/lib/QueryHydration';
import { landingChannels, landingVideos } from '@/lib/public-api';
import { pageMetadata } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('تماشای ویدیوها و کانال‌ها', 'تازه‌ترین ویدیوها و کانال‌های اربعین تی وی، تلویزیون اینترنتی جبهه مقاومت.', '/');
export default async function HomePage() {
  const [channels, videos] = await Promise.all([landingChannels(), landingVideos(null)]);
  return <QueryHydration entries={[
    [['landing-channels', 'all'], { items: channels }],
    [['landing-videos-infinite', 'all', 25], { pages: [videos], pageParams: [1] }],
  ]}><h1 className="sr-only">اربعین تی وی؛ تماشای ویدیوها و کانال‌ها</h1><Home initialItems={videos.items} initialGrid={<VideoGrid items={videos.items} />} /></QueryHydration>;
}
