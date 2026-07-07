import { Category } from "iconsax-react";
import { useEffect, useState } from "react";
import bgImag from "../assets/img/bgImag.jpg";
import { DEFAULT_VIDEO_TYPE } from "../constants/videoTypeOptions";
import ManageableVideoCollection from "../features/videos/components/ManageableVideoCollection";
import useChannelDetail from "../hooks/channel/useChannelDetail";
import useChannelVideos from "../hooks/channel/useChannelVideos";
import usePlaylists from "../hooks/playlist/usePlaylists";
import { usePaginationParams } from "../hooks/ui/usePaginationParams";
import DashboardLayout from "../layouts/DashboardLayout";
import { getSocialIcon } from "../utils/socialIcons";

const PAGE_SIZE = 25;

export default function UploadedVideos() {
  const { page, setPage } = usePaginationParams(1);
  const [videoType, setVideoType] = useState(DEFAULT_VIDEO_TYPE);
  const [viewMode, setViewMode] = useState("videos");
  const [showSocials, setShowSocials] = useState(false);

  const videosQuery = useChannelVideos({
    pageNumber: page,
    pageSize: PAGE_SIZE,
    video_type: videoType,
    enabled: true,
  });

  const { data } = useChannelDetail();
  const channel = data?.data;

  const playlistsQuery = usePlaylists(channel?.id, {
    enabled: viewMode === "playlists",
  });

  const socials = channel?.socials
    ? Object.entries(channel.socials).filter(([, social]) => social?.link)
    : [];

  useEffect(() => {
    setPage(1);
  }, [videoType, setPage]);

  return (
    <DashboardLayout navMode="bottom">
      <div className="space-y-6">
        <div className="overflow-hidden">
          <div className="hidden sm:block relative aspect-[7/1] w-full overflow-hidden rounded-[10px]">
            <img
              src={channel?.background_image || bgImag}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-4 sm:p-6">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="relative sm:-mt-20">
                <img
                  src={channel?.image}
                  alt="avatar"
                  className="w-24 h-24 sm:w-24 sm:h-24 rounded-[10px] object-cover bg-white border-4 border-gray-100 shadow-lg shadow-black/20"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4">
                <div className="text-center sm:text-right">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                    {channel?.name}
                  </h2>
                  <p className="text-sm text-gray-500 break-all">
                    {channel?.description || channel?.username}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {socials.slice(0, 3).map(([key, social]) => {
                    const iconUrl = getSocialIcon(key, social.icon);

                    return (
                      <a
                        key={key}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={key}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-50 hover:scale-110 transition-all duration-300"
                      >
                        <img
                          src={iconUrl}
                          alt={key}
                          className="w-10 h-10 object-contain"
                        />
                      </a>
                    );
                  })}

                  {socials.length > 3 && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowSocials((prev) => !prev)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 transition-all duration-300"
                      >
                        <Category size="20" color="#FF8A65" variant="Bold" />
                      </button>

                      <div
                        className={`absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white rounded-xl shadow-lg p-2 z-50 transition-all duration-300 ${
                          showSocials ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                      >
                        {socials.slice(3).map(([key, social]) => {
                          const iconUrl = getSocialIcon(key, social.icon);

                          return (
                            <a
                              key={key}
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={key}
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-50 hover:scale-110 transition-all duration-300"
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
                  )}
                </div>
              </div>
            </div>
          </div>

          <ManageableVideoCollection
            videosResponse={videosQuery.data}
            playlistsResponse={playlistsQuery.data}
            page={page}
            setPage={setPage}
            videoType={videoType}
            setVideoType={setVideoType}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isLoadingVideos={videosQuery.isLoading}
            isFetchingVideos={videosQuery.isFetching}
            isVideosError={videosQuery.isError}
            refetchVideos={videosQuery.refetch}
            isLoadingPlaylists={playlistsQuery.isLoading}
            isPlaylistsError={playlistsQuery.isError}
            refetchPlaylists={playlistsQuery.refetch}
            emptyVideosTitle="هنوز ویدیویی ثبت نشده"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
