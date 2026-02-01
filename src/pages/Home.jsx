import Layout from "../layouts/Layout";
import { useVideos } from "../hooks/useVideos";
import VideoGrid from "../components/VideoGrid";
import CategoryChips from "../components/CategoryChips";
import VideoSkeleton from "../components/VideoSkeleton";
import { useState } from "react";
import { PlayCircle, ArrowLeft2 } from "iconsax-react";

function Home() {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const { data, isLoading, isError } = useVideos(activeChannelId || undefined);
  const channelsList = Array.isArray(data?.channels)
    ? data.channels
    : data?.channels
      ? [data.channels]
      : [];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          <div className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-10 sm:py-14 md:py-18">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                به اربعین تی وی خوش آمدید
              </h1>
              <p className="mt-3 sm:mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                مجموعه‌ای از ویدیوهای آموزشی و سرگرمی را کشف کنید. کانال موردنظر خود را انتخاب کنید یا همه ویدیوها را ببینید.
              </p>
              <a
                href="#videos"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlayCircle size={20} variant="Bold" />
                مشاهده ویدیوها
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          {/* Category Chips - Sticky */}
          <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-10 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 py-3 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/80 mb-6">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">کانال‌ها</h2>
            <CategoryChips
              channels={channelsList}
              activeChannelId={activeChannelId}
              onSelect={(id) => setActiveChannelId(id)}
            />
          </div>

          {isLoading ? (
            <div className="mt-6">
              <VideoSkeleton count={10} />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <span className="text-2xl">⚠</span>
              </div>
              <p className="text-red-600 font-medium">خطا در دریافت اطلاعات</p>
              <p className="text-slate-500 text-sm mt-1">لطفاً دوباره تلاش کنید یا اتصال اینترنت خود را بررسی کنید.</p>
            </div>
          ) : (
            <div id="videos" className="space-y-10 scroll-mt-4">
              {/* Breadcrumb when channel filtered */}
              {activeChannelId && (
                <div className="flex items-center justify-between gap-3 px-2 py-2 rounded-xl bg-indigo-50/80 border border-indigo-100">
                  <span className="text-sm text-slate-600">
                    نمایش ویدیوهای{" "}
                    <strong className="text-slate-900">
                      {channelsList.find((c) => c.id === activeChannelId)?.name || activeChannelId}
                    </strong>
                  </span>
                  <button
                    onClick={() => setActiveChannelId(null)}
                    className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <ArrowLeft2 size={18} />
                    نمایش همه
                  </button>
                </div>
              )}

              {data?.videos?.map((section, index) => {
                const channelData = Array.isArray(section) ? section[0] : section;
                if (!channelData) return null;

                let videos = [];
                if (Array.isArray(channelData.videos)) {
                  const first = channelData.videos[0];
                  videos = Array.isArray(first)
                    ? channelData.videos.flat()
                    : channelData.videos;
                }

                if (videos.length === 0) return null;

                const channelName = channelData.channel || channelData.channel_name || "ویدیوها";

                return (
                  <section
                    key={index}
                    className="group rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 px-4 sm:px-5 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                      <div className="relative flex-shrink-0">
                        <img
                          src={channelData.image}
                          alt={channelName}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover ring-2 ring-white shadow-md"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          {channelName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          {videos.length} ویدیو
                        </p>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <VideoGrid items={videos} />
                    </div>
                  </section>
                );
              })}

              {(!data?.videos || data.videos.length === 0) && (
                <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed">
                  <div className="w-16 h-16 rounded-full bg-slate-200/80 flex items-center justify-center mb-4">
                    <PlayCircle size={32} className="text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">ویدیویی یافت نشد</p>
                  <p className="text-slate-500 text-sm mt-1">به زودی محتوای جدید اضافه خواهد شد.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
