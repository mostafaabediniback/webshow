import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { SearchNormal1, CloseCircle } from 'iconsax-react'
import { useQuery } from '@tanstack/react-query'
import { getSearch } from '../services/videoApi'
import defaultCover from '../assets/img/cover.jpg'

function SearchInput() {
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onSubmit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    navigate(`/search/${encodeURIComponent(q.trim())}`)
  }

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300)
    return () => clearTimeout(t)
  }, [q])

  const { data: searchData } = useQuery({
    queryKey: ['search-inline', debouncedQ],
    queryFn: () => getSearch(debouncedQ),
    enabled: debouncedQ.length >= 2,
  })

  const inlineVideos = useMemo(() => {
    const payload = searchData?.data
    if (!payload) return []
    if (Array.isArray(payload)) return payload
    if (payload.videos) {
      if (Array.isArray(payload.videos)) {
        const sample = payload.videos[0]
        if (sample && Array.isArray(sample.videos)) {
          return payload.videos.flatMap((v) => (Array.isArray(v.videos) ? v.videos.flat() : []))
        }
        return payload.videos
      }
    }
    return []
  }, [searchData])

  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-xl">
      <div className="relative group">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setQ('')
              if (pathname.startsWith('/search')) navigate('/')
            }
          }}
          placeholder="جستجو در ویدیوها"
          className="w-full h-11 rounded-full border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 px-4 pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm placeholder:text-gray-400"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ('')
              if (pathname.startsWith('/search')) navigate('/')
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
            aria-label="حذف جستجو"
          >
            <CloseCircle size={18} color="#64748b" className="group-focus-within:text-blue-500" />
          </button>
        )}
        <button 
          type="submit" 
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
          aria-label="جستجو"
        >
          <SearchNormal1 size={18} color="#64748b" className="group-focus-within:text-blue-500" />
        </button>
        {inlineVideos.length > 0 && (
          <div className="absolute z-50 mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-2 text-xs font-medium text-gray-600 border-b border-gray-100">
              نتایج جستجو
            </div>
            <ul className="max-h-64 overflow-auto">
              {inlineVideos.slice(0, 8).map((v) => (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/v/${v.id}`)}
                    className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <img
                      src={(() => {
                        const raw = v.cover_link || v.cover
                        return typeof raw === 'string' ? raw.replace(/[`'"]/g, '').trim() || defaultCover : defaultCover
                      })()}
                      alt={v.title}
                      className="w-12 h-7 rounded object-cover bg-gray-200"
                      onError={(e) => { e.target.src = defaultCover }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{v.title}</div>
                      <div className="text-xs text-gray-600 truncate">{v.channel_name}</div>
                    </div>
                  </button>
                </li>
              ))}
              {inlineVideos.length > 8 && (
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(`/search/${encodeURIComponent(q.trim())}`)}
                    className="w-full text-right px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm text-blue-700"
                  >
                    مشاهده همه نتایج
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchInput
