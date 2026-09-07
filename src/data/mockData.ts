import { Destination, TourPackage, Hotel, Flight, ItineraryPlan, Review, Booking, PhotoGalleryItem, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin',
    name: 'Alexander Wright',
    email: 'admin@voyage.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: '2025-01-15',
    status: 'active'
  },
  {
    id: 'usr_traveler',
    name: 'Emma Watson',
    email: 'emma@example.com',
    role: 'traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    createdAt: '2025-02-10',
    status: 'active'
  },
  {
    id: 'usr_marco',
    name: 'Marco Rossi',
    email: 'marco.rossi@travel.it',
    role: 'traveler',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: '2025-03-01',
    status: 'active'
  },
  {
    id: 'usr_sarah',
    name: 'Sarah Chen',
    email: 'sarah.chen@techglobal.com',
    role: 'traveler',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    createdAt: '2025-03-12',
    status: 'active'
  }
];

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest_kyoto',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    tagline: 'Ancient temples, bamboo groves, and timeless Japanese elegance',
    description: 'Kyoto is the cultural heart of Japan, boasting over a thousand Buddhist temples, classical gardens, imperial palaces, and traditional wooden machiya houses. Experience the serene harmony of traditional tea ceremonies and seasonal cherry blossoms.',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.95,
    reviewCount: 342,
    avgCostPerDay: 210,
    bestSeason: 'Mar - May & Oct - Nov',
    categories: ['Culture', 'Romantic'],
    highlights: ['Arashiyama Bamboo Forest', 'Fushimi Inari Shrine', 'Kinkaku-ji Golden Pavilion', 'Gion Geisha District'],
    weather: { temp: '19°C', condition: 'Mild & Sunny' }
  },
  {
    id: 'dest_amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    tagline: 'Dramatic cliffside villages overlooking shimmering Tyrrhenian waters',
    description: 'A 50-kilometer stretch of mountainous coastline along the Sorrentine Peninsula in southern Italy. Marvel at pastel-hued villages clinging to cliffs, fragrant lemon groves, and azure Mediterranean coves.',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.92,
    reviewCount: 289,
    avgCostPerDay: 320,
    bestSeason: 'May - Sep',
    categories: ['Romantic', 'Luxury', 'Nature'],
    highlights: ['Positano Cliffside Views', 'Private Boat to Capri', 'Path of the Gods Hike', 'Ravello Gardens'],
    weather: { temp: '24°C', condition: 'Mediterranean Sun' }
  },
  {
    id: 'dest_zermatt',
    name: 'Zermatt & Swiss Alps',
    country: 'Switzerland',
    continent: 'Europe',
    tagline: 'Iconic Matterhorn vistas, pristine glaciers, and world-class alpine resorts',
    description: 'Nestled at the foot of the pyramid-shaped Matterhorn, Zermatt is an idyllic car-free mountain haven. From alpine skiing to summer hiking trails beside crystalline glacial lakes, it represents high mountain serenity at its finest.',
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.97,
    reviewCount: 198,
    avgCostPerDay: 380,
    bestSeason: 'Dec - Mar & Jul - Sep',
    categories: ['Nature', 'Adventure', 'Luxury'],
    highlights: ['Gornergrat Panoramic Railway', 'Matterhorn Glacier Paradise', 'Sunnegga Lake Trail', 'Gourmet Alpine Dining'],
    weather: { temp: '12°C', condition: 'Crisp Alpine' }
  },
  {
    id: 'dest_bali',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    tagline: 'Verdant rice terraces, spiritual wellness retreats, and coastal tranquility',
    description: 'Bali captivates with tropical lushness, volcanic mountain peaks, ancient Hindu water temples, and vibrant coastal surf breaks. Discover holistic wellness in Ubud or sunset dining in Uluwatu.',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.88,
    reviewCount: 512,
    avgCostPerDay: 130,
    bestSeason: 'Apr - Oct',
    categories: ['Nature', 'Culture', 'Romantic'],
    highlights: ['Tegallalang Rice Terraces', 'Uluwatu Sunset Temple', 'Mount Batur Sunrise Trek', 'Canggu Coastal Cafes'],
    weather: { temp: '28°C', condition: 'Tropical Warmth' }
  },
  {
    id: 'dest_santorini',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    tagline: 'Whitewashed architecture perched over an immense volcanic caldera',
    description: 'One of the Cyclades islands in the Aegean Sea, Santorini is globally celebrated for its dramatic cliffside panoramas, whitewashed cube houses with cobalt-blue domes, and world-renowned golden sunsets in Oia.',
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.91,
    reviewCount: 420,
    avgCostPerDay: 290,
    bestSeason: 'May - Oct',
    categories: ['Romantic', 'Luxury'],
    highlights: ['Oia Sunset Castle', 'Caldera Catamaran Cruise', 'Akrotiri Prehistoric Site', 'Volcanic Red Beach'],
    weather: { temp: '26°C', condition: 'Clear Sky' }
  },
  {
    id: 'dest_serengeti',
    name: 'Serengeti & Ngorongoro',
    country: 'Tanzania',
    continent: 'Africa',
    tagline: 'The timeless great wildlife migration across golden savannahs',
    description: 'Witness nature in its purest grandeur across the endless plains of the Serengeti and the enclosed crater of Ngorongoro. Home to the Big Five, magnificent lion prides, and luxury canvas lodges under starlit African skies.',
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.98,
    reviewCount: 165,
    avgCostPerDay: 450,
    bestSeason: 'Jun - Oct & Jan - Feb',
    categories: ['Adventure', 'Nature', 'Luxury'],
    highlights: ['Great Migration River Crossing', 'Ngorongoro Crater Floor Safari', 'Dawn Hot Air Balloon Safari', 'Maasai Cultural Exchange'],
    weather: { temp: '27°C', condition: 'Golden Horizon' }
  },
  {
    id: 'dest_reykjavik',
    name: 'Reykjavík & Southern Coast',
    country: 'Iceland',
    continent: 'Europe',
    tagline: 'Land of fire and ice, dancing auroras, and thundering waterfalls',
    description: 'Iceland reveals nature in dramatic contrast: thermal lagoons steaming in sub-zero air, glistening black sand beaches, ice caves inside colossal glaciers, and ethereal emerald Northern Lights dancing across the Arctic night.',
    coverImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.93,
    reviewCount: 310,
    avgCostPerDay: 280,
    bestSeason: 'Sep - Apr (Auroras) or Jun - Aug (Midnight Sun)',
    categories: ['Nature', 'Adventure'],
    highlights: ['Blue Lagoon Geothermal Spa', 'Reynisfjara Black Sand Beach', 'Vatnajökull Glacier Hike', 'Northern Lights Expedition'],
    weather: { temp: '7°C', condition: 'Crisp Breeze' }
  },
  {
    id: 'dest_patagonia',
    name: 'Patagonia & Torres del Paine',
    country: 'Chile & Argentina',
    continent: 'Americas',
    tagline: 'Granite spires, turquoise glacial lakes, and windswept wild frontiers',
    description: 'At the southern tip of South America lies Patagonia, one of Earth’s final wilderness frontiers. Pristine fjords, massive hanging glaciers, and the soaring granite peaks of Torres del Paine invite world-class exploration.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.96,
    reviewCount: 142,
    avgCostPerDay: 260,
    bestSeason: 'Nov - Mar',
    categories: ['Adventure', 'Nature'],
    highlights: ['Base of the Towers Trek', 'Perito Moreno Glacier Walk', 'Lake Pehoe Boat Crossing', 'Gaucho Ranch Experiences'],
    weather: { temp: '14°C', condition: 'Dynamic Wind' }
  }
];

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: 'pkg_japan_zen',
    title: 'Kyoto & Tokyo: Zen Heritage & Modern Harmony',
    destinationId: 'dest_kyoto',
    destinationName: 'Kyoto & Tokyo',
    country: 'Japan',
    durationDays: 8,
    durationNights: 7,
    groupSize: 'Small Group (Max 10)',
    price: 2450,
    originalPrice: 2890,
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    overview: 'An exquisite 8-day journey through the cultural and aesthetic treasures of Japan. Experience private temple viewings in Kyoto, master tea ceremonies, traditional ryokan lodging with private onsen, and bullet train transit through Mount Fuji vistas.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kyoto & Welcome Tea Ceremony',
        description: 'Check in to a boutique traditional ryokan in historic Gion. Evening orientation and private match tea ceremony led by a tea master.',
        activities: ['Airport Transfer & Ryokan Check-in', 'Private Urasenke Tea Ceremony', 'Welcome Kaiseki Dinner']
      },
      {
        day: 2,
        title: 'Arashiyama Bamboo Forest & Tenryu-ji Temple',
        description: 'Morning walk through early bamboo groves before crowds arrive. Explore Zen rock gardens and stroll along the Oi River.',
        activities: ['Sunrise bamboo grove walk', 'Zen meditation session at Tenryu-ji', 'Sagawa art museum visit']
      },
      {
        day: 3,
        title: 'Fushimi Inari Torii Path & Sake Distilleries',
        description: 'Hike through thousands of vermilion torii gates winding up sacred Mount Inari, followed by artisanal sake tasting in Fushimi.',
        activities: ['Mountain shrine hiking', 'Tasting flight at Gekkeikan', 'Craft ceramic workshop']
      },
      {
        day: 4,
        title: 'Shinkansen Bullet Train to Hakone Onsen',
        description: 'Ride the Tokaido Shinkansen with views of Mt. Fuji. Relax in natural hot spring mineral waters surrounded by cedar forest.',
        activities: ['First-class Shinkansen journey', 'Hakone Open Air Museum', 'Private outdoor onsen bath']
      },
      {
        day: 5,
        title: 'Tokyo Contemporary Art & Ginza Architecture',
        description: 'Arrive in Tokyo. Architectural tour of Ginza and Omotesando, plus exclusive evening access to teamLab Planets digital art installation.',
        activities: ['Architectural walking tour', 'Sushi Omakase counter dinner', 'teamLab immersive exhibition']
      }
    ],
    inclusions: [
      '7 nights boutique accommodation (including 2 nights luxury Ryokan)',
      'All bullet train and private chartered transfers',
      'Daily curated breakfasts and 4 multi-course gourmet dinners',
      'Licensed English-speaking cultural master guide',
      'All temple and private museum admissions'
    ],
    exclusions: [
      'International airfare',
      'Personal travel insurance',
      'Discretionary guide gratuities'
    ],
    rating: 4.96,
    reviewCount: 88,
    featured: true,
    status: 'active',
    availableDates: ['2025-10-15', '2025-11-04', '2026-03-22', '2026-04-10']
  },
  {
    id: 'pkg_amalfi_sailing',
    title: 'Amalfi Coast Luxury Escape & Capri Catamaran',
    destinationId: 'dest_amalfi',
    destinationName: 'Amalfi Coast',
    country: 'Italy',
    durationDays: 6,
    durationNights: 5,
    groupSize: 'Small Group (Max 8)',
    price: 3100,
    originalPrice: 3500,
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    overview: 'Sail along the dramatic limestone cliffs of the Amalfi Coast, sip limoncello in sun-drenched clifftop lemon orchards, and enjoy a private chartered catamaran day trip to the iconic Faraglioni rocks of Capri.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Positano & Cliffside Welcome',
        description: 'Check in to a cliffside villa in Positano with sweeping views of the Tyrrhenian sea. Sunset spritz reception.',
        activities: ['Chauffeured Mercedes transfer from Naples', 'Villa check-in', 'Welcome aperitivo']
      },
      {
        day: 2,
        title: 'Private Catamaran Voyage to Capri',
        description: 'Full day aboard a 45ft private catamaran. Swim in the Green Cave, sail through the Faraglioni arches, and visit Capri town.',
        activities: ['Caldera cruise & snorkeling', 'Capri piazzetta lunch', 'Champagne toast at sunset']
      },
      {
        day: 3,
        title: 'Ravello Gardens & Classical Music Villa',
        description: 'Ascend to the hilltop town of Ravello. Tour the historic Villa Rufolo and Villa Cimbrone with panoramic cliff vistas.',
        activities: ['Villa Cimbrone Infinity Terrace', 'Organic lemon grove walk', 'Neapolitan cooking masterclass']
      }
    ],
    inclusions: [
      '5 nights cliffside boutique suite accommodation',
      'Private Capri catamaran charter with skipper and chef',
      'Chauffeured airport/station transfers',
      'Daily artisan breakfasts and wine tastings'
    ],
    exclusions: [
      'International flights',
      'Optional helicopter transfers'
    ],
    rating: 4.94,
    reviewCount: 64,
    featured: true,
    status: 'active',
    availableDates: ['2025-09-18', '2026-05-12', '2026-06-08', '2026-07-20']
  },
  {
    id: 'pkg_swiss_matterhorn',
    title: 'Swiss Alps Grand Alpine & Glacier Express',
    destinationId: 'dest_zermatt',
    destinationName: 'Zermatt & Swiss Alps',
    country: 'Switzerland',
    durationDays: 7,
    durationNights: 6,
    groupSize: 'Small Group (Max 12)',
    price: 2890,
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    overview: 'Traverse Switzerland’s most breathtaking peaks aboard the legendary Glacier Express. Stay in luxury chalet hotels in Zermatt and St. Moritz with guided hikes and panoramic cogwheel railway ascents.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Scenic Train to Zermatt',
        description: 'Scenic first-class Swiss rail journey into the car-free alpine village of Zermatt.',
        activities: ['Zurich Airport reception', 'First class Swiss Rail Pass', 'Zermatt walking tour']
      },
      {
        day: 2,
        title: 'Gornergrat Cogwheel & Matterhorn Reflections',
        description: 'Ride Europe’s highest open-air cogwheel railway up to 3,089m with views of 29 four-thousand-meter peaks.',
        activities: ['Gornergrat railway ascent', 'Riffelsee mirror lake hike', 'Fondue dinner']
      }
    ],
    inclusions: [
      '6 nights in 4-star and 5-star alpine hotels',
      'All Swiss Travel Pass 1st class train connections',
      'Glacier Express Excellence Class seat & 5-course menu',
      'Mountain guide for gentle alpine excursions'
    ],
    exclusions: [
      'Ski gear rentals (available on site)',
      'Airfare to Zurich'
    ],
    rating: 4.98,
    reviewCount: 52,
    featured: false,
    status: 'active',
    availableDates: ['2025-11-20', '2026-01-14', '2026-02-18', '2026-06-25']
  },
  {
    id: 'pkg_bali_wellness',
    title: 'Bali Serenity: Ubud Healing & Uluwatu Coast',
    destinationId: 'dest_bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    durationDays: 7,
    durationNights: 6,
    groupSize: 'Small Group (Max 10)',
    price: 1650,
    originalPrice: 1980,
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    overview: 'A restorative sanctuary retreat combining yoga pavilions in Ubud’s rainforest with private infinity pool villas overlooking the Indian Ocean in Uluwatu.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar & Ubud Rainforest Haven',
        description: 'Check in to a riverside wellness resort in Ubud. Flower bath ritual and sound healing session.',
        activities: ['Chauffeured transfer', 'Balinese cleansing ceremony', 'Organic welcome dinner']
      },
      {
        day: 2,
        title: 'Spiritual Water Temple & Jungle Treks',
        description: 'Early morning purification at Tirta Empul spring temple followed by herbalism walking tour in Ayung valley.',
        activities: ['Tirta Empul blessing', 'Campuhan Ridge walk', 'Ayurvedic massage']
      }
    ],
    inclusions: [
      '6 nights luxury villa accommodation with private plunge pools',
      'Daily gourmet organic breakfasts and wellness dining',
      'Unlimited daily yoga and meditation sessions',
      'Two traditional 90-minute Balinese spa treatments'
    ],
    exclusions: ['International flights', 'Alcoholic beverages'],
    rating: 4.91,
    reviewCount: 96,
    featured: true,
    status: 'active',
    availableDates: ['2025-10-05', '2025-11-12', '2026-02-01', '2026-04-18']
  }
];

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl_kyoto_hoshinoya',
    name: 'Aman & Hoshinoya Sanctuary',
    destinationId: 'dest_kyoto',
    destinationName: 'Kyoto',
    country: 'Japan',
    rating: 4.97,
    reviewCount: 178,
    pricePerNight: 480,
    address: 'Arashiyama, Ukyo Ward, Kyoto, Japan',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Cedar Onsen', 'Michelin Kaiseki Dining', 'Zen Garden Views', 'High-Speed Wi-Fi', 'Tea Lounge', 'Personal Concierge'],
    roomTypes: [
      {
        id: 'rm_zen_deluxe',
        name: 'Tatami Garden Pavilion',
        description: 'Spacious traditional tatami suite overlooking secluded moss gardens and Japanese maple groves.',
        pricePerNight: 480,
        maxGuests: 2,
        bedType: 'King Futon on Hinoki Wood'
      },
      {
        id: 'rm_onsen_suite',
        name: 'Private River Onsen Villa',
        description: 'Multi-room villa featuring an open-air natural thermal spring bath overlooking the Oi river valley.',
        pricePerNight: 780,
        maxGuests: 3,
        bedType: 'Master King Bed + Daybed'
      }
    ]
  },
  {
    id: 'htl_amalfi_sirenuse',
    name: 'Villa Marittima Luxury Suites',
    destinationId: 'dest_amalfi',
    destinationName: 'Amalfi Coast',
    country: 'Italy',
    rating: 4.94,
    reviewCount: 215,
    pricePerNight: 550,
    address: 'Via Cristoforo Colombo, Positano, Italy',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Cliffside Infinity Pool', 'Chauffeur Service', 'Complimentary Champagne', 'Terrace Breakfast', 'Private Boat Moorings', 'Spa by the Sea'],
    roomTypes: [
      {
        id: 'rm_sea_view',
        name: 'Deluxe Sea Panorama Suite',
        description: 'Hand-painted Vietri tile floors with an expansive private terrace directly facing Positano bay.',
        pricePerNight: 550,
        maxGuests: 2,
        bedType: 'Super King Bed'
      },
      {
        id: 'rm_caldera_suite',
        name: 'The Penthouse Vista Villa',
        description: 'Top-floor presidential suite with outdoor jacuzzi, sun loungers, and 270-degree Mediterranean horizon.',
        pricePerNight: 980,
        maxGuests: 4,
        bedType: '2 King Bedrooms'
      }
    ]
  },
  {
    id: 'htl_zermatt_mont_cervin',
    name: 'The Matterhorn Chalet & Spa',
    destinationId: 'dest_zermatt',
    destinationName: 'Zermatt',
    country: 'Switzerland',
    rating: 4.96,
    reviewCount: 140,
    pricePerNight: 420,
    address: 'Bahnhofstrasse, Zermatt, Switzerland',
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Matterhorn Direct Balcony', 'Heated Indoor & Outdoor Pool', 'Glacier Ice Sauna', 'Ski-in / Ski-out Access', 'Sommelier Wine Vault'],
    roomTypes: [
      {
        id: 'rm_alpine_deluxe',
        name: 'Matterhorn Alpine Room',
        description: 'Larchwood accents with floor-to-ceiling glass framing the Matterhorn peak.',
        pricePerNight: 420,
        maxGuests: 2,
        bedType: 'Swiss Comfort King'
      },
      {
        id: 'rm_chalet_suite',
        name: 'Grand Fireplace Penthouse',
        description: 'Open fireplace, private Finnish sauna, and heated stone terrace.',
        pricePerNight: 720,
        maxGuests: 3,
        bedType: 'Master King + Loft'
      }
    ]
  },
  {
    id: 'htl_bali_hanging_gardens',
    name: 'Ubud Rainforest Haven & Villas',
    destinationId: 'dest_bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    rating: 4.90,
    reviewCount: 298,
    pricePerNight: 260,
    address: 'Buahan, Payangan, Gianyar, Bali, Indonesia',
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Tiered Twin Infinity Pools', 'Organic Farm-to-Table', 'Jungle Spa Pavilions', 'Yoga Shala', 'Complimentary Afternoon High Tea'],
    roomTypes: [
      {
        id: 'rm_jungle_villa',
        name: 'Valley Pool Villa',
        description: 'Suspended over the Ayung river valley with private infinity plunge pool and open-air gazebo.',
        pricePerNight: 260,
        maxGuests: 2,
        bedType: 'Romantic Canopy King'
      },
      {
        id: 'rm_family_retreat',
        name: 'Royal Duplex Sanctuary',
        description: 'Two-tier villa with panoramic jungle views, private chef service, and butler.',
        pricePerNight: 490,
        maxGuests: 4,
        bedType: '2 King Suites'
      }
    ]
  }
];

