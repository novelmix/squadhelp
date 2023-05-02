import axios from 'axios';
import CONTANTS from '../constants';
import { logOut, refreshUser } from './rest/restController';

const instance = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.tokens) {
      const { accessToken, refreshToken } = response.data.tokens;
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refreshToken);
    }
    return response;
  },
  (err) => {
    if (err.response.status === 403)
      return refreshUser().then(() => instance(err.config));
    if (err.response.status === 401) {
      logOut();
    }
    return Promise.reject(err);
  }
);

export default instance;
