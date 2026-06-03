import { useMutation } from '@tanstack/react-query'
import { otpSendService } from '../../services/otpSendService'
import { toast } from 'react-toastify'

const useSendOtp = () => {
  return useMutation({
    mutationFn: otpSendService,
    onError: (error) => {
      const errorMessages = error?.response?.data?.errors || 'خطا در ارسال کد تایید';
      toast.error(errorMessages, { position: 'bottom-right', theme: 'colored' })
    }
  })
}

export default useSendOtp
