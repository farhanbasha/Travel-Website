import React, { useState } from 'react';
import { Compass, ArrowRight, Shield, Globe2, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('Subscribed to Voyage Gazette seasonal releases', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-[#E8E8ED] text-[#86868B] text-xs">
      {/* Top Newsletter & Manifesto Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#E8E8ED]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#86868B]">Voyage Dispatch</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
              Intelligent travel, quietly delivered.
            </h3>
            <p className="text-xs text-[#86868B] max-w-md">
              Seasonal field guides, early reservations for private villa releases, and secret cultural itineraries.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md ml-auto">
              <input
                type="email"
                placeholder="Enter your personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-[#F5F5F7] rounded-2xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7] placeholder:text-[#86868B]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-2xl font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#1D1D1F] text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-[#1D1D1F] tracking-tight">
                VOYAGE
              </span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed max-w-xs">
              A minimalist expedition and sanctuary booking collective. Designed with intentional restraint, precision typography, and tranquil motion.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[10px] font-bold text-[#1D1D1F] border border-[#E8E8ED]">
                <Globe2 className="w-3 h-3 text-[#86868B]" />
                42 Global Sanctuaries
              </span>
            </div>
          </div>

          {/* Column 1: Expeditions */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F] mb-3">Journeys</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('destinations')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Tour Packages
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('hotels')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Stays & Villas
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('flights')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Flight Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Curation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F] mb-3">Planning</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('itinerary')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Itinerary Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reviews')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Traveler Reviews
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">
                  Concierge Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F] mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer font-semibold text-[#1D1D1F] flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-500" />
                  Admin Console
                </button>
              </li>
              <li className="text-[#86868B]">Private Jet Charters</li>
              <li className="text-[#86868B]">Carbon Offsetting</li>
              <li className="text-[#86868B]">Security & Privacy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-[#E8E8ED] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868B]">
          <p>© {new Date().getFullYear()} Voyage Travel Collective Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Privacy Notice</span>
            <span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Terms of Booking</span>
            <span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
