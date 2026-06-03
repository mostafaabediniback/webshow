import axiosInstanceNew from "../utils/axiosConfigNew";

export const otpSendService = async (data) => {
  const response = await axiosInstanceNew.post("/otp/send", data);
  return response.data;
};
