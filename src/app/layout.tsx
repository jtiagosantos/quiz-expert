import './globals.css';

import { Metadata } from 'next';
import { Lexend, Russo_One } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from './(home)/header';
import { Toaster } from '@/components/ui/toaster';

const lexend = Lexend({ subsets: ['latin'], variable: '--lexend' });
const russoOne = Russo_One({ subsets: ['latin'], weight: ['400'], variable: '--russoOne' });

export const metadata: Metadata = {
  title: 'Quiz Master',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className={`${lexend.variable} ${russoOne.variable}`}>
          <Header />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
