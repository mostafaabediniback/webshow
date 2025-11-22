import Layout from '../layouts/Layout'
import { useVideos } from '../hooks/useVideos'
import VideoGrid from '../components/VideoGrid'
import CategoryChips from '../components/CategoryChips'

function Home() {
  const { data, isLoading } = useVideos()

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="sticky top-[57px] sm:top-[61px] md:top-[73px] z-10 bg-slate-50/95 backdrop-blur-sm pb-3 pt-2 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
          <CategoryChips />
        </div>
        <h2 className="sr-only">ویدیوهای پیشنهادی</h2>
        {isLoading ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4 sm:mt-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-200 to-gray-300" />
                <div className="mt-3 flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 sm:mt-6">
            <VideoGrid items={data || []} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Home