/* global process */
import axios from 'axios'

export const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''

const axiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }

  if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json'
  if (!config.headers.Accept) config.headers.Accept = 'application/json'
  return config
})

export default axiosInstance
