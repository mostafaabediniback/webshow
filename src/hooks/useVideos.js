import { useQuery } from '@tanstack/react-query'
import { getLanding } from '../services/videoApi'

export const useVideos = () => {
  return useQuery({
    queryKey: ['landing'],
    queryFn: async () => {
      const data = await getLanding();
      return data;
    }
  })
}

export default useVideos
