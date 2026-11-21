'use client';
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { copy, type Locale, type CopyKey } from '@/lib/i18n';

type LanguageContextValue = { locale: Locale; isArabic: boolean; t: (key: CopyKey) => string; toggleLanguage: () => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale: Locale = pathname?.split('/')[1] === 'ar' ? 'ar' : 'fr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', locale === 'ar');
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    isArabic: locale === 'ar',
    t: (key) => copy[locale][key] as string,
    toggleLanguage: () => {
      const next = locale === 'fr' ? 'ar' : 'fr';
      const parts = (pathname || '/fr').split('/');
      parts[1] = next;
      router.push(parts.join('/') || `/${next}`);
    }
  }), [locale, pathname, router]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
