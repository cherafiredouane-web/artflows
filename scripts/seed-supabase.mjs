import fs from 'node:fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.');
  process.exit(1);
}
const rows = JSON.parse(fs.readFileSync(new URL('../src/data/artworks.json', import.meta.url), 'utf8')).map((a) => ({
  id:a.id, slug:a.slug, name:a.name, image:a.image, width:a.width, height:a.height, aspect_ratio:a.aspectRatio,
  categories:a.categories, colors:a.colors, color_metadata_source:a.colorMetadataSource,
  is_bestseller:a.isBestseller, is_featured:a.isFeatured, is_new_arrival:a.isNewArrivalCandidate,
  archive_timestamp:a.archiveTimestamp || null, price:a.price, sizes:a.sizes,
  description_fr:a.descriptionFr, description_ar:a.descriptionAr, source_files:a.sourceFiles, active:true
}));
const endpoint = `${url.replace(/\/$/,'')}/rest/v1/artworks?on_conflict=id`;
for (let i=0;i<rows.length;i+=50) {
  const response = await fetch(endpoint, { method:'POST', headers:{ apikey:key, Authorization:`Bearer ${key}`, 'Content-Type':'application/json', Prefer:'resolution=merge-duplicates,return=minimal' }, body:JSON.stringify(rows.slice(i,i+50)) });
  if (!response.ok) throw new Error(`Supabase seed failed at batch ${i}: ${response.status} ${await response.text()}`);
  console.log(`Synced ${Math.min(i+50,rows.length)} / ${rows.length}`);
}
console.log('ARTFLOW catalogue seeded.');
