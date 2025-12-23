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
  const res = await axiosInstanceNew.post(
    "/channel/create",
    { ...payload, user_id },
    {}
  );
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
  await axiosInstanceNew.delete(`/channel/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return true;
};

export const getChannelById = async (id) => {
  const res = await axiosInstanceNew.get(`/channel/${id}`);
  return res.data;
};
