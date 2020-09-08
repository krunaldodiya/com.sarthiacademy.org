import {axiosInstance} from '../libs/httpClient';

export const verifyOtpApi = async (payload: any) => {
  const {data} = await axiosInstance({
    url: '/otp/verify',
    method: 'POST',
    data: {...payload, country_id: 'e1c417cf-550a-4457-b744-1db7fd5c86fb'},
  });

  return data;
};
