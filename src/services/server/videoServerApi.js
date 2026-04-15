const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''

const getUrl = (path) => `${API_BASE_URL}${path}`

export async function getVideoDetailServer(id) {
  const res = await fetch(getUrl(`/video/show/${id}`), { cache: 'no-store' })
  if (!res.ok) {
    return null
  }
  return res.json()
}

export async function getVideosByChannelServer(channelId, page = 1, perPage = 25) {
  if (!channelId) return { items: [] }

  const params = new URLSearchParams({ page: String(page), per_page: String(perPage) })
  const res = await fetch(getUrl(`/video/${channelId}?${params.toString()}`), { cache: 'no-store' })

  if (!res.ok) {
    return { items: [] }
  }

  const data = await res.json()
  const items = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : []

  return { items }
}

export async function getSearchServer(q) {
  const res = await fetch(getUrl(`/search/${encodeURIComponent(q)}`), { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export async function getLandingChannelsServer() {
  const res = await fetch(getUrl('/landing/channels?page=1&per_page=20'), { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}
