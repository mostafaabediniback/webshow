import { ArrowLeft2, PlayCircle } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoryChips from "../components/CategoryChips";
import VideoGrid from "../components/VideoGrid";
import VideoSkeleton from "../components/VideoSkeleton";
import Layout from "../layouts/Layout";
import { useLandingChannels } from "../hooks/useLandingChannels";
import { useInfiniteLandingVideos } from "../hooks/useInfiniteLandingVideos";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PAGE_SIZE = 25;

function Home() {
  const { username } = useParams();
  // const navigate = useNavigate();


  const location = useLocation(); // استفاده از useLocation
  console.log(location);

  const [activeChannelId, setActiveChannelId] = useState(null);
  const loadMoreRef = useRef(null);

  const {
    data: channelsData,
    isLoading: channelsLoading,
    refetch: channelsRefetch,
  } = useLandingChannels({ pageSize: 20 });

  const {
    data: videosData,
    isLoading: videosLoading,
    isError: videosError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteLandingVideos(activeChannelId, PAGE_SIZE);

  const channelsList = Array.isArray(channelsData?.items) ? channelsData.items : [];
  const videosList = Array.isArray(videosData?.items) ? videosData.items : [];
  // console.log(videosList);
  const activeChannelName = channelsList.find((channel) => channel.id === activeChannelId)?.name;
  console.log(activeChannelName);
  console.log(activeChannelId);

  const handleChannelSelect = useCallback((id) => {
    setActiveChannelId(id);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (location.state?.channelId) {
      setActiveChannelId(location.state.channelId);
    }
  }, [location.state]);

  // useEffect(() => {
  //   if (username && !location.state?.channelId) {
  //     navigate("/", { replace: true });
  //   }
  // }, [username]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasNextPage) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, videosList.length]);



  if (channelsLoading && !channelsData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
            <VideoSkeleton count={12} />
          </div>
        </div>
      </Layout>
    );
  }

  const showInitialLoading = videosLoading && videosList.length === 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-40 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3 backdrop-blur-md border-b border-slate-200/80 mb-6">
            <CategoryChips
              channels={channelsList}
              activeChannelId={activeChannelId}
              onSelect={handleChannelSelect}
              isLoading={channelsLoading}
              isRefetch={channelsRefetch}
            />
          </div>

          {activeChannelId && (
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm mb-6">
              <span className="text-sm text-slate-600 flex items-center gap-2">
                <ArrowLeft2 size={16} className="text-slate-400" />
                نمایش ویدیوهای <strong className="text-slate-900">{activeChannelName || videosData?.pages?.flatMap(page => page.items || page.data || [])[0]?.channel_name}</strong>
              </span>
            </div>
          )}

          {showInitialLoading ? (
            <div className="mt-6">
              <VideoSkeleton count={PAGE_SIZE} />
            </div>
          ) : videosError ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <span className="text-2xl">⚠</span>
              </div>
              <p className="text-red-600 font-medium mb-2">خطا در دریافت ویدیوها</p>
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
                {activeChannelId ? "ویدیویی یافت نشد" : "شروع کنید!"}
              </h3>
              <p className="text-slate-600 text-center max-w-md">
                {activeChannelId
                  ? "در این کانال فعلاً ویدیویی موجود نیست."
                  : "کانالی انتخاب کنید تا ویدیوهایش را ببینید."
                }
              </p>
            </div>
          ) : (
            <section>
              <div className="pb-8">
                <VideoGrid items={videosList} />
              </div>

              <div ref={loadMoreRef} className="flex justify-center py-4 min-h-16">
                {isFetchingNextPage ? (
                  <div className="w-full">
                    <VideoSkeleton count={Math.min(8, PAGE_SIZE)} />
                  </div>
                ) : hasNextPage ? (
                  <span className="text-sm text-slate-500">برای بارگذاری ویدیوهای بیشتر اسکرول کنید.</span>
                ) : (
                  <span className="text-sm text-slate-400">همه ویدیوها نمایش داده شدند.</span>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
