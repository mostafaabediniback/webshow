import Layout from '../layouts/Layout'
import { Link } from 'react-router-dom'
import { Google, Sms, Lock } from 'iconsax-react'

function Login() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-6 sm:py-12 px-3 sm:px-4">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-xl p-5 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ورود به وب‌شو
            </h1>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              با حساب خود وارد شوید تا ویدیوها و لیست‌هایتان را مدیریت کنید
            </p>
          </div>
          <form className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">ایمیل</label>
              <div className="relative flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all px-3 sm:px-4">
                <Sms size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" color="#64748b" />
                <input 
                  type="email" 
                  className="h-11 sm:h-12 flex-1 bg-transparent focus:outline-none text-sm placeholder:text-gray-400" 
                  placeholder="example@mail.com" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">رمز عبور</label>
              <div className="relative flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all px-3 sm:px-4">
                <Lock size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" color="#64748b" />
                <input 
                  type="password" 
                  className="h-11 sm:h-12 flex-1 bg-transparent focus:outline-none text-sm placeholder:text-gray-400" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0 text-xs sm:text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-600">مرا به خاطر بسپار</span>
              </label>
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                فراموشی رمز؟
              </Link>
            </div>
            <button 
              type="submit" 
              className="w-full h-11 sm:h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] text-white text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation"
            >
              ورود
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-4 bg-white text-gray-500">یا</span>
              </div>
            </div>
            <button 
              type="button" 
              className="w-full h-11 sm:h-12 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm sm:text-base font-medium flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 touch-manipulation"
            >
              <Google size={18} className="sm:w-5 sm:h-5" color="#4285F4" />
              ورود با گوگل
            </button>
          </form>
          <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
            اکانت ندارید؟{' '}
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              ثبت‌نام کنید
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Login