import axiosInstanceNew from "../utils/axiosConfigNew";

export const completeUserDataService = async ({ token, ...data }) => {
  const config = {};
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
  }
  const response = await axiosInstanceNew.put("/user/complete-data", data, config);
  return response.data;
};
