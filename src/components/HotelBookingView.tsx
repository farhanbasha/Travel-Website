import React, { useState } from 'react';
import {
  Building2, Star, MapPin, Check, Calendar, Users, ShieldCheck,
  CreditCard, Sparkles, Bed, Wifi, Coffee, Bath
} from 'lucide-react';
import { Hotel, RoomType } from '../types';
import { useApp } from '../context/AppContext';

export const HotelBookingView: React.FC = () => {
  const { hotels, currentUser, openAuthModal, createBooking, showToast } = useApp();

  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(hotels[0]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(hotels[0].roomTypes[0]);
  const [checkInDate, setCheckInDate] = useState('2025-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2025-10-19');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diff = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
      return isNaN(diff) ? 4 : diff;
    } catch {
      return 4;
    }
  };

  const nights = calculateNights();
  const subtotal = selectedRoom.pricePerNight * nights;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const total = subtotal + taxesAndFees;

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(hotel.roomTypes[0]);
    setActivePhotoIdx(0);
  };

  const handleBooking = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    createBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      type: 'hotel',
      itemTitle: selectedHotel.name,
      itemId: selectedHotel.id,
      date: checkInDate,
      returnDate: checkOutDate,
      guestsOrPassengers: guests,
      totalPrice: total,
      details: {
        roomType: selectedRoom.name,
        specialRequests: specialRequests.trim() || 'No special requests'
      }
    });

    showToast(`Reservation at ${selectedHotel.name} confirmed!`, 'success');
  };

  const filteredHotels = selectedDestination === 'All'
    ? hotels
    : hotels.filter(h => h.destinationName.toLowerCase().includes(selectedDestination.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Sanctuary Accommodations</span>
        <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
          Boutique Stays & Villas
        </h2>
        <p className="text-sm text-[#86868B] mt-1 max-w-2xl">
          Reserve architectural sanctuaries, traditional ryokans, and clifftop villas with personalized concierge check-in and breakfast inclusions.
        </p>
      </div>

      {/* Destination Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {['All', 'Kyoto', 'Amalfi Coast', 'Zermatt', 'Bali'].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedDestination(city)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedDestination === city
                ? 'bg-[#1D1D1F] text-white shadow-xs'
                : 'bg-white border border-[#E8E8ED] hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            {city === 'All' ? 'All Stays' : `${city} Stays`}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Hotels Catalog */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">
            Available Properties ({filteredHotels.length})
          </h3>

          <div className="space-y-4">
            {filteredHotels.map((hotel) => {
              const isSelected = selectedHotel.id === hotel.id;

              return (
                <div
                  key={hotel.id}
                  onClick={() => handleHotelSelect(hotel)}
                  className={`p-4 rounded-[2rem] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#1D1D1F] shadow-md ring-1 ring-[#1D1D1F]'
                      : 'bg-white hover:border-[#D2D2D7] border-[#E8E8ED] shadow-sm'
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={hotel.coverImage}
                      alt={hotel.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{hotel.rating}</span>
                        <span className="text-[#86868B] font-normal">({hotel.reviewCount})</span>
                      </div>

                      <h4 className="font-bold text-base text-[#1D1D1F] truncate">
                        {hotel.name}
                      </h4>
                      <p className="text-xs text-[#86868B] flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#86868B] shrink-0" />
                        {hotel.address}
                      </p>

                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-xs text-[#86868B] font-medium">Nightly rate from</span>
                        <span className="text-base font-bold text-[#1D1D1F]">
                          ${hotel.pricePerNight} <span className="text-xs font-normal text-[#86868B]">/ night</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hotel Details & Booking Engine */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] border border-[#E8E8ED] p-6 sm:p-8 shadow-sm space-y-6">
            {/* Gallery Viewer */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <img
                src={selectedHotel.gallery[activePhotoIdx] || selectedHotel.coverImage}
                alt={selectedHotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

              {/* Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold drop-shadow-sm">
                    {selectedHotel.name}
                  </h3>
                  <p className="text-xs text-white/80">{selectedHotel.destinationName}, {selectedHotel.country}</p>
                </div>
              </div>

              {/* Thumbnails */}
              {selectedHotel.gallery.length > 1 && (
                <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                  {selectedHotel.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoIdx(i)}
                      className={`w-10 h-7 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                        activePhotoIdx === i ? 'border-white scale-110 shadow-sm' : 'border-white/50 opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities Pills */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Included Amenities</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedHotel.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F5F7] border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F]"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Select Room Tier */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Choose Your Room or Villa</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {selectedHotel.roomTypes.map((room) => {
                  const isRoomSelected = selectedRoom.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isRoomSelected
                          ? 'border-[#1D1D1F] bg-[#F5F5F7] shadow-xs ring-1 ring-[#1D1D1F]'
                          : 'border-[#E8E8ED] hover:border-[#D2D2D7] bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-bold text-xs sm:text-sm text-[#1D1D1F]">{room.name}</h5>
                          <span className="text-xs font-bold text-[#1D1D1F]">${room.pricePerNight} <span className="text-[10px] text-[#86868B] font-normal">/ nt</span></span>
                        </div>
                        <p className="text-[11px] text-[#86868B] leading-relaxed mb-2">{room.description}</p>
                      </div>

                      <div className="pt-2 border-t border-[#E8E8ED] flex items-center justify-between text-[11px] text-[#1D1D1F]">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3 text-[#86868B]" /> {room.bedType}
                        </span>
                        <span>Max {room.maxGuests} guests</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dates & Guest Reservation Form */}
            <div className="p-4 sm:p-5 rounded-[1.5rem] bg-[#F5F5F7] border border-[#E8E8ED] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#86868B] mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#86868B] mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#86868B] mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                  >
                    {[1, 2, 3, 4].map((g) => (
                      <option key={g} value={g}>{g} Guest{g > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#86868B] mb-1">Special Preferences / Arrival Time</label>
                <input
                  type="text"
                  placeholder="e.g. Late check-in, high floor, feather-free pillows"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#D2D2D7]"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-3 border-t border-[#E8E8ED] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#86868B]">
                  <span>${selectedRoom.pricePerNight} × {nights} nights</span>
                  <span className="text-[#1D1D1F] font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#86868B]">
                  <span>Estimated local resort & tourism taxes (12%)</span>
                  <span className="text-[#1D1D1F] font-semibold">${taxesAndFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1D1D1F] pt-2 border-t border-[#E8E8ED]">
                  <span>Total Due</span>
                  <span className="text-base font-bold">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Booking Action */}
              <button
                onClick={handleBooking}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>{currentUser ? `Confirm Reservation ($${total.toLocaleString()})` : 'Sign In to Reserve Stay'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
