// components/PaginationComponent.jsx
import {
  MoreHoriz
} from "@mui/icons-material";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useState } from "react";

const PaginationComponent = ({
  totalPages,
  currentPage,
  onPageChange,
  showInfo = true,
  className = ""
}) => {
  const [hovered, setHovered] = useState(null);

  // تبدیل اعداد به فارسی
  const toPersianNumbers = (number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    if (!number || isNaN(number)) return '';
    return String(Math.floor(Number(number))).replace(/[0-9]/g, d => persianDigits[d]);
  };

  const getPageInfo = () => {
    const current = toPersianNumbers(currentPage);
    const total = toPersianNumbers(totalPages);
    return `صفحه ${current} از ${total}`;
  };

  // تولید صفحات نمایش
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    range.push(totalPages);

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div 
      dir="rtl" 
      className={`flex flex-col items-center gap-4 p-6 ${className}`}
    >
      {/* Info Bar */}


      {/* Pagination Buttons */}
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-slate-200">
        
        {/* Previous Button */}
        {/* <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`
            flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200
            ${currentPage <= 1 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-l from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
            }
            shadow-md hover:shadow-xl
          `}
          title="صفحه قبل"
        >
          <ArrowLeft2 color="#ffff" className="w-5 h-5" />
        </button> */}

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          page === '...' ? (
            <div
              key={`dots-${index}`}
              className="w-12 h-12 flex items-center justify-center text-slate-400 text-sm font-medium"
            >
              <MoreHoriz className="w-5 h-5" />
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`
                flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 font-semibold text-sm
                shadow-md hover:shadow-lg hover:scale-105 active:scale-95
                ${page === currentPage
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/50 ring-2 ring-orange-400/50'
                  : hovered === page
                  ? 'bg-blue-500/10 text-blue-700 border border-blue-200 hover:bg-blue-500/20'
                  : 'bg-white/70 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }
              `}
              onMouseEnter={() => setHovered(page)}
              onMouseLeave={() => setHovered(null)}
              title={`رفتن به صفحه ${toPersianNumbers(page)}`}
            >
              {toPersianNumbers(page)}
            </button>
          )
        ))}

        {/* Next Button */}
        {/* <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`
            flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200
            ${currentPage >= totalPages
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
            }
            shadow-md hover:shadow-xl
          `}
          title="صفحه بعد"
        >
          <ArrowRight2 color="#f97316" className="w-5 h-5" />
        </button> */}
      </div>

      {/* Quick Jump (اختیاری) */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>برو به صفحه:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = Number(e.target.value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            className="w-16 px-3 py-1 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono"
          />
        </div>
      )}
    </div>
  );
};

export default PaginationComponent;