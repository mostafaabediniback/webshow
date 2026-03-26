import { useEffect, useState, useCallback } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import useChannel from '../hooks/useChannel'
import useChannelVideos from '../hooks/useChannelVideos'
import useDeleteVideo from '../hooks/useDeleteVideo'
import VideoModal from '../components/VideoModal'
import ConfirmModal from '../components/ConfirmModal'
import { usePaginationParams } from '../hooks/usePaginationParams'
import VideoListSection from '../components/dashboard/VideoListSection'
import Seo from '../components/Seo'

function Videos() {
  const { channels: chans, isLoadingChannels } = useChannel()
  const [chanId, setChanId] = useState('')
  const { page, setPage } = usePaginationParams(1)
  const { data, isLoading, isError } = useChannelVideos({ channelId: chanId, pageNumber: page, pageSize: 25 })
  const { deleteVideo, isDeleting } = useDeleteVideo()
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  useEffect(() => {
    setPage(1)
  }, [chanId, setPage])

  const handleConfirmDelete = useCallback(() => {
    if (!deleteConfirmId) return
    deleteVideo(deleteConfirmId)
    setDeleteConfirmId(null)
  }, [deleteConfirmId, deleteVideo])

  return (
    <DashboardLayout>
      <Seo title="مدیریت ویدیوها | اربعین تی وی" description="مدیریت، مشاهده و حذف ویدیوهای بارگذاری‌شده در پنل ادمین." noIndex />
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-2">فیلتر بر اساس کانال</label>
          <select
            value={chanId}
            onChange={(e) => setChanId(e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoadingChannels}
          >
            <option value="">همه ویدیوها</option>
            {(chans || []).map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </div>

        <VideoListSection
          items={data?.items || []}
          isLoading={isLoading}
          isError={isError}
          emptyText={chanId ? 'ویدیویی در این کانال یافت نشد' : 'هنوز ویدیویی آپلود نشده است'}
          errorDescription="لطفاً دوباره تلاش کنید"
          totalPages={data?.totalPages || 0}
          page={page}
          onPageChange={setPage}
          onDelete={setDeleteConfirmId}
          onShow={setSelectedVideoId}
          isDeleting={isDeleting}
        />
      </div>

      <VideoModal videoId={selectedVideoId} isOpen={!!selectedVideoId} onClose={() => setSelectedVideoId(null)} />
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="حذف ویدیو"
        message="آیا از حذف این ویدیو مطمئن هستید؟ این عمل قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        isLoading={isDeleting}
      />
    </DashboardLayout>
  )
}

export default Videos
