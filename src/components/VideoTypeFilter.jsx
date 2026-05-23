import {
  DEFAULT_VIDEO_TYPE,
  VIDEO_TYPE_OPTIONS,
} from "../constants/videoTypeOptions";

function VideoTypeFilter({
  value = DEFAULT_VIDEO_TYPE,
  viewMode,
  onChange,
  onPlaylistClick,
}) {
  const activeClass =
    "rounded-[10px] border px-4 py-2 text-sm font-medium transition-all border-blue-600 bg-blue-600 text-white shadow-sm";

  const normalClass =
    "rounded-[10px] border px-4 py-2 text-sm font-medium transition-all border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700";

  return (
    <div className="flex flex-wrap gap-2">
{VIDEO_TYPE_OPTIONS.map((option) => {
  const isActive =
    viewMode === "videos" && option.value === value;

  return (
    <button
      key={option.value}
      type="button"
      onClick={() => onChange(option.value)}
      className={isActive ? activeClass : normalClass}
    >
      {option.label}
    </button>
  );
})}

      <button
        type="button"
        onClick={onPlaylistClick}
  className={viewMode === "playlists" ? activeClass : normalClass}
      >
        پلی‌لیست‌ها
      </button>
    </div>
  );
}

export default VideoTypeFilter;