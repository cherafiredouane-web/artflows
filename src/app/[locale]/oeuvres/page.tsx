import { Suspense } from 'react';
import type { Metadata } from 'next';
import CataloguePage from '@/components/CataloguePage';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return locale==='ar'?{title:'كل الأعمال — ARTFLOW',description:'اكتشف أعمال ARTFLOW حسب الموضوع والألوان.'}:{title:'Toutes les œuvres — ARTFLOW',description:'Explorez les tableaux ARTFLOW par univers et par couleur.'};}
export default function Page(){return <Suspense fallback={<main className="section-shell loading-page">ARTFLOW…</main>}><CataloguePage/></Suspense>;}
