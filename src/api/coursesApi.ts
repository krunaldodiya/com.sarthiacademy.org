import {axiosInstance} from '../libs/httpClient';

export const coursesApi = async () => {
  const {data} = await axiosInstance({
    url: '/courses/all',
    method: 'GET',
  });

  return data.courses;
};
