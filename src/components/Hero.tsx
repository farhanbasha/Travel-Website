import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Building2, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { setActiveTab, setSearchQuery, destinations } = useApp();
  const [searchType, setSearchType] = useState<'destinations' | 'hotels' | 'flights'>('destinations');
  
  // Destination search state
  const [destInput, setDestInput] = useState('');
  
  // Hotel search state
  const [hotelLocation, setHotelLocation] = useState('Kyoto');
  const [hotelDates, setHotelDates] = useState('Oct 15 - Oct 20');
  const [hotelGuests, setHotelGuests] = useState('2 Adults');

  // Flight search state
  const [flightOrigin, setFlightOrigin] = useState('SFO');
  const [flightDest, setFlightDest] = useState('KIX');
  const [flightClass, setFlightClass] = useState('Premium');

  const handleSearch = () => {
    if (searchType === 'destinations') {
      setSearchQuery(destInput);
      setActiveTab('destinations');
    } else if (searchType === 'hotels') {
      setActiveTab('hotels');
    } else if (searchType === 'flights') {
      setActiveTab('flights');
    }
  };

  const quickTags = ['Kyoto Zen', 'Amalfi Coast', 'Swiss Alps', 'Bali Retreats', 'Santorini Sunset'];

  return (
    <div className="relative pt-6 pb-12 overflow-hidden bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: Main Search & Hero Bento (col-span-12 lg:col-span-8) */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-[#E8E8ED] flex flex-col justify-between relative overflow-hidden min-h-[360px]">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>Next-Gen Travel Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-tight mb-3">
                Where will you <br className="hidden sm:inline" />go next?
              </h1>
              <p className="text-sm text-[#86868B] max-w-lg mb-6">
                Discover world-class sanctuaries, curated tour packages, boutique hotels, and seamless flight routes.
              </p>

              {/* Mode Pill Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F7] rounded-full border border-[#E8E8ED] w-fit mb-4">
                <button
                  onClick={() => setSearchType('destinations')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    searchType === 'destinations'
                      ? 'bg-white text-[#1D1D1F] shadow-xs'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Destinations</span>
                </button>
                <button
                  onClick={() => setSearchType('hotels')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    searchType === 'hotels'
                      ? 'bg-white text-[#1D1D1F] shadow-xs'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Hotels</span>
                </button>
                <button
                  onClick={() => setSearchType('flights')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    searchType === 'flights'
                      ? 'bg-white text-[#1D1D1F] shadow-xs'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Flights</span>
                </button>
              </div>

              {/* Search Inputs based on mode */}
              {searchType === 'destinations' && (
                <div className="flex flex-col sm:flex-row bg-[#F5F5F7] rounded-2xl p-1.5 w-full max-w-xl border border-[#E8E8ED] gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 flex-grow">
                    <Search className="w-4 h-4 text-[#86868B] shrink-0" />
                    <input
                      type="text"
                      placeholder="Search destinations, hotels, regions..."
                      value={destInput}
                      onChange={(e) => setDestInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="bg-transparent outline-none text-sm text-[#1D1D1F] placeholder:text-[#86868B] w-full font-medium"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Search
                  </button>
                </div>
              )}

              {searchType === 'hotels' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#F5F5F7] rounded-2xl p-2 max-w-xl border border-[#E8E8ED]">
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E8ED]">
                    <label className="block text-[9px] uppercase font-bold text-[#86868B] tracking-wider">Destination</label>
                    <select
                      value={hotelLocation}
                      onChange={(e) => setHotelLocation(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] focus:outline-none"
                    >
                      {destinations.map(d => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E8ED]">
                    <label className="block text-[9px] uppercase font-bold text-[#86868B] tracking-wider">Dates</label>
                    <input
                      type="text"
                      value={hotelDates}
                      onChange={(e) => setHotelDates(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#1D1D1F] focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find Stays</span>
                  </button>
                </div>
              )}

              {searchType === 'flights' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#F5F5F7] rounded-2xl p-2 max-w-xl border border-[#E8E8ED]">
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E8ED]">
                    <label className="block text-[9px] uppercase font-bold text-[#86868B] tracking-wider">From / To</label>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#1D1D1F]">
                      <span>{flightOrigin}</span>
                      <ArrowRight className="w-3 h-3 text-[#86868B]" />
                      <span>{flightDest}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E8ED]">
                    <label className="block text-[9px] uppercase font-bold text-[#86868B] tracking-wider">Cabin</label>
                    <span className="text-xs font-semibold text-[#1D1D1F] block">{flightClass}</span>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-[#0066CC] hover:bg-[#0071E3] text-white py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Flights</span>
                  </button>
                </div>
              )}

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
                <span className="text-[11px] font-semibold text-[#86868B]">Popular:</span>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const cleaned = tag.split(' ')[0];
                      setSearchQuery(cleaned);
                      setActiveTab('destinations');
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-[11px] font-medium transition-colors border border-[#E8E8ED]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtle glow background circle */}
            <div className="absolute right-[-20px] bottom-[-20px] w-72 h-72 bg-[#0066CC] opacity-10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Card 2: My Itinerary Bento (col-span-12 lg:col-span-4) */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-[2rem] p-6 shadow-sm border border-[#E8E8ED] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0066CC]" />
                  <h2 className="font-bold text-lg text-[#1D1D1F]">My Itinerary</h2>
                </div>
                <span className="text-xs bg-[#F5F5F7] px-2.5 py-1 rounded-full font-semibold text-[#86868B] border border-[#E8E8ED]">
                  Next: 48h
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 border-l-2 border-[#0066CC] pl-4">
                  <div>
                    <p className="text-[10px] text-[#0066CC] uppercase font-bold tracking-wider">09:00 AM</p>
                    <p className="font-semibold text-sm text-[#1D1D1F]">Flight to Kyoto (NH201)</p>
                    <p className="text-xs text-[#86868B]">Terminal 3, Gate 14 • Confirmed</p>
                  </div>
                </div>

                <div className="flex gap-3 border-l-2 border-[#D2D2D7] pl-4">
                  <div>
                    <p className="text-[10px] text-[#86868B] uppercase font-bold tracking-wider">02:30 PM</p>
                    <p className="font-semibold text-sm text-[#1D1D1F]">Hotel Check-in</p>
                    <p className="text-xs text-[#86868B]">Hoshinoya Kyoto • Riverside Villa</p>
                  </div>
                </div>

                <div className="flex gap-3 border-l-2 border-[#D2D2D7] pl-4">
                  <div>
                    <p className="text-[10px] text-[#86868B] uppercase font-bold tracking-wider">07:00 PM</p>
                    <p className="font-semibold text-sm text-[#1D1D1F]">Dinner at Kikunoi</p>
                    <p className="text-xs text-[#86868B]">Michelin 3-Star Kaiseki Tasting</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('itinerary')}
              className="mt-6 w-full py-3 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] rounded-xl text-sm font-semibold transition-colors cursor-pointer border border-[#E8E8ED]"
            >
              View Full Itinerary Calendar
            </button>
          </div>

          {/* Card 3: Destinations Bento (col-span-12 md:col-span-4) */}
          <div className="col-span-12 md:col-span-4 bg-white rounded-[2rem] p-6 shadow-sm border border-[#E8E8ED] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-[#1D1D1F]">Destinations</h2>
                <button
                  onClick={() => setActiveTab('destinations')}
                  className="text-xs font-semibold text-[#0066CC] hover:underline cursor-pointer"
                >
                  View all
                </button>
              </div>

              <div className="space-y-2.5">
                <div
                  onClick={() => {
                    setSearchQuery('Kyoto');
                    setActiveTab('destinations');
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-[#F5F5F7] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#E8E8ED]"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#0066CC]/15 flex items-center justify-center font-bold text-[#0066CC]">
                    JP
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#1D1D1F]">Kyoto, Japan</p>
                    <p className="text-xs text-[#86868B]">12 Packages available</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">$1.2k+</span>
                </div>

                <div
                  onClick={() => {
                    setSearchQuery('Amalfi');
                    setActiveTab('destinations');
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-[#F5F5F7] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#E8E8ED]"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                    IT
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#1D1D1F]">Amalfi Coast, Italy</p>
                    <p className="text-xs text-[#86868B]">8 Packages available</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">$2.4k+</span>
                </div>

                <div
                  onClick={() => {
                    setSearchQuery('Reykjavik');
                    setActiveTab('destinations');
                  }}
                  className="flex items-center gap-3 p-2.5 hover:bg-[#F5F5F7] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#E8E8ED]"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-purple-100 flex items-center justify-center font-bold text-purple-600">
                    IS
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#1D1D1F]">Reykjavik, Iceland</p>
                    <p className="text-xs text-[#86868B]">15 Packages available</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">$1.8k+</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('packages')}
              className="mt-4 w-full py-2.5 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Browse Curated Tours
            </button>
          </div>

          {/* Card 4: Dark Booking Bento (col-span-12 md:col-span-4) */}
          <div className="col-span-12 md:col-span-4 bg-[#1D1D1F] rounded-[2rem] p-6 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Booking</h3>
                <p className="text-xs text-[#86868B] uppercase font-semibold mt-1 tracking-widest">Flight + Hotel</p>
              </div>
              <div className="p-2.5 bg-white/10 rounded-full">
                <Plane className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-['Space_Grotesk']">$840</span>
                <span className="text-[#86868B] text-sm font-medium">per traveler</span>
              </div>
              <p className="text-xs text-[#86868B] mt-1">Includes 5 nights boutique ryokan + direct flight</p>
            </div>

            <button
              onClick={() => setActiveTab('packages')}
              className="w-full py-3 bg-[#0066CC] hover:bg-[#0071E3] rounded-xl text-sm font-bold tracking-wide transition-colors cursor-pointer text-white shadow-xs"
            >
              Complete Reservation
            </button>
          </div>

          {/* Card 5: Admin Console & Community Bento (col-span-12 md:col-span-4) */}
          <div className="col-span-12 md:col-span-4 space-y-4 flex flex-col justify-between">
            {/* Latest Review Bento Mini-card */}
            <div
              onClick={() => setActiveTab('reviews')}
              className="bg-white rounded-[2rem] px-6 py-4 shadow-sm border border-[#E8E8ED] flex items-center justify-between cursor-pointer hover:border-[#D2D2D7] transition-all"
            >
              <div>
                <p className="text-[10px] uppercase font-bold text-[#86868B] tracking-wider">Latest Review</p>
                <p className="text-sm font-medium italic text-[#1D1D1F]">"The best trip of my life..."</p>
                <p className="text-[11px] text-[#86868B]">Emma W. • Kyoto Pilgrimage</p>
              </div>
              <div className="flex items-center gap-1 bg-[#F5F5F7] px-2.5 py-1 rounded-full border border-[#E8E8ED]">
                <span className="text-sm font-bold text-[#1D1D1F]">5.0</span>
                <span className="text-amber-400">★</span>
              </div>
            </div>

            {/* Admin Metrics Console Bento Mini-card */}
            <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-[#E8E8ED] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-[#1D1D1F]">Admin Console</h2>
                <span className="text-[10px] font-bold text-[#0066CC] uppercase bg-[#0066CC]/10 px-2 py-0.5 rounded-full">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#E8E8ED]">
                  <p className="text-[10px] text-[#86868B] font-bold uppercase">Bookings</p>
                  <p className="text-xl font-bold text-[#1D1D1F]">1,284</p>
                </div>
                <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#E8E8ED]">
                  <p className="text-[10px] text-[#86868B] font-bold uppercase">Revenue</p>
                  <p className="text-xl font-bold text-[#1D1D1F]">$42k</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center justify-between w-full p-2.5 bg-[#F5F5F7] hover:bg-[#E8E8ED] rounded-xl text-xs font-semibold text-[#1D1D1F] transition-colors cursor-pointer border border-[#E8E8ED]"
              >
                <span>Manage Packages & Bookings</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#86868B]" />
              </button>
            </div>

            {/* Happy Travelers Pill */}
            <div className="bg-white rounded-[2rem] px-6 py-3.5 shadow-sm border border-[#E8E8ED] flex items-center gap-4">
              <div className="flex -space-x-2.5">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Traveler" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Traveler" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-500 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Traveler" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-xs font-medium">
                <p className="text-[#1D1D1F] font-bold">+2.4k happy travelers</p>
                <p className="text-[#86868B]">Curated trips completed</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
