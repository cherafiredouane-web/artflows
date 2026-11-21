'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { useCollections } from './useCollections';
import { useArtworks } from './useArtworks';
import { useLanguage } from './LanguageProvider';
import { COLORS, LEGACY_CATEGORY, PRIMARY_CATEGORIES } from '@/lib/config';
import type { Artwork } from '@/lib/types';

const categoryDefs = [...PRIMARY_CATEGORIES, LEGACY_CATEGORY];
export default function CataloguePage() {
  const { locale, isArabic, t } = useLanguage();
  const { artworks } = useArtworks();
  const collectionsData = useCollections();
  const params = useSearchParams();
  const [query,setQuery]=useState('');
  const [categories,setCategories]=useState<string[]>([]);
  const [colors,setColors]=useState<string[]>([]);
  const [sort,setSort]=useState('editorial');
  const [collectionId,setCollectionId]=useState('');
  const [filtersOpen,setFiltersOpen]=useState(false);
  useEffect(()=>{
    setQuery(params.get('q')||'');
    const cat=params.get('category'); if(cat && categoryDefs.some(c=>c.id===cat)) setCategories([cat]);
    setCollectionId(params.get('collection')||'');
  },[params]);
  const filtered=useMemo(()=>{
    let list=[...artworks];
    const q=query.trim().toLocaleLowerCase();
    if(q) list=list.filter(a=>a.name.toLocaleLowerCase().includes(q)||a.id.toLowerCase().includes(q));
    if(categories.length) list=list.filter(a=>categories.some(c=>a.categories.includes(c)));
    if(colors.length) list=list.filter(a=>colors.some(c=>a.colors.includes(c)));
    if(collectionId){const collection=collectionsData.find(c=>c.id===collectionId);if(collection?.artwork_ids?.length)list=list.filter(a=>collection.artwork_ids.includes(a.id));}
    if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name,'fr'));
    if(sort==='bestseller') list.sort((a,b)=>Number(b.isBestseller)-Number(a.isBestseller));
    return list;
  },[artworks,query,categories,colors,sort,collectionId,collectionsData]);
  const toggle=(list:string[],setter:(v:string[])=>void,value:string)=>setter(list.includes(value)?list.filter(x=>x!==value):[...list,value]);
  const clear=()=>{setQuery('');setCategories([]);setColors([]);setSort('editorial');setCollectionId('');};
  return <main className="catalogue-page">
    <section className="catalogue-intro section-shell"><div><span className="eyebrow">ARTFLOW / GALERIE</span><h1>{t('allArtworks')}</h1><p>{isArabic?'كل عمل يحمل إحساساً. اكتشف المجموعة بأكملها.':'Chaque œuvre porte une sensation. Parcourez la collection complète.'}</p></div><span className="catalogue-total">{String(artworks.length).padStart(3,'0')} <small>ŒUVRES</small></span></section>
    <div className="catalogue-toolbar section-shell"><label className="catalogue-search"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('search')}/></label><button className={`filter-toggle ${filtersOpen?'active':''}`} onClick={()=>setFiltersOpen(v=>!v)}>{t('filter')} <span>＋</span></button><label className="sort-control"><span>{t('sort')}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="editorial">{t('editorial')}</option><option value="name">{t('alphabetical')}</option><option value="bestseller">{t('bestFirst')}</option></select></label></div>
    <div className={`catalogue-layout section-shell ${filtersOpen?'filters-visible':''}`}>
      <aside className="catalogue-filters">
        <div className="filter-group"><div className="filter-title"><h3>{t('category')}</h3><span>{categories.length||'—'}</span></div>{categoryDefs.map(c=><label className="check-row" key={c.id}><input type="checkbox" checked={categories.includes(c.id)} onChange={()=>toggle(categories,setCategories,c.id)}/><span>{isArabic?c.ar:c.fr}</span></label>)}</div>
        <div className="filter-group color-filter"><div className="filter-title"><h3>{t('color')}</h3><span>{colors.length||'—'}</span></div><div className="swatch-grid">{COLORS.map(c=><button key={c.id} className={`swatch-option ${colors.includes(c.id)?'selected':''}`} onClick={()=>toggle(colors,setColors,c.id)} aria-label={isArabic?c.ar:c.fr} title={isArabic?c.ar:c.fr}><span className={`swatch ${c.id==='multicolor'?'swatch-multi':''}`} style={{background:c.hex,border:c.border?'1px solid #d7d1c8':undefined}}/><small>{isArabic?c.ar:c.fr}</small></button>)}</div></div>
        <button className="clear-filters" onClick={clear}>{t('clear')} ↗</button>
      </aside>
      <section className="catalogue-results"><div className="results-top"><span>{filtered.length} {t('results')}</span>{(categories.length>0||colors.length>0||query)&&<button onClick={clear}>{t('clear')} ×</button>}</div>
        {filtered.length?<div className="catalogue-grid">{filtered.map((a,i)=><ProductCard key={a.id} artwork={a} index={i}/>)}</div>:<div className="no-results"><span>∅</span><h2>{t('noResults')}</h2><button className="button button-dark" onClick={clear}>{t('clear')}</button></div>}
      </section>
    </div>
    <div className="section-shell catalogue-footnote"><span>ARTFLOW — {isArabic?'الفن يُحَسّ.':"L’art se ressent."}</span><Link href={`/${locale}/personnalisation`}>{t('personalized')} ↗</Link></div>
  </main>;
}
