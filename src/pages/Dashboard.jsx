import DashboardLayout from '../layouts/DashboardLayout'
import { Link } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import { VideoPlay, FolderAdd, VideoAdd } from 'iconsax-react'

function Dashboard() {
  const { totalChannels, totalVideos, isLoading } = useDashboard()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">داشبورد</h1>
          <p className="text-sm text-gray-600">خوش آمدید! از اینجا می‌توانید محتوای خود را مدیریت کنید.</p>
        </div>
        
        {/* آمار کلی */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">تعداد کانال‌ها</p>
                {isLoading ? (
                  <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">{totalChannels}</p>
                )}
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
                <FolderAdd size={28} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">تعداد ویدیوها</p>
                {isLoading ? (
                  <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">{totalVideos}</p>
                )}
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg">
                <VideoPlay size={28} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* لینک‌های سریع */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            to="/dashboard/channels" 
            className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center mb-3 transition-colors">
                <FolderAdd size={24} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">مدیریت کانال‌ها</h3>
              <p className="text-xs text-gray-500">ایجاد و مدیریت کانال‌های خود</p>
            </div>
          </Link>
          
          <Link 
            to="/dashboard/upload" 
            className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-purple-100 group-hover:bg-purple-500 flex items-center justify-center mb-3 transition-colors">
                <VideoAdd size={24} className="text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">آپلود ویدیو</h3>
              <p className="text-xs text-gray-500">آپلود ویدیوهای جدید</p>
            </div>
          </Link>
          
          <Link 
            to="/dashboard/videos" 
            className="group p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-green-500 hover:bg-green-50 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-500 flex items-center justify-center mb-3 transition-colors">
                <VideoPlay size={24} className="text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">ویدیوهای آپلودشده</h3>
              <p className="text-xs text-gray-500">مشاهده و مدیریت ویدیوها</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard