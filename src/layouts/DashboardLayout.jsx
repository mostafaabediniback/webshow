import {
  Category,
  FolderAdd,
  Home2,
  Logout,
  People,
  Personalcard,
  Setting2,
  VideoPlay,
} from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import useChannelDetail from "../hooks/channel/useChannelDetail";
import useLogin from "../hooks/auth/useLogin";
import { VideoAdd } from "iconsax-react";

const PLATFORM_ADMIN_NAV = [
  { to: "/dashboard", label: "داشبورد", icon: Home2 },
  { to: "/dashboard/channels", label: "کانال‌ها", icon: FolderAdd },
  { to: "/dashboard/upload", label: "بارگذاری ویدیو", icon: VideoAdd },

  { to: "/dashboard/categories", label: "دسته‌بندی‌ها", icon: Category },
  { to: "/dashboard/videos", label: "ویدیوهای من", icon: VideoPlay },
  { to: "/dashboard/users", label: "کاربران", icon: People },
];

const CHANNEL_ADMIN_NAV = [
  { to: "/dashboard/user-videos", label: "ویدیوهای من", icon: Personalcard },
  { to: "/dashboard/settings", label: "تنظیمات", icon: Setting2 },
  { to: "/dashboard/user-upload", label: "بارگذاری ویدیو", icon: VideoAdd },
];

const USER_NAV = [
  { to: "/user-dashboard", label: "داشبورد", icon: Home2 },
  { to: "/user-dashboard?action=create-channel", label: "بارگذاری ویدیو", icon: VideoAdd },
  // { to: "/dashboard/settings", label: "تنظیمات", icon: Setting2 },
];

function DashboardLayout({
  children,
  navMode = "sidebar", // sidebar | bottom
}) {
  const { pathname } = useLocation();

  const role = sessionStorage.getItem("role");
  const isSuperAdmin = role === "super_admin";

  const { LogOut, isLoggingOut } = useLogin();

  useChannelDetail(null, {
    enabled: !isSuperAdmin && role !== "user",
  });

  useState(false);

  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin);
  const isUser = useAuthStore((state) => state.isUser);

  let navItems = PLATFORM_ADMIN_NAV;

  if (isChannelAdmin) navItems = CHANNEL_ADMIN_NAV;
  if (isUser) navItems = USER_NAV;

  const LOGOUT_ITEM = {
    to: "#",
    label: isLoggingOut ? "در حال خروج..." : "خروج",
    icon: Logout,
    action: async () => {
      await LogOut();
    },
  };

  const finalNavItems = [...navItems, LOGOUT_ITEM];

  const renderNavItems = (isBottom = false) =>
    finalNavItems.map((item) => {
      const Icon = item.icon;
      const active = pathname === item.to;

      const handleClick = async (e) => {
        if (item.action) {
          e.preventDefault();
          await item.action();
        }
      };

      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={handleClick}
          className={
            isBottom
              ? `
                flex flex-col items-center justify-center gap-1
                px-2 py-2 rounded-xl transition-all min-w-[60px]
                ${
                  active
                    ? "text-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }
              `
              : `
                flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium transition-all
                ${
                  active
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `
          }
        >
          <Icon
            size={20}
            color={
              isBottom
                ? active
                  ? "#f97316"
                  : "#6b7280"
                : active
                  ? "#ffffff"
                  : "#111827"
            }
            variant={active ? "Bold" : "Outline"}
          />

          <span className={isBottom ? "text-[11px]" : ""}>{item.label}</span>
        </Link>
      );
    });

  const isBottomMode = navMode === "bottom";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div
            className={`grid gap-4 sm:gap-6 ${
              isBottomMode
                ? "grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)]"
                : "grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]"
            }`}
          >
            <aside
              className={`
                bg-white rounded-2xl border border-gray-200
                shadow-sm p-3 h-fit
                ${isBottomMode ? "hidden xl:block" : "block"}
              `}
            >
              <nav className="flex flex-col gap-1">{renderNavItems()}</nav>
            </aside>

            <main className={`min-w-0 ${isBottomMode ? "pb-24 xl:pb-0" : ""}`}>
              {children}
            </main>
          </div>
        </div>
      </div>

      {isBottomMode && (
        <aside className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg xl:hidden">
          <nav className="flex items-center justify-around px-2 py-2">
            {renderNavItems(true)}
          </nav>
        </aside>
      )}
    </div>
  );
}

export default DashboardLayout;
