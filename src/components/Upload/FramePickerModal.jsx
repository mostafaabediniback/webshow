import React, { useEffect, useRef, useState } from 'react'

export default function FramePickerModal({ open, onClose, videoFile, videoUrl, onSelect }) {
  const videoRef = useRef(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [internalUrl, setInternalUrl] = useState(null)
  const [suggested, setSuggested] = useState([]) // {time, blob, url}
  const suggestedPositions = [0.1, 0.33, 0.66, 0.9]

  useEffect(() => {
    if (!open) return
    if (videoFile) {
      const u = URL.createObjectURL(videoFile)
      setInternalUrl(u)
    } else {
      setInternalUrl(videoUrl || null)
    }
    setSuggested([])
    return () => {
      // cleanup objectURLs we created
      setSuggested(prev => {
        prev.forEach(s => { try { URL.revokeObjectURL(s.url) } catch (e) {} })
        return []
      })
      if (internalUrl) {
        try { URL.revokeObjectURL(internalUrl) } catch (e) {}
      }
      setInternalUrl(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, videoFile, videoUrl])

  const handleLoadedMetadata = () => {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration || 0)
    setCurrentTime(0)
    // تولید suggested frames بعد از اینکه duration معلوم شد
    generateSuggestedFrames(v)
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const seekTo = (t) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = t
  }

  const captureFromVideoElement = (v) => {
    // فرض: ویدیو در حال حاضر در لحظه صحیح seek شده است
    const w = v.videoWidth || 1280
    const h = v.videoHeight || 720
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.drawImage(v, 0, 0, w, h)
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('cannot capture frame'))
        const file = new File([blob], 'cover.png', { type: 'image/png' })
        resolve({ blob, file })
      }, 'image/png')
    })
  }

  // تابع کمکی: seek و گرفتن فریم در زمان t
  const captureAt = (t) => {
    const v = videoRef.current
    if (!v) return Promise.reject(new Error('video missing'))
    return new Promise((resolve, reject) => {
      const onSeeked = async () => {
        v.removeEventListener('seeked', onSeeked)
        try {
          const result = await captureFromVideoElement(v)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      v.addEventListener('seeked', onSeeked)
      try {
        v.currentTime = Math.min(Math.max(0, t), v.duration || t)
      } catch (err) {
        v.removeEventListener('seeked', onSeeked)
        reject(err)
      }
    })
  }

  const generateSuggestedFrames = async (v) => {
    if (!v || !v.duration) return
    // پاکسازی قبلی
    setSuggested(prev => { prev.forEach(s => { try { URL.revokeObjectURL(s.url) } catch (e) {} }); return [] })
    const results = []
    for (const p of suggestedPositions) {
      const t = Math.min(v.duration * p, v.duration)
      try {
        // captureAt از ویدیو استفاده می‌کنه (ویدیو باید از internalUrl یا videoUrl بارگذاری شده باشه)
        const { blob } = await captureAt(t)
        const url = URL.createObjectURL(blob)
        results.push({ time: t, blob, url })
      } catch (err) {
        console.warn('suggested capture failed', err)
      }
    }
    setSuggested(results)
  }

  const captureCurrentFrame = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      const { file } = await captureFromVideoElement(v)
      return file
    } catch (err) {
      console.error('capture error', err)
      throw err
    }
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-4 max-h-[90vh] overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">انتخاب فریم از ویدیو</h3>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="text-sm text-gray-600">بستن</button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="w-full bg-black/5 rounded overflow-hidden">
              <video
                ref={videoRef}
                src={internalUrl}
                controls={false}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                className="w-full max-h-[60vh] bg-black"
              />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="px-3 py-2 bg-blue-600 text-white rounded">
                {playing ? 'توقف' : 'پخش'}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.05}
                  value={currentTime}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">{Math.round(currentTime)}s / {Math.round(duration)}s</div>
              </div>

              <button
                onClick={async () => {
                  try {
                    const file = await captureCurrentFrame()
                    onSelect(file)
                    onClose()
                  } catch (err) {
                    alert('خطا در گرفتن فریم. احتمالاً مشکل CORS وجود دارد یا ویدیو بارگذاری نشده است.')
                  }
                }}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                انتخاب این فریم به عنوان کاور
              </button>
            </div>

            {/* suggested thumbnails */}
            {suggested.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">فریم‌های پیشنهادی</div>
                <div className="flex gap-3 overflow-x-auto py-2">
                  {suggested.map((s, i) => (
                    <div key={i} className="text-center">
                      <img
                        src={s.url}
                        alt={`suggested-${i}`}
                        className="w-36 h-20 object-cover rounded cursor-pointer border hover:scale-[1.02] transition-transform"
                        onClick={() => {
                          // تبدیل blob به File و ارسال
                          const file = new File([s.blob], `frame-${Math.round(s.time)}.png`, { type: 'image/png' })
                          onSelect(file)
                          onClose()
                        }}
                      />
                      <div className="text-xs text-gray-500 mt-1">~{Math.round(s.time)}s</div>
                      <button
                        onClick={() => {
                          const file = new File([s.blob], `frame-${Math.round(s.time)}.png`, { type: 'image/png' })
                          onSelect(file)
                          onClose()
                        }}
                        className="mt-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded"
                      >
                        استفاده به عنوان کاور
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}