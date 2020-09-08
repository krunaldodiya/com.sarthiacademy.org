import {axiosInstance} from '../libs/httpClient';

export const authUserApi = async () => {
  const {data} = await axiosInstance({
    url: '/users/me',
    method: 'GET',
  });

  return data.user;
};
