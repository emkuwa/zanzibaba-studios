// Service catalog for SEO pages
// 7 services × 10 locations × 8 industries = 560 unique SEO pages per locale

export type ServiceSlug =
  | 'video-production'
  | 'photography'
  | 'drone'
  | 'hotel-photography'
  | 'content-creation'
  | 'live-streaming'
  | 'events';

export type Service = {
  slug: ServiceSlug;
  // i18n keys (used to look up translations)
  nameKey: string;
  shortKey: string;
  descKey: string;
  // SEO
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'video-production',
    nameKey: 'videoProduction',
    shortKey: 'videoProductionShort',
    descKey: 'videoProductionDesc',
    keywords: ['zanzibar video production', 'tourism video zanzibar', 'cinematic video zanzibar'],
  },
  {
    slug: 'photography',
    nameKey: 'photography',
    shortKey: 'photographyShort',
    descKey: 'photographyDesc',
    keywords: ['zanzibar photographer', 'tourism photography zanzibar', 'professional photography zanzibar'],
  },
  {
    slug: 'drone',
    nameKey: 'drone',
    shortKey: 'droneShort',
    descKey: 'droneDesc',
    keywords: ['zanzibar drone services', 'drone zanzibar', 'aerial filming zanzibar'],
  },
  {
    slug: 'hotel-photography',
    nameKey: 'hotelPhotography',
    shortKey: 'hotelPhotographyShort',
    descKey: 'hotelPhotographyDesc',
    keywords: ['zanzibar hotel photography', 'resort photography zanzibar', 'hotel content creation zanzibar'],
  },
  {
    slug: 'content-creation',
    nameKey: 'contentCreation',
    shortKey: 'contentCreationShort',
    descKey: 'contentCreationDesc',
    keywords: ['zanzibar content creation', 'social media content zanzibar', 'tourism content zanzibar'],
  },
  {
    slug: 'live-streaming',
    nameKey: 'liveStreaming',
    shortKey: 'liveStreamingShort',
    descKey: 'liveStreamingDesc',
    keywords: ['zanzibar live streaming', 'live event broadcast zanzibar', 'multi-camera live zanzibar'],
  },
  {
    slug: 'events',
    nameKey: 'events',
    shortKey: 'eventsShort',
    descKey: 'eventsDesc',
    keywords: ['zanzibar event coverage', 'event filming zanzibar', 'festival coverage zanzibar'],
  },
];

export type LocationSlug =
  | 'zanzibar'
  | 'paje'
  | 'nungwi'
  | 'kendwa'
  | 'kiwengwa'
  | 'jambiani'
  | 'matemwe'
  | 'stone-town'
  | 'bwejuu'
  | 'michamvi';

export type Location = {
  slug: LocationSlug;
  // i18n
  nameKey: string; // 'locationZanzibar'
  regionKey: string; // 'regionZanzibar'
  descKey: string; // 'descZanzibar'
  // Geo
  lat: number;
  lng: number;
};

export const LOCATIONS: Location[] = [
  { slug: 'zanzibar', nameKey: 'zanzibar', regionKey: 'regionZanzibar', descKey: 'descZanzibar', lat: -6.1659, lng: 39.2026 },
  { slug: 'paje', nameKey: 'paje', regionKey: 'regionZanzibar', descKey: 'descPaje', lat: -6.2667, lng: 39.5333 },
  { slug: 'nungwi', nameKey: 'nungwi', regionKey: 'regionZanzibar', descKey: 'descNungwi', lat: -5.7265, lng: 39.2985 },
  { slug: 'kendwa', nameKey: 'kendwa', regionKey: 'regionZanzibar', descKey: 'descKendwa', lat: -5.7450, lng: 39.2860 },
  { slug: 'kiwengwa', nameKey: 'kiwengwa', regionKey: 'regionZanzibar', descKey: 'descKiwengwa', lat: -5.9833, lng: 39.3667 },
  { slug: 'jambiani', nameKey: 'jambiani', regionKey: 'regionZanzibar', descKey: 'descJambiani', lat: -6.3167, lng: 39.5500 },
  { slug: 'matemwe', nameKey: 'matemwe', regionKey: 'regionZanzibar', descKey: 'descMatemwe', lat: -5.8667, lng: 39.3500 },
  { slug: 'stone-town', nameKey: 'stoneTown', regionKey: 'regionZanzibar', descKey: 'descStoneTown', lat: -6.1629, lng: 39.1939 },
  { slug: 'bwejuu', nameKey: 'bwejuu', regionKey: 'regionZanzibar', descKey: 'descBwejuu', lat: -6.2333, lng: 39.5500 },
  { slug: 'michamvi', nameKey: 'michamvi', regionKey: 'regionZanzibar', descKey: 'descMichamvi', lat: -6.1833, lng: 39.4667 },
];

export type IndustrySlug =
  | 'hotels'
  | 'resorts'
  | 'villas'
  | 'tours'
  | 'investors'
  | 'restaurants'
  | 'ngos'
  | 'government';

export type Industry = {
  slug: IndustrySlug;
  nameKey: string; // 'indHotels'
  descKey: string; // 'indHotelsDesc'
  // Audience-specific angle
  painKey: string; // 'indHotelsPain'
  goalKey: string; // 'indHotelsGoal'
};

export const INDUSTRIES: Industry[] = [
  { slug: 'hotels', nameKey: 'hotels', descKey: 'hotelsDesc', painKey: 'hotelsPain', goalKey: 'hotelsGoal' },
  { slug: 'resorts', nameKey: 'resorts', descKey: 'resortsDesc', painKey: 'resortsPain', goalKey: 'resortsGoal' },
  { slug: 'villas', nameKey: 'villas', descKey: 'villasDesc', painKey: 'villasPain', goalKey: 'villasGoal' },
  { slug: 'tours', nameKey: 'tours', descKey: 'toursDesc', painKey: 'toursPain', goalKey: 'toursGoal' },
  { slug: 'investors', nameKey: 'investors', descKey: 'investorsDesc', painKey: 'investorsPain', goalKey: 'investorsGoal' },
  { slug: 'restaurants', nameKey: 'restaurants', descKey: 'restaurantsDesc', painKey: 'restaurantsPain', goalKey: 'restaurantsGoal' },
  { slug: 'ngos', nameKey: 'ngos', descKey: 'ngosDesc', painKey: 'ngosPain', goalKey: 'ngosGoal' },
  { slug: 'government', nameKey: 'government', descKey: 'governmentDesc', painKey: 'governmentPain', goalKey: 'governmentGoal' },
];

// 7 × 10 × 8 = 560 unique combinations
export const COMBINATIONS = SERVICES.flatMap((s) =>
  LOCATIONS.flatMap((l) =>
    INDUSTRIES.map((i) => ({
      service: s,
      location: l,
      industry: i,
    }))
  )
);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
