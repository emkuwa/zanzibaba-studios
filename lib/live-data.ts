export type LiveStatus = 'live' | 'premiere' | 'latest' | 'documentary' | 'archive';
export type LiveCategory = 'tourism' | 'construction' | 'real-estate' | 'infrastructure' | 'culture' | 'marine' | 'business' | 'events';

export interface LiveContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: LiveStatus;
  category: LiveCategory;
  duration?: string;
  date: string;
  image: string;
  featured?: boolean;
  tags: string[];
  series?: string;
  episodes?: number;
  views?: string;
}

export const LIVE_CATEGORIES: { slug: LiveCategory; label: string; icon: string }[] = [
  { slug: 'tourism', label: 'Tourism', icon: '🏝️' },
  { slug: 'construction', label: 'Construction & Development', icon: '🏗️' },
  { slug: 'real-estate', label: 'Real Estate', icon: '🏠' },
  { slug: 'infrastructure', label: 'Roads & Infrastructure', icon: '🛣️' },
  { slug: 'culture', label: 'Culture', icon: '🎭' },
  { slug: 'marine', label: 'Ocean & Marine', icon: '🌊' },
  { slug: 'business', label: 'Business', icon: '💼' },
  { slug: 'events', label: 'Events', icon: '🎉' },
];

