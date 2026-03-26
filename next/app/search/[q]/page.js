import { getVideos } from '@/lib/services/video.service'
import VideoGrid from '@/components/video/VideoGrid'

export async function generateMetadata({ params }) {
  return {
    title: `جستجو: ${params.q}`,
    description: `نتایج جستجو برای ${params.q}`,
  }
}

export default async function SearchPage({ params }) {
  const data = await getVideos({ q: decodeURIComponent(params.q) })
  return (
    <section className="container">
      <header><h1>نتایج جستجو: {decodeURIComponent(params.q)}</h1></header>
      <VideoGrid items={data.items} />
    </section>
  )
}
