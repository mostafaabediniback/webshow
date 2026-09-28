import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums'
import { getUsersByPhone } from '../../services/userApi'

function useUsersList(phoneNumber = '', page = 1) {
  const normalizedPhoneNumber = phoneNumber.trim()

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.user, normalizedPhoneNumber, page],
    queryFn: () => getUsersByPhone(normalizedPhoneNumber, page),
  })

  return {
    users: data?.items || [],
    pagination: data,
    isLoadingUsers: isLoading,
    isFetchingUsers: isFetching,
    isErrorUsers: isError,
    refetchUsers: refetch,
  }
}

export default useUsersList
