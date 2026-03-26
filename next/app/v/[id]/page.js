'use client'

import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import VideoGrid from '@/components/video/VideoGrid'
import VideoSkeleton from '@/components/video/VideoSkeleton'
import { useDashboardVideos, useVideoDetail } from '@/lib/hooks/videoHooks'

export default function VideoPage({ params }) {
  const id = params.id
  const { data, isLoading } = useVideoDetail(id)
  const video = data?.data
  const { data: relatedData } = useDashboardVideos(1, video?.channel_id)
  const related = (relatedData?.items || []).filter((item) => String(item.id) !== String(id)).slice(0, 4)

  if (isLoading) return <section className="container"><VideoSkeleton count={1} /></section>
  if (!video) return <section className="container"><p>ویدیو یافت نشد.</p></section>

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl || video.cover_link || video.cover,
    contentUrl: video.video_link || video.videoUrl,
  }

  return (
    <article className="container grid">
      <JsonLd data={schema} />
      <section className="card">
        <video controls src={video.video_link || video.videoUrl} poster={video.thumbnailUrl || video.cover_link || video.cover} style={{ width: '100%', borderRadius: 8 }} />
        <h1>{video.title}</h1>
        <p>{video.description}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Image src={video.channel_image || video.thumbnailUrl || video.cover_link || video.cover} width={56} height={56} alt={video.channel_name || 'channel'} style={{ borderRadius: 999 }} />
          <span>{video.channel_name}</span>
        </div>
      </section>
      <aside className="card">
        <h3>ویدیوهای مرتبط</h3>
        <VideoGrid items={related} />
      </aside>
    </article>
  )
}
