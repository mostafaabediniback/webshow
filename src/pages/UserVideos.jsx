import { useEffect, useMemo, useState } from 'react'
import { TickCircle, Play } from 'iconsax-react'
import { toast } from 'react-toastify'
import DashboardLayout from '../layouts/DashboardLayout'
import useChannel from '../hooks/useChannel'
import useVideoUpload from '../hooks/useVideoUpload'
import useChannelVideos from '../hooks/useChannelVideos'
import useDeleteVideo from '../hooks/useDeleteVideo'
import VideoDropzone from '../components/VideoDropzone'
import VideoRow from '../components/VideoRow'
import VideoModal from '../components/VideoModal'
import ConfirmModal from '../components/ConfirmModal'
import cover from '../assets/img/cover.jpg'

function UserVideos() {
  const { channels, isLoadingChannels } = useChannel()
  const { uploadAsync, isPending } = useVideoUpload()
  const { deleteVideo, isDeleting } = useDeleteVideo()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [thumbFile, setThumbFile] = useState(null)
  const [thumbDrag, setThumbDrag] = useState(false)
  const [tempPath, setTempPath] = useState(null)
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const preferredChannelId = useMemo(() => {
    const fromSession = typeof window !== 'undefined' ? sessionStorage.getItem('channel_id') : null
    if (fromSession) return String(fromSession)
    if (channels?.[0]?.id) return String(channels[0].id)
    return ''
  }, [channels])

  const { data: videos, isLoading: isLoadingVideos, isError } = useChannelVideos(preferredChannelId)

  useEffect(() => {
    if (!isLoadingChannels && !preferredChannelId) {
      toast.warning('برای آپلود ویدیو باید ابتدا کانال برای شما تعریف شود')
    }
  }, [isLoadingChannels, preferredChannelId])

  const handleUpload = async () => {
    if (!title || !tempPath || !preferredChannelId) {
      toast.error('لطفاً عنوان و ویدیو را کامل کنید')
      return
    }

    try {
      await uploadAsync({
        channelId: preferredChannelId,
        title,
        description: desc,
        temp_path: tempPath,
        coverFile: thumbFile || cover,
      })
      setTitle('')
      setDesc('')
      setThumbFile(null)
      setTempPath(null)
    } catch {
      // handled in hook
    }
  }

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteVideo(deleteConfirmId)
      setDeleteConfirmId(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">مدیریت ویدیوهای من</h1>
          <p className="text-sm text-gray-600">آپلود و مشاهده ویدیوهای حساب کاربری</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">اطلاعات ویدیو</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">عنوان ویدیو <span className="text-red-500">*</span></label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان ویدیو را وارد کنید"
                className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">توضیحات</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="توضیحات ویدیو را وارد کنید (اختیاری)"
                className="h-24 px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">فایل‌های ویدیو</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">فایل ویدیو <span className="text-red-500">*</span></label>
              <VideoDropzone onUploaded={setTempPath} onProgress={() => {}} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">تصویر بندانگشتی (اختیاری)</label>
              <div
                className={`rounded-xl border-2 transition-all ${thumbDrag ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-gray-400'} p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[150px]`}
                onDragOver={(e) => { e.preventDefault(); setThumbDrag(true) }}
                onDragLeave={() => setThumbDrag(false)}
                onDrop={(e) => { e.preventDefault(); setThumbDrag(false); const f = e.dataTransfer.files?.[0]; if (f && f.type.startsWith('image/')) setThumbFile(f) }}
              >
                <input id="thumb-input-user" type="file" accept="image/*" className="sr-only" onChange={(e) => setThumbFile(e.target.files?.[0] || null)} />
                {thumbFile ? (
                  <div className="w-full space-y-2">
                    <img className="w-full h-48 rounded-lg object-cover border border-gray-200" src={URL.createObjectURL(thumbFile)} alt="Thumbnail" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 font-medium truncate">{thumbFile.name}</p>
                      <button onClick={(e) => { e.stopPropagation(); setThumbFile(null) }} className="text-red-500 hover:text-red-700 text-sm">حذف</button>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="thumb-input-user" className="cursor-pointer text-sm text-gray-600">برای انتخاب تصویر کلیک کنید یا تصویر را اینجا رها کنید</label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <button
            onClick={handleUpload}
            disabled={!title || !tempPath || !preferredChannelId || isPending}
            className="w-full h-12 px-6 rounded-lg bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <TickCircle size={20} />
            {isPending ? 'در حال آپلود...' : 'آپلود ویدیو'}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">ویدیوهای آپلود شده من</h2>
          {isLoadingVideos ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />)}</div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">خطا در بارگذاری ویدیوها</div>
          ) : (videos || []).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Play size={32} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">هنوز ویدیویی آپلود نشده است</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(videos || []).map((v) => (
                <VideoRow
                  key={v.id}
                  item={v}
                  onDelete={(id) => setDeleteConfirmId(id)}
                  onShow={(id) => setSelectedVideoId(id)}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
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
    </DashboardLayout>
  )
}

export default UserVideos
