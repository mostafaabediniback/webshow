// components/PaginationComponent.jsx
import Pagination from '@mui/material/Pagination';
import { ArrowLeft } from 'iconsax-react';
import { ArrowRight } from 'iconsax-react';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center py-8 px-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        shape="rounded"
        color="primary"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <div
            className={`
              mx-0.5 px-3 py-2 rounded-xl font-semibold transition-all duration-300 
              flex items-center gap-1.5 min-w-[44px] h-12
              ${item.page === currentPage
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-105'
                : 'text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 hover:shadow-md'
              }
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={item.page ? () => onPageChange(item.page) : undefined}
          >
            {item.type === 'previous' && <ArrowLeft size={18} />}
            {item.type === 'next' && <ArrowRight size={18} />}
            <span>{item.page || ''}</span>
          </div>
        )}
      />

      {/* Page Info */}
      <div className="ml-6 text-sm text-slate-500 hidden md:flex items-center gap-2">
        <span>صفحه</span>
        <span className="font-semibold text-slate-900">{currentPage}</span>
        <span>از</span>
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </div>
    </div>
  );
};

export default PaginationComponent;