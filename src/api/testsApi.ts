import {axiosInstance} from '../libs/httpClient';

export const testsApi = async (key: any, course_id: any, date: any) => {
  const {data} = await axiosInstance({
    url: '/courses/tests',
    method: 'GET',
    params: {
      course_id,
      date,
    },
  });

  return data.tests;
};
