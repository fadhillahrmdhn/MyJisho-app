"use client"
import { useQuery } from '@tanstack/react-query';
import { fetchTatoebaData } from '@/services/tatoeba.service';
import { Romaji } from './romaji';

export const ContohKalimat = ({text}:{text:string}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['contohKalimat', text],
        queryFn: () => fetchTatoebaData({ query: text }),
        enabled: !!text,
        retry: 2,
        refetchOnWindowFocus: false,
      });

  return (
    <div className='mt-4'>{data?.results && data.results.filter(item => item.translations[1]?.[0]?.text).slice(0,3).map((item, idx) => (
        <div key={idx} className="mb-4">
            <p>{item.text}</p>
            <Romaji romaji={item.text} />
            <p><i>- {item.translations[1]?.[0]?.text}</i></p>
        </div>
    ))}</div>
  )
}
