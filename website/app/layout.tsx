import { Geist, Geist_Mono, Space_Grotesk, Inter, JetBrains_Mono, Orbitron, Pacifico } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';
import 'react-beautiful-color/dist/react-beautiful-color.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['900'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['800'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['900'],
});

const pacifico = Pacifico({
  variable: '--font-pacifico',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'react-beautiful-color',
  description: 'The most flexible and beautiful color picker for React',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} ${orbitron.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
