import Image from 'next/image'
import Link from 'next/link'

function VideoCard({ item }) {
  return (
    <article className="card">
      <Link href={`/v/${item.id}`}>
        <Image src={item.thumbnail} alt={item.title} width={640} height={360} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
        <h3 style={{ margin: '10px 0 6px' }}>{item.title}</h3>
      </Link>
      <p className="muted" style={{ margin: 0 }}>{item.channelName}</p>
    </article>
  )
}

export default VideoCard
