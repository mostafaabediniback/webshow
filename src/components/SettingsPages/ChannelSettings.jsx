import { useState } from "react";
import useChannel from "../../hooks/useChannel";
import { toast } from "react-toastify";
import useChannelDetail from "../../hooks/useChannelDetail";
import { useEffect } from "react";
import ImageUploader from "../ImageUploader";



function ChannelSettings({ channelId }) {
    const [channelImage, setChannelImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const { data, refetch } = useChannelDetail();

    const {
        changeChannelImage,
        changeProfileChannelImage,
        isChangingChannelImage,
        isChangingProfileImage,
    } = useChannel(1, 10, {}, { enabled: false });


    // useEffect(() => {
    //     refetch()
    // }, [])

    const isLoading =
        isChangingChannelImage || isChangingProfileImage;

    const handleSubmit = () => {
        try {
            // کاور
            if (channelImage) {
                changeProfileChannelImage(
                    channelImage,
                    channelId,
                    {
                        onSuccess: () => {
                            setChannelImage(null);
                            toast.success("تصویر کاور با موفقیت تغییر کرد");
                        },
                        onError: (error) => {
                            toast.error(
                                error?.response?.data?.message ||
                                "خطا در تغییر تصویر کاور"
                            );
                        },
                    }
                );
            }

            // پروفایل
            if (profileImage) {
                changeChannelImage(
                    profileImage,
                    channelId,
                    {
                        onSuccess: () => {
                            setProfileImage(null);
                            toast.success("تصویر پروفایل با موفقیت تغییر کرد");
                            refetch()
                        },
                        onError: (error) => {
                            toast.error(
                                error?.response?.data?.message ||
                                "خطا در تغییر تصویر پروفایل"
                            );
                        },
                    }
                );
            }
            refetch()

        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "خطا در تغییر تصویر"
            );
        }
    };

    return (
        <div className="space-y-8">

            {/* ================= COVER ================= */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">

                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-700">
                        تصویر کاور کانال
                    </h2>
                </div>

                <div >

                    <div className="flex flex-col gap-4" >
                        {/* Upload */}
                        <div className="flex flex-col gap-4">
                            <ImageUploader
                                label="آپلود تصویر کاور"
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
                        <div className="pt-4 border-t space-y-3"></div>


                        {/* Preview */}
                        <div>
                            <div className="text-xs text-gray-500 mb-2 flex justify-between">
                                <span>تصویر فعلی</span>

                            </div>

                            {data?.data?.background_image ? (
                                <div className="relative overflow-hidden rounded-xl border bg-gray-50 group">
                                    <img
                                        src={data.data.background_image}
                                        className="w-full h-96  transition duration-300 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                                </div>
                            ) : (
                                <div className="w-full h-44 rounded-xl border border-dashed flex items-center justify-center text-xs text-gray-400 bg-gray-50">
                                    بدون تصویر
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>


            {/* ================= PROFILE ================= */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">

                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-700">
                        تصویر پروفایل کانال
                    </h2>


                </div>

                <div >

                    <div className=" flex flex-col gap-4 ">
                        {/* Upload */}
                        <div className="flex flex-col gap-4">
                            <ImageUploader
                                label="آپلود تصویر پروفایل"
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
                        <div className="pt-4 border-t space-y-3"></div>

                        {/* Preview */}
                        <div>
                            <div className="text-xs text-gray-500 mb-2 flex justify-between">
                                <span>تصویر فعلی</span>
                            </div>

                            {data?.data?.image ? (
                                <div className="flex justify-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border bg-gray-50 group">
                                        <img
                                            src={data.data.image}
                                            className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-32 h-32 mx-auto rounded-full border border-dashed flex items-center justify-center text-xs text-gray-400 bg-gray-50">
                                    بدون تصویر
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>


            {/* ================= BUTTON ================= */}
            <div className="flex justify-start">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`
        w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium text-white transition
        ${isLoading
                            ? "bg-orange-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }
      `}
                >
                    {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
            </div>

        </div>
    );
}

export default ChannelSettings;