import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import usePlaylists from "../hooks/playlist/usePlaylists";
import { Modal, Button, Spinner } from "../ui";
import { getVideoDetail, getVideoPlaylistIds } from "../services/videoApi";
import useUpdateVideo from "../hooks/video/useUpdateVideo";
import MultiSelect from "./Upload/MultiSelect";

function EditVideoModal({ videoId, isOpen, onClose, initialVideo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [publicShow, setPublicShow] = useState(true);
  const [channelId, setChannelId] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const { updateVideoAsync, isUpdating } = useUpdateVideo();
  const {
    data: playlistsResponse,
    isLoading: isLoadingPlaylists,
    isError: isPlaylistsError,
    refetch: refetchPlaylists,
  } = usePlaylists(channelId, { enabled: Boolean(isOpen && channelId) });
  const playlists = playlistsResponse?.items || [];

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
    setPublicShow(
      typeof initialVideo?.public_show !== "undefined"
        ? Boolean(initialVideo.public_show)
        : true
    );
    setChannelId(String(initialVideo?.channel_id || ""));
    setSelectedPlaylists(getVideoPlaylistIds(initialVideo).map(String));

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
        setPublicShow(
          typeof detail?.public_show !== "undefined"
            ? Boolean(detail.public_show)
            : true
        );
        setChannelId(String(detail?.channel_id || initialVideo?.channel_id || ""));
        setSelectedPlaylists(getVideoPlaylistIds(detail).map(String));
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
        public_show: publicShow ? 1 : 0,
        play_lists: selectedPlaylists.map(Number).filter(Number.isFinite),
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
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isUpdating}
          >
            انصراف
          </Button>
          <Button
            type="submit"
            form="edit-video-form"
            isLoading={isUpdating}
            disabled={isLoadingDetail}
          >
            ذخیره تغییرات
          </Button>
        </div>
      }
    >
      {isLoadingDetail ? (
        <div className="text-center py-10">
          <Spinner size="md" className="mb-3" />
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
              className="h-11 px-4 rounded-[10px] border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="عنوان جدید ویدیو"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 px-4 py-3 rounded-[10px] border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
              placeholder="توضیحات جدید ویدیو"
              disabled={isUpdating}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="block text-sm font-semibold text-gray-900">
                پلی‌لیست‌ها
              </label>
              {isPlaylistsError && (
                <button
                  type="button"
                  onClick={() => refetchPlaylists()}
                  className="text-xs text-blue-600"
                >
                  تلاش مجدد
                </button>
              )}
            </div>

            {!channelId ? (
              <div className="rounded-[10px] border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                شناسه کانال ویدیو برای بارگذاری پلی‌لیست‌ها در دسترس نیست.
              </div>
            ) : isLoadingPlaylists ? (
              <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                در حال بارگذاری پلی‌لیست‌ها...
              </div>
            ) : isPlaylistsError ? (
              <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                دریافت پلی‌لیست‌ها با خطا مواجه شد.
              </div>
            ) : (
              <MultiSelect
                options={playlists}
                value={selectedPlaylists}
                onChange={setSelectedPlaylists}
                placeholder="جستجوی پلی‌لیست..."
                emptyMessage="پلی‌لیستی پیدا نشد"
                getOptionLabel={(item) => item?.name || `پلی‌لیست ${item?.id}`}
              />
            )}
          </div>
          <div className="flex items-center justify-between border border-gray-200 rounded-[10px] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">نمایش عمومی</p>
              <p className="text-xs text-gray-500">
                در صورت غیرفعال بودن، ویدیو خصوصی خواهد بود
              </p>
            </div>

            <input
              type="checkbox"
              checked={publicShow}
              onChange={(e) => setPublicShow(e.target.checked)}
              disabled={isUpdating}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
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
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-3 file:rounded-[10px] file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover preview"
                className="mt-3 w-44 h-24 rounded-[10px] object-cover border border-gray-200"
              />
            )}
          </div>
        </form>
      )}
    </Modal>
  );
}

export default EditVideoModal;
