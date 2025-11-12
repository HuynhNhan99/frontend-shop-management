import { useAxiosClient } from '../api/useAxiosClient';
import { useLoading } from '../context/LoadingContext';

export const useApi = () => {
  const axios = useAxiosClient();
  const { setLoading } = useLoading();

  // helper chung để gọi API
  const callApi = async (apiFunc) => {
    setLoading(true);
    try {
      const response = await apiFunc();
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // -------- Auth APIs --------
  const auth = {
    login: (payload) => callApi(() => axios.post('/auth/login', payload)),
    register: (payload) => callApi(() => axios.post('/auth/register', payload)),
    logout: () => callApi(() => axios.post('/auth/logout')),
    user: () => callApi(() => axios.get('/auth/user')),
    refresh: () => callApi(() => axios.post('/auth/refresh')),
  };

  // -------- Product APIs --------
  const product = {
    getAll: () => callApi(() => axios.get('/api/products')),
    add: (payload) => callApi(() => axios.post('/api/products', payload)),
    update: (id, payload) => callApi(() => axios.put(`/api/products/${id}`, payload)),
    remove: (id) => callApi(() => axios.delete(`/api/products/${id}`)),
  };

  return { auth, product };
};
