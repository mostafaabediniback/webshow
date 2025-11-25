import DashboardLayout from '../layouts/DashboardLayout'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4">داشبورد</h1>
        <p className="text-sm text-gray-600 mb-6">از منوی سمت چپ بخش موردنظر را انتخاب کنید.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/dashboard/channels" className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-center">مدیریت کانال‌ها</Link>
          <Link to="/dashboard/upload" className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-center">آپلود ویدیو</Link>
          <Link to="/dashboard/videos" className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-center">ویدیوهای آپلودشده</Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard