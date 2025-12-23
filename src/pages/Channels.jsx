import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import useChannel from "../hooks/useChannel";

function Channels() {
  const { channels, createChannel, updateChannel, deleteChannel } = useChannel();

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editing) {
      updateChannel(editing.id, { name });
      setEditing(null);
    } else {
      createChannel({ name });
    }

    setName("");
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">

        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          مدیریت کانال‌ها
        </h1>

        {/* فرم ایجاد / ویرایش کانال */}
        <div className="flex items-center gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام کانال"
            className="h-10 px-3 rounded-lg border border-gray-300 flex-1 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            className="h-10 px-4 rounded-lg bg-black text-white"
          >
            {editing ? "ذخیره" : "افزودن"}
          </button>
        </div>

        {/* لیست کانال‌ها */}
        <div className="space-y-3">
          {!channels?.length ? (
            <p className="text-sm text-gray-500">کانالی موجود نیست</p>
          ) : (
            channels.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white"
              >
                <span className="text-sm sm:text-base font-medium text-gray-900">
                  {c.name}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditing(c);
                      setName(c.name);
                    }}
                    className="h-9 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm"
                  >
                    ویرایش
                  </button>

                  <button
                    onClick={() => deleteChannel(c.id)}
                    className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Channels;
