import { useState } from "react";
import { toast } from "react-toastify";

import useChannel from "../../hooks/channel/useChannel";
import useChannelDetail from "../../hooks/channel/useChannelDetail";

import { Camera } from "iconsax-react";
import ImageCropModal from "./ImageCropModal";
import ProfileSettings from "./ProfileSettings";

function ChannelSettings({ channelId }) {
  const { data, refetch } = useChannelDetail();

  const {
    changeChannelImage,
    changeProfileChannelImage,
    isChangingChannelImage,
    isChangingProfileImage,
  } = useChannel(1, 10, {}, { enabled: false });

  const [cropImage, setCropImage] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const isLoading = isChangingChannelImage || isChangingProfileImage;

  const openCropper = (file, type) => {
    if (!file) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        openCropper(selectedFile, type);
      };

      input.click();
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("فقط JPG و PNG مجاز است");
      return;
    }

    if (type === "cover") {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("حداکثر حجم ۴ مگابایت");
        return;
      }
    }

    setCropImage(URL.createObjectURL(file));
    setCropType(type);
  };

  return (
    <div className="space-y-8">
      {/* PREVIEW */}
      <div className="mb-16 rounded-[10px]">
        <div className="mt-6 relative ">
          {/* COVER */}
          <div className="aspect-[7/1] rounded-[10px] overflow-hidden relative group">
            <img
              src={data?.data?.background_image}
              className="w-full h-full object-cover"
            />

            <div
              onClick={() => openCropper(null, "cover")}
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition cursor-pointer"
            >
              <Camera size={34} color="#fff" />
            </div>
          </div>

          {/* PROFILE */}
          <div className="absolute bottom-[-40px] right-8 group">
            <div className="relative w-24 h-24 rounded-[10px] overflow-hidden border-4 border-white shadow-lg">
              <img
                src={data?.data?.image}
                className="w-full h-full object-cover"
              />

              <div
                onClick={() => openCropper(null, "profile")}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition cursor-pointer"
              >
                <Camera size={28} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE SETTINGS */}
      <ProfileSettings setIsDirty={setIsDirty} />

      {/* CROPPER */}
      <ImageCropModal
        isOpen={!!cropImage}
        image={cropImage}
        aspect={cropType === "cover" ? 7 / 1 : 1}
        title={cropType === "cover" ? "برش کاور" : "برش تصویر پروفایل"}
        onClose={() => {
          setCropImage(null);
          setCropType(null);
        }}
        onSave={(file) => {
          if (cropType === "cover") {
            changeProfileChannelImage(file, channelId, {
              onSuccess: () => {
                toast.success("کاور بروزرسانی شد");
                refetch();
              },
              onError: () => {
                toast.error("خطا در بروزرسانی کاور");
              },
            });
          }

          if (cropType === "profile") {
            changeChannelImage(file, channelId, {
              onSuccess: () => {
                toast.success("پروفایل بروزرسانی شد");
                refetch();
              },
              onError: () => {
                toast.error("خطا در بروزرسانی پروفایل");
              },
            });
          }

          setCropImage(null);
          setCropType(null);
        }}
      />
    </div>
  );
}

export default ChannelSettings;
