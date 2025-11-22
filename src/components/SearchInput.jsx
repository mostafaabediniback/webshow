import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SearchNormal1 } from 'iconsax-react'

function SearchInput() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-xl">
      <div className="relative group">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در ویدیوها"
          className="w-full h-11 rounded-full border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 px-4 pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm placeholder:text-gray-400"
        />
        <button 
          type="submit" 
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
          aria-label="جستجو"
        >
          <SearchNormal1 size={18} color="#64748b" className="group-focus-within:text-blue-500" />
        </button>
      </div>
    </form>
  )
}

export default SearchInput