'use client'

import VideoGrid from '@/components/video/VideoGrid'
import VideoSkeleton from '@/components/video/VideoSkeleton'
import { useSearchVideos } from '@/lib/hooks/videoHooks'

export default function SearchPage({ params }) {
  const query = decodeURIComponent(params.q)
  const { data, isLoading } = useSearchVideos(query)

  const payload = data?.data || data
  const videos = Array.isArray(payload?.videos)
    ? payload.videos.flatMap((entry) => (Array.isArray(entry.videos) ? entry.videos : entry))
    : Array.isArray(payload) ? payload : []

  return (
    <section className="container grid">
      <header><h1>نتایج جستجو: {query}</h1></header>
      {isLoading ? <VideoSkeleton count={8} /> : <VideoGrid items={videos} />}
    </section>
  )
}
