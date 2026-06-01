import { Link } from "react-router-dom";
import { EmptyState, ErrorMessage, Skeleton } from "../ui";
import { useState } from "react";
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
  // const [openedPlaylist, setOpenedPlaylist] = useState(
  //   selectedPlaylistId || null,
  // );
  const [openedPlaylist, setOpenedPlaylist] = useState(null);

  useEffect(() => {
    if (!openedPlaylist && playlists.length > 0) {
      const firstPlaylistId = selectedPlaylistId || playlists[0].id;

      setOpenedPlaylist(firstPlaylistId);
      onSelectPlaylist?.(firstPlaylistId);
    }
  }, [playlists, selectedPlaylistId]);
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
  const items = Array.isArray(playlistDetail?.items)
    ? playlistDetail.items
    : [];

  const totalItems =
    Number(playlistDetail?.totalItems || items.length) || items.length;
  const heading = playlist?.name || "آهنگ‌ها";

  return (
    <section className="overflow-hidden ">
      <div className="  border-slate-200/80  pb-4 ">
        {/* <h3 className="mb-4 text-lg font-bold text-gray-900">پلی‌لیست</h3> */}

        <div className="space-y-3">
          {playlists.map((playlistOption) => {
            const isOpen = String(openedPlaylist) === String(playlistOption.id);

            const isSelected =
              String(selectedPlaylistId) === String(playlistOption.id);
              console.log(playlistOption);

            return (
              <div
                key={playlistOption.id}
                className="overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isOpen) {
                      setOpenedPlaylist(null);
                      return;
                    }

                    setOpenedPlaylist(playlistOption.id);
                    onSelectPlaylist(playlistOption.id);
                  }}
                  className="flex w-full items-center justify-between px-4 py-4 text-right transition-colors hover:bg-slate-50"
                >
                  <div>
                    <div className="flex justify-center items-center gap-2">
                      <Firstline
                        size="24"
                        color="currentColor"
                      />
                      <h3 className="text-lg font-bold text-slate-900">
                        پلی‌لیست
                      </h3>
                    </div>

                    <h3 className="text-sm font-medium text-slate-900 m-4">
                      {playlistOption.name || `پلی‌لیست ${playlistOption.id}`}
                    </h3>

                    {playlistOption.videos_count ? (
                      <p className="mt-1 text-xs text-slate-500">
                        {Number(playlistOption.videos_count).toLocaleString(
                          "fa-IR",
                        )}{" "}
                        ویدیو
                      </p>
                    ) : null}
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 p-3">
                    {isPlaylistDetailLoading && isSelected ? (
                      <PlaylistItemsSkeleton />
                    ) : isPlaylistDetailError && isSelected ? (
                      <ErrorMessage
                        title="خطا در دریافت آیتم‌های پلی‌لیست"
                        message="جزئیات این پلی‌لیست بارگذاری نشد."
                        onRetry={onRetryPlaylistDetail}
                        className="py-8"
                      />
                    ) : isSelected && items.length ? (
                      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                        {items.map((item, index) => {
                          const videoId = item?.id;
                          const isActive =
                            String(videoId) === String(currentVideoId);

                          const thumbnail = getPlaylistVideoThumbnail(item);

                          const duration = getPlaylistVideoDuration(item);

                          const order = getPlaylistVideoOrder(item, index);

                          return (
                            <Link
                              key={`${playlistOption.id}-${videoId}-${index}`}
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
                                    event.currentTarget.src =
                                      FALLBACK_THUMBNAIL;
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
                                  className={`line-clamp-2 text-sm font-bold leading-6 ${isActive
                                    ? "text-blue-900"
                                    : "text-slate-900"
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
                    ) : (
                      <div className="py-6 text-center text-sm text-slate-500">
                        برای مشاهده ویدیوهای این پلی‌لیست کلیک کنید
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default VideoPlaylistPanel;
