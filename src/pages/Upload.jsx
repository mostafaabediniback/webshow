import DashboardLayout from '../layouts/DashboardLayout'
import useChannel from '../hooks/useChannel'
import useVideoUpload from '../hooks/useVideoUpload'
import { useState } from 'react'

function Upload() {
  const { channels: chans } = useChannel()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [thumbFile, setThumbFile] = useState(null)
  const [videoDrag, setVideoDrag] = useState(false)
  const [thumbDrag, setThumbDrag] = useState(false)
  const [chanId, setChanId] = useState('')
  const { uploadAsync, isPending } = useVideoUpload()

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">آپلود ویدیو</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="space-y-3">
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="عنوان" className="h-10 px-3 rounded-lg border border-gray-300 w-full" />
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="توضیحات" className="h-24 px-3 py-2 rounded-lg border border-gray-300 w-full" />
            <select value={chanId} onChange={(e)=>setChanId(e.target.value)} className="h-10 px-3 rounded-lg border border-gray-300 w-full">
              <option value="">انتخاب کانال</option>
              {(chans||[]).map((c)=> (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">فایل ویدیو</label>
              <div
                className={`rounded-lg border-2 ${videoDrag ? 'border-blue-600 bg-blue-50' : 'border-dashed border-gray-300'} p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer`}
                onDragOver={(e)=>{e.preventDefault(); setVideoDrag(true)}}
                onDragLeave={()=>setVideoDrag(false)}
                onDrop={(e)=>{e.preventDefault(); setVideoDrag(false); const f=e.dataTransfer.files?.[0]; if(f) setVideoFile(f)}}
              >
                <input id="video-input" type="file" accept="video/*" className="sr-only" onChange={(e)=>setVideoFile(e.target.files?.[0]||null)} />
                {videoFile ? (
                  <div className="w-full">
                    <video controls className="w-full rounded-md bg-black" src={URL.createObjectURL(videoFile)} />
                    <p className="mt-1 text-xs text-gray-500">{videoFile.name}</p>
                  </div>
                ) : (
                  <label htmlFor="video-input" className="text-sm text-gray-700">
                    برای انتخاب فایل کلیک کنید یا اینجا رها کنید
                  </label>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">تصویر بندانگشتی (اختیاری)</label>
              <div
                className={`rounded-lg border-2 ${thumbDrag ? 'border-blue-600 bg-blue-50' : 'border-dashed border-gray-300'} p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer`}
                onDragOver={(e)=>{e.preventDefault(); setThumbDrag(true)}}
                onDragLeave={()=>setThumbDrag(false)}
                onDrop={(e)=>{e.preventDefault(); setThumbDrag(false); const f=e.dataTransfer.files?.[0]; if(f) setThumbFile(f)}}
              >
                <input id="thumb-input" type="file" accept="image/*" className="sr-only" onChange={(e)=>setThumbFile(e.target.files?.[0]||null)} />
                {thumbFile ? (
                  <div className="flex flex-col items-center">
                    <img className="w-64 h-36 rounded-md object-cover" src={URL.createObjectURL(thumbFile)} alt="" />
                    <p className="mt-1 text-xs text-gray-500">{thumbFile.name}</p>
                  </div>
                ) : (
                  <label htmlFor="thumb-input" className="text-sm text-gray-700">
                    برای انتخاب تصویر کلیک کنید یا اینجا رها کنید
                  </label>
                )}
              </div>
            </div>
            <button 
              onClick={async () => {
                if (!title || !videoFile || !chanId) {
                  alert('لطفاً عنوان، فایل ویدیو و کانال را انتخاب کنید')
                  return
                }
                try {
                  await uploadAsync({ channelId: chanId, title, description: desc, videoFile, coverFile: thumbFile })
                  // در صورت موفقیت، فرم را پاک می‌کنیم
                  setTitle('')
                  setDesc('')
                  setVideoFile(null)
                  setThumbFile(null)
                  setChanId('')
                } catch (error) {
                  // خطا در useVideoUpload مدیریت می‌شود
                }
              }}
              disabled={!title || !videoFile || !chanId || isPending}
              className="h-10 px-4 rounded-lg bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'در حال آپلود...' : 'ثبت'}
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">کیفیت ویدیو تغییر نمی‌کند و فایل در همین جلسه پخش می‌شود.</p>
      </div>
    </DashboardLayout>
  )
}

export default Upload
