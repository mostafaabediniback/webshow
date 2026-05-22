import axiosInstanceNew from "../../utils/axiosConfigNew";
import { QueryKeys } from "../../enums";

/**
 * @typedef {import("../../types/playlist").PlaylistSummary} PlaylistSummary
 */

/**
 * @typedef {import("../../types/playlist").PlaylistVideo} PlaylistVideo
 */

/**
 * @typedef {import("../../types/playlist").PlaylistDetailResponse} PlaylistDetailResponse
 */

/**
 * @typedef {import("../../types/playlist").PlaylistListResponse} PlaylistListResponse
 */

export const playlistQueryKeys = {
  all: [QueryKeys.playlists],
  list: (channelId = "all") => [QueryKeys.playlists, channelId ?? "all"],
  detail: (playlistId, page = 1, perPage = 25) => [
    QueryKeys.playlist,
    playlistId,
    page,
    perPage,
  ],
};

const normalizePlaylist = (playlist = {}) => ({
  id: playlist?.id,
  name: playlist?.name || "",
  is_public: playlist?.is_public,
  videos_count:
    Number(
      playlist?.videos_count ??
        playlist?.videosCount ??
        playlist?.videos_total ??
        playlist?.videos?.length,
    ) || 0,
  thumbnail:
    playlist?.thumbnail ||
    playlist?.thumbnail_url ||
    playlist?.cover_link ||
    playlist?.cover ||
    "",
  created_at: playlist?.created_at || "",
  updated_at: playlist?.updated_at || "",
});

const extractPagination = (root = {}, fallbackTotal = 0) => {
  const meta = root?.meta ?? {};

  return {
    meta,
    totalPages: Number(meta?.last_page || 1) || 1,
    totalItems: Number(meta?.total || fallbackTotal) || fallbackTotal,
    links: root?.links,
  };
};

const mapPlaylistListResponse = (payload) => {
  const root = payload?.data ?? payload ?? {};
  const rawItems = Array.isArray(root?.data)
    ? root.data
    : Array.isArray(root)
      ? root
      : [];
  const items = rawItems.map(normalizePlaylist);
  const { meta, totalItems, totalPages, links } = extractPagination(root, items.length);

  /** @type {PlaylistListResponse} */
  return {
    items,
    meta,
    links,
    totalItems,
    totalPages,
  };
};

const mapPlaylistDetailResponse = (payload) => {
  const root = payload?.data ?? payload ?? {};
  const playlist = root?.data?.play_list ?? root?.play_list ?? root?.data?.playlist ?? null;
  const videos = Array.isArray(root?.data?.videos)
    ? root.data.videos
    : Array.isArray(root?.videos)
      ? root.videos
      : [];

  const { meta, totalPages, totalItems } = extractPagination(root, videos.length);

  return {
    playlist: playlist ? normalizePlaylist(playlist) : null,
    items: videos,
    meta,
    totalPages,
    totalItems,
  };
};

export const getPlaylists = async (channelId, { page = 1, per_page = 25 } = {}) => {
  const url = channelId
    ? `/play-list/index/${channelId}`
    : `/play-list/index`;

  const res = await axiosInstanceNew.get(url, {
    params: { page, per_page },
  });

  return mapPlaylistListResponse(res.data);
};

export const createPlaylist = async (payload) => {
  const res = await axiosInstanceNew.post("/play-list/create", payload);
  return normalizePlaylist(res?.data?.data ?? res?.data ?? {});
};

export const addVideoToPlaylist = async ({ playlistId, videoId }) => {
  const res = await axiosInstanceNew.post(`/play-list/add/${playlistId}/${videoId}`);
  return mapPlaylistDetailResponse(res.data);
};

export const removeVideoFromPlaylist = async ({ playlistId, videoId }) => {
  try {
    const res = await axiosInstanceNew.delete(`/play-list/remove/${playlistId}/${videoId}`);
    return mapPlaylistDetailResponse(res.data);
  } catch (error) {
    if (error?.response?.status !== 405) {
      throw error;
    }

    const res = await axiosInstanceNew.post(`/play-list/remove/${playlistId}/${videoId}`);
    return mapPlaylistDetailResponse(res.data);
  }
};

export const getPlaylistDetail = async (playlistId, { page = 1, per_page = 25 } = {}) => {
  const res = await axiosInstanceNew.get(`/play-list/show/${playlistId}`, {
    params: { page, per_page },
  });

  /** @type {PlaylistDetailResponse} */
  return mapPlaylistDetailResponse(res.data);
};
