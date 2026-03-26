'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getLandingChannels, getLandingVideos, getSearch, getVideoDetail, getVideosByChannel } from '@/lib/services/videoApi'

export const useLandingChannels = () => useQuery({
  queryKey: ['landing-channels'],
  queryFn: () => getLandingChannels({ pageNumber: 1, pageSize: 20 }),
})

export const useInfiniteLandingVideos = (channelId) => useInfiniteQuery({
  queryKey: ['landing-videos', channelId],
  queryFn: ({ pageParam = 1 }) => getLandingVideos({ channelId, pageNumber: pageParam, pageSize: 25 }),
  getNextPageParam: (lastPage, allPages) => (allPages.length < (lastPage?.totalPages || 1) ? allPages.length + 1 : undefined),
  initialPageParam: 1,
})

export const useSearchVideos = (q) => useQuery({
  queryKey: ['search', q],
  queryFn: () => getSearch(q),
  enabled: Boolean(q),
})

export const useVideoDetail = (id) => useQuery({
  queryKey: ['video', id],
  queryFn: () => getVideoDetail(id),
  enabled: Boolean(id),
})

export const useDashboardVideos = (pageNumber = 1, channelId) => useQuery({
  queryKey: ['dashboard-videos', pageNumber, channelId],
  queryFn: () => getVideosByChannel({ channelId, pageNumber, pageSize: 25 }),
})
