import { useState } from "react";

function ImageUploader({ label, imageFile, setImageFile }) {

    const [drag, setDrag] = useState(false);

    return (
        <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-800">{label}</p>

            <div
                className={`rounded-xl border-2 transition-all ${drag
                    ? "border-blue-500 bg-blue-50"
                    : "border-dashed border-gray-300 hover:border-gray-400"
                    } p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[190px]`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    const f = e.dataTransfer.files?.[0];
                    if (f && f.type.startsWith("image/")) setImageFile(f);
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    id={label}
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />

                {imageFile ? (
                    <div className="w-full space-y-2">
                        <img
                            className="w-full h-32 rounded-lg object-cover border border-gray-200"
                            src={URL.createObjectURL(imageFile)}
                            alt="preview"
                        />
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-600 truncate">
                                {imageFile.name}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImageFile(null);
                                }}
                                className="text-red-500 hover:text-red-700 text-xs"
                            >
                                حذف تصویر
                            </button>
                        </div>
                    </div>
                ) : (
                    <label
                        htmlFor={label}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                            📷
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                            انتخاب تصویر
                        </p>
                        <p className="text-xs text-gray-500">
                            کلیک کنید یا تصویر را بکشید و اینجا رها کنید
                        </p>
                    </label>
                )}
            </div>
        </div>
    );
}
export default ImageUploader