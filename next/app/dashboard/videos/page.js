import { getVideos } from '@/lib/services/video.service'
import VideoListClient from '@/components/dashboard/VideoListClient'

export default async function DashboardVideosPage() {
  const data = await getVideos()
  return <VideoListClient items={data.items} title="مدیریت ویدیوها" />
}
