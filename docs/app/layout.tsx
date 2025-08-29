import 'react-beautiful-color/dist/react-beautiful-color.css';

import '@/app/global.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { Geist, Geist_Mono, Inter, JetBrains_Mono, Orbitron, Space_Grotesk, Pacifico } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

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
  title: {
    default: 'React Beautiful Color - Flexible Color Picker for React',
    template: '%s | React Beautiful Color'
  },
  description: 'The most flexible and beautiful color picker for React. Built with compound components for maximum customization. Features TypeScript support, eye dropper, and all color formats.',
  keywords: [
    'react',
    'color picker',
    'react color picker',
    'react color picker component',
    'react color picker library',
    'react color picker package',
    'react color picker npm',
    'react color picker yarn',
    'react color picker pnpm',
    'react color picker bun',
    'color selector',
    'react component',
    'typescript',
    'tailwind css',
    'compound components',
    'eye dropper',
    'hex',
    'rgb',
    'hsl',
    'hsv',
    'color formats',
    'react-beautiful-color'
  ],
  authors: [
    {
      name: 'Özer Gökalpsezer',
      url: 'https://github.com/ddoemonn',
    },
  ],
  creator: 'Özer Gökalpsezer',
  publisher: 'Özer Gökalpsezer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://react-beautiful-color.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://react-beautiful-color.vercel.app',
    title: 'React Beautiful Color - Flexible Color Picker for React',
    description: 'The most flexible and beautiful color picker for React. Built with compound components for maximum customization.',
    siteName: 'React Beautiful Color',
    images: [
      {
        url: 'og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'React Beautiful Color - Color Picker Component',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Beautiful Color - Flexible Color Picker for React',
    description: 'The most flexible and beautiful color picker for React. Built with compound components for maximum customization.',
    images: ['og-image.jpeg'],
    creator: '@ddoemonn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} ${orbitron.variable} ${pacifico.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
