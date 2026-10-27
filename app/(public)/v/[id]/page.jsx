import Video from '@/features/Video';
import QueryHydration from '@/lib/QueryHydration';
import { videoDetail } from '@/lib/public-api';
import { pageMetadata, plainText, serializeJsonLd, siteUrl } from '@/lib/seo';
import AuthGuard from '@/components/AuthGuard';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { id } = await params;
  const payload = await videoDetail(id);
  if (!payload) return pageMetadata('ویدیو', 'برای مشاهدهٔ این ویدیو وارد حساب خود شوید.', `/v/${encodeURIComponent(id)}`, { noindex: true });
  const video = payload.data;
  return pageMetadata(video.title, plainText(video.description) || `تماشای ${video.title} از کانال ${video.channel_name || 'اربعین تی وی'}.`, `/v/${encodeURIComponent(id)}`, { image: video.cover_link || video.cover });
}
export default async function VideoPage({ params }) {
  const { id } = await params;
  const payload = await videoDetail(id);
  if (!payload) return <AuthGuard><Video /></AuthGuard>;
  const video = payload.data;
  const uploadDate = video.created_at && !Number.isNaN(Date.parse(video.created_at)) ? new Date(video.created_at).toISOString() : null;
  const thumbnail = video.cover_link || video.cover;
  const schema = uploadDate && thumbnail ? {
    '@context': 'https://schema.org', '@type': 'VideoObject', name: video.title,
    description: plainText(video.description, 500) || video.title, thumbnailUrl: [thumbnail], uploadDate,
    ...(video.video_link ? { contentUrl: video.video_link } : {}),
    embedUrl: new URL(`/v/${encodeURIComponent(id)}`, siteUrl).href,
  } : null;
  return <QueryHydration entries={[[['video', id], payload]]}>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />}
    <Video initialVideo={video} />
  </QueryHydration>;
}
