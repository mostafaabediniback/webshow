import { Pagination } from "@mui/material";
import { Category } from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImag from "../assets/img/bgImag.jpg";
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
import { serverUrl } from "../utils/axiosConfigNew";
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
  const [showSocials, setShowSocials] = useState(false);

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
        <div className="">
          <div className=" overflow-hidden ">
            {/* COVER */}
            <div className="relative aspect-[7/1] w-full overflow-hidden rounded-[10px] ">
              <img
                src={channel?.background_image || bgImag}
                alt="cover"
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 " />
            </div>

            {/* CONTENT */}
            <div className="relative p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                {/* AVATAR */}
                <div className="relative -mt-11 sm:-mt-20">
                  <img
                    src={channel?.image}
                    alt="avatar"
                    className="
  w-16 h-16 sm:w-24 sm:h-24
  rounded-[10px]
  object-cover
  bg-white
  border-4 border-gray-100
  shadow-lg shadow-black/20
"
                  />
                </div>

                <div className="flex gap-2 justify-between items-start flex-wrap sm: flex-col">
                  {/* INFO */}
                  <div className="mx-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                      {channel?.name}
                    </h2>
                    <p className="text-sm text-gray-500 break-all">
                      {channel?.description || channel?.username}
                    </p>

                    {/* <p className="text-sm text-gray-500 break-all">
                      {channel?.username}
                    </p>

                    {channel?.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {channel.description}
                      </p>
                    )} */}
                  </div>

                  {/* SOCIALS */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSocials((prev) => !prev)}
                      className="
      flex items-center justify-center
      w-10 h-10 rounded-full
      bg-orange-50 hover:bg-orange-100
      transition-all duration-300
    "
                    >
                      <Category
                        size="32"
                        color="#FF8A65"
                        variant="Bold"
                      />
                    </button>

                    <div
                      className={`
      flex items-center gap-2 overflow-hidden
      transition-all duration-500 ease-in-out
      ${showSocials ? "max-w-[500px] opacity-100" : "max-w-0 opacity-0"}
    `}
                    >
                      {channel?.socials &&
                        Object.entries(channel.socials)
                          .filter(([, social]) => social?.link)
                          .map(([key, social]) => {
                            const iconUrl = social.icon?.startsWith("https")
                              ? social.icon
                              : `${serverUrl}${social.icon}`;
                            console.log(iconUrl);

                            return (
                              <a
                                key={key}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={key}
                                className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-gray-100
                hover:bg-orange-50
                hover:scale-110
                transition-all duration-300
                shrink-0
              "
                              >
                                <img
                                  src={iconUrl}
                                  alt={key}
                                  className="w-5 h-5 object-contain"
                                />
                              </a>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
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
          {/* <div className="border-b m-2"></div> */}

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
              <div className="flex flex-wrap ">
                {viewMode === "videos" ? (
                  <>
                    <div className="w-full justify-between flex flex-wrap gap-2">
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
