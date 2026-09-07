import React, { useState } from 'react';
import { Compass, Clock, Users, Star, ArrowRight, Sparkles, Check } from 'lucide-react';
import { TourPackage } from '../types';
import { useApp } from '../context/AppContext';
import { PackageDetailModal } from './PackageDetailModal';

export const PackageList: React.FC = () => {
  const { packages, selectedPackage, setSelectedPackage } = useApp();
  const [filterDuration, setFilterDuration] = useState<'all' | 'short' | 'long'>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (pkg.status === 'archived') return false;
    if (filterDuration === 'short') return pkg.durationDays <= 6;
    if (filterDuration === 'long') return pkg.durationDays > 6;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">All-Inclusive Journeys</span>
          <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Curated Tour Packages
          </h2>
          <p className="text-sm text-[#86868B] mt-1">
            Complete high-touch journeys with private guides, boutique ryokans and luxury chalets, transfers, and exclusive access.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E8E8ED] p-1 rounded-full self-start md:self-auto text-xs font-medium shadow-2xs">
          <button
            onClick={() => setFilterDuration('all')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              filterDuration === 'all' ? 'bg-[#1D1D1F] text-white font-semibold' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            All Packages
          </button>
          <button
            onClick={() => setFilterDuration('short')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              filterDuration === 'short' ? 'bg-[#1D1D1F] text-white font-semibold' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Short Escapes (≤6 Days)
          </button>
          <button
            onClick={() => setFilterDuration('long')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              filterDuration === 'long' ? 'bg-[#1D1D1F] text-white font-semibold' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Extended Journeys (7+ Days)
          </button>
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPackages.map((pkg) => {
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className="group bg-white rounded-[2rem] overflow-hidden border border-[#E8E8ED] hover:border-[#D2D2D7] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-[#F5F5F7]">
                <img
                  src={pkg.coverImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-[#1D1D1F]">
                    {pkg.country}
                  </span>

                  {pkg.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-[#1D1D1F] text-[10px] font-bold shadow-xs">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Title & Duration */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-3 text-xs text-white/80 mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.durationDays} Days / {pkg.durationNights} Nights
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {pkg.groupSize}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug drop-shadow-sm">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#86868B] leading-relaxed line-clamp-2 mb-4">
                    {pkg.overview}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Included highlights:</span>
                    {pkg.inclusions.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#1D1D1F]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and Pricing */}
                <div className="pt-4 border-t border-[#E8E8ED] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#86868B]">From</span>
                      <span className="text-xl font-bold text-[#1D1D1F]">
                        ${pkg.price.toLocaleString()}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-xs text-[#86868B] line-through">
                          ${pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-[11px] text-[#86868B]">/ traveler</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#1D1D1F] mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span className="text-[#86868B]">({pkg.reviewCount})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
};
