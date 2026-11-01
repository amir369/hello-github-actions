# Techlog Training: landing page

The landing page for the Training part of the aviation platform. Visitors choose a country on a
world map, a plane flies there from Vienna, and the approved training organisations in that
country appear as cards.

## How to view it

Open `index.html` in any browser (double-click it). Nothing needs to be installed.

## What to replace before launch

| What | Where | Why |
| --- | --- | --- |
| Training organisations | `js/orgs.js` | Every school, approval reference and course is **sample data**. Replace them with verified organisations. |
| Brand name "Techlog" | `index.html` | Placeholder name, taken from the aircraft technical log. |
| Email `hello@techlog-training.example` | `index.html`, `js/site.js` | Placeholder address. Use your real one. |
| Founder's letter | `index.html`, section "Why this directory exists" | Drafted from your profile. Edit it into your own words and add your name. |
| Drawings | `index.html` | The hangar, engine, ARC, aircraft plan and attitude indicator are drawings standing in for photographs. Your own on-site photos (hangar, delivery, records review) would make the page stronger. |

## Files

- `index.html`: the page
- `css/site.css`: colours, type and layout (`css/base.css` is a neutral reset)
- `js/site.js`: the map, the flight and the result cards
- `js/orgs.js`: the list of organisations (edit this to add or change schools)
- `js/map-data.js`: the world map, generated from Natural Earth (public domain)
- `assets/fonts/`: Young Serif and Source Serif 4 (SIL Open Font Licence)
- `tools/`: only needed to regenerate the map (`cd tools && npm install && npm run build-map`)
