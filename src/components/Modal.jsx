import { useEffect } from 'react'
import { CloseCircle } from 'iconsax-react'

/**
 * کامپوننت Modal سفارشی
 * 
 * @example
 * // استفاده ساده
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="عنوان">
 *   <p>محتوای modal</p>
 * </Modal>
 * 
 * @example
 * // با footer سفارشی
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)} 
 *   title="عنوان"
 *   footer={
 *     <button onClick={handleSave}>ذخیره</button>
 *   }
 * >
 *   <p>محتوای modal</p>
 * </Modal>
 * 
 * @example
 * // با header سفارشی
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   header={<div>Header سفارشی</div>}
 * >
 *   <p>محتوای modal</p>
 * </Modal>
 * 
 * @param {boolean} isOpen - وضعیت باز/بسته بودن modal
 * @param {function} onClose - تابع بستن modal
 * @param {ReactNode} children - محتوای modal
 * @param {string} title - عنوان modal (اختیاری)
 * @param {string} size - اندازه modal: 'sm', 'md', 'lg', 'xl', 'full' (پیش‌فرض: 'md')
 * @param {boolean} showCloseButton - نمایش دکمه بستن (پیش‌فرض: true)
 * @param {boolean} closeOnOverlayClick - بستن با کلیک روی overlay (پیش‌فرض: true)
 * @param {boolean} closeOnEscape - بستن با کلید Escape (پیش‌فرض: true)
 * @param {string} overlayClassName - کلاس‌های اضافی برای overlay
 * @param {string} contentClassName - کلاس‌های اضافی برای محتوا
 * @param {ReactNode} footer - محتوای footer (اختیاری)
 * @param {ReactNode} header - محتوای header سفارشی (اختیاری، اگر ارائه شود title نادیده گرفته می‌شود)
 */
function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlayClassName = '',
  contentClassName = '',
  footer,
  header,
}) {
  // مدیریت بستن با کلید Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // مدیریت scroll body هنگام باز بودن modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  // تعیین اندازه modal
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4',
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || header || showCloseButton) && (
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
            {header ? (
              header
            ) : title ? (
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            ) : (
              <div />
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                aria-label="بستن"
              >
                <CloseCircle size={24} className="text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal

