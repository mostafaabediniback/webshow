import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { getVideoDetail } from "../services/videoApi";
import useUpdateVideo from "../hooks/useUpdateVideo";

function EditVideoModal({ videoId, isOpen, onClose, initialVideo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const { updateVideoAsync, isUpdating } = useUpdateVideo();

  const initialCover = useMemo(() => {
    return (
      initialVideo?.cover_link ||
      initialVideo?.cover_url ||
      initialVideo?.cover ||
      initialVideo?.thumbnailUrl ||
      ""
    );
  }, [initialVideo]);

  useEffect(() => {
    if (!isOpen || !videoId) return;

    setTitle(initialVideo?.title || "");
    setDescription(initialVideo?.description || "");
    setCoverFile(null);
    setCoverPreview(initialCover);

    const fetchDetail = async () => {
      try {
        setIsLoadingDetail(true);
        const response = await getVideoDetail(videoId);
        const detail = response?.data || response || {};

        setTitle(detail?.title || initialVideo?.title || "");
        setDescription(detail?.description || initialVideo?.description || "");
        setCoverPreview(
          detail?.cover_link ||
            detail?.cover_url ||
            detail?.cover ||
            detail?.thumbnailUrl ||
            initialCover ||
            ""
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [isOpen, videoId, initialVideo, initialCover]);

  useEffect(() => {
    if (!coverFile) return;
    const objectUrl = URL.createObjectURL(coverFile);
    setCoverPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [coverFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("عنوان ویدیو الزامی است");
      return;
    }

    try {
      await updateVideoAsync({
        videoId,
        title: title.trim(),
        description: description || "",
        coverFile,
      });
      onClose();
    } catch {
      // errors handled in hook
    }
  };

  const handleClose = () => {
    if (isUpdating) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="ویرایش ویدیو"
      size="md"
      closeOnOverlayClick={!isUpdating}
      closeOnEscape={!isUpdating}
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isUpdating}
            className="h-10 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-sm font-medium transition-colors"
          >
            انصراف
          </button>
          <button
            type="submit"
            form="edit-video-form"
            disabled={isUpdating || isLoadingDetail}
            className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      }
    >
      {isLoadingDetail ? (
        <div className="text-center py-10">
          <div className="inline-block w-7 h-7 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-500">در حال دریافت اطلاعات ویدیو...</p>
        </div>
      ) : (
        <form id="edit-video-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              عنوان ویدیو <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="عنوان جدید ویدیو"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 px-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
              placeholder="توضیحات جدید ویدیو"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              تصویر کاور
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              disabled={isUpdating}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover preview"
                className="mt-3 w-44 h-24 rounded-lg object-cover border border-gray-200"
              />
            )}
          </div>
        </form>
      )}
    </Modal>
  );
}

export default EditVideoModal;
