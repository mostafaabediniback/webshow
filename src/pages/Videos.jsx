import DashboardLayout from '../layouts/DashboardLayout'
import { useState } from 'react'
import useChannel from '../hooks/useChannel'
import useChannelVideos from '../hooks/useChannelVideos'

function Row({ item }) {
  // طبق OpenAPI: {id, channel_name, cover_link, title}
  const coverImage = item.cover_link || item.cover_url || item.cover || item.thumbnailUrl || 'https://picsum.photos/seed/default/160/90';
  const channelName = item.channel_name || item.channelName || '';
  const title = item.title || String(item.id);
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-20 h-12 rounded-lg object-cover"
          onError={(e) => {
            e.target.src = 'https://picsum.photos/seed/default/160/90';
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
          {channelName && (
            <p className="text-xs text-gray-600 truncate">{channelName}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  )
}

function Videos() {
  const { channels: chans, isLoadingChannels } = useChannel()
  const [chanId, setChanId] = useState('')
  const { data, isLoading, isError } = useChannelVideos(chanId)

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">ویدیوهای آپلودشده</h1>
        <div className="mb-4">
          <select 
            value={chanId} 
            onChange={(e)=>setChanId(e.target.value)} 
            className="h-10 px-3 rounded-lg border border-gray-300 w-full"
            disabled={isLoadingChannels}
          >
            <option value="">همه ویدیوها</option>
            {(chans||[]).map((c)=> (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          {isLoading ? (
            <p className="text-sm text-gray-500">در حال بارگذاری...</p>
          ) : isError ? (
            <p className="text-sm text-red-500">خطا در بارگذاری ویدیوها</p>
          ) : (data || []).length === 0 ? (
            <p className="text-sm text-gray-500">
              {chanId ? 'ویدیویی در این کانال یافت نشد' : 'هنوز ویدیویی آپلود نشده است'}
            </p>
          ) : (
            (data || []).map((v) => (
              <Row key={v.id} item={v} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Videos
