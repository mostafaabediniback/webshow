import { useQuery } from '@tanstack/react-query'
import { getVideos } from '../services/api'

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: getVideos
  })
}

export default useVideos