import { Eye, PlayCircle } from 'iconsax-react'
import { Link } from 'react-router-dom'

function VideoCard({ video }) {
  const normalizeUrl = (u) => {
    if (typeof u !== 'string') return ''
    return u.replace(/[`'"]/g, '').trim()
  }
  
  const thumbnailRaw = video.cover_link || video.thumbnailUrl || video.cover
  const thumbnail = normalizeUrl(thumbnailRaw) 
  const channelName = video.channel_name || video.channelName || 'کانال ناشناس'
  const channelImage = normalizeUrl(video.channel_image) 
  const views = video.view_count || video.views || 0
  const formattedViews = views >= 1000 
    ? `${(views / 1000).toFixed(1)}هزار` 
    : views.toLocaleString('fa-IR')

  return (
    <Link
      to={`/v/${video.id}`}
      className="group/card block w-full h-fit cursor-pointer touch-manipulation isolate rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200/50 transition-all duration-400 overflow-hidden hover:-translate-y-1 hover:scale-[1.02]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {/* Thumbnail Image */}
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover/card:scale-110 group-hover/card:brightness-110"
          loading="lazy"
          onError={(e) => { 
            e.target.src
            e.target.classList.add('animate-pulse')
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 scale-75 opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 transition-all duration-500 delay-100 shadow-indigo-500/25">
            <PlayCircle size={28} sm={36} color='#f58a06' className="text-indigo-600 drop-shadow-lg" />
          </div>
        </div>

        {/* View Count Badge */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-lg shadow-black/10 border border-white/50 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800">
          <Eye size={14} sm={16} color='#0f172a' className="text-indigo-500 flex-shrink-0" />
          <span>{formattedViews}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold leading-tight line-clamp-2 text-slate-900 group-hover/card:text-indigo-600 group-hover/card:font-black transition-all duration-300 mb-3 pr-1">
          {video.title}
        </h3>
        
        {/* Channel Info */}
        <div className="flex items-center gap-3">
          {/* Channel Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={channelImage}
              alt={channelName}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover ring-2 ring-slate-100/50 shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 cursor-pointer group-hover/card:ring-indigo-200/50"
              onError={(e) => { 
                e.target.src 
              }}
            />
            {/* Online Indicator */}
            {/* <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-md ring-2 ring-white/50 animate-pulse" /> */}
          </div>
          
          {/* Channel Name & Description */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover/card:text-indigo-600 transition-colors">
              {channelName}
            </p>
            {video.description && (
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {video.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  )
}

export default VideoCard