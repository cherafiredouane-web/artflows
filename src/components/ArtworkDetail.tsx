'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useArtworks } from './useArtworks';
import { useLanguage } from './LanguageProvider';
import { useWishlist } from './WishlistProvider';
import { ProductCard } from './ProductCard';
import { SITE, COLORS } from '@/lib/config';
import { localizedArtworkName } from '@/lib/catalogue';

export default function ArtworkDetail({slug}:{slug:string}) {
  const { artworks, loading }=useArtworks();
  const { locale,isArabic,t }=useLanguage();
  const { has,toggle }=useWishlist();
  const artwork=artworks.find(a=>a.slug===slug);
  const [size,setSize]=useState('');
  const related=useMemo(()=>artwork?artworks.filter(a=>a.id!==artwork.id&&a.categories.some(c=>artwork.categories.includes(c))).slice(0,4):[],[artworks,artwork]);
  if(!artwork) return <main className="not-found section-shell">{loading?'…':<><h1>{isArabic?'العمل غير موجود':'Œuvre introuvable'}</h1><Link href={`/${locale}/oeuvres`} className="text-link">{t('backToGallery')} ↗</Link></>}</main>;
  const selected=artwork.sizes.find(s=>s.id===size);
  const shownPrice=selected?.price ?? artwork.price;
  const message=[
    'Bonjour ARTFLOW,',
    "Je souhaite commander / obtenir des informations sur cette œuvre :",
    `Œuvre : ${artwork.name}`,
    `Référence : ${artwork.id}`,
    `Format : ${selected?.label || 'À confirmer'}`,
    `Prix affiché : ${shownPrice!=null?`${shownPrice} MAD`:'À confirmer'}`,
    ...(SITE.siteUrl ? [`Lien : ${SITE.siteUrl}/${locale}/oeuvre/${artwork.slug}`] : []),
    'Merci de me communiquer les informations concernant la livraison.'
  ].join('\n');
  return <main className="product-detail-page">
    <div className="breadcrumb section-shell"><Link href={`/${locale}`}>{t('home')}</Link><span>/</span><Link href={`/${locale}/oeuvres`}>{t('artworks')}</Link><span>/</span><span>{localizedArtworkName(artwork.name,isArabic)}</span></div>
    <div className="detail-layout section-shell">
      <div className="detail-visual"><div className="detail-main-image"><Image src={artwork.image} alt={artwork.name} fill priority sizes="(max-width: 850px) 100vw, 58vw"/></div><div className="detail-image-note"><span>ARTFLOW · {artwork.id.toUpperCase()}</span><span>{isArabic?'صورة العمل':'Visuel de l’œuvre'}</span></div></div>
      <div className="detail-copy"><span className="eyebrow">{artwork.isBestseller?'ARTFLOW FAVORITE':'GALERIE ARTFLOW'}</span><h1>{localizedArtworkName(artwork.name,isArabic)}</h1><p className="detail-price">{shownPrice!=null?`${shownPrice} DH`:t('priceOnRequest')}</p>{(isArabic?artwork.descriptionAr:artwork.descriptionFr)&&<p className="detail-description">{isArabic?artwork.descriptionAr:artwork.descriptionFr}</p>}
        <div className="detail-rule"/>
        <div className="format-block"><div className="format-heading"><h3>{t('chooseFormat')}</h3><span>{artwork.sizes.length?artwork.sizes.length:'—'}</span></div>
          {artwork.sizes.length?<div className="format-options">{artwork.sizes.map(s=><button key={s.id} className={size===s.id?'selected':''} onClick={()=>setSize(s.id)}>{s.label}{s.price!=null&&<small>{s.price} DH</small>}</button>)}</div>:<p className="format-pending">{t('formatUnavailable')}</p>}
        </div>
        <a className="button button-whatsapp detail-order" href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">{t('whatsapp')} <span>↗</span></a>
        <button className={`detail-favorite ${has(artwork.id)?'active':''}`} onClick={()=>toggle(artwork.id)}>{has(artwork.id)?'♥':'♡'} {has(artwork.id)?t('removeFavorite'):t('addFavorite')}</button>
        <div className="detail-benefits"><div><span>01</span><p>{t('delivery')}</p></div><div><span>02</span><p>{t('payment')}</p></div><div><span>03</span><p>{isArabic?'تأكيد التفاصيل عبر واتساب':'Détails confirmés sur WhatsApp'}</p></div></div>
        <div className="detail-colors"><span>{t('color')} ·</span>{artwork.colors.map(c=>{const color=COLORS.find(x=>x.id===c); return color?<i key={c} title={isArabic?color.ar:color.fr} style={{background:color.hex,border:color.border?'1px solid #ccc':undefined}}/>:null;})}</div>
      </div>
    </div>
    <section className="section-shell detail-related"><div className="section-heading"><div><span className="eyebrow">ARTFLOW / POUR VOUS</span><h2>{isArabic?'قد يعجبك أيضاً':'À découvrir aussi'}</h2></div><Link className="text-link" href={`/${locale}/oeuvres`}>{t('allArtworks')} ↗</Link></div><div className="related-grid">{related.map((a,i)=><ProductCard key={a.id} artwork={a} index={i} compact/>)}</div></section>
  </main>;
}
