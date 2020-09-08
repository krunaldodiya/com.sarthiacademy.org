import {axiosInstance} from '../libs/httpClient';

export const markAsRead = async (payload: {mobile: string}) => {
  const {data} = await axiosInstance({
    url: '/notifications/read',
    method: 'POST',
    data: payload,
  });

  return data;
};
