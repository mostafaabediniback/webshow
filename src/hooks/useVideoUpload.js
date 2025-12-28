import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { uploadVideo, storeVideo } from '../services/videoApi'

const useVideoUpload = () => {
  const qc = useQueryClient()
  const m = useMutation({
    mutationFn: async (vars) => {
      const { channelId, title, description, videoFile, coverFile } = vars
      
      if (!coverFile) {
        throw new Error('تصویر بندانگشتی الزامی است')
      }
      
      // مرحله 1: آپلود ویدیو
      const uploaded = await uploadVideo(videoFile)
      
      // بررسی response: {status: "completed", temp_path: "temp/693d1046f421f.avi"}
      if (uploaded?.status !== 'completed') {
        throw new Error('آپلود ویدیو ناموفق بود')
      }
      
      const tempPath = uploaded?.temp_path || uploaded?.path || ''
      if (!tempPath) {
        throw new Error('مسیر فایل آپلود شده یافت نشد')
      }
      
      // مرحله 2: ذخیره ویدیو در کانال
      return storeVideo(channelId, { 
        path: tempPath, 
        title, 
        description: description || '', 
        cover: coverFile 
      })
    },
    onSuccess: (_, vars) => {
      toast.success('ویدیو با موفقیت آپلود شد', { position: 'top-right', theme: 'colored' })
      // invalidate queries برای refresh لیست ویدیوها
      qc.invalidateQueries({ queryKey: ['channelVideos', vars.channelId] })
      qc.invalidateQueries({ queryKey: ['channelVideos', 'all'] })
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'خطا در آپلود ویدیو'
      toast.error(errorMessage, { position: 'top-right', theme: 'colored' })
    }
  })
  return { 
    upload: m.mutate, 
    uploadAsync: m.mutateAsync,
    status: m.status, 
    data: m.data, 
    error: m.error,
    isPending: m.isPending
  }
}

export default useVideoUpload
