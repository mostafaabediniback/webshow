import { FolderAdd, VideoAdd, VideoPlay } from 'iconsax-react'
import { Link } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import DashboardLayout from '../layouts/DashboardLayout'
import useAuthStore from '../store/useAuthStore'

function Dashboard() {
  const { totalChannels, totalVideos, isLoading } = useDashboard()
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!isChannelAdmin ? (
            <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">تعداد کانال‌ها</p>
                  {isLoading ? (
                    <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <p className="text-4xl font-bold text-gray-900">{totalChannels}</p>
                  )}
                </div>
                <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg">
                  <FolderAdd size={28} className="text-white" color="#ffffff" />
                </div>
              </div>
            </div>
          ) : null}

          <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">تعداد ویدیوها</p>
                {isLoading ? (
                  <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">{totalVideos}</p>
                )}
              </div>
              <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                <VideoPlay size={28} className="text-white" color="#ffffff" />
              </div>
            </div>
          </div>
        </div>

        {isChannelAdmin ? (
          <div className="grid grid-cols-1 gap-4">
            <Link
              to="/dashboard/user-videos"
              className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center mb-3 transition-colors">
                  <VideoAdd size={24} color="#F59E0B" className="text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">مدیریت ویدیوهای من</h3>
                <p className="text-xs text-gray-500">آپلود و مشاهده ویدیوهای حساب کاربری</p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/dashboard/channels"
              className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-orange-100  flex items-center justify-center mb-3 transition-colors">
                  <FolderAdd size={24} color="#F97316" className="group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">مدیریت کانال‌ها</h3>
                <p className="text-xs text-gray-500">ایجاد و مدیریت کانال‌های خود</p>
              </div>
            </Link>

            <Link
              to="/dashboard/upload"
              className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-amber-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-amber-100  flex items-center justify-center mb-3 transition-colors">
                  <VideoAdd size={24} color="#D97706" className="group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">آپلود ویدیو</h3>
                <p className="text-xs text-gray-500">آپلود ویدیوهای جدید</p>
              </div>
            </Link>

            <Link
              to="/dashboard/videos"
              className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-yellow-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-3 transition-colors">
                  <VideoPlay size={24} color="#EAB308" className="group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">ویدیوهای آپلودشده</h3>
                <p className="text-xs text-gray-500">مشاهده و مدیریت ویدیوها</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
