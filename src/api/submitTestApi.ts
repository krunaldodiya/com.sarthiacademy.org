import {axiosInstance} from '../libs/httpClient';

export const submitTestApi = async (payload: any) => {
  const {data} = await axiosInstance({
    url: '/tests/submit',
    method: 'POST',
    data: payload,
  });

  return data.test;
};
