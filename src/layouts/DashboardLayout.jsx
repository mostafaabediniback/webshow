<<<<<<< HEAD
import { FolderAdd, Home2, People, Personalcard, Setting2, VideoAdd, VideoPlay } from 'iconsax-react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuthStore from '../store/useAuthStore'

const PLATFORM_ADMIN_NAV = [
=======
import { FolderAdd, Home2, People, Personalcard, VideoAdd, VideoPlay } from 'iconsax-react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ADMIN_NAV = [
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  { to: '/dashboard', label: 'داشبورد', icon: Home2 },
  { to: '/dashboard/channels', label: 'کانال‌ها', icon: FolderAdd },
  { to: '/dashboard/upload', label: 'بارگذاری ویدیو', icon: VideoAdd },
  { to: '/dashboard/videos', label: 'ویدیوهای من', icon: VideoPlay },
<<<<<<< HEAD
  { to: '/dashboard/users', label: 'کاربران', icon: People },
]

const CHANNEL_ADMIN_NAV = [
  { to: '/dashboard/user-upload', label: 'بارگذاری ویدیو', icon: VideoAdd },
  { to: '/dashboard/user-videos', label: 'ویدیوهای من', icon: Personalcard },
  { to: '/dashboard/settings', label: 'تنظیمات', icon: Setting2 },
=======
  { to: '/dashboard/users', label: 'کاربران', icon: People }

]

const USER_NAV = [
  { to: '/dashboard/user-upload', label: 'بارگذاری ویدیو', icon: VideoAdd },
  { to: '/dashboard/user-videos', label: 'ویدیوهای من', icon: Personalcard },
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
]

function DashboardLayout({ children }) {
  const { pathname } = useLocation()
<<<<<<< HEAD
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin)
  const navItems = isChannelAdmin ? CHANNEL_ADMIN_NAV : PLATFORM_ADMIN_NAV
=======
  const role = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null
  const navItems = role === 'admin' ? USER_NAV : ADMIN_NAV
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 sm:gap-6">
<<<<<<< HEAD
            <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-fit">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = pathname === item.to
                  const iconColor = active ? '#ffffff' : '#111827'
=======
            <aside className="bg-white border border-gray-200 rounded-xl p-4 h-fit lg:sticky lg:top-24 shadow-sm">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const active = pathname === item.to || (item.to !== '/dashboard' && pathname.startsWith(item.to))
                  const Icon = item.icon
                  const iconColor = active ? '#ffffff' : '#6B7280' // سفید در فعال، خاکستری در غیر فعال
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
<<<<<<< HEAD
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? 'bg-orange-500 text-white shadow-md'
=======
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      <Icon size={20} color={iconColor} variant={active ? 'Bold' : 'Outline'} />
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
