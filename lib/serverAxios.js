import axios from 'axios'

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
})

export default serverAxios
