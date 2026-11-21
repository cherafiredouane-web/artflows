'use client';
import { useEffect, useState } from 'react';
import localData from '@/data/artworks.json';
import type { Artwork } from '@/lib/types';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

const fallback = localData as Artwork[];
function fromRow(row: any): Artwork {
  return {
    id: row.id, slug: row.slug, name: row.name, image: row.image, width: row.width || 1200, height: row.height || 1200,
    aspectRatio: row.aspect_ratio || 1, categories: row.categories || [], colors: row.colors || [],
    isBestseller: !!row.is_bestseller, isFeatured: !!row.is_featured, isNewArrivalCandidate: !!row.is_new_arrival,
    archiveTimestamp: row.archive_timestamp || '', price: row.price ?? null, sizes: row.sizes || [],
    descriptionFr: row.description_fr || '', descriptionAr: row.description_ar || '', active: row.active !== false
  };
}
export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>(fallback);
  const [source, setSource] = useState<'local' | 'cloud'>('local');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const client = getSupabaseBrowserClient();
    if (!client) { setLoading(false); return; }
    client.from('artworks').select('*').eq('active', true).then(({ data, error }) => {
      if (!active) return;
      if (!error && data?.length) { setArtworks(data.map(fromRow)); setSource('cloud'); }
      setLoading(false);
    });
    return () => { active = false; };
  }, []);
  return { artworks, source, loading };
}
