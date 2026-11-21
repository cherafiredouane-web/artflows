import type { Metadata } from 'next';
import AdminPage from '@/components/AdminPage';
export const metadata:Metadata={title:'Administration ARTFLOW',robots:{index:false,follow:false}};
export default function Page(){return <AdminPage/>;}
