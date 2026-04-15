<<<<<<< HEAD
<<<<<<< HEAD
import { Edit2, Eye, Play, Trash } from "iconsax-react";

function VideoCard({ item, onDelete, onShow, onEdit, isDeleting, isEditing }) {
=======
import { Eye, Play, Trash } from "iconsax-react";

/**
 * کامپوننت نمایش یک ردیف ویدیو در لیست - کاملاً ریسپانسیو
 */
function VideoRow({ item, onDelete, onShow, isDeleting }) {
  // طبق OpenAPI: {id, channel_name, cover_link, title}
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
import { Edit2, Eye, Play, Trash } from "iconsax-react";

function VideoCard({ item, onDelete, onShow, onEdit, isDeleting, isEditing }) {
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  const coverImage =
    item.cover_link ||
    item.cover_url ||
    item.cover ||
    item.thumbnailUrl ||
    "https://picsum.photos/seed/default/300/180";

  const channelName = item.channel_name || item.channelName || "";
  const title = item.title || String(item.id);
  const viewCount = item.view_count ?? item.views ?? 0;
<<<<<<< HEAD

  const isPublic = item.public_show === 1 || item.public_show === true;

  return (
    <div className="flex flex-col justify-between w-72 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">

      {/* تصویر */}
      <div className="relative w-full h-44 bg-gray-200">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://picsum.photos/seed/default/300/180";
          }}
        />

        {/* وضعیت public/private */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full font-medium ${isPublic
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
            }`}
        >
          {isPublic ? "خصوصی" : "عمومی"}
        </span>
      </div>

      {/* محتوا */}
      <div className="p-4 space-y-2">
        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
          {title}
        </p>

        {channelName && (
          <p className="text-xs text-gray-600 truncate flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            {channelName}
          </p>
        )}

        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Eye size={14} color="#4a5565" />
          {Number(viewCount || 0).toLocaleString("fa-IR")} بازدید
        </p>
      </div>

      {/* دکمه‌ها */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-100">

        {onEdit && (
          <button
            onClick={() => onEdit(item)}
            disabled={isDeleting || isEditing}
            className="flex-1 h-10 rounded-lg border border-blue-200 hover:bg-blue-50 hover:border-blue-500 text-blue-700 text-xs font-medium flex items-center justify-center gap-2"
          >
            <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" color="#1D4ED8" /> <span className="hidden sm:inline">ویرایش</span>          </button>
        )}

        <button
          onClick={() => onShow(item.id)}
          disabled={isDeleting || isEditing}
          className="flex-1 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6" color="black" /> <span className="hidden sm:inline">نمایش</span>        </button>

        <button
          onClick={() => onDelete(item.id)}
          disabled={isDeleting}
          className="flex-1 h-10 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-medium flex items-center justify-center gap-2"
=======

  const isPublic = item.public_show === 1 || item.public_show === true;

  return (
    <div className="flex flex-col justify-between w-72 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">

      {/* تصویر */}
      <div className="relative w-full h-44 bg-gray-200">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://picsum.photos/seed/default/300/180";
          }}
        />

        {/* وضعیت public/private */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full font-medium ${isPublic
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
            }`}
        >
          {isPublic ? "خصوصی" : "عمومی"}
        </span>
      </div>

      {/* محتوا */}
      <div className="p-4 space-y-2">
        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
          {title}
        </p>

        {channelName && (
          <p className="text-xs text-gray-600 truncate flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            {channelName}
          </p>
        )}

        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Eye size={14} color="#4a5565" />
          {Number(viewCount || 0).toLocaleString("fa-IR")} بازدید
        </p>
      </div>

      {/* دکمه‌ها */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-100">

        {onEdit && (
          <button
            onClick={() => onEdit(item)}
            disabled={isDeleting || isEditing}
            className="flex-1 h-10 rounded-lg border border-blue-200 hover:bg-blue-50 hover:border-blue-500 text-blue-700 text-xs font-medium flex items-center justify-center gap-2"
          >
            <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" color="#1D4ED8" /> <span className="hidden sm:inline">ویرایش</span>          </button>
        )}

        <button
          onClick={() => onShow(item.id)}
          disabled={isDeleting || isEditing}
          className="flex-1 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6" color="black" /> <span className="hidden sm:inline">نمایش</span>        </button>

        <button
          onClick={() => onDelete(item.id)}
          disabled={isDeleting}
<<<<<<< HEAD
          className="flex-1 sm:flex-none h-10 px-3 sm:px-4 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 min-h-[40px]"
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
          className="flex-1 h-10 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-medium flex items-center justify-center gap-2"
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
        >
          <Trash className="w-5 h-5 sm:w-6 sm:h-6" color="#FFF" />
          <span className="hidden sm:inline">حذف</span>
        </button>
      </div>
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
export default VideoCard;
=======
export default VideoRow;
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
export default VideoCard;
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
