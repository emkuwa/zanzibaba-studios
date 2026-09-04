export type StockMediaType = 'photo' | 'video' | 'drone';
export type StockLicense = 'editorial' | 'commercial' | 'both';
export type StockResolution = '4k' | 'hd' | 'high-res';

export interface StockAsset {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: StockMediaType;
  license: StockLicense;
  resolution: StockResolution;
  category: string;
  location: string;
  tags: string[];
  duration?: string;
  dimensions?: string;
  image: string;
  thumbnail?: string;
  featured?: boolean;
  collection?: string;
}

export const STOCK_CATEGORIES = [
  { slug: 'tourism', label: 'Tourism & Hospitality', count: 48 },
  { slug: 'construction', label: 'Construction & Development', count: 32 },
  { slug: 'real-estate', label: 'Real Estate', count: 28 },
  { slug: 'infrastructure', label: 'Roads & Infrastructure', count: 24 },
  { slug: 'culture', label: 'Culture & Heritage', count: 36 },
  { slug: 'marine', label: 'Ocean & Marine', count: 30 },
  { slug: 'business', label: 'Business & Economy', count: 22 },
  { slug: 'events', label: 'Events & Festivals', count: 26 },
  { slug: 'aerial', label: 'Aerial & Drone', count: 40 },
] as const;

export const STOCK_LOCATIONS = [
  'Stone Town',
  'Paje Beach',
  'Nungwi',
  'Mnemba Atoll',
  'Forodhani Gardens',
  'Jozani Forest',
  'Kendwa',
  'Kizimkazi',
  'The Rock Restaurant',
  'Darajani Market',
] as const;

export const STOCK_COLLECTIONS = [
  { slug: 'zanzibar-at-dawn', title: 'Zanzibar at Dawn', description: 'Golden hour and sunrise footage across the island', assetCount: 24 },
  { slug: 'stone-town-life', title: 'Stone Town Life', description: 'The streets, markets and people of Stone Town', assetCount: 32 },
  { slug: 'underwater-world', title: 'Underwater World', description: 'Marine life, coral reefs and ocean adventures', assetCount: 18 },
  { slug: 'building-zanzibar', title: 'Building Zanzibar', description: 'Construction and development transforming the island', assetCount: 22 },
  { slug: 'festival-season', title: 'Festival Season', description: 'Events, celebrations and cultural performances', assetCount: 20 },
] as const;

