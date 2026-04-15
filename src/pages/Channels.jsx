import { useMutation } from "@tanstack/react-query";
<<<<<<< HEAD
import { Edit2, FolderAdd, TickCircle, Trash, User } from "iconsax-react";
=======
import { Edit2, FolderAdd, TickCircle, Trash } from "iconsax-react";
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import useChannel from "../hooks/useChannel";
import DashboardLayout from "../layouts/DashboardLayout";
import { getSearch } from "../services/videoApi";

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
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [thumbDrag, setThumbDrag] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchChannels, setSearchChannels] = useState(null);

  const searchMutation = useMutation({
    mutationFn: getSearch,
    onSuccess: (res) => {
      const payload = res?.data;
      let foundChannels = [];

      if (Array.isArray(payload?.channels)) {
        foundChannels = payload.channels;
      } else if (Array.isArray(payload)) {
        foundChannels = payload;
      }

      setSearchChannels(foundChannels);
    },
  });

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (editing) {
        if (!imageFile && !editing?.image) {
          toast.error("لطفاً تصویر کانال را انتخاب کنید");
          return;
        }

        await updateChannel(editing.id, {
          name,
          slug: username // ✅ اضافه کن
        });
        if (imageFile) {
          await changeChannelImage(imageFile, editing.id);
        }

        toast.success("تغییرات کانال با موفقیت ذخیره شد");
        setEditing(null);
      } else {
        if (!imageFile) {
          toast.error("تصویر کانال الزامی است");
          return;
        }

        await createChannel({
          name,
          slug: username,
          image: imageFile,
        });


        // toast.success("کانال جدید با موفقیت ایجاد شد");
      }

      setName("");
      setUsername("");
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



  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setSearchChannels(null);
      return;
    }

    try {
      await searchMutation.mutateAsync(searchInput.trim());
    } catch {
      setSearchChannels([]);
    }
  };

  const channelsToRender = searchChannels === null ? channels : searchChannels;

  const handleChangeImage = async (id, file) => {
    try {
      await changeChannelImage(file, id);
      toast.success("تصویر کانال با موفقیت بروزرسانی شد");
    } catch {
      toast.error("آپلود تصویر انجام نشد");
    }
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
<<<<<<< HEAD
=======
        {/* header */}
        {/* <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            مدیریت کانال‌ها
          </h1>
          <p className="text-sm text-gray-600">ایجاد و مدیریت کانال‌های خود</p>
        </div> */}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad

        {/* فرم ایجاد / ویرایش */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editing ? "ویرایش کانال" : "ایجاد کانال جدید"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {/* آپلود تصویر */}
            <div>
              <div
                className={`rounded-xl border-2 transition-all ${thumbDrag
                  ? "border-blue-500 bg-blue-50"
                  : "border-dashed border-gray-300 hover:border-gray-400"
<<<<<<< HEAD
                  } p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[190px]`}
=======
                  } p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px]`}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
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

              <label className="space-y-2">
                {/* <span className="text-sm font-semibold text-gray-900">نام کاربری</span> */}
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={username}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase();
                      const regex = /^[a-z0-9_]*$/;

                      if (regex.test(value)) {
                        setUsername(value);
                      }
                    }}
                    className="h-11 w-full rounded-lg border border-gray-300 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="نام کاربری : مثلاً ali_m123"
                  />
                </div>
                <p className="text-xs text-gray-500 m-4">فقط حروف کوچک انگلیسی، اعداد و _ مجاز است.</p>
              </label>

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
                    !username.trim() ||
                    (!editing && !imageFile) ||
                    (editing && !imageFile && !editing?.image)
                  }
                  className="w-full items-center justify-center h-11 px-6 rounded-lg bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center gap-2"
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

        {/* <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">جستجوی کانال‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="نام کانال را وارد کنید"
              className="h-11 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={searchMutation.isPending}
              className="h-11 px-5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <SearchNormal1 size={18} />
              {searchMutation.isPending ? 'در حال جستجو...' : 'جستجو'}
            </button>
          </div>
        </div> */}

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
          ) : !channelsToRender?.length ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FolderAdd size={32} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">هنوز کانالی ایجاد نشده است</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(channelsToRender || []).map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {/* محتوای چپ (تصویر + اطلاعات) */}
                  <div className="flex items-center gap-3 w-full sm:w-auto mb-3 sm:mb-0">
                    {c.image ? (
                      <img
                        src={
                          c.image.startsWith("http")
                            ? c.image
                            : `http://${c.image}`
                        }
                        alt={c.name}
<<<<<<< HEAD
                        className="w-20 h-20 sm:w-12 sm:h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
=======
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                        بدون تصویر
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 block line-clamp-1">
                        {c.name}
                      </span>
<<<<<<< HEAD

                      <span className="block text-xs text-gray-500 mt-1">
                        @{c.username}
                      </span>

                      <span className="block text-xs text-gray-400 mt-1">
=======
                      <span className="block text-xs text-gray-500 mt-1">
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
                        ایجاد: {new Date(c.created_at).toLocaleDateString("fa-IR")} |
                        ویرایش: {new Date(c.updated_at).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>

                  {/* input مخفی برای آپلود تصویر - روی دکمه قرار می‌گیرد */}
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

                  {/* دکمه‌های اکشن */}
                  <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        setEditing(c);
                        setName(c.name);
                        setUsername(c.username || "");
                        setImageFile(null);
                      }}
<<<<<<< HEAD
                      className="h-9 px-3 justify-center sm:px-4 rounded-lg border border-gray-300 hover:bg-white hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
=======
                      className="h-9 px-3 sm:px-4 rounded-lg border border-gray-300 hover:bg-white hover:border-blue-500 text-gray-700 hover:text-blue-600 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
                    >
                      <Edit2 size={16} sm:size={20} color="currentColor" />
                      ویرایش
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(c.id)}
<<<<<<< HEAD
                      className="h-9 px-3 justify-center  sm:px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
=======
                      className="h-9 px-3 sm:px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none"
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
                    >
                      <Trash size={16} sm:size={20} color="#fff" />
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
        message={`آیا از حذف کانال "${channels?.find((c) => c.id === deleteConfirmId)?.name || ""
          }" مطمئن هستید؟ این عمل قابل بازگشت نیست.`}
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
      />
    </DashboardLayout>
  );
}

export default Channels;
