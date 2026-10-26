"use client";

import { useState } from 'react'
import { Modal } from '../ui'

const TERMS_OF_USE = [
  'استفاده از خدمات اربعین‌تی‌وی باید مطابق قوانین و مقررات مربوط باشد.',
  'کاربران مسئول محتوایی هستند که در سایت بارگذاری یا منتشر می‌کنند.',
  'انتشار محتوای ناقض حقوق دیگران، مالکیت فکری، حریم خصوصی یا قوانین ممنوع است.',
  'اربعین‌تی‌وی می‌تواند محتوای ناقض قوانین یا این شرایط را حذف یا دسترسی به آن را محدود کند.',
  'محتوای ارسال‌شده توسط کاربران ممکن است برای نمایش، آرشیو، دسته‌بندی، ترجمه و انتشار در خدمات اربعین‌تی‌وی مورد استفاده قرار گیرد.',
  'حقوق محتوای متعلق به تولیدکنندگان و صاحبان اصلی آن، محفوظ است.',
  'کاربران مسئول حفظ اطلاعات حساب کاربری خود هستند و نباید اطلاعات ورود خود را در اختیار دیگران قرار دهند.',
  'اربعین‌تی‌وی می‌تواند برای حفظ امنیت و عملکرد پلتفرم، دسترسی حساب‌های متخلف را محدود یا مسدود کند.',
  'اربعین‌تی‌وی ممکن است این شرایط را در آینده به‌روزرسانی کند. نسخه جدید در همین صفحه منتشر خواهد شد.',
]

function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

  return (
    <footer >
      <div className="bg-white mx-auto max-w-7xl px-4 sm:px-6 sm:py-4">
        {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              اربعین تی وی
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
        </div> */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} اربعین تی وی. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
            <a href="https://blog.arbaeentv.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">بلاگ</a>
            <button
              type="button"
              onClick={() => setIsTermsModalOpen(true)}
              className="hover:text-blue-600 transition-colors"
            >
              شرایط استفاده
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="شرایط استفاده"
        size="md"
      >
        <div dir="rtl" className="space-y-5 text-right text-sm leading-8 text-slate-700 sm:text-base">
          <p>
            با استفاده از وب‌سایت و خدمات اربعین‌تی‌وی (ArbaeenTV)، شما با شرایط زیر موافقت می‌کنید:
          </p>
          <ul className="list-disc space-y-3 pr-5 marker:text-blue-600">
            {TERMS_OF_USE.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
          <p className="border-t border-slate-200 pt-4 text-xs text-slate-500 sm:text-sm">
            آخرین به‌روزرسانی: شهریور ۱۴۰۵
          </p>
        </div>
      </Modal>
    </footer>
  )
}

export default Footer
