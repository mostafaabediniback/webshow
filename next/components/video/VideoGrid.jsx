import VideoCard from './VideoCard'

export default function VideoGrid({ items }) {
  return (
    <section className="video-grid">
      {items.map((item) => <VideoCard key={item.id} item={item} />)}
    </section>
  )
}
