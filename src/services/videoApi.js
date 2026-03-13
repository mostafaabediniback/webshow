import axiosInstanceNew from "../utils/axiosConfigNew";

const mapPaginatedResponse = (resData) => {
  const items = Array.isArray(resData?.data)
    ? resData.data
    : Array.isArray(resData?.data?.data)
      ? resData.data.data
      : [];

  const totalPages =
    Number(
      resData?.last_page ||
      resData?.meta?.last_page ||
      resData?.pagination?.last_page ||
      1
    ) || 1;

  const totalItems =
    Number(
      resData?.total ||
      resData?.meta?.total ||
      items.length
    ) || items.length;

  return {
    items,
    totalPages,
    totalItems,
  };
};

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstanceNew.post("/video/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const storeVideo = async (channelId, { path, title, description, cover }) => {
  const formData = new FormData();
  formData.append("path", path);
  formData.append("title", title);
  formData.append("description", description || "");
  if (cover) {
    formData.append("cover", cover);
  }
  const res = await axiosInstanceNew.post(`/video/${channelId}/store-video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getVideosByChannel = async (channelId, pageNumber = 1, pageSize = 25) => {
  const res = await axiosInstanceNew.get(`/video/${channelId}`, {
    params: { page: pageNumber, per_page: pageSize },
  });
  return mapPaginatedResponse(res.data);
};

export const getVideoDetail = async (videoId) => {
  const res = await axiosInstanceNew.get(`/video/show/${videoId}`);
  return res.data;
};

export const getAllVideos = async (pageNumber = 1, pageSize = 25) => {
  const res = await axiosInstanceNew.get("/video", {
    params: { page: pageNumber, per_page: pageSize },
  });
  return mapPaginatedResponse(res.data);
};

export const getLanding = async (channelId) => {
  const url = channelId ? `/landing/${channelId}` : "/landing";
  const res = await axiosInstanceNew.get(url);
  return res.data?.data || {};
};

export const getSearch = async (q) => {
  const res = await axiosInstanceNew.get(`/search/${encodeURIComponent(q)}`);
  return res.data;
};

export const deleteVideo = async (videoId) => {
  const res = await axiosInstanceNew.delete(`/video/delete/${videoId}`);
  return res.data;
};

export default {
  uploadVideo,
  storeVideo,
  getVideosByChannel,
  getVideoDetail,
  getAllVideos,
  getLanding,
  getSearch,
  deleteVideo,
};
