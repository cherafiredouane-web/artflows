import type { MetadataRoute } from 'next';
import artworks from '@/data/artworks.json';
export default function sitemap():MetadataRoute.Sitemap {
  const base=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
  const staticPaths=['','oeuvres','collections','favoris','personnalisation','a-propos','contact','faq','livraison-paiement','mentions-legales','confidentialite'];
  const pages=staticPaths.flatMap(path=>['fr','ar'].map(locale=>({url:`${base}/${locale}${path?`/${path}`:''}`,changeFrequency:'weekly' as const,priority:path===''?1:.7})));
  const products=(artworks as {slug:string}[]).flatMap(a=>['fr','ar'].map(locale=>({url:`${base}/${locale}/oeuvre/${a.slug}`,changeFrequency:'monthly' as const,priority:.5})));
  return [...pages,...products];
}
