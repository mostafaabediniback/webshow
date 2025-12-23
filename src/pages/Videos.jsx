import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import useChannel from "../hooks/useChannel";
import useChannelVideos from "../hooks/useChannelVideos";
import useDeleteVideo from "../hooks/useDeleteVideo";
import { Play } from "iconsax-react";
import VideoRow from "../components/VideoRow";
import VideoModal from "../components/VideoModal";
import ConfirmModal from "../components/ConfirmModal";

function Videos() {
  const { channels: chans, isLoadingChannels } = useChannel();
  const [chanId, setChanId] = useState("");
  const { data, isLoading, isError } = useChannelVideos(chanId);
  const { deleteVideo, isDeleting } = useDeleteVideo();
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDelete = (videoId) => {
    setDeleteConfirmId(videoId);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteVideo(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleShow = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">ویدیوهای آپلودشده</h1>
          <p className="text-sm text-gray-600">مشاهده و مدیریت تمام ویدیوهای آپلود شده</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            فیلتر بر اساس کانال
          </label>
          <select
            value={chanId}
            onChange={(e) => setChanId(e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoadingChannels}
          >
            <option value="">همه ویدیوها</option>
            {(chans || []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium">خطا در بارگذاری ویدیوها</p>
              <p className="text-sm text-gray-500 mt-2">لطفاً دوباره تلاش کنید</p>
            </div>
          ) : (data || []).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Play size={32} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                {chanId
                  ? "ویدیویی در این کانال یافت نشد"
                  : "هنوز ویدیویی آپلود نشده است"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {(data || []).map((v) => (
                <VideoRow
                  key={v.id}
                  item={v}
                  onDelete={handleDelete}
                  onShow={handleShow}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <VideoModal
        videoId={selectedVideoId}
        isOpen={!!selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="حذف ویدیو"
        message="آیا از حذف این ویدیو مطمئن هستید؟ این عمل قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        isLoading={isDeleting}
      />
    </DashboardLayout>
  );
}

export default Videos;
