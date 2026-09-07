import React, { useState, useMemo } from 'react';
import { Search, MapPin, Heart, Star, CloudSun, Filter, ArrowUpDown, Sparkles } from 'lucide-react';
import { Destination, DestinationCategory } from '../types';
import { useApp } from '../context/AppContext';
import { DestinationModal } from './DestinationModal';

export const DestinationList: React.FC = () => {
  const {
    destinations,
    searchQuery,
    setSearchQuery,
    savedDestinationIds,
    toggleSaveDestination,
    selectedDestination,
    setSelectedDestination
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'popular'>('rating');

  const categories = ['All', 'Nature', 'Culture', 'Romantic', 'Luxury', 'Adventure'];
  const continents = ['All', 'Asia', 'Europe', 'Americas', 'Africa'];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTagline = dest.tagline.toLowerCase().includes(q);
        const matchesHighlights = dest.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesTagline && !matchesHighlights) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All') {
        if (!dest.categories.includes(selectedCategory as DestinationCategory)) {
          return false;
        }
      }

      // Continent filter
      if (selectedContinent !== 'All') {
        if (dest.continent !== selectedContinent) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.avgCostPerDay - b.avgCostPerDay;
      if (sortBy === 'price-desc') return b.avgCostPerDay - a.avgCostPerDay;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [destinations, searchQuery, selectedCategory, selectedContinent, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Discover The World</span>
          <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Handcrafted Destination Guides
          </h2>
          <p className="text-sm text-[#86868B] mt-1">
            Immersive cultural heritage, tranquil coastal escapes, and high-altitude alpine wonders.
          </p>
        </div>

        {/* Total found badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1D1D1F] bg-white border border-[#E8E8ED] px-3.5 py-1.5 rounded-full self-start md:self-auto shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>Showing {filteredDestinations.length} destinations</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-[2rem] p-5 border border-[#E8E8ED] shadow-sm mb-8 space-y-4">
        {/* Search input + selects */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Text search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, country, or attraction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] rounded-xl text-xs font-medium text-[#1D1D1F] placeholder:text-[#86868B] border border-[#E8E8ED] focus:outline-none focus:border-[#D2D2D7]"
            />
          </div>

          {/* Continent Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-xs font-medium text-[#1D1D1F] border border-[#E8E8ED] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
            >
              <option value="All">All Continents</option>
              {continents.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-xs font-medium text-[#1D1D1F] border border-[#E8E8ED] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
            >
              <option value="rating">Highest Rated (★)</option>
              <option value="popular">Most Reviewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-[#E8E8ED]">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider mr-2 shrink-0">
            Themes:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1D1D1F] text-white shadow-xs font-semibold'
                    : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destination Cards Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-[2rem] border border-[#E8E8ED] p-8 shadow-sm">
          <MapPin className="w-10 h-10 text-[#86868B] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#1D1D1F]">No destinations match your criteria</h3>
          <p className="text-xs text-[#86868B] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, continent selection, or category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedContinent('All');
            }}
            className="mt-4 px-4 py-2 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isSaved = savedDestinationIds.includes(dest.id);

            return (
              <div
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-[#E8E8ED] hover:border-[#D2D2D7] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Card Image Box */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F5F5F7]">
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white">
                      {dest.continent}
                    </span>

                    {/* Bookmark Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveDestination(dest.id);
                      }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white text-[#1D1D1F] shadow-sm backdrop-blur-md transition-transform active:scale-90 cursor-pointer"
                      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#1D1D1F]'}`} />
                    </button>
                  </div>

                  {/* Weather and Bottom Overlay Tag */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white z-10">
                    <div>
                      <p className="text-xl font-bold leading-tight drop-shadow-sm">
                        {dest.name}
                      </p>
                      <p className="text-xs font-medium text-white/80 drop-shadow-xs">
                        {dest.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium">
                      <CloudSun className="w-3.5 h-3.5" />
                      <span>{dest.weather.temp}</span>
                    </div>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {dest.categories.map((c) => (
                        <span key={c} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#86868B] font-semibold border border-[#E8E8ED]">
                          {c}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#86868B] line-clamp-2 leading-relaxed">
                      {dest.tagline}
                    </p>
                  </div>

                  {/* Footer Metrics */}
                  <div className="mt-4 pt-3.5 border-t border-[#E8E8ED] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#1D1D1F] font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{dest.rating}</span>
                      <span className="text-[11px] font-normal text-[#86868B]">({dest.reviewCount})</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#86868B] block tracking-wider">Avg. Daily</span>
                      <p className="text-xs font-bold text-[#1D1D1F]">${dest.avgCostPerDay}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Destination Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
};
