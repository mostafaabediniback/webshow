import axiosInstanceNew from "../utils/axiosConfigNew";

export const getChannels = async (pageNumber = 1, pageSize = 25) => {
  const res = await axiosInstanceNew.get("/channel", {
    params: { page: pageNumber, per_page: pageSize },
  });
  return res.data?.data || [];
};

export const createChannel = async (payload) => {
  const uidRaw =
    typeof window !== "undefined" ? sessionStorage.getItem("user_id") : null;

  const user_id = uidRaw ? Number(uidRaw) : undefined;

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
  const uidRaw =
    typeof window !== "undefined" ? sessionStorage.getItem("user_id") : null;
  const user_id = uidRaw ? Number(uidRaw) : undefined;
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
  const url = id
    ? `/channel/show/${id}`
    : `/channel/show`;

  const res = await axiosInstanceNew.get(url);
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
