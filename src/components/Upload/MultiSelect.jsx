import { CloseCircle, SearchNormal1, ArrowDown2 } from "iconsax-react";
import { useMemo, useRef, useState, useEffect } from "react";

function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "انتخاب کنید",
  emptyMessage = "موردی پیدا نشد",
  disabled = false,
  getOptionLabel,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedValues = Array.isArray(value)
    ? value.map((item) => String(item))
    : value
      ? [String(value)]
      : [];

  const resolveLabel = (item) => {
    if (typeof getOptionLabel === "function") {
      return getOptionLabel(item);
    }

    return item?.name || item?.title || `آیتم ${item?.id}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;

    return options.filter((item) =>
      resolveLabel(item).toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [options, query, resolveLabel]);

  const selectedItems = useMemo(
    () => options.filter((item) => selectedValues.includes(String(item.id))),
    [options, selectedValues],
  );

  const handleToggle = (optionId) => {
    const optionKey = String(optionId);

    const next = selectedValues.includes(optionKey)
      ? selectedValues.filter((item) => item !== optionKey)
      : [...selectedValues, optionKey];

    onChange?.(next);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Select Box */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
className={[
  "flex h-11 w-full items-center gap-4 rounded-[10px] px-4 text-sm bg-white border transition",
  isOpen ? "border-blue-500" : "border-gray-200",
].join(" ")}      >
        <ArrowDown2
          size={14}
          color="currentColor"
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
        <span className="truncate">
          {selectedItems.length > 0
            ? `${selectedItems.length} پلی‌لیست انتخاب شده`
            : placeholder}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Search */}
          <div className="relative p-2">
            <SearchNormal1
              color="currentColor"
              size={18}
              color="#64748b"
              className="absolute right-5 top-1/2 -translate-y-1/2"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی پلی‌لیست..."
              className="h-10 w-full rounded-lg border border-gray-300 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Selected */}
          {selectedItems.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {selectedItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
                >
                  {resolveLabel(item)}
                  <CloseCircle size={14} color="currentColor" />
                </button>
              ))}
            </div>
          )}

          {/* Options */}
          <div className="max-h-60 overflow-y-auto border-t">
            {filteredOptions.length === 0 ? (
              <p className="p-3 text-sm text-gray-500">{emptyMessage}</p>
            ) : (
              filteredOptions.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center gap-2 p-3 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(String(item.id))}
                    onChange={() => handleToggle(item.id)}
                  />

                  <span className="text-sm">{resolveLabel(item)}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
