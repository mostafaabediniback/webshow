import DashboardLayout from '../layouts/DashboardLayout'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { getLocalVideos, updateLocalVideo } from '../services/api'
import { useMemo, useState } from 'react'
import useChannel from '../hooks/useChannel'

function VideoEdit() {
  const { id } = useParams()
  const qc = useQueryClient()
  const { data: localVideos } = useQuery({ queryKey: ['localVideos'], queryFn: getLocalVideos })
  const { channels } = useChannel()
  const item = useMemo(() => (localVideos || []).find((v)=>v.id === id), [localVideos, id])

  const [title, setTitle] = useState(item?.title || '')
  const [description, setDescription] = useState(item?.description || '')
  const [chanId, setChanId] = useState('')
  const [thumbFile, setThumbFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [videoDrag, setVideoDrag] = useState(false)
  const [thumbDrag, setThumbDrag] = useState(false)

  const mUpdate = useMutation({
    mutationFn: async () => {
      if (!item) return Promise.reject(new Error('not_found'))
      let videoUrl = item.videoUrl
      let thumbnailUrl = item.thumbnailUrl
      let channelName = item.channelName
      if (videoFile) {
        videoUrl = URL.createObjectURL(videoFile)
      }
      if (thumbFile) {
        thumbnailUrl = URL.createObjectURL(thumbFile)
      }
      if (chanId) {
        channelName = (channels || []).find((c)=>c.id===chanId)?.name || channelName
      }
      return updateLocalVideo(item.id, { title, description, videoUrl, thumbnailUrl, channelName })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['localVideos'] })
      qc.invalidateQueries({ queryKey: ['videos'] })
    }
  })

  if (!item) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-red-600">ویدیو پیدا نشد.</p>
          <Link to="/dashboard/videos" className="mt-3 inline-block h-9 px-3 rounded-lg border border-gray-300">بازگشت</Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">ویرایش ویدیو</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="space-y-3">
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="عنوان" className="h-10 px-3 rounded-lg border border-gray-300 w-full" />
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="توضیحات" className="h-24 px-3 py-2 rounded-lg border border-gray-300 w-full" />
            <select value={chanId} onChange={(e)=>setChanId(e.target.value)} className="h-10 px-3 rounded-lg border border-gray-300 w-full">
              <option value="">تغییر کانال (اختیاری)</option>
              {(channels||[]).map((c)=> (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">جایگزینی فایل ویدیو (اختیاری)</label>
              <div
                className={`rounded-lg border-2 ${videoDrag ? 'border-blue-600 bg-blue-50' : 'border-dashed border-gray-300'} p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer w-full`}
                onDragOver={(e)=>{e.preventDefault(); setVideoDrag(true)}}
                onDragLeave={()=>setVideoDrag(false)}
                onDrop={(e)=>{e.preventDefault(); setVideoDrag(false); const f=e.dataTransfer.files?.[0]; if(f) setVideoFile(f)}}
              >
                <input id="edit-video-input" type="file" accept="video/*" className="sr-only" onChange={(e)=>setVideoFile(e.target.files?.[0]||null)} />
                <div className="w-full">
                  <video controls className="w-full rounded-md bg-black" src={videoFile ? URL.createObjectURL(videoFile) : item.videoUrl} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">جایگزینی بندانگشتی (اختیاری)</label>
              <div
                className={`rounded-lg border-2 ${thumbDrag ? 'border-blue-600 bg-blue-50' : 'border-dashed border-gray-300'} p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer w-full`}
                onDragOver={(e)=>{e.preventDefault(); setThumbDrag(true)}}
                onDragLeave={()=>setThumbDrag(false)}
                onDrop={(e)=>{e.preventDefault(); setThumbDrag(false); const f=e.dataTransfer.files?.[0]; if(f) setThumbFile(f)}}
              >
                <input id="edit-thumb-input" type="file" accept="image/*" className="sr-only" onChange={(e)=>setThumbFile(e.target.files?.[0]||null)} />
                <img src={thumbFile ? URL.createObjectURL(thumbFile) : item.thumbnailUrl} alt={item.title} className="w-64 h-36 rounded-md object-cover" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>mUpdate.mutate()} className="h-10 px-4 rounded-lg bg-blue-600 text-white">ذخیره</button>
              <Link to="/dashboard/videos" className="h-10 px-4 rounded-lg border border-gray-300">بازگشت</Link>
            </div>
          </div>
          <div className="space-y-3"></div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default VideoEdit
