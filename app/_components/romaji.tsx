"use client"
import { useQuery } from '@tanstack/react-query';
import { fetchRomajiData } from '@/services';

export const Romaji = ({romaji}: {romaji: string}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['romaji', romaji],
        queryFn: () => fetchRomajiData({ text: romaji }),
        enabled: !!romaji,
        retry: 2,
        refetchOnWindowFocus: false,
      });

      console.log(data);

  return (
    <p>{data?.result}</p>
  )
}

