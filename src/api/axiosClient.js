// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosClient;
