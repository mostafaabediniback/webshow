import axiosInstanceNew from "../../utils/axiosConfigNew";

// export const getPlaylists = async (channelId) => {
//   if (!channelId) return [];
//   const res = await axiosInstanceNew.get(`/play-list/index/${channelId}`);
//   return Array.isArray(res?.data?.data) ? res.data.data : (Array.isArray(res?.data) ? res.data : []);
// };
export const getPlaylists = async (channelId) => {
  try {
    const url = channelId
      ? `/play-list/index/${channelId}`
      : `/play-list/index`; // 👈 حالت بدون ID

    const res = await axiosInstanceNew.get(url);

    const data = res?.data?.data ?? res?.data;

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("getPlaylists error:", error);
    return []; // 👈 UI نمی‌ترکه
  }
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
