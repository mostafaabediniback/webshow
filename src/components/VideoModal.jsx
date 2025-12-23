import { useState, useEffect } from "react";
import { getVideoDetail } from "../services/videoApi";
import { toast } from "react-toastify";
import Modal from "./Modal";

/**
 * کامپوننت Modal برای نمایش جزئیات ویدیو
 */
function VideoModal({ videoId, isOpen, onClose }) {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const data = await getVideoDetail(videoId);
        setVideoData(data?.data || data);
      } catch (error) {
        toast.error("خطا در دریافت ویدیو");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (videoId && isOpen) {
      fetchVideo();
    }
  }, [videoId, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="نمایش ویدیو"
      size="lg"
    >
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">در حال بارگذاری...</p>
        </div>
      ) : videoData ? (
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <video
              controls
              className="w-full h-full"
              poster={videoData.cover_link || videoData.cover_url}
              src={videoData.video_link || videoData.path || videoData.video_url || videoData.videoUrl}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {videoData.title}
            </h3>
            {videoData.channel_name && (
              <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                کانال: {videoData.channel_name}
              </p>
            )}
            {videoData.description && (
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {videoData.description}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">ویدیو یافت نشد</p>
          <p className="text-sm text-gray-500 mt-2">لطفاً دوباره تلاش کنید</p>
        </div>
      )}
    </Modal>
  );
}

export default VideoModal;

