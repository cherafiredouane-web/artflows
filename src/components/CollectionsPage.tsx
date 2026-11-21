'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useArtworks } from './useArtworks';
import { useCollections } from './useCollections';
import { useLanguage } from './LanguageProvider';
export default function CollectionsPage(){
  const {locale,isArabic}=useLanguage();const artworks=useArtworks().artworks;const collections=useCollections();
  const fallbackImages=artworks.filter(a=>a.isFeatured||a.isBestseller);
  return <main className="collections-page section-shell"><div className="catalogue-intro"><div><span className="eyebrow">ARTFLOW / ÉDITIONS</span><h1>{isArabic?'مجموعات فنية':'Collections'}</h1><p>{isArabic?'عوالم فنية تجمع الأعمال التي تتحدث اللغة نفسها.':'Des univers éditoriaux pour rapprocher les œuvres qui partagent une même sensibilité.'}</p></div><span className="catalogue-total">{String(collections.length).padStart(2,'0')} <small>ÉDITIONS</small></span></div><div className="collections-page-grid">{collections.filter(c=>c.active).map((c,i)=>{const assigned=artworks.filter(a=>c.artwork_ids?.includes(a.id));const cover=c.image||assigned[0]?.image||fallbackImages[i%Math.max(fallbackImages.length,1)]?.image;return <article className="collection-page-card" key={c.id}><Link href={`/${locale}/oeuvres?collection=${c.id}`} className="collection-page-image">{cover&&<Image src={cover} alt={isArabic?c.name_ar:c.name_fr} fill sizes="(max-width: 700px) 90vw, 50vw"/>}<span>0{i+1}</span></Link><div className="collection-page-meta"><div><h2>{isArabic?c.name_ar:c.name_fr}</h2><p>{isArabic?c.description_ar:c.description_fr}</p><small>{assigned.length?`${assigned.length} ${isArabic?'أعمال':'œuvres'}`:(isArabic?'مجموعة فنية':'Collection à composer')}</small></div><Link href={`/${locale}/oeuvres?collection=${c.id}`} aria-label={isArabic?'اكتشف المجموعة':'Explorer la collection'}>↗</Link></div></article>})}</div></main>;
}
