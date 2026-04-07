import { useQuery } from '@tanstack/react-query'
import { getVideosByChannel, getAllVideos } from '../services/videoApi'

const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25 } = {}) => {
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all', pageNumber, pageSize],
    queryFn: () => {
      if (!channelId || channelId === '') {
        return getAllVideos(pageNumber, pageSize)
      }
      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    // enabled: true,
    enabled: false,
  })
}

export default useChannelVideos
