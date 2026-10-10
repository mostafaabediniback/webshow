import { useMutation } from '@tanstack/react-query'
import { otpCheckService } from '../../services/otpCheckService'
import { setAuthSession } from '../../store/useAuthStore'
import { normalizeRole, getDefaultDashboardRoute } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useCheckOtp = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: otpCheckService,
onSuccess: (res) => {
      const token = res?.data?.token || null
      const user = res?.data?.data || null

      const roleName = normalizeRole(user?.role)
      const channelId = user?.channel_id || user?.channel?.id || null

      // Only set session and navigate if the profile is complete (name is present)
      if (token && user && user.name) {
        setAuthSession({
          token,
          userId: user?.id ?? null,
          role: roleName,
          name: user?.name ?? null,
          channelId,
        })

        toast.success('ورود با موفقیت انجام شد', {
          position: 'bottom-right',
          theme: 'colored'
        })

        navigate(getDefaultDashboardRoute(roleName), {
          replace: true
        })
      }
    },
    onError: (error) => {
      const errorMessages = error?.response?.data?.errors || 'کد وارد شده صحیح نیست';
      toast.error(errorMessages, { position: 'bottom-right', theme: 'colored' })
    }
  })
}

export default useCheckOtp
