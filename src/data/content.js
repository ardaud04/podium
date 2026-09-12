export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Screenshots', href: '#receipts' },
];

export const hero = {
  headline: ['Short-form', 'edits', 'and', 'motion', 'design'],
  headlineItalic: 'that get your brand watched.',
  // short enough to take in at a glance; the offer leads
  points: ['Work delivered within 48 hours', 'Not happy? Full refund, no questions'],
  primary: { label: 'Start a project' },
  secondary: { label: 'See the work', href: '#work' },
};

export const about = {
  kicker: 'About',
  title: 'Abdul-Rashid Daud',
  photo: '/images/abdul.jpg',
  photoAlt: 'Abdul-Rashid, founder of Podium',
  bullets: [
    'Started Podium as a teenager, still at school.',
    'Run content for a jewellery brand in Florida, a burger shop in Northampton and an estate agent in Dubai.',
    'Same person every time: I film it, cut it, post it, and keep going until the numbers move.',
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

/**
 * Two services, flipped between rather than shown as separate case studies.
 * `kind` decides how a tile renders and `ratio` how much room it takes: every
 * tile in a row shares one height, so a square or landscape piece simply sits
 * wider than the portrait clips beside it instead of being cropped to fit.
 */
export const work = {
  title: 'Selected work',
  tabs: [
    {
      id: 'editing',
      label: 'Video editing',
      media: [
        {
          kind: 'video',
          src: '/videos/work/neptunes-01.mp4',
          poster: '/images/posters/neptunes-01.jpg',
          caption: 'Neptunes Blvd',
        },
        {
          kind: 'video',
          src: '/videos/easyuni-uk-us-launch.mp4',
          poster: '/images/posters/easyuni-launch.jpg',
          caption: 'EasyUni — UK/US launch',
        },
        { kind: 'video', src: '/videos/work/dchriiss-01.mp4', poster: '/images/posters/dchriiss-01.jpg', caption: 'dchriiss' },
        { kind: 'video', src: '/videos/work/dchriiss-02.mp4', poster: '/images/posters/dchriiss-02.jpg', caption: 'dchriiss' },
        { kind: 'video', src: '/videos/work/dchriiss-03.mp4', poster: '/images/posters/dchriiss-03.jpg', caption: 'dchriiss' },
        { kind: 'video', src: '/videos/work/dchriiss-04.mp4', poster: '/images/posters/dchriiss-04.jpg', caption: 'dchriiss' },
        { kind: 'video', src: '/videos/work/dchriiss-05.mp4', poster: '/images/posters/dchriiss-05.jpg', caption: 'dchriiss' },
        { kind: 'video', src: '/videos/work/estates-01.mp4', poster: '/images/posters/estates-01.jpg', caption: 'Agent Short-form' },
        { kind: 'video', src: '/videos/work/estates-02.mp4', poster: '/images/posters/estates-02.jpg', caption: 'Agent Short-form' },
        { kind: 'video', src: '/videos/work/estates-03.mp4', poster: '/images/posters/estates-03.jpg', caption: 'Agent Short-form' },
        { kind: 'video', src: '/videos/work/estates-04.mp4', poster: '/images/posters/estates-04.jpg', caption: 'Agent Short-form' },
        { kind: 'video', src: '/videos/work/estates-05.mp4', poster: '/images/posters/estates-05.jpg', caption: 'Agent Short-form' },
      ],
    },
    {
      id: 'motion',
      label: 'Motion design',
      media: [
        { title: 'MCP Motion', meta: 'Product animation', src: '/videos/mcp_motion_phone.mp4' },
        { title: 'Iced Tea', meta: 'Brand spot', src: '/videos/iced_tea.mp4' },
        { title: 'EasyUni', meta: 'Motion design', src: '/videos/ezuni_motion_v2.mp4' },
      ],
    },
  ],
};

export const receiptsRowA = [
  '/images/receipt-nep-amethyst.jpg',
  '/images/receipt-ezuni-1.jpg',
  '/images/receipt-07.jpg',
  '/images/receipt-dubai.jpg',
  '/images/receipt-smokepepper.jpg',
  '/images/receipt-ezuni-2.jpg',
  '/images/receipt-08.jpg',
  '/images/receipt-14.jpg',
  '/images/receipt-neptunes-1.jpg',
  '/images/ezuni-marketing-1.jpg',
  '/images/ezuni-marketing-3.jpg',
  '/images/ezuni-marketing-5.jpg',
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
  '/images/receipt-neptunes-2.jpg',
  '/images/ezuni-marketing-2.jpg',
  '/images/ezuni-marketing-4.jpg',
  '/images/ezuni-marketing-6.jpg',
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
