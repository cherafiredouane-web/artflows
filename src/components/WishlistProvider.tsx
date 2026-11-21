'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type WishlistContextValue = { ids: string[]; ready: boolean; toggle: (id: string) => void; has: (id: string) => boolean };
const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'artflow-wishlist-v1';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch { /* ignore a corrupted local wishlist */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); }, [ids, ready]);
  const toggle = useCallback((id: string) => setIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]), []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const value = useMemo(() => ({ ids, ready, toggle, has }), [ids, ready, toggle, has]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error('useWishlist must be used inside WishlistProvider');
  return value;
}
