'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchJishoData } from '@/services';
import { JishoResponse } from '@/interfaces';
import { Fragment, useState} from 'react';
import Link from 'next/link';

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
  return (
    <div className="max-w-3xl p-8 mx-auto">
      <form className="max-w-md mx-auto">
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
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsDropdownOpen(true); // Buka dropdown saat pengguna mengetik
            }}
            required
          />
          <button type="submit" className="absolute end-1.5 bottom-1.5 bg-blue-600 text-white hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium font-medium rounded-md text-sm px-4 py-2 focus:outline-none cursor-pointer">
            Search
          </button>
        </div>
      </form>

      {search && isDropdownOpen && (
        <div className="max-h-96 overflow-y-auto px-4 w-full mt-8 bg-gray-400/10 rounded-md shadow-md">
          {data?.data &&
            data.data.map((item, index) => (
              // Gunakan properti unik sebagai key, seperti slug atau index
              <div key={item.slug || index} className="mb-4">
                {/* Encode index ke Base64 sebelum dimasukkan ke URL */}
                <Link href={`/detail/${item.slug}?item=${btoa(String(index))}`} onClick={() => setIsDropdownOpen(false)}>
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
  );
};
