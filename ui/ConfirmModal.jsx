import { Danger, Warning2 } from 'iconsax-react'
import { Button, Modal } from '../ui'

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

  // رنگ‌های پیش‌فرض (می‌تونید اینها رو عوض کنید)
  const dangerColor = '#DC2626' // red-600
  const warningColor = '#D97706' // yellow-600

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
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            onClick={handleConfirm}
            isLoading={isLoading}
            className={!isDanger && !isLoading ? 'bg-yellow-600 hover:bg-yellow-700 border-none' : ''}
          >
            {confirmText}
          </Button>
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
            <Danger size={24} color={dangerColor} />
          ) : (
            <Warning2 size={24} color={warningColor} />
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