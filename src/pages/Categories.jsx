import { Add, Category, Edit2, Music, SearchNormal1 } from "iconsax-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from "../hooks/category";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button, Modal } from "../ui";

const INITIAL_FORM = {
  title: "",
  can_have_audio: false,
};

const INITIAL_EDIT_FORM = {
  id: "",
  title: "",
  can_have_audio: false,
};

function Categories() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [searchInput, setSearchInput] = useState("");
  const [filterText, setFilterText] = useState("");
  const [editForm, setEditForm] = useState(INITIAL_EDIT_FORM);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  const { createCategory, isCreatingCategory } = useCreateCategory({
    onSuccess: () => {
      setForm(INITIAL_FORM);
      toast.success("دسته‌بندی با موفقیت ایجاد شد");
    },
  });

  const { updateCategory, isUpdatingCategory } = useUpdateCategory({
    onSuccess: () => {
      setEditForm(INITIAL_EDIT_FORM);
      setIsEditModalOpen(false);
      toast.success("دسته‌بندی بروزرسانی شد");
    },
  });

  const filteredCategories = useMemo(() => {
    if (!filterText) return categories;

    return categories.filter((cat) =>
      cat.title?.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [categories, filterText]);

  const isValidCreate = useMemo(() => {
    return form.title.trim().length > 0;
  }, [form]);

  const handleCreate = async () => {
    if (!isValidCreate) {
      toast.error("لطفاً عنوان دسته‌بندی را وارد کنید");
      return;
    }

    await createCategory({
      title: form.title,
      can_have_audio: form.can_have_audio,
    });
  };

  const handleSearch = () => {
    setFilterText(searchInput.trim());
  };

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const openEditModal = (category) => {
    setEditForm({
      id: category.id,
      title: category.title || "",
      can_have_audio: !!category.can_have_audio,
    });

    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async () => {
    if (!editForm.id || !editForm.title.trim()) {
      toast.error("لطفاً عنوان دسته‌بندی را وارد کنید");
      return;
    }

    await updateCategory({
      id: editForm.id,
      payload: {
        title: editForm.title,
        can_have_audio: editForm.can_have_audio,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          {/* <div>
            <h1 className="text-2xl font-black text-gray-900">
              مدیریت دسته‌بندی‌ها
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              ایجاد، ویرایش و مدیریت دسته‌بندی‌های ویدیو
            </p>
          </div> */}
{/* 
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[10px] bg-blue-50 text-blue-700 border border-blue-100">
            <Category size={20} color="currentColor" />
            <span className="font-semibold text-sm">
              {categories.length} دسته‌بندی
            </span>
          </div> */}
        </div>

        {/* CREATE */}
        <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            ساخت دسته‌بندی جدید
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-gray-900">
                عنوان دسته‌بندی
              </span>

              <div className="relative">
                <Category
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="
                    h-11 w-full rounded-[8px]
                    border border-gray-200
                    pr-4 pl-10
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all duration-200
                  "
                  placeholder="مثلاً آموزشی، مذهبی"
                />
              </div>
            </label>

            <div className="flex items-center gap-2 h-11">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.can_have_audio}
                  onChange={(e) =>
                    handleFormChange("can_have_audio", e.target.checked)
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm font-semibold text-gray-900">
                  قابلیت داشتن صوت
                </span>
              </label>
            </div>
          </div>

          <Button
            onClick={handleCreate}
            disabled={!isValidCreate}
            isLoading={isCreatingCategory}
            icon={<Add size={18} color="currentColor" />}
            className="mt-5"
          >
            ایجاد دسته‌بندی
          </Button>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            لیست دسته‌بندی‌ها
          </h2>

          {/* SEARCH */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <div className="relative">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="جستجو در عنوان دسته‌بندی..."
                className="
                  h-11 w-full rounded-[10px]
                  border border-gray-200
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition-all duration-200
                "
              />
            </div>

            <Button
              variant="secondary"
              onClick={handleSearch}
              icon={<SearchNormal1 size={18} color="currentColor" />}
              className="bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100"
            >
              جستجو
            </Button>
          </div>

          {isLoadingCategories && (
            <p className="mt-4 text-sm text-gray-500">
              در حال دریافت لیست دسته‌بندی‌ها...
            </p>
          )}

          {/* DESKTOP TABLE */}
          <div className="hidden md:block mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-gray-500 border-b border-gray-100 bg-gray-50">
                  <th className="py-4 px-2 font-semibold rounded-r-[10px]">
                    شناسه
                  </th>

                  <th className="py-4 px-2 font-semibold">عنوان</th>

                  <th className="py-4 px-2 font-semibold text-center">
                    قابلیت صوت
                  </th>

                  <th className="py-4 px-2 font-semibold text-center rounded-l-[10px]">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-gray-500">
                      نتیجه‌ای برای نمایش وجود ندارد.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 hover:bg-blue-50/40 transition-all duration-200"
                    >
                      <td className="py-4 px-2 text-gray-400">{category.id}</td>

                      <td className="py-4 px-2 font-medium text-gray-800">
                        {category.title || "-"}
                      </td>

                      <td className="py-4 px-2 text-center">
                        {category.can_have_audio ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[10px] bg-green-100 text-green-700 text-xs font-semibold">
                            <Music size={14} color="currentColor" />
                            دارد
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[10px] bg-gray-100 text-gray-500 text-xs font-semibold">
                            ندارد
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-2 text-center">
                        <Button
                          onClick={() => openEditModal(category)}
                          size="sm"
                          variant="outline"
          
                        >
                          <Edit2 size={14} color="currentColor" />
                          ویرایش
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="md:hidden mt-5 space-y-4">
            {filteredCategories.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                نتیجه‌ای برای نمایش وجود ندارد.
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="
                    p-4 rounded-[10px]
                    border border-gray-100
                    bg-white
                    shadow-md
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-400">
                        شناسه: {category.id}
                      </p>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {category.title || "-"}
                      </h3>
                    </div>

                    {category.can_have_audio ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[10px] bg-green-100 text-green-700 text-xs font-semibold">
                        <Music size={14} color="currentColor" />
                        صوت
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[10px] bg-gray-100 text-gray-500 text-xs font-semibold">
                        بدون صوت
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => openEditModal(category)}
                    className="
                      h-10 w-full mt-4 rounded-[10px]
                      bg-blue-50
                      text-blue-700
                      border border-blue-100
                      hover:bg-blue-100
                      text-sm font-semibold
                      transition-all duration-200
                      inline-flex items-center justify-center gap-2
                    "
                  >
                    <Edit2 size={16} color="currentColor" />
                    ویرایش دسته‌بندی
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="ویرایش دسته‌بندی"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isUpdatingCategory}
            >
              انصراف
            </Button>

            <Button
              onClick={handleUpdateCategory}
              isLoading={isUpdatingCategory}
            >
              ذخیره تغییرات
            </Button>
          </div>
        }
      >
        <div className="space-y-5 py-2">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-gray-900">
              عنوان دسته‌بندی
            </span>

            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="
                h-11 w-full rounded-[10px]
                border border-gray-200
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all duration-200
              "
              placeholder="عنوان دسته‌بندی"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none py-2">
            <input
              type="checkbox"
              checked={editForm.can_have_audio}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  can_have_audio: e.target.checked,
                }))
              }
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <span className="text-sm font-semibold text-gray-900">
              قابلیت داشتن صوت
            </span>
          </label>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Categories;
