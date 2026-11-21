'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useWishlist } from './WishlistProvider';
import { useArtworks } from './useArtworks';
import { useLanguage } from './LanguageProvider';
import { ProductCard } from './ProductCard';
import { SITE } from '@/lib/config';
export default function WishlistPage(){
  const {ids,ready}=useWishlist(); const {artworks}=useArtworks(); const {locale,isArabic,t}=useLanguage();
  const saved=useMemo(()=>artworks.filter(a=>ids.includes(a.id)),[artworks,ids]);
  const msg=['Bonjour ARTFLOW,','Voici ma sélection d’œuvres :',...saved.map(a=>`• ${a.name} — réf. ${a.id}${SITE.siteUrl?` — ${SITE.siteUrl}/${locale}/oeuvre/${a.slug}`:''}`),'Merci de m’indiquer les formats et tarifs.'].join('\n');
  return <main className="wishlist-page section-shell"><div className="page-kicker"><span className="eyebrow">ARTFLOW / COLLECTION PERSONNELLE</span><span>{String(saved.length).padStart(2,'0')} {isArabic?'أعمال':'ŒUVRES'}</span></div><h1>{t('yourFavorites')}</h1>
    {!ready?<p>…</p>:saved.length?<><p className="page-lead">{isArabic?'احتفظ بالأعمال التي تلامس إحساسك.':'Gardez près de vous les œuvres qui vous parlent.'}</p><div className="catalogue-grid wishlist-grid">{saved.map((a,i)=><ProductCard key={a.id} artwork={a} index={i}/>)}</div><a href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" className="button button-whatsapp wishlist-order">{t('whatsapp')} · {saved.length} ↗</a></>:<div className="empty-wishlist"><span>♡</span><h2>{t('emptyWishlist')}</h2><Link href={`/${locale}/oeuvres`} className="button button-dark">{t('continueBrowsing')} ↗</Link></div>}
  </main>;
}
