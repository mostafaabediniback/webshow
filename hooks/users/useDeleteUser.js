import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { QueryKeys } from '../../enums'
import { deleteUser } from '../../services/userApi'

function useDeleteUser(options = {}) {
  const queryClient = useQueryClient()
  const { onSuccess } = options

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.user] })
      toast.success('کاربر با موفقیت حذف شد')
      onSuccess?.()
    },
  })

  return {
    deleteUser: deleteUserMutation.mutateAsync,
    isDeletingUser: deleteUserMutation.isPending,
  }
}

export default useDeleteUser
