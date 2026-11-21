import type { Metadata } from 'next';
import PersonalizedPage from '@/components/PersonalizedPage';
export const metadata:Metadata={title:'Création personnalisée'};
export default function Page(){return <PersonalizedPage/>;}
