import { Link } from "react-router-dom";
import { EmptyState, ErrorMessage, Skeleton } from "../ui";
import { useEffect } from "react";
import { Firstline } from "iconsax-react";

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
      .map((part, index) =>
        index === 0 ? String(part) : String(part).padStart(2, "0"),
      )
      .join(":");
  }

  return [minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
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
  useEffect(() => {
    if (!playlists.length) return;

    const hasSelectedPlaylist = playlists.some(
      (item) => String(item.id) === String(selectedPlaylistId),
    );

    if (!hasSelectedPlaylist) {
      onSelectPlaylist?.(playlists[0].id);
    }
  }, [playlists, selectedPlaylistId, onSelectPlaylist]);

  if (isPlaylistsLoading) {
    return (
      <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-[10px]" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
        <div className="space-y-2 border-b border-slate-100 p-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-[10px]" />
          ))}
        </div>
        <div className="p-3">
          <PlaylistItemsSkeleton />
        </div>
      </section>
    );
  }

  if (isPlaylistsError) {
    return (
      <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
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
      <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
        <EmptyState
          title="پلی‌لیستی برای این کانال ثبت نشده"
          message="بعد از ساخت پلی‌لیست، ویدیوهای آن در همین بخش نمایش داده می‌شوند."
          className="py-10"
        />
      </section>
    );
  }

  const playlist = playlistDetail?.playlist || playlistDetail?.play_list;
  const items = Array.isArray(playlistDetail?.items)
    ? playlistDetail.items
    : Array.isArray(playlistDetail?.videos)
      ? playlistDetail.videos
      : [];

  const selectedPlaylist =
    playlists.find(
      (item) => String(item.id) === String(selectedPlaylistId),
    ) || playlists[0];

  const selectedPlaylistTotal =
    Number(
      selectedPlaylist?.total_videos ??
        selectedPlaylist?.videos_count ??
        playlist?.total_videos ??
        items.length,
    ) || items.length;

  return (
    <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[10px] bg-slate-100 text-slate-700">
            <Firstline size="22" color="currentColor" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-extrabold text-slate-900">پلی‌لیست‌ها</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              {playlists.length.toLocaleString("fa-IR")} پلی‌لیست
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-slate-50/70 p-2.5">
        <div className="space-y-1.5">
          {playlists.map((playlistOption) => {
            const isSelected =
              String(selectedPlaylistId) === String(playlistOption.id);

            const count = Number(
              playlistOption?.total_videos ?? playlistOption?.videos_count ?? 0,
            );

            return (
              <button
                key={playlistOption.id}
                type="button"
                onClick={() => onSelectPlaylist?.(playlistOption.id)}
                className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-3 text-right transition-all ${
                  isSelected
                    ? "bg-white shadow-sm ring-1 ring-slate-200"
                    : "hover:bg-white/80"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 flex-shrink-0 rounded-full ${
                        isSelected ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    />

                    <span
                      className={`truncate text-sm ${
                        isSelected
                          ? "font-extrabold text-slate-950"
                          : "font-semibold text-slate-700"
                      }`}
                    >
                      {playlistOption.name || `پلی‌لیست ${playlistOption.id}`}
                    </span>
                  </div>

                  {count > 0 && (
                    <p className="mt-1 pr-4 text-[11px] text-slate-500">
                      {count.toLocaleString("fa-IR")} ویدیو
                    </p>
                  )}
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`h-4 w-4 flex-shrink-0 transition-transform ${
                    isSelected ? "rotate-90 text-blue-600" : "text-slate-400"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 18l6-6-6-6"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-extrabold text-slate-900">
              {playlist?.name || selectedPlaylist?.name || "ویدیوهای پلی‌لیست"}
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              {selectedPlaylistTotal.toLocaleString("fa-IR")} ویدیو
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 p-3">
          {isPlaylistDetailLoading ? (
            <PlaylistItemsSkeleton />
          ) : isPlaylistDetailError ? (
            <ErrorMessage
              title="خطا در دریافت آیتم‌های پلی‌لیست"
              message="جزئیات این پلی‌لیست بارگذاری نشد."
              onRetry={onRetryPlaylistDetail}
              className="py-8"
            />
          ) : items.length ? (
            <div className="max-h-[420px] space-y-1.5 overflow-y-auto pl-1">
              {items.map((item, index) => {
                const videoId = item?.id;
                const isActive = String(videoId) === String(currentVideoId);
                const thumbnail = getPlaylistVideoThumbnail(item);
                const duration = getPlaylistVideoDuration(item);
                const order = getPlaylistVideoOrder(item, index);

                return (
                  <Link
                    key={`${selectedPlaylist?.id}-${videoId}-${index}`}
                    to={`/v/${videoId}`}
                    className={`group flex items-center gap-3 rounded-[10px] p-2 transition-all ${
                      isActive
                        ? "bg-blue-50 ring-1 ring-blue-100"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative h-[68px] w-[108px] flex-shrink-0 overflow-hidden rounded-[9px] bg-slate-200">
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
                        <span className="absolute bottom-1 left-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {duration}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold ${
                            isActive ? "text-blue-600" : "text-slate-400"
                          }`}
                        >
                          {Number(order).toLocaleString("fa-IR")}
                        </span>

                        {isActive && (
                          <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">
                            در حال پخش
                          </span>
                        )}
                      </div>

                      <h5
                        className={`line-clamp-2 text-sm font-bold leading-6 ${
                          isActive ? "text-blue-950" : "text-slate-900"
                        }`}
                      >
                        {item?.title || `ویدیو ${videoId}`}
                      </h5>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {getPlaylistVideoChannelName(item)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-slate-500">
              ویدیویی در این پلی‌لیست وجود ندارد
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VideoPlaylistPanel;