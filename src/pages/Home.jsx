import { ArrowLeft2, PlayCircle } from "iconsax-react";
import { useState } from "react";
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

  // دریافت لیست کانال‌ها
  const {
    data: channelsData,
    isLoading: channelsLoading,
    isError: channelsError
  } = useLandingChannels();

  // دریافت ویدیوها بر اساس کانال انتخابی
  const {
    data: videosData,
    isLoading: videosLoading,
    isError: videosError
  } = useLandingVideos(activeChannelId, page);

  const channelsList = Array.isArray(channelsData?.items) ? channelsData.items : [];
  const videosList = Array.isArray(videosData?.items) ? videosData.items : [];
  const totalPages = videosData?.totalPages || 1;

  if (channelsLoading) {
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
          <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-40 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3  backdrop-blur-md border-b border-slate-200/80 mb-6 ">
            <CategoryChips
              channels={channelsList}
              activeChannelId={activeChannelId}
              onSelect={(id) => {
                setActiveChannelId(id);
                setPage(1); // ریست صفحه به 1
              }}
            />
          </div>

          {/* Breadcrumb */}
          {activeChannelId && (
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm mb-6">
              <span className="text-sm text-slate-600">
                نمایش ویدیوهای{" "}
                <strong className="text-slate-900">
                  {channelsList.find((c) => c.id === activeChannelId)?.name || activeChannelId}
                </strong>
              </span>

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
              <p className="text-red-600 font-medium">خطا در دریافت ویدیوها</p>
            </div>
          ) : videosList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed">
              <div className="w-16 h-16 rounded-full bg-slate-200/80 flex items-center justify-center mb-4">
                <PlayCircle size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">
                {activeChannelId ? "ویدیویی در این کانال یافت نشد" : "ویدیویی یافت نشد"}
              </p>
            </div>
          ) : (
            <>
              {/* Videos Grid */}
              <section className="group rounded-2xl ">
                <div className="flex items-center gap-3 px-6 py-5 ">

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {activeChannelId &&
                        (channelsList.find(c => c.id === activeChannelId)?.name)
                      }
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <VideoGrid items={videosList} />
                </div>
              </section>

              {/* Pagination */}
              {totalPages > 1 && (
                <PaginationComponent
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;