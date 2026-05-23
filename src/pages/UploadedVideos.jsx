import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditVideoModal from "../components/EditVideoModal";
import VideoRow from "../components/VideoRow";
import VideoTypeFilter from "../components/VideoTypeFilter";
import {
  DEFAULT_VIDEO_TYPE,
  VIDEO_TYPE_OPTIONS,
} from "../constants/videoTypeOptions";
import useChannelDetail from "../hooks/channel/useChannelDetail";
import useChannelVideos from "../hooks/channel/useChannelVideos";
import usePlaylists from "../hooks/playlist/usePlaylists";
import { usePaginationParams } from "../hooks/ui/usePaginationParams";
import useDeleteVideo from "../hooks/video/useDeleteVideo";
import DashboardLayout from "../layouts/DashboardLayout";
import { ConfirmModal, EmptyState, ErrorMessage, Spinner } from "../ui";
import PlaylistCard from "./PlaylistCard";

const PAGE_SIZE = 25;

export default function UploadedVideos() {
  const navigate = useNavigate();
  const { page, setPage } = usePaginationParams(1);
  const { deleteVideoAsync, isDeleting } = useDeleteVideo();
  const [videoType, setVideoType] = useState(DEFAULT_VIDEO_TYPE);

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [viewMode, setViewMode] = useState("videos");

  const {
    data: videos,
    isLoading: isLoadingVideos,
    isFetching,
    isError,
    refetch: refetchVideos,
  } = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
    videoType,
    enabled: true, // 👈 مهم
  });
  const { data } = useChannelDetail();
  const channel = data?.data;

  const {
    data: playlistsResponse,
    isLoading: isLoadingPlaylists,
    isError: playlistsError,
    refetch: refetchPlaylists,
  } = usePlaylists(channel?.id, {
    enabled: viewMode === "playlists",
  });

  const playlists = playlistsResponse?.items || [];

  useEffect(() => {
    setPage(1);
  }, [videoType, setPage]);

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteVideoAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const videosList = Array.isArray(videos?.items) ? videos.items : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl  p-6 shadow-sm">
          <div className=" overflow-hidden mb-4">
            {/* COVER */}
            <div className="relative h-40 sm:h-52 w-full overflow-hidden rounded-2xl ">
              <img
                src={channel?.background_image}
                alt="cover"
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* CONTENT */}
            <div className="relative p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                {/* AVATAR */}
                <div className="relative -mt-16 sm:-mt-20">
                  <img
                    src={channel?.image}
                    alt="avatar"
                    className="
          w-24 h-24 sm:w-28 sm:h-28
          rounded-2xl
          object-cover
          shadow-lg
          border-1 border-gray-500
          bg-white
        "
                  />
                </div>

                <div className="flex gap-2 justify-between items-center flex-wrap">
                  {/* INFO */}
                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                      {channel?.name}
                    </h2>

                    <p className="text-sm text-gray-500 break-all">
                      {channel?.username}
                    </p>

                    {channel?.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {channel.description}
                      </p>
                    )}
                  </div>

                  {/* SOCIALS */}
                  <div className="flex flex-wrap gap-2 ">
                    {channel?.socials &&
                      Object.entries(channel.socials).map(([key, value]) => (
                        <span
                          key={key}
                          className="
              text-xs
              px-2 py-1
              bg-gray-100
              rounded-md
              text-gray-600
              whitespace-nowrap
            "
                        >
                          {key}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-col gap-3  lg:flex-row lg:items-center lg:justify-between">
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
          <div className="border-b m-2"></div>

          {isLoadingVideos || isFetching ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner size="lg" />
              <p className="mt-4 text-gray-500">در حال بارگذاری ویدیوها...</p>
            </div>
          ) : isError ? (
            <ErrorMessage onRetry={refetchVideos} />
          ) : videosList.length === 0 ? (
            <EmptyState
              title="هنوز ویدیویی ثبت نشده"
              message={`فیلتر فعلی: ${VIDEO_TYPE_OPTIONS.find((item) => item.value === videoType)?.label || "همه ویدیوها"}`}
            />
          ) : (
            <>
              <div className="space-y-3 flex flex-wrap gap-4">
                {viewMode === "videos" ? (
                  <>
                    <div className="space-y-3 flex flex-wrap gap-4">
                      {videosList.map((v) => (
                        <VideoRow
                          key={v.id}
                          item={v}
                          onDelete={(id) => setDeleteConfirmId(id)}
                          onShow={(id) => navigate(`/v/${id}`)}
                          onEdit={setEditingVideo}
                          isDeleting={isDeleting}
                        />
                      ))}
                    </div>

                    {videos?.totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4">
                        <Pagination
                          count={videos.totalPages}
                          page={page}
                          onChange={(_, value) => setPage(value)}
                          shape="rounded"
                          color="primary"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {playlists.map((playlist) => (
                      <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                  </div>
                )}
              </div>

              {videos?.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4">
                  <Pagination
                    count={videos.totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    shape="rounded"
                    color="primary"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="حذف ویدیو"
        message="آیا از حذف این ویدیو مطمئن هستید؟"
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        isLoading={isDeleting}
      />
      <EditVideoModal
        videoId={editingVideo?.id}
        initialVideo={editingVideo}
        isOpen={!!editingVideo}
        onClose={() => setEditingVideo(null)}
      />
    </DashboardLayout>
  );
}
