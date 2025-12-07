import axiosInstanceNew from "../utils/axiosConfigNew";

export const getChannels = async () => {
  const res = await axiosInstanceNew.get("/channel", {});
  return res.data || [];
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
  const res = await axiosInstanceNew.put(`/channel/${id}`, payload, {});
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
