export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Motion', href: '#motion' },
  { label: 'About', href: '#about' },
  { label: 'Receipts', href: '#receipts' },
];

export const hero = {
  headline: ['Short-form', 'edits', 'and', 'motion', 'design'],
  headlineItalic: 'that get your brand watched.',
  // short enough to take in at a glance; the offer leads
  points: [
    'Three motion design videos for $300, not $2,500',
    'Work delivered within 48 hours',
    'Not happy? Full refund, no questions',
  ],
  primary: { label: 'Start a project' },
  secondary: { label: 'See the work', href: '#work' },
};

// the headline already names the services, so these say something else
export const marqueeWords = [
  'Built to perform',
  'Proof, not promises',
  'Not just to post',
  'Made by one person',
  'Filmed, cut, posted',
  'Numbers over vanity',
];

export const about = {
  kicker: 'About',
  title: 'Podium is',
  titleItalic: 'me.',
  photo: '/images/abdul.jpg',
  photoAlt: 'Abdul-Rashid, founder of Podium',
  body: [
    "I'm Abdul-Rashid. I started Podium as a teenager, still at school, teaching myself to edit and learning the ins and outs of the marketing industry by working with clients around the world.",
    'Since then I have run content for a jewellery brand in Florida, a burger shop in Northampton, an estate agent in Dubai and a Twitch streamer. Same person every time. I film it, cut it, post it, and keep going until the numbers move.',
  ],
};

export const brands = {
  kicker: 'Brands',
  title: 'Worked with brands',
  titleItalic: 'across four countries.',
  // `shape` masks each source back to its own outline: the Instagram avatars
  // are circles sitting on a square of page background, the rest are wordmarks
  logos: [
    { name: 'Neptunes Engagement', src: '/images/logos/neptunes.png', shape: 'circle' },
    { name: 'Yumas Kitchen', src: '/images/logos/yumas.png', shape: 'circle' },
    { name: 'dchriiss', src: '/images/logos/dchriiss.png', shape: 'circle' },
    { name: 'RAF Estates', src: '/images/logos/rafestates.png', shape: 'circle' },
    { name: 'Easy Key Property Management', src: '/images/logos/easykey.png', shape: 'mark' },
    { name: 'EZuni', src: '/images/logos/ezuni.png', shape: 'mark' },
  ],
};

export const reel = [
  { title: 'MCP Motion', meta: 'Product animation', src: '/videos/mcp_motion_phone.mp4' },
  { title: 'Iced Tea', meta: 'Brand spot', src: '/videos/iced_tea.mp4' },
  { title: 'Ezuni Rebranding', meta: 'Identity in motion', src: '/videos/ezuni_rebranding.mp4' },
];

/**
 * Each case carries its own media. `kind` decides how a tile renders and
 * `ratio` how much room it takes: every tile in a row shares one height, so a
 * square or landscape piece simply sits wider than the portrait clips beside
 * it instead of being cropped to fit them.
 *
 * `stats` sit beside the name rather than trailing the sentence, so the number
 * that matters reads as a figure instead of a footnote.
 */
export const cases = [
  {
    sector: 'Jewellery, USA',
    name: 'Neptunes Blvd',
    stats: [
      { value: '9,700', label: 'Instagram followers' },
      { value: '1,000+', label: 'TikTok followers' },
    ],
    summary:
      'Daily posting across four platforms alongside a full content calendar built from scratch, reaching new follower milestones on both TikTok and Instagram.',
    media: [
      {
        kind: 'image',
        src: '/images/receipt-neptunes-1.jpg',
        alt: 'Neptunes Blvd ring campaign',
        ratio: 'square',
      },
      {
        kind: 'image',
        src: '/images/receipt-neptunes-2.jpg',
        alt: 'Neptunes Blvd jewellery campaign',
        ratio: 'square',
      },
      {
        kind: 'video',
        src: '/videos/work/neptunes-01.mp4',
        poster: '/images/posters/neptunes-01.jpg',
      },
    ],
  },
  {
    sector: 'Fast food, UK',
    name: 'Yumas',
    stats: [],
    summary:
      'Supported the edit on multiple long-form and short-form videos, lifting production quality and the way the finished cuts hold attention.',
    media: [
      { kind: 'youtube', id: 'EGz2cs4asoo', title: 'Yumas long-form edit', ratio: 'wide' },
      {
        kind: 'image',
        src: '/images/case-yumas-profile.jpg',
        alt: 'Yumas Kitchen Instagram profile',
        ratio: 'wide',
      },
    ],
  },
  {
    sector: 'Streamer',
    name: 'dchriiss',
    stats: [{ value: '1,500', label: 'Twitch followers gained' }],
    summary:
      'Short and long-form content produced weekly, testing different trends, formats and fonts, resulting in 1,500 new Twitch followers.',
    media: [
      { kind: 'video', src: '/videos/work/dchriiss-01.mp4', poster: '/images/posters/dchriiss-01.jpg' },
      { kind: 'video', src: '/videos/work/dchriiss-02.mp4', poster: '/images/posters/dchriiss-02.jpg' },
      { kind: 'video', src: '/videos/work/dchriiss-03.mp4', poster: '/images/posters/dchriiss-03.jpg' },
      { kind: 'video', src: '/videos/work/dchriiss-04.mp4', poster: '/images/posters/dchriiss-04.jpg' },
      { kind: 'video', src: '/videos/work/dchriiss-05.mp4', poster: '/images/posters/dchriiss-05.jpg' },
    ],
  },
  {
    sector: 'Real estate, Dubai',
    name: 'Agent Short-form',
    stats: [{ value: '10', label: 'videos delivered' }],
    summary:
      'Ten polished short-form videos with subtitles, overlays and cover images, shot across two professional sessions run end to end alongside freelance editors.',
    media: [
      { kind: 'video', src: '/videos/work/estates-01.mp4', poster: '/images/posters/estates-01.jpg' },
      { kind: 'video', src: '/videos/work/estates-02.mp4', poster: '/images/posters/estates-02.jpg' },
      { kind: 'video', src: '/videos/work/estates-03.mp4', poster: '/images/posters/estates-03.jpg' },
      { kind: 'video', src: '/videos/work/estates-04.mp4', poster: '/images/posters/estates-04.jpg' },
      { kind: 'video', src: '/videos/work/estates-05.mp4', poster: '/images/posters/estates-05.jpg' },
    ],
  },
];

export const receiptsRowA = [
  '/images/receipt-nep-amethyst.jpg',
  '/images/receipt-ezuni-1.jpg',
  '/images/receipt-07.jpg',
  '/images/receipt-dubai.jpg',
  '/images/receipt-smokepepper.jpg',
  '/images/receipt-ezuni-2.jpg',
  '/images/receipt-08.jpg',
  '/images/receipt-14.jpg',
];

export const receiptsRowB = [
  '/images/receipt-nep-sale.jpg',
  '/images/receipt-ezuni-3.jpg',
  '/images/receipt-15.jpg',
  '/images/receipt-nep-elegant.jpg',
  '/images/receipt-11.jpg',
  '/images/receipt-16.jpg',
  '/images/receipt-ezuni-4.jpg',
  '/images/receipt-13.jpg',
];

export const contact = [
  {
    label: 'WhatsApp',
    detail: 'Fastest reply, message me directly',
    href: 'https://wa.me/971585507368',
    external: true,
  },
  {
    label: 'Instagram',
    detail: '@podium_est2023',
    href: 'https://instagram.com/podium_est2023',
    external: true,
  },
  {
    label: 'Email',
    detail: 'podiumest2023@gmail.com',
    href: 'mailto:podiumest2023@gmail.com',
    external: false,
  },
];

export const contactEmail = 'podiumest2023@gmail.com';

/**
 * Where the enquiry form posts. Paste a Web3Forms access key here and the form
 * sends straight to the inbox; leave it blank and it falls back to opening a
 * pre-filled email, so the form is never a dead end.
 */
export const FORM_ACCESS_KEY = 'ec125a81-9572-4eb1-875f-2970ef34b6f4';
