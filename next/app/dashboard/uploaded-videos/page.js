import { getVideos } from '@/lib/services/video.service'
import VideoListClient from '@/components/dashboard/VideoListClient'

export default async function UploadedVideosPage() {
  const data = await getVideos()
  return <VideoListClient items={data.items.slice(0, 10)} title="ویدیوهای آپلود شده من" />
}
