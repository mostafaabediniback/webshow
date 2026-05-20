import React from 'react'
import { VideoCardSkeleton } from '../ui'

function VideoSkeleton({ count = 10 }) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default VideoSkeleton
