import { useQuery } from '@tanstack/react-query'
import { getVideoDetail } from '../services/videoApi'

export const useVideo = (id) => {
  return useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideoDetail(id),
    enabled: !!id
  })
}

export default useVideo
