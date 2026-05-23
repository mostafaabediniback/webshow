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

  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [cropImage, setCropImage] = useState(null);
  const [cropType, setCropType] = useState(null);

  const [isDirty, setIsDirty] = useState(false);

  const isLoading =
    isChangingChannelImage || isChangingProfileImage;

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

  const handleSubmitAll = async () => {
    try {
      if (coverFile) {
        await changeProfileChannelImage(coverFile, channelId, {
          onSuccess: () => toast.success("کاور بروزرسانی شد"),
        });
      }

      if (profileFile) {
        await changeChannelImage(profileFile, channelId, {
          onSuccess: () => toast.success("پروفایل بروزرسانی شد"),
        });
      }

      setIsDirty(false);
      setCoverFile(null);
      setProfileFile(null);

      refetch();
      toast.success("تغییرات ذخیره شد");
    } catch (e) {
      toast.error("خطا در ذخیره تغییرات");
    }
  };

  return (
    <div className="space-y-8">

      {/* PREVIEW */}
      <div className="bg-white rounded-[10px]">
        <div className="mt-6 relative">

          {/* COVER */}
          <div className="h-[180px] rounded-[10px] overflow-hidden relative group">
            <img
              src={
                coverFile
                  ? URL.createObjectURL(coverFile)
                  : data?.data?.background_image
              }
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
          <div className="absolute bottom-[-25px] right-8 group">
            <div className="relative w-24 h-24 rounded-[10px] overflow-hidden border-4 border-white shadow-lg">
              <img
                src={
                  profileFile
                    ? URL.createObjectURL(profileFile)
                    : data?.data?.image
                }
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

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmitAll}
          disabled={!isDirty || isLoading}
          className="
            h-12 px-8 rounded-[10px]
            bg-orange-500 text-white
            disabled:opacity-40
          "
        >
          {isLoading ? "در حال ذخیره..." : "ذخیره همه تغییرات"}
        </button>
      </div>

      {/* CROPPER */}
      <ImageCropModal
        isOpen={!!cropImage}
        image={cropImage}
        aspect={cropType === "cover" ? 9 / 1 : 1}
        title={cropType === "cover" ? "برش کاور" : "برش تصویر پروفایل"}
        onClose={() => {
          setCropImage(null);
          setCropType(null);
        }}
        onSave={(file) => {
          if (cropType === "cover") {
            setCoverFile(file);
          } else {
            setProfileFile(file);
          }

          setIsDirty(true);
          setCropImage(null);
          setCropType(null);
        }}
      />
    </div>
  );
}

export default ChannelSettings;