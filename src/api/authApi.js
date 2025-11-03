import axiosClient from './axiosClient'

const authApi = {
  login: (payload) => axiosClient.post('/auth/login', payload),
  register: (payload) => axiosClient.post('/auth/register', payload),
  logout: () => axiosClient.post('/auth/logout'),
  user: () => axiosClient.get('/auth/user'), // optional, backend must implement
  refresh: () => axiosClient.post('/auth/refresh',{}, { withCredentials: true })
}

export default authApi
