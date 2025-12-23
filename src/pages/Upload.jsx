import DashboardLayout from '../layouts/DashboardLayout'
import useChannel from '../hooks/useChannel'
import useVideoUpload from '../hooks/useVideoUpload'
import { useState } from 'react'
import { VideoAdd, DocumentUpload, Image, FolderAdd, TickCircle } from 'iconsax-react'

function Upload() {
  const { channels: chans, isLoadingChannels } = useChannel()
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
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">آپلود ویدیو</h1>
          <p className="text-sm text-gray-600">آپلود ویدیوهای جدید و مدیریت محتوای خود</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">اطلاعات ویدیو</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                عنوان ویدیو <span className="text-red-500">*</span>
              </label>
              <input 
                value={title} 
                onChange={(e)=>setTitle(e.target.value)} 
                placeholder="عنوان ویدیو را وارد کنید" 
                className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                توضیحات
              </label>
              <textarea 
                value={desc} 
                onChange={(e)=>setDesc(e.target.value)} 
                placeholder="توضیحات ویدیو را وارد کنید (اختیاری)" 
                className="h-24 px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                انتخاب کانال <span className="text-red-500">*</span>
              </label>
              <select 
                value={chanId} 
                onChange={(e)=>setChanId(e.target.value)} 
                disabled={isLoadingChannels}
                className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">انتخاب کانال</option>
                {(chans||[]).map((c)=> (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">فایل‌های ویدیو</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                فایل ویدیو <span className="text-red-500">*</span>
              </label>
              <div
                className={`rounded-xl border-2 transition-all ${videoDrag ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-gray-400'} p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px]`}
                onDragOver={(e)=>{e.preventDefault(); setVideoDrag(true)}}
                onDragLeave={()=>setVideoDrag(false)}
                onDrop={(e)=>{e.preventDefault(); setVideoDrag(false); const f=e.dataTransfer.files?.[0]; if(f && f.type.startsWith('video/')) setVideoFile(f)}}
              >
                <input id="video-input" type="file" accept="video/*" className="sr-only" onChange={(e)=>setVideoFile(e.target.files?.[0]||null)} />
                {videoFile ? (
                  <div className="w-full space-y-2">
                    <video controls className="w-full rounded-lg bg-black max-h-[300px]" src={URL.createObjectURL(videoFile)} />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 font-medium truncate">{videoFile.name}</p>
                      <button
                        onClick={(e) => {e.stopPropagation(); setVideoFile(null)}}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        حذف
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <label htmlFor="video-input" className="flex flex-col items-center gap-3 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <DocumentUpload size={32} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">برای انتخاب فایل کلیک کنید</p>
                      <p className="text-xs text-gray-500 mt-1">یا فایل را اینجا بکشید و رها کنید</p>
                    </div>
                  </label>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                تصویر بندانگشتی (اختیاری)
              </label>
              <div
                className={`rounded-xl border-2 transition-all ${thumbDrag ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-gray-400'} p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[150px]`}
                onDragOver={(e)=>{e.preventDefault(); setThumbDrag(true)}}
                onDragLeave={()=>setThumbDrag(false)}
                onDrop={(e)=>{e.preventDefault(); setThumbDrag(false); const f=e.dataTransfer.files?.[0]; if(f && f.type.startsWith('image/')) setThumbFile(f)}}
              >
                <input id="thumb-input" type="file" accept="image/*" className="sr-only" onChange={(e)=>setThumbFile(e.target.files?.[0]||null)} />
                {thumbFile ? (
                  <div className="w-full space-y-2">
                    <div className="relative w-full max-w-md mx-auto">
                      <img className="w-full h-48 rounded-lg object-cover border border-gray-200" src={URL.createObjectURL(thumbFile)} alt="Thumbnail" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 font-medium truncate">{thumbFile.name}</p>
                      <button
                        onClick={(e) => {e.stopPropagation(); setThumbFile(null)}}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="thumb-input" className="flex flex-col items-center gap-3 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                      <Image size={32} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">برای انتخاب تصویر کلیک کنید</p>
                      <p className="text-xs text-gray-500 mt-1">یا تصویر را اینجا بکشید و رها کنید</p>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
            className="w-full h-12 px-6 rounded-lg bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال آپلود...
              </>
            ) : (
              <>
                <TickCircle size={20} />
                آپلود ویدیو
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">کیفیت ویدیو تغییر نمی‌کند و فایل در همین جلسه پخش می‌شود.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Upload
