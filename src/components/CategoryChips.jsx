import { useState } from 'react'

const CATS = ['همه', 'برنامه‌نویسی', 'فرانت‌اند', 'بک‌اند', 'طراحی', 'آموزشی', 'ابزارها']

function CategoryChips() {
  const [active, setActive] = useState(0)

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-3 scrollbar-hide touch-pan-x">
      {CATS.map((c, i) => (
        <button
          key={c}
          onClick={() => setActive(i)}
          className={`whitespace-nowrap h-8 sm:h-9 px-3 sm:px-4 rounded-full border font-medium text-xs sm:text-sm transition-all duration-200 touch-manipulation flex-shrink-0 ${
            active === i
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md hover:shadow-lg scale-105'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:scale-95'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export default CategoryChips