import { ScanBarcode } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FramePickerModal({
  open,
  onClose,
  videoFile,
  onSelect,
}) {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadingFrames, setLoadingFrames] = useState(false);
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
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], `frame-${time}.jpg`, {
              type: "image/jpeg",
            });
            resolve({
              url: URL.createObjectURL(blob),
              file,
              time,
            });
          },
          "image/jpeg",
          0.9,
        );
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

    setLoadingFrames(true);

    const positions = [0.2, 0.4, 0.6, 0.8]; // 👉 4 تا فریم
    const frames = [];

    for (let p of positions) {
      const time = video.duration * p;
      try {
        const frame = await captureAt(time);
        frames.push(frame);
      } catch (e) {}
    }

    setSuggested(frames);
    setLoadingFrames(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full h-auto sm:max-w-xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* HEADER */}
        <div className="flex justify-end items-center px-4 sm:px-6 py-3 sm:py-4 shrink-0">
          <button className="text-xl px-2" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-6 space-y-5 overflow-y-auto">
          {/* 🎬 VIDEO */}
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

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              برای انتخاب تصویر شاخص می توانیدحین پخش ویدیو ،تصویر دلخواه خود را
              برش بزنید.
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
                  <ScanBarcode size={24} color="currentColor" />
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
            {loadingFrames ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                <p className="mt-3 text-sm">در حال استخراج فریم‌ها...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {suggested.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onSelect(item.file);
                      onClose();
                    }}
                    className="cursor-pointer rounded-lg overflow-hidden active:scale-95 sm:hover:scale-105 transition"
                  >
                    <img
                      src={item.url}
                      className="w-full h-24 object-cover"
                      alt={`frame-${index}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">
            (برای تصویر شاخص حتما یک عکس جذاب ، واضح، با کیفیت و مرتب با ویدیو
            انتخاب کنید )
          </p>
        </div>
      </div>
    </div>
  );
}