export const INITIAL_FLIGHTS: Flight[] = [
  {
    id: 'flt_101',
    flightNumber: 'VY-802',
    airline: 'All Nippon Airways (ANA)',
    airlineCode: 'NH',
    origin: { code: 'SFO', city: 'San Francisco', airport: 'San Francisco Intl' },
    destination: { code: 'KIX', city: 'Osaka / Kyoto', airport: 'Kansai International' },
    departureTime: '11:20 AM',
    arrivalTime: '03:45 PM (+1)',
    duration: '11h 25m',
    stops: 0,
    cabinOptions: [
      { classType: 'Economy', price: 680, baggage: '1 checked bag (23kg)', perks: ['Complimentary meals', 'USB charging', 'Wi-Fi messaging'] },
      { classType: 'Premium', price: 1190, baggage: '2 checked bags (23kg)', perks: ['Extra legroom', 'Priority boarding', 'Premium dining'] },
      { classType: 'Business', price: 2750, baggage: '2 checked bags (32kg)', perks: ['Lie-flat 180° suite', 'Lounge access', 'Champagne service'] }
    ]
  },
  {
    id: 'flt_102',
    flightNumber: 'VY-414',
    airline: 'Swiss International Air Lines',
    airlineCode: 'LX',
    origin: { code: 'JFK', city: 'New York', airport: 'John F. Kennedy Intl' },
    destination: { code: 'ZRH', city: 'Zurich', airport: 'Zurich Kloten' },
    departureTime: '06:15 PM',
    arrivalTime: '08:00 AM (+1)',
    duration: '7h 45m',
    stops: 0,
    cabinOptions: [
      { classType: 'Economy', price: 590, baggage: '1 checked bag (23kg)', perks: ['Swiss chocolate & meals', 'Entertainment screen'] },
      { classType: 'Premium', price: 980, baggage: '2 checked bags (23kg)', perks: ['Wide seat with legrest', 'Amenity kit', 'Fast-track security'] },
      { classType: 'Business', price: 2450, baggage: '2 checked bags (32kg)', perks: ['Full flat bed', 'Swiss Senator Lounge', 'Five-course dining'] }
    ]
  },
  {
    id: 'flt_103',
    flightNumber: 'VY-620',
    airline: 'ITA Airways',
    airlineCode: 'AZ',
    origin: { code: 'LHR', city: 'London', airport: 'Heathrow Airport' },
    destination: { code: 'NAP', city: 'Naples / Amalfi', airport: 'Naples International' },
    departureTime: '08:40 AM',
    arrivalTime: '12:20 PM',
    duration: '2h 40m',
    stops: 0,
    cabinOptions: [
      { classType: 'Economy', price: 145, baggage: 'Cabin trolley included', perks: ['Standard seat', 'In-flight snack'] },
      { classType: 'Premium', price: 230, baggage: '1 checked bag (23kg)', perks: ['Front cabin seat', 'Priority baggage'] },
      { classType: 'Business', price: 420, baggage: '2 checked bags (32kg)', perks: ['Blocked middle seat', 'Lounge pass', 'Italian espresso & prosecco'] }
    ]
  },
  {
    id: 'flt_104',
    flightNumber: 'VY-990',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    origin: { code: 'LAX', city: 'Los Angeles', airport: 'Los Angeles Intl' },
    destination: { code: 'DPS', city: 'Bali', airport: 'Ngurah Rai Intl' },
    departureTime: '10:30 PM',
    arrivalTime: '08:15 AM (+2)',
    duration: '18h 45m',
    stops: 1,
    cabinOptions: [
      { classType: 'Economy', price: 740, baggage: '2 checked bags (23kg)', perks: ['World-class hospitality', 'Curated Asian & Western menus'] },
      { classType: 'Premium', price: 1350, baggage: '2 checked bags (35kg)', perks: ['Book the Cook selection', 'Dedicated check-in'] },
      { classType: 'Business', price: 3400, baggage: '2 checked bags (40kg)', perks: ['KrisFlyer Lounge', 'Direct aisle flatbed suite'] }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    targetType: 'destination',
    targetId: 'dest_kyoto',
    authorName: 'Eleanor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'August 24, 2025',
    title: 'A spiritual and visual awakening',
    comment: 'Waking at dawn to walk through the Arashiyama bamboo path with morning mist was one of the most serene moments of my life. Kyoto’s aesthetic restraint and reverence for nature is deeply inspiring.',
    verified: true,
    helpfulVotes: 38
  },
  {
    id: 'rev_2',
    targetType: 'package',
    targetId: 'pkg_amalfi_sailing',
    authorName: 'David Sterling',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'July 18, 2025',
    title: 'Flawless catamaran sailing around Capri',
    comment: 'Every detail from the cliffside villa check-in to the private catamaran was executed with white-glove precision. The captain knew the most secluded coves away from all crowds. 10/10.',
    verified: true,
    helpfulVotes: 29
  },
  {
    id: 'rev_3',
    targetType: 'destination',
    targetId: 'dest_zermatt',
    authorName: 'Kathryn Reed',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'June 30, 2025',
    title: 'The cleanest air and most majestic peaks',
    comment: 'The car-free village makes Zermatt feel so peaceful. Taking the Gornergrat train and watching the Matterhorn reflect in Riffelsee lake was pure alpine magic.',
    verified: true,
    helpfulVotes: 17
  },
  {
    id: 'rev_4',
    targetType: 'hotel',
    targetId: 'htl_kyoto_hoshinoya',
    authorName: 'Kenji Takahashi',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'May 14, 2025',
    title: 'Hinoki scent, quiet gardens and unforgettable kaiseki',
    comment: 'Arriving by wooden boat up the river sets the tone immediately. The staff anticipates every need without ever intruding. Exceptional cedar onsen.',
    verified: true,
    helpfulVotes: 24
  }
];

export const INITIAL_ITINERARIES: ItineraryPlan[] = [
  {
    id: 'itin_japan_dream',
    userId: 'usr_traveler',
    title: 'Kyoto Cultural Immersion: 4-Day Journey',
    destinationName: 'Kyoto, Japan',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    startDate: '2025-10-18',
    endDate: '2025-10-22',
    totalBudget: 1450,
    createdAt: '2025-08-10',
    items: [
      {
        id: 'iti_1',
        day: 1,
        timeSlot: 'Morning',
        activity: 'Fushimi Inari Taisha Sunrise Ascent',
        location: 'Fushimi Ward, Kyoto',
        cost: 0,
        notes: 'Arrive by 6:30 AM to beat the mid-morning groups. Wear comfortable walking shoes for the 4km mountain circuit.'
      },
      {
        id: 'iti_2',
        day: 1,
        timeSlot: 'Afternoon',
        activity: 'Traditional Matcha Ceremony & Gion Machiya Walk',
        location: 'Gion District',
        cost: 45,
        notes: 'Reserved private session with master Morita. Respect photography rules in preservation alleys.'
      },
      {
        id: 'iti_3',
        day: 1,
        timeSlot: 'Evening',
        activity: 'Pontocho Alley River Deck Dining (Kawayuka)',
        location: 'Kamogawa Riverfront',
        cost: 85,
        notes: 'Seasonal multi-dish river terrace meal with local Kyoto vegetables.'
      },
      {
        id: 'iti_4',
        day: 2,
        timeSlot: 'Morning',
        activity: 'Arashiyama Bamboo Grove & Tenryu-ji Gardens',
        location: 'Arashiyama',
        cost: 15,
        notes: 'Observe the moss pond reflections before walking across Togetsukyo Bridge.'
      },
      {
        id: 'iti_5',
        day: 2,
        timeSlot: 'Afternoon',
        activity: 'Sagano Romantic Scenic Train Ride',
        location: 'Torokko Saga Station',
        cost: 20,
        notes: 'Open car along the Hozu river gorge canyon.'
      }
    ]
  }
];

export const INITIAL_GALLERY: PhotoGalleryItem[] = [
  {
    id: 'gal_1',
    title: 'Morning Light in Arashiyama',
    location: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    category: 'Culture',
    photographer: 'Takashi H.',
    aspect: 'landscape'
  },
  {
    id: 'gal_2',
    title: 'Cliffside Twilight in Positano',
    location: 'Amalfi Coast',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    category: 'Coastal',
    photographer: 'Elena Mancini',
    aspect: 'landscape'
  },
  {
    id: 'gal_3',
    title: 'Matterhorn Sunrise Reflection',
    location: 'Zermatt',
    country: 'Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    category: 'Landscapes',
    photographer: 'Lucas Weber',
    aspect: 'portrait'
  },
  {
    id: 'gal_4',
    title: 'Oia Blue Domes over the Caldera',
    location: 'Santorini',
    country: 'Greece',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    category: 'Architecture',
    photographer: 'Nikos P.',
    aspect: 'square'
  },
  {
    id: 'gal_5',
    title: 'Emerald Rice Terraces of Tegallalang',
    location: 'Bali',
    country: 'Indonesia',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    category: 'Landscapes',
    photographer: 'Wayan S.',
    aspect: 'landscape'
  },
  {
    id: 'gal_6',
    title: 'Pride of Lions in the Golden Serengeti',
    location: 'Serengeti',
    country: 'Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    category: 'Wildlife',
    photographer: 'Kariuki M.',
    aspect: 'portrait'
  },
  {
    id: 'gal_7',
    title: 'Glacial Lagoon Icebergs',
    location: 'Jökulsárlón',
    country: 'Iceland',
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    category: 'Landscapes',
    photographer: 'Freydis K.',
    aspect: 'landscape'
  },
  {
    id: 'gal_8',
    title: 'Granite Horns of Torres del Paine',
    location: 'Patagonia',
    country: 'Chile',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    category: 'Landscapes',
    photographer: 'Mateo R.',
    aspect: 'square'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg_1001',
    bookingReference: 'VY-JP-9481',
    userId: 'usr_traveler',
    userName: 'Emma Watson',
    userEmail: 'emma@example.com',
    type: 'tour',
    itemTitle: 'Kyoto & Tokyo: Zen Heritage & Modern Harmony',
    itemId: 'pkg_japan_zen',
    date: '2025-10-15',
    returnDate: '2025-10-23',
    guestsOrPassengers: 2,
    totalPrice: 4900,
    status: 'confirmed',
    details: {
      packageDuration: '8 Days / 7 Nights',
      specialRequests: 'Vegetarian Kaiseki request noted'
    },
    createdAt: '2025-08-01'
  },
  {
    id: 'bkg_1002',
    bookingReference: 'VY-FL-2819',
    userId: 'usr_traveler',
    userName: 'Emma Watson',
    userEmail: 'emma@example.com',
    type: 'flight',
    itemTitle: 'Flight SFO ➔ KIX (ANA NH-802)',
    itemId: 'flt_101',
    date: '2025-10-14',
    guestsOrPassengers: 2,
    totalPrice: 2380,
    status: 'confirmed',
    details: {
      flightNumber: 'VY-802 (NH-802)',
      origin: 'SFO (San Francisco)',
      destination: 'KIX (Osaka/Kyoto)',
      flightClass: 'Premium Economy'
    },
    createdAt: '2025-08-02'
  },
  {
    id: 'bkg_1003',
    bookingReference: 'VY-HT-7732',
    userId: 'usr_marco',
    userName: 'Marco Rossi',
    userEmail: 'marco.rossi@travel.it',
    type: 'hotel',
    itemTitle: 'The Matterhorn Chalet & Spa',
    itemId: 'htl_zermatt_mont_cervin',
    date: '2025-11-20',
    returnDate: '2025-11-24',
    guestsOrPassengers: 2,
    totalPrice: 1680,
    status: 'pending',
    details: {
      roomType: 'Matterhorn Alpine Room',
      specialRequests: 'High floor facing Matterhorn'
    },
    createdAt: '2025-08-20'
  }
];
