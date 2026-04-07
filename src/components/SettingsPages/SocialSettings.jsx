import { useEffect, useState } from "react";
import {
  FaTelegram,
  FaYoutube,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import useChannelDetail from "../../hooks/useChannelDetail";
import useChannel from "../../hooks/useChannel";

const SOCIAL_CONFIG = [
  { name: "telegram", label: "Telegram", icon: FaTelegram },
  { name: "youtube", label: "YouTube", icon: FaYoutube },
  { name: "instagram", label: "Instagram", icon: FaInstagram },
  { name: "eitaa", label: "Eitaa", icon: FaGlobe },
  { name: "bale", label: "Bale", icon: FaGlobe },
  { name: "aparat", label: "Aparat", icon: FaGlobe },
];

function SocialSettings({ channelId }) {
  const { updateChannelInfo, isUpdatingChannelInfo } = useChannel();
  const { data, refetch } = useChannelDetail(channelId);
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

  const handleSubmit = () => {
    updateChannelInfo(channelId, {
      description: data?.data?.description || "",
      socials,
    });
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
      <div className="pt-4 border-t space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">
          پیش‌نمایش اطلاعات
        </h3>

        {data?.data?.socials ? (
          <div className="text-sm text-gray-700 space-y-1">
            {Object.entries(data.data.socials).map(
              ([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}: </span>
                  <a
                    href={value}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    {value}
                  </a>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            اطلاعاتی وجود ندارد
          </p>
        )}
      </div>
    </div>
  );
}

export default SocialSettings;