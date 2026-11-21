# ARTFLOW — Contemporary Moroccan Art Gallery

A bilingual (French / Arabic) Next.js storefront built from the supplied ARTFLOW artwork archive and master website brief.

## Included

- Editorial full-bleed homepage built around the supplied `Hero.png` artwork.
- Responsive French and Arabic experiences (`/fr` and `/ar`) with RTL layout support.
- 270 deduplicated artworks, preserving 333 category image references and the 18 bestseller selections.
- Four primary category themes, with the legacy **Art Islamique** category retained and accessible in catalogue filters.
- Catalogue search, multi-category filters, multi-color swatch filters, sort options, quick view, and product pages.
- Browser-local wishlist (no customer account required).
- WhatsApp order and personalised-art request flows using one central number configuration.
- Delivery across Morocco and cash-on-delivery messaging, without publishing unverified delivery prices or times.
- Optional Supabase data layer and a protected admin entry point for editing artwork metadata, categories, colors, price, sizes, visibility and homepage flags.
- Supabase SQL schema, storage policies, a local seed script, and editable collection records.
- Sitemap, robots rules, and optional Google Analytics / Meta Pixel hooks (inactive until IDs are configured).

## Run locally

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root path redirects to `/fr`.

## Production build

```bash
npm run typecheck
npm run build
npm start
```

Deploy on a Next.js-compatible host such as Vercel. GitHub Pages alone is not suitable for the full Next.js + Supabase admin setup. Add `NEXT_PUBLIC_SITE_URL` with your actual live domain so generated sitemap URLs are correct.

## Catalogue audit

The supplied ZIP contains 333 artwork/category image files plus the hero, logo and favicon. Exact SHA-256 duplicate grouping produced:

- **270 unique artworks**
- **333 source artwork/category references**
- **53 duplicate-content groups** with 63 extra copies across categories
- **18 bestseller selections**
- **5 retained artwork categories**: Abstrait, Nature & Animaux, Culture Marocaine, Minimaliste & Géométrique, and Art Islamique

All unique product images were converted to WebP. The original source file paths are retained in each JSON record's `sourceFiles` property. The optimized artwork folder is about 25 MB. The archive supplies one primary visual per unique artwork; it does not include a separate alternate-angle or separate lifestyle-mockup set for every product, so those additional views have not been fabricated.

The four primary homepage/navigation categories follow the latest brief. Art Islamique remains as an additional preserved catalogue filter rather than being silently deleted or reassigned.

## Important content items to validate before launch

The provided ZIP did **not** contain the established three size options, their dimensions, or their prices. These values are deliberately left empty (`sizes: []`, `price: null`) rather than fabricated. Until those values are entered in the admin dashboard, product pages display “Prix sur demande” / “Price on request” and direct customers to WhatsApp to confirm formats and tariffs.

Dominant-color labels were automatically estimated from center-weighted image sampling. They are working starter metadata, not human-verified color labels. Review them against each artwork in the dashboard before relying on them as final product attributes.

The “new arrival” shortlist is seeded using timestamps stored in the ZIP archive (from 9 November 2026 onward). Archive timestamps do not prove the artwork's real publication date. Review the homepage flags in the dashboard and update the new-arrival selection before launch.

Featured items are an editable starter selection based on named assets. Collections are supplied as editorial starting concepts; assign specific artworks to each collection before presenting them as finished curated ranges.

The brief did not include the final Instagram URL, registered legal/business details, delivery fee table, delivery time estimates, free-delivery thresholds, or GA / Meta Pixel IDs. These are not invented or published as promises. Analytics remains disabled until you add tracking IDs in `.env.local`.

## WhatsApp configuration

Change the number only in `src/lib/config.ts`. The public site URL is read from `NEXT_PUBLIC_SITE_URL` so WhatsApp order messages can include a complete product link once your domain is connected:

```ts
whatsappNumber: '212627025271'
```

Use international digits only, without `+` or spaces.

## Enable the Supabase catalogue and admin dashboard

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`; set `NEXT_PUBLIC_SITE_URL` to your real domain, and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Seed the 270 artworks from your local machine (the service-role key is used only by the local script and must never be added to browser code):

   ```bash
   # Add SUPABASE_SERVICE_ROLE_KEY to .env.local, then run:
   node --env-file=.env.local scripts/seed-supabase.mjs
   ```

5. In Supabase Authentication, create the owner's admin user. Then insert that user's Auth UUID into `public.admin_users` from the SQL editor:

   ```sql
   insert into public.admin_users (user_id) values ('YOUR-AUTH-USER-UUID');
   ```

6. Restart the Next.js app and visit `/fr/admin` or `/ar/admin`.

The dashboard checks membership in `admin_users` and uses RLS policies for write access. Never add the service-role key to `NEXT_PUBLIC_*` variables or client-side code.

## Image storage

Existing product images are served from the optimized local `/public/artworks` directory. The admin upload action uses the public Supabase Storage bucket named `artworks`; uploaded images are then stored as public image URLs on the artwork record. This enables new image uploads without committing new assets to Git.

## Structure

```text
src/app/                 Next.js App Router pages
src/components/           Homepage, catalogue, product, wishlist, admin UI
src/data/artworks.json    Deduplicated starter catalogue (270 records)
src/lib/config.ts         WhatsApp number, palette and category configuration
public/artworks/          Optimized WebP artwork images
public/hero-artwork.webp  Optimized supplied hero image
supabase/schema.sql       Database, RLS and storage policies
scripts/seed-supabase.mjs Initial catalogue import
```

## Deployment checklist

- Add the two public Supabase env vars to the host if using cloud admin/data.
- Confirm the owner is present in `admin_users`.
- Enter and verify the actual size labels, dimensions and prices.
- Review all automatically estimated dominant colors.
- Confirm new arrivals and featured selections.
- Assign products to the four starter collections.
- Add verified delivery fees and expected delivery times only when confirmed.
- Add the final Instagram and legal/business details.
- Test the full customer journey in French, Arabic, desktop and mobile.
