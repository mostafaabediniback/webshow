import { useQuery } from '@tanstack/react-query'
import { getAllVideos, getVideosByChannel } from '../services/videoApi'

<<<<<<< HEAD
const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25, enabled = true } = {}) => {
=======
const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25 } = {}) => {
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all', pageNumber, pageSize],
    queryFn: () => {
      if (!channelId || channelId === '') {
        return getAllVideos(pageNumber, pageSize)
      }
<<<<<<< HEAD

      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    enabled,
=======
      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    enabled: true,
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  })
}

export default useChannelVideos
