import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { QueryKeys } from '../../enums'
import { updateUser } from '../../services/userApi'

function useUpdateUser(options = {}) {
  const queryClient = useQueryClient()
  const { onSuccess } = options

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.user] })
      toast.success('اطلاعات کاربر با موفقیت بروزرسانی شد')
      onSuccess?.()
    },
  })

  return {
    updateUser: updateUserMutation.mutateAsync,
    isUpdatingUser: updateUserMutation.isPending,
  }
}

export default useUpdateUser
