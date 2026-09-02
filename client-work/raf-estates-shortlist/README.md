# raf estates - client property shortlist

Self-contained HTML shortlist presented under raf estates branding. All photography is
inlined as data URIs, so the page carries no outbound link or referrer back to the source
listings or the managing agents.

## Files

| File | Purpose |
| --- | --- |
| `shortlist.html` | The deliverable. Open directly, email, or host anywhere. ~2.6 MB, no dependencies beyond Google Fonts. |
| `build.py` | Rebuilds `shortlist.html`. All property copy, pricing and photo selection lives here. |
| `template.html` | Markup, CSS and gallery/tab behaviour. |
| `photos/` | Photo sets, 18 per Bayut property; 17 for Maritime City, extracted from the Omniyat PDF. `build.py` picks 8 of each. Aquamarine has the walkthrough plus 8 supplied photos. |
| `rafestates-wordmark.png` | Wordmark extracted from the client logo with transparency. |

## Rebuilding

    python build.py

Requires Pillow.

No property currently carries a video. To add one: put the file under a new `video/`
directory, register it in `VIDEOS` in `build.py`, and set `"video": True` (plus
`"portrait": True` for a phone-shot vertical clip) on that property. The template
already knows how to render a video slide, letterbox a portrait clip, and convert
the embedded data to a Blob URL at page load so it also plays in Safari - that
machinery is dormant, not deleted.

Re-encoding a walkthrough needs ffmpeg (`pip install imageio-ffmpeg`):

    ffmpeg -i source.mp4 -an -vf fps=30 -c:v libx264 -profile:v main            -crf 35 -preset slow -movflags +faststart out.mp4

Strip audio deliberately: browsers only autoplay muted video, and the original
audio can carry the listing agent's voice.

## Before this goes to the client

- Phone number still needed in `CONTACT` in `build.py` - shows a dashed "Add phone number"
  slot until then. Email is set (raqim@rafestates.com).
- Reconfirm pricing. These are short-term rates that move monthly; the Address Residences
  figure was quoted for the previous month.
- Service charges are unconfirmed on all four sale units - worth having before the client asks.
- Aquamarine 603 has no bedroom, bathroom or floor-area figures yet; the table shows
  "To confirm" for both. Fill in `bedBath`, `size` and the `specs` rows in `build.py`.

## Photography

Every photo carries the listing agency's watermark except the Seven Palm set. These are
not removable - they are the agencies' marks on their own copyrighted images. The proper
fix is to request each agency's clean media pack, which is routine between brokers; once
you have them, drop the files into `photos/<slug>/` and re-run the build.

| Property | Watermark |
| --- | --- |
| Seven Palm | none |
| The Address Residences | small "AP" corner mark |
| 5242 Tower 1 | Elegant Escapes, centred |
| Rimal 2 Loft | Carpe Diem, centred |
| Marina Gate 2 | White & Co., centred |
| Kempinski Residences | ako, centred |
| Balqis Residence | DACHA, centred |
| La Vie | none |
| Maritime City 901 | none (developer brochure) |
| Aquamarine 603 | none (video only) |

## Sources

Bayut listings: rentals details-14513495, 12790061, 7760035, 15522308;
sales details-16084163, 16232323, 15806914.

Aquamarine 603: WhatsApp notes plus 8 supplied photographs. A walkthrough video was
attached briefly and then removed at the client's request - see git history if it's
needed again. `Furnishing` still reads "To confirm": the video and the photos showed
visibly different interiors (different flooring, different balcony balustrade), and
the body copy was written to stick to what could be confirmed rather than assert a
furnishing state either set of media alone would contradict.

Maritime City 901: "Maritime city - Omniyat.pdf" - page 1 carries the specification,
pages 2-17 are the photography, extracted with PyMuPDF. The last gallery slide is the
floor plan.

La Vie: WhatsApp photos plus the client's own spec (area breakdown, floor, aspect).
Bathroom count and building amenities are unconfirmed - the fine print says so.
