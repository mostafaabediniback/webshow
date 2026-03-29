import Home from '../src/pages/Home'
import serverAxios from '../lib/serverAxios'

// همون mapper خودت
const mapPaginatedResponse = (data) => {
  const items =
    Array.isArray(data?.data) ? data.data :
    Array.isArray(data?.data?.data) ? data.data.data :
    []

  const totalPages =
    Number(data?.last_page || data?.meta?.last_page || data?.pagination?.last_page || 1) || 1

  const totalItems =
    Number(data?.total || data?.meta?.total || items.length) || items.length

  return { items, totalPages, totalItems }
}

export async function getServerSideProps() {
  try {
    const [channelsRes, videosRes] = await Promise.all([
      serverAxios.get('/landing/channels?page=1&per_page=10'),
      serverAxios.get('/landing/videos?page=1&per_page=25'),
    ])

    const initialChannels = mapPaginatedResponse(channelsRes.data)
    const initialVideos = mapPaginatedResponse(videosRes.data)

    console.log('SSR OK')

    return {
      props: {
        initialChannels,
        initialVideos,
      },
    }
  } catch (error) {
    console.log('SSR Error:', error?.message)

    return {
      props: {
        initialChannels: { items: [], totalPages: 1, totalItems: 0 },
        initialVideos: { items: [], totalPages: 1, totalItems: 0 },
      },
    }
  }
}

export default Home