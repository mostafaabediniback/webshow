import { CloseCircle, TickCircle } from "iconsax-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PlaylistModal from "../components/Upload/PlaylistModal";
import {
  BasicMetadataFields,
  CategorySingleSelect,
  CoverField,
  PlaylistMultiSelect,
} from "../features/video-upload/components/VideoMetadataFields";
import UploadSourceCard from "../features/video-upload/components/UploadSourceCard";
import { UPLOAD_TEXT } from "../features/video-upload/constants/uploadText";
import useVideoUploadDraft from "../features/video-upload/hooks/useVideoUploadDraft";
import useCategories from "../hooks/category/useCategories";
import useCreatePlaylist from "../hooks/playlist/useCreatePlaylist";
import usePlaylists from "../hooks/playlist/usePlaylists";
import useVideoUpload from "../hooks/video/useVideoUpload";
import UplodLayout from "../layouts/UplodLayout";

function UserVideos() {
  const navigate = useNavigate();
  const draft = useVideoUploadDraft();
  const { uploadAsync, isPending } = useVideoUpload();
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useCategories();
  const {
    data: playlistsResponse,
    isLoading: isLoadingPlaylists,
    isError: isPlaylistsError,
  } = usePlaylists();
  const createPlaylistMutation = useCreatePlaylist();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState([]);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);

  const playlists = playlistsResponse?.items || [];

  const resetForm = () => {
    draft.resetDraft();
    setSelectedCategory("");
    setSelectedPlaylistIds([]);
  };

  const handleCancelAndRefresh = () => {
    window.location.reload();
  };

  const handleUpload = async () => {
    if (!draft.title.trim()) {
      toast.error(UPLOAD_TEXT.validationTitle);
      return;
    }

    if (!draft.tempPath && !draft.videoUrl) {
      toast.error(UPLOAD_TEXT.validationVideo);
      return;
    }

    if (!draft.coverFile) {
      toast.error(UPLOAD_TEXT.validationCover);
      return;
    }

    try {
      await uploadAsync({
        title: draft.title.trim(),
        description: draft.description,
        temp_path: draft.tempPath,
        url: draft.videoUrl,
        coverFile: draft.coverFile,
        public_show: draft.publicShow,
        categories: selectedCategory ? [Number(selectedCategory)] : [],
        play_lists: selectedPlaylistIds.map(Number).filter(Number.isFinite),
      });

      navigate("/dashboard/user-videos");
      resetForm();
    } catch {
      // Error toast is handled by useVideoUpload.
    }
  };

  return (
    <UplodLayout>
      <div className="flex justify-center items-center">
        <div className="space-y-6 w-full h-full sm:max-w-7xl pb-8 pt-5 px-5">
          <UploadSourceCard draft={draft} />

          {draft.videoFile && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 justify-center sm:justify-between pt-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full">
                  <div className="space-y-5">
                    <BasicMetadataFields draft={draft} />

                    <CategorySingleSelect
                      categories={categories}
                      isLoading={isLoadingCategories}
                      isError={isCategoriesError}
                      selectedCategory={selectedCategory}
                      onChange={setSelectedCategory}
                    />

                    <PlaylistMultiSelect
                      playlists={playlists}
                      isLoading={isLoadingPlaylists}
                      isError={isPlaylistsError}
                      selectedPlaylistIds={selectedPlaylistIds}
                      onChange={setSelectedPlaylistIds}
                      onCreate={() => setPlaylistModalOpen(true)}
                    />
                  </div>
                </div>

                <CoverField draft={draft} />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleCancelAndRefresh}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm flex items-center gap-2 hover:border-red-300 hover:text-red-700 hover:bg-red-50"
                >
                  <CloseCircle size={16} color="currentColor" />
                  {UPLOAD_TEXT.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={
                    !draft.title ||
                    (draft.uploadType === "file" && !draft.tempPath) ||
                    (draft.uploadType === "url" && !draft.videoUrl) ||
                    isPending ||
                    !draft.coverFile
                  }
                  className="h-12 px-6 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-600 hover:to-blue-600 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  {isPending ? (
                    UPLOAD_TEXT.publishLoading
                  ) : (
                    <>
                      <TickCircle
                        size={20}
                        color={
                          !draft.title.trim() ||
                          (draft.uploadType === "file" && !draft.tempPath) ||
                          (draft.uploadType === "url" && !draft.videoUrl) ||
                          isPending ||
                          !draft.coverFile
                            ? "#000000"
                            : "#ffffff"
                        }
                      />
                      {UPLOAD_TEXT.publish}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
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

export default UserVideos;
