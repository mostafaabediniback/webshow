// SocialSettings.jsx

import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaInstagram,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";

import { toast } from "react-toastify";
import useChannelDetail from "../../hooks/channel/useChannelDetail";
import useChannel from "../../hooks/channel/useChannel";

const SOCIAL_CONFIG = [
  {
    name: "telegram",
    label: "Telegram",
    icon: FaTelegram,
  },
  {
    name: "youtube",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    name: "instagram",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    name: "eitaa",
    label: "Eitaa",
    icon: FaGlobe,
  },
  {
    name: "bale",
    label: "Bale",
    icon: FaGlobe,
  },
];

function SocialSettings() {
  const { updateChannelInfo, isUpdatingChannelInfo } =
    useChannel(1, 10, {}, { enabled: false });

  const { data, refetch } = useChannelDetail();

  const [socials, setSocials] = useState({});
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data?.data) {
      setSocials(data.data.socials || {});
      setDescription(data.data.description || "");
    }
  }, [data]);

  const handleChange = (key, value) => {
    setSocials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    updateChannelInfo(
      {
        description,
        socials,
      },
      {
        onSuccess: () => {
          toast.success("اطلاعات ذخیره شد");
          refetch();
        },
      }
    );
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-black text-gray-800">
          شبکه‌های اجتماعی
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          لینک شبکه‌های اجتماعی و توضیحات کانال خود را
          مدیریت کنید.
        </p>
      </div>

      {/* DESCRIPTION */}
      <div
        className="
          rounded-3xl
          border border-gray-100
          bg-white
          p-5
          shadow-sm
          space-y-3
        "
      >
        <label className="font-semibold text-gray-700">
          توضیحات کانال
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            h-36
            rounded-2xl
            border border-gray-200
            bg-gray-50
            p-4
            resize-none
            outline-none
            transition-all
            focus:bg-white
            focus:border-orange-400
            focus:ring-4
            focus:ring-orange-100
          "
        />

        <div className="text-xs text-gray-400 text-left">
          {description.length}/500
        </div>
      </div>

      {/* SOCIALS */}
      <div className="space-y-4">
        {SOCIAL_CONFIG.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="
                flex items-center gap-4
                rounded-2xl
                border border-gray-200
                bg-gray-50
                px-4 py-3
                transition-all
                hover:bg-white
                hover:border-orange-300
              "
            >
              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-white
                  border border-gray-200
                  flex items-center justify-center
                  shadow-sm
                "
              >
                <Icon className="text-gray-600 text-lg" />
              </div>

              <input
                type="text"
                value={socials?.[item.name] || ""}
                onChange={(e) =>
                  handleChange(item.name, e.target.value)
                }
                placeholder={`لینک ${item.label}`}
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-sm
                  placeholder:text-gray-400
                "
              />
            </div>
          );
        })}
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isUpdatingChannelInfo}
          className="
            h-12
            px-8
            rounded-2xl
            bg-orange-500
            hover:bg-orange-600
            disabled:bg-orange-300
            text-white
            font-medium
            transition-all
            shadow-lg shadow-orange-500/20
          "
        >
          {isUpdatingChannelInfo
            ? "در حال ذخیره..."
            : "ذخیره تغییرات"}
        </button>
      </div>

      {/* PREVIEW */}
      <div
        className="
          rounded-3xl
          border border-gray-100
          bg-white
          p-5
          shadow-sm
          space-y-4
        "
      >
        <h3 className="font-bold text-gray-700">
          پیش‌نمایش لینک‌ها
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {SOCIAL_CONFIG.map((item) => {
            const value = socials?.[item.name];

            if (!value) return null;

            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={value}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center gap-4
                  rounded-2xl
                  border border-gray-200
                  p-4
                  hover:border-orange-300
                  hover:bg-orange-50
                  transition-all
                "
              >
                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-gray-100
                    flex items-center justify-center
                  "
                >
                  <Icon className="text-gray-700" />
                </div>

                <div className="overflow-hidden">
                  <p className="text-sm font-medium">
                    {item.label}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    {value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SocialSettings;