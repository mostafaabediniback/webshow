import { useQuery } from '@tanstack/react-query'
import { getVideosByChannel, getAllVideos } from '../services/videoApi'

const useChannelVideos = (channelId) => {
  return useQuery({
    queryKey: ['channelVideos', channelId || 'all'],
    queryFn: () => {
      // اگر channelId خالی است، همه ویدیوها را بگیر
      if (!channelId || channelId === '') {
        return getAllVideos(1, 25);
      }
      // در غیر این صورت ویدیوهای کانال خاص را بگیر
      return getVideosByChannel(channelId);
    },
    enabled: true, // همیشه فعال است
  })
}

export default useChannelVideos
