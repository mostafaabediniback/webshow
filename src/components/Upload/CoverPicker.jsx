import React, { useEffect, useRef, useState } from 'react'
import DefaultCoversModal from './DefaultCoversModal'
import FramePickerModal from './FramePickerModal'
import { Image } from 'iconsax-react'

export default function CoverPicker({
  value, // current cover File or null
  onChange, // (file) => void
  defaultCovers = [], // array of URLs (e.g., ['/covers/d1.png', ...])
  videoFile = null,
  videoUrl = null,
  isFormDisabled
}) {
  const [thumbDrag, setThumbDrag] = useState(false)
  const [showDefaultModal, setShowDefaultModal] = useState(false)
  const [showFrameModal, setShowFrameModal] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const prevUrlRef = useRef(null)

  // build preview when value changes
  useEffect(() => {
    if (!value) {
      if (prevUrlRef.current) {
        try { URL.revokeObjectURL(prevUrlRef.current) } catch (e) { }
        prevUrlRef.current = null
      }
      setPreviewUrl(null)
      return
    }

    if (typeof value === 'string') {
      // string URL
      setPreviewUrl(value)
      return
    }

    // File or Blob
    const u = URL.createObjectURL(value)
    if (prevUrlRef.current) {
      try { URL.revokeObjectURL(prevUrlRef.current) } catch (e) { }
    }
    prevUrlRef.current = u
    setPreviewUrl(u)

    return () => {
      if (prevUrlRef.current) {
        try { URL.revokeObjectURL(prevUrlRef.current) } catch (e) { }
        prevUrlRef.current = null
      }
    }
  }, [value])

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) {
        try { URL.revokeObjectURL(prevUrlRef.current) } catch (e) { }
      }
    }
  }, [])

  const onFileInputChange = (e) => {
    const f = e.target.files?.[0]
    if (f) onChange(f)
  }

  return (
    <div>
      <div
        className={`rounded-xl border-2 transition-all ${thumbDrag ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-gray-400'} p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[150px]`}
        onDragOver={(e) => { e.preventDefault(); setThumbDrag(true) }}
        onDragLeave={() => setThumbDrag(false)}
        onDrop={(e) => { e.preventDefault(); setThumbDrag(false); const f = e.dataTransfer.files?.[0]; if (f && f.type.startsWith('image/')) onChange(f) }}
      >
        <input id="thumb-input" type="file" accept="image/*" className="sr-only" onChange={onFileInputChange} />
        {previewUrl ? (
          <div className="w-full space-y-2">
            <div className="relative w-full max-w-md mx-auto">
              <img className="w-full h-48 rounded-lg object-cover border border-gray-200" src={previewUrl} alt="Thumbnail" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 font-medium truncate">{value?.name ?? 'کاور انتخابی'}</p>
              <button onClick={(e) => { e.stopPropagation(); onChange(null) }} className="text-red-500 hover:text-red-700 text-sm">حذف</button>
            </div>
          </div>
        ) : (
          <label htmlFor="thumb-input" className="flex flex-col items-center gap-3 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <Image size={32} color="#4a5565" className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">برای انتخاب تصویر کلیک کنید</p>
              <p className="text-xs text-gray-500 mt-1">یا تصویر را اینجا بکشید و رها کنید</p>
            </div>
          </label>
        )}
      </div>

      <div className="flex gap-3 mt-3">
        {/* <button onClick={() => setShowDefaultModal(true)} className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          انتخاب کاورهای دیفالت
          {isFormDisabled ? 'opacity-60 pointer-events-none' : ''}
        </button> */}
        <button onClick={() => setShowFrameModal(true)} className={`flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 
`}>
          انتخاب کاور از فریم ویدیو
        </button>
      </div>

      {/* <DefaultCoversModal
        open={showDefaultModal}
        onClose={() => setShowDefaultModal(false)}
        defaultCovers={defaultCovers}
        onSelect={(file) => onChange(file)}
      /> */}

      <FramePickerModal
        open={showFrameModal}
        onClose={() => setShowFrameModal(false)}
        videoFile={videoFile}
        videoUrl={videoUrl}
        onSelect={(file) => onChange(file)}
      />
    </div>
  )
}