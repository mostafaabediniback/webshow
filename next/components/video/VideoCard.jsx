import Image from 'next/image'
import Link from 'next/link'

function VideoCard({ item }) {
  const thumb = item.thumbnailUrl || item.cover_link || item.cover || item.thumbnail || 'https://picsum.photos/seed/fallback/640/360'
  const title = item.title || 'بدون عنوان'
  const channelName = item.channel_name || item.channelName || 'بدون کانال'

  return (
    <article className="card">
      <Link href={`/v/${item.id}`}>
        <Image src={thumb} alt={title} width={640} height={360} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
        <h3 style={{ margin: '10px 0 6px' }}>{title}</h3>
      </Link>
      <p className="muted" style={{ margin: 0 }}>{channelName}</p>
    </article>
  )
}

export default VideoCard
