import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
export const metadata:Metadata={title:'Galerie de tableaux contemporains au Maroc',description:'L’art se ressent. Découvrez la collection ARTFLOW.'};
export default function Page(){return <HomePage/>;}
