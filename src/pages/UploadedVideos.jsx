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
import { useEffect } from 'react'

const PAGE_SIZE = 25

export default function UploadedVideos() {
  const { page, setPage } = usePaginationParams(1)
  const { deleteVideoAsync, isDeleting } = useDeleteVideo()

  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingVideo, setEditingVideo] = useState(null)

  const { data: videos, isLoading: isLoadingVideos, isFetching, isError, refetch } = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteVideoAsync(deleteConfirmId)
      setDeleteConfirmId(null)
      refetch()

    }
  }
  useEffect(() => {
    refetch()
  }, [])


  const videosList = Array.isArray(videos?.items) ? videos.items : []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای آپلود شده من</h2>

          {isLoadingVideos || isFetching ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-100 rounded-lg animate-pulse flex items-center gap-3 px-3"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                ❌
              </div>
              <p className="text-sm font-medium text-red-500">
                خطا در بارگذاری ویدیوها
              </p>
              <p className="text-xs text-gray-400">
                لطفاً اتصال اینترنت را بررسی کنید
              </p>
            </div>
          ) : videosList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                <Play size={28} color="#F97316" />
              </div>

              <p className="text-sm font-medium text-gray-700">
                هنوز ویدیویی ثبت نشده
              </p>

              <p className="text-xs text-gray-400">
                اولین ویدیوی خود را آپلود کنید
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 flex flex-wrap gap-4">
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
