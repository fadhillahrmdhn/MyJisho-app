"use client";

import Image from "next/image";
import {
  QueryClient
} from '@tanstack/react-query'
import { fetchJishoData } from "@/services";
import { use } from "react";
import { JishoResponse } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
  const queryClient = new QueryClient();
  const { data, isLoading, error } = useQuery<JishoResponse>({
    queryKey: ['jishoData', 'house'],
    queryFn: () => fetchJishoData({ query: 'house' }),
    retry: 2,
    refetchOnWindowFocus: false
  });

  console.log(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">MyJisho App</h1>
      </main>
    </div>
  );
}
