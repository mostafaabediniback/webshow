import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import VideoGrid from "../components/VideoGrid";
import VideoSkeleton from "../components/VideoSkeleton";
import Layout from "../layouts/Layout";

import bgImag from "../assets/img/bgImag.jpg";
import useChannelDetail from "../hooks/channel/useChannelDetail";
import { useInfiniteScroll } from "../hooks/ui/useInfiniteScroll";
import { useInfiniteLandingVideos } from "../hooks/video/useInfiniteLandingVideos";
import { EmptyState, ErrorMessage } from "../ui";
import { getSocialIcon } from "../utils/socialIcons";

const PAGE_SIZE = 25;

const ProfileChannel = () => {
  const location = useLocation();

  const [channelId, setChannelId] = useState(null);
  const [showSocials, setShowSocials] = useState(false);

  // CHANNEL DETAIL
  const {
    data: channelData,
    isLoading: channelLoading,
    refetch: refetchChannel,
  } = useChannelDetail(channelId, { enabled: false });

  // VIDEOS
  const {
    data: videosData,
    isLoading: videosLoading,
    isError: videosError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchVideos,
  } = useInfiniteLandingVideos(channelId, PAGE_SIZE);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // CHANNEL
  const channel = channelData?.data;

  // VIDEOS LIST
  const videosList = useMemo(() => {
    return videosData?.pages?.flatMap((page) => page.items || []) || [];
  }, [videosData]);

  // SET CHANNEL ID
  useEffect(() => {
    if (location.state?.channelId) {
      setChannelId(location.state.channelId);
    }
  }, [location.state]);

  // REFETCH WHEN CHANNEL CHANGES
  useEffect(() => {
    if (channelId) {
      refetchChannel();
      refetchVideos();
    }
  }, [channelId]);

  // RETRY
  const handleRefresh = useCallback(() => {
    refetchVideos();
  }, [refetchVideos]);

  const showInitialLoading = videosLoading && videosList.length === 0;
  const socials = channel?.socials
    ? Object.entries(channel.socials).filter(([, social]) => social?.link)
    : [];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          {/* CHANNEL HEADER */}
          {channelLoading ? (
            <div className="mb-8">
              <div className="h-40 rounded-2xl bg-slate-200 animate-pulse" />

              <div className="flex items-end gap-4 mt-4">
                <div className="w-24 h-24 rounded-2xl bg-slate-200 animate-pulse" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden mb-8">
              {/* COVER */}
              <div className="hidden sm:block relative w-full aspect-[7/1] overflow-hidden rounded-[10px] border border-gray-200">
                <img
                  src={channel?.background_image || bgImag}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col items-center sm:items-start gap-4">
                  {/* AVATAR */}
                  <div className="relative sm:-mt-16">
                    <img
                      src={channel?.image}
                      alt="avatar"
                      className="
            w-24 h-24 sm:w-28 sm:h-28
            rounded-[10px]
            border-4 border-white
            object-cover
            shadow-md
            bg-white
          "
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4">
                    {/* INFO */}
                    <div className="text-center sm:text-right">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {channel?.name}
                      </h2>

                      <p className="text-sm text-gray-500">
                        @{channel?.username}
                      </p>

                      {channel?.description && (
                        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                          {channel.description}
                        </p>
                      )}
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
                            className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-gray-100
                  hover:bg-orange-50
                  hover:scale-110
                  transition-all duration-300
                "
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
                            className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-orange-50
                  hover:bg-orange-100
                  transition-all duration-300
                "
                          >
                            <Category
                              size="20"
                              color="#FF8A65"
                              variant="Bold"
                            />
                          </button>

                          <div
                            className={`
                  absolute top-12 left-1/2 -translate-x-1/2
                  flex items-center gap-2
                  bg-white rounded-xl shadow-lg p-2 z-50
                  transition-all duration-300
                  ${showSocials ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
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
                                  className="
                        w-10 h-10
                        flex items-center justify-center
                        rounded-full
                        bg-gray-100
                        hover:bg-orange-50
                        hover:scale-110
                        transition-all duration-300
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {showInitialLoading ? (
            <div className="mt-6">
              <VideoSkeleton count={PAGE_SIZE} />
            </div>
          ) : videosError ? (
            <ErrorMessage onRetry={handleRefresh} />
          ) : videosList.length === 0 ? (
            <EmptyState
              title="ویدیویی یافت نشد"
              message="در این کانال فعلاً ویدیویی موجود نیست."
            />
          ) : (
            <section>
              <div className="pb-8">
                <VideoGrid items={videosList} />
              </div>

              {/* LOAD MORE */}
              <div
                ref={loadMoreRef}
                className="flex justify-center py-4 min-h-16"
              >
                {isFetchingNextPage ? (
                  <div className="w-full">
                    <VideoSkeleton count={Math.min(8, PAGE_SIZE)} />
                  </div>
                ) : hasNextPage ? (
                  <span className="text-sm text-slate-500">
                    برای بارگذاری ویدیوهای بیشتر اسکرول کنید.
                  </span>
                ) : (
                  <span className="text-sm text-slate-400">
                    همه ویدیوها نمایش داده شدند.
                  </span>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileChannel;
