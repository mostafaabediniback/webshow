import { useMutation } from '@tanstack/react-query'
import { completeUserDataService } from '../../services/completeUserDataService'
import { setAuthSession } from '../../store/useAuthStore'
import { normalizeRole, getDefaultDashboardRoute } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useCompleteUserData = () => {
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: completeUserDataService,
    onSuccess: (res, variables) => {
      const token = res?.data?.token || variables?.token || null
      const user = res?.data?.data || res?.data?.user || res?.data || null
      const roleName = normalizeRole(user?.role)
      const channelId = user?.channel_id || user?.channel?.id || null

      if (token && user) {
        setAuthSession({
          token,
          userId: user?.id ?? null,
          role: roleName,
          name: user?.name ?? null,
          channelId,
        })

        toast.success('ثبت‌نام با موفقیت تکمیل شد', { position: 'bottom-right', theme: 'colored' })
        navigate(getDefaultDashboardRoute(roleName), { replace: true })
      }
    },
    onError: (error) => {
      const errorMessages = error?.response?.data?.errors || 'خطا در تکمیل اطلاعات';
      toast.error(errorMessages, { position: 'bottom-right', theme: 'colored' })
    }
  })
}

export default useCompleteUserData
