import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { QueryKeys } from '../../enums'
import { updateUserPassword } from '../../services/userApi'

function useUpdateUserPassword(options = {}) {
  const queryClient = useQueryClient()
  const { onSuccess } = options

  const updateUserPasswordMutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.user] })
      toast.success('رمز عبور کاربر با موفقیت تغییر کرد')
      onSuccess?.()
    },
  })

  return {
    updateUserPassword: updateUserPasswordMutation.mutateAsync,
    isUpdatingUserPassword: updateUserPasswordMutation.isPending,
  }
}

export default useUpdateUserPassword
