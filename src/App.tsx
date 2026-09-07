import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationList } from './components/DestinationList';
import { DestinationModal } from './components/DestinationModal';
import { PackageList } from './components/PackageList';
import { HotelBookingView } from './components/HotelBookingView';
import { FlightBookingView } from './components/FlightBookingView';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { PhotoGallery } from './components/PhotoGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const {
    activeTab,
    selectedDestination,
    setSelectedDestination
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#1D1D1F] selection:text-white antialiased">
      {/* Toast Notification Container */}
      <Toast />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div>
            <Hero />
            <DestinationList />
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="pt-6">
            <DestinationList />
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="pt-6">
            <PackageList />
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="pt-6">
            <HotelBookingView />
          </div>
        )}

        {activeTab === 'flights' && (
          <div className="pt-6">
            <FlightBookingView />
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="pt-6">
            <ItineraryBuilder />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-6">
            <PhotoGallery />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="pt-6">
            <ReviewsSection />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="pt-6">
            <AdminPanel />
          </div>
        )}
      </main>

      {/* Destination Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal />

      {/* User Profile & Bookings Modal */}
      <UserProfileModal />

      {/* Global Minimalist Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
