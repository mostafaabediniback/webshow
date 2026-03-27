import { useState } from 'react'
import { Pagination } from '@mui/material'
import { Play } from 'iconsax-react'
import DashboardLayout from '../layouts/DashboardLayout'
import useChannelVideos from '../hooks/useChannelVideos'
import useDeleteVideo from '../hooks/useDeleteVideo'
import VideoRow from '../components/VideoRow'
import VideoModal from '../components/VideoModal'
import ConfirmModal from '../components/ConfirmModal'
import { usePaginationParams } from '../hooks/usePaginationParams'
import EditVideoModal from '../components/EditVideoModal'

const PAGE_SIZE = 25

export default function UploadedVideos() {
  const { page, setPage } = usePaginationParams(1)
  const { deleteVideo, isDeleting } = useDeleteVideo()

  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingVideo, setEditingVideo] = useState(null)

  const { data: videos, isLoading: isLoadingVideos, isError } = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteVideo(deleteConfirmId)
      setDeleteConfirmId(null)
    }
  }

  const videosList = Array.isArray(videos?.items) ? videos.items : []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای آپلود شده من</h2>

          {isLoadingVideos ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />)}</div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">خطا در بارگذاری ویدیوها</div>
          ) : videosList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Play size={32} color='#F97316' className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">هنوز ویدیویی آپلود نشده است</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {videosList.map((v) => (
                  <VideoRow
                    key={v.id}
                    item={v}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onShow={(id) => setSelectedVideoId(id)}
                    onEdit={setEditingVideo}
                    isDeleting={isDeleting}
                  />
                ))}
              </div>

              {videos?.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4">
                  <Pagination
                    count={videos.totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    shape="rounded"
                    color="primary"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <VideoModal videoId={selectedVideoId} isOpen={!!selectedVideoId} onClose={() => setSelectedVideoId(null)} />
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="حذف ویدیو"
        message="آیا از حذف این ویدیو مطمئن هستید؟"
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        isLoading={isDeleting}
      />
      <EditVideoModal
        videoId={editingVideo?.id}
        initialVideo={editingVideo}
        isOpen={!!editingVideo}
        onClose={() => setEditingVideo(null)}
      />
    </DashboardLayout>
  )
}
