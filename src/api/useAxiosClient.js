// useAxiosClient.js
import { useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import useAuth from '../hooks/useAuth';
import { useLoading } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom';

export const useAxiosClient = () => {
  const { auth, setAuth, logout } = useAuth();
  const { setLoading } = useLoading(); // dùng loading chung
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        setLoading(true);
        if (!config.headers['Authorization'] && auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosClient.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      async (error) => {
        setLoading(false);
        const originalRequest = error.config;

        if (originalRequest.url.includes('/auth/refresh')) return Promise.reject(error);
        debugger
        if ([401, 403].includes(error?.response?.status) && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshRes = await axiosClient.post('/auth/refresh');
            const newAccessToken = refreshRes.data.accessToken;
            setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosClient(originalRequest);
          } catch (err) {
            logout();
            navigate('/login');
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.accessToken, setAuth, logout, setLoading]);

  return axiosClient;
};
