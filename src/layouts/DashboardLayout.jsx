import Navbar from '../components/Navbar'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/dashboard/channels', label: 'کانال‌ها' },
  { to: '/dashboard/upload', label: 'آپلود ویدیو' },
  { to: '/dashboard/videos', label: 'ویدیوهای آپلودشده' }
]

function DashboardLayout({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-4 sm:gap-6">
            <aside className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 h-fit sticky top-24">
              <nav className="space-y-1">
                {NAV.map((item) => {
                  const active = pathname.startsWith(item.to)
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-black text-white' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-900'}`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </aside>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout