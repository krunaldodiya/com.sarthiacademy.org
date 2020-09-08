import {axiosInstance} from '../libs/httpClient';

export const updateSubscriptionApi = async (payload: any) => {
  const {data} = await axiosInstance({
    url: '/subscriptions/update',
    method: 'POST',
    data: payload,
  });

  return data;
};
