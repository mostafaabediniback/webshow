import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { useMemo, useState } from "react";

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

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;

    return options.filter((item) =>
      resolveLabel(item)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );
  }, [options, query]);

  const selectedItems = useMemo(
    () => options.filter((item) => selectedValues.includes(String(item?.id))),
    [options, selectedValues],
  );

  const handleToggle = (optionId) => {
    const optionKey = String(optionId);
    const exists = selectedValues.includes(optionKey);
    const next = exists
      ? selectedValues.filter((item) => item !== optionKey)
      : [...selectedValues, optionKey];

    onChange?.(next);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <SearchNormal1
          size={18}
          color="#64748b"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-11 w-full rounded-lg border border-gray-300 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 rounded-lg border border-blue-100 bg-blue-50/70 p-2">
          {selectedItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToggle(item.id)}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm"
            >
              {resolveLabel(item)}
              <CloseCircle size={14} color="currentColor" />
            </button>
          ))}
        </div>
      )}

      <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-lg">
        {filteredOptions.length === 0 ? (
          <p className="text-sm text-gray-500 p-3">{emptyMessage}</p>
        ) : (
          filteredOptions.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(String(item.id))}
                onChange={() => handleToggle(item.id)}
                disabled={disabled}
              />
              <span className="text-sm">{resolveLabel(item)}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
