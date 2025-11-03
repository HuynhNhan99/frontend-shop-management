import axiosClient from './axiosClient'

const productApi = {
  getAll: () => axiosClient.get('/api/products'),
  add: (payload) => axiosClient.post('/api/products', payload),
  update: (id, payload) => axiosClient.put(`/api/products/${id}`, payload),
  remove: (id) => axiosClient.delete(`/api/products/${id}`)
}

export default productApi

