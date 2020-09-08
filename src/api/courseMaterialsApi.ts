import {axiosInstance} from '../libs/httpClient';

export const courseMaterialsApi = async (key: any, course_id: any) => {
  const {data} = await axiosInstance({
    url: '/courses/materials',
    method: 'GET',
    params: {
      course_id,
    },
  });

  return data.subjects;
};
