import React, { useState } from 'react';
import {
  Plane, ArrowRight, Clock, ShieldCheck, CreditCard, Sparkles,
  Luggage, Check, Calendar, Users, QrCode, Ticket
} from 'lucide-react';
import { Flight, FlightCabinOption } from '../types';
import { useApp } from '../context/AppContext';

export const FlightBookingView: React.FC = () => {
  const { flights, currentUser, openAuthModal, createBooking, showToast } = useApp();

  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [selectedFlight, setSelectedFlight] = useState<Flight>(flights[0]);
  const [selectedCabin, setSelectedCabin] = useState<FlightCabinOption>(flights[0].cabinOptions[1]); // Default to Premium
  const [departureDate, setDepartureDate] = useState('2025-10-14');
  const [returnDate, setReturnDate] = useState('2025-10-24');
  const [passengers, setPassengers] = useState(2);
  const [seatPreference, setSeatPreference] = useState('Window Seat');
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string | null>(null);

  const totalPrice = selectedCabin.price * passengers * (tripType === 'round' ? 1.85 : 1);
  const roundedTotal = Math.round(totalPrice);

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    // Keep matching class or first
    const match = flight.cabinOptions.find(c => c.classType === selectedCabin.classType) || flight.cabinOptions[0];
    setSelectedCabin(match);
  };

  const handleBookFlight = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const booking = createBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      type: 'flight',
      itemTitle: `Flight ${selectedFlight.flightNumber}: ${selectedFlight.origin.code} ➔ ${selectedFlight.destination.code}`,
      itemId: selectedFlight.id,
      date: departureDate,
      returnDate: tripType === 'round' ? returnDate : undefined,
      guestsOrPassengers: passengers,
      totalPrice: roundedTotal,
      details: {
        flightNumber: selectedFlight.flightNumber,
        flightClass: selectedCabin.classType,
        origin: `${selectedFlight.origin.city} (${selectedFlight.origin.code})`,
        destination: `${selectedFlight.destination.city} (${selectedFlight.destination.code})`,
        specialRequests: `Seat pref: ${seatPreference}`
      }
    });

    setConfirmedBookingRef(booking.bookingReference);
    showToast(`Flight booking confirmed! E-Ticket: ${booking.bookingReference}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Air Travel Engine</span>
        <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
          Global Flight Reservations
        </h2>
        <p className="text-sm text-[#86868B] mt-1 max-w-2xl">
          Direct partner routes with premier world airlines. Transparent pricing, generous baggage allowances, and digital boarding passes.
        </p>
      </div>

      {/* Control Bar: Trip Type & Search Inputs */}
      <div className="bg-white rounded-[2rem] p-5 border border-[#E8E8ED] shadow-sm mb-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E8E8ED] pb-3">
          <button
            onClick={() => setTripType('round')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              tripType === 'round' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Round Trip
          </button>
          <button
            onClick={() => setTripType('oneway')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              tripType === 'oneway' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            One Way
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED]">
            <label className="block text-[10px] uppercase font-bold text-[#86868B]">Departing Date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] focus:outline-none mt-1"
            />
          </div>

          {tripType === 'round' && (
            <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED]">
              <label className="block text-[10px] uppercase font-bold text-[#86868B]">Returning Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] focus:outline-none mt-1"
              />
            </div>
          )}

          <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED]">
            <label className="block text-[10px] uppercase font-bold text-[#86868B]">Passengers</label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] focus:outline-none cursor-pointer mt-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED]">
            <label className="block text-[10px] uppercase font-bold text-[#86868B]">Seat Preference</label>
            <select
              value={seatPreference}
              onChange={(e) => setSeatPreference(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] focus:outline-none cursor-pointer mt-1"
            >
              <option value="Window Seat">Window Seat</option>
              <option value="Aisle Seat">Aisle Seat</option>
              <option value="Extra Legroom">Extra Legroom Exit Row</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Flights List and Reservation Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Flight Route Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">
              Available Routes ({flights.length})
            </h3>
            <span className="text-xs text-[#86868B]">Live airfare pricing</span>
          </div>

          <div className="space-y-4">
            {flights.map((flight) => {
              const isSelected = selectedFlight.id === flight.id;

              return (
                <div
                  key={flight.id}
                  onClick={() => handleFlightSelect(flight)}
                  className={`p-5 rounded-[2rem] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#1D1D1F] shadow-md ring-1 ring-[#1D1D1F]'
                      : 'bg-white hover:border-[#D2D2D7] border-[#E8E8ED] shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8ED]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1D1D1F]">{flight.airline}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#86868B] font-mono border border-[#E8E8ED]">
                          {flight.flightNumber}
                        </span>
                      </div>
                      <p className="text-xs text-[#86868B] mt-0.5">{flight.origin.airport} ➔ {flight.destination.airport}</p>
                    </div>

                    <div className="flex items-baseline gap-1 self-start sm:self-auto">
                      <span className="text-xs text-[#86868B]">from</span>
                      <span className="text-lg font-bold text-[#1D1D1F]">
                        ${flight.cabinOptions[0].price}
                      </span>
                      <span className="text-[11px] text-[#86868B]">/ pax</span>
                    </div>
                  </div>

                  {/* Flight Timeline Route */}
                  <div className="py-4 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-xl font-bold text-[#1D1D1F]">{flight.departureTime}</p>
                      <p className="text-sm font-bold text-[#1D1D1F]">{flight.origin.code}</p>
                      <p className="text-[11px] text-[#86868B]">{flight.origin.city}</p>
                    </div>

                    <div className="flex-1 px-4 flex flex-col items-center">
                      <span className="text-[11px] text-[#86868B] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {flight.duration}
                      </span>
                      <div className="relative w-full my-1.5 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-[#E8E8ED]" />
                        <Plane className="w-4 h-4 text-[#1D1D1F] bg-white px-0.5 absolute rotate-90" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        {flight.stops === 0 ? 'Nonstop' : `${flight.stops} Stop`}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-[#1D1D1F]">{flight.arrivalTime}</p>
                      <p className="text-sm font-bold text-[#1D1D1F]">{flight.destination.code}</p>
                      <p className="text-[11px] text-[#86868B]">{flight.destination.city}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cabin Class Selection & Digital Ticket Reservation */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2rem] border border-[#E8E8ED] p-6 sm:p-7 shadow-sm space-y-6 sticky top-24">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#86868B] tracking-wider">Flight Selected</span>
              <div className="flex items-center justify-between mt-1">
                <h4 className="font-bold text-lg text-[#1D1D1F]">
                  {selectedFlight.origin.code} ➔ {selectedFlight.destination.code}
                </h4>
                <span className="text-xs font-semibold text-[#86868B]">{selectedFlight.airline}</span>
              </div>
            </div>

            {/* Cabin Class Tier Picker */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Choose Cabin Tier</span>
              <div className="grid grid-cols-1 gap-2.5 mt-2">
                {selectedFlight.cabinOptions.map((cabin) => {
                  const isClassActive = selectedCabin.classType === cabin.classType;

                  return (
                    <div
                      key={cabin.classType}
                      onClick={() => setSelectedCabin(cabin)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isClassActive
                          ? 'border-[#1D1D1F] bg-[#F5F5F7] shadow-xs ring-1 ring-[#1D1D1F]'
                          : 'border-[#E8E8ED] hover:border-[#D2D2D7] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1D1D1F]">{cabin.classType}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E8E8ED] text-[#86868B] font-medium">
                            {cabin.baggage}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-[#1D1D1F]">
                          ${cabin.price}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {cabin.perks.map((perk, i) => (
                          <span key={i} className="text-[10px] text-[#86868B] flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary & Price Breakdown */}
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] space-y-2 text-xs">
              <div className="flex justify-between text-[#86868B]">
                <span>Base Fare ({passengers} traveler{passengers > 1 ? 's' : ''})</span>
                <span className="text-[#1D1D1F] font-semibold">${(selectedCabin.price * passengers).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#86868B]">
                <span>Trip Format</span>
                <span className="text-[#1D1D1F]">{tripType === 'round' ? 'Round Trip (Included return)' : 'One Way'}</span>
              </div>
              <div className="flex justify-between text-[#86868B]">
                <span>Taxes & Airport Security Fees</span>
                <span className="text-emerald-600 font-semibold">Included</span>
              </div>
              <div className="pt-2 border-t border-[#E8E8ED] flex justify-between text-sm font-bold text-[#1D1D1F]">
                <span>Total Payable</span>
                <span className="text-lg font-bold">${roundedTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleBookFlight}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>{currentUser ? `Reserve Flight ($${roundedTotal.toLocaleString()})` : 'Sign In to Reserve Flight'}</span>
            </button>

            {/* Boarding Pass Preview If Confirmed */}
            {confirmedBookingRef && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold font-['Space_Grotesk']">DIGITAL BOARDING PASS</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-200/80 px-2 py-0.5 rounded-full font-bold">
                    {confirmedBookingRef}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs border-y border-emerald-200/70 py-2">
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase">Passenger</span>
                    <p className="font-bold truncate">{currentUser?.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase">Flight</span>
                    <p className="font-bold">{selectedFlight.flightNumber}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase">Class</span>
                    <p className="font-bold">{selectedCabin.classType}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1">
                  <span>Gate: B24 • Seat: 12A ({seatPreference})</span>
                  <QrCode className="w-6 h-6 text-emerald-800" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
