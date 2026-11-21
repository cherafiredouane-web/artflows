import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/components/LanguageProvider';
import { WishlistProvider } from '@/components/WishlistProvider';
import { SiteHeader, SiteFooter } from '@/components/SiteHeader';
export function generateStaticParams(){return [{locale:'fr'},{locale:'ar'}];}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return locale==='ar'?{title:'ARTFLOW — الفن يُحَسّ.',description:'معرض مغربي للفن الجداري المعاصر. اكتشف أعمالاً تمنح مساحتك روحاً خاصة.'}:{title:'ARTFLOW — L’art se ressent.',description:'Galerie marocaine de tableaux contemporains. Des œuvres qui donnent une âme à vos espaces.'};}
export default async function LocaleLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;if(!['fr','ar'].includes(locale))notFound();
  return <LanguageProvider><WishlistProvider><SiteHeader/>{children}<SiteFooter/></WishlistProvider></LanguageProvider>;
}
