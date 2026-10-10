import axiosInstanceNew from "../../utils/axiosConfigNew";
import {
  getAllPaginatedItems,
  normalizePage,
  normalizePaginatedResponse,
} from "../../utils/pagination";

export const getCategories = async (page = 1) => {
  const res = await axiosInstanceNew.get("/categories", {
    params: { page: normalizePage(page) },
  });
  return normalizePaginatedResponse(res.data);
};

export const getAllCategories = () => getAllPaginatedItems(getCategories);

export const createCategory = async (payload) => {
  const res = await axiosInstanceNew.post("/categories", payload);
  return res.data;
};

export const updateCategory = async (id, payload) => {
  const res = await axiosInstanceNew.put(`/categories/${id}`, payload);
  return res.data;
};
