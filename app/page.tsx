'use client';

import Image from 'next/image';
import { QueryClient } from '@tanstack/react-query';
import { fetchJishoData } from '@/services';
import { JishoResponse } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchStore } from '@/store';
import Link from 'next/link';

export default function Home() {
  const { search } = useSearchStore();
  const { data, isLoading, error } = useQuery<JishoResponse>({
    queryKey: ['jishoData', search],
    queryFn: () => fetchJishoData({ search: search }),
    enabled: !!search,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {data?.data &&
          data.data.map((item, index) => (
            // Gunakan properti unik sebagai key, seperti slug atau index
            <div key={item.slug || index}>
              <Link href={`/detail/${item.slug}?item=${index}`}>{item.slug}</Link>
            </div>
          ))}
      </main>
    </div>
  );
}
