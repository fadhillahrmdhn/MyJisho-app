import { type NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';

// Mendefinisikan fungsi asynchronous bernama GET. 
// Di Next.js App Router, fungsi dengan nama ini akan menangani permintaan HTTP GET.
export async function GET(request: NextRequest) {
  // 1. Mengambil query parameter dari URL permintaan.
  // Contoh: jika URL adalah /api/search?keyword=hello, searchParams akan berisi 'keyword=hello'.
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword');

  // 2. Validasi Input: Memeriksa apakah parameter 'keyword' ada.
  // Jika tidak ada, kirim respons error 400 (Bad Request).
  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  // 3. Blok try...catch untuk menangani potensi error saat memanggil API eksternal.
  try {
    // 4. Melakukan permintaan GET ke API eksternal (Jisho API).
    // `api` adalah instance dari Axios yang dikonfigurasi di `lib/api.ts`.
    // Permintaan ini akan menuju ke `[JISHO_API_BASE_URL]/search/words?keyword=[nilai keyword]`.
    const response = await api.get('/search/words', {
      params: { keyword },
    });

    // 5. Mengembalikan data JSON yang diterima dari Jisho API sebagai respons.
    // `response.data` berisi payload JSON dari Jisho API.
    return NextResponse.json(response.data);
  } catch (error) {
    // 6. Jika terjadi error (misalnya, Jisho API tidak aktif atau ada masalah jaringan).
    // Mencatat detail error di console server untuk debugging.
    console.error('Failed to fetch data from Jisho API:', error);
    
    // Mengirim respons error 500 (Internal Server Error) ke klien.
    return NextResponse.json({ error: 'Failed to fetch data from Jisho API' }, { status: 500 });
  }
}
