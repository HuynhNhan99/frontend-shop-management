import axiosClient from './axiosClient'

const authApi = {
  login: (payload) => axiosClient.post('/auth/login', payload, { withCredentials: true }),
  register: (payload) => axiosClient.post('/auth/register', payload, { withCredentials: true }),
  logout: () => axiosClient.post('/auth/logout', {}, { withCredentials: true }),
  user: () => axiosClient.get('/auth/user', { withCredentials: true }),
  refresh: () => axiosClient.post('/auth/refresh', {}, { withCredentials: true })
}

export default authApi
