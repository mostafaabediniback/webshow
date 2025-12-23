import Navbar from '../components/Navbar'
import { Link, useLocation } from 'react-router-dom'
import { FolderAdd, VideoAdd, VideoPlay, Home2 } from 'iconsax-react'

const NAV = [
  { to: '/dashboard', label: 'داشبورد', icon: Home2 },
  { to: '/dashboard/channels', label: 'کانال‌ها', icon: FolderAdd },
  { to: '/dashboard/upload', label: 'آپلود ویدیو', icon: VideoAdd },
  { to: '/dashboard/videos', label: 'ویدیوهای آپلودشده', icon: VideoPlay }
]

function DashboardLayout({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 sm:gap-6">
            <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit lg:sticky lg:top-24 shadow-sm">
              <nav className="space-y-2">
                {NAV.map((item) => {
                  const active = pathname === item.to || (item.to !== '/dashboard' && pathname.startsWith(item.to))
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        active 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} variant={active ? 'Bold' : 'Outline'} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </aside>
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout