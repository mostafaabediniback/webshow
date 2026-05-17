import axiosInstanceNew from "../../utils/axiosConfigNew";

export const getCategories = async () => {
  const res = await axiosInstanceNew.get("/categories");
  return Array.isArray(res?.data?.data) ? res.data.data : (Array.isArray(res?.data) ? res.data : []);
};

export const createCategory = async (payload) => {
  const res = await axiosInstanceNew.post("/categories", payload);
  return res.data;
};

export const updateCategory = async (id, payload) => {
  const res = await axiosInstanceNew.put(`/categories/${id}`, payload);
  return res.data;
};
