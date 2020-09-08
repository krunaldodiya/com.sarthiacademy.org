import {axiosInstance} from '../libs/httpClient';

export const sendFeedbackApi = async (payload: any) => {
  const {data} = await axiosInstance({
    url: '/feedback/send',
    method: 'POST',
    data: payload,
  });

  return data;
};
