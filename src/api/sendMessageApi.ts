import {axiosInstance} from '../libs/httpClient';

export const sendMessageApi = async (payload: {
  message: string;
  channel_id: string;
}) => {
  const {data} = await axiosInstance({
    url: '/messages/send',
    method: 'POST',
    data: payload,
  });

  return data.message;
};
