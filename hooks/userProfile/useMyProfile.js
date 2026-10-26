import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums'
import { getMyProfile } from '../../services/userProfileApi'

function useMyProfile() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.myProfile],
    queryFn: getMyProfile,
  })

  return {
    profile: data?.data || {},
    isLoadingProfile: isLoading,
    isFetchingProfile: isFetching,
    isErrorProfile: isError,
    refetchProfile: refetch,
  }
}

export default useMyProfile