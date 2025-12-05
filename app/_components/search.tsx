'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchJishoData } from '@/services';
import { JishoResponse } from '@/interfaces';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const { data, isLoading, error } = useQuery<JishoResponse>({
    queryKey: ['jishoData', search],
    queryFn: () => fetchJishoData({ search: search }),
    enabled: !!search,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  const pathname: string = usePathname();
  const isHomePage: boolean = pathname === '/';
  return (
    <>
      <AnimatePresence>
        {isHomePage && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }} // Kondisi awal
            exit={{ opacity: 0, height: 0 }} // Animasi saat menghilang
            transition={{ duration: 0.3 }} // Durasi animasi
            className="overflow-hidden"
          >
            <Image src="/images/banner-myjishoapp.png" alt="MyJisho Logo" width={530} height={125} className="mx-auto mb-3" priority />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="z-10 relative max-w-md mx-auto">
        <form className="w-full mx-auto">
          <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              name="search"
              className="block w-full p-3 ps-9 bg-background border  text-foreground text-sm rounded-lg focus:ring-ring focus:border-ring shadow-sm placeholder:text-muted-foreground border-pink-500"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsDropdownOpen(true); // Buka dropdown saat pengguna mengetik
              }}
              required
            />
          </div>
        </form>

        {search && isDropdownOpen && (
          <div className="absolute max-h-96 overflow-y-auto px-4 w-full bg-card text-card-foreground rounded-b-lg shadow-md border border-t-0 border-pink-500 hover:">
            {data?.data &&
              data.data.map((item, index) => (
                // Gunakan properti unik sebagai key, seperti slug atau index
                <div key={item.slug || index} className=" hover:rounded-md hover:bg-primary-foreground border-b border-pink-200">
                  {/* Encode index ke Base64 sebelum dimasukkan ke URL */}
                  <Link href={`/detail/${item.slug}?item=${btoa(String(index))}`} className="block p-2" onClick={() => setIsDropdownOpen(false)}>
                    {item.japanese.map((word, idx) => (
                      <Fragment key={idx}>
                        <span>{word.word}</span>
                        {idx < item.japanese.length - 1 && <span>/</span>}
                      </Fragment>
                    ))}
                    <span> - {item.japanese[0].reading}</span>
                    <p>{item.senses[0].english_definitions[0]}</p>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
