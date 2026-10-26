import axiosInstanceNew from '../utils/axiosConfigNew'

// دریافت اطلاعات کاربر
export const getMyProfile = async () => {
  const res = await axiosInstanceNew.get('/user/me')
  return res.data
}

// آپدیت اطلاعات کاربر
export const updateMyProfile = async (payload) => {
  const res = await axiosInstanceNew.put('/user/me', payload)
  return res.data
}

// تغییر رمز عبور
export const updateMyPassword = async (payload) => {
  const res = await axiosInstanceNew.put('/user/me-update-pass', payload)
  return res.data
}