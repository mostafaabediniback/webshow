import axiosInstanceNew from "../../utils/axiosConfigNew";

export const getPlaylists = async (channelId) => {
  if (!channelId) return [];
  const res = await axiosInstanceNew.get(`/api/play-list/index/${channelId}`);
  return Array.isArray(res?.data?.data) ? res.data.data : (Array.isArray(res?.data) ? res.data : []);
};

export const createPlaylist = async (payload) => {
  const res = await axiosInstanceNew.post("/api/play-list/create", payload);
  return res.data;
};

export const addVideoToPlaylist = async ({ playlistId, videoId }) => {
  const res = await axiosInstanceNew.post(`/api/play-list/add/${playlistId}/${videoId}`);
  return res.data;
};

export const removeVideoFromPlaylist = async ({ playlistId, videoId }) => {
  const res = await axiosInstanceNew.post(`/api/play-list/remove/${playlistId}/${videoId}`);
  return res.data;
};
