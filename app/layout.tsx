import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryProviders } from '@/provider';
import { Dashboard, Search, Footer } from './_components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyJisho',
  description: 'A modern dictionary for Japanese language learners.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProviders>
          <main>
            <Dashboard>
              <Search />
              {children}
            </Dashboard>
          </main>
          <Footer />
        </QueryProviders>
      </body>
    </html>
  );
}
