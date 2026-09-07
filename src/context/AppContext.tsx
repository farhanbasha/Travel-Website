import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, Destination, TourPackage, Hotel, Flight, ItineraryPlan,
  Review, Booking, ContactMessage, BookingStatus
} from '../types';
import {
  INITIAL_USERS, INITIAL_DESTINATIONS, INITIAL_PACKAGES,
  INITIAL_HOTELS, INITIAL_FLIGHTS, INITIAL_REVIEWS,
  INITIAL_ITINERARIES, INITIAL_BOOKINGS
} from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  destinations: Destination[];
  packages: TourPackage[];
  hotels: Hotel[];
  flights: Flight[];
  bookings: Booking[];
  itineraries: ItineraryPlan[];
  reviews: Review[];
  savedDestinationIds: string[];
  contactMessages: ContactMessage[];
  toast: ToastState | null;
  activeTab: 'explore' | 'destinations' | 'packages' | 'hotels' | 'flights' | 'itinerary' | 'gallery' | 'contact' | 'admin';
  setActiveTab: (tab: 'explore' | 'destinations' | 'packages' | 'hotels' | 'flights' | 'itinerary' | 'gallery' | 'contact' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authDefaultTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  profileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
  selectedDestination: Destination | null;
  setSelectedDestination: (destination: Destination | null) => void;
  selectedPackage: TourPackage | null;
  setSelectedPackage: (pkg: TourPackage | null) => void;
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  // Handlers
  login: (email: string, role?: 'traveler' | 'admin') => boolean;
  register: (name: string, email: string, role?: 'traveler' | 'admin') => boolean;
  logout: () => void;
  switchDemoUser: (role: 'traveler' | 'admin') => void;
  toggleSaveDestination: (destinationId: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'bookingReference' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  addTourPackage: (newPkg: Omit<TourPackage, 'id' | 'rating' | 'reviewCount'>) => void;
  updateTourPackage: (pkgId: string, updated: Partial<TourPackage>) => void;
  deleteTourPackage: (pkgId: string) => void;
  updateUserStatus: (userId: string, status: 'active' | 'suspended', role?: 'traveler' | 'admin') => void;
  addItinerary: (itinerary: Omit<ItineraryPlan, 'id' | 'createdAt'>) => void;
  updateItinerary: (itineraryId: string, updated: Partial<ItineraryPlan>) => void;
  deleteItinerary: (itineraryId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulVotes' | 'verified'>) => void;
  voteHelpful: (reviewId: string) => void;
  submitContact: (contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  resolveContact: (contactId: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage helper
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`voyage_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`voyage_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage error', e);
    }
  };

  // State
  const [users, setUsers] = useState<User[]>(() => getStored('users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const hasLoggedIn = localStorage.getItem('voyage_has_logged_in') === 'true';
    if (hasLoggedIn) {
      return getStored<User | null>('currentUser', null);
    }
    return null;
  });
  const [destinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [packages, setPackages] = useState<TourPackage[]>(() => getStored('packages', INITIAL_PACKAGES));
  const [hotels] = useState<Hotel[]>(INITIAL_HOTELS);
  const [flights] = useState<Flight[]>(INITIAL_FLIGHTS);
  const [bookings, setBookings] = useState<Booking[]>(() => getStored('bookings', INITIAL_BOOKINGS));
  const [itineraries, setItineraries] = useState<ItineraryPlan[]>(() => getStored('itineraries', INITIAL_ITINERARIES));
  const [reviews, setReviews] = useState<Review[]>(() => getStored('reviews', INITIAL_REVIEWS));
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(() => getStored('savedDestinations', ['dest_kyoto', 'dest_amalfi']));
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => getStored('contacts', [
    {
      id: 'msg_1',
      name: 'Oliver Thorne',
      email: 'oliver@thorne.co',
      subject: 'Custom Family Tour in Kyoto & Tokyo',
      message: 'Looking for a private 10-day itinerary with child-friendly cultural workshops in November.',
      createdAt: '2025-08-15',
      status: 'new'
    }
  ]));

  const [activeTab, setActiveTab] = useState<'explore' | 'destinations' | 'packages' | 'hotels' | 'flights' | 'itinerary' | 'gallery' | 'contact' | 'admin'>('explore');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals - open auth modal upon entering if not logged in
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(() => {
    const hasLoggedIn = localStorage.getItem('voyage_has_logged_in') === 'true';
    const saved = getStored<User | null>('currentUser', null);
    return !(hasLoggedIn && saved);
  });
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to localStorage
  useEffect(() => { setStored('users', users); }, [users]);
  useEffect(() => { setStored('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { setStored('packages', packages); }, [packages]);
  useEffect(() => { setStored('bookings', bookings); }, [bookings]);
  useEffect(() => { setStored('itineraries', itineraries); }, [itineraries]);
  useEffect(() => { setStored('reviews', reviews); }, [reviews]);
  useEffect(() => { setStored('savedDestinations', savedDestinationIds); }, [savedDestinationIds]);
  useEffect(() => { setStored('contacts', contactMessages); }, [contactMessages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthDefaultTab(tab);
    setAuthModalOpen(true);
  };

  const login = (email: string, rolePreference?: 'traveler' | 'admin') => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (user.status === 'suspended') {
        showToast('This account has been suspended by administration.', 'error');
        return false;
      }
      localStorage.setItem('voyage_has_logged_in', 'true');
      setCurrentUser(user);
      showToast(`Welcome back, ${user.name}!`, 'success');
      setAuthModalOpen(false);
      return true;
    }

    // Auto-create if not found for seamless testing
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: rolePreference || (email.includes('admin') ? 'admin' : 'traveler'),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    localStorage.setItem('voyage_has_logged_in', 'true');
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Welcome to Voyage, ${newUser.name}!`, 'success');
    setAuthModalOpen(false);
    return true;
  };

  const register = (name: string, email: string, role: 'traveler' | 'admin' = 'traveler') => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      showToast('An account with this email already exists. Please sign in.', 'error');
      return false;
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    localStorage.setItem('voyage_has_logged_in', 'true');
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome, ${name}!`, 'success');
    setAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('voyage_has_logged_in');
    localStorage.removeItem('voyage_currentUser');
    setCurrentUser(null);
    showToast('Signed out of Voyage', 'info');
  };

  const switchDemoUser = (role: 'traveler' | 'admin') => {
    localStorage.setItem('voyage_has_logged_in', 'true');
    if (role === 'admin') {
      const admin = users.find(u => u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(admin);
      showToast(`Switched to Admin: ${admin.name}`, 'info');
    } else {
      const traveler = users.find(u => u.role === 'traveler') || INITIAL_USERS[1];
      setCurrentUser(traveler);
      showToast(`Switched to Traveler: ${traveler.name}`, 'info');
    }
  };

  const toggleSaveDestination = (destinationId: string) => {
    setSavedDestinationIds(prev => {
      const exists = prev.includes(destinationId);
      if (exists) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter(id => id !== destinationId);
      } else {
        showToast('Saved to your dream destinations', 'success');
        return [...prev, destinationId];
      }
    });
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingReference' | 'createdAt' | 'status'>): Booking => {
    const refPrefix = bookingData.type === 'flight' ? 'VY-FL' : bookingData.type === 'hotel' ? 'VY-HT' : 'VY-TR';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `bkg_${Date.now()}`,
      bookingReference: `${refPrefix}-${randomCode}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking confirmed! Reference: ${newBooking.bookingReference}`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Booking status updated to ${status}`, 'info');
  };

  const addTourPackage = (newPkgData: Omit<TourPackage, 'id' | 'rating' | 'reviewCount'>) => {
    const newPkg: TourPackage = {
      ...newPkgData,
      id: `pkg_${Date.now()}`,
      rating: 5.0,
      reviewCount: 1
    };
    setPackages(prev => [newPkg, ...prev]);
    showToast(`Tour package "${newPkg.title}" published!`, 'success');
  };

  const updateTourPackage = (pkgId: string, updated: Partial<TourPackage>) => {
    setPackages(prev => prev.map(p => p.id === pkgId ? { ...p, ...updated } : p));
    showToast('Package updated successfully', 'success');
  };

  const deleteTourPackage = (pkgId: string) => {
    setPackages(prev => prev.filter(p => p.id !== pkgId));
    showToast('Tour package removed', 'info');
  };

  const updateUserStatus = (userId: string, status: 'active' | 'suspended', role?: 'traveler' | 'admin') => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status,
          ...(role ? { role } : {})
        };
      }
      return u;
    }));
    showToast('User permissions updated', 'info');
  };

  const addItinerary = (itineraryData: Omit<ItineraryPlan, 'id' | 'createdAt'>) => {
    const newItin: ItineraryPlan = {
      ...itineraryData,
      id: `itin_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setItineraries(prev => [newItin, ...prev]);
    showToast(`Itinerary "${newItin.title}" created!`, 'success');
  };

  const updateItinerary = (itineraryId: string, updated: Partial<ItineraryPlan>) => {
    setItineraries(prev => prev.map(it => it.id === itineraryId ? { ...it, ...updated } : it));
    showToast('Itinerary changes saved', 'success');
  };

  const deleteItinerary = (itineraryId: string) => {
    setItineraries(prev => prev.filter(it => it.id !== itineraryId));
    showToast('Itinerary removed', 'info');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulVotes' | 'verified'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpfulVotes: 0,
      verified: true
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Review submitted! Thank you for sharing your experience.', 'success');
  };

  const voteHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r));
    showToast('Marked review as helpful', 'info');
  };

  const submitContact = (contactData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...contactData,
      id: `msg_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setContactMessages(prev => [newMsg, ...prev]);
    showToast('Inquiry sent to Voyage Concierge! We will contact you shortly.', 'success');
  };

  const resolveContact = (contactId: string) => {
    setContactMessages(prev => prev.map(c => c.id === contactId ? { ...c, status: 'resolved' } : c));
    showToast('Inquiry marked as resolved', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        destinations,
        packages,
        hotels,
        flights,
        bookings,
        itineraries,
        reviews,
        savedDestinationIds,
        contactMessages,
        toast,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        authModalOpen,
        setAuthModalOpen,
        authDefaultTab,
        openAuthModal,
        profileModalOpen,
        setProfileModalOpen,
        selectedDestination,
        setSelectedDestination,
        selectedPackage,
        setSelectedPackage,
        selectedHotel,
        setSelectedHotel,
        selectedFlight,
        setSelectedFlight,
        login,
        register,
        logout,
        switchDemoUser,
        toggleSaveDestination,
        createBooking,
        updateBookingStatus,
        addTourPackage,
        updateTourPackage,
        deleteTourPackage,
        updateUserStatus,
        addItinerary,
        updateItinerary,
        deleteItinerary,
        addReview,
        voteHelpful,
        submitContact,
        resolveContact,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
