import type { Metadata } from 'next';
import ArtworkDetail from '@/components/ArtworkDetail';
import artworks from '@/data/artworks.json';
export function generateStaticParams(){return (artworks as {slug:string}[]).map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string;locale:string}>}):Promise<Metadata>{const {slug,locale}=await params;const item=(artworks as {slug:string;name:string}[]).find(a=>a.slug===slug);if(locale==='ar')return {title:item?`${item.name} — ARTFLOW`:'عمل فني — ARTFLOW',description:item?`اكتشف ${item.name} من معرض ARTFLOW للفن الجداري.`:'اكتشف أعمال ARTFLOW الفنية.'};return {title:item?.name||'Œuvre',description:item?`Découvrez ${item.name}, une œuvre de la galerie ARTFLOW.`:'Œuvre ARTFLOW'};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ArtworkDetail slug={slug}/>;}
