import { useMemo, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import useChannel from '../hooks/useChannel'
import { Add, SearchNormal1, User, Call, Lock } from 'iconsax-react'
import { toast } from 'react-toastify'
import { useCreateUser, useUsersList } from '../hooks/users'

const INITIAL_FORM = {
  full_name: '',
  phone_number: '',
  password: '',
  channel_id: ''
}

function Users() {
  const { channels, isLoadingChannels } = useChannel()
  const [form, setForm] = useState(INITIAL_FORM)
  const [searchInput, setSearchInput] = useState('')
  const [searchPhoneNumber, setSearchPhoneNumber] = useState('')

  const {
    users,
    isLoadingUsers,
    isFetchingUsers,
  } = useUsersList(searchPhoneNumber)

  const {
    createUser,
    isCreatingUser,
  } = useCreateUser({
    onSuccess: () => {
      setForm(INITIAL_FORM)
    }
  })

  const isValidCreate = useMemo(() => {
    return form.channel_id && form.phone_number && form.password && form.full_name
  }, [form])

  const handleCreate = async () => {
    if (!isValidCreate) {
      toast.error('لطفاً همه فیلدها را کامل کنید')
      return
    }

    await createUser({
      channel_id: Number(form.channel_id),
      phone_number: form.phone_number,
      password: form.password,
      full_name: form.full_name,
    })
  }

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      toast.error('شماره موبایل را وارد کنید')
      return
    }

    setSearchPhoneNumber(searchInput.trim())
  }

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">مدیریت کاربران</h1>
          <p className="text-sm text-gray-600">ایجاد کاربر جدید و جستجو بر اساس شماره موبایل</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">ساخت کاربر</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">نام و نام خانوادگی</span>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.full_name}
                  onChange={(e) => handleFormChange('full_name', e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثلاً علی محمدی"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">شماره موبایل</span>
              <div className="relative">
                <Call size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.phone_number}
                  onChange={(e) => handleFormChange('phone_number', e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0912xxxxxxx"
                  dir="ltr"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">رمز عبور</span>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleFormChange('password', e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="******"
                  dir="ltr"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">کانال</span>
              <select
                value={form.channel_id}
                onChange={(e) => handleFormChange('channel_id', e.target.value)}
                disabled={isLoadingChannels}
                className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب کانال</option>
                {(channels || []).map((channel) => (
                  <option key={channel.id} value={channel.id}>{channel.name}</option>
                ))}
              </select>
            </label>
          </div>

          <button
            onClick={handleCreate}
            disabled={!isValidCreate || isCreatingUser}
            className="mt-5 h-11 px-5 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-semibold inline-flex items-center gap-2"
          >
            <Add size={18} />
            {isCreatingUser ? 'در حال ثبت...' : 'ایجاد کاربر'}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">جستجوی کاربران</h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="شماره موبایل کاربر را وارد کنید"
              className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="ltr"
            />
            <button
              onClick={handleSearch}
              disabled={!searchInput.trim()}
              className="h-11 px-5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <SearchNormal1 size={18} />
              {isFetchingUsers ? 'در حال جستجو...' : 'جستجو'}
            </button>
          </div>

          {isLoadingUsers && (
            <p className="mt-3 text-sm text-gray-500">در حال دریافت لیست کاربران...</p>
          )}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-right text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-semibold">نام</th>
                  <th className="pb-3 font-semibold">شماره موبایل</th>
                  <th className="pb-3 font-semibold">شناسه کانال</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">نتیجه‌ای برای نمایش وجود ندارد.</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id || index} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-4 font-medium text-gray-900">{user.full_name || '-'}</td>
                      <td className="py-4 text-gray-700" dir="ltr">{user.phone_number || '-'}</td>
                      <td className="py-4 text-gray-700">{user.channel_id || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Users
