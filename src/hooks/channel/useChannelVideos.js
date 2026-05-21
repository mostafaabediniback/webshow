import { useQuery } from '@tanstack/react-query'
import { getAllVideos, getVideosByChannel } from '../../services/videoApi'
import { DEFAULT_VIDEO_TYPE } from '../../constants/videoTypeOptions'

const useChannelVideos = ({
  channelId,
  pageNumber = 1,
  pageSize = 25,
  videoType = DEFAULT_VIDEO_TYPE,
  enabled = true,
} = {}) => {
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all', pageNumber, pageSize, videoType],

    queryFn: () => {
      if (channelId) {
        return getVideosByChannel(channelId, pageNumber, pageSize, videoType)
      }
      return getAllVideos(pageNumber, pageSize, videoType)
    },

    enabled,
  })
}

export default useChannelVideos
