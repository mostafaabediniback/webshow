import { Link } from 'react-router-dom'

function VideoCard({ video }) {
  return (
    <Link to={`/v/${video.id}`} className="block group cursor-pointer touch-manipulation">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl bg-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        <span className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/85 backdrop-blur-sm text-white">
          {video.duration}
        </span>
      </div>
      <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3">
        <img 
          src={`https://i.pravatar.cc/40?u=${encodeURIComponent(video.channelName)}`} 
          alt={video.channelName} 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all" 
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{video.channelName}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{video.views.toLocaleString('fa-IR')} بازدید</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard