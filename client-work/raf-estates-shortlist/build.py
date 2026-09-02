"""Build the raf estates client shortlist into one self-contained HTML file.

Photography and specification are pulled from the source Bayut listings and
inlined as data URIs so the deliverable carries no outbound reference back to
the listing site or the managing agent.
"""

import base64
import io
import json
import os

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PHOTO_DIR = os.path.join(HERE, "photos")

# Curated selection per property, ordered: view/hero, living, kitchen, bedrooms,
# bathroom, building amenity. Numbers refer to the downloaded filenames.
SELECTION = {
    # rentals
    "palm-seven":      [1, 3, 6, 8, 12, 15, 16, 18],
    "jbr-address":     [1, 3, 5, 8, 12, 15, 17, 18],
    "marina-5242":     [1, 2, 6, 13, 4, 8, 7, 12],
    "jbr-rimal":       [3, 1, 6, 9, 4, 5, 11, 15],
    # sales
    "marina-gate":     [7, 1, 2, 5, 4, 11, 12, 9],
    "kempinski-creek": [3, 1, 4, 5, 7, 15, 11, 12],
    "balqis-palm":     [1, 6, 2, 8, 3, 15, 11, 18],
    "aquamarine-palm": [6, 3, 4, 8, 2, 5, 1, 7],
    "maritime-901":    [3, 10, 5, 8, 11, 13, 17, 2],
    "lavie-jbr":        [8, 6, 7, 4, 2, 1, 3, 9, 5],
}

MAX_W = 1000
QUALITY = 72

CONFIRMED_DATE = "2 September 2026"

# Walkthrough videos, embedded as data URIs alongside the stills.
# Empty for now - register {"slug": {"file": ..., "poster": ...}} here and set
# "video": True (plus "portrait": True for a phone-shot vertical clip) on a
# property to bring one back.
VIDEOS = {}

# Contact block. Fill these in before the page goes to the client.
CONTACT = {
    "href": "#",
    "lines": [
        '<span class="slot">Add phone number</span>',
        '<a href="mailto:raqim@rafestates.com">raqim@rafestates.com</a>',
    ],
}

RENTALS = [
    {
        "slug": "jbr-rimal",
        "name": "Rimal 2 Loft",
        "area": "Jumeirah Beach Residence",
        "address": "Rimal 2, Rimal, Jumeirah Beach Residence, Dubai",
        "price": "AED 15,000",
        "priceLabel": "per month",
        "priceShort": "AED 15,000",
        "size": "2,200 sqft",
        "bedBath": "2 / 2",
        "status": "21 Sep",
        "standout": "By far the largest &mdash; a double-height living space with the bedrooms set on a mezzanine above it.",
        "pills": ["Available 21 September", "Largest floorplan"],
        "specs": [
            ["Bedrooms", "2"],
            ["Bathrooms", "2"],
            ["Size", "2,200 sqft"],
            ["Layout", "Loft"],
            ["Floor", "High"],
            ["Built", "2008"],
        ],
        "body": "The largest of the four by a wide margin. <strong>2,200 sqft</strong> arranged as a double-height living space with full-height glazing on two sides, and both bedrooms set on a mezzanine that looks back down over it. The main floor holds a black-gloss kitchen, a separate dining area and a billiards table. Steps from The Walk and The Beach at JBR, with the tram and the Marina a short walk beyond.",
        "amenities": [
            "Direct beach access", "Swimming pool", "Gym", "Billiards table",
            "Kids' play area", "Monthly cleaning included", "Double-height living space",
            "Smart TV", "Broadband internet", "Satellite &amp; cable TV",
            "Storage areas", "24-hour concierge", "CCTV &amp; security staff",
            "Centrally air-conditioned",
        ],
        "fine": "Available from 21 September. Rates vary by month, length of stay and payment structure &mdash; the figure above is the current monthly quote.",
    },
    {
        "slug": "palm-seven",
        "name": "Seven Palm, Tower A",
        "area": "Palm Jumeirah",
        "address": "Seven Palm (Tower A), Palm Jumeirah, Dubai",
        "price": "AED 16,999",
        "priceLabel": "per month",
        "priceShort": "AED 16,999",
        "size": "1,139 sqft",
        "bedBath": "2 / 2",
        "status": "Now",
        "standout": "Rooftop infinity pool and direct beach access on the Palm, with Ain Dubai straight off the balcony.",
        "pills": ["Fully furnished", "Utilities included"],
        "specs": [
            ["Bedrooms", "2"],
            ["Bathrooms", "2"],
            ["Size", "1,139 sqft"],
            ["Furnishing", "Furnished"],
            ["Parking", "1 space"],
            ["Building", "Tower A"],
        ],
        "body": "A resort-style two-bedroom on the Palm's east crescent. Open-plan living behind floor-to-ceiling glass, a fully fitted kitchen, king beds in both rooms and walk-in showers. The curved balcony looks straight across the water to <strong>Ain Dubai and the Marina skyline</strong>. The building sits between two luxury hotels, so their restaurants and bars are a lift ride away, and Dubai Marina is roughly ten minutes by car.",
        "amenities": [
            "Rooftop infinity pool", "Direct beach access", "Gym / health club",
            "24-hour concierge", "Private balcony", "1 parking space",
            "High-speed broadband", "Satellite &amp; cable TV",
            "Electricity, water &amp; A/C included", "CCTV &amp; security",
            "Centrally air-conditioned", "Lobby &amp; reception",
        ],
        "fine": "Added on top of the monthly rate: 5% VAT, Tourism Dirham at AED 10 per bedroom per night, and a booking fee. Rate is quoted for the current month and moves with season.",
    },
    {
        "slug": "jbr-address",
        "name": "The Address Residences",
        "area": "Jumeirah Beach Residence",
        "address": "The Address Residences Jumeirah Resort &amp; Spa, JBR, Dubai",
        "price": "AED 17,000",
        "priceLabel": "per month",
        "priceShort": "AED 17,000",
        "size": "1,167 sqft",
        "bedBath": "2 / 2 + WC",
        "status": "Now",
        "standout": "Hotel-serviced address on The Walk &mdash; private beach, residents' pool and the hotel's restaurants downstairs.",
        "pills": ["8th floor", "2 parking spaces"],
        "specs": [
            ["Bedrooms", "2"],
            ["Bathrooms", "2 + guest WC"],
            ["Size", "1,167 sqft"],
            ["Furnishing", "Furnished"],
            ["Floor", "8th"],
            ["Parking", "2 spaces"],
        ],
        "body": "An eighth-floor two-bedroom inside the Address Residences hotel tower on The Walk. Sea view from the master bedroom, Dubai Marina from the living room, and a balcony over the beach. Residents use the pool, gym, private beach and the hotel's restaurants; the hotel infinity pool is open to residents for a separate fee. Both bathrooms have a bath as well as a shower, with a guest cloakroom off the hall.",
        "amenities": [
            "Private beach access", "Residents' pool", "Modern fitness centre",
            "24-hour concierge", "2 covered parking spaces", "Balcony with sea view",
            "Built-in wardrobes", "Indoor &amp; outdoor kids' play areas",
            "WiFi &amp; satellite TV", "Double-glazed windows", "Hotel restaurants on site",
            "CCTV &amp; security staff", "Central heating &amp; A/C", "Storage areas",
        ],
        "fine": "Added on top: 5% VAT, an AED 300 cleaning fee, AED 20 per night tourism fee for the first 30 nights, and an AED 5,000 refundable deposit. This rate was quoted for the previous month and is to be reconfirmed.",
    },
    {
        "slug": "marina-5242",
        "name": "5242 Tower 1",
        "area": "Dubai Marina",
        "address": "5242 Tower 1, 5242 Towers, Dubai Marina, Dubai",
        "price": "AED 19,999",
        "priceLabel": "per month",
        "priceShort": "AED 19,999",
        "size": "1,187 sqft",
        "bedBath": "2 / 2 + WC",
        "status": "Now",
        "standout": "Highest outlook of the four, on the Marina's outer edge where the water opens to open sea.",
        "pills": ["Fully furnished", "All utilities included"],
        "specs": [
            ["Bedrooms", "2"],
            ["Bathrooms", "2 + powder"],
            ["Size", "1,187 sqft"],
            ["Furnishing", "Furnished"],
            ["Parking", "1 space"],
            ["Tower", "52 storeys"],
        ],
        "body": "A high-floor two-bedroom in 5242 Tower 1, on the outer edge of the Marina where the water opens out to <strong>open sea</strong>. Full-height glazing runs the length of the living room, with contemporary furnishing throughout, a high-spec kitchen and a master bathroom with a separate tub. Electricity, water, chiller, internet and cable TV are all bundled into the monthly rate, so there is nothing further to set up on arrival.",
        "amenities": [
            "Resort-style pool", "Fitness centre", "Kids' play area",
            "24/7 concierge", "1 parking space", "Balcony", "Guest powder room",
            "Electricity, water &amp; chiller included", "High-speed internet",
            "Premium cable TV", "Housekeeping available", "Waste disposal",
            "CCTV &amp; security staff", "Centrally air-conditioned",
        ],
        "fine": "Utilities, internet and television are included in the monthly figure. Rate is the current monthly quote and moves with season and length of stay.",
    },
]


SALES = [
    {
        "slug": "maritime-901",
        "name": "Maritime City 901",
        "area": "Dubai Maritime City",
        "address": "Unit 901, Dubai Maritime City, Dubai (Omniyat)",
        "price": "AED 3,400,000",
        "priceLabel": "purchase price",
        "priceShort": "AED 3.40m",
        "size": "1,399 sqft",
        "bedBath": "2 / 4",
        "status": "To confirm",
        "standout": "The lowest price on the list, delivered fully furnished &mdash; and four bathrooms to two bedrooms, which no other option comes close to.",
        "pills": ["Fully furnished", "Floor plan included"],
        "specs": [
            ["Bedrooms", "2"],
            ["Bathrooms", "4"],
            ["Size", "1,399 sqft"],
            ["Area", "130 sqm"],
            ["Furnishing", "Furnished"],
            ["Unit", "901"],
        ],
        "body": "A fully furnished two-bedroom on the ninth floor at Dubai Maritime City, developed by Omniyat. The 130 sqm plan opens into a single living and dining space behind a full-height glazed wall, with a fitted kitchen with integrated appliances off it. It carries <strong>four bathrooms to two bedrooms</strong> &mdash; far more than anything else on this list &mdash; including a principal bathroom with a freestanding tub. The balcony faces straight out over open water to the city skyline. A floor plan is included as the last image in the gallery.",
        "amenities": [
            "Panoramic sea views", "Sea-facing balcony", "Fully furnished throughout",
            "Four bathrooms", "Freestanding bath", "Fitted kitchen with integrated appliances",
            "Floor-to-ceiling glazing", "Built-in wardrobes", "Swimming pool",
            "Landscaped pool deck", "Floor plan available",
        ],
        "fine": "Figures taken from the developer brochure, which quotes AED 3,400,000 (USD 925,800). Handover status and annual service charge are still to be confirmed. Add to the purchase price: 4% Dubai Land Department transfer fee, trustee registration and agency commission.",
    },
    {
        "slug": "aquamarine-palm",
        "name": "Aquamarine 603",
        "area": "Palm Jumeirah",
        "address": "Unit 603, Aquamarine, Tiara Residences, Palm Jumeirah, Dubai",
        "price": "AED 4,950,000",
        "priceLabel": "purchase price",
        "priceShort": "AED 4.95m",
        "size": "To confirm",
        "bedBath": "To confirm",
        "status": "Vacant",
        "standout": "Vacant now, with photographs available. Bathrooms have just been redone.",
        "pills": ["Open &amp; vacant", "Price negotiable", "New bathrooms"],
        "specs": [
            ["Unit", "603"],
            ["Bathrooms", "New"],
            ["Status", "Vacant"],
            ["Furnishing", "To confirm"],
            ["Price", "Negotiable"],
            ["Position", "Sea facing"],
        ],
        "body": "Vacant and open to view now, on the sea-facing side of Aquamarine at Tiara Residences. An open living and dining space runs to a full-height glazed wall with a separate fitted kitchen off it, and the balcony spans the width of the apartment, looking over the resort pool and beach to the Marina skyline. The <strong>bathrooms have just been redone</strong>.",
        "amenities": [
            "Private beach access", "Resort swimming pool", "Landscaped gardens",
            "Full-width sea-facing balcony", "New marble bathrooms", "Walk-in wardrobe",
            "Island kitchen", "Sliding glass kitchen partition", "Built-in wardrobes",
            "Covered parking", "24-hour security", "Concierge",
        ],
        "fine": "Vacant and open to view. Asking price is negotiable. Bedroom, bathroom and floor-area figures are being confirmed with the seller. Add to the purchase price: 4% Dubai Land Department transfer fee, trustee registration and agency commission.",
    },
    {
        "slug": "marina-gate",
        "name": "Marina Gate 2",
        "area": "Dubai Marina",
        "address": "Marina Gate 2, Marina Gate, Dubai Marina, Dubai",
        "price": "AED 5,650,000",
        "priceLabel": "purchase price",
        "priceShort": "AED 5.65m",
        "size": "1,810 sqft",
        "bedBath": "3 / 4",
        "status": "Ready",
        "standout": "Full marina frontage from a high floor, and the widest set of building amenities on the sale list.",
        "pills": ["Ready to transfer", "High floor"],
        "specs": [
            ["Bedrooms", "3"],
            ["Bathrooms", "4"],
            ["Size", "1,810 sqft"],
            ["Furnishing", "Unfurnished"],
            ["Status", "Ready"],
            ["Parking", "Covered"],
        ],
        "body": "A high-floor three-bedroom in Marina Gate 2 with <strong>full marina views</strong> down the length of the living space. Open-plan living and dining behind floor-to-ceiling glazing, a fitted kitchen, built-in wardrobes throughout and a deep balcony. The building opens directly onto Marina Walk, and its amenity deck is the most complete on the sale list &mdash; infinity pool, gym, steam and sauna, basketball and paddle tennis.",
        "amenities": [
            "Infinity swimming pool", "Fully equipped gymnasium", "Direct Marina Walk access",
            "Basketball court", "Paddle tennis court", "Children&rsquo;s pool &amp; play area",
            "BBQ area", "Steam &amp; sauna", "24/7 security &amp; concierge",
            "Covered parking", "Centrally air-conditioned", "Pets allowed",
        ],
        "fine": "Add to the purchase price: 4% Dubai Land Department transfer fee, trustee registration and agency commission. Annual service charge to be confirmed.",
    },
    {
        "slug": "balqis-palm",
        "name": "Balqis Residence",
        "area": "Palm Jumeirah",
        "address": "Balqis Residence Block C, Kingdom of Sheba, The Crescent, Palm Jumeirah, Dubai",
        "price": "AED 6,200,000",
        "priceLabel": "purchase price",
        "priceShort": "AED 6.20m",
        "size": "2,328 sqft",
        "bedBath": "3+M / 5",
        "status": "Tenanted",
        "standout": "Largest of the four, west-facing on the Crescent for sea and sunset &mdash; and already producing rental income.",
        "pills": ["Currently tenanted", "Sea &amp; sunset view"],
        "specs": [
            ["Bedrooms", "3 + maid"],
            ["Bathrooms", "5"],
            ["Size", "2,328 sqft"],
            ["Furnishing", "Furnished"],
            ["Status", "Tenanted"],
            ["Aspect", "West / sea"],
        ],
        "body": "A refurbished three-bedroom plus maid&rsquo;s room on the Crescent at Balqis Residence, facing west so the living space and main bedrooms take the <strong>sea and the sunset</strong>. At 2,328 sqft it is the largest option here: open-plan living and dining behind floor-to-ceiling glazing, a large private balcony, a fitted kitchen and built-in wardrobes throughout. Private beach, resort pools and landscaped gardens sit within the development.",
        "amenities": [
            "Private beach access", "Resort-style swimming pools", "Fitness facilities",
            "Landscaped gardens", "Walking paths", "Large private balcony",
            "Maid&rsquo;s room with storage", "Floor-to-ceiling windows", "Built-in wardrobes",
            "Covered parking", "24-hour security", "Concierge services",
        ],
        "fine": "Currently tenanted &mdash; as an investment it earns from day one, but an owner wanting to move in would need to serve 12 months&rsquo; notice through a notary or registered post under Dubai&rsquo;s vacating procedure. Add to the purchase price: 4% Dubai Land Department transfer fee, trustee registration and agency commission.",
    },
    {
        "slug": "lavie-jbr",
        "name": "La Vie",
        "area": "Jumeirah Beach Residence",
        "address": "La Vie, Jumeirah Beach Residence, Dubai",
        "price": "AED 6,600,000",
        "priceLabel": "purchase price",
        "priceShort": "AED 6.60m",
        "size": "1,411 sqft",
        "bedBath": "2 / 2",
        "status": "To confirm",
        "standout": "Full, unobstructed sea view from a high floor &mdash; nothing between the balcony and the water.",
        "pills": ["Fully furnished", "No obstructions"],
        "specs": [
            ["Bedrooms", "2"],
            ["Internal", "1,274 sqft"],
            ["Balcony", "137 sqft"],
            ["Total area", "1,411 sqft"],
            ["Furnishing", "Furnished"],
            ["Floor", "High"],
        ],
        "body": "A fully furnished two-bedroom on a high floor at La Vie in JBR, with a <strong>full, unobstructed sea view</strong> &mdash; no neighbouring tower breaks the water from the balcony. The living and dining space opens onto a usable balcony rather than a token ledge, and the apartment carries 1,411 sqft in total (1,274 sqft internal, 137 sqft of balcony). Furnished throughout, with a separate laundry room off the entrance hall.",
        "amenities": [
            "Full sea view", "Usable balcony", "Fully furnished throughout",
            "Separate laundry room", "Built-in wardrobes", "Fitted kitchen",
            "High floor", "JBR beachfront location",
        ],
        "fine": "Bathroom count and building amenities are being confirmed with the seller. Add to the purchase price: 4% Dubai Land Department transfer fee, trustee registration and agency commission.",
    },
    {
        "slug": "kempinski-creek",
        "name": "Kempinski Residences",
        "area": "Al Jaddaf &middot; The Creek",
        "address": "Kempinski Residences The Creek, Dubai Healthcare City Phase 2, Al Jaddaf, Dubai",
        "price": "AED 7,500,000",
        "priceLabel": "purchase price",
        "priceShort": "AED 7.50m",
        "size": "1,925 sqft",
        "bedBath": "2+M / 4",
        "status": "Vacant",
        "standout": "Branded residence with hotel servicing &mdash; Miele kitchen, spa, Pilates studio and cinema in the building. Creek-side rather than beach.",
        "pills": ["Vacant &amp; never occupied", "Branded residence"],
        "specs": [
            ["Bedrooms", "2 + maid"],
            ["Bathrooms", "4"],
            ["Size", "1,925 sqft"],
            ["Furnishing", "Furnished"],
            ["Status", "Vacant"],
            ["Handover", "Ready"],
        ],
        "body": "A brand-new, never-occupied two-bedroom plus maid&rsquo;s room in the Kempinski Residences at The Creek. Natural oak floors, an open-plan kitchen with <strong>Miele appliances</strong>, built-in wardrobes throughout, and an oversized balcony looking across the water and park to the Downtown skyline. Services run hotel-side: spa, gym, Pilates studio, cinema, restaurant and coffee shop all sit within the building. Worth noting this one is on the creek at Al Jaddaf rather than on the beach.",
        "amenities": [
            "Miele kitchen appliances", "Natural oak flooring", "Oversized balcony",
            "Creek &amp; Downtown views", "Built-in wardrobes", "Gym &amp; spa",
            "Pilates studio", "Cinema", "On-site restaurant", "Coffee shop",
            "Swimming pool", "Kids&rsquo; play area", "Secure covered parking", "Concierge",
        ],
        "fine": "Vacant and ready to occupy on transfer. Add to the purchase price: 4% Dubai Land Department transfer fee, trustee registration and agency commission. Annual service charge to be confirmed.",
    },
]

