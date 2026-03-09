import { useMemo, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { Add, Edit2, Trash, User, Sms, Call } from 'iconsax-react'

const INITIAL_USERS = [
  { id: 1, fullName: 'علی محمدی', email: 'ali@example.com', phone: '09121234567', role: 'Admin' },
  { id: 2, fullName: 'نگار رضایی', email: 'negar@example.com', phone: '09128765432', role: 'Editor' },
]

const EMPTY_FORM = { fullName: '', email: '', phone: '', role: 'Viewer' }

function Users() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)

  const submitLabel = useMemo(() => (editingId ? 'ذخیره تغییرات' : 'افزودن کاربر'), [editingId])

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const handleCreate = () => {
    const newUser = {
      ...form,
      id: Date.now(),
    }
    setUsers((prev) => [newUser, ...prev])
    resetForm()
  }

  const handleUpdate = () => {
    setUsers((prev) => prev.map((user) => (user.id === editingId ? { ...user, ...form } : user)))
    resetForm()
  }

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
    if (editingId === id) {
      resetForm()
    }
  }

  const handleEdit = (user) => {
    setEditingId(user.id)
    setForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    })
  }

  const isValidForm = form.fullName && form.email && form.phone && form.role

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">مدیریت کاربران</h1>
          <p className="text-sm text-gray-600">ایجاد، مشاهده، ویرایش و حذف کاربران در یک صفحه.</p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{editingId ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">نام و نام خانوادگی</span>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثلاً علی محمدی"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">ایمیل</span>
              <div className="relative">
                <Sms size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="name@example.com"
                  dir="ltr"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">شماره تماس</span>
              <div className="relative">
                <Call size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0912xxxxxxx"
                  dir="ltr"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">نقش</span>
              <select
                value={form.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">مدیر</option>
                <option value="Editor">ویرایشگر</option>
                <option value="Viewer">مشاهده‌گر</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={editingId ? handleUpdate : handleCreate}
              disabled={!isValidForm}
              className="h-11 px-5 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-semibold inline-flex items-center gap-2"
            >
              <Add size={18} />
              {submitLabel}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="h-11 px-5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold"
              >
                لغو ویرایش
              </button>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4">لیست کاربران</h2>

          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-right text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-semibold">نام</th>
                <th className="pb-3 font-semibold">ایمیل</th>
                <th className="pb-3 font-semibold">شماره تماس</th>
                <th className="pb-3 font-semibold">نقش</th>
                <th className="pb-3 font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">کاربری ثبت نشده است.</td>
                </tr>
              )}

              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 last:border-b-0">
                  <td className="py-4 font-medium text-gray-900">{user.fullName}</td>
                  <td className="py-4 text-gray-700" dir="ltr">{user.email}</td>
                  <td className="py-4 text-gray-700" dir="ltr">{user.phone}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{user.role}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="h-9 px-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 inline-flex items-center gap-1"
                      >
                        <Edit2 size={15} /> ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="h-9 px-3 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 inline-flex items-center gap-1"
                      >
                        <Trash size={15} /> حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default Users
