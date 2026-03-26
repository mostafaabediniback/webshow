const MOCK_VIDEOS = Array.from({ length: 20 }).map((_, idx) => ({
  id: String(idx + 1),
  title: `ویدیو شماره ${idx + 1}`,
  description: 'توضیحات نمونه برای ویدیو',
  thumbnail: `https://picsum.photos/seed/video-${idx + 1}/640/360`,
  channelName: `کانال ${(idx % 5) + 1}`,
  views: 1200 + idx * 50,
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
}))

export async function getVideos({ q } = {}) {
  const list = q ? MOCK_VIDEOS.filter((v) => v.title.includes(q) || v.channelName.includes(q)) : MOCK_VIDEOS
  return { items: list, totalPages: 1 }
}

export async function getVideoById(id) {
  return MOCK_VIDEOS.find((v) => v.id === String(id)) || null
}
