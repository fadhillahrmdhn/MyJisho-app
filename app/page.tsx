'use client';

import Image from 'next/image';
import { QueryClient } from '@tanstack/react-query';
import { fetchJishoData } from '@/services';
import { JishoResponse } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useSearchStore } from '@/store';
import Link from 'next/link';
import { Search } from './_components';

export default function Home() {


  return (
    <div>

    </div>
  );
}
