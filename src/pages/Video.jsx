import Layout from '../layouts/Layout'
import { useParams, Link } from 'react-router-dom'
import { useVideo } from '../hooks/useVideo'
import useChannelVideos from '../hooks/useChannelVideos'
import { Like1, Share, More } from 'iconsax-react'

function Video() {
  const { id } = useParams()
  const { data, isLoading } = useVideo(id)
  // Use channel_id from video data to fetch related videos
  const { data: relatedVideos, isLoading: isRelatedLoading } = useChannelVideos(data?.channel_id)

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="animate-pulse">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg sm:rounded-xl" />
            <div className="mt-4 sm:mt-6 space-y-4">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4" />
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-medium">ویدیو یافت نشد</p>
            <p className="text-gray-500 mt-2">لطفاً آدرس را بررسی کنید</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl bg-black shadow-lg">
              <video 
                controls 
                className="w-full h-full" 
                poster={data.thumbnailUrl || data.cover_link || data.cover} 
                src={data.videoUrl || data.video_link}
              />
            </div>
            <h1 className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight px-1">
              {data.title}
            </h1>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img 
                  src={`https://i.pravatar.cc/48?u=${encodeURIComponent(data.channelName || data.channel_name || 'Channel')}`} 
                  alt={data.channelName || data.channel_name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 ring-2 ring-gray-200 flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{data.channelName || data.channel_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{(data.views || 0).toLocaleString('fa-IR')} بازدید</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-black hover:bg-gray-800 active:scale-95 text-white text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 touch-manipulation">
                  <Like1 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden xs:inline">پسندیدم</span>
                </button>
                <button className="h-9 sm:h-10 w-9 sm:w-auto sm:px-4 rounded-full border border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-700 text-sm font-medium transition-all duration-200 flex items-center justify-center touch-manipulation">
                  <Share size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button className="h-9 sm:h-10 w-9 sm:w-10 rounded-full border border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-700 transition-all duration-200 flex items-center justify-center touch-manipulation">
                  <More size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
              <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 whitespace-pre-line">{data.description}</p>
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای مرتبط</h3>
              {isRelatedLoading ? (
                 Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-lg">
                    <div className="w-40 h-24 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                 ))
              ) : (
                  relatedVideos?.filter(v => String(v.id) !== String(id)).slice(0, 10).map((video) => (
                    <Link to={`/v/${video.id}`} key={video.id} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-40 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden relative">
                         <img 
                            src={video.thumbnailUrl || video.cover_link || video.cover} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.target.src = "https://picsum.photos/seed/default/160/90"; }}
                         />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{video.channelName || video.channel_name}</p>
                        <p className="text-xs text-gray-400 mt-1">{(video.views || 0).toLocaleString('fa-IR')} بازدید</p>
                      </div>
                    </Link>
                  ))
              )}
               {!isRelatedLoading && (!relatedVideos || relatedVideos.length === 0) && (
                 <p className="text-gray-500 text-sm">ویدیوی مرتبطی یافت نشد</p>
               )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default Video
