import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Analytics from '@/components/Analytics';
export const metadata: Metadata = {
  title: { default: 'ARTFLOW — L’art se ressent.', template: '%s | ARTFLOW' },
  description: 'Galerie marocaine de tableaux contemporains. Découvrez des œuvres pensées pour donner une âme à vos espaces.',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  openGraph: { title: 'ARTFLOW — L’art se ressent.', description: 'Tableaux uniques, émotions infinies.', type: 'website', locale: 'fr_MA' },
  icons: { icon: '/favicon.svg' }
};
export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="fr"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet"/></head><body>{children}<Analytics/></body></html>;
}
