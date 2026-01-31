import { useQuery } from '@tanstack/react-query'
import { getSearch } from '../services/videoApi'

const useSearch = (q) => {
  return useQuery({
    queryKey: ['search', q],
    queryFn: () => getSearch(q),
    enabled: !!q
  })
}

export default useSearch
