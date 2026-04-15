import axiosInstanceNew from "../utils/axiosConfigNew";
// کمک برای صفحه‌بندی
const mapPaginatedResponse = (data) => {
  const items =
    Array.isArray(data?.data) ? data.data :
<<<<<<< HEAD
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
=======
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
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad

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

<<<<<<< HEAD
export const getLandingChannels = async ({
  pageNumber = 1,
  pageSize = 10
} = {}) => {
  const page = Number(pageNumber) || 1;
  const perPage = Number(pageSize) || 10;


=======
export const getLandingChannels = async ({ 
  pageNumber = 1, 
  pageSize = 10 
} = {}) => {
  const page = Number(pageNumber) || 1;
  const perPage = Number(pageSize) || 10;
  
  
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });
<<<<<<< HEAD

  const queryString = params.toString();

=======
  
  const queryString = params.toString();
  
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  const res = await axiosInstanceNew.get(`/landing/channels?${queryString}`);
  return mapPaginatedResponse(res.data);
};

<<<<<<< HEAD
export const getLandingVideos = async ({
  channelId,
  pageNumber = 1,
  pageSize = 25
=======
export const getLandingVideos = async ({ 
  channelId, 
  pageNumber = 1, 
  pageSize = 25 
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
} = {}) => {
  const params = new URLSearchParams({
    page: pageNumber,
    per_page: pageSize,
  });
<<<<<<< HEAD

=======
  
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  if (channelId) {
    params.append('channel_id', channelId);
  }

  const url = `/landing/videos?${params}`;
  const res = await axiosInstanceNew.get(url);
<<<<<<< HEAD

=======
  
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  // استفاده از mapPaginatedResponse موجود
  return mapPaginatedResponse(res.data);
};

export const getSearch = async (q) => {
  const res = await axiosInstanceNew.get(`/search/${encodeURIComponent(q)}`);
  return res.data;
};

export const deleteVideo = async (id) => {
  const res = await axiosInstanceNew.delete(`/video/delete/${id}`);
<<<<<<< HEAD
  return res.data;
};

export const updateVideo = async (videoId, { title, description, coverFile, public_show }) => {
  const fd = new FormData();
  fd.append("title", title || "");
  fd.append("description", description || "");
  fd.append("public_show", public_show ?? 1);


  if (coverFile) {
    fd.append("cover", coverFile);
  }

  const res = await axiosInstanceNew.post(`/video/update-video/${videoId}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
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
<<<<<<< HEAD
  updateVideo,
=======
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
  getLandingVideos,
  getLandingChannels
};
