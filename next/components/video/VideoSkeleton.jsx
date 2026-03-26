export default function VideoSkeleton({ count = 8 }) {
  return (
    <div className="video-grid">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="card" style={{ height: 220, background: '#e2e8f0' }} />
      ))}
    </div>
  )
}
