import DashboardLayout from '../layouts/DashboardLayout'
import { Link } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'

function Dashboard() {
  const { totalChannels, totalVideos, isLoading } = useDashboard()

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4">داشبورد</h1>
        <p className="text-sm text-gray-600 mb-6">از منوی سمت چپ بخش موردنظر را انتخاب کنید.</p>
        
        {/* آمار کلی */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تعداد کانال‌ها</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">{totalChannels}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تعداد ویدیوها</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">{totalVideos}</p>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* لینک‌های سریع */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/dashboard/channels" className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-center transition-colors">
            مدیریت کانال‌ها
          </Link>
          <Link to="/dashboard/upload" className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-center transition-colors">
            آپلود ویدیو
          </Link>
          <Link to="/dashboard/videos" className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-center transition-colors">
            ویدیوهای آپلودشده
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard