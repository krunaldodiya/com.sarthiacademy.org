import {axiosInstance} from '../libs/httpClient';

export const setDeviceTokenApi = async (payload: any) => {
  const {data} = await axiosInstance({
    url: '/users/token',
    method: 'POST',
    data: payload,
  });

  return data;
};
