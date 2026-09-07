export type UserRole = 'traveler' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export type DestinationCategory = 'Nature' | 'Culture' | 'Romantic' | 'Luxury' | 'Adventure';

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
  tagline: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  rating: number;
  reviewCount: number;
  avgCostPerDay: number;
  bestSeason: string;
  categories: DestinationCategory[];
  highlights: string[];
  weather: {
    temp: string;
    condition: string;
  };
}

export interface TourPackageDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  country: string;
  durationDays: number;
  durationNights: number;
  groupSize: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  overview: string;
  itinerary: TourPackageDay[];
  inclusions: string[];
  exclusions: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  status: 'active' | 'archived';
  availableDates: string[];
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  country: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  address: string;
  coverImage: string;
  gallery: string[];
  amenities: string[];
  roomTypes: RoomType[];
}

export interface FlightCabinOption {
  classType: 'Economy' | 'Premium' | 'Business' | 'First';
  price: number;
  baggage: string;
  perks: string[];
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: {
    code: string;
    city: string;
    airport: string;
  };
  destination: {
    code: string;
    city: string;
    airport: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number; // 0 = nonstop
  cabinOptions: FlightCabinOption[];
}

export interface ItineraryItem {
  id: string;
  day: number;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  activity: string;
  location: string;
  cost?: number;
  notes?: string;
}

export interface ItineraryPlan {
  id: string;
  userId: string;
  title: string;
  destinationName: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  items: ItineraryItem[];
  createdAt: string;
}

export interface Review {
  id: string;
  targetType: 'destination' | 'package' | 'hotel';
  targetId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulVotes: number;
}

export type BookingType = 'tour' | 'hotel' | 'flight';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: BookingType;
  itemTitle: string;
  itemId: string;
  date: string;
  returnDate?: string;
  guestsOrPassengers: number;
  totalPrice: number;
  status: BookingStatus;
  details: {
    roomType?: string;
    flightClass?: string;
    flightNumber?: string;
    origin?: string;
    destination?: string;
    packageDuration?: string;
    specialRequests?: string;
  };
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'resolved';
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  location: string;
  country: string;
  imageUrl: string;
  category: 'Landscapes' | 'Architecture' | 'Coastal' | 'Culture' | 'Wildlife';
  photographer: string;
  aspect?: 'landscape' | 'portrait' | 'square';
}
