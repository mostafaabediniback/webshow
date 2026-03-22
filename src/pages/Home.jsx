import { ArrowLeft2, PlayCircle } from "iconsax-react";
import { useState, useCallback } from "react"; // useCallback اضافه شد
import CategoryChips from "../components/CategoryChips";
import VideoGrid from "../components/VideoGrid";
import VideoSkeleton from "../components/VideoSkeleton";
import { usePaginationParams } from "../hooks/usePaginationParams";
import Layout from "../layouts/Layout";
import { useLandingChannels } from "../hooks/useLandingChannels";
import { useLandingVideos } from "../hooks/useLandingVideos";
import PaginationComponent from "../components/PaginationComponent";

const PAGE_SIZE = 25;

function Home() {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const { page, setPage } = usePaginationParams(1);

  const {
    data: channelsData,
    isLoading: channelsLoading,
    isError: channelsError
  } = useLandingChannels({ pageSize: 20 }); // بیشتر کانال لود کن

  const {
    data: videosData,
    isLoading: videosLoading,
    isError: videosError,
    refetch // برای refresh دستی
  } = useLandingVideos(activeChannelId, page);

  const channelsList = Array.isArray(channelsData?.items) ? channelsData.items : [];
  const videosList = Array.isArray(videosData?.items) ? videosData.items : [];
  const totalPages = videosData?.totalPages || 1;
  const activeChannelName = channelsList.find(c => c.id === activeChannelId)?.name;

  // Reset page handler با useCallback
  const handleChannelSelect = useCallback((id) => {
    setActiveChannelId(id);
    setPage(1);
  }, [setPage]);

  // Refresh handler
  const handleRefresh = () => {
    refetch();
  };
  // داخل Home component
console.log("🔍 Debug:", { 
  activeChannelId, 
  page, 
  videosData: videosData?.totalPages,
  queryKey: ["landing-videos", activeChannelId, page] 
});

  if (channelsLoading && !channelsData) { // فقط اولین بار
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          {/* Category Chips */}
          <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-40 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3 backdrop-blur-md border-b border-slate-200/80 mb-6">
            <CategoryChips
              channels={channelsList}
              activeChannelId={activeChannelId}
              onSelect={handleChannelSelect}
              isLoading={channelsLoading}
            />
          </div>

          {/* Breadcrumb */}
          {activeChannelId && (
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm mb-6">
              <span className="text-sm text-slate-600 flex items-center gap-2">
                <ArrowLeft2 size={16} className="text-slate-400" />
                نمایش ویدیوهای <strong className="text-slate-900">{activeChannelName}</strong>
              </span>
              {/* <button
                onClick={handleRefresh}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 rounded-lg hover:bg-indigo-50 transition-all"
              >
                به‌روزرسانی
              </button> */}
            </div>
          )}

          {/* Videos Content */}
          {videosLoading ? (
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
            <>
              {/* Videos Grid */}
              <section className="">


                <div className=" pb-12">
                  <VideoGrid items={videosList} />
                </div>
              </section>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <PaginationComponent
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                    showInfo // نمایش اطلاعات صفحه
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;