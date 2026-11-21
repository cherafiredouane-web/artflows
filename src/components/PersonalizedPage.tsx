'use client';
import { useState, type FormEvent } from 'react';
import { useLanguage } from './LanguageProvider';
import { SITE } from '@/lib/config';
export default function PersonalizedPage(){
  const {isArabic,t}=useLanguage(); const [name,setName]=useState(''); const [idea,setIdea]=useState(''); const [contact,setContact]=useState('');
  const send=(e:FormEvent)=>{e.preventDefault();const msg=['Bonjour ARTFLOW,','Je souhaite discuter d’une création personnalisée.',`Nom : ${name}`,`Contact : ${contact}`,`Mon idée : ${idea}`].join('\n');window.open(`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer');};
  return <main className="custom-page section-shell"><div className="custom-intro"><span className="eyebrow">ARTFLOW / SUR MESURE</span><h1>{t('personalizedTitle')}</h1><p>{t('personalizedLead')}</p><div className="custom-statement">{isArabic?'الفن يبدأ بفكرة.':'Une idée devient une émotion.'}</div></div><form className="custom-form" onSubmit={send}><label>{t('name')}<input required value={name} onChange={e=>setName(e.target.value)} placeholder={isArabic?'اسمك':'Votre prénom'}/></label><label>{isArabic?'رقم واتساب أو البريد الإلكتروني':'Votre WhatsApp ou e-mail'}<input required value={contact} onChange={e=>setContact(e.target.value)} placeholder="+212…"/></label><label>{t('idea')}<textarea required rows={5} value={idea} onChange={e=>setIdea(e.target.value)} placeholder={isArabic?'الألوان، المقاس، الفكرة، المناسبة…':'Couleurs, format, inspiration, occasion…'}/></label><button className="button button-dark" type="submit">{t('sendRequest')} ↗</button><small>{isArabic?'سيتم فتح واتساب لإرسال طلبك.':'Votre demande sera préparée dans WhatsApp.'}</small></form></main>;
}
