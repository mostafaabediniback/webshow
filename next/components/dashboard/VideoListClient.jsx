'use client'

import { useState } from 'react'
import VideoListSection from './VideoListSection'
import { useDashboardVideos } from '@/lib/hooks/videoHooks'

export default function VideoListClient({ title, channelId }) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useDashboardVideos(page, channelId)

  return (
    <VideoListSection
      title={title}
      items={data?.items || []}
      page={page}
      totalPages={data?.totalPages || 1}
      onPageChange={setPage}
      isLoading={isLoading}
    />
  )
}
