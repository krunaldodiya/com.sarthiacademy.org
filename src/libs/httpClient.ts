import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {apiUrl} from '../libs/vars';

let axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    config.headers = {
      Authorization: token ? `Bearer ${token}` : null,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => Promise.reject(error),
);

export {axiosInstance};
