import artworksData from '@/data/artworks.json';
import type { Artwork } from './types';

export const LOCAL_ARTWORKS = artworksData as Artwork[];
export const getArtwork = (slug: string) => LOCAL_ARTWORKS.find((a) => a.slug === slug);
export const getBySource = (filename: string) => LOCAL_ARTWORKS.find((a) => a.sourceFiles?.some((p) => p.split('/').pop() === filename));
export const getBestsellers = () => LOCAL_ARTWORKS.filter((a) => a.isBestseller);
export const getFeatured = () => LOCAL_ARTWORKS.filter((a) => a.isFeatured);
export const getNewArrivalCandidates = () => LOCAL_ARTWORKS.filter((a) => a.isNewArrivalCandidate).slice(0, 8);

export function localizedArtworkName(name:string,isArabic:boolean){const match=name.match(/^Œuvre (\d+)$/i);return match&&isArabic?`عمل فني ${match[1]}`:name;}
