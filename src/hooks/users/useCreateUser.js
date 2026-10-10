import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { QueryKeys } from '../../enums'
import { createAttachUser } from '../../services/userApi'

function useCreateUser(options = {}) {
  const queryClient = useQueryClient()
  const { onSuccess } = options

  const createUserMutation = useMutation({
    mutationFn: createAttachUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.user] })
      toast.success('کاربر با موفقیت ایجاد شد')
      onSuccess?.()
    },
  })

  return {
    createUser: createUserMutation.mutateAsync,
    isCreatingUser: createUserMutation.isPending,
  }
}

export default useCreateUser
