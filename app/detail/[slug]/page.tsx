'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { JishoResponse } from '@/interfaces';
import { fetchJishoData } from '@/services';

const DetailPage = () => {
  const { slug: encodedSlug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = decodeURIComponent(encodedSlug);
  const encodedItem  = searchParams.get('item'); // Ambil 'item' dari query param, default ke '0'
  let index: string = '0';

  if(encodedItem){
    try{
      index = atob(encodedItem);
    }catch(e){
      console.error('we have an error', e);
    }
  }
  const { data, isLoading, error } = useQuery<JishoResponse>({
    queryKey: ['detail', slug],
    queryFn: () => fetchJishoData({ search: slug }),
    enabled: !!slug,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <h1>Detail Page</h1>
      {data?.data[Number(index)] &&
        data.data[Number(index)].japanese.map((item, idx) => (
          <div key={idx}>
            <p>Word: {item.word}</p>
            <p>Reading: {item.reading}</p>
          </div>
        ))}
    </div>
  );
};

export default DetailPage;
