import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateMyPassword } from '../../services/userProfileApi'

function useUpdateMyPassword(options = {}) {
  const { onSuccess } = options

  const mutation = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: () => {
      toast.success('رمز عبور با موفقیت تغییر کرد')
      onSuccess?.()
    },
  })

  return {
    updateMyPassword: mutation.mutateAsync,
    isUpdatingMyPassword: mutation.isPending,
  }
}

export default useUpdateMyPassword