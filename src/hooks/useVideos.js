import { useQuery } from '@tanstack/react-query'
import { getLanding } from '../services/videoApi'

export const useVideos = (channelId) => {
  return useQuery({
    queryKey: ['landing', channelId || 'all'],
    queryFn: async () => {
      const data = await getLanding(channelId);
      return data;
    }
  })
}

export default useVideos
