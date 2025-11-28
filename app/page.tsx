'use client';

import Image from 'next/image';
import { QueryClient } from '@tanstack/react-query';
import { fetchJishoData } from '@/services';
import { JishoResponse } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useSearchStore } from '@/store';
import Link from 'next/link';

export default function Home() {


  return (
    <div className="flex  items-center justify-center bg-zinc-50 font-sans dark:bg-black">

    </div>
  );
}
