import { useQuery } from '@tanstack/react-query'
import { getChannelById } from '../services/channelApi'
import { QueryKeys } from '../enums'

const useChannelDetail = (id) => {
  return useQuery({
    queryKey: [QueryKeys.channelDetail, id],
    queryFn: () => getChannelById(id),
    enabled: !!id,
  })
}

export default useChannelDetail
