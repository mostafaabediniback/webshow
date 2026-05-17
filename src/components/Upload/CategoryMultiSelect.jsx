import { useMemo, useState } from "react";

export default function CategoryMultiSelect({ categories = [], value = [], onChange, onCreateClick, isLoading }) {
  const [query, setQuery] = useState("");
  const selectedIds = useMemo(() => value.map(Number), [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => (c?.name || "").toLowerCase().includes(q));
  }, [categories, query]);

  const toggle = (id) => {
    const exists = selectedIds.includes(Number(id));
    onChange(exists ? selectedIds.filter((x) => x !== Number(id)) : [...selectedIds, Number(id)]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجوی دسته‌بندی..." className="h-10 px-3 rounded-lg border border-gray-300 w-full" />
        <button type="button" onClick={onCreateClick} className="px-3 h-10 text-xs rounded-lg border border-blue-200 text-blue-700 bg-blue-50">دسته جدید</button>
      </div>
      <div className="rounded-lg border border-gray-200 p-2 max-h-40 overflow-auto">
        {isLoading ? <div className="h-12 bg-gray-100 animate-pulse rounded" /> : filtered.length === 0 ? <p className="text-xs text-gray-500 p-2">دسته‌ای یافت نشد</p> : filtered.map((c) => (
          <label key={c.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
            <input type="checkbox" checked={selectedIds.includes(Number(c.id))} onChange={() => toggle(c.id)} />
            <span className="text-sm">{c.name}</span>
          </label>
        ))}
      </div>
      {!!selectedIds.length && <div className="flex flex-wrap gap-2">{categories.filter((c) => selectedIds.includes(Number(c.id))).map((c) => <span key={c.id} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{c.name}</span>)}</div>}
    </div>
  );
}
