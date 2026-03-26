import axiosInstance from '@/lib/axiosConfig'

const mapPaginatedResponse = (data) => {
  const items = Array.isArray(data?.data) ? data.data : Array.isArray(data?.data?.data) ? data.data.data : []
  const totalPages = Number(data?.last_page || data?.meta?.last_page || data?.pagination?.last_page || 1) || 1
  const totalItems = Number(data?.total || data?.meta?.total || items.length) || items.length
  return { items, totalPages, totalItems }
}

export const getLandingChannels = async ({ pageNumber = 1, pageSize = 20 } = {}) => {
  const res = await axiosInstance.get('/landing/channels', { params: { page: pageNumber, per_page: pageSize } })
  return mapPaginatedResponse(res.data)
}

export const getLandingVideos = async ({ channelId, pageNumber = 1, pageSize = 25 } = {}) => {
  const params = { page: pageNumber, per_page: pageSize }
  if (channelId) params.channel_id = channelId
  const res = await axiosInstance.get('/landing/videos', { params })
  return mapPaginatedResponse(res.data)
}

export const getSearch = async (q) => {
  const res = await axiosInstance.get(`/search/${encodeURIComponent(q)}`)
  return res.data
}

export const getVideoDetail = async (id) => {
  const res = await axiosInstance.get(`/video/show/${id}`)
  return res.data
}

export const getVideosByChannel = async ({ channelId, pageNumber = 1, pageSize = 25 }) => {
  const endpoint = channelId ? `/video/${channelId}` : '/video'
  const res = await axiosInstance.get(endpoint, { params: { page: pageNumber, per_page: pageSize } })
  return mapPaginatedResponse(res.data)
}
