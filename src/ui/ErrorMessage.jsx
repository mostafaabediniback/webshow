/**
 * Reusable Error Message component
 * @param {Object} props
 * @param {string} props.title - Error title
 * @param {string} props.message - Error message details
 * @param {Function} props.onRetry - Callback function for retry button
 * @param {string} props.className - Additional classes for container
 */
const ErrorMessage = ({ 
  title = "خطا در دریافت اطلاعات", 
  message = "لطفاً دوباره تلاش کنید", 
  onRetry,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200 ${className}`}>
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <span className="text-2xl" role="img" aria-label="error">⚠</span>
      </div>
      <p className="text-red-600 font-medium mb-2">{title}</p>
      {message && <p className="text-sm text-slate-500 mb-4">{message}</p>}
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
