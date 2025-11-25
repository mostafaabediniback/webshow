import DashboardLayout from '../layouts/DashboardLayout'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChannels, createChannel, updateChannel, deleteChannel } from '../services/api'
import { useState } from 'react'

function Row({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
      <span className="text-sm sm:text-base font-medium text-gray-900">{item.name}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(item)} className="h-9 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm">ویرایش</button>
        <button onClick={() => onDelete(item.id)} className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm">حذف</button>
      </div>
    </div>
  )
}

function Channels() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['chans'], queryFn: getChannels })
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(null)

  const mCreate = useMutation({
    mutationFn: (payload) => createChannel(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chans'] })
      setName('')
    }
  })

  const mUpdate = useMutation({
    mutationFn: ({ id, name }) => updateChannel(id, { name }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chans'] })
      setEditing(null)
      setName('')
    }
  })

  const mDelete = useMutation({
    mutationFn: (id) => deleteChannel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['chans'] })
  })

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">مدیریت کانال‌ها</h1>
        <div className="flex items-center gap-2 mb-6">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="نام کانال" className="h-10 px-3 rounded-lg border border-gray-300 flex-1" />
          {editing ? (
            <button onClick={() => mUpdate.mutate({ id: editing.id, name })} className="h-10 px-4 rounded-lg bg-blue-600 text-white">ذخیره</button>
          ) : (
            <button onClick={() => mCreate.mutate({ name })} className="h-10 px-4 rounded-lg bg-black text-white">افزودن</button>
          )}
        </div>
        <div className="space-y-3">
          {(data || []).length === 0 ? (
            <p className="text-sm text-gray-500">کانالی موجود نیست</p>
          ) : (
            (data || []).map((c) => (
              <Row key={c.id} item={c} onEdit={(it)=>{ setEditing(it); setName(it.name) }} onDelete={(id)=>mDelete.mutate(id)} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Channels