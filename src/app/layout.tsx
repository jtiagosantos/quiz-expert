import './globals.css';

import { Metadata } from 'next';
import { Lexend, Russo_One } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/layouts/header/header';
import { Toaster } from '@/components/ui/toaster';

const lexend = Lexend({ subsets: ['latin'], variable: '--lexend' });
const russoOne = Russo_One({ subsets: ['latin'], weight: ['400'], variable: '--russoOne' });

export const metadata: Metadata = {
  title: 'Quiz Expert',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="pt-br"
        className="scrollbar-thumb-gray-500 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full">
        <body className={`${lexend.variable} ${russoOne.variable}`}>
          <Header />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
