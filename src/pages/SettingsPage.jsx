import { useState } from "react";
import ChannelSettings from "../components/SettingsPages/ChannelSettings";
import ProfileSettings from "../components/SettingsPages/ProfileSettings";
import DashboardLayout from "../layouts/DashboardLayout";
import SocialSettings from "../components/SettingsPages/SocialSettings";

const TABS = [
  { key: "channel", label: "تنظیمات کانال" },
  // { key: 'profile', label: 'تنظیمات پروفایل' },
  { key: "social", label: "تنظیمات شبکه‌های اجتماعی" },
];

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("channel");

  return (
    <DashboardLayout navMode="bottom">
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Header */}
        {/* <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            تنظیمات کانال
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            اطلاعات کانال، پروفایل و شبکه‌های اجتماعی خود را مدیریت کنید.
          </p>
        </div> */}

        {/* Tabs */}
        <div className="bg-gray-100 p-1 sm:w-[50%] w-full  rounded-2xl flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
              flex-1 min-w-fit
              px-4 py-3
              rounded-xl
              text-sm font-medium
              transition-all duration-200
              ${
                activeTab === tab.key
                  ? "bg-white text-orange-500 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className=" w-full ">
          {activeTab === "channel" && <ChannelSettings />}
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "social" && <SocialSettings />}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;
