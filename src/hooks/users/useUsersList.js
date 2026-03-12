import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums'
import { getUsersByPhone } from '../../services/userApi'

function useUsersList(phoneNumber = '') {
  const normalizedPhoneNumber = phoneNumber.trim()

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.user, normalizedPhoneNumber],
    queryFn: () => getUsersByPhone(normalizedPhoneNumber),
  })

  return {
    users: data?.data || [],
    isLoadingUsers: isLoading,
    isFetchingUsers: isFetching,
    isErrorUsers: isError,
    refetchUsers: refetch,
  }
}

export default useUsersList
