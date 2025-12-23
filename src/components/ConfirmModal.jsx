import Modal from './Modal'
import { Danger, Warning2 } from 'iconsax-react'

/**
 * کامپوننت Modal تایید برای عملیات‌های حساس مثل حذف
 * 
 * @param {boolean} isOpen - وضعیت باز/بسته بودن modal
 * @param {function} onClose - تابع بستن modal
 * @param {function} onConfirm - تابع تایید
 * @param {string} title - عنوان modal (پیش‌فرض: 'تایید عملیات')
 * @param {string} message - پیام تایید
 * @param {string} confirmText - متن دکمه تایید (پیش‌فرض: 'تایید')
 * @param {string} cancelText - متن دکمه انصراف (پیش‌فرض: 'انصراف')
 * @param {string} variant - نوع: 'danger' یا 'warning' (پیش‌فرض: 'danger')
 * @param {boolean} isLoading - وضعیت لودینگ (برای غیرفعال کردن دکمه‌ها)
 */
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'تایید عملیات',
  message,
  confirmText = 'تایید',
  cancelText = 'انصراف',
  variant = 'danger',
  isLoading = false,
}) {
  const handleConfirm = () => {
    onConfirm()
  }

  const isDanger = variant === 'danger'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="h-10 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-sm font-medium transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`h-10 px-4 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-yellow-600 hover:bg-yellow-700'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال پردازش...
              </>
            ) : (
              <>
                {isDanger ? <Danger size={18} /> : <Warning2 size={18} />}
                {confirmText}
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDanger ? 'bg-red-100' : 'bg-yellow-100'
          }`}
        >
          {isDanger ? (
            <Danger size={24} className="text-red-600" />
          ) : (
            <Warning2 size={24} className="text-yellow-600" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-base text-gray-900 leading-relaxed">{message}</p>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal

