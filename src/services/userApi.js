import axiosInstanceNew from '../utils/axiosConfigNew'

export const createAttachUser = async (payload) => {
  const res = await axiosInstanceNew.post('/channel/create-attach-user', payload)
  return res.data
}

// export const searchUserByPhone = async (phoneNumber) => {
//   const res = await axiosInstanceNew.get(`/user/search/${encodeURIComponent(phoneNumber)}`)
//   return res.data
// }
export const getUsersByPhone = async (phoneNumber = '') => {
  const url = phoneNumber
    ? `/user/search/${encodeURIComponent(phoneNumber)}`
    : `/user/search`

  const res = await axiosInstanceNew.get(url)

  return res.data
}

export const searchUserByPhone = getUsersByPhone

export const updateUser = async (payload) => {
  const res = await axiosInstanceNew.put('/user/update', payload)
  return res.data
}

export const deleteUser = async (userId) => {
  const res = await axiosInstanceNew.delete(`/user/delete/${userId}`)
  return res.data
}

export const updateUserPassword = async (payload) => {
  const res = await axiosInstanceNew.put('/user/update-password', payload)
  return res.data
}
