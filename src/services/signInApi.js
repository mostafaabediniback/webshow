import axiosInstanceNew from "../utils/axiosConfigNew";

// POST
export const signIn = async (data) => {
  const response = await axiosInstanceNew.post("/auth/login", data);
  return response.data;
};

// POST
export const signOut = async () => {
  const response = await axiosInstanceNew.post("/auth/logout");
  return response.data;
};


