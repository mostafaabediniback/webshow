import axios from 'axios'

const api = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' }
})

export const getVideos = async () => {
  const res = await api.get('/data/videos.json')
  return res.data
}

export const getVideoById = async (id) => {
  const items = await getVideos()
  return items.find((v) => String(v.id) === String(id))
}

export default api