import './globals.css';

import { Metadata } from 'next';
import { Lexend, Russo_One } from 'next/font/google';
import { ClerkProvider, localization } from '@/packages/auth';
import { Header } from '@/layouts/header/header';
import { Toaster } from '@/packages/ui';

const lexend = Lexend({ subsets: ['latin'], variable: '--lexend' });
const russoOne = Russo_One({ subsets: ['latin'], weight: ['400'], variable: '--russoOne' });

export const metadata: Metadata = {
  title: 'Quiz Expert',
  description:
    'Explore uma ampla variedade de quizzes divertidos e desafiadores no Quiz Expert. Teste seus conhecimentos em temas como Português, Conhecimentos Gerais, Tecnologia, Fantasia e muito mais.',
  openGraph: {
    title: '🧠 Quiz Expert',
    description:
      '🤩 Explore uma ampla variedade de quizzes divertidos e desafiadores no Quiz Expert. Teste seus conhecimentos em temas como Português, Conhecimentos Gerais, Tecnologia, Fantasia e muito mais.',
    type: 'website',
    url: 'https://www.quizexpert.com.br/',
  },
  verification: {
    other: {
      'google-adsense-account': 'ca-pub-2349380935535848',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={localization}>
      <html
        lang="pt-br"
        className="scrollbar-thumb-gray-500 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-full">
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2349380935535848"
            crossOrigin="anonymous"
          />
        </head>
        <body className={`${lexend.variable} ${russoOne.variable}`}>
          <Header />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
