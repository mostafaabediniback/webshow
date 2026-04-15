import { useQuery } from '@tanstack/react-query'
import { getAllVideos, getVideosByChannel } from '../services/videoApi'

<<<<<<< HEAD
<<<<<<< HEAD
const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25, enabled = true } = {}) => {
=======
const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25 } = {}) => {
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
const useChannelVideos = ({ channelId, pageNumber = 1, pageSize = 25, enabled = true } = {}) => {
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all', pageNumber, pageSize],
    queryFn: () => {
      if (!channelId || channelId === '') {
        return getAllVideos(pageNumber, pageSize)
      }
<<<<<<< HEAD
<<<<<<< HEAD

      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    enabled,
=======
      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    enabled: true,
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======

      return getVideosByChannel(channelId, pageNumber, pageSize)
    },
    enabled,
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  })
}

export default useChannelVideos
