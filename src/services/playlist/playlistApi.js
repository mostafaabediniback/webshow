import axiosInstanceNew from "../../utils/axiosConfigNew";
import { QueryKeys } from "../../enums";
import { normalizePage, normalizePaginatedResponse } from "../../utils/pagination";

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

const mapPlaylistListResponse = (payload) => {
  const paginated = normalizePaginatedResponse(payload);
  const items = paginated.items.map(normalizePlaylist);

  /** @type {PlaylistListResponse} */
  return {
    items,
    meta: paginated.meta,
    links: paginated.links,
    totalItems: paginated.totalItems,
    totalPages: paginated.totalPages,
  };
};

const mapPlaylistDetailResponse = (payload) => {
  const root = payload?.data ?? payload ?? {};
  const playlist = root?.play_list ?? root?.playlist ?? root?.data?.play_list ?? null;
  const nestedVideos = Array.isArray(root?.data?.videos)
    ? root.data.videos
    : Array.isArray(root?.videos)
      ? root.videos
      : null;
  const paginated = normalizePaginatedResponse(payload, nestedVideos ?? undefined);

  return {
    playlist: playlist ? normalizePlaylist(playlist) : null,
    items: paginated.items,
    meta: paginated.meta,
    totalPages: paginated.totalPages,
    totalItems: paginated.totalItems,
  };
};

export const getPlaylists = async (channelId, pagination) => {
  const url = channelId
    ? `/play-list/index/${channelId}`
    : `/play-list/index`;

  const config = {
    params: {
      page: normalizePage(pagination?.page),
    },
  };

  const res = await axiosInstanceNew.get(url, config);

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
    const res = await axiosInstanceNew.post(`/play-list/remove/${playlistId}/${videoId}`);
    return mapPlaylistDetailResponse(res.data);
  } catch (error) {
    if (error?.response?.status !== 405) {
      throw error;
    }

    const res = await axiosInstanceNew.post(`/play-list/remove/${playlistId}/${videoId}`);
    return mapPlaylistDetailResponse(res.data);
  }
};

export const getPlaylistDetail = async (playlistId, { page = 1 } = {}) => {
  const res = await axiosInstanceNew.get(`/play-list/show/${playlistId}`, {
    params: { page: normalizePage(page) },
  });

  /** @type {PlaylistDetailResponse} */
  return mapPlaylistDetailResponse(res.data);
};
