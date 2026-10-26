import { useQuery } from '@tanstack/react-query'
import { getChannelById } from '../../services/channelApi'
import { QueryKeys } from '../../enums'

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
