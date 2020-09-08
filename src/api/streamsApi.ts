import {axiosInstance} from '../libs/httpClient';

export const streamsApi = async (key: any, course_id: any) => {
  const {data} = await axiosInstance({
    url: '/courses/streams',
    method: 'GET',
    params: {
      course_id,
    },
  });

  return data.streams;
};
