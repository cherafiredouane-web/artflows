'use client';
import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';
export type CollectionItem={id:string;name_fr:string;name_ar:string;description_fr:string;description_ar:string;image:string|null;artwork_ids:string[];active:boolean;sort_order:number};
const fallback:CollectionItem[]=[
 {id:'the-calm-collection',name_fr:'The Calm Collection',name_ar:'مجموعة السكينة',description_fr:'Calme, équilibre et douceur.',description_ar:'هدوء وتوازن ونعومة.',image:null,artwork_ids:[],active:true,sort_order:1},
 {id:'the-soul-collection',name_fr:'The Soul Collection',name_ar:'مجموعة الروح',description_fr:'Des œuvres qui racontent.',description_ar:'أعمال تحمل حكاية.',image:null,artwork_ids:[],active:true,sort_order:2},
 {id:'the-bold-collection',name_fr:'The Bold Collection',name_ar:'مجموعة الجرأة',description_fr:'Une présence qui affirme.',description_ar:'حضور فني جريء.',image:null,artwork_ids:[],active:true,sort_order:3},
 {id:'modern-living',name_fr:'Modern Living',name_ar:'الحياة المعاصرة',description_fr:'L’art dans les espaces d’aujourd’hui.',description_ar:'الفن في مساحات اليوم.',image:null,artwork_ids:[],active:true,sort_order:4}
];
export function useCollections(){const [collections,setCollections]=useState(fallback);useEffect(()=>{let active=true;const client=getSupabaseBrowserClient();if(!client)return;client.from('collections').select('*').eq('active',true).order('sort_order').then(({data,error})=>{if(active&&!error&&data?.length)setCollections(data as CollectionItem[])});return()=>{active=false}},[]);return collections;}
