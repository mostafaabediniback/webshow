import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import {
  Menu,
  SearchNormal1,
  VideoAdd,
  Notification,
  User,
  CloseCircle,
} from "iconsax-react";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl w-full mx-auto flex justify-center items-center">
          <div className="w-full justify-between px-3 sm:px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-slate-900 touch-manipulation"
              aria-label="منو"
            >
              <Menu size={20} color="#0f172a" />
            </button>
            <Link
              to="/"
              onClick={closeSidebar}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              وب‌شو
            </Link>
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchInput />
            </div>
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors  text-slate-900 touch-manipulation"
              aria-label="جستجو"
            >
              <SearchNormal1 size={20} color="#0f172a" />
            </button>
            <div className="hidden md:flex items-center gap-3 ">
              {/* <button
                className="p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-slate-900"
                title="آپلود ویدیو"
              >
                <VideoAdd size={22} color="#0f172a" />
              </button> */}
              {/* <button
                className="p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-slate-900 relative"
                title="اعلان‌ها"
              >
                <Notification size={22} color="#0f172a" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}
              <Link
                to="/dashboard"
                className="h-10 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-sm font-medium flex items-center gap-2 text-slate-900 transition-colors shadow-sm hover:shadow"
              >
                مدیریت کانال‌ها
              </Link>
              {/* <Link
                to="/login"
                className="h-10 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-sm font-medium flex items-center gap-2 text-slate-900 transition-colors shadow-sm hover:shadow"
              >
                <User size={18} color="#0f172a" />
                ورود
              </Link> */}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-3 sm:px-4 pb-3">
            <SearchInput />
          </div>
        )}
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              منو
            </h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
              aria-label="بستن منو"
            >
              <CloseCircle size={24} color="#0f172a" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium"
              >
                <span>خانه</span>
              </Link>
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium"
              >
                <span>ویدیوهای محبوب</span>
              </Link>
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium"
              >
                <span>دسته‌بندی‌ها</span>
              </Link>
              <Link
                to="/dashboard/channels"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium"
              >
                <span>مدیریت کانال‌ها</span>
              </Link>
              <Link
                to="/dashboard/upload"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium"
              >
                <span>آپلود ویدیو</span>
              </Link>
              <Link
                to="/dashboard/videos"
                onClick={closeSidebar}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium"
              >
                <span>ویدیوهای آپلودشده</span>
              </Link>
            </nav>

            <div className="border-t border-gray-200 p-4 space-y-2">
              {/* <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium text-right">
                <VideoAdd size={20} color="#0f172a" />
                <span>آپلود ویدیو</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-900 font-medium text-right relative">
                <Notification size={20} color="#0f172a" />
                <span>اعلان‌ها</span>
                <span className="absolute right-12 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}
            </div>
          </div>

          {/* Sidebar Footer */}
          {/* <div className="border-t border-gray-200 p-4">
            <Link
              to="/login"
              onClick={closeSidebar}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.98] text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
            >
              <User size={20} color="#ffffff" />
              ورود به حساب کاربری
            </Link>
          </div> */}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
