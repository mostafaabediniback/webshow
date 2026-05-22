import { Link } from "react-router-dom";
import { EmptyState, ErrorMessage, Skeleton } from "../ui";

const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/default/320/180";

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

const getPlaylistVideoThumbnail = (item) =>
  normalizeText(
    item?.thumbnailUrl ||
    item?.cover_link ||
    item?.cover ||
    item?.thumbnail ||
    item?.image,
  ) || FALLBACK_THUMBNAIL;

const getPlaylistVideoChannelName = (item) =>
  normalizeText(item?.channel_name || item?.channelName || item?.owner_name) ||
  "کانال ناشناس";

const getPlaylistVideoDuration = (item) => {
  const rawDuration =
    item?.duration ??
    item?.video_duration ??
    item?.length ??
    item?.time ??
    item?.meta?.duration;

  if (rawDuration == null || rawDuration === "") return "";

  if (typeof rawDuration === "string" && rawDuration.includes(":")) {
    return rawDuration;
  }

  const totalSeconds = Number(rawDuration);
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return [hours, minutes, seconds]
      .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, "0")))
      .join(":");
  }

  return [minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
};

const getPlaylistVideoOrder = (item, index) => {
  const explicitOrder = item?.order ?? item?.sort_order ?? item?.pivot?.order;
  const parsedOrder = Number(explicitOrder);

  if (Number.isFinite(parsedOrder) && parsedOrder > 0) {
    return parsedOrder;
  }

  return index + 1;
};

const PlaylistItemsSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-3"
      >
        <Skeleton className="h-5 w-5 rounded-[10px]" />
        <Skeleton className="h-16 w-24 rounded-[10px] flex-shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * @param {Object} props
 * @param {import("../services/playlist/playlistApi").PlaylistSummary[]} props.playlists
 * @param {boolean} props.isPlaylistsLoading
 * @param {boolean} props.isPlaylistsError
 * @param {Function} props.onRetryPlaylists
 * @param {string|number|null} props.selectedPlaylistId
 * @param {(playlistId: string|number) => void} props.onSelectPlaylist
 * @param {import("../services/playlist/playlistApi").PlaylistDetailResponse | undefined} props.playlistDetail
 * @param {boolean} props.isPlaylistDetailLoading
 * @param {boolean} props.isPlaylistDetailError
 * @param {Function} props.onRetryPlaylistDetail
 * @param {string|number} props.currentVideoId
 */
function VideoPlaylistPanel({
  playlists = [],
  isPlaylistsLoading,
  isPlaylistsError,
  onRetryPlaylists,
  selectedPlaylistId,
  onSelectPlaylist,
  playlistDetail,
  isPlaylistDetailLoading,
  isPlaylistDetailError,
  onRetryPlaylistDetail,
  currentVideoId,
}) {
  if (isPlaylistsLoading) {
    return (
      <section className="rounded-[10px] border border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-24 rounded-[10px]" />
        </div>
        <PlaylistItemsSkeleton />
      </section>
    );
  }

  if (isPlaylistsError) {
    return (
      <section className="rounded-[10px] border border-slate-200 bg-white p-4 shadow-sm">
        <ErrorMessage
          title="خطا در دریافت پلی‌لیست‌ها"
          message="فهرست پلی‌لیست‌های این کانال بارگذاری نشد."
          onRetry={onRetryPlaylists}
          className="py-10"
        />
      </section>
    );
  }

  if (!playlists.length) {
    return (
      <section className="rounded-[10px] border border-slate-200 bg-white p-4 shadow-sm">
        <EmptyState
          title="پلی‌لیستی برای این کانال ثبت نشده"
          message="بعد از ساخت پلی‌لیست، همین بخش آهنگ‌ها و ویدیوهای داخل آن را نمایش می‌دهد."
          className="py-10"
        />
      </section>
    );
  }

  const playlist = playlistDetail?.playlist;
  const items = Array.isArray(playlistDetail?.items) ? playlistDetail.items : [];
  const totalItems = Number(playlistDetail?.totalItems || items.length) || items.length;
  const heading = playlist?.name || "آهنگ‌ها";

  return (
    <section className="overflow-hidden rounded-[10px] border border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 shadow-sm">
      <div className="  border-slate-200/80 px-4 pb-4 pt-4">
        {/* <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
              PLAYLIST
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-slate-900">{heading}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {Number(totalItems).toLocaleString("fa-IR")} ویدیو
            </p>
          </div>
        </div> */}

        {playlists.length > 1 && (
<div className="mt-5">
  <div className="mb-3 flex items-center gap-2">
    <span className="text-sm font-semibold text-slate-800">
      انتخاب پلی‌لیست
    </span>

    <span className="h-px flex-1 bg-slate-200" />
  </div>

  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {playlists.map((playlistOption) => {
      const isActive =
        String(playlistOption.id) === String(selectedPlaylistId);

      return (
        <button
          key={playlistOption.id}
          type="button"
          onClick={() => onSelectPlaylist(playlistOption.id)}
          className={`
            shrink-0
            rounded-[10px]
            px-4
            py-2
            text-sm
            font-medium
            transition-all
            duration-200
            whitespace-nowrap
            ${
              isActive
                ? `
                  bg-blue-600
                  text-white
                  shadow-md
                  shadow-blue-100
                `
                : `
                  bg-slate-100
                  text-slate-700
                  hover:bg-blue-50
                  hover:text-blue-700
                `
            }
          `}
        >
          {playlistOption.name || `پلی‌لیست ${playlistOption.id}`}
        </button>
      );
    })}
  </div>
</div>
        )}
      </div>

      <div className="px-3 py-3">
        {isPlaylistDetailLoading ? (
          <PlaylistItemsSkeleton />
        ) : isPlaylistDetailError ? (
          <ErrorMessage
            title="خطا در دریافت آیتم‌های پلی‌لیست"
            message="جزئیات این پلی‌لیست بارگذاری نشد."
            onRetry={onRetryPlaylistDetail}
            className="py-10"
          />
        ) : !items.length ? (
          <></>
          // <EmptyState
          //   title="این پلی‌لیست هنوز ویدیویی ندارد"
          //   message="بعد از افزودن ویدیوها، لیست آن‌ها از همین‌جا قابل مشاهده است."
          //   className="py-10"
          // />
        ) : (
          <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
            {items.map((item, index) => {
              const videoId = item?.id;
              const isActive = String(videoId) === String(currentVideoId);
              const thumbnail = getPlaylistVideoThumbnail(item);
              const duration = getPlaylistVideoDuration(item);
              const order = getPlaylistVideoOrder(item, index);

              return (
                <Link
                  key={`${selectedPlaylistId}-${videoId}-${index}`}
                  to={`/v/${videoId}`}
                  className={`group flex items-center gap-3 rounded-[10px] border p-2.5 transition-all ${isActive
                      ? "border-blue-200 bg-blue-50 shadow-sm"
                      : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] text-xs font-extrabold ${isActive
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      }`}
                  >
                    {Number(order).toLocaleString("fa-IR")}
                  </div>

                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-[10px] bg-slate-200">
                    <img
                      src={thumbnail}
                      alt={item?.title || `video-${videoId}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_THUMBNAIL;
                      }}
                    />
                    {duration && (
                      <span className="absolute bottom-1 left-1 rounded-[10px] bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {duration}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4
                      className={`line-clamp-2 text-sm font-bold leading-6 ${isActive ? "text-blue-900" : "text-slate-900"
                        }`}
                    >
                      {item?.title || `ویدیو ${videoId}`}
                    </h4>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {getPlaylistVideoChannelName(item)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default VideoPlaylistPanel;