PANELS = [
    {
        "id": "rent",
        "eyebrow": "Four options &middot; Dubai waterfront",
        "h1": "Two-bedroom residences on the water",
        "lede": "Each of the four below is a furnished two-bedroom with a sea or marina outlook and beach access, available on a monthly basis. They are grouped here so you can compare them side by side &mdash; full photography, specification and running costs for each.",
        "criteria": ["2 bedrooms", "Furnished", "Sea or marina view", "Beach access",
                     "AED 15,000 &ndash; 19,999 / month"],
        "columns": ["Residence", "Monthly", "Size", "Bed / Bath", "Available", "Stands out for"],
        "props": RENTALS,
    },
    {
        "id": "sale",
        "eyebrow": "Six options &middot; Purchase",
        "h1": "Ready apartments to buy",
        "lede": "Six options across the Palm, JBR, the Marina, Maritime City and the Creek. Two are vacant, one is tenanted and earning from the day it changes hands. The figures below are asking prices; transfer fee and commission sit on top of each.",
        "criteria": ["Palm Jumeirah &middot; JBR &middot; Marina &middot; Maritime City &middot; The Creek",
                     "AED 3.40m &ndash; 7.50m", "2 &ndash; 3 bedrooms"],
        "columns": ["Residence", "Price", "Size", "Bed / Bath", "Status", "Stands out for"],
        "props": SALES,
    },
]


