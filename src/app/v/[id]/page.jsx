import VideoPageClient from '../../../components/video/VideoPageClient'
import { getVideoDetailServer, getVideosByChannelServer } from '../../../services/server/videoServerApi'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { id } = await params
  const video = await getVideoDetailServer(id)
  const title = video?.data?.title || `ویدیو ${id}`
  const description = video?.data?.description || 'جزئیات ویدیو'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: video?.data?.cover_link ? [video.data.cover_link] : undefined,
      type: 'video.other',
    },
  }
}

export default async function VideoPage({ params }) {
  const { id } = await params
  const video = await getVideoDetailServer(id)
  const related = await getVideosByChannelServer(video?.data?.channel_id, 1, 25)

  return <VideoPageClient id={id} data={video} relatedVideos={related} />
}
