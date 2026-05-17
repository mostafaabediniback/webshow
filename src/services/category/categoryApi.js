import axiosInstanceNew from "../../utils/axiosConfigNew";

export const getCategories = async () => {
  const res = await axiosInstanceNew.get("/category");
  const raw = res?.data?.data ?? res?.data;
  return Array.isArray(raw) ? raw : [];
};

export const createCategory = async ({ name }) => {
  const res = await axiosInstanceNew.post("/category/store", { name });
  return res?.data?.data ?? res?.data;
};

