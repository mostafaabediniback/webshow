import {
  Category,
  FolderAdd,
  Home2,
  People,
  Personalcard,
  Setting2,
  VideoAdd,
  VideoPlay,
} from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/useAuthStore";
import user from "../assets/img/user.png";
import { useState } from "react";
import SettingsPage from "../pages/SettingsPage";
import useChannelDetail from "../hooks/channel/useChannelDetail";
import Modal from "../ui/Modal";

const PLATFORM_ADMIN_NAV = [
  { to: "/dashboard", label: "داشبورد", icon: Home2 },
  { to: "/dashboard/channels", label: "کانال‌ها", icon: FolderAdd },
  { to: "/dashboard/categories", label: "دسته‌بندی‌ها", icon: Category },
  { to: "/dashboard/upload", label: "بارگذاری ویدیو", icon: VideoAdd },
  // { to: "/dashboard/playlists", label: "پلی‌لیست‌ها", icon: Personalcard },
  { to: "/dashboard/videos", label: "ویدیوهای من", icon: VideoPlay },
  { to: "/dashboard/users", label: "کاربران", icon: People },
];

const CHANNEL_ADMIN_NAV = [
  { to: "/dashboard/user-upload", label: "بارگذاری ویدیو", icon: VideoAdd },
  // { to: "/dashboard/playlists", label: "پلی‌لیست‌ها", icon: VideoPlay },
  { to: "/dashboard/user-videos", label: "ویدیوهای من", icon: Personalcard },
  { to: "/dashboard/settings", label: "تنظیمات", icon: Setting2 },
];

function DashboardLayout({ children }) {
  const { pathname } = useLocation();
  const name = sessionStorage.getItem("name");
  const role = sessionStorage.getItem("role");
  const isSuperAdmin = role === "super_admin";

  const { data, refetch } = useChannelDetail(null, {
    enabled: !isSuperAdmin,
  });
  const userLogo = data?.data?.image || user;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin);
  const navItems = isChannelAdmin ? CHANNEL_ADMIN_NAV : PLATFORM_ADMIN_NAV;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 sm:gap-6">
            <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 h-fit ">
              {/* {!isSuperAdmin && (
                <div>
                  <div className="my-2 flex justify-center items-center relative">
                    <div className="w-40 aspect-square">
                      <img
                        src={userLogo}
                        alt=""
                        className="w-full h-full rounded-[10px] border border-slate-200 object-cover"
                      />
                    </div> */}

                    {/* settings icon */}
                    {/* <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="absolute -top-3 left-4 bg-white border border-gray-200 p-2 rounded-lg shadow-sm hover:bg-gray-50"
                    >
                      <Setting2 size={20} color="#000000" />
                    </button>
                  </div>

                  <div className="flex justify-center items-center mb-4">
                    <div className="w-40 bg-blue-50 p-2 flex justify-center items-center rounded-[10px]">
                      <div className="text-[14px]">{name}</div>
                    </div>
                  </div> */}

                  {/* settings modal */}
                  {/* <Modal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    title="تنظیمات"
                    size="lg"
                  >
                    <SettingsPage />
                  </Modal>
                </div>
              )} */}

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  const iconColor = active ? "#ffffff" : "#111827";

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-orange-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        size={20}
                        color={iconColor}
                        variant={active ? "Bold" : "Outline"}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
