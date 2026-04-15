import axiosInstanceNew from "../utils/axiosConfigNew";
import { readAuthSession } from "../utils/auth";

export const getChannels = async (pageNumber = 1, pageSize = 25) => {
  const res = await axiosInstanceNew.get("/channel", {
    params: { page: pageNumber, per_page: pageSize },
  });
  return res.data?.data || [];
};

export const createChannel = async (payload) => {
  const { userId } = readAuthSession();
  const user_id = userId ? Number(userId) : undefined;

  const formData = new FormData();

  formData.append("name", payload?.name || "");
  formData.append("slug", payload?.slug || ""); // ✅ مهم

  if (typeof user_id !== "undefined") {
    formData.append("user_id", String(user_id));
  }

  if (payload?.image) {
    formData.append("image", payload.image);
  }

  const res = await axiosInstanceNew.post("/channel/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateChannel = async (id, payload) => {
  const { userId } = readAuthSession();
  const user_id = userId ? Number(userId) : undefined;
  const res = await axiosInstanceNew.put(`/channel/update/${id}`, {
    ...payload,
    user_id,
  }, {});
  return res.data;
};

export const deleteChannel = async (id) => {
  await axiosInstanceNew.delete(`/channel/delete/${id}`);
  return true;
};

export const getChannelById = async (id) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  const url = id
    ? `/channel/show/${id}`
    : `/channel/show`;

  const res = await axiosInstanceNew.get(url);
<<<<<<< HEAD
=======
  const res = await axiosInstanceNew.get(`/channel/show/${id}`);
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  return res.data;
};

export const changeChannelImage = async (id, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const url = id
    ? `/channel/change-image/${id}`
    : `/channel/change-image`;

  const res = await axiosInstanceNew.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const changeProfileChannelImage = async (id, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const url = id
    ? `/channel/change-background/${id}`
    : `/channel/change-background`;

  const res = await axiosInstanceNew.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateChannelInfo = async (channelId, payload) => {
  const url = channelId
    ? `/channel/update-info/${channelId}`
    : `/channel/update-info`;

  const res = await axiosInstanceNew.put(url, payload);
  return res.data;
};
