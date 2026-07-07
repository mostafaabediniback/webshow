import { CloseCircle, TickCircle } from "iconsax-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaylistModal from "../components/Upload/PlaylistModal";
import {
  BasicMetadataFields,
  CategoryMultiSelect,
  CoverField,
} from "../features/video-upload/components/VideoMetadataFields";
import UploadSourceCard from "../features/video-upload/components/UploadSourceCard";
import { UPLOAD_TEXT } from "../features/video-upload/constants/uploadText";
import useVideoUploadDraft from "../features/video-upload/hooks/useVideoUploadDraft";
import useCategories from "../hooks/category/useCategories";
import useChannel from "../hooks/channel/useChannel";
import useCreatePlaylist from "../hooks/playlist/useCreatePlaylist";
import useVideoUpload from "../hooks/video/useVideoUpload";
import UplodLayout from "../layouts/UplodLayout";
import { Button } from "../ui";

function Upload() {
  const navigate = useNavigate();
  const draft = useVideoUploadDraft({
    urlReadyText: UPLOAD_TEXT.urlReadyPlatform,
  });
  const { uploadAsync, isPending } = useVideoUpload();
  const { channels, isLoadingChannels } = useChannel();
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useCategories();
  const createPlaylistMutation = useCreatePlaylist();

  const [channelId, setChannelId] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState([]);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);

  const resetForm = () => {
    draft.resetDraft();
    setChannelId("");
    setSelectedCategories([]);
    setSelectedPlaylistIds([]);
  };

  const handleCancelAndRefresh = () => {
    window.location.reload();
  };

  const handleUpload = async () => {
    if (!draft.title.trim() || !channelId) {
      alert(UPLOAD_TEXT.validationTitleChannel);
      return;
    }

    if (!draft.tempPath && !draft.videoUrl) {
      alert(UPLOAD_TEXT.validationVideo);
      return;
    }

    if (!draft.coverFile) {
      alert(UPLOAD_TEXT.validationCover);
      return;
    }

    try {
      await uploadAsync({
        channelId,
        title: draft.title,
        description: draft.description,
        temp_path: draft.tempPath,
        url: draft.videoUrl,
        coverFile: draft.coverFile,
        public_show: draft.publicShow,
        categories: selectedCategories.map(Number).filter(Number.isFinite),
        play_lists: selectedPlaylistIds.map(Number).filter(Number.isFinite),
      });

      navigate("/dashboard/videos");
      resetForm();
    } catch {
      // Error toast is handled by useVideoUpload.
    }
  };

  return (
    <UplodLayout>
      <div className="flex justify-center items-center">
        <div className="space-y-2 w-full h-full sm:max-w-7xl pb-20 pt-10 px-5">
          <UploadSourceCard draft={draft} showUploadTypeTabs showProgress />

          <BasicMetadataFields
            draft={draft}
            channelSelector={
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {UPLOAD_TEXT.chooseChannel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={channelId}
                  onChange={(event) => setChannelId(event.target.value)}
                  disabled={isLoadingChannels}
                  className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{UPLOAD_TEXT.chooseChannel}</option>
                  {(channels || []).map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </select>
              </div>
            }
          />

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-2 justify-center sm:justify-between pt-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full">
              <div className="space-y-6">
                <CategoryMultiSelect
                  categories={categories}
                  isLoading={isLoadingCategories}
                  isError={isCategoriesError}
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </div>
            </div>

            <CoverField draft={draft} />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              onClick={handleCancelAndRefresh}
              icon={<CloseCircle size={16} color="currentColor" />}
              className="hover:border-red-300 hover:text-red-700 hover:bg-red-50"
            >
              {UPLOAD_TEXT.cancel}
            </Button>
            <Button
              onClick={handleUpload}
              disabled={
                !draft.title.trim() ||
                !channelId ||
                (draft.uploadType === "file" && !draft.tempPath) ||
                (draft.uploadType === "url" && !draft.videoUrl) ||
                !draft.coverFile
              }
              isLoading={isPending}
              icon={<TickCircle size={20} color="currentColor" />}
              className="h-12"
            >
              {UPLOAD_TEXT.publish}
            </Button>
          </div>
        </div>
      </div>

      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        isPending={createPlaylistMutation.isPending}
        onSubmit={async (payload) => {
          await createPlaylistMutation.mutateAsync(payload);
        }}
      />
    </UplodLayout>
  );
}

export default Upload;
