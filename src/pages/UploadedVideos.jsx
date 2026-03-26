import { useState, useCallback } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import useChannelVideos from '../hooks/useChannelVideos'
import useDeleteVideo from '../hooks/useDeleteVideo'
import VideoModal from '../components/VideoModal'
import ConfirmModal from '../components/ConfirmModal'
import { usePaginationParams } from '../hooks/usePaginationParams'
import VideoListSection from '../components/dashboard/VideoListSection'
import Seo from '../components/Seo'

const PAGE_SIZE = 25

export default function UploadedVideos() {
  const { page, setPage } = usePaginationParams(1)
  const { deleteVideo, isDeleting } = useDeleteVideo()

  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const { data: videos, isLoading: isLoadingVideos, isError } = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })

  const handleConfirmDelete = useCallback(() => {
    if (!deleteConfirmId) return
    deleteVideo(deleteConfirmId)
    setDeleteConfirmId(null)
  }, [deleteConfirmId, deleteVideo])

  return (
    <DashboardLayout>
      <Seo title="ویدیوهای من | اربعین تی وی" description="مدیریت ویدیوهای بارگذاری‌شده توسط کاربر." noIndex />
      <div className="space-y-6">
        <VideoListSection
          title="ویدیوهای آپلود شده من"
          items={videos?.items || []}
          isLoading={isLoadingVideos}
          isError={isError}
          emptyText="هنوز ویدیویی آپلود نشده است"
          emptyIconClassName="bg-orange-100"
          emptyIconColor="#F97316"
          totalPages={videos?.totalPages || 0}
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
        message="آیا از حذف این ویدیو مطمئن هستید؟"
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        isLoading={isDeleting}
      />
    </DashboardLayout>
  )
}
