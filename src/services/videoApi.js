import axiosInstanceNew from "../utils/axiosConfigNew";
// کمک برای صفحه‌بندی
const mapPaginatedResponse = (data) => {
  const items =
    Array.isArray(data?.data) ? data.data :
    Array.isArray(data?.data?.data) ? data.data.data :
    [];

  const totalPages =
    Number(data?.last_page ||
           data?.meta?.last_page ||
           data?.pagination?.last_page ||
           1) || 1;

  const totalItems =
    Number(data?.total ||
           data?.meta?.total ||
           items.length) || items.length;

  return { items, totalPages, totalItems };
};


export const uploadVideo = async (file) => {
  const fd = new FormData();
  fd.append("file", file);

  const res = await axiosInstanceNew.post("/video/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return res.data;
};

// ذخیره ویدیو
export const storeVideo = async (channelId, { path, title, description, cover }) => {
  const fd = new FormData();
  fd.append("path", path);
  fd.append("title", title);
  fd.append("description", description || "");

  if (cover) fd.append("cover", cover);

  const url = channelId
    ? `/video/store-video/${channelId}`
    : "/video/store-video";

  const res = await axiosInstanceNew.post(url, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getVideosByChannel = async (channelId, page = 1, per_page = 25) => {
  const res = await axiosInstanceNew.get(`/video/${channelId}`, {
    params: { page, per_page }
  });
  return mapPaginatedResponse(res.data);
};

export const getVideoDetail = async (id) => {
  const res = await axiosInstanceNew.get(`/video/show/${id}`);
  return res.data;
};

export const getAllVideos = async (page = 1, per_page = 25) => {
  const res = await axiosInstanceNew.get("/video", {
    params: { page, per_page }
  });
  return mapPaginatedResponse(res.data);
};

export const getLandingChannels = async ({ 
  pageNumber = 1, 
  pageSize = 10 
} = {}) => {
  const page = Number(pageNumber) || 1;
  const perPage = Number(pageSize) || 10;
  
  
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });
  
  const queryString = params.toString();
  
  const res = await axiosInstanceNew.get(`/landing/channels?${queryString}`);
  return mapPaginatedResponse(res.data);
};

export const getLandingVideos = async ({ 
  channelId, 
  pageNumber = 1, 
  pageSize = 25 
} = {}) => {
  const params = new URLSearchParams({
    page: pageNumber,
    per_page: pageSize,
  });
  
  if (channelId) {
    params.append('channel_id', channelId);
  }

  const url = `/landing/videos?${params}`;
  const res = await axiosInstanceNew.get(url);
  
  // استفاده از mapPaginatedResponse موجود
  return mapPaginatedResponse(res.data);
};

export const getSearch = async (q) => {
  const res = await axiosInstanceNew.get(`/search/${encodeURIComponent(q)}`);
  return res.data;
};

export const deleteVideo = async (id) => {
  const res = await axiosInstanceNew.delete(`/video/delete/${id}`);
  return res.data;
};

export default {
  uploadVideo,
  storeVideo,
  getVideosByChannel,
  getVideoDetail,
  getAllVideos,
  // getLanding,
  getSearch,
  deleteVideo,
  getLandingVideos,
  getLandingChannels
};
