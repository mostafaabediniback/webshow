import dynamic from 'next/dynamic'
import { getVideos } from '@/lib/services/video.service'

const VideoGrid = dynamic(() => import('@/components/video/VideoGrid'))

export const metadata = {
  title: 'خانه',
  description: 'مشاهده آخرین ویدیوها در اربعین تی وی',
}

export default async function HomePage() {
  const data = await getVideos()
  return (
    <section className="container">
      <header><h1>جدیدترین ویدیوها</h1></header>
      <VideoGrid items={data.items} />
    </section>
  )
}
