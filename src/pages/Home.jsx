import { ArrowLeft2 } from "iconsax-react";
import { useCallback, useState } from "react";
import CategoryChips from "../components/CategoryChips";
import VideoGrid from "../components/VideoGrid";
import VideoSkeleton from "../components/VideoSkeleton";
import { useLandingChannels } from "../hooks/channel/useLandingChannels";
import { useInfiniteScroll } from "../hooks/ui/useInfiniteScroll";
import { useInfiniteLandingVideos } from "../hooks/video/useInfiniteLandingVideos";
import Layout from "../layouts/Layout";
import { EmptyState, ErrorMessage } from "../ui";

const PAGE_SIZE = 25;

function Home() {

  const [activeChannelId, setActiveChannelId] = useState(null);

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

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const channelsList = Array.isArray(channelsData?.items) ? channelsData.items : [];
  const videosList = Array.isArray(videosData?.items) ? videosData.items : [];
  const activeChannelName = channelsList.find((channel) => channel.id === activeChannelId)?.name;


  const handleChannelSelect = useCallback((id) => {
    setActiveChannelId(id);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);



  if (channelsLoading && !channelsData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 ">
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
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 ">
          <div className="sticky top-[57px] sm:top-[61px] md: z-40  sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3 backdrop-blur-md border-b border-slate-200/80 mb-2">
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
                <ArrowLeft2 size={16} className="text-slate-400"             color="currentColor"
 />
                نمایش ویدیوهای <strong className="text-slate-900">{activeChannelName || videosData?.pages?.flatMap(page => page.items || page.data || [])[0]?.channel_name}</strong>
              </span>
            </div>
          )}

          {showInitialLoading ? (
            <div className="mt-6">
              <VideoSkeleton count={PAGE_SIZE} />
            </div>
          ) : videosError ? (
            <ErrorMessage onRetry={handleRefresh} />
          ) : videosList.length === 0 ? (
            <EmptyState
              title={activeChannelId ? "ویدیویی یافت نشد" : "شروع کنید!"}
              message={activeChannelId
                ? "در این کانال فعلاً ویدیویی موجود نیست."
                : "کانالی انتخاب کنید تا ویدیوهایش را ببینید."
              }
            />
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
