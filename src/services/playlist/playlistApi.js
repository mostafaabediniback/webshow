import axiosInstanceNew from "../../utils/axiosConfigNew";

/**
 * @typedef {Object} PlaylistSummary
 * @property {number|string} id
 * @property {string} [name]
 * @property {boolean|number} [is_public]
 * @property {number} [videos_count]
 */

/**
 * @typedef {Object} PlaylistVideo
 * @property {number|string} id
 * @property {string} [title]
 * @property {string} [channel_name]
 * @property {string} [username]
 * @property {string} [cover_link]
 * @property {number} [view_count]
 * @property {number|string} [duration]
 * @property {number|string} [order]
 * @property {{ order?: number|string }} [pivot]
 */

/**
 * @typedef {Object} PlaylistDetailResponse
 * @property {PlaylistSummary | null} playlist
 * @property {PlaylistVideo[]} items
 * @property {Object} meta
 * @property {number} totalPages
 * @property {number} totalItems
 */

const mapPlaylistDetailResponse = (payload) => {
  const root = payload?.data ?? payload ?? {};
  const playlist = root?.data?.play_list ?? root?.play_list ?? null;
  const videos = Array.isArray(root?.data?.videos)
    ? root.data.videos
    : Array.isArray(root?.videos)
      ? root.videos
      : [];

  const meta = root?.meta ?? {};
  const totalPages = Number(meta?.last_page || 1) || 1;
  const totalItems = Number(meta?.total || videos.length) || videos.length;

  return {
    playlist,
    items: videos,
    meta,
    totalPages,
    totalItems,
  };
};

// export const getPlaylists = async (channelId) => {
//   if (!channelId) return [];
//   const res = await axiosInstanceNew.get(`/play-list/index/${channelId}`);
//   return Array.isArray(res?.data?.data) ? res.data.data : (Array.isArray(res?.data) ? res.data : []);
// };
export const getPlaylists = async (channelId) => {
  const url = channelId
    ? `/play-list/index/${channelId}`
    : `/play-list/index`;

  const res = await axiosInstanceNew.get(url);
  const data = res?.data?.data ?? res?.data;

  return Array.isArray(data) ? data : [];
};

export const createPlaylist = async (payload) => {
  const res = await axiosInstanceNew.post("/play-list/create", payload);
  return res.data;
};

export const addVideoToPlaylist = async ({ playlistId, videoId }) => {
  const res = await axiosInstanceNew.post(`/play-list/add/${playlistId}/${videoId}`);
  return res.data;
};

export const removeVideoFromPlaylist = async ({ playlistId, videoId }) => {
  const res = await axiosInstanceNew.post(`/play-list/remove/${playlistId}/${videoId}`);
  return res.data;
};

export const getPlaylistDetail = async (playlistId, { page = 1, per_page = 25 } = {}) => {
  const res = await axiosInstanceNew.get(`/play-list/show/${playlistId}`, {
    params: { page, per_page },
  });

  /** @type {PlaylistDetailResponse} */
  return mapPlaylistDetailResponse(res.data);
};
