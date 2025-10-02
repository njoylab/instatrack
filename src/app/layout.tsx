import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'InstaTrack - Track Your Instagram Growth',
  description: 'Monitor your Instagram followers and following over time. Snapshot tracking and privacy-first approach. Discover who unfollowed you and analyze your Instagram patterns.',
  keywords: ['Instagram tracker', 'follower tracker', 'Instagram analytics', 'unfollow tracker', 'Instagram growth'],
  authors: [{ name: 'njoyLab.com' }],
  creator: 'njoyLab.com',
  publisher: 'njoyLab.com',
  metadataBase: new URL('https://instatrack.njoylab.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://instatrack.njoylab.com',
    title: 'InstaTrack - Track Your Instagram Growth',
    description: 'Monitor your Instagram followers and following over time. Snapshot tracking and privacy-first approach.',
    siteName: 'InstaTrack',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'InstaTrack - Track Your Instagram Growth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaTrack - Track Your Instagram Growth',
    description: 'Monitor your Instagram followers and following over time. Snapshot tracking and privacy-first approach.',
    images: ['/og-image.svg'],
    creator: '@emln_',
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-body antialiased flex flex-col",
        ptSans.variable
      )}>
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
