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
2. Generate a long-lived Instagram access token (via Meta's Graph API Explorer / an Instagram Basic Display or Graph API app) — this requires logging into the Instagram/Facebook account that owns `@aroma_coffee_sc`.
3. Add `INSTAGRAM_ACCESS_TOKEN` as an environment variable on the Vercel project (**Project → Settings → Environment Variables**).
4. For the token to keep refreshing automatically (tokens expire every 60 days), also set `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`, and `CRON_SECRET` — see `api/refresh-instagram-token.js` for what each does. `vercel.json` already schedules that function to run weekly.
5. Until a token is set, you can preview the section's design by visiting any page with `?ig-demo` in the URL (e.g. `/?ig-demo`) — it shows placeholder tiles using existing brand photos.

## Before launch — things to confirm or finish

This site is a work-in-progress starting point, kept intentionally simple while the business is still new. A few things need real input before it's fully launch-ready:

- **Trailer photo** — the site now uses new cart-style renderings (`images/coffee-cart.jpg`, `coffee-cart-back.jpg`, `coffee-cart-angle.jpg`) instead of the original van mockups. If these are AI renderings rather than an actual photo of Riley's trailer, it's still worth swapping in real photos once available so the site matches the real rig exactly.
- **Contact email** — set to `aromacoffeesc@gmail.com` per the plan, but that should be double-checked against the real inbox before relying on it. It's used in `contact.html`, `forms.js` (`CONTACT_EMAIL`), and every page's footer. The contact form uses [FormSubmit](https://formsubmit.co) (free, no API key) — the first message sent after any email change triggers a one-time confirmation email from FormSubmit; click it to activate delivery.
- **Logo** — the nav uses `images/logo-icon-ink.png` (black on transparent) and the footer uses `images/logo-icon-tan.png` (tan on transparent, for the dark background), both cropped and recolored from a clean logo graphic rather than a photo. `images/logo-lockup-ink.png` / `logo-lockup-tan.png` (icon + "AROMA COFFEE" wordmark) are also available if a larger combined mark is needed somewhere. If there's an original vector/AI file for the logo, that would still be the cleanest source if further edits are needed.
- **Domain** — `aromacoffeesc.com` is a placeholder used in canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml`. Once it's purchased (e.g. via GoDaddy) and connected in Vercel, this is already consistent across the site — no further find-and-replace needed as long as the purchased domain matches.
- **Images** — all photos are AI-generated, not real photos. The cart shots (`coffee-cart.jpg`, `coffee-cart-back.jpg`, `coffee-cart-angle.jpg`, `cups-pair.jpg`) and the "future shop" renderings (`shop-storefront.jpg`, `shop-building-daylight.jpg`) came from the original brand mockups. `barista-pour.jpg`, `cart-event.jpg`, and `cart-handoff.jpg` were generated separately (using the cart photo as a style reference) to match that same look for the Our Story, What We Offer, and Progress pages. `cart-sign.jpg` is a crop of the A-frame sign from the main cart photo, not a separate image. Swap any of these for real photos as they're taken.
- **Founder bio/name** — `our-story.html` currently describes the founder without using a name. Add one if/when it should be public-facing.
- **Menu & sourcing** — no food/drink menu is listed yet (see `what-we-offer.html` and the "menus to come" note on `progress.html`). Add one once pricing and a coffee source are locked in.
- **Kids' birthday parties** — left out of the "What We Offer" event list since that was still undecided; add it there if/when it's confirmed as an offering.

## Custom domain

When ready, add the domain in the Vercel dashboard under **Project → Settings → Domains**, then update the DNS records at the domain registrar (GoDaddy) as Vercel instructs.
