import VideoCard from './VideoCard'

function VideoGrid({ items }) {
  return (
    <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}

export default VideoGrid