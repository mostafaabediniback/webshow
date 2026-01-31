import Layout from '../layouts/Layout'
import { useParams } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import VideoGrid from '../components/VideoGrid'
import VideoSkeleton from '../components/VideoSkeleton'

function Search() {
  const { q } = useParams()
  const { data, isLoading, isError } = useSearch(q)

  const payload = data?.data
  let videos = []
  if (Array.isArray(payload)) {
    videos = payload
  } else if (payload?.videos) {
    if (Array.isArray(payload.videos)) {
      const sample = payload.videos[0]
      if (sample && Array.isArray(sample.videos)) {
        videos = payload.videos.flatMap((v) => (Array.isArray(v.videos) ? v.videos.flat() : []))
      } else {
        videos = payload.videos
      }
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
          نتایج جستجو: {q}
        </h2>
        {isLoading ? (
          <VideoSkeleton count={10} />
        ) : isError ? (
          <div className="text-center py-12 text-red-600">
            خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
          </div>
        ) : videos.length > 0 ? (
          <VideoGrid items={videos} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            موردی یافت نشد
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Search
