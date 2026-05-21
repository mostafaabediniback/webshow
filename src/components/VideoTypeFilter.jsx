import { DEFAULT_VIDEO_TYPE, VIDEO_TYPE_OPTIONS } from "../constants/videoTypeOptions";

function VideoTypeFilter({
  value = DEFAULT_VIDEO_TYPE,
  onChange,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {VIDEO_TYPE_OPTIONS.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange?.(option.value)}
            className={` rounded-[10px] border px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default VideoTypeFilter;
