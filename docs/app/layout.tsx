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
    template: '%s | React Beautiful Color',
  },
  description:
    'The most flexible and beautiful color picker for React. Built with compound components for maximum customization. Features TypeScript support, eye dropper, and all color formats.',
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
    'react-beautiful-color',
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
      <head>
        <title>React Beautiful Color - Flexible Color Picker for React</title>
        <meta
          name="description"
          content="The most flexible and beautiful color picker for React. Built with compound components for maximum customization."
        />

        <meta
          property="og:url"
          content="https://www.react-beautiful-color.dev/"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:title"
          content="React Beautiful Color - Flexible Color Picker for React"
        />
        <meta
          property="og:description"
          content="The most flexible and beautiful color picker for React. Built with compound components for maximum customization."
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/ba886231-d62d-43fd-a3f8-412dbf362c0d.png?token=M3RIR3xEo5hv0yfSfuWN9kSIItyy-8EPGG5NNcGaavc&height=600&width=1200&expires=33296355471"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:domain"
          content="react-beautiful-color.dev"
        />
        <meta
          property="twitter:url"
          content="https://www.react-beautiful-color.dev/"
        />
        <meta
          name="twitter:title"
          content="React Beautiful Color - Flexible Color Picker for React"
        />
        <meta
          name="twitter:description"
          content="The most flexible and beautiful color picker for React. Built with compound components for maximum customization."
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/ba886231-d62d-43fd-a3f8-412dbf362c0d.png?token=M3RIR3xEo5hv0yfSfuWN9kSIItyy-8EPGG5NNcGaavc&height=600&width=1200&expires=33296355471"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
