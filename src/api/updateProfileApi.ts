import {axiosInstance} from '../libs/httpClient';

export const updateProfileApi = async (payload: {mobile: string}) => {
  const {data} = await axiosInstance({
    url: '/users/update',
    method: 'POST',
    data: payload,
  });

  return data;
};
