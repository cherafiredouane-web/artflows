'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Artwork } from '@/lib/types';
import { useLanguage } from './LanguageProvider';
import { useWishlist } from './WishlistProvider';
import { HeartIcon } from './SiteHeader';
import { SITE } from '@/lib/config';
import { localizedArtworkName } from '@/lib/catalogue';

export function ProductCard({ artwork, index = 0, compact = false }: { artwork: Artwork; index?: number; compact?: boolean }) {
  const { locale, isArabic, t } = useLanguage();
  const { has, toggle } = useWishlist();
  const [quick, setQuick] = useState(false);
  const favorite = has(artwork.id);
  return <>
    <article className={`product-card ${compact ? 'product-card-compact' : ''} product-card-shape-${index % 4}`}>
      <div className="product-image-wrap">
        <Link href={`/${locale}/oeuvre/${artwork.slug}`} className="product-image-link" aria-label={`${t('viewArtwork')} ${localizedArtworkName(artwork.name,isArabic)}`}>
          <Image src={artwork.image} alt={artwork.name} fill sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw" className="product-image" />
        </Link>
        <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => toggle(artwork.id)} aria-label={favorite ? t('removeFavorite') : t('addFavorite')} title={favorite ? t('removeFavorite') : t('addFavorite')}><HeartIcon filled={favorite} /></button>
        {!compact && <button className="quick-view-button" onClick={() => setQuick(true)}>{t('quickView')} <span>↗</span></button>}
      </div>
      <div className="product-meta">
        <Link href={`/${locale}/oeuvre/${artwork.slug}`} className="product-title">{localizedArtworkName(artwork.name,isArabic)}</Link>
        <div className="product-subline"><span>{artwork.price != null ? `${artwork.price} DH` : t('priceOnRequest')}</span><span>{artwork.isBestseller ? '✳' : '—'}</span></div>
      </div>
    </article>
    {quick && <QuickView artwork={artwork} onClose={() => setQuick(false)} />}
  </>;
}

export function QuickView({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  const { locale, isArabic, t } = useLanguage();
  const productUrl = SITE.siteUrl ? `${SITE.siteUrl}/${locale}/oeuvre/${artwork.slug}` : '';
  const whatsappText = [`Bonjour ARTFLOW, je souhaite connaître les formats et tarifs de l'œuvre ${artwork.name} (réf. ${artwork.id}).`, productUrl ? `Lien : ${productUrl}` : ''].filter(Boolean).join('\n');
  return <div className="modal-scrim" role="presentation" onMouseDown={(e) => { if(e.target===e.currentTarget) onClose(); }}>
    <section className="quick-modal" role="dialog" aria-modal="true" aria-label={artwork.name}>
      <button className="modal-close" onClick={onClose} aria-label={t('close')}>×</button>
      <div className="quick-image"><Image src={artwork.image} alt={artwork.name} fill sizes="(max-width: 700px) 100vw, 52vw" /></div>
      <div className="quick-copy"><span className="eyebrow">ARTFLOW · {artwork.id.toUpperCase()}</span><h3>{localizedArtworkName(artwork.name,isArabic)}</h3><p>{artwork.price != null ? `${artwork.price} DH` : t('priceOnRequest')}</p><p className="muted">{t('formatUnavailable')}</p><a className="button button-dark" href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer">{t('askPrice')} ↗</a><Link className="text-link" href={`/${locale}/oeuvre/${artwork.slug}`}>{t('viewArtwork')} ↗</Link></div>
    </section>
  </div>;
}
