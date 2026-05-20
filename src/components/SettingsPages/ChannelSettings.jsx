// ChannelSettings.jsx

import { useState } from "react";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader";
import useChannel from "../../hooks/channel/useChannel";
import useChannelDetail from "../../hooks/channel/useChannelDetail";

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

  const isLoading =
    isChangingChannelImage || isChangingProfileImage;

  const handleSubmit = () => {
    try {
      if (channelImage) {
        changeProfileChannelImage(channelImage, channelId, {
          onSuccess: () => {
            toast.success("کاور کانال بروزرسانی شد");
            setChannelImage(null);
            refetch();
          },
        });
      }

      if (profileImage) {
        changeChannelImage(profileImage, channelId, {
          onSuccess: () => {
            toast.success("تصویر پروفایل بروزرسانی شد");
            setProfileImage(null);
            refetch();
          },
        });
      }
    } catch (e) {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  return (
    <div className="space-y-8">

      {/* COVER */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT */}
        <div
          className="
            rounded-[10px]
            border border-gray-100
            bg-white
            p-6
            shadow-sm
            space-y-5
          "
        >
          <div>
            <h2 className="text-lg font-black text-gray-800">
              تصویر کاور کانال
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              تصویری که در بالای کانال نمایش داده می‌شود.
            </p>
          </div>

          <ImageUploader
            label="آپلود تصویر کاور"
            imageFile={channelImage}
            setImageFile={setChannelImage}
          />

          <div className="space-y-2 text-sm text-gray-500 leading-6">
            <p>• حداکثر حجم: ۴ مگابایت</p>
            <p>• نسبت تصویر: ۹:۱</p>
            <p>• فرمت‌های مجاز: JPG - PNG</p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            rounded-[10px]
            border border-gray-100
            bg-gray-50
            p-6
            shadow-sm
            flex flex-col
          "
        >
          <div className="mb-4">
            <h3 className="font-bold text-gray-700">
              پیش‌نمایش
            </h3>
          </div>

          {data?.data?.background_image ? (
            <div className="relative overflow-hidden rounded-[10px] group h-full">
              <img
                src={data.data.background_image}
                className="
                  w-full h-full object-cover
                  transition duration-500
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          ) : (
            <div
              className="
                flex-1
                border-2 border-dashed
                rounded-[10px]
                flex items-center justify-center
                text-gray-400
              "
            >
              بدون تصویر
            </div>
          )}
        </div>
      </div>

      {/* PROFILE */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT */}
        <div
          className="
            rounded-[10px]
            border border-gray-100
            bg-white
            p-6
            shadow-sm
            space-y-5
          "
        >
          <div>
            <h2 className="text-lg font-black text-gray-800">
              تصویر پروفایل
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              تصویر اصلی نمایش داده شده در کانال.
            </p>
          </div>

          <ImageUploader
            label="آپلود تصویر پروفایل"
            imageFile={profileImage}
            setImageFile={setProfileImage}
          />

          <div className="space-y-2 text-sm text-gray-500 leading-6">
            <p>• نسبت تصویر: ۱:۱</p>
            <p>• حداقل سایز: 300×300</p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            rounded-[10px]
            border border-gray-100
            bg-gray-50
            p-6
            shadow-sm
            flex items-center justify-center
          "
        >
          {data?.data?.image ? (
            <div className="relative group">
              <img
                src={data.data.image}
                className="
                  w-40 h-40
                  rounded-[10px]
                  object-cover
                  border-4 border-white
                  shadow-xl
                  transition duration-300
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 rounded-[10px] bg-black/0 group-hover:bg-black/10 transition" />
            </div>
          ) : (
            <div
              className="
                w-40 h-40
                rounded-[10px]
                border-2 border-dashed
                flex items-center justify-center
                text-gray-400
              "
            >
              بدون تصویر
            </div>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="
            h-12
            px-8
            rounded-[10px]
            bg-orange-500
            hover:bg-orange-600
            disabled:bg-orange-300
            text-white
            font-medium
            transition-all
            active:scale-[0.98]
            shadow-lg shadow-orange-500/20
          "
        >
          {isLoading
            ? "در حال ذخیره..."
            : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}

export default ChannelSettings;