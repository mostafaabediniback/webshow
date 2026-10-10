import { useEffect, useState } from "react";

import useMyProfile from "../../hooks/userProfile/useMyProfile";
import useUpdateMyProfile from "../../hooks/userProfile/useUpdateMyProfile";
import useUpdateMyPassword from "../../hooks/userProfile/useUpdateMyPassword";

function ProfileSettings({ setIsDirty }) {
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
    "w-full h-12 rounded-[10px] border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:bg-white focus:border-orange-400";

    const handleSubmit = async () => {
  try {
    await updateMyProfile({
      name: form.name,
    });

    if (
      passwordForm.current_password &&
      passwordForm.new_password
    ) {
      await updateMyPassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });
    }

    setPasswordForm({
      current_password: "",
      new_password: "",
    });

    setIsDirty(false);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="space-y-6">

      {/* PROFILE */}
      <div className="rounded-[10px]  bg-white p-6 space-y-5">
        <h2 className="text-xl font-bold">اطلاعات حساب</h2>

        <input
          value={form.name}
          onChange={(e) => {
            setForm((p) => ({ ...p, name: e.target.value }));
            setIsDirty(true);
          }}
          className={inputClass}
          placeholder="نام"
        />

        <input
          value={form.phone_number}
          disabled
          className={`${inputClass} opacity-60 cursor-not-allowed`}
        />
      </div>

      {/* PASSWORD */}
      <div className="rounded-[10px]  bg-white p-6 space-y-5">
        <h2 className="text-xl font-bold">تغییر رمز عبور</h2>

        <input
          type="password"
          placeholder="رمز فعلی"
          value={passwordForm.current_password}
          onChange={(e) => {
            setPasswordForm((p) => ({
              ...p,
              current_password: e.target.value,
            }));
            setIsDirty(true);
          }}
          className={inputClass}
        />

        <input
          type="password"
          placeholder="رمز جدید"
          value={passwordForm.new_password}
          onChange={(e) => {
            setPasswordForm((p) => ({
              ...p,
              new_password: e.target.value,
            }));
            setIsDirty(true);
          }}
          className={inputClass}
        />
      </div>
      <div className="flex justify-end">
  <button
    onClick={handleSubmit}
    disabled={
      isUpdatingMyProfile || isUpdatingMyPassword
    }
    className="
      h-12 px-8 rounded-[10px]
      bg-orange-500 text-white
      disabled:opacity-40
    "
  >
    {isUpdatingMyProfile || isUpdatingMyPassword
      ? "در حال ذخیره..."
      : "ذخیره تغییرات"}
  </button>
</div>

    </div>
  );
}

export default ProfileSettings;