<<<<<<< HEAD
import { ScanBarcode } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FramePickerModal({
  open,
  onClose,
  videoFile,
  onSelect,
}) {
  console.log('videoFile:', videoFile)
console.log('isFile:', videoFile instanceof File)
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [suggested, setSuggested] = useState([]);

  // 🎬 ساخت src از فایل
  useEffect(() => {
    if (!open || !videoFile) return;
    const src = URL.createObjectURL(videoFile);
    setVideoSrc(src);
    return () => {
      URL.revokeObjectURL(src);
      suggested.forEach((s) => URL.revokeObjectURL(s.url));
      setSuggested([]);
    };
  }, [open, videoFile]);

  // ▶️ کنترل پخش
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  // ⏱️ گرفتن فریم از زمان خاص
  const captureAt = (time) => {
    const video = videoRef.current;
    return new Promise((resolve) => {
      const handler = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          const file = new File([blob], `frame-${time}.jpg`, {
            type: "image/jpeg",
          });
          resolve({
            url: URL.createObjectURL(blob),
            file,
            time,
          });
        }, "image/jpeg", 0.9);
        video.removeEventListener("seeked", handler);
      };
      video.addEventListener("seeked", handler);
      video.currentTime = time;
    });
  };

  // ✨ تولید فریم‌ها
  const generateFrames = useCallback(async () => {
    const video = videoRef.current;
    if (!video?.duration) return;
    const positions = [0.1, 0.3, 0.5, 0.7, 0.9];
    const frames = [];
    for (let p of positions) {
      const time = video.duration * p;
      try {
        const frame = await captureAt(time);
        frames.push(frame);
      } catch (e) {
        console.log("frame error", e);
      }
    }
    setSuggested(frames);
  }, []);

  // 📦 بعد از لود ویدیو
  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration || 0);
    generateFrames();
  };

  // 📸 گرفتن فریم فعلی
  const captureCurrentFrame = async () => {
    const v = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(v, 0, 0);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "frame.jpg", {
          type: "image/jpeg",
        });
        resolve(file);
      });
    });
  };

  if (!open || !videoFile) return null;

  return (
    // تغییرات: my-auto برای وسط‌چین عمودی، p-4 برای فاصله از بالا و پایین در موبایل
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full h-auto sm:max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* HEADER */}
        <div className="flex justify-end items-center px-4 sm:px-6 py-3 sm:py-4 shrink-0">
          <button className="text-xl px-2" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* تغییرات: overflow-y-auto به اینجا منتقل شد تا محتوا اسکرول شود و هدر ثابت بماند */}
        <div className="px-4 sm:px-6 pb-6 space-y-5 overflow-y-auto">
          {/* 🎬 VIDEO */}
          <div className="bg-[#24364A] rounded-xl overflow-hidden relative shrink-0">
            {/* <video
              ref={videoRef}
              src={videoSrc}
              video
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              className="w-full h-[220px] sm:h-[300px] object-contain"
              muted
              playsInline
              crossOrigin="anonymous"

            /> */}
            {/* controls */}
            {/* <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="bg-white px-3 py-2 rounded-full text-sm"
              >
                {playing ? "⏸" : "▶"}
              </button>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) =>
                  (videoRef.current.currentTime = e.target.value)
                }
                className="flex-1 h-2"
              />
              <span className="text-white text-[10px] sm:text-xs">
                {Math.floor(currentTime)} / {Math.floor(duration)}
              </span>
            </div> */}
            <div className="bg-[#24364A] rounded-xl overflow-hidden relative shrink-0">
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                className="w-full h-[220px] sm:h-[300px] object-contain"
                playsInline
                crossOrigin="anonymous"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              برای انتخاب تصویر شاخص می توانیدحین پخش ویدیو ،تصویر دلخواه خود را برش بزنید.
            </p>
            {/* 📸 انتخاب فریم فعلی */}
            <div className="flex justify-center items-center">
              <button
                onClick={async () => {
                  const file = await captureCurrentFrame();
                  onSelect(file);
                  onClose();
                }}
                className="bg-gray-100 hover:bg-gray-200 p-3 sm:p-4 rounded-3xl text-sm sm:text-base w-full sm:w-auto"
              >
                <div className="flex gap-2 justify-center">
                  <ScanBarcode size={24} color="#24364A" />
                  <span>انتخاب فریم فعلی ({Math.floor(currentTime)}s)</span>
                </div>
              </button>
            </div>
          </div>

          {/* ✨ فریم‌های پیشنهادی */}
          <div>
            {suggested.length > 0 && (
              <p className="text-sm text-gray-600 mb-3">
                لطفا از بین تصاویر یکی را انتخاب کنید:
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {suggested.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSelect(item.file);
                    onClose();
                  }}
                  className="cursor-pointer rounded-lg overflow-hidden active:scale-95 sm:hover:scale-105 transition border"
                >
                  <img
                    src={item.url}
                    className="w-full h-20 sm:h-24 object-cover"
                    alt={`frame-${index}`}
                  />
                  <div className="text-center text-[10px] sm:text-xs py-1 bg-gray-50">
                    {Math.floor(item.time)}s
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            (برای تصویر شاخص حتما یک عکس جذاب ، واضح، با کیفیت و مرتب با ویدیو انتخاب کنید )
          </p>
        </div>
      </div>
    </div>
  );
=======
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
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
}