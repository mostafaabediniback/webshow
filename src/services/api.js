import axios from 'axios'
import axiosInstanceNew from '../utils/axiosConfigNew'

const api = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' }
})

const LS_KEYS = {
  videos: 'ws_videos',
  categories: 'ws_categories',
  channels: 'ws_channels'
}

const readLS = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const writeLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    void e
  }
}

export const getVideos = async () => {
  const res = await api.get('/data/videos.json')
  const base = res.data || []
  const extra = readLS(LS_KEYS.videos)
  return [...base, ...extra]
}

export const getVideoById = async (id) => {
  const items = await getVideos()
  return items.find((v) => String(v.id) === String(id))
}

export const getLocalVideos = async () => {
  return readLS(LS_KEYS.videos)
}

export const updateLocalVideo = async (id, payload) => {
  const list = readLS(LS_KEYS.videos)
  const next = list.map((v) => (v.id === id ? { ...v, ...payload } : v))
  writeLS(LS_KEYS.videos, next)
  return next.find((v) => v.id === id)
}

export const deleteLocalVideo = async (id) => {
  const list = readLS(LS_KEYS.videos)
  const next = list.filter((v) => v.id !== id)
  writeLS(LS_KEYS.videos, next)
  return true
}

export const getLocalVideoById = async (id) => {
  const list = readLS(LS_KEYS.videos)
  return list.find((v) => v.id === id)
}

export const getCategories = async () => {
  return readLS(LS_KEYS.categories)
}

export const createCategory = async (payload) => {
  const list = readLS(LS_KEYS.categories)
  const id = crypto.randomUUID()
  const item = { id, name: payload.name }
  const next = [item, ...list]
  writeLS(LS_KEYS.categories, next)
  return item
}

export const updateCategory = async (id, payload) => {
  const list = readLS(LS_KEYS.categories)
  const next = list.map((c) => (c.id === id ? { ...c, name: payload.name } : c))
  writeLS(LS_KEYS.categories, next)
  return next.find((c) => c.id === id)
}

export const deleteCategory = async (id) => {
  const list = readLS(LS_KEYS.categories)
  const next = list.filter((c) => c.id !== id)
  writeLS(LS_KEYS.categories, next)
  return true
}

export const getChannels = async () => {
  const res = await axiosInstanceNew.get('/channel', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return res.data || []
}

export const createChannel = async (payload) => {
  const uidRaw = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null
  const user_id = uidRaw ? Number(uidRaw) : undefined
  const res = await axiosInstanceNew.post('/channel/create', { ...payload, user_id }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return res.data
}

export const updateChannel = async (id, payload) => {
  const res = await axiosInstanceNew.put(`/channel/${id}`, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return res.data
}

export const deleteChannel = async (id) => {
  await axiosInstanceNew.delete(`/channel/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return true
}

export const addVideo = async (payload) => {
  const list = readLS(LS_KEYS.videos)
  const id = crypto.randomUUID()
  const item = {
    id,
    title: payload.title,
    description: payload.description || '',
    thumbnailUrl: payload.thumbnailUrl,
    channelName: payload.channelName || payload.categoryName || 'بدون کانال',
    views: 0,
    uploadedAt: new Date().toISOString().slice(0, 10),
    duration: payload.duration || '00:00',
    videoUrl: payload.videoUrl
  }
  const next = [item, ...list]
  writeLS(LS_KEYS.videos, next)
  return item
}

export default api
