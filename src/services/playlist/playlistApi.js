import axiosInstanceNew from "../../utils/axiosConfigNew";

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

export const createPlaylist = async ({ name, is_public }) => {
  const res = await axiosInstanceNew.post("/api/play-list/create", { name, is_public });
  return res?.data?.data ?? res?.data;
};

export const getChannelPlaylists = async ({ channelId }) => {
  const url = channelId ? `/api/play-list/index/${channelId}` : "/api/play-list/index";
  const res = await axiosInstanceNew.get(url);
  return toList(res.data);
};

export const addVideoToPlaylist = async ({ playlist_id, video_id }) => {
  const res = await axiosInstanceNew.post(`/api/play-list/add/${playlist_id}/${video_id}`);
  return res?.data?.data ?? res?.data;
};

export const removeVideoFromPlaylist = async ({ playlist_id, video_id }) => {
  const res = await axiosInstanceNew.post(`/api/play-list/remove/${playlist_id}/${video_id}`);
  return res?.data?.data ?? res?.data;
};
