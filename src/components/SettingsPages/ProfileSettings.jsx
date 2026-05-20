// ProfileSettings.jsx

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useMyProfile from "../../hooks/userProfile/useMyProfile";
import useUpdateMyProfile from "../../hooks/userProfile/useUpdateMyProfile";
import useUpdateMyPassword from "../../hooks/userProfile/useUpdateMyPassword";

function ProfileSettings() {
  const { profile } = useMyProfile();

  const { updateMyProfile, isUpdatingMyProfile } =
    useUpdateMyProfile();

  const { updateMyPassword, isUpdatingMyPassword } =
    useUpdateMyPassword();

  const [form, setForm] = useState({
    name: "",
    phone_number: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone_number: profile.phone_number || "",
      });
    }
  }, [profile]);

  const inputClass =
    "w-full h-12 rounded-[10px] border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition-all focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

  return (
    <div className="space-y-6">

      {/* PROFILE */}
      <div
        className="
          rounded-[10px]
          border border-gray-100
          bg-white
          p-6
          shadow-sm
          space-y-5
        "
      >
        <div>
          <h2 className="text-xl font-black text-gray-800">
            اطلاعات حساب
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            اطلاعات حساب کاربری خود را مدیریت کنید.
          </p>
        </div>

        <input
          type="text"
          placeholder="نام"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className={inputClass}
        />

        <input
          type="text"
          value={form.phone_number}
          disabled
          className={`${inputClass} cursor-not-allowed opacity-70`}
        />

        <button
          onClick={() =>
            updateMyProfile({
              name: form.name,
            })
          }
          disabled={isUpdatingMyProfile}
          className="
            h-12
            px-6
            rounded-[10px]
            bg-orange-500
            hover:bg-orange-600
            disabled:bg-orange-300
            text-white
            font-medium
            transition-all
          "
        >
          {isUpdatingMyProfile
            ? "در حال ذخیره..."
            : "ذخیره تغییرات"}
        </button>
      </div>

      {/* PASSWORD */}
      <div
        className="
          rounded-[10px]
          border border-gray-100
          bg-white
          p-6
          shadow-sm
          space-y-5
        "
      >
        <div>
          <h2 className="text-xl font-black text-gray-800">
            تغییر رمز عبور
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            برای امنیت بیشتر رمز عبور خود را بروزرسانی کنید.
          </p>
        </div>

        <input
          type="password"
          placeholder="رمز فعلی"
          value={passwordForm.current_password}
          onChange={(e) =>
            setPasswordForm((prev) => ({
              ...prev,
              current_password: e.target.value,
            }))
          }
          className={inputClass}
        />

        <input
          type="password"
          placeholder="رمز جدید"
          value={passwordForm.new_password}
          onChange={(e) =>
            setPasswordForm((prev) => ({
              ...prev,
              new_password: e.target.value,
            }))
          }
          className={inputClass}
        />

        <p className="text-xs text-gray-400">
          رمز عبور باید حداقل ۸ کاراکتر باشد.
        </p>

        <button
          onClick={() =>
            updateMyPassword({
              old_password:
                passwordForm.current_password,
              new_password:
                passwordForm.new_password,
            })
          }
          disabled={isUpdatingMyPassword}
          className="
            h-12
            px-6
            rounded-[10px]
            bg-gray-900
            hover:bg-black
            disabled:bg-gray-400
            text-white
            font-medium
            transition-all
          "
        >
          {isUpdatingMyPassword
            ? "در حال تغییر..."
            : "تغییر رمز عبور"}
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;