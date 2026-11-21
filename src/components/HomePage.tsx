'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useLanguage } from './LanguageProvider';
import { ProductCard } from './ProductCard';
import { useArtworks } from './useArtworks';
import { useCollections } from './useCollections';
import { LEGACY_CATEGORY, PRIMARY_CATEGORIES } from '@/lib/config';

export default function HomePage() {
  const { locale, isArabic, t } = useLanguage();
  const { artworks } = useArtworks();
  const liveCollections = useCollections();
  const featured = useMemo(() => artworks.filter(a=>a.isFeatured).slice(0,6),[artworks]);
  const bestsellers = useMemo(() => artworks.filter(a=>a.isBestseller),[artworks]);
  const newCandidates = useMemo(() => artworks.filter(a=>a.isNewArrivalCandidate).slice(0,8),[artworks]);
  const categoryCards = PRIMARY_CATEGORIES.map((cat) => ({...cat, artwork: artworks.find(a=>a.sourceFiles?.some(p=>p.split('/').pop()===cat.coverSource)) || artworks.find(a=>a.categories.includes(cat.id))}));
  const islamicCover = artworks.find(a=>a.sourceFiles?.some(p=>p.split('/').pop()===LEGACY_CATEGORY.coverSource));
  const collectionFallbackImages=[categoryCards[1]?.artwork?.image,categoryCards[2]?.artwork?.image,categoryCards[0]?.artwork?.image,categoryCards[3]?.artwork?.image];
  const collections = liveCollections.filter(c=>c.active).map((c,i)=>({
    id:c.id,name:c.name_fr,ar:c.name_ar,detail:isArabic?c.description_ar:c.description_fr,
    image:c.image || artworks.find(a=>c.artwork_ids?.includes(a.id))?.image || collectionFallbackImages[i%collectionFallbackImages.length]
  }));
  return <main>
    <section className="hero-fullbleed">
      <Image src="/hero-artwork.webp" alt={isArabic?'تفاصيل لوحة فنية ملمسية بألوان الرمادي والبنفسجي':'Détail d’une œuvre texturée aux accents gris et violets'} fill priority sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">ARTFLOW · {isArabic?'معرض مغربي للفن المعاصر':'GALERIE CONTEMPORAINE MAROCAINE'}</p>
        <h1>{isArabic ? 'للفن قدرة على منح المساحات روحاً.' : 'L’art donne une âme aux espaces.'}</h1>
        <p>{isArabic ? 'اكتشف أعمالاً فنية تعبّر عنك.' : 'Découvrez des œuvres qui racontent quelque chose de vous.'}</p>
        <Link className="button button-light" href={`/${locale}/oeuvres`}>{t('discover')} <span>↗</span></Link>
      </div>
      <span className="hero-index">01 — 04</span>
      <a className="scroll-cue" href="#oeuvres"><span />{isArabic?'اكتشف':'DÉFILER'}</a>
    </section>

    <section className="section-shell section-featured" id="oeuvres">
      <div className="section-heading"><div><span className="eyebrow">01 / {isArabic?'اختيارات':'LA SÉLECTION'}</span><h2>{t('featured')}</h2><p>{t('featuredIntro')}</p></div><Link className="text-link" href={`/${locale}/oeuvres`}>{t('allArtworks')} ↗</Link></div>
      <div className="featured-grid">{(featured.length?featured:artworks.slice(0,6)).map((a,i)=><ProductCard key={a.id} artwork={a} index={i} />)}</div>
    </section>

    <section className="section-shell categories-section" id="univers">
      <div className="section-heading"><div><span className="eyebrow">02 / {isArabic?'عوالم فنية':'LES UNIVERS'}</span><h2>{t('explore')}</h2><p>{isArabic?'أربعة عوالم، ومساحة لاكتشاف ذوقك.':'Quatre univers pour trouver celui qui vous ressemble.'}</p></div></div>
      <div className="category-grid">{categoryCards.map((cat,i)=>cat.artwork&&<Link href={`/${locale}/oeuvres?category=${cat.id}`} className={`category-tile category-tile-${i}`} key={cat.id}><Image src={cat.artwork.image} alt={locale==='ar'?cat.ar:cat.fr} fill sizes="(max-width: 700px) 80vw, 50vw"/><span className="category-overlay"/><div><small>0{i+1} / ARTFLOW</small><h3>{isArabic?cat.ar:cat.fr}</h3><span>{t('viewCollection')} ↗</span></div></Link>)}</div>
      {islamicCover&&<Link href={`/${locale}/oeuvres?category=${LEGACY_CATEGORY.id}`} className="legacy-category-link"><span>{isArabic?LEGACY_CATEGORY.ar:LEGACY_CATEGORY.fr}</span><span>{isArabic?'اكتشف هذا القسم':'Explorer cet univers préservé'} ↗</span></Link>}
    </section>

    <section className="bestseller-section" id="bestsellers"><div className="section-shell"><div className="section-heading"><div><span className="eyebrow">03 / {isArabic?'الأعمال المفضلة':'LES ŒUVRES PRÉFÉRÉES'}</span><h2>{t('bestseller')}</h2><p>{t('bestsellerIntro')}</p></div><span className="section-count">{String(bestsellers.length).padStart(2,'0')} ŒUVRES</span></div><div className="bestseller-grid">{bestsellers.map((a,i)=><ProductCard key={a.id} artwork={a} index={i} compact />)}</div></div></section>

    <section className="section-shell new-section"><div className="section-heading"><div><span className="eyebrow">04 / {isArabic?'أحدث الإضافات':'FRAÎCHEMENT AJOUTÉES'}</span><h2>{t('new')}</h2><p>{t('newIntro')}</p></div><Link className="text-link" href={`/${locale}/oeuvres`}>{t('allArtworks')} ↗</Link></div><div className="new-grid">{(newCandidates.length?newCandidates:artworks.slice(-6)).slice(0,6).map((a,i)=><ProductCard key={a.id} artwork={a} index={i}/>)}</div></section>

    <section className="collections-section" id="collections"><div className="section-shell"><div className="section-heading"><div><span className="eyebrow">05 / {isArabic?'حكايات فنية':'DES HISTOIRES À COMPOSER'}</span><h2>{t('curated')}</h2><p>{t('curatedIntro')}</p></div><Link className="text-link" href={`/${locale}/oeuvres`}>{t('allArtworks')} ↗</Link></div><div className="collections-grid">{collections.map((c,i)=><Link href={`/${locale}/oeuvres`} className="collection-tile" key={c.id}><div className="collection-image">{c.image&&<Image src={c.image} alt={c.name} fill sizes="(max-width: 700px) 85vw, 25vw"/>}<span>0{i+1}</span></div><div className="collection-caption"><div><h3>{isArabic?c.ar:c.name}</h3><p>{c.detail}</p></div><span>↗</span></div></Link>)}</div></div></section>

    <section className="personalized-section"><div className="personalized-text"><span className="eyebrow">06 / {isArabic?'حسب الطلب':'SUR MESURE'}</span><h2>{t('personalized')}</h2><p>{t('personalizedText')}</p><Link href={`/${locale}/personnalisation`} className="button button-dark">{t('makeRequest')} ↗</Link></div><div className="personalized-art"><div className="personalized-frame">{categoryCards[2]?.artwork&&<Image src={categoryCards[2].artwork.image} alt="Inspiration ARTFLOW" fill sizes="50vw"/>}</div><span className="personalized-note">{isArabic?'لمسة شخصية، وإحساس يدوم.':'A personal touch, a lasting feeling.'}</span></div></section>

    <section className="instagram-section section-shell"><div className="section-heading"><div><span className="eyebrow">07 / {isArabic?'من عالمنا':'DANS NOTRE GALERIE'}</span><h2>{t('instagram')}</h2><p>{t('instagramText')}</p></div><span className="instagram-handle">@ARTFLOW · MAROC</span></div><div className="social-gallery">{[categoryCards[0]?.artwork,categoryCards[1]?.artwork,categoryCards[2]?.artwork,categoryCards[3]?.artwork].filter(Boolean).map((a,i)=><Link href={`/${locale}/oeuvre/${a!.slug}`} key={a!.id} className={`social-image social-image-${i}`}><Image src={a!.image} alt={a!.name} fill sizes="25vw"/></Link>)}</div></section>
  </main>;
}
