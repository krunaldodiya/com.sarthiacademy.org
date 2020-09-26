import {axiosInstance} from '../libs/httpClient';

export const getQualityByIds = async (key: any, quality_ids: any) => {
  const {data} = await axiosInstance({
    url: '/courses/quality',
    method: 'GET',
    params: {
      quality_ids,
    },
  });

  return data.qualities;
};
