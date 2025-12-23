import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import useChannel from "../hooks/useChannel";
import {Trash, FolderAdd, TickCircle } from "iconsax-react";
import ConfirmModal from "../components/ConfirmModal";
import { Edit2 } from "iconsax-react";

function Channels() {
  const {
    channels,
    createChannel,
    updateChannel,
    deleteChannel,
    isLoadingChannels,
  } = useChannel();

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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

  const handleCancel = () => {
    setEditing(null);
    setName("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            مدیریت کانال‌ها
          </h1>
          <p className="text-sm text-gray-600">ایجاد و مدیریت کانال‌های خود</p>
        </div>

        {/* فرم ایجاد / ویرایش کانال */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editing ? "ویرایش کانال" : "ایجاد کانال جدید"}
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="نام کانال را وارد کنید"
              className="flex-1 h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <div className="flex items-center gap-2">
              {editing && (
                <button
                  onClick={handleCancel}
                  className="h-11 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
                >
                  انصراف
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={!name.trim()}
                className="h-11 px-6 rounded-lg bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                {editing ? (
                  <>
                    <TickCircle size={18} />
                    ذخیره تغییرات
                  </>
                ) : (
                  <>
                    <FolderAdd size={18} />
                    افزودن کانال
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* لیست کانال‌ها */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            لیست کانال‌ها
          </h2>
          {isLoadingChannels ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : !channels?.length ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FolderAdd size={32} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                هنوز کانالی ایجاد نشده است
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {channels.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FolderAdd size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <span className="text-base font-semibold text-gray-900 block">
                        {c.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ایجاد شده در{" "}
                        {new Date(c.created_at).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditing(c);
                        setName(c.name);
                      }}
                      className="h-9 px-4 rounded-lg border border-gray-300 hover:bg-white hover:border-blue-500 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Edit2 size={24} color="black" />
                      ویرایش
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(c.id)}
                      className="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Trash size={24} color="#FFF" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteChannel(deleteConfirmId);
            setDeleteConfirmId(null);
          }
        }}
        title="حذف کانال"
        message={`آیا از حذف کانال "${
          channels?.find((c) => c.id === deleteConfirmId)?.name || ""
        }" مطمئن هستید؟ این عمل قابل بازگشت نیست.`}
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
      />
    </DashboardLayout>
  );
}

export default Channels;
