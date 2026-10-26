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
  const baseClass = `
    flex-1 min-w-fit
    px-4 py-3
    rounded-full
    text-sm font-medium
    transition-all duration-200
    text-center
    whitespace-nowrap
  `;

  const activeClass = "bg-white text-orange-500 shadow-sm";

  const normalClass =
    "text-gray-500 hover:text-gray-700 hover:bg-gray-50";

  return (
    <div className="w-full">
      <div
        className="
          flex gap-2
          bg-[#eff1f4]
          p-1
          rounded-full
          w-full sm:w-fit
          overflow-x-auto sm:overflow-visible
          no-scrollbar
        "
      >
        {VIDEO_TYPE_OPTIONS.map((option) => {
          const isActive =
            viewMode === "videos" && option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`${baseClass} ${
                isActive ? activeClass : normalClass
              }`}
            >
              {option.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onPlaylistClick}
          className={`${baseClass} ${
            viewMode === "playlists"
              ? activeClass
              : normalClass
          }`}
        >
          پلی‌لیست‌ها
        </button>
      </div>
    </div>
  );
}

export default VideoTypeFilter;