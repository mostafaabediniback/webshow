import { useQuery } from '@tanstack/react-query'
import { getAllVideos, getVideosByChannel } from '../../services/videoApi'
import { DEFAULT_VIDEO_TYPE } from '../../constants/videoTypeOptions'

const useChannelVideos = ({
  channelId,
  pageNumber = 1,
  pageSize = 25,
  video_type = DEFAULT_VIDEO_TYPE,
  enabled = true,
} = {}) => {
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all', pageNumber, pageSize, video_type],

    queryFn: () => {
      if (channelId) {
        return getVideosByChannel(channelId, pageNumber, pageSize, video_type)
      }
      return getAllVideos(pageNumber, pageSize, video_type)
    },

    enabled,
  })
}

export default useChannelVideos