export const LIVE_CONTENT: LiveContent[] = [
  // LIVE NOW
  {
    id: 'zb-l001',
    slug: 'stone-town-golden-hour-live',
    title: 'Stone Town — Golden Hour Live',
    description: 'Live broadcast from the rooftops of Stone Town as the sun sets over the Indian Ocean. Watch the ancient city come alive at golden hour.',
    status: 'live',
    category: 'tourism',
    date: '2026-09-04',
    image: '/images/hero-zanzibar-coastline.jpg',
    featured: true,
    tags: ['live', 'sunset', 'stone town', 'rooftop'],
    views: '2.4K',
  },
  // PREMIERES
  {
    id: 'zb-l002',
    slug: 'building-zanzibar-episode-3',
    title: 'Building Zanzibar — Ep. 3: The New Skyline',
    description: 'The third installment of our documentary series follows the towers and resorts reshaping Zanzibar\'s coastline.',
    status: 'premiere',
    category: 'construction',
    duration: '24:30',
    date: '2026-09-10',
    image: '/images/media-crew-production.jpg',
    featured: true,
    tags: ['documentary', 'construction', 'skyline', 'development'],
    series: 'Building Zanzibar',
    episodes: 5,
    views: '12.8K',
  },
  {
    id: 'zb-l003',
    slug: 'zanzibar-from-above-episode-5',
    title: 'Zanzibar From Above — Ep. 5: The Reef Line',
    description: 'Aerial exploration of Zanzibar\'s coral reef systems and the marine conservation efforts protecting them.',
    status: 'premiere',
    category: 'marine',
    duration: '18:45',
    date: '2026-09-14',
    image: '/images/drone-zanzibar-aerial.jpg',
    featured: true,
    tags: ['documentary', 'aerial', 'marine', 'conservation'],
    series: 'Zanzibar From Above',
    episodes: 8,
    views: '18.2K',
  },
  // LATEST FILMS
  {
    id: 'zb-l004',
    slug: 'island-stories-forodhani-chefs',
    title: 'Island Stories — The Chefs of Forodhani',
    description: 'Meet the families behind Zanzibar\'s most iconic night market. Three generations of street food tradition.',
    status: 'latest',
    category: 'culture',
    duration: '12:20',
    date: '2026-09-01',
    image: '/images/tourism-lifestyle-zanzibar.jpg',
    featured: true,
    tags: ['documentary', 'food', 'culture', 'forodhani'],
    series: 'Island Stories',
    episodes: 12,
    views: '8.6K',
  },
  {
    id: 'zb-l005',
    slug: 'changing-zanzibar-infrastructure',
    title: 'Changing Zanzibar — New Roads, New Future',
    description: 'How modern infrastructure is transforming connectivity and commerce across the Zanzibar archipelago.',
    status: 'latest',
    category: 'infrastructure',
    duration: '15:40',
    date: '2026-08-28',
    image: '/images/drone-zanzibar-aerial.jpg',
    tags: ['documentary', 'infrastructure', 'roads', 'development'],
    series: 'Changing Zanzibar',
    episodes: 4,
    views: '6.2K',
  },
  {
    id: 'zb-l006',
    slug: 'inside-zanzibar-spice-route',
    title: 'Inside Zanzibar — The Spice Route',
    description: 'An intimate journey through Zanzibar\'s spice farms, from clove forests to vanilla plantations.',
    status: 'latest',
    category: 'culture',
    duration: '20:15',
    date: '2026-08-25',
    image: '/images/about-zanzibaba-studios.jpg',
    tags: ['documentary', 'spice', 'agriculture', 'heritage'],
    series: 'Inside Zanzibar',
    episodes: 6,
    views: '11.4K',
  },
  // DOCUMENTARIES
  {
    id: 'zb-l007',
    slug: 'building-zanzibar-full-series',
    title: 'Building Zanzibar — Full Series',
    description: 'Follow the architects, developers and workers transforming Zanzibar\'s skyline. 5-part documentary series.',
    status: 'documentary',
    category: 'construction',
    duration: '1:45:00',
    date: '2026-07-15',
    image: '/images/media-crew-production.jpg',
    featured: true,
    tags: ['documentary', 'construction', 'architecture', 'series'],
    series: 'Building Zanzibar',
    episodes: 5,
    views: '45.2K',
  },
  {
    id: 'zb-l008',
    slug: 'zanzibar-from-above-full-series',
    title: 'Zanzibar From Above — Full Series',
    description: '8-part aerial documentary revealing Zanzibar\'s hidden landscapes, reefs, and communities from above.',
    status: 'documentary',
    category: 'marine',
    duration: '2:10:00',
    date: '2026-06-20',
    image: '/images/drone-zanzibar-aerial.jpg',
    featured: true,
    tags: ['documentary', 'aerial', 'landscape', 'series'],
    series: 'Zanzibar From Above',
    episodes: 8,
    views: '62.8K',
  },
  {
    id: 'zb-l009',
    slug: 'island-stories-full-series',
    title: 'Island Stories — Full Series',
    description: '12 intimate portraits of the people who make Zanzibar extraordinary. From fishermen to festival directors.',
    status: 'documentary',
    category: 'culture',
    duration: '3:20:00',
    date: '2026-05-10',
    image: '/images/tourism-lifestyle-zanzibar.jpg',
    featured: true,
    tags: ['documentary', 'people', 'culture', 'series'],
    series: 'Island Stories',
    episodes: 12,
    views: '78.4K',
  },
  // PROJECT UPDATES
  {
    id: 'zb-l010',
    slug: 'mnemba-reef-restoration',
    title: 'Mnemba Reef Restoration Update',
    description: 'Latest progress on the coral reef restoration project at Mnemba Atoll — month 6 update.',
    status: 'latest',
    category: 'marine',
    duration: '8:30',
    date: '2026-09-02',
    image: '/images/drone-zanzibar-aerial.jpg',
    tags: ['update', 'conservation', 'marine', 'reef'],
  },
  {
    id: 'zb-l011',
    slug: 'stone-town-heritage-bridge',
    title: 'Stone Town Heritage Bridge Construction',
    description: 'Progress update on the new pedestrian heritage bridge connecting Stone Town to the waterfront.',
    status: 'latest',
    category: 'construction',
    duration: '6:15',
    date: '2026-08-30',
    image: '/images/media-crew-production.jpg',
    tags: ['update', 'construction', 'heritage', 'bridge'],
  },
  // ARCHIVE
  {
    id: 'zb-l012',
    slug: 'sauti-za-busara-2025',
    title: 'Sauti za Busara 2025 — Full Coverage',
    description: 'Complete coverage of the Sauti za Busara music festival 2025. Performances, interviews and behind-the-scenes.',
    status: 'archive',
    category: 'events',
    duration: '45:20',
    date: '2025-02-15',
    image: '/images/event-production-zanzibar.jpg',
    tags: ['festival', 'music', 'archive', 'live'],
    views: '34.6K',
  },
  {
    id: 'zb-l013',
    slug: 'zanzibar-international-film-festival-2025',
    title: 'ZIFF 2025 — Highlights',
    description: 'Highlights from the 2025 Zanzibar International Film Festival. Red carpet, screenings and awards.',
    status: 'archive',
    category: 'events',
    duration: '22:10',
    date: '2025-07-20',
    image: '/images/event-production-zanzibar.jpg',
    tags: ['film', 'festival', 'ZIFF', 'archive'],
    views: '21.3K',
  },
  {
    id: 'zb-l014',
    slug: 'changing-zanzibar-episode-1',
    title: 'Changing Zanzibar — Ep. 1: The Waterfront',
    description: 'The first episode explores the transformation of Zanzibar\'s waterfront districts.',
    status: 'archive',
    category: 'infrastructure',
    duration: '16:45',
    date: '2025-09-10',
    image: '/images/stone-town-aerial.jpg',
    series: 'Changing Zanzibar',
    episodes: 4,
    tags: ['documentary', 'waterfront', 'development', 'archive'],
    views: '15.8K',
  },
];

