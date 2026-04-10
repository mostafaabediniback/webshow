import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// hooks
import useMyProfile from '../../hooks/userProfile/useMyProfile'
import useUpdateMyProfile from '../../hooks/userProfile/useUpdateMyProfile'
import useUpdateMyPassword from '../../hooks/userProfile/useUpdateMyPassword'



function ProfileSettings() {
  // 📌 گرفتن اطلاعات پروفایل
  const { profile, isLoadingProfile } = useMyProfile()

  // 📌 mutation ها
  const { updateMyProfile, isUpdatingMyProfile } = useUpdateMyProfile()
  const { updateMyPassword, isUpdatingMyPassword } = useUpdateMyPassword()

  const [form, setForm] = useState({
    name: '',
    phone_number: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
  })

  // 📌 مقداردهی اولیه از بک
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        phone_number: profile.phone_number || '',
      })
    }
  }, [profile])

  const handleChangeProfile = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleChangePassword = (key, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // ✅ ذخیره اطلاعات پروفایل
  const handleSaveProfile = async () => {
    if (!form.name) {
      toast.error('نام الزامی است')
      return
    }

    try {
      await updateMyProfile({
        name: form.name,
      })
    } catch (e) {
      toast.error('خطا در ذخیره اطلاعات')
    }
  }

  // ✅ تغییر رمز عبور
  const handleChangePasswordSubmit = async () => {
    if (!passwordForm.current_password || !passwordForm.new_password) {
      toast.error('هر دو فیلد رمز الزامی هستند')
      return
    }

    try {
      await updateMyPassword({
        old_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      })

      setPasswordForm({
        current_password: '',
        new_password: '',
      })
    } catch (e) {
      toast.error('خطا در تغییر رمز')
    }
  }

  return (
    <div className="space-y-6">
      {/* بخش اطلاعات پروفایل */}
      <div className="space-y-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold">تنظیمات پروفایل</h2>

        {/* نام */}
        <input
          type="text"
          placeholder="نام"
          value={form.name}
          onChange={(e) => handleChangeProfile('name', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* شماره تماس */}
        <input
          type="text"
          value={form.phone_number}
          disabled
          className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
        />

        <button
          onClick={handleSaveProfile}
          disabled={isUpdatingMyProfile}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg"
        >
          {isUpdatingMyProfile ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </button>
      </div>

      {/* بخش تغییر رمز */}
      <div className="space-y-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold">تغییر رمز عبور</h2>

        <input
          type="password"
          placeholder="رمز فعلی"
          value={passwordForm.current_password}
          onChange={(e) =>
            handleChangePassword('current_password', e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="رمز جدید"
          value={passwordForm.new_password}
          onChange={(e) =>
            handleChangePassword('new_password', e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={handleChangePasswordSubmit}
          disabled={isUpdatingMyPassword}
          className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          {isUpdatingMyPassword ? 'در حال تغییر...' : 'تغییر رمز عبور'}
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings