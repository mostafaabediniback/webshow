import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import useChannel from "../hooks/useChannel";
import { Trash, FolderAdd, TickCircle, Edit2 } from "iconsax-react";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

function Channels() {
  const {
    channels,
    createChannel,
    updateChannel,
    deleteChannel,
    isLoadingChannels,
    changeChannelImage,
  } = useChannel();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [thumbDrag, setThumbDrag] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (editing) {
        if (!imageFile && !editing?.image) {
          toast.error("لطفاً تصویر کانال را انتخاب کنید");
          return;
        }

        await updateChannel(editing.id, { name });

        if (imageFile) {
          await changeChannelImage(editing.id, imageFile);
        }

        toast.success("تغییرات کانال با موفقیت ذخیره شد");
        setEditing(null);
      } else {
        if (!imageFile) {
          toast.error("تصویر کانال الزامی است");
          return;
        }

        await createChannel({ name, image: imageFile });
        toast.success("کانال جدید با موفقیت ایجاد شد");
      }

      setName("");
      setImageFile(null);
    } catch (err) {
      toast.error("خطا در انجام عملیات، دوباره تلاش کنید");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setName("");
    setImageFile(null);
  };

  const handleDelete = async () => {
    try {
      await deleteChannel(deleteConfirmId);
      toast.success("کانال با موفقیت حذف شد");
      setDeleteConfirmId(null);
    } catch {
      toast.error("حذف کانال موفقیت‌آمیز نبود");
    }
  };

  const handleChangeImage = async (id, file) => {
    try {
      await changeChannelImage(id, file);
      toast.success("تصویر کانال با موفقیت بروزرسانی شد");
    } catch {
      toast.error("آپلود تصویر انجام نشد");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            مدیریت کانال‌ها
          </h1>
          <p className="text-sm text-gray-600">ایجاد و مدیریت کانال‌های خود</p>
        </div>

        {/* فرم ایجاد / ویرایش */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editing ? "ویرایش کانال" : "ایجاد کانال جدید"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {/* آپلود تصویر */}
            <div>
              <div
                className={`rounded-xl border-2 transition-all ${
                  thumbDrag
                    ? "border-blue-500 bg-blue-50"
                    : "border-dashed border-gray-300 hover:border-gray-400"
                } p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px]`}
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
              >
                <input
                  id="channel-image-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) =>
                    setImageFile(e.target.files?.[0] || null)
                  }
                />

                {imageFile ? (
                  <div className="w-full space-y-2">
                    <img
                      className="w-full h-32 rounded-lg object-cover border border-gray-200"
                      src={URL.createObjectURL(imageFile)}
                      alt="preview"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 truncate">
                        {imageFile.name}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ) : editing?.image ? (
                  <label
                    htmlFor="channel-image-input"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <img
                      src={
                        editing.image.startsWith("http")
                          ? editing.image
                          : `http://${editing.image}`
                      }
                      className="w-full h-32 rounded-lg object-cover border"
                    />
                    <p className="text-xs text-gray-600">
                      برای تغییر تصویر کلیک کنید
                    </p>
                  </label>
                ) : (
                  <label
                    htmlFor="channel-image-input"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                      📷
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      برای انتخاب تصویر کلیک کنید
                    </p>
                    <p className="text-xs text-gray-500">
                      یا تصویر را اینجا رها کنید
                    </p>
                  </label>
                )}
              </div>
            </div>

            {/* نام کانال + دکمه‌ها */}
            <div className="md:col-span-2 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="نام کانال را وارد کنید"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center gap-2">
                {editing && (
                  <button
                    onClick={handleCancel}
                    className="h-11 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    انصراف
                  </button>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={
                    !name.trim() ||
                    (!editing && !imageFile) ||
                    (editing && !imageFile && !editing?.image)
                  }
                  className="h-11 px-6 rounded-lg bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center gap-2"
                >
                  {editing ? (
                    <>
                      <TickCircle size={18} color="currentColor" variant="Bold" />
                      ذخیره تغییرات
                    </>
                  ) : (
                    <>
                      <FolderAdd size={18} color="currentColor" variant="Bold" />
                      افزودن کانال
                    </>
                  )}
                </button>
              </div>
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
                <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : !channels?.length ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FolderAdd size={32} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">هنوز کانالی ایجاد نشده است</p>
            </div>
          ) : (
            <div className="space-y-3">
              {channels.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {c.image ? (
                      <img
                        src={
                          c.image.startsWith("http")
                            ? c.image
                            : `http://${c.image}`
                        }
                        alt={c.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-medium">
                        بدون تصویر
                      </div>
                    )}

                    <div>
                      <span className="text-base font-semibold text-gray-900 block">
                        {c.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        ایجاد: {new Date(c.created_at).toLocaleDateString("fa-IR")} | ویرایش:{" "}
                        {new Date(c.updated_at).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>

                  <input
                    id={`chan-img-${c.id}`}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        handleChangeImage(c.id, f);
                        e.target.value = "";
                      }
                    }}
                  />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditing(c);
                        setName(c.name);
                        setImageFile(null);
                      }}
                      className="h-9 px-4 rounded-lg border border-gray-300 hover:bg-white hover:border-blue-500 text-gray-700 hover:text-blue-600 text-sm font-medium flex items-center gap-2"
                    >
                      <Edit2 size={20} color="currentColor" />
                      ویرایش
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(c.id)}
                      className="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center gap-2"
                    >
                      <Trash size={20} color="#fff" />
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
        onConfirm={handleDelete}
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
