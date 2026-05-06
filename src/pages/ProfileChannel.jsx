import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { PlayCircle } from "iconsax-react";

import Layout from "../layouts/Layout";
import VideoGrid from "../components/VideoGrid";
import VideoSkeleton from "../components/VideoSkeleton";

import useChannelDetail from "../hooks/useChannelDetail";
import useInfiniteLandingVideos from "../hooks/useInfiniteLandingVideos";

const PAGE_SIZE = 25;

const ProfileChannel = () => {
  const location = useLocation();

  const [channelId, setChannelId] = useState(null);

  const loadMoreRef = useRef(null);

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

  // INFINITE SCROLL
  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // RETRY
  const handleRefresh = useCallback(() => {
    refetchVideos();
  }, [refetchVideos]);

  const showInitialLoading = videosLoading && videosList.length === 0;

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
              <div className="relative h-40 sm:h-52 w-full overflow-hidden rounded-2xl border border-gray-200">
                <img
                  src={channel?.background_image}
                  alt="cover"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end gap-4 relative">
                {/* AVATAR */}
                <div className="relative -mt-16 sm:-mt-20">
                  <img
                    src={channel?.image}
                    alt="avatar"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white object-cover shadow-md bg-white"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {channel?.name}
                  </h2>

                  <p className="text-sm text-gray-500">@{channel?.username}</p>

                  {channel?.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-2xl">
                      {channel.description}
                    </p>
                  )}
                </div>

                {/* SOCIALS */}
                <div className="flex gap-2 flex-wrap">
                  {channel?.socials &&
                    Object.entries(channel.socials).map(([key]) => (
                      <span
                        key={key}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600"
                      >
                        {key}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* VIDEOS */}
          {showInitialLoading ? (
            <VideoSkeleton count={PAGE_SIZE} />
          ) : videosError ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <span className="text-2xl">⚠</span>
              </div>

              <p className="text-red-600 font-medium mb-2">
                خطا در دریافت ویدیوها
              </p>

              <button
                onClick={handleRefresh}
                className="text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all"
              >
                تلاش مجدد
              </button>
            </div>
          ) : videosList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 shadow-lg">
                <PlayCircle size={40} color="#f97316" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                ویدیویی یافت نشد
              </h3>

              <p className="text-slate-600 text-center max-w-md">
                هنوز ویدیویی برای این کانال منتشر نشده است.
              </p>
            </div>
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
