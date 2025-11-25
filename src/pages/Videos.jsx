import DashboardLayout from '../layouts/DashboardLayout'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLocalVideos, deleteLocalVideo } from '../services/api'
import { Link } from 'react-router-dom'

function Row({ item, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <img src={item.thumbnailUrl} alt={item.title} className="w-20 h-12 rounded-lg object-cover" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
          <p className="text-xs text-gray-600 truncate">{item.channelName}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/dashboard/videos/${item.id}`} className="h-9 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm">ویرایش</Link>
        <button onClick={() => onDelete(item.id)} className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm">حذف</button>
      </div>
    </div>
  )
}

function Videos() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['localVideos'], queryFn: getLocalVideos })
  const mDelete = useMutation({
    mutationFn: (id) => deleteLocalVideo(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['localVideos'] })
      qc.invalidateQueries({ queryKey: ['videos'] })
    }
  })

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">ویدیوهای آپلودشده</h1>
        <div className="space-y-3">
          {(data || []).length === 0 ? (
            <p className="text-sm text-gray-500">هنوز ویدیویی آپلود نشده است</p>
          ) : (
            (data || []).map((v) => (
              <Row key={v.id} item={v} onDelete={(id)=>mDelete.mutate(id)} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Videos