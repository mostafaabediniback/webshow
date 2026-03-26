'use client'

import { useVideoList } from '@/lib/hooks/useVideoList'
import VideoListSection from './VideoListSection'

export default function VideoListClient({ items, title }) {
  const { items: pageItems, page, setPage, totalPages } = useVideoList(items)
  return (
    <VideoListSection
      title={title}
      items={pageItems}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  )
}
