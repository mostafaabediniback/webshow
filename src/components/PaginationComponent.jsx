import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const persianNumberFormatter = new Intl.NumberFormat("fa-IR", {
  useGrouping: false,
});

const formatPersianNumber = (value) =>
  persianNumberFormatter.format(Math.max(0, Math.floor(Number(value) || 0)));

const normalizePositiveInteger = (value, fallback = 1) => {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number > 0 ? number : fallback;
};

const getVisiblePages = (totalPages, currentPage) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const siblingCount = 1;
  const firstSibling = Math.max(2, currentPage - siblingCount);
  const lastSibling = Math.min(totalPages - 1, currentPage + siblingCount);
  const pages = [1];

  if (firstSibling > 2) {
    pages.push("start-ellipsis");
  } else {
    for (let page = 2; page < firstSibling; page += 1) pages.push(page);
  }

  for (let page = firstSibling; page <= lastSibling; page += 1) {
    pages.push(page);
  }

  if (lastSibling < totalPages - 1) {
    pages.push("end-ellipsis");
  } else {
    for (let page = lastSibling + 1; page < totalPages; page += 1) {
      pages.push(page);
    }
  }

  pages.push(totalPages);
  return pages;
};

/**
 * پجینیشن مشترک صفحات داشبورد؛ با اعداد و ناوبری کاملاً فارسی/RTL.
 */
function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
  totalItems,
  showInfo = true,
  className = "",
}) {
  const pageCount = normalizePositiveInteger(totalPages);
  const selectedPage = Math.min(
    normalizePositiveInteger(currentPage),
    pageCount,
  );

  if (pageCount <= 1) return null;

  const visiblePages = getVisiblePages(pageCount, selectedPage);
  const itemCount = Number(totalItems);
  const hasTotalItems = Number.isFinite(itemCount) && itemCount >= 0;

  const changePage = (nextPage) => {
    if (
      nextPage === selectedPage ||
      nextPage < 1 ||
      nextPage > pageCount
    ) {
      return;
    }

    onPageChange(nextPage);
  };

  const pageButtonClassName =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300";

  return (
    <nav
      dir="rtl"
      aria-label="صفحه‌بندی"
      className={`mt-6 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-row ${className}`}
    >
      {showInfo ? (
        <p className="text-xs text-slate-500 sm:text-sm">
          صفحه <strong className="font-semibold text-slate-700">{formatPersianNumber(selectedPage)}</strong>{" "}
          از <strong className="font-semibold text-slate-700">{formatPersianNumber(pageCount)}</strong>
          {hasTotalItems ? (
            <span className="mr-2 text-slate-400">
              · {formatPersianNumber(itemCount)} مورد
            </span>
          ) : null}
        </p>
      ) : (
        <span />
      )}

      <div className="inline-flex max-w-full items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => changePage(selectedPage - 1)}
          disabled={selectedPage === 1}
          aria-label="صفحه قبل"
          title="صفحه قبل"
          className={`${pageButtonClassName} border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700`}
        >
          <ArrowRight2 size={18} aria-hidden="true"  color="currentColor" />
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {visiblePages.map((page) => {
            if (typeof page !== "number") {
              return (
                <span
                  key={page}
                  aria-hidden="true"
                  className="flex h-10 w-5 shrink-0 items-center justify-center text-lg leading-none text-slate-400"
                >
                  …
                </span>
              );
            }

            const isSelected = page === selectedPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-label={`رفتن به صفحه ${formatPersianNumber(page)}`}
                aria-current={isSelected ? "page" : undefined}
                className={`${pageButtonClassName} ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-sm hover:bg-orange-600"
                    : "border border-transparent bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                }`}
              >
                {formatPersianNumber(page)}
              </button>
            );
          })}
        </div>

        <span className="flex h-10 min-w-16 items-center justify-center rounded-[10px] bg-slate-50 px-2 text-xs font-semibold text-slate-700 sm:hidden">
          {formatPersianNumber(selectedPage)} / {formatPersianNumber(pageCount)}
        </span>

        <button
          type="button"
          onClick={() => changePage(selectedPage + 1)}
          disabled={selectedPage === pageCount}
          aria-label="صفحه بعد"
          title="صفحه بعد"
          className={`${pageButtonClassName} border border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700`}
        >
          <ArrowLeft2 size={18} aria-hidden="true"  color="currentColor" />
        </button>
      </div>
    </nav>
  );
}

export default PaginationComponent;
