'use client'

import { ArrowLeft2 } from 'iconsax-react'
import { Link, useParams } from 'react-router-dom'
import VideoGrid from '../components/VideoGrid'
import VideoSkeleton from '../components/VideoSkeleton'
import useSearch from '../hooks/useSearch'
import Layout from '../layouts/Layout'

function Search() {
  const { q } = useParams()
  const { data, isLoading, isError } = useSearch(q)

  const payload = data?.data

  const extractVideosWithChannelImages = (payload) => {
    if (!payload) return []



    let videos = []

    // Case 1: Direct array
    if (Array.isArray(payload)) {
      videos = payload
    }
    // Case 2: payload.videos exists
    else if (payload?.videos && Array.isArray(payload.videos)) {
      const sample = payload.videos[0]
      if (sample && Array.isArray(sample.videos)) {
        // Nested structure
        videos = payload.videos.flatMap((v) =>
          Array.isArray(v.videos) ? v.videos.flat() : []
        )
      } else {
        // Flat videos
        videos = payload.videos
      }
    }

    // 🆕 MAGIC: Merge channels.image → videos.channel_image
    if (payload.channels && Array.isArray(payload.channels) && videos.length > 0) {

      payload.channels.forEach((channel) => {
        if (channel.id && channel.image && channel.name) {
          // برای همه ویدیوهایی که channel_name == channel.name
          videos.forEach((video) => {
            if (video.channel_name === channel.name) {
              video.channel_image = channel.image
            }
          })
        }
      })
    }
    return videos
  }
    const videos = extractVideosWithChannelImages(payload)

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft2 size={18} />
            بازگشت به خانه
          </Link>
          <span className="text-slate-400">|</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            نتایج جستجو: {q}
          </h2>
        </div>
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
