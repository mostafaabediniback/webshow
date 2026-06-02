// SocialSettings.jsx

import { useEffect, useState } from "react";
import { FaGlobe, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";

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
    name: "insta",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    name: "youtube",
    label: "YouTube",
    icon: FaYoutube,
  },
  {
    name: "eita",
    label: "ایتا",
    icon: FaGlobe,
  },
  {
    name: "bale",
    label: "بله",
    icon: FaGlobe,
  },
  {
    name: "email",
    label: "ایمیل",
    icon: FaGlobe,
  },
];

function SocialSettings() {
  const { updateChannelInfo, isUpdatingChannelInfo } = useChannel(
    1,
    10,
    {},
    { enabled: false },
  );

  const { data, refetch } = useChannelDetail();

  const [socials, setSocials] = useState({});
  const [description, setDescription] = useState("");

useEffect(() => {
  if (!data?.data) return;

  const socialsData = {};

  Object.entries(data.data.socials || {}).forEach(([key, value]) => {
    socialsData[key] = {
      link: value?.link || "",
      icon: value?.icon || null,
    };
  });

  setSocials(socialsData);
  setDescription(data.data.description || "");
}, [data]);

const handleChange = (key, value) => {
  setSocials((prev) => ({
    ...prev,
    [key]: {
      ...prev[key],
      link: value,
    },
  }));
};
const handleSubmit = () => {
  const payloadSocials = {};

  Object.entries(socials).forEach(([key, value]) => {
    if (value?.link?.trim()) {
      payloadSocials[key] = value.link.trim();
    }
  });

  updateChannelInfo(
    {
      description,
      socials: payloadSocials,
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
    <div className="space-y-6 ">
      {/* DESCRIPTION */}
      <div
        className="
          rounded-[10px]
          border border-gray-100
          bg-white
          p-5
          shadow-sm
          flex flex-col gap-4
        "
      >
        <label className="font-semibold text-gray-700 ">توضیحات کانال</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            h-36
            rounded-[10px]
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
          {description.length}/40
        </div>
      </div>

      {/* SOCIALS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-[10px] shadow-sm">
        {SOCIAL_CONFIG.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="
                flex  items-center gap-4
                rounded-[10px]
                border border-gray-200
                bg-gray-50
                px-4 py-3
                transition-all
                hover:bg-white
                hover:border-orange-300
              "
            >
              <div className="w-12 h-12 rounded-[10px] bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                {socials?.[item.name]?.icon ? (
                  <img
                    src={socials[item.name].icon}
                    alt={item.label}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <Icon className="text-gray-600 text-lg" />
                )}
              </div>

              <input
                type="text"
                value={socials?.[item.name]?.link || ""}
                onChange={(e) => handleChange(item.name, e.target.value)}
                placeholder={
                  socials?.[item.name]?.link
                    ? socials[item.name].link
                    : `لینک ${item.label}`
                }
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
            rounded-[10px]
            bg-orange-500
            hover:bg-orange-600
            disabled:bg-orange-300
            text-white
            font-medium
            transition-all
            shadow-lg shadow-orange-500/20
          "
        >
          {isUpdatingChannelInfo ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}

export default SocialSettings;
