import { clientApi } from "@/lib";
import { AxiosResponse } from "axios";

interface result {
  result: string;
}

export const fetchRomajiData = async ({text}: {text: string}): Promise<result> => {
  const response: AxiosResponse<result> = await clientApi.post('/romaji', {
      text,
  });
  

  return response.data;
};