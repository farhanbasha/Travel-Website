import React, { useState } from 'react';
import {
  X, User, Calendar, Heart, Ticket, MapPin, Building2, Plane,
  Compass, CheckCircle2, AlertCircle, Clock, Shield, LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    profileModalOpen,
    setProfileModalOpen,
    bookings,
    savedDestinationIds,
    destinations,
    itineraries,
    setSelectedDestination,
    setActiveTab,
    logout
  } = useApp();

  const [activeTab, setLocalActiveTab] = useState<'bookings' | 'wishlist' | 'itineraries'>('bookings');

  if (!profileModalOpen || !currentUser) return null;

  const userBookings = bookings.filter(b => b.userId === currentUser.id || b.userEmail === currentUser.email);
  const savedDestinations = destinations.filter(d => savedDestinationIds.includes(d.id));
  const userItineraries = itineraries.filter(i => i.userId === currentUser.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-[#E8E8ED] my-8 transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#F5F5F7] border-b border-[#E8E8ED] flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
                  {currentUser.name}
                </h3>
                {currentUser.role === 'admin' ? (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#1D1D1F] text-amber-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Admin
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Traveler
                  </span>
                )}
              </div>
              <p className="text-xs text-[#86868B] mt-0.5">{currentUser.email}</p>
              <p className="text-[11px] text-[#86868B] mt-1">Voyage Member since {currentUser.createdAt}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProfileModalOpen(false);
                logout();
              }}
              title="Sign Out"
              className="p-2 rounded-full text-[#86868B] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setProfileModalOpen(false)}
              className="p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#E8E8ED] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8E8ED] px-6 pt-3 gap-6 bg-white">
          <button
            onClick={() => setLocalActiveTab('bookings')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-[#1D1D1F] text-[#1D1D1F]'
                : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            My Bookings ({userBookings.length})
          </button>
          <button
            onClick={() => setLocalActiveTab('wishlist')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-[#1D1D1F] text-[#1D1D1F]'
                : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Saved Sanctuaries ({savedDestinations.length})
          </button>
          <button
            onClick={() => setLocalActiveTab('itineraries')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'itineraries'
                ? 'border-[#1D1D1F] text-[#1D1D1F]'
                : 'border-transparent text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Custom Itineraries ({userItineraries.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'bookings' && (
            <div>
              {userBookings.length === 0 ? (
                <div className="text-center py-12 text-[#86868B] space-y-2">
                  <Ticket className="w-10 h-10 mx-auto text-[#D2D2D7]" />
                  <p className="text-sm font-semibold text-[#1D1D1F]">No active bookings yet</p>
                  <p className="text-xs">Explore our tour packages, stays, or flights to reserve your next adventure.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#D2D2D7] transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E8ED] pb-3">
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-xl ${
                            b.type === 'tour' ? 'bg-amber-100 text-amber-800' :
                            b.type === 'hotel' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-sky-100 text-sky-800'
                          }`}>
                            {b.type === 'tour' && <Compass className="w-4 h-4" />}
                            {b.type === 'hotel' && <Building2 className="w-4 h-4" />}
                            {b.type === 'flight' && <Plane className="w-4 h-4" />}
                          </span>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#86868B]">Ref: {b.bookingReference}</span>
                            <h4 className="font-bold text-sm text-[#1D1D1F]">{b.itemTitle}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#86868B]">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#86868B]">Start Date</span>
                          <p className="font-semibold text-[#1D1D1F]">{b.date}</p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#86868B]">Guests/Pax</span>
                          <p className="font-semibold text-[#1D1D1F]">{b.guestsOrPassengers} Person{b.guestsOrPassengers > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#86868B]">Total Price</span>
                          <p className="font-bold text-[#1D1D1F]">${b.totalPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#86868B]">Booked On</span>
                          <p className="text-[#86868B]">{b.createdAt}</p>
                        </div>
                      </div>

                      {/* Detail specifics */}
                      {Object.keys(b.details).length > 0 && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#E8E8ED] text-[11px] text-[#1D1D1F]">
                          {b.details.roomType && <span>Room: <strong>{b.details.roomType}</strong> • </span>}
                          {b.details.flightClass && <span>Cabin: <strong>{b.details.flightClass}</strong> • </span>}
                          {b.details.packageDuration && <span>Duration: <strong>{b.details.packageDuration}</strong> • </span>}
                          {b.details.specialRequests && <span>Notes: {b.details.specialRequests}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              {savedDestinations.length === 0 ? (
                <div className="text-center py-12 text-[#86868B] space-y-2">
                  <Heart className="w-10 h-10 mx-auto text-[#D2D2D7]" />
                  <p className="text-sm font-semibold text-[#1D1D1F]">Your wishlist is empty</p>
                  <p className="text-xs">Click the heart icon on any destination to save it for your next trip.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedDestinations.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => {
                        setProfileModalOpen(false);
                        setSelectedDestination(d);
                      }}
                      className="p-3 bg-[#F5F5F7] rounded-2xl border border-[#E8E8ED] hover:border-[#D2D2D7] flex items-center gap-3 cursor-pointer transition-all"
                    >
                      <img src={d.coverImage} alt={d.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-sm text-[#1D1D1F] truncate">{d.name}</h5>
                        <p className="text-xs text-[#86868B] truncate">{d.country}</p>
                        <p className="text-xs font-bold text-[#1D1D1F] mt-1">${d.avgCostPerDay} <span className="text-[10px] font-normal text-[#86868B]">/ day</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'itineraries' && (
            <div>
              {userItineraries.length === 0 ? (
                <div className="text-center py-12 text-[#86868B] space-y-2">
                  <Calendar className="w-10 h-10 mx-auto text-[#D2D2D7]" />
                  <p className="text-sm font-semibold text-[#1D1D1F]">No custom itineraries yet</p>
                  <button
                    onClick={() => {
                      setProfileModalOpen(false);
                      setActiveTab('itinerary');
                    }}
                    className="mt-2 px-4 py-2 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Open Itinerary Studio
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userItineraries.map((it) => (
                    <div
                      key={it.id}
                      onClick={() => {
                        setProfileModalOpen(false);
                        setActiveTab('itinerary');
                      }}
                      className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#D2D2D7] flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div>
                        <h5 className="font-bold text-sm text-[#1D1D1F]">{it.title}</h5>
                        <p className="text-xs text-[#86868B]">{it.destinationName} • {it.items.length} Activities planned</p>
                      </div>
                      <span className="text-xs font-bold text-[#1D1D1F]">${it.totalBudget} Budget</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
