import axiosInstanceNew from "../../utils/axiosConfigNew";

export const createPlaylist = async ({ name, is_public }) => {
  const res = await axiosInstanceNew.post("/playlist/store", { name, is_public });
  return res?.data?.data ?? res?.data;
};

export const getPlaylistDetails = async (playlistId) => {
  const res = await axiosInstanceNew.get(`/playlist/${playlistId}`);
  return res?.data?.data ?? res?.data;
};

export const getChannelPlaylists = async (channelId) => {
  const res = await axiosInstanceNew.get("/playlist", { params: { channel_id: channelId } });
  const raw = res?.data?.data ?? res?.data;
  return Array.isArray(raw) ? raw : [];
};

export const addVideoToPlaylist = async ({ playlist_id, video_id }) => {
  const res = await axiosInstanceNew.post("/playlist/add-video", { playlist_id, video_id });
  return res?.data?.data ?? res?.data;
};

export const removeVideoFromPlaylist = async ({ playlist_id, video_id }) => {
  const res = await axiosInstanceNew.post("/playlist/remove-video", { playlist_id, video_id });
  return res?.data?.data ?? res?.data;
};

