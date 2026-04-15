<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react'
=======
import { useEffect, useState } from 'react'
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
import { useState } from 'react'
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
import { Pagination } from '@mui/material'
import { Play } from 'iconsax-react'
import DashboardLayout from '../layouts/DashboardLayout'
import useChannelVideos from '../hooks/useChannelVideos'
import useDeleteVideo from '../hooks/useDeleteVideo'
import VideoRow from '../components/VideoRow'
import VideoModal from '../components/VideoModal'
import ConfirmModal from '../components/ConfirmModal'
import { usePaginationParams } from '../hooks/usePaginationParams'
<<<<<<< HEAD
<<<<<<< HEAD
import EditVideoModal from '../components/EditVideoModal'
import useChannelDetail from '../hooks/useChannelDetail'
=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
import EditVideoModal from '../components/EditVideoModal'
import useChannelDetail from '../hooks/useChannelDetail'
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

const PAGE_SIZE = 25

export default function UploadedVideos() {
  const { page, setPage } = usePaginationParams(1)
<<<<<<< HEAD
<<<<<<< HEAD
  const { deleteVideoAsync, isDeleting } = useDeleteVideo()

  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingVideo, setEditingVideo] = useState(null)

  const { data: videos, isLoading: isLoadingVideos, isFetching, isError } = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })
  const { data, refetch } = useChannelDetail();
  const channel = data?.data;


  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteVideoAsync(deleteConfirmId)
      setDeleteConfirmId(null)

=======
  const { deleteVideo, isDeleting } = useDeleteVideo()
=======
  const { deleteVideoAsync, isDeleting } = useDeleteVideo()
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [editingVideo, setEditingVideo] = useState(null)

  const { data: videos, isLoading: isLoadingVideos, isFetching, isError } = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })
  const { data, refetch } = useChannelDetail();
  const channel = data?.data;


  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteVideoAsync(deleteConfirmId)
      setDeleteConfirmId(null)
<<<<<<< HEAD
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======

>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
    }
  }

  const videosList = Array.isArray(videos?.items) ? videos.items : []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
<<<<<<< HEAD
<<<<<<< HEAD
          <div className=" overflow-hidden mb-4">

            {/* COVER */}
            <div className="relative h-40 sm:h-52 w-full overflow-hidden rounded-2xl border">
              <img
                src={channel?.background_image}
                alt="cover"
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end gap-4 relative">

              {/* AVATAR */}
              <div className="relative -mt-16 sm:-mt-20">
                <img
                  src={channel?.image}
                  alt="avatar"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-bold text-gray-900">
                  {channel?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  @{channel?.username}
                </p>

                {channel?.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {channel.description}
                  </p>
                )}
              </div>

              {/* SOCIALS QUICK VIEW */}
              <div className="flex gap-2 flex-wrap">
                {channel?.socials &&
                  Object.entries(channel.socials).map(([key, value]) => (
                    <span
                      key={key}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600"
                    >
                      {key}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* <h2 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای آپلود شده من</h2> */}

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
=======
          <h2 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای آپلود شده من</h2>
=======
          <div className=" overflow-hidden mb-4">
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

            {/* COVER */}
            <div className="relative h-40 sm:h-52 w-full overflow-hidden rounded-2xl border">
              <img
                src={channel?.background_image}
                alt="cover"
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end gap-4 relative">

              {/* AVATAR */}
              <div className="relative -mt-16 sm:-mt-20">
                <img
                  src={channel?.image}
                  alt="avatar"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-bold text-gray-900">
                  {channel?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  @{channel?.username}
                </p>

                {channel?.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {channel.description}
                  </p>
                )}
              </div>

              {/* SOCIALS QUICK VIEW */}
              <div className="flex gap-2 flex-wrap">
                {channel?.socials &&
                  Object.entries(channel.socials).map(([key, value]) => (
                    <span
                      key={key}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600"
                    >
                      {key}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* <h2 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای آپلود شده من</h2> */}

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
<<<<<<< HEAD
              <div className="space-y-3">
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
              <div className="space-y-3 flex flex-wrap gap-4">
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
                {videosList.map((v) => (
                  <VideoRow
                    key={v.id}
                    item={v}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onShow={(id) => setSelectedVideoId(id)}
<<<<<<< HEAD
<<<<<<< HEAD
                    onEdit={setEditingVideo}
=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
                    onEdit={setEditingVideo}
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
      <EditVideoModal
        videoId={editingVideo?.id}
        initialVideo={editingVideo}
        isOpen={!!editingVideo}
        onClose={() => setEditingVideo(null)}
      />
    </DashboardLayout>
  )
}
<<<<<<< HEAD
=======
    </DashboardLayout>
  )
}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
