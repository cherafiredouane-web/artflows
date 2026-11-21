'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { useWishlist } from './WishlistProvider';
import { SITE } from '@/lib/config';

export function SiteHeader() {
  const { locale, isArabic, t, toggleLanguage } = useLanguage();
  const { ids } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const nav = [
    [`/${locale}`, t('home')], [`/${locale}/oeuvres`, t('artworks')], [`/${locale}/#univers`, t('categories')], [`/${locale}/collections`, t('collections')], [`/${locale}/personnalisation`, isArabic ? 'فن مخصص' : 'Personnalisation']
  ];
  return <>
    <header className="site-header">
      <button className="icon-button mobile-menu-trigger" aria-label={menuOpen ? t('menuClose') : t('menu')} onClick={() => setMenuOpen(true)}><span className="hamburger" /></button>
      <Link href={`/${locale}`} className="brand-mark" aria-label="ARTFLOW — accueil"><Image src="/artflow-logo.svg" width={145} height={38} alt="ARTFLOW" priority /></Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {nav.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label={t('search')} title={t('search')} onClick={() => setSearchOpen((v) => !v)}><SearchIcon /></button>
        <Link className="icon-button wishlist-header" href={`/${locale}/favoris`} aria-label={t('wishlist')} title={t('wishlist')}><HeartIcon /><span className="count-dot">{ids.length}</span></Link>
        <button className="language-switch" onClick={toggleLanguage}>{isArabic ? 'FR' : 'عربي'}</button>
        <a className="header-contact" href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
      </div>
    </header>
    {searchOpen && <form className="search-popover" onSubmit={(e) => { e.preventDefault(); window.location.href = `/${locale}/oeuvres?q=${encodeURIComponent(query)}`; }}>
      <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search')} aria-label={t('search')} />
      <button type="submit">{t('discover')} <span>↗</span></button>
    </form>}
    {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t('menu')}>
      <div className="mobile-menu-top"><Link href={`/${locale}`} onClick={() => setMenuOpen(false)}><Image src="/artflow-logo.svg" width={132} height={35} alt="ARTFLOW" /></Link><button className="icon-button close-menu" onClick={() => setMenuOpen(false)} aria-label={t('menuClose')}>×</button></div>
      <div className="mobile-menu-links">{nav.map(([href,label],i)=><Link href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{i+1}</span>{label}<b>↗</b></Link>)}</div>
      <div className="mobile-menu-bottom"><Link href={`/${locale}/favoris`} onClick={() => setMenuOpen(false)}>{t('wishlist')} ({ids.length})</Link><button onClick={toggleLanguage}>{isArabic ? 'Français' : 'العربية'}</button><a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
    </div>}
  </>;
}

export function SiteFooter() {
  const { locale, isArabic, t, toggleLanguage } = useLanguage();
  return <footer className="site-footer">
    <div className="footer-top"><div className="footer-brand"><Image src="/artflow-logo.svg" width={145} height={38} alt="ARTFLOW" /><p>{t('footerLine')}</p><span className="footer-tagline">{isArabic ? 'الفن يُحَسّ.' : "L'art se ressent."}</span></div>
      <div className="footer-column"><h4>{t('quickLinks')}</h4><Link href={`/${locale}/oeuvres`}>{t('artworks')}</Link><Link href={`/${locale}/#univers`}>{t('categories')}</Link><Link href={`/${locale}/collections`}>{t('collections')}</Link><Link href={`/${locale}/personnalisation`}>{t('personalized')}</Link></div>
      <div className="footer-column"><h4>{t('help')}</h4><Link href={`/${locale}/contact`}>{t('contact')}</Link><Link href={`/${locale}/livraison-paiement`}>{t('shipping')}</Link><Link href={`/${locale}/a-propos`}>{t('about')}</Link><Link href={`/${locale}/faq`}>FAQ</Link><Link href={`/${locale}/mentions-legales`}>{t('legal')}</Link><Link href={`/${locale}/confidentialite`}>{isArabic?'الخصوصية':'Confidentialité'}</Link><a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      <div className="footer-column footer-promise"><h4>ARTFLOW — Maroc</h4><p>{t('delivery')}</p><p>{t('payment')}</p><button className="footer-language" onClick={toggleLanguage}>{t('language')} · {isArabic ? 'Français' : 'العربية'}</button></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ARTFLOW. {isArabic ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}</span><div><Link href={`/${locale}/admin`}>{t('admin')}</Link><span>{isArabic ? 'صنع بحب للفن' : 'Pensé avec amour pour l’art'}</span></div></div>
  </footer>;
}
function SearchIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>}
export function HeartIcon({filled=false}:{filled?:boolean}){return <svg viewBox="0 0 24 24" aria-hidden="true" className={filled?'heart-filled':''}><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"/></svg>}
