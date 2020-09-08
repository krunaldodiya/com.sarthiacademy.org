import {axiosInstance} from '../libs/httpClient';

export const notificationsApi = async (payload: any) => {
  const {data} = await axiosInstance({
    url: '/notifications/all',
    method: 'GET',
  });

  return data.notifications;
};