export const LIVE_ORIGINALS = [
  {
    id: 'zb-o001',
    slug: 'building-zanzibar',
    title: 'Building Zanzibar',
    description: 'Following the architects, developers and workers reshaping Zanzibar\'s skyline. 5-part documentary series.',
    episodes: 5,
    status: 'ongoing',
    category: 'construction' as const,
    image: '/images/media-crew-production.jpg',
    featured: true,
  },
  {
    id: 'zb-o002',
    slug: 'zanzibar-from-above',
    title: 'Zanzibar From Above',
    description: '8-part aerial documentary revealing the island\'s hidden landscapes, reefs and communities from above.',
    episodes: 8,
    status: 'ongoing',
    category: 'marine' as const,
    image: '/images/drone-zanzibar-aerial.jpg',
    featured: true,
  },
  {
    id: 'zb-o003',
    slug: 'island-stories',
    title: 'Island Stories',
    description: '12 intimate portraits of the people who make Zanzibar extraordinary.',
    episodes: 12,
    status: 'ongoing',
    category: 'culture' as const,
    image: '/images/tourism-lifestyle-zanzibar.jpg',
    featured: true,
  },
  {
    id: 'zb-o004',
    slug: 'changing-zanzibar',
    title: 'Changing Zanzibar',
    description: 'How modern infrastructure and development are transforming the archipelago.',
    episodes: 4,
    status: 'completed',
    category: 'infrastructure' as const,
    image: '/images/stone-town-aerial.jpg',
    featured: false,
  },
  {
    id: 'zb-o005',
    slug: 'inside-zanzibar',
    title: 'Inside Zanzibar',
    description: 'Deep dives into Zanzibar\'s spice heritage, marine ecosystems, and cultural traditions.',
    episodes: 6,
    status: 'ongoing',
    category: 'culture' as const,
    image: '/images/about-zanzibaba-studios.jpg',
    featured: false,
  },
];

export function getLiveContent(slug: string) {
  return LIVE_CONTENT.find((c) => c.slug === slug);
}

export function getLiveByStatus(status: LiveStatus) {
  return LIVE_CONTENT.filter((c) => c.status === status);
}

export function getLiveByCategory(category: LiveCategory) {
  return LIVE_CONTENT.filter((c) => c.category === category);
}

export function getFeaturedLive() {
  return LIVE_CONTENT.filter((c) => c.featured);
}

export function getOriginal(slug: string) {
  return LIVE_ORIGINALS.find((o) => o.slug === slug);
}
