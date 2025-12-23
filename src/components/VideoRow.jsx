import { Play, Trash } from "iconsax-react";

/**
 * کامپوننت نمایش یک ردیف ویدیو در لیست
 */
function VideoRow({ item, onDelete, onShow, isDeleting }) {
  // طبق OpenAPI: {id, channel_name, cover_link, title}
  const coverImage =
    item.cover_link ||
    item.cover_url ||
    item.cover ||
    item.thumbnailUrl ||
    "https://picsum.photos/seed/default/160/90";
  const channelName = item.channel_name || item.channelName || "";
  const title = item.title || String(item.id);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/seed/default/160/90";
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-gray-900 truncate mb-1">
            {title}
          </p>
          {channelName && (
            <p className="text-xs text-gray-600 truncate flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              {channelName}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onShow(item.id)}
          className="h-10 px-4 rounded-lg border border-gray-300 hover:bg-white hover:border-blue-500 text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Play size={24} color="black" />
          نمایش
        </button>
        <button
          onClick={() => onDelete(item.id)}
          disabled={isDeleting}
          className="h-10 px-4 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Trash size={24} color="#FFF" />
          حذف
        </button>
      </div>
    </div>
  );
}

export default VideoRow;

