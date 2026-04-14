import { useQuery } from '@tanstack/react-query'
import { getAllVideos, getVideosByChannel } from '../services/videoApi'

const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25, enabled = true } = {}) => {
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all', pageNumber, pageSize],
    queryFn: () => {
      if (!channelId || channelId === '') {
        return getAllVideos(pageNumber, pageSize)
      }

      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    enabled,
  })
}

export default useChannelVideos
