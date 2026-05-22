import axiosInstanceNew from "../utils/axiosConfigNew";

/**
 * @typedef {"all" | "published" | "private"} VideoType
 */
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

const buildVideoListParams = ({ page = 1, per_page = 25, videoType = "all" } = {}) => {
  const params = {
    page,
    per_page,
  };

  if (videoType) {
    params.videoType = videoType;
  }

  return params;
};

const appendArrayField = (formData, fieldName, values = []) => {
  if (!Array.isArray(values)) return;

  values
    .filter((value) => value !== "" && value !== null && typeof value !== "undefined")
    .forEach((value) => {
      formData.append(fieldName, value);
    });
};

export const getVideoPlaylistIds = (video = {}) => {
  const rawSources = [
    video?.play_lists,
    video?.playlists,
    video?.playlist_ids,
    video?.play_list_ids,
    video?.data?.play_lists,
    video?.data?.playlists,
  ];

  for (const source of rawSources) {
    if (!Array.isArray(source)) continue;

    return source
      .map((item) => (typeof item === "object" ? item?.id ?? item?.playlist_id : item))
      .filter((item) => item !== null && typeof item !== "undefined" && item !== "")
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item));
  }

  return [];
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
export const storeVideo = async (
  channelId,
  { path, url, title, description, cover, public_show, categories = [], play_lists = [] }
) => {
  const fd = new FormData();

  // یکی از این دو باید ارسال بشه
  if (path) fd.append("path", path);
  if (url) fd.append("url", url);

  fd.append("title", title);
  fd.append("description", description || "");

  // public_show (0 یا 1)
  fd.append("public_show", public_show ? 1 : 0);

  if (cover) fd.append("cover", cover);
  appendArrayField(fd, "categories[]", categories);
  appendArrayField(fd, "play_lists[]", play_lists);

  const finalUrl = channelId
    ? `/video/store-video/${channelId}`
    : "/video/store-video";

  const res = await axiosInstanceNew.post(finalUrl, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getVideosByChannel = async (
  channelId,
  page = 1,
  per_page = 25,
  videoType = "all",
) => {
  const res = await axiosInstanceNew.get(`/video/${channelId}`, {
    params: buildVideoListParams({ page, per_page, videoType }),
  });
  return mapPaginatedResponse(res.data);
};

export const getVideoDetail = async (id) => {
  const res = await axiosInstanceNew.get(`/video/show/${id}`);
  return res.data;
};

export const getAllVideos = async (page = 1, per_page = 25, videoType = "all") => {
  const res = await axiosInstanceNew.get("/video", {
    params: buildVideoListParams({ page, per_page, videoType }),
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

export const updateVideo = async (
  videoId,
  { title, description, coverFile, public_show, play_lists = [] },
) => {
  const fd = new FormData();
  fd.append("title", title || "");
  fd.append("description", description || "");
  fd.append("public_show", public_show ?? 1);
  appendArrayField(fd, "play_lists[]", play_lists);


  if (coverFile) {
    fd.append("cover", coverFile);
  }

  const res = await axiosInstanceNew.post(`/video/update-video/${videoId}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

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
  updateVideo,
  getLandingVideos,
  getLandingChannels
};
