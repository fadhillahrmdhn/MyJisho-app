'use client';
import { useParams } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { JishoResponse } from '@/interfaces';
import { fetchJishoData } from '@/services';


const DetailPage = () => {
  const {
    slug: [encodedSlug, index],
  } = useParams<{ slug: string[] }>();

  // Decode slug yang sudah di-encode oleh URL
  const slug = decodeURIComponent(encodedSlug);

    const { data, isLoading, error } = useQuery<JishoResponse>({
      queryKey: ['detail', slug],
      queryFn: () => fetchJishoData({ search: slug }),
      enabled: !!slug,
      retry: 2,
      refetchOnWindowFocus: false
    });

  return (

    <div>
      <h1>Detail Page</h1>
              {data?.data[Number(index)] && data.data[Number(index)].japanese.map((item, idx) => (
                <div key={idx}>
                  <p>Word: {item.word}</p>
                  <p>Reading: {item.reading}</p>
                </div>
              ))  }
    </div>
  );
};

export default DetailPage;
