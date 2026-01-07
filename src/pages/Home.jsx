import Layout from '../layouts/Layout'
import { useVideos } from '../hooks/useVideos'
import VideoGrid from '../components/VideoGrid'
import CategoryChips from '../components/CategoryChips'
import VideoSkeleton from '../components/VideoSkeleton'

function Home() {
  const { data, isLoading, isError } = useVideos()

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-10 bg-slate-50/95 backdrop-blur-sm pb-3 pt-2 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
          <CategoryChips />
        </div>
        <h2 className="sr-only">ویدیوهای پیشنهادی</h2>
        
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
            {data?.videos?.map((section, index) => {
              const channelData = section[0];
              if (!channelData) return null;
              
              // Handle nested videos array structure
              const videos = Array.isArray(channelData.videos) 
                ? channelData.videos.flat() 
                : [];

              if (videos.length === 0) return null;

              return (
                <div key={index}>
                  <h3 className="text-lg sm:text-xl font-bold mb-4 px-1 text-gray-900">
                    {channelData.channel}
                  </h3>
                  <VideoGrid items={videos} />
                </div>
              )
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
  )
}

export default Home