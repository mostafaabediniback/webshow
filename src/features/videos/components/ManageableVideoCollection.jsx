import { Pagination } from "@mui/material";
import EditVideoModal from "../../../components/EditVideoModal";
import PlaylistCard from "../../../pages/PlaylistCard";
import VideoRow from "../../../components/VideoRow";
import VideoTypeFilter from "../../../components/VideoTypeFilter";
import {
  DEFAULT_VIDEO_TYPE,
  VIDEO_TYPE_OPTIONS,
} from "../../../constants/videoTypeOptions";
import { ConfirmModal, EmptyState, ErrorMessage, Spinner } from "../../../ui";
import useVideoManagementActions from "../hooks/useVideoManagementActions";

const TEXT = {
  allVideos: "همه ویدیوها",
  cancel: "انصراف",
  confirmDelete: "آیا از حذف این ویدیو مطمئن هستید؟",
  currentFilter: "فیلتر فعلی",
  delete: "حذف",
  deleteVideo: "حذف ویدیو",
  loadingVideos: "در حال بارگذاری ویدیوها...",
  noPlaylists: "هنوز پلی‌لیستی ثبت نشده است",
  videoType: "نوع ویدیو",
};

function getFilterLabel(videoType) {
  return (
    VIDEO_TYPE_OPTIONS.find((item) => item.value === videoType)?.label ||
    TEXT.allVideos
  );
}

function ManageableVideoCollection({
  videosResponse,
  playlistsResponse,
  page,
  setPage,
  videoType = DEFAULT_VIDEO_TYPE,
  setVideoType,
  viewMode,
  setViewMode,
  isLoadingVideos,
  isFetchingVideos = false,
  isVideosError,
  refetchVideos,
  isLoadingPlaylists,
  isPlaylistsError,
  refetchPlaylists,
  toolbarStart = null,
  emptyVideosTitle,
  emptyPlaylistsTitle = TEXT.noPlaylists,
  deleteMessage = TEXT.confirmDelete,
  showToolbar = true,
}) {
  const actions = useVideoManagementActions();
  const videos = Array.isArray(videosResponse?.items) ? videosResponse.items : [];
  const playlists = Array.isArray(playlistsResponse?.items)
    ? playlistsResponse.items
    : [];
  const isVideosMode = viewMode === "videos";
  const isLoading = isVideosMode
    ? isLoadingVideos || isFetchingVideos
    : isLoadingPlaylists;
  const isError = isVideosMode ? isVideosError : isPlaylistsError;
  const onRetry = isVideosMode ? refetchVideos : refetchPlaylists;
  const isEmpty = isVideosMode ? videos.length === 0 : playlists.length === 0;
  const emptyTitle = isVideosMode ? emptyVideosTitle : emptyPlaylistsTitle;

  return (
    <>
      {showToolbar && (
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-center bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {toolbarStart}

          <div className="space-y-2">
            {/* <p className="text-sm font-semibold text-gray-900">
              {TEXT.videoType}
            </p> */}
            <VideoTypeFilter
              value={videoType}
              viewMode={viewMode}
              onChange={(value) => {
                setViewMode("videos");
                setVideoType(value);
              }}
              onPlaylistClick={() => setViewMode("playlists")}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-500">{TEXT.loadingVideos}</p>
        </div>
      ) : isError ? (
        <ErrorMessage onRetry={onRetry} />
      ) : isEmpty ? (
        <EmptyState
          title={emptyTitle}
          message={`${TEXT.currentFilter}: ${getFilterLabel(videoType)}`}
        />
      ) : isVideosMode ? (
        <>
          <div className="flex w-full flex-wrap justify-between gap-2">
            {videos.map((video) => (
              <VideoRow
                key={video.id}
                item={video}
                onDelete={actions.handleDelete}
                onShow={actions.handleShow}
                onEdit={actions.handleEdit}
                isDeleting={actions.isDeleting}
              />
            ))}
          </div>

          {videosResponse?.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4">
              <Pagination
                count={videosResponse.totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                shape="rounded"
                color="primary"
              />
            </div>
          )}
        </>
      ) : (
        <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!actions.deleteConfirmId}
        onClose={actions.closeDeleteConfirm}
        onConfirm={actions.handleConfirmDelete}
        title={TEXT.deleteVideo}
        message={deleteMessage}
        confirmText={TEXT.delete}
        cancelText={TEXT.cancel}
        variant="danger"
        isLoading={actions.isDeleting}
      />
      <EditVideoModal
        videoId={actions.editingVideo?.id}
        initialVideo={actions.editingVideo}
        isOpen={!!actions.editingVideo}
        onClose={actions.closeEditor}
      />
    </>
  );
}

export default ManageableVideoCollection;
