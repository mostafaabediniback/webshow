import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signIn, signOut } from '../services/signInApi'
import { setAuthSession, clearAuthStore } from '../store/useAuthStore'
import { getDefaultDashboardRoute, normalizeRole } from '../utils/auth'

const useLogin = () => {
  const navigate = useNavigate()
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false)
  const [codeOtp, setcodeOtp] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const resetLocalState = () => {
    setVerifyPhoneNumber(false)
    setcodeOtp(false)
  }

  const logOut = useMutation({
    mutationFn: signOut,
    onSuccess: (res) => {
      clearAuthStore()
      const message = res?.message || 'با موفقیت از حساب کاربری خارج شدید'
      toast.success(message, { position: 'top-right', theme: 'colored' })
      navigate('/login', { replace: true })
    },
    onError: () => {
      clearAuthStore()
      toast.error('حساب کاربری شما خارج شد، اما هنگام ثبت خروج در سرور خطایی رخ داد.', {
        position: 'top-right',
        theme: 'colored',
      })
      navigate('/login', { replace: true })
    },
  })

  const goSigIn = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      const token = res?.data?.token || null
      const user = res?.data?.user || null
      const roleName = normalizeRole(user?.role)
      const channelId = user?.channel_id || user?.channel?.id || null

      if (!token) {
        resetLocalState()
        toast.error('خطا در دریافت اطلاعات کاربر', { position: 'top-right', theme: 'colored' })
        return
      }

      setAuthSession({
        token,
        userId: user?.id ?? null,
        role: roleName,
        channelId,
      })

      if (user?.phone_number) {
        setPhoneNumber(user.phone_number)
      }

      toast.success('ورود با موفقیت انجام شد', { position: 'top-right', theme: 'colored' })
      navigate(getDefaultDashboardRoute(roleName), { replace: true })
    },
    onError: (error) => {
      resetLocalState()
      const errorMessages = error?.response?.data?.errors;

      const formattedErrors = Array.isArray(errorMessages)
        ? errorMessages
        : [errorMessages || 'ورود ناموفق بود. لطفاً دوباره تلاش کنید.'];

      toast.error(formattedErrors, { position: 'top-right', theme: 'colored' })
    },
  })

  return {
    LogOut: logOut.mutateAsync,
    LogIn: goSigIn.mutateAsync,
    isLoading: goSigIn.isPending,
    isLoggingOut: logOut.isPending,
    verifyPhoneNumber,
    codeOtp,
    setcodeOtp,
    phoneNumber,
  }
}

export default useLogin
