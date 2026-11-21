import type { Metadata } from 'next';
import WishlistPage from '@/components/WishlistPage';
export const metadata:Metadata={title:'Vos favoris'};
export default function Page(){return <WishlistPage/>;}
