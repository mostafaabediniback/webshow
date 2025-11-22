import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              وب‌شو
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              پلتفرم تماشای ویدیوهای آموزشی و سرگرمی
            </p>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">دسترسی سریع</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">خانه</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">ویدیوهای محبوب</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">دسته‌بندی‌ها</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">پشتیبانی</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">تماس با ما</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">سوالات متداول</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">قوانین و مقررات</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">شبکه‌های اجتماعی</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">تلگرام</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">اینستاگرام</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">یوتیوب</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} وب‌شو. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">حریم خصوصی</Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">شرایط استفاده</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer