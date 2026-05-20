import { useMemo, useState } from "react";

function MultiSelect({
  options = [],
  value = "",
  onChange,
  placeholder = "انتخاب کنید",
}) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;

    return options.filter((item) =>
      (item?.title || "")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );
  }, [options, query]);

  return (
    <div className="space-y-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-lg">
        {filteredOptions.length === 0 ? (
          <p className="text-sm text-gray-500 p-3">موردی پیدا نشد</p>
        ) : (
          filteredOptions.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="single-select"
                checked={value === item.id}
                onChange={() => onChange(item.id)}
              />
              <span className="text-sm">{item.title}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

export default MultiSelect;