import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getVideoById, getVideos } from '@/lib/services/video.service'
import JsonLd from '@/components/seo/JsonLd'
import VideoGrid from '@/components/video/VideoGrid'

export async function generateMetadata({ params }) {
  const video = await getVideoById(params.id)
  if (!video) return { title: 'ویدیو پیدا نشد' }
  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  }
}

export default async function VideoPage({ params }) {
  const video = await getVideoById(params.id)
  if (!video) notFound()
  const related = await getVideos({ q: video.channelName })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    contentUrl: video.videoUrl,
    publisher: { '@type': 'Organization', name: 'اربعین تی وی' },
  }

  return (
    <article className="container grid">
      <JsonLd data={schema} />
      <section className="card">
        <video controls src={video.videoUrl} poster={video.thumbnail} style={{ width: '100%', borderRadius: 8 }} />
        <h1>{video.title}</h1>
        <p>{video.description}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Image src={video.thumbnail} width={56} height={56} alt={video.channelName} style={{ borderRadius: 999 }} />
          <span>{video.channelName}</span>
        </div>
      </section>
      <aside className="card">
        <h3>ویدیوهای مرتبط</h3>
        <VideoGrid items={related.items.filter((v) => v.id !== video.id).slice(0, 4)} />
      </aside>
    </article>
  )
}
