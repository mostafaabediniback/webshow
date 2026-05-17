import axiosInstanceNew from "../../utils/axiosConfigNew";

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

export const getCategories = async () => {
  const res = await axiosInstanceNew.get("/api/categories");
  return toList(res.data);
};

export const createCategory = async ({ title, can_have_audio }) => {
  const res = await axiosInstanceNew.post("/api/categories", {
    title,
    can_have_audio,
  });
  return res?.data?.data ?? res?.data;
};
