import axios from 'axios'
import { toast } from 'react-toastify'
import { clearAuthSession, dispatchUnauthorized, readAuthSession } from './auth'

export const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const axiosInstanceNew = axios.create({
  baseURL: serverUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

let isHandlingUnauthorized = false

const isAuthRequest = (config) => {
  const url = config?.url || ''
  return url.includes('/auth/login') || url.includes('/auth/logout')
}

axiosInstanceNew.interceptors.request.use(
  (config) => {
    const { token } = readAuthSession()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }

    if (!config.headers.Accept) {
      config.headers.Accept = 'application/json'
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstanceNew.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const data = error.response?.data
    const hadToken = Boolean(readAuthSession().token)
    const shouldHandleUnauthorized = hadToken && !isAuthRequest(error.config)

    if (data?.errors && typeof data.errors === 'object') {
      Object.keys(data.errors).forEach((field) => {
        const messages = Array.isArray(data.errors[field])
          ? data.errors[field]
          : [String(data.errors[field])]

        messages.forEach((message) => {
          toast.error(message, { position: 'top-right', theme: 'colored' })
        })
      })
    } else if (data?.message && status !== 401 && status !== 403) {
      toast.error(String(data.message), { position: 'top-right', theme: 'colored' })
    }

    if ((status === 401 || status === 403) && shouldHandleUnauthorized && !isHandlingUnauthorized) {
      isHandlingUnauthorized = true
      clearAuthSession()
      dispatchUnauthorized({ status })
      toast.info('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.', {
        position: 'top-right',
        theme: 'colored',
      })

      setTimeout(() => {
        isHandlingUnauthorized = false
      }, 0)
    }

    return Promise.reject(error)
  },
)

export default axiosInstanceNew
