import { TatoebaResponse } from "@/interfaces/tatoeba.interface";
import { clientApi } from '@/lib';
import { AxiosResponse } from "axios";

export const fetchTatoebaData = async ({query}: {query: string}): Promise<TatoebaResponse> => {
const response: AxiosResponse<TatoebaResponse> = await clientApi.get('/tatoeba',{
    params: {
         query: query,
    }
});


  return response.data;
}
