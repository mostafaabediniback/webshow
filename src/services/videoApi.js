import axiosInstanceNew from "../utils/axiosConfigNew";

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstanceNew.post("/video/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // response: {status: "completed", temp_path: "temp/693d1046f421f.avi"}
  return res.data;
};

export const storeVideo = async (channelId, { path, title, description, cover }) => {
  const formData = new FormData();
  formData.append("path", path);
  formData.append("title", title);
  // description required است طبق OpenAPI
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

export const getVideosByChannel = async (channelId) => {
  const res = await axiosInstanceNew.get(`/video/${channelId}`);
  return res.data?.data || [];
};

export const getVideoDetail = async (videoId) => {
  const res = await axiosInstanceNew.get(`/video/show/${videoId}`);
  return res.data;
};

export const getAllVideos = async (pageNumber = 1, pageSize = 25) => {
  const res = await axiosInstanceNew.get("/video", {
    params: { page: pageNumber, per_page: pageSize },
  });
  return res.data?.data || [];
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
  deleteVideo,
};