export const STOCK_ASSETS: StockAsset[] = [
  {
    id: 'zb-s001',
    slug: 'stone-town-rooftop-sunset',
    title: 'Stone Town Rooftop Sunset',
    description: 'Cinematic aerial view of Stone Town rooftops bathed in golden sunset light. Historic architecture meets the Indian Ocean horizon.',
    type: 'drone',
    license: 'both',
    resolution: '4k',
    category: 'tourism',
    location: 'Stone Town',
    tags: ['sunset', 'aerial', 'rooftop', 'historic', 'golden hour'],
    duration: '0:45',
    dimensions: '3840 × 2160',
    image: '/images/hero-zanzibar-coastline.jpg',
    featured: true,
    collection: 'zanzibar-at-dawn',
  },
  {
    id: 'zb-s002',
    slug: 'mnemba-atoll-turquoise',
    title: 'Mnemba Atoll Turquoise Waters',
    description: 'Pristine aerial footage of Mnemba Atoll\'s crystal-clear turquoise waters and coral reef systems.',
    type: 'drone',
    license: 'both',
    resolution: '4k',
    category: 'marine',
    location: 'Mnemba Atoll',
    tags: ['aerial', 'ocean', 'turquoise', 'reef', 'pristine'],
    duration: '1:12',
    dimensions: '3840 × 2160',
    image: '/images/drone-zanzibar-aerial.jpg',
    featured: true,
    collection: 'underwater-world',
  },
  {
    id: 'zb-s003',
    slug: 'forodhani-night-market',
    title: 'Forodhani Night Market',
    description: 'Vibrant evening atmosphere at Forodhani Gardens night market. Lanterns, street food and local life.',
    type: 'video',
    license: 'editorial',
    resolution: '4k',
    category: 'culture',
    location: 'Forodhani Gardens',
    tags: ['night market', 'food', 'culture', 'lanterns', 'local life'],
    duration: '2:30',
    dimensions: '3840 × 2160',
    image: '/images/tourism-lifestyle-zanzibar.jpg',
    featured: true,
    collection: 'stone-town-life',
  },
  {
    id: 'zb-s004',
    slug: 'paje-kitesurf-action',
    title: 'Paje Kitesurf Action',
    description: 'Dynamic kitesurfing footage at Paje Beach. Crystal-clear shallow waters and consistent trade winds.',
    type: 'video',
    license: 'both',
    resolution: '4k',
    category: 'tourism',
    location: 'Paje Beach',
    tags: ['kitesurf', 'action', 'sport', 'beach', 'adventure'],
    duration: '0:58',
    dimensions: '3840 × 2160',
    image: '/images/zanzibar-beach-couple.jpg',
    collection: 'festival-season',
  },
  {
    id: 'zb-s005',
    slug: 'luxury-resort-infinity-pool',
    title: 'Luxury Resort Infinity Pool',
    description: 'Editorial photograph of a luxury resort infinity pool overlooking the Indian Ocean at golden hour.',
    type: 'photo',
    license: 'commercial',
    resolution: 'high-res',
    category: 'tourism',
    location: 'Nungwi',
    tags: ['resort', 'luxury', 'pool', 'golden hour', 'editorial'],
    dimensions: '6000 × 4000',
    image: '/images/luxury-resort-zanzibar.jpg',
    featured: true,
    collection: 'zanzibar-at-dawn',
  },
  {
    id: 'zb-s006',
    slug: 'spice-farm-harvest',
    title: 'Spice Farm Harvest',
    description: 'Close-up documentary footage of spice harvesting on a Zanzibar spice farm. Clove, cinnamon and vanilla.',
    type: 'video',
    license: 'editorial',
    resolution: '4k',
    category: 'culture',
    location: 'Jozani Forest',
    tags: ['spice', 'farm', 'harvest', 'documentary', 'agriculture'],
    duration: '3:15',
    dimensions: '3840 × 2160',
    image: '/images/about-zanzibaba-studios.jpg',
    collection: 'stone-town-life',
  },
  {
    id: 'zb-s007',
    slug: 'traditional-dhow-sunset',
    title: 'Traditional Dhow at Sunset',
    description: 'Silhouette of a traditional Zanzibar dhow sailing across the sunset horizon.',
    type: 'photo',
    license: 'both',
    resolution: 'high-res',
    category: 'culture',
    location: 'Nungwi',
    tags: ['dhow', 'sunset', 'sailing', 'traditional', 'silhouette'],
    dimensions: '6000 × 4000',
    image: '/images/luxury-dhow-sunset.jpg',
    featured: true,
  },
  {
    id: 'zb-s008',
    slug: 'stone-town-carved-doors',
    title: 'Stone Town Carved Doors',
    description: 'Detailed photography series of the iconic carved wooden doors of Stone Town, a UNESCO World Heritage Site.',
    type: 'photo',
    license: 'both',
    resolution: 'high-res',
    category: 'culture',
    location: 'Stone Town',
    tags: ['doors', 'architecture', 'heritage', 'wood', 'detail'],
    dimensions: '6000 × 4000',
    image: '/images/stone-town-aerial.jpg',
    collection: 'stone-town-life',
  },
  {
    id: 'zb-s009',
    slug: 'coral-reef-underwater',
    title: 'Coral Reef Underwater',
    description: 'Vibrant coral reef ecosystem teeming with tropical fish off the coast of Mnemba Atoll.',
    type: 'video',
    license: 'both',
    resolution: '4k',
    category: 'marine',
    location: 'Mnemba Atoll',
    tags: ['coral', 'reef', 'underwater', 'fish', 'marine'],
    duration: '1:45',
    dimensions: '3840 × 2160',
    image: '/images/drone-zanzibar-aerial.jpg',
    collection: 'underwater-world',
  },
  {
    id: 'zb-s010',
    slug: 'hotel-beachfront-editorial',
    title: 'Hotel Beachfront Editorial',
    description: 'Premium editorial photograph of a luxury beachfront hotel with white sand and palm trees.',
    type: 'photo',
    license: 'commercial',
    resolution: 'high-res',
    category: 'real-estate',
    location: 'Paje Beach',
    tags: ['hotel', 'beachfront', 'luxury', 'editorial', 'palm trees'],
    dimensions: '6000 × 4000',
    image: '/images/luxury-villa-zanzibar.jpg',
  },
  {
    id: 'zb-s011',
    slug: 'darajani-market-morning',
    title: 'Darajani Market Morning',
    description: 'Early morning atmosphere at Darajani Market, the main market of Stone Town. Fish, produce and local vendors.',
    type: 'video',
    license: 'editorial',
    resolution: 'hd',
    category: 'culture',
    location: 'Darajani Market',
    tags: ['market', 'morning', 'local', 'fish', 'vendors'],
    duration: '2:10',
    dimensions: '1920 × 1080',
    image: '/images/zanzibar-hotel-pool.jpg',
    collection: 'stone-town-life',
  },
  {
    id: 'zb-s012',
    slug: 'ocean-aerial-reef-line',
    title: 'Ocean Aerial — Reef Line',
    description: 'Breathtaking aerial perspective of the reef line where the deep blue meets turquoise shallows.',
    type: 'drone',
    license: 'both',
    resolution: '4k',
    category: 'marine',
    location: 'Mnemba Atoll',
    tags: ['aerial', 'reef', 'ocean', 'turquoise', 'blue'],
    duration: '0:38',
    dimensions: '3840 × 2160',
    image: '/images/hero-zanzibar-coastline.jpg',
    featured: true,
    collection: 'underwater-world',
  },
  {
    id: 'zb-s013',
    slug: 'construction-site-tower-crane',
    title: 'Construction Site — Tower Crane',
    description: 'Time-lapse style footage of construction activity with tower crane against the Zanzibar skyline.',
    type: 'video',
    license: 'editorial',
    resolution: '4k',
    category: 'construction',
    location: 'Stone Town',
    tags: ['construction', 'crane', 'development', 'skyline'],
    duration: '1:20',
    dimensions: '3840 × 2160',
    image: '/images/media-crew-production.jpg',
    collection: 'building-zanzibar',
  },
  {
    id: 'zb-s014',
    slug: 'sauti-za-busara-festival',
    title: 'Sauti za Busara Festival',
    description: 'Live music performance at the Sauti za Busara music festival in Stone Town. Electric atmosphere.',
    type: 'video',
    license: 'editorial',
    resolution: '4k',
    category: 'events',
    location: 'Stone Town',
    tags: ['festival', 'music', 'live', 'performance', 'culture'],
    duration: '4:00',
    dimensions: '3840 × 2160',
    image: '/images/event-production-zanzibar.jpg',
    collection: 'festival-season',
  },
  {
    id: 'zb-s015',
    slug: 'aerial-beach-palm-trees',
    title: 'Aerial — Beach & Palm Trees',
    description: 'Classic Zanzibar aerial view: white sand beach, coconut palms and turquoise ocean.',
    type: 'drone',
    license: 'both',
    resolution: '4k',
    category: 'aerial',
    location: 'Kendwa',
    tags: ['aerial', 'beach', 'palm', 'turquoise', 'classic'],
    duration: '0:52',
    dimensions: '3840 × 2160',
    image: '/images/hero-zanzibar-coastline.jpg',
    featured: true,
    collection: 'zanzibar-at-dawn',
  },
  {
    id: 'zb-s016',
    slug: 'zanzibar-hotel-pool-villa',
    title: 'Zanzibar Hotel Pool Villa',
    description: 'Private pool villa at a luxury Zanzibar resort. Overwater cabana and ocean view.',
    type: 'photo',
    license: 'commercial',
    resolution: 'high-res',
    category: 'real-estate',
    location: 'Nungwi',
    tags: ['villa', 'pool', 'luxury', 'ocean view', 'resort'],
    dimensions: '6000 × 4000',
    image: '/images/zanzibar-hotel-pool.jpg',
  },
  {
    id: 'zb-s017',
    slug: 'stone-town-alleyway',
    title: 'Stone Town Alleyway',
    description: 'Narrow winding alleyway in Stone Town with historic architecture and dappled light.',
    type: 'photo',
    license: 'both',
    resolution: 'high-res',
    category: 'culture',
    location: 'Stone Town',
    tags: ['alleyway', 'historic', 'architecture', 'light', 'narrow'],
    dimensions: '6000 × 4000',
    image: '/images/stone-town-aerial.jpg',
    collection: 'stone-town-life',
  },
  {
    id: 'zb-s018',
    slug: 'coastal-road-aerial',
    title: 'Coastal Road Aerial',
    description: 'Aerial footage of coastal roads winding along the Zanzibar shoreline with ocean views.',
    type: 'drone',
    license: 'both',
    resolution: '4k',
    category: 'infrastructure',
    location: 'Stone Town',
    tags: ['road', 'coastal', 'aerial', 'infrastructure', 'shoreline'],
    duration: '1:05',
    dimensions: '3840 × 2160',
    image: '/images/drone-zanzibar-aerial.jpg',
    collection: 'building-zanzibar',
  },
  {
    id: 'zb-s019',
    slug: 'marine-dolphin-encounter',
    title: 'Marine — Dolphin Encounter',
    description: 'Wild dolphins swimming in the waters off Kizimkazi. Natural behavior in their habitat.',
    type: 'video',
    license: 'editorial',
    resolution: '4k',
    category: 'marine',
    location: 'Kizimkazi',
    tags: ['dolphin', 'marine', 'wildlife', 'ocean', 'natural'],
    duration: '2:45',
    dimensions: '3840 × 2160',
    image: '/images/drone-zanzibar-aerial.jpg',
    collection: 'underwater-world',
  },
  {
    id: 'zb-s020',
    slug: 'ziff-film-festival',
    title: 'ZIFF Film Festival',
    description: 'Red carpet and screenings at the Zanzibar International Film Festival. Cultural celebration.',
    type: 'video',
    license: 'editorial',
    resolution: '4k',
    category: 'events',
    location: 'Stone Town',
    tags: ['film', 'festival', 'ZIFF', 'red carpet', 'culture'],
    duration: '3:30',
    dimensions: '3840 × 2160',
    image: '/images/event-production-zanzibar.jpg',
    collection: 'festival-season',
  },
];

export const STOCK_COLLECTIONS_FULL = STOCK_COLLECTIONS.map((c) => ({
  ...c,
  assets: STOCK_ASSETS.filter((a) => a.collection === c.slug),
}));

export function getStockAsset(slug: string) {
  return STOCK_ASSETS.find((a) => a.slug === slug);
}

export function getStockAssetsByCategory(category: string) {
  return STOCK_ASSETS.filter((a) => a.category === category);
}

export function getStockAssetsByType(type: StockMediaType) {
  return STOCK_ASSETS.filter((a) => a.type === type);
}

export function getFeaturedStockAssets() {
  return STOCK_ASSETS.filter((a) => a.featured);
}

export function searchStockAssets(query: string) {
  const q = query.toLowerCase();
  return STOCK_ASSETS.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.location.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
  );
}
