import { useEffect, useState } from "react";
import {
  FaTelegram,
  FaYoutube,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import useChannelDetail from "../../hooks/useChannelDetail";
import useChannel from "../../hooks/useChannel";
import { toast } from "react-toastify";

const SOCIAL_CONFIG = [
  { name: "telegram", label: "Telegram", icon: FaTelegram },
  { name: "youtube", label: "YouTube", icon: FaYoutube },
  { name: "instagram", label: "Instagram", icon: FaInstagram },
  { name: "eitaa", label: "Eitaa", icon: FaGlobe },
  { name: "bale", label: "Bale", icon: FaGlobe },
  { name: "aparat", label: "Aparat", icon: FaGlobe },
];

function SocialSettings() {
  const { updateChannelInfo, isUpdatingChannelInfo } = useChannel();
  const { data, refetch } = useChannelDetail();
  useEffect(() => {
    refetch()
  }, [])


  const [socials, setSocials] = useState({});

  // 👇 گرفتن دیتا از API
  useEffect(() => {
    if (data?.data?.socials) {
      setSocials(data.data.socials);
    }
  }, [data]);

  const handleChange = (key, value) => {
    setSocials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const handleSubmit = () => {
  //   updateChannelInfo(channelId, {
  //     description: data?.data?.description || "",
  //     socials,
  //   });
  // }; 
const handleSubmit = () => {
  try {
    updateChannelInfo(
      {
        description: data?.data?.description || "",
        socials,
      },
      {
        onSuccess: () => {
          toast.success("اطلاعات شبکه‌های اجتماعی با موفقیت ذخیره شد");
          refetch();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              "خطا در ذخیره اطلاعات کانال"
          );
        },
      }
    );
  } catch (error) {
    // فقط خطاهای sync رو می‌گیره (معمولاً اتفاق نمیفته)
    toast.error("خطای غیرمنتظره رخ داد");
  }
};

  return (
    <div className="space-y-6 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">

      {/* HEADER */}
      <h2 className="text-lg font-semibold">
        شبکه‌های اجتماعی
      </h2>

      {/* INPUTS */}
      <div className="space-y-3">
        {SOCIAL_CONFIG.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2"
            >
              <Icon className="text-gray-500 text-lg" />

              <input
                type="text"
                value={socials?.[item.name] || ""}
                onChange={(e) =>
                  handleChange(item.name, e.target.value)
                }
                placeholder={`لینک ${item.label}`}
                className="w-full outline-none "
              />
            </div>
          );
        })}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={isUpdatingChannelInfo}
        className={`px-4 py-2 rounded-lg text-white transition ${isUpdatingChannelInfo
            ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
          }`}
      >
        {isUpdatingChannelInfo
          ? "در حال ذخیره..."
          : "ذخیره تغییرات"}
      </button>

      {/* PREVIEW */}
<div className="pt-4 border-t space-y-3">
  <h3 className="text-sm font-semibold text-gray-600">
    پیش‌نمایش اطلاعات
  </h3>

  {data?.data?.socials &&
  Object.values(data.data.socials).some(Boolean) ? (
    <div className="grid sm:grid-cols-2 gap-3">
      {SOCIAL_CONFIG.map((item) => {
        const value = data.data.socials?.[item.name];
        if (!value) return null;

        const Icon = item.icon;

        return (
          <div
            key={item.name}
            className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <Icon className="text-gray-500 text-lg" />

            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-gray-500">
                {item.label}
              </span>

              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline truncate"
              >
                {value}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-sm text-gray-400 bg-gray-50 border rounded-lg p-4 text-center">
      هنوز شبکه اجتماعی ثبت نشده
    </div>
  )}
</div>
    </div>
  );
}

export default SocialSettings;