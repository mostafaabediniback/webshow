import { useQuery } from '@tanstack/react-query'
import { getVideoById } from '../services/api'

export const useVideo = (id) => {
  return useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideoById(id),
    enabled: !!id
  })
}

export default useVideo