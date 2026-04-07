import { useState } from "react";
import useChannel from "../../hooks/useChannel";
import { toast } from "react-toastify";

function ImageUploader({ label, imageFile, setImageFile }) {
    const [drag, setDrag] = useState(false);

    return (
        <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-800">{label}</p>

            <div
                className={`rounded-xl border-2 transition-all ${
                    drag
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

function ChannelSettings({ channelId }) {
    const [channelImage, setChannelImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const {
        changeChannelImage,
        changeProfileChannelImage,
        isChangingChannelImage,
        isChangingProfileImage,
    } = useChannel();

    const isLoading =
        isChangingChannelImage || isChangingProfileImage;

    const handleSubmit = async () => {
        try {
            // کاور
            if (channelImage) {
                await changeChannelImage(channelImage, channelId);
                setChannelImage(null);
                // toast.success("تصویر کاور با موفقیت تغییر کرد");
            }

            // پروفایل
            if (profileImage) {
                await changeProfileChannelImage(profileImage, channelId);
                setProfileImage(null);
                // toast.success("تصویر پروفایل با موفقیت تغییر کرد");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "خطا در ذخیره تصاویر"
            );
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* کاور کانال */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
                    <ImageUploader
                        label="تصویر کاور کانال"
                        imageFile={channelImage}
                        setImageFile={setChannelImage}
                    />

                    <div className="text-xs text-gray-600 space-y-1 leading-5">
                        <p>• حداکثر حجم فایل: <span className="font-medium">۴ مگابایت</span></p>
                        <p>
                            • نسبت تصویر پیشنهادی: <span className="font-medium">۹:۱</span>
                        </p>
                        <p className="text-gray-500">
                            (مثال: 1800×200 ، 1600×177 ، 2200×245 پیکسل)
                        </p>
                    </div>
                </div>

                {/* پروفایل */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
                    <ImageUploader
                        label="تصویر پروفایل"
                        imageFile={profileImage}
                        setImageFile={setProfileImage}
                    />

                    <div className="text-xs text-gray-600 space-y-1 leading-5">
                        <p>• حداکثر حجم فایل: <span className="font-medium">۴ مگابایت</span></p>
                        <p>
                            • نسبت تصویر: <span className="font-medium">۱:۱ (مربع)</span>
                        </p>
                        <p className="text-gray-500">
                            حداقل ابعاد: 300×300 پیکسل
                        </p>
                    </div>
                </div>
            </div>

            {/* دکمه */}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white transition
                    ${
                        isLoading
                            ? "bg-orange-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                    }
                `}
            >
                {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
        </div>
    );
}

export default ChannelSettings;