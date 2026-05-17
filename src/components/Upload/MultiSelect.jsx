import { useMemo, useState } from "react";

function MultiSelect({ options = [], value = [], onChange, placeholder = "انتخاب کنید" }) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter((item) =>
      (item?.title || "").toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [options, query]);

  const selectedItems = useMemo(
    () => options.filter((item) => value.includes(item.id)),
    [options, value],
  );

  const toggleItem = (id) => {
    if (value.includes(id)) onChange(value.filter((itemId) => itemId !== id));
    else onChange([...value, id]);
  };

  return (
    <div className="space-y-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <span key={item.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              {item.title}
            </span>
          ))}
        </div>
      )}
      <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
        {filteredOptions.length === 0 ? (
          <p className="text-sm text-gray-500 p-3">موردی پیدا نشد</p>
        ) : (
          filteredOptions.map((item) => (
            <label key={item.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(item.id)}
                onChange={() => toggleItem(item.id)}
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
