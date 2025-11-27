"use client"
import { useQuery } from '@tanstack/react-query';
import { fetchTatoebaData } from '@/services/tatoeba.service';

export const ContohKalimat = ({text}:{text:string}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['contohKalimat', text],
        queryFn: () => fetchTatoebaData({ query: text }),
        enabled: !!text,
        retry: 2,
        refetchOnWindowFocus: false,
      });

  return (
    <div>{data?.results && data.results.map((item, idx) => (
        <div key={idx}>
            <p>{item.text}</p>
            <p><i>- {item.translations[1]?.[0]?.text}</i></p>
        </div>
    ))}</div>
  )
}
