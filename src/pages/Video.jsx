import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Share } from "iconsax-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VideoPlaylistPanel from "../components/VideoPlaylistPanel";
import useChannelVideos from "../hooks/channel/useChannelVideos";
import usePlaylistDetail from "../hooks/playlist/usePlaylistDetail";
import usePlaylists from "../hooks/playlist/usePlaylists";
import { useVideo } from "../hooks/video/useVideo";
import Layout from "../layouts/Layout";
import {
  getPlaylistDetail,
  playlistQueryKeys,
} from "../services/playlist/playlistApi";
import { getVideoPlaylistIds } from "../services/videoApi";
import { readAuthSession } from "../utils/auth";

const DownloadIcon = ({ size = 16, color = "#4a5565", className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3v12"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11l4 4 4-4"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21H3"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Video() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useVideo(id);
  const currentVideo = data?.data;
  const currentChannelId = currentVideo?.channel_id || currentVideo?.channelId;

  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isAutoQuality, setIsAutoQuality] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [isSwitchingQuality, setIsSwitchingQuality] = useState(false);

  const { data: relatedVideos, isLoading: isRelatedLoading } = useChannelVideos(
    {
      channelId: currentChannelId,
      pageNumber: 1,
      pageSize: 25,
      enabled: !!currentChannelId,
    },
  );

  const {
    data: playlistsResponse,
    isLoading: isPlaylistsLoading,
    isError: isPlaylistsError,
    refetch: refetchPlaylists,
  } = usePlaylists(currentChannelId, { enabled: !!currentChannelId });

  // console.log(playlistsResponse);
  const playlists = playlistsResponse?.items || [];
  console.log(playlists);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoSource, setVideoSource] = useState("");
  const [hasResolvedInitialPlaylist, setHasResolvedInitialPlaylist] =
    useState(false);
  const [isResolvingInitialPlaylist, setIsResolvingInitialPlaylist] =
    useState(false);

  const videoRef = useRef(null);
  const downloadMenuRef = useRef(null);
  const qualityMenuRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  const {
    data: playlistDetail,
    isLoading: isPlaylistDetailLoading,
    isFetching: isPlaylistDetailFetching,
    isError: isPlaylistDetailError,
    refetch: refetchPlaylistDetail,
  } = usePlaylistDetail(selectedPlaylistId, {
    page: 1,
    perPage: 100,
    enabled: !!selectedPlaylistId,
  });

  const availableQualities = useMemo(() => {
    const links = currentVideo?.video_links;

    if (!links || typeof links !== "object") return [];

    return Object.entries(links)
      .filter(([, url]) => !!url)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([quality, url]) => ({
        quality,
        url,
      }));
  }, [currentVideo]);

  // Helper functions
  const getBestQuality = useCallback((qualities) => {
    if (!qualities.length) return null;

    const connection = navigator.connection;
    let downlink = 0;

    if (connection) {
      downlink = connection.downlink || 0;
      const effectiveType = connection.effectiveType;

      // Fallback if downlink is not available
      if (!downlink) {
        switch (effectiveType) {
          case "4g":
            downlink = 15;
            break;
          case "3g":
            downlink = 6;
            break;
          default:
            downlink = 0;
        }
      }
    }

    // Determine target quality based on speed
    let targetQuality;
    if (downlink >= 15) {
      targetQuality = 1080;
    } else if (downlink >= 6) {
      targetQuality = 482;
    } else {
      targetQuality = 360;
    }

    // Find nearest lower available quality
    const sortedQualities = [...qualities].sort(
      (a, b) => Number(b.quality) - Number(a.quality),
    );
    let bestQuality = sortedQualities.find(
      (q) => Number(q.quality) <= targetQuality,
    );

    // If no lower quality found, use the lowest available
    if (!bestQuality) {
      bestQuality = sortedQualities[sortedQualities.length - 1];
    }

    return bestQuality;
  }, []);

  const currentQuality = useMemo(() => {
    if (availableQualities.length === 0) return null;

    if (isAutoQuality) {
      return getBestQuality(availableQualities);
    }

    return (
      availableQualities.find((q) => q.quality === selectedQuality) ||
      availableQualities[availableQualities.length - 1]
    );
  }, [availableQualities, isAutoQuality, selectedQuality, getBestQuality]);

  // Switch video source
  const switchVideoSource = useCallback((newSource) => {
    const video = videoRef.current;
    if (!video) return;

    setIsSwitchingQuality(true);

    const currentTime = video.currentTime;
    const wasPaused = video.paused;
    const playbackRate = video.playbackRate;

    video.src = newSource;
    video.currentTime = currentTime;
    video.playbackRate = playbackRate;

    if (!wasPaused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    setIsSwitchingQuality(false);
  }, []);

  // Update video source based on current quality
  useEffect(() => {
    let src = currentVideo?.video_link || currentVideo?.videoUrl || "";

    if (availableQualities.length > 0 && currentQuality) {
      src = currentQuality.url;
    }

    if (src !== videoSource) {
      switchVideoSource(src);
      setVideoSource(src);
    }
  }, [
    currentVideo,
    availableQualities,
    currentQuality,
    videoSource,
    switchVideoSource,
  ]);

  // Network change listener
  useEffect(() => {
    const connection = navigator.connection;
    if (!connection || !isAutoQuality) return;

    const handleConnectionChange = () => {
      // The currentQuality useMemo will automatically update
    };

    connection.addEventListener("change", handleConnectionChange);
    return () =>
      connection.removeEventListener("change", handleConnectionChange);
  }, [isAutoQuality]);

  useEffect(() => {
    setSelectedPlaylistId(null);
    setHasResolvedInitialPlaylist(false);
    setIsResolvingInitialPlaylist(false);
    setIsAutoQuality(true);
    setSelectedQuality(null);
    setShowQualityMenu(false);
  }, [id]);

  useEffect(() => {
    if (!playlists.length) {
      setHasResolvedInitialPlaylist(true);
      return;
    }

    if (hasResolvedInitialPlaylist || isPlaylistsLoading || !id) return;

    let isMounted = true;

    const resolveInitialPlaylist = async () => {
      const possiblePlaylistIds = getVideoPlaylistIds(currentVideo);
      const matchingPlaylist = playlists.find((playlist) =>
        possiblePlaylistIds.some(
          (playlistId) => String(playlist.id) === String(playlistId),
        ),
      );

      if (matchingPlaylist) {
        if (isMounted) {
          setSelectedPlaylistId(matchingPlaylist.id);
          setHasResolvedInitialPlaylist(true);
        }
        return;
      }

      setIsResolvingInitialPlaylist(true);

      try {
        for (const playlist of playlists) {
          const detail = await queryClient.fetchQuery({
            queryKey: playlistQueryKeys.detail(playlist.id, 1, 100),
            queryFn: () =>
              getPlaylistDetail(playlist.id, { page: 1, per_page: 100 }),
          });

          const containsCurrentVideo = Array.isArray(detail?.items)
            ? detail.items.some((item) => String(item?.id) === String(id))
            : false;

          if (containsCurrentVideo) {
            if (isMounted) {
              setSelectedPlaylistId(playlist.id);
              setHasResolvedInitialPlaylist(true);
            }
            return;
          }
        }

        if (isMounted) {
          setSelectedPlaylistId(playlists[0]?.id ?? null);
          setHasResolvedInitialPlaylist(true);
        }
      } catch {
        if (isMounted) {
          setSelectedPlaylistId(playlists[0]?.id ?? null);
          setHasResolvedInitialPlaylist(true);
        }
      } finally {
        if (isMounted) {
          setIsResolvingInitialPlaylist(false);
        }
      }
    };

    resolveInitialPlaylist();

    return () => {
      isMounted = false;
    };
  }, [
    currentVideo,
    hasResolvedInitialPlaylist,
    id,
    isPlaylistsLoading,
    playlists,
    queryClient,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);

  const relatedItems = useMemo(
    () =>
      (relatedVideos?.items || [])
        .filter((video) => String(video.id) !== String(id))
        .slice(0, 10),
    [relatedVideos?.items, id],
  );

  const extractFilenameFromContentDisposition = (cd) => {
    if (!cd) return null;

    let m = cd.match(/filename\*=(?:UTF-8'')?(.+)/i);
    if (m && m[1]) {
      try {
        const raw = m[1].trim().replace(/(^"|"$)/g, "");
        return decodeURIComponent(raw);
      } catch {
        return m[1].replace(/(^"|"$)/g, "");
      }
    }

    m = cd.match(/filename="?([^"]+)"?/);
    if (m && m[1]) return m[1];

    return null;
  };

  const handleDownload = async (downloadUrl = videoSource, quality = "") => {
    if (!downloadUrl) {
      toast.error("آدرس ویدیو موجود نیست");
      return;
    }

    if (isDownloading) return;

    setIsDownloading(true);
    const safeName = (currentVideo?.title || "video")
      .replace(/[\/\\?%*:|"<>]/g, "-")
      .slice(0, 120);

    try {
      const { token } = readAuthSession();
      const res = await axios.get(downloadUrl, {
        responseType: "blob",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const blob = res.data;
      let ext = ".mp4";
      const mime =
        (blob && blob.type) ||
        (res.headers &&
          (res.headers["content-type"] || res.headers["Content-Type"])) ||
        "";

      if (mime.includes("webm")) ext = ".webm";
      else if (mime.includes("ogg")) ext = ".ogg";
      else if (mime.includes("mp4")) ext = ".mp4";

      let downloadName = quality
        ? `${safeName}-${quality}p${ext}`
        : `${safeName}${ext}`;
      const cdHeader =
        res.headers &&
        (res.headers["content-disposition"] ||
          res.headers["Content-Disposition"] ||
          "");
      const cdName = extractFilenameFromContentDisposition(cdHeader);
      if (cdName) downloadName = cdName;

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = downloadName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("دانلود شروع شد");
    } catch (err) {
      console.error("download error", err);
      try {
        window.open(downloadUrl, "_blank", "noopener");
        toast.info(
          "لینک ویدیو در تب جدید باز شد. در صورت نیاز می‌توانید روی آن راست‌کلیک و Save as کنید.",
        );
      } catch {
        toast.error(
          "دانلود مستقیم ممکن نیست. لطفاً با پشتیبانی تماس بگیرید یا بعداً تلاش کنید.",
        );
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    // if (isMobile) {
    //   if (video.requestFullscreen) {
    //     video.requestFullscreen();
    //   } else if (video.webkitEnterFullscreen) {
    //     video.webkitEnterFullscreen();
    //   }
    // }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        downloadMenuRef.current &&
        !downloadMenuRef.current.contains(e.target)
      ) {
        setShowDownloadMenu(false);
      }
      if (
        qualityMenuRef.current &&
        !qualityMenuRef.current.contains(e.target)
      ) {
        setShowQualityMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!videoSource || !videoRef.current) return;

    if (!isMobile) {
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [videoSource, isMobile]);

  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.setAttribute("playsinline", "");
    videoRef.current.setAttribute("webkit-playsinline", "");
  }
}, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6">
          <div className="animate-pulse">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 sm:rounded-xl" />
            <div className="mt-4 space-y-4 sm:mt-6">
              <div className="h-6 w-3/4 rounded bg-gray-200 sm:h-8" />
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 sm:h-12 sm:w-12" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/4 rounded bg-gray-200 sm:h-4" />
                  <div className="h-2 w-1/3 rounded bg-gray-200 sm:h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="py-12 text-center">
            <p className="text-lg font-medium text-red-600">ویدیو یافت نشد</p>
            <p className="mt-2 text-gray-500">لطفاً آدرس را بررسی کنید</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg sm:rounded-xl">
              <video
                ref={videoRef}
                controls
                playsInline
                webkit-playsinline="true"
                autoPlay
                preload="auto"
                src={videoSource}
                className="h-full w-full"
                onCanPlay={() => {
                  const video = videoRef.current;
                  if (!video) return;

                  handlePlay();

                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                  }
                }}
                onError={() => {
                  // Fallback to next quality or video_link
                  if (availableQualities.length > 0) {
                    const currentIndex = availableQualities.findIndex(
                      (q) => q.url === videoSource,
                    );
                    if (currentIndex < availableQualities.length - 1) {
                      const nextQuality = availableQualities[currentIndex + 1];
                      setVideoSource(nextQuality.url);
                    } else {
                      const fallbackSrc =
                        currentVideo?.video_link ||
                        currentVideo?.videoUrl ||
                        "";
                      setVideoSource(fallbackSrc);
                    }
                  } else {
                    const fallbackSrc =
                      currentVideo?.video_link || currentVideo?.videoUrl || "";
                    setVideoSource(fallbackSrc);
                  }
                }}
              />

              {/* Quality Selector */}
              {availableQualities.length > 0 && (
                <div
                  className="absolute left-1 top-1 z-10 sm:left-4 sm:top-4"
                  ref={qualityMenuRef}
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowQualityMenu(!showQualityMenu)}
                      className="
          flex items-center gap-1.5
          rounded-lg bg-black/70
          px-2 py-1.5
          text-xs
          font-medium text-white
          transition-colors hover:bg-black/80
          sm:gap-2 sm:px-3 sm:py-2 sm:text-sm
        "
                    >
                      {isSwitchingQuality && (
                        <div className="h-1 w-1 animate-spin rounded-full border-2 border-white/30 border-t-white sm:h-3 sm:w-3" />
                      )}

                      <span className="whitespace-nowrap">
                        {isAutoQuality
                          ? currentQuality
                            ? `Auto (${currentQuality.quality}p)`
                            : "Auto"
                          : currentQuality
                            ? `${currentQuality.quality}p`
                            : ""}
                      </span>
                    </button>

                    {showQualityMenu && (
                      <div
                        className="
            absolute left-0 z-50 
            w-28 overflow-hidden
            rounded-lg border bg-white shadow-xl
            sm:w-40 sm:rounded-xl sm:mt-2
          "
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setIsAutoQuality(true);
                            setShowQualityMenu(false);
                          }}
                          className={`flex w-full items-center justify-between px-3 py-2 !min-h-8 text-xs transition hover:bg-gray-100 sm:px-4 sm:py-3 sm:text-sm ${
                            isAutoQuality
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          <span>خودکار</span>
                          {isAutoQuality && <span>✓</span>}
                        </button>

                        {availableQualities.map((item) => (
                          <button
                            key={item.quality}
                            type="button"
                            onClick={() => {
                              setIsAutoQuality(false);
                              setSelectedQuality(item.quality);
                              setShowQualityMenu(false);
                            }}
                            className={`flex w-full items-center justify-between px-3 py-2 !min-h-8 text-xs transition hover:bg-gray-100 sm:px-4 sm:py-3 sm:text-sm ${
                              !isAutoQuality && selectedQuality === item.quality
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            <span>{item.quality}p</span>
                            {!isAutoQuality &&
                              selectedQuality === item.quality && (
                                <span>✓</span>
                              )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <h1 className="mt-4 px-1 text-lg font-extrabold leading-tight text-gray-900 sm:mt-6 sm:text-xl md:text-2xl lg:text-3xl">
              {currentVideo?.title}
            </h1>

            <div className="mt-3 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Link
                  to={
                    currentVideo?.username ? `/${currentVideo?.username}` : "/"
                  }
                  state={{ channelId: currentVideo?.channel_id }}
                  className="flex min-w-0 flex-1 items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <img
                    src={currentVideo?.channel_image}
                    alt={
                      currentVideo?.channelName || currentVideo?.channel_name
                    }
                    className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 ring-2 ring-gray-200 sm:h-12 sm:w-12"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {currentVideo?.channel_name}
                    </p>
                    {/* <p className="mt-0.5 text-xs text-gray-500">
                      {(currentVideo?.view_count || 0).toLocaleString("fa-IR")} بازدید
                    </p> */}
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-gray-600">
                <button
                  type="button"
                  onClick={async () => {
                    const shareUrl = `${window.location.origin}/v/${id}`;

                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: currentVideo?.title,
                          text: currentVideo?.title,
                          url: shareUrl,
                        });
                      } else {
                        const textArea = document.createElement("textarea");
                        textArea.value = shareUrl;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-999999px";
                        textArea.style.top = "-999999px";

                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);

                        toast.success("لینک ویدیو کپی شد", {
                          position: "bottom-center",
                          style: {
                            background: "#2563eb",
                            color: "#fff",
                            fontSize: "13px",
                            borderRadius: "10px",
                            padding: "10px 14px",
                          },
                        });
                      }
                    } catch {}
                  }}
                  className="inline-flex h-12 w-24 items-center justify-center gap-1.5 rounded-[10px] bg-[#f0f0f0] px-3 py-1.5 text-xs font-bold transition-colors hover:bg-gray-200 sm:text-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Share size={24} color="#4a5565" />
                    <span className="text-[16px]">اشتراک</span>
                  </div>
                </button>

                <div className="relative" ref={downloadMenuRef}>
                  <button
                    type="button"
                    disabled={isDownloading || !videoSource}
                    onClick={() => {
                      if (availableQualities.length) {
                        setShowDownloadMenu((prev) => !prev);
                      } else {
                        handleDownload();
                      }
                    }}
                    className="inline-flex h-12 w-24 items-center justify-center gap-2 rounded-[10px] bg-[#f0f0f0] px-3 py-1.5 text-xs font-bold transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                  >
                    {isDownloading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                        درحال دانلود...
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <DownloadIcon size={24} />
                        <span className="text-[16px]">دانلود</span>

                        {availableQualities.length > 0 && <></>}
                      </div>
                    )}
                  </button>

                  {showDownloadMenu && availableQualities.length > 0 && (
                    <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border bg-white shadow-xl">
                      {availableQualities.map((item) => (
                        <button
                          key={item.quality}
                          type="button"
                          onClick={() => {
                            setShowDownloadMenu(false);
                            handleDownload(item.url, item.quality);
                          }}
                          className="flex w-full items-center justify-between px-4 py-3 text-right transition hover:bg-gray-100"
                        >
                          <span>{item.quality}p</span>

                          <DownloadIcon size={16} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-3 sm:rounded-xl sm:p-4">
              <p className="break-words text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                {currentVideo?.description}
              </p>
            </div>
          </div>

          <aside className="lg:block">
            <div className="sticky top-24 space-y-4">
              {playlists.length > 0 && (
                <VideoPlaylistPanel
                  playlists={playlists}
                  isPlaylistsLoading={
                    isPlaylistsLoading || isResolvingInitialPlaylist
                  }
                  isPlaylistsError={isPlaylistsError}
                  onRetryPlaylists={refetchPlaylists}
                  selectedPlaylistId={selectedPlaylistId}
                  onSelectPlaylist={setSelectedPlaylistId}
                  playlistDetail={playlistDetail}
                  isPlaylistDetailLoading={
                    !!selectedPlaylistId &&
                    (isPlaylistDetailLoading ||
                      (isPlaylistDetailFetching && !playlistDetail))
                  }
                  isPlaylistDetailError={isPlaylistDetailError}
                  onRetryPlaylistDetail={refetchPlaylistDetail}
                  currentVideoId={id}
                />
              )}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  ویدیوهای مرتبط
                </h3>

                <div className="space-y-1 mb-24 sm:mb-0">
                  {isRelatedLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex gap-3 rounded-lg p-2">
                          <div className="h-24 w-40 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse" />
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                            <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
                          </div>
                        </div>
                      ))
                    : relatedItems.map((video) => (
                        <Link
                          to={`/v/${video.id}`}
                          key={video.id}
                          className="group flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 "
                        >
                          <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                            <img
                              src={
                                video.thumbnailUrl ||
                                video.cover_link ||
                                video.cover
                              }
                              alt={video.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.src =
                                  "https://picsum.photos/seed/default/160/90";
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                              {video.title}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500">
                              {video.channelName || video.channel_name}
                            </p>
                            {/* <p className="mt-1 text-xs text-gray-400">
                            {(video.views || 0).toLocaleString("fa-IR")} بازدید
                          </p> */}
                          </div>
                        </Link>
                      ))}
                </div>

                {!isRelatedLoading && !relatedItems.length && (
                  <p className="text-sm text-gray-500">
                    ویدیوی مرتبطی یافت نشد
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default Video;
