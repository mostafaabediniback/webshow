'use client'

import { useMemo, useState } from 'react'
import { useInfiniteLandingVideos, useLandingChannels } from '@/lib/hooks/videoHooks'
import CategoryChips from '@/components/video/CategoryChips'
import VideoGrid from '@/components/video/VideoGrid'
import VideoSkeleton from '@/components/video/VideoSkeleton'

export default function HomePage() {
  const [activeChannelId, setActiveChannelId] = useState('')
  const { data: channelsData, isLoading: channelsLoading } = useLandingChannels()
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteLandingVideos(activeChannelId)

  const channels = channelsData?.items || []
  const videos = useMemo(() => data?.pages?.flatMap((page) => page.items || []) || [], [data])

  return (
    <section className="container grid">
      <header className="card">
        <CategoryChips channels={channels} activeChannelId={activeChannelId} onSelect={setActiveChannelId} />
      </header>

      {channelsLoading || isLoading ? (
        <VideoSkeleton count={10} />
      ) : (
        <>
          <VideoGrid items={videos} />
          {hasNextPage ? (
            <button className="btn" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? 'در حال بارگذاری...' : 'بارگذاری بیشتر'}
            </button>
          ) : null}
        </>
      )}
    </section>
  )
}
