import React, { useState } from 'react';
import {
  X, Calendar, Clock, Users, Star, CheckCircle2, XCircle,
  ShieldCheck, MapPin, ChevronRight, CreditCard, Sparkles, ArrowRight
} from 'lucide-react';
import { TourPackage } from '../types';
import { useApp } from '../context/AppContext';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookingSuccess?: (bookingRef: string) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose, onBookingSuccess }) => {
  const { currentUser, openAuthModal, createBooking } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>(pkg?.availableDates[0] || '2025-10-15');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingStep, setBookingStep] = useState<'details' | 'confirm'>('details');

  if (!pkg) return null;

  const totalPrice = pkg.price * guestCount;

  const handleConfirmBooking = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const booking = createBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      type: 'tour',
      itemTitle: pkg.title,
      itemId: pkg.id,
      date: selectedDate,
      guestsOrPassengers: guestCount,
      totalPrice,
      details: {
        packageDuration: `${pkg.durationDays} Days / ${pkg.durationNights} Nights`,
        specialRequests: specialRequests.trim() || 'None'
      }
    });

    if (onBookingSuccess) {
      onBookingSuccess(booking.bookingReference);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-[#E8E8ED] my-8 transition-all max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1D1D1F] shadow-md backdrop-blur-md transition-all cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          {/* Cover Hero Banner */}
          <div className="relative h-64 sm:h-80 w-full bg-[#1D1D1F]">
            <img
              src={pkg.coverImage}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-16 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold">
                  {pkg.country}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-[11px] font-semibold text-white">
                  {pkg.groupSize}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {pkg.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#86868B] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#86868B]">Duration</p>
                  <p className="text-xs font-bold text-[#1D1D1F]">{pkg.durationDays} Days / {pkg.durationNights} Nights</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#86868B] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#86868B]">Group Size</p>
                  <p className="text-xs font-bold text-[#1D1D1F]">{pkg.groupSize}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#86868B]">Rating</p>
                  <p className="text-xs font-bold text-[#1D1D1F]">{pkg.rating} ({pkg.reviewCount} reviews)</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#86868B]">Protection</p>
                  <p className="text-xs font-bold text-[#1D1D1F]">100% Refund Guarantee</p>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868B] mb-1.5">Trip Overview</h3>
              <p className="text-sm sm:text-base text-[#1D1D1F] leading-relaxed font-normal">
                {pkg.overview}
              </p>
            </div>

            {/* Day by Day Detailed Itinerary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#1D1D1F]">
                  Day-by-Day Journey Itinerary
                </h3>
                <span className="text-xs text-[#86868B]">{pkg.itinerary.length} Curated Days</span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E8ED]">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative group">
                    {/* Day Badge Node */}
                    <div className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1D1D1F] text-white text-[11px] font-bold flex items-center justify-center ring-4 ring-white shadow-xs">
                      {day.day}
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] hover:border-[#D2D2D7] transition-colors">
                      <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                        Day {day.day}
                      </h4>
                      <h5 className="text-sm sm:text-base font-bold text-[#1D1D1F] mt-0.5 mb-1.5">
                        {day.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed mb-3">
                        {day.description}
                      </p>

                      {/* Activities tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8E8ED]">
                        {day.activities.map((act, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E8ED] text-[11px] font-medium text-[#1D1D1F]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E8E8ED] pt-6">
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What's Included
                </h4>
                <ul className="space-y-1.5 text-xs text-[#1D1D1F]">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-[#86868B]" />
                  What's Excluded
                </h4>
                <ul className="space-y-1.5 text-xs text-[#86868B]">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#86868B]">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking Configuration Box */}
            <div className="border-t border-[#E8E8ED] pt-6 bg-[#F5F5F7] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-[2rem]">
              <h3 className="text-base font-bold text-[#1D1D1F] mb-3">
                Select Dates & Reserve Package
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {/* Departure Date */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#86868B] mb-1">Departure Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                  >
                    {pkg.availableDates.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Travelers count */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#86868B] mb-1">Travelers</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#86868B] mb-1">Diet / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, Anniversary"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#D2D2D7]"
                  />
                </div>
              </div>

              {/* Price summary & checkout button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8E8ED] shadow-xs">
                <div>
                  <span className="text-xs text-[#86868B]">Total Investment ({guestCount} travelers):</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1D1D1F]">
                      ${totalPrice.toLocaleString()}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm text-[#86868B] line-through">
                        ${(pkg.originalPrice * guestCount).toLocaleString()}
                      </span>
                    )}
                    <span className="text-[11px] text-emerald-600 font-medium">Taxes & fees included</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{currentUser ? 'Confirm & Book Tour' : 'Sign In to Book Tour'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