def encode(slug, n):
    path = os.path.join(PHOTO_DIR, slug, "%02d.jpg" % n)
    im = Image.open(path).convert("RGB")
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def main():
    photos = {slug: [encode(slug, n) for n in nums] for slug, nums in SELECTION.items()}

    videos = {}
    for slug, meta in VIDEOS.items():
        with open(os.path.join(HERE, "video", meta["file"]), "rb") as fh:
            src = "data:video/mp4;base64," + base64.b64encode(fh.read()).decode()
        with open(os.path.join(HERE, "video", meta["poster"]), "rb") as fh:
            poster = "data:image/jpeg;base64," + base64.b64encode(fh.read()).decode()
        videos[slug] = {"src": src, "poster": poster}

    with open(os.path.join(HERE, "rafestates-wordmark.png"), "rb") as fh:
        logo = "data:image/png;base64," + base64.b64encode(fh.read()).decode()

    with open(os.path.join(HERE, "template.html"), encoding="utf-8") as fh:
        html = fh.read()

    html = (html
            .replace("__PHOTOS__", json.dumps(photos))
            .replace("__VIDEOS__", json.dumps(videos))
            .replace("__PANELS__", json.dumps(PANELS))
            .replace("__LOGO__", logo)
            .replace("__DATE__", CONFIRMED_DATE)
            .replace("__CTA_HREF__", CONTACT["href"])
            .replace("__CONTACT_LINES__", "".join("<span>%s</span>" % l for l in CONTACT["lines"])))

    out = os.path.join(HERE, "shortlist.html")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(html)

    total = sum(len(v) for v in photos.values())
    print("wrote %s - %d photos, %d video(s), %.2f MB"
          % (out, total, len(videos), os.path.getsize(out) / 1e6))


if __name__ == "__main__":
    main()
