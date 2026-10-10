
export default function DefaultCoversModal({ open, onClose, defaultCovers = [], onSelect }) {
  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 max-h-[80vh] overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">کاورهای پیشنهادی</h3>
            <button onClick={onClose} className="text-sm text-gray-600">بستن</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {defaultCovers.map((src, i) => (
              <button
                key={i}
                onClick={async () => {
                  try {
                    // fetch تصویر و تبدیل به File
                    const res = await fetch(src);
                    const blob = await res.blob();
                    const ext = (blob.type.split('/')[1] || 'png');
                    const file = new File([blob], `default-cover-${i}.${ext}`, { type: blob.type });
                    onSelect(file)
                    onClose()
                  } catch (err) {
                    console.error('failed to fetch default cover', err)
                    // fallback: اگر نمی‌خوای fetch کنی می‌تونی فقط path رو پاس بدی
                  }
                }}
                className="rounded overflow-hidden border hover:scale-[1.02] transition-transform"
              >
                <img src={src} alt={`default-${i}`} className="w-full h-36 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}