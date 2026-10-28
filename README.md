# Aroma Coffee Website

Static website for Aroma Coffee, a mobile coffee cart serving weddings and events around Greenville, South Carolina. Built for [Vercel](https://vercel.com).

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `our-story.html` | Our Story |
| `what-we-offer.html` | What We Offer (events the cart books) |
| `progress.html` | Progress (phases: Cart → Van → Building → Renovation → Impacting the Community) |
| `contact.html` | Contact |

## How it works

- This is a plain static HTML site — no build step required.
- Connect this repo to a Vercel project and every push to the production branch deploys automatically.
- `vercel.json` enables clean URLs, so `/our-story.html` is served at `/our-story`.

## Instagram feed

`ig-feed.js` + `api/instagram.js` populate a live Instagram grid on the homepage, modeled on the Hope Valley Ranch site's feed. It fails closed: with no `INSTAGRAM_ACCESS_TOKEN` set, the section just stays hidden — nothing breaks.

To make it live:
1. The Instagram account needs to be a Business or Creator account connected to a Facebook Page.
2. Generate a long-lived Instagram access token (via Meta's Graph API Explorer / an Instagram Basic Display or Graph API app) — this requires logging into the Instagram/Facebook account that owns `@aromacoffee`.
3. Add `INSTAGRAM_ACCESS_TOKEN` as an environment variable on the Vercel project (**Project → Settings → Environment Variables**).
4. For the token to keep refreshing automatically (tokens expire every 60 days), also set `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`, and `CRON_SECRET` — see `api/refresh-instagram-token.js` for what each does. `vercel.json` already schedules that function to run weekly.
5. Until a token is set, you can preview the section's design by visiting any page with `?ig-demo` in the URL (e.g. `/?ig-demo`) — it shows placeholder tiles using existing brand photos.

## Before launch — things to confirm or finish

This site is a work-in-progress starting point, kept intentionally simple while the business is still new. A few things need real input before it's fully launch-ready:

- **Trailer photo** — the site currently uses the original AI-rendered "van" mockup images as a stand-in for the actual cart, since Riley's rig is a trailer, not a van. Once there's a real photo of the trailer, it should be mocked up with Aroma Coffee branding (matching the style of the existing renderings) and swapped in for `images/coffee-cart.jpg` and related references.
- **Phone number for texting** — `contact.html` currently has a `[Add phone number]` placeholder under the "Text" contact option. Fill in the real number.
- **Contact email** — set to `aromacoffeesc@gmail.com` per the plan, but that should be double-checked against the real inbox before relying on it. It's used in `contact.html`, `forms.js` (`CONTACT_EMAIL`), and every page's footer. The contact form uses [FormSubmit](https://formsubmit.co) (free, no API key) — the first message sent after any email change triggers a one-time confirmation email from FormSubmit; click it to activate delivery.
- **Logo** — the nav/footer logo (`images/logo-mark.jpg`) is currently a tight crop of the logo from one of the AI brand-mockup photos, not an original logo file. If there's a real transparent PNG or vector logo file, swapping it in would look cleaner than a photo crop.
- **Domain** — `aromacoffeesc.com` is a placeholder used in canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml`. Once it's purchased (e.g. via GoDaddy) and connected in Vercel, this is already consistent across the site — no further find-and-replace needed as long as the purchased domain matches.
- **Images** — all photos are AI-generated concept renderings sourced from the original brand mockups, not real photos. Swap in real photos as they're taken.
- **Founder bio/name** — `our-story.html` currently describes the founder without using a name. Add one if/when it should be public-facing.
- **Menu & sourcing** — no food/drink menu is listed yet (see `what-we-offer.html` and the "menus to come" note on `progress.html`). Add one once pricing and a coffee source are locked in.
- **Kids' birthday parties** — left out of the "What We Offer" event list since that was still undecided; add it there if/when it's confirmed as an offering.

## Custom domain

When ready, add the domain in the Vercel dashboard under **Project → Settings → Domains**, then update the DNS records at the domain registrar (GoDaddy) as Vercel instructs.
