export type Artwork = {
  id: string; slug: string; name: string; image: string; width: number; height: number; aspectRatio: number;
  categories: string[]; colors: string[]; colorMetadataSource?: string;
  isBestseller: boolean; isFeatured: boolean; isNewArrivalCandidate: boolean; archiveTimestamp?: string;
  price: number | null; sizes: { id: string; label: string; price: number | null }[];
  descriptionFr: string; descriptionAr: string; sourceFiles?: string[]; active?: boolean;
};
