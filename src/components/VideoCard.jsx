import { Link } from 'react-router-dom'
import defaultCover from '../assets/img/cover.jpg'

function VideoCard({ video }) {
  const normalizeUrl = (u) => {
    if (typeof u !== 'string') return ''
    return u.replace(/[`'"]/g, '').trim()
  }
  const thumbnailRaw = video.thumbnailUrl || video.cover_link || video.cover
  const thumbnail = normalizeUrl(thumbnailRaw) || defaultCover
  const channel = video.channelName || video.channel_name;
  const views = video.views ? video.views.toLocaleString('fa-IR') : '۰';
  const duration = video.duration || '00:00';

  return (
    <Link
      to={`/v/${video.id}`}
      className="block group/card cursor-pointer touch-manipulation isolate"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl bg-gray-200 shadow-sm group-hover/card:shadow-lg transition-all duration-300">
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
          loading="lazy"
          onError={(e) => { e.target.src = defaultCover; }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300" />
        <span className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/85 backdrop-blur-sm text-white">
          {duration}
        </span>
      </div>
      <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold line-clamp-2 text-gray-900 group-hover/card:text-blue-600 transition-colors leading-snug">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{channel}</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
