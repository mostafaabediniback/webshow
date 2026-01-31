import Layout from "../layouts/Layout";
import { useVideos } from "../hooks/useVideos";
import VideoGrid from "../components/VideoGrid";
import CategoryChips from "../components/CategoryChips";
import VideoSkeleton from "../components/VideoSkeleton";
import { useState } from "react";

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
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-10 bg-slate-50/95 backdrop-blur-sm pb-3 pt-2 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
          <CategoryChips
            channels={channelsList}
            activeChannelId={activeChannelId}
            onSelect={(id) => setActiveChannelId(id)}
          />
        </div>
        {/* <h2 className="sr-only">ویدیوهای پیشنهادی</h2> */}

        {isLoading ? (
          <div className="mt-4 sm:mt-6">
            <VideoSkeleton count={10} />
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-600">
            خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
          </div>
        ) : (
          <div className="mt-4 sm:mt-6 space-y-8">
            {activeChannelId && (
              <div className="flex items-center justify-between px-1">
                <div className="text-sm text-gray-600">
                  مسیر: خانه / کانال{" "}
                  {channelsList.find((c) => c.id === activeChannelId)?.name ||
                    activeChannelId}
                </div>
                <button
                  onClick={() => setActiveChannelId(null)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  حذف فیلتر
                </button>
              </div>
            )}
            {data?.videos?.map((section, index) => {
              const channelData = Array.isArray(section) ? section[0] : section;
              if (!channelData) return null;

              // Handle nested videos array structure
              let videos = [];
              if (Array.isArray(channelData.videos)) {
                const first = channelData.videos[0];
                videos = Array.isArray(first)
                  ? channelData.videos.flat()
                  : channelData.videos;
              }

              if (videos.length === 0) return null;

              return (
                <div key={index} className="p-4 bg-amber-100/30 backdrop-blur-md rounded-xl border border-amber-200/30 shadow-md">
                {/* // <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 hover:shadow-lg transition-shadow "> */}
                  <div className="flex flex-row gap-2 items-center mb-4 bg-amber-700/30 backdrop-blur-md px-3 py-2 rounded-lg border border-amber-500/20">
                    {" "}
                    <img
                      src={channelData.image}
                      alt={"#"}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all"
                    />
                    <h3 className="text-lg sm:text-xl font-bold  px-1 text-gray-900">
                      {channelData.channel ||
                        channelData.channel_name ||
                        "ویدیوها"}
                    </h3>
                  </div>
                  <VideoGrid items={videos} />
                </div>
              );
            })}

            {(!data?.videos || data.videos.length === 0) && (
              <div className="text-center py-12 text-gray-500">
                ویدیویی یافت نشد
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
