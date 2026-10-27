import { useInfiniteQuery } from '@tanstack/react-query'
import { DEFAULT_VIDEO_TYPE } from '../../constants/videoTypeOptions'
import { getVideosByChannel } from '../../services/videoApi'

const useInfiniteChannelVideos = (channelId, pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ['channelVideos-infinite', channelId, pageSize, DEFAULT_VIDEO_TYPE],
    queryFn: ({ pageParam }) =>
      getVideosByChannel(channelId, pageParam, pageSize, DEFAULT_VIDEO_TYPE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPageParam < lastPage.totalPages ? lastPageParam + 1 : undefined,
    enabled: !!channelId,
    staleTime: 2 * 60 * 1000,
  })
}

export default useInfiniteChannelVideos
