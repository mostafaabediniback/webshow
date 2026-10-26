import axiosInstanceNew from "../utils/axiosConfigNew";

export const otpCheckService = async (data) => {
  const response = await axiosInstanceNew.post("/otp/check", data);
  return response.data;
};
