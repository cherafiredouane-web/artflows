export const SITE = {
  name: 'ARTFLOW',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, ''),
  taglineFr: "L'art se ressent.",
  taglineAr: 'الفن يُحَسّ.',
  whatsappNumber: '212627025271',
  whatsappDisplay: '+212 627 025 271',
  currency: 'MAD',
  country: 'Maroc'
};

export const PRIMARY_CATEGORIES = [
  { id: 'abstrait', fr: 'Abstrait', ar: 'تجريدي', coverSource: 'Abstract Gold and Charcoal.jpg' },
  { id: 'nature-animaux', fr: 'Nature & Animaux', ar: 'الطبيعة والحيوانات', coverSource: 'Black-horse.jpg' },
  { id: 'culture-marocaine', fr: 'Culture Marocaine', ar: 'الثقافة المغربية', coverSource: 'Mediterranean Sunset Archway Canvas.png' },
  { id: 'minimaliste-geometrique', fr: 'Minimaliste & Géométrique', ar: 'البساطة والهندسة', coverSource: 'Minimal-Elegance.jpg' }
] as const;

export const LEGACY_CATEGORY = {
  id: 'art-islamique', fr: 'Art Islamique', ar: 'الفن الإسلامي', coverSource: 'Artboard 1 copy 2.jpg'
};

export const COLORS = [
  { id: 'black', fr: 'Noir', ar: 'أسود', hex: '#202020' },
  { id: 'white', fr: 'Blanc', ar: 'أبيض', hex: '#F8F7F3', border: true },
  { id: 'beige', fr: 'Beige', ar: 'بيج', hex: '#DCC9A9' },
  { id: 'brown', fr: 'Brun', ar: 'بني', hex: '#79533A' },
  { id: 'grey', fr: 'Gris', ar: 'رمادي', hex: '#969696' },
  { id: 'blue', fr: 'Bleu', ar: 'أزرق', hex: '#315D9B' },
  { id: 'green', fr: 'Vert', ar: 'أخضر', hex: '#668263' },
  { id: 'red', fr: 'Rouge', ar: 'أحمر', hex: '#B83D3D' },
  { id: 'orange', fr: 'Orange', ar: 'برتقالي', hex: '#D77B37' },
  { id: 'yellow', fr: 'Jaune', ar: 'أصفر', hex: '#E4BC42' },
  { id: 'pink', fr: 'Rose', ar: 'وردي', hex: '#D98CA7' },
  { id: 'purple', fr: 'Violet', ar: 'بنفسجي', hex: '#7448B8' },
  { id: 'multicolor', fr: 'Multicolore', ar: 'متعدد الألوان', hex: 'conic-gradient(#D94A54,#E7BD48,#4B8B72,#456EAC,#8052A4,#D94A54)' }
] as const;
