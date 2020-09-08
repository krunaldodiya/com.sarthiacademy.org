import {axiosInstance} from '../libs/httpClient';

export const attachmentsApi = async (key: any, course_id: any) => {
  const {data} = await axiosInstance({
    url: '/courses/attachments',
    method: 'GET',
    params: {
      course_id,
    },
  });

  return data.attachments;
};
