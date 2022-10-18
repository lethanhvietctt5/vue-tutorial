import axios, { type AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response: AxiosResponse) {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    } as AxiosResponse<any, any>;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
