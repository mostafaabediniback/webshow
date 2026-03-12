import axiosInstanceNew from '../utils/axiosConfigNew'

export const createAttachUser = async (payload) => {
  const res = await axiosInstanceNew.post('/channel/create-attach-user', payload)
  return res.data
}

export const searchUserByPhone = async (phoneNumber) => {
  const res = await axiosInstanceNew.get(`/user/search/${encodeURIComponent(phoneNumber)}`)
  return res.data
}
