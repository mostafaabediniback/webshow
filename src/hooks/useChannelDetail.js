import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../enums'
import { getChannelById } from '../services/channelApi'

const useChannelDetail = (id, options = {}) => {
  return useQuery({
    queryKey: id
      ? [QueryKeys.channelDetail, id]
      : [QueryKeys.channelDetail, 'default'],
    queryFn: () => getChannelById(id),
    enabled: options.enabled ?? true,
  })
}

export default useChannelDetail
