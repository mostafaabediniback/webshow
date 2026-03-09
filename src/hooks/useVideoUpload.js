import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import axiosInstanceNew from '../utils/axiosConfigNew'
import defaultCover from '../assets/img/cover.jpg'

const storeVideoAPI = async (channelId, { path, title, description, cover }) => {
  const formData = new FormData()
  formData.append("path", path)
  formData.append("title", title)
  formData.append("description", description || "")

  if (cover) {
    // اگر cover یک آدرس است، به فایل تبدیل شود
    if (typeof cover === "string") {
      const res = await fetch(cover)
      const blob = await res.blob()
      cover = new File([blob], "cover.jpg", { type: blob.type || "image/jpeg" })
    }
    formData.append("cover", cover)
  }

  const token = sessionStorage.getItem("token")
  const res = await axiosInstanceNew.post(`/video/${channelId}/store-video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // ارسال توکن
    },
  })
  return res.data
}

const useVideoUpload = () => {
  const qc = useQueryClient()
  const m = useMutation({
    mutationFn: async ({ channelId, title, description, temp_path, coverFile }) => {
      if (!temp_path) throw new Error("ویدیو آپلود نشده است")

      return storeVideoAPI(channelId, {
        path: temp_path,
        title,
        description,
        cover: coverFile || defaultCover
      })
    },
    onSuccess: (_, vars) => {
      toast.success('ویدیو با موفقیت آپلود شد', { position: 'top-right', theme: 'colored' })
      qc.invalidateQueries({ queryKey: ['channelVideos', vars.channelId] })
      qc.invalidateQueries({ queryKey: ['channelVideos', 'all'] })
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || error?.message || 'خطا در آپلود ویدیو'
      toast.error(msg, { position: 'top-right', theme: 'colored' })
    }
  })

  return {
    uploadAsync: m.mutateAsync,
    isPending: m.isPending
  }
}

export default useVideoUpload