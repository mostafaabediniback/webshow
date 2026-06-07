import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FolderAdd, TickCircle, User } from "iconsax-react";
import useChannel from "../hooks/channel/useChannel";
import { Button } from "../ui";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMyProfile } from '../services/userProfileApi';
import { setAuthSession } from '../store/useAuthStore';
import { normalizeRole, getDefaultDashboardRoute, readAuthSession } from '../utils/auth';

function UserCreateChannel() {
  const navigate = useNavigate();
  const { createChannel } = useChannel();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [thumbDrag, setThumbDrag] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !username.trim() || !imageFile) {
      toast.error("لطفاً تمامی موارد الزامی را تکمیل کنید");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create the channel
      await createChannel({
        name,
        slug: username,
        image: imageFile,
      });

      // 2. Refresh user profile to get new role (ADMIN)
      const profileRes = await getMyProfile();
      const updatedUser = profileRes?.data;
      
      if (updatedUser) {
        const currentSession = readAuthSession();
        const roleName = normalizeRole(updatedUser.role);
        
        // 3. Update auth store with new role
        setAuthSession({
          ...currentSession,
          token: currentSession.token, // Preserve token
          userId: updatedUser.id,
          role: roleName,
          name: updatedUser.name,
          channelId: updatedUser.channel_id || updatedUser.channel?.id,
        });

        toast.success("کانال با موفقیت ایجاد شد و دسترسی شما ارتقا یافت");
        
        // 4. Redirect to ADMIN dashboard
        navigate(getDefaultDashboardRoute(roleName), { replace: true });
      }
    } catch (err) {
      toast.error("خطا در ایجاد کانال، لطفاً دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout navMode="bottom">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ایجاد اولین کانال شما</h1>
            <p className="text-gray-500">برای شروع فعالیت و آپلود ویدیو، ابتدا یک کانال بسازید.</p>
          </div>

          <div className="space-y-6">
            {/* آپلود تصویر (مشابه Channels.jsx) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">تصویر کانال (الزامی)</label>
              <div
                className={`rounded-xl border-2 transition-all ${thumbDrag
                  ? "border-orange-500 bg-orange-50"
                  : "border-dashed border-gray-300 hover:border-gray-400"
                  } p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px]`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setThumbDrag(true);
                }}
                onDragLeave={() => setThumbDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setThumbDrag(false);
                  const f = e.dataTransfer.files?.[0];
                  if (f && f.type.startsWith("image/")) setImageFile(f);
                }}
                onClick={() => document.getElementById('channel-image-input').click()}
              >
                <input
                  id="channel-image-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />

                {imageFile ? (
                  <div className="w-full space-y-2">
                    <img
                      className="w-full h-40 rounded-lg object-cover border border-gray-200"
                      src={URL.createObjectURL(imageFile)}
                      alt="preview"
                    />
                    <div className="flex items-center justify-center gap-4">
                      <p className="text-xs text-gray-600 truncate max-w-[200px]">{imageFile.name}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        حذف و انتخاب مجدد
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <FolderAdd size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">انتخاب تصویر پروفایل کانال</p>
                      <p className="text-xs text-gray-500 mt-1">فرمت‌های مجاز: JPG, PNG (حداکثر ۲ مگابایت)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* نام کانال */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">نام کانال</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: کانال رسمی اطلاع‌رسانی"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            {/* نام کاربری (Slug) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">شناسه (ID) کانال</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={username}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase();
                    const regex = /^[a-z0-9_]*$/;
                    if (regex.test(value)) setUsername(value);
                  }}
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="ali_m123"
                />
              </div>
              <p className="text-[10px] text-gray-500 pr-1">آدرس کانال شما به این صورت خواهد بود: arbaeentv.com/{username || 'username'}</p>
            </div>

            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={!name.trim() || !username.trim() || !imageFile}
              className="w-full h-12 text-lg font-bold mt-4 border-none"
              icon={<TickCircle size={24} />}
            >
              ایجاد کانال و ارتقای حساب
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UserCreateChannel;
