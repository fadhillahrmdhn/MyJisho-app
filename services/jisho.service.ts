import { clientApi } from '@/lib';
import { AxiosResponse } from 'axios';
import { JishoResponse } from '@/interfaces';

export const fetchJishoData = async ({ search }: { search: string }): Promise<JishoResponse> => {
  const response: AxiosResponse<JishoResponse> = await clientApi.get(`/search`, {
    params: { keyword: search },
  });
  return response.data;
};
