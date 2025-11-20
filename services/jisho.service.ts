import { clientApi } from '@/lib';
import { AxiosResponse } from 'axios';
import { JishoResponse } from '@/interfaces';

export const fetchJishoData = async ({ query }: { query: string }): Promise<JishoResponse> => {
  const response: AxiosResponse<JishoResponse> = await clientApi.get(`/search`, {
    params: { keyword: query },
  });
  return response.data;
};
