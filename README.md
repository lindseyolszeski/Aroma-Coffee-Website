# Aroma Coffee Website

Static website for Aroma Coffee, a mobile coffee van launching in Greenville, South Carolina. Built for [Vercel](https://vercel.com).

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `our-story.html` | Our Story |
| `menu.html` | Menu |
| `progress.html` | Progress |
| `contact.html` | Contact |

## How it works

- This is a plain static HTML site — no build step required.
- Connect this repo to a Vercel project and every push to the production branch deploys automatically.
- `vercel.json` enables clean URLs, so `/our-story.html` is served at `/our-story`.

## Before launch — things to update

This site shipped as a work-in-progress starting point, per the plan to keep things simple while the business is still new. A few placeholders need real values before it goes live:

- **Contact email** — `hello@aromacoffeesc.com` is a placeholder used in `contact.html`, `forms.js`, and the footers on every page. Swap it for the real inbox. The contact form uses [FormSubmit](https://formsubmit.co) (free, no API key) — the first message sent after the swap will trigger a one-time confirmation email from FormSubmit; click it to activate delivery.
- **Domain** — `aromacoffeesc.com` is a placeholder used in canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml`. Once a real domain is secured, find-and-replace it across the site.
- **Instagram handle** — currently linked as `@aromacoffee` throughout, matching the van signage. Update if the handle changes.
- **Images** — all photos are AI-generated concept renderings (van, storefront, aprons, menu board) sourced from the brand mockups, not real photos. Swap in real photos as they're taken.
- **Founder bio/name** — `our-story.html` currently describes the founder without using a name. Add one if/when you want it public-facing.
- **Menu & sourcing** — pricing and a named coffee source were intentionally left off per the plan to keep the menu simple and source-agnostic for now. Add pricing and supplier info once locked in.

## Custom domain

When ready, add the domain in the Vercel dashboard under **Project → Settings → Domains**, then update the DNS records at the domain registrar as Vercel instructs.
