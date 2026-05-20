import { PlayCircle } from "iconsax-react";

/**
 * Reusable Empty State component
 * @param {Object} props
 * @param {string} props.title - Main title text
 * @param {string} props.message - Descriptive message
 * @param {React.ReactNode} props.icon - Custom icon to display
 * @param {React.ReactNode} props.action - Optional action button/element
 * @param {string} props.className - Additional classes for container
 */
const EmptyState = ({ 
  title, 
  message, 
  icon = <PlayCircle size={40} className="text-orange-500" />, 
  action,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 border-dashed ${className}`}>
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        {title}
      </h3>
      {message && (
        <p className="text-slate-600 text-center max-w-md">
          {message}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
