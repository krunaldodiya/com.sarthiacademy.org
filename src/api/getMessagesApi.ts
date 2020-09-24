import {axiosInstance} from '../libs/httpClient';

export const getMessagesApi = async (key: any, channel_id: any) => {
  const {data} = await axiosInstance({
    url: '/messages',
    method: 'GET',
    params: {
      channel_id,
    },
  });

  return data.messages;
};
