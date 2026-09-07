import React, { useState } from 'react';
import { X, Heart, Star, MapPin, Calendar, DollarSign, CloudSun, Compass, Building2, Check, Send } from 'lucide-react';
import { Destination } from '../types';
import { useApp } from '../context/AppContext';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose }) => {
  const {
    savedDestinationIds,
    toggleSaveDestination,
    packages,
    hotels,
    setSelectedPackage,
    setSelectedHotel,
    setActiveTab,
    reviews,
    addReview,
    currentUser,
    openAuthModal,
    voteHelpful
  } = useApp();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!destination) return null;

  const isSaved = savedDestinationIds.includes(destination.id);
  const relatedPackages = packages.filter(p => p.destinationId === destination.id);
  const relatedHotels = hotels.filter(h => h.destinationId === destination.id);
  const destinationReviews = reviews.filter(r => r.targetType === 'destination' && r.targetId === destination.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!reviewTitle.trim() || !reviewComment.trim()) return;

    addReview({
      targetType: 'destination',
      targetId: destination.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment
    });

    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-[#E8E8ED] my-8 transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close & Save */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => toggleSaveDestination(destination.id)}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1D1D1F] shadow-md backdrop-blur-md transition-all cursor-pointer"
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#1D1D1F]'}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1D1D1F] shadow-md backdrop-blur-md transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Main Photo Gallery Hero */}
          <div className="relative h-72 sm:h-96 w-full bg-[#1D1D1F]">
            <img
              src={destination.galleryImages[activePhotoIdx] || destination.coverImage}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Thumbnail Selectors */}
            {destination.galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 z-10">
                {destination.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-14 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activePhotoIdx === idx ? 'border-white scale-105 shadow-md' : 'border-white/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute top-6 left-6 right-16 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                  {destination.continent}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white flex items-center gap-1">
                  <CloudSun className="w-3.5 h-3.5" />
                  {destination.weather.temp} • {destination.weather.condition}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm tracking-tight">
                {destination.name}, <span className="font-light">{destination.country}</span>
              </h2>
            </div>
          </div>

          {/* Destination Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED]">
              <div>
                <p className="text-[11px] uppercase font-bold text-[#86868B]">Rating</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-base font-bold text-[#1D1D1F]">{destination.rating}</span>
                  <span className="text-xs text-[#86868B]">({destination.reviewCount})</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase font-bold text-[#86868B]">Avg. Daily Cost</p>
                <p className="text-base font-bold text-[#1D1D1F] mt-0.5">${destination.avgCostPerDay} <span className="text-xs font-normal text-[#86868B]">/ day</span></p>
              </div>

              <div>
                <p className="text-[11px] uppercase font-bold text-[#86868B]">Best Season</p>
                <p className="text-xs font-semibold text-[#1D1D1F] mt-1">{destination.bestSeason}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase font-bold text-[#86868B]">Categories</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {destination.categories.map((c) => (
                    <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8E8ED] text-[#1D1D1F] font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview & Highlights */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm uppercase font-bold tracking-wider text-[#86868B]">About the Destination</h3>
                <p className="text-lg font-medium text-[#1D1D1F] mt-1 italic">"{destination.tagline}"</p>
                <p className="text-sm sm:text-base text-[#86868B] leading-relaxed mt-2">{destination.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1D1D1F] mb-2.5">Key Highlights & Cultural Experiences</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F7] border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F]">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Tour Packages */}
            {relatedPackages.length > 0 && (
              <div className="border-t border-[#E8E8ED] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-[#1D1D1F] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#1D1D1F]" />
                    Curated Tour Packages in {destination.name}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-4 rounded-2xl border border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#D2D2D7] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#86868B] mb-1">
                          <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                          <span className="font-semibold text-emerald-600">{pkg.groupSize}</span>
                        </div>
                        <h5 className="font-bold text-sm text-[#1D1D1F] leading-snug">{pkg.title}</h5>
                        <p className="text-xs text-[#86868B] mt-1 line-clamp-2">{pkg.overview}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E8E8ED] flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#86868B]">From</span>
                          <p className="text-base font-bold text-[#1D1D1F]">${pkg.price}</p>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            setSelectedPackage(pkg);
                          }}
                          className="px-4 py-2 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          View Itinerary
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Boutique Hotels */}
            {relatedHotels.length > 0 && (
              <div className="border-t border-[#E8E8ED] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-[#1D1D1F] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1D1D1F]" />
                    Handpicked Stays in {destination.name}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedHotels.map((htl) => (
                    <div
                      key={htl.id}
                      className="p-4 rounded-2xl border border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#D2D2D7] transition-all flex flex-col justify-between"
                    >
                      <div className="flex gap-3">
                        <img src={htl.coverImage} alt={htl.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="flex items-center gap-1 text-xs text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-[#1D1D1F]">{htl.rating}</span>
                          </div>
                          <h5 className="font-bold text-sm text-[#1D1D1F]">{htl.name}</h5>
                          <p className="text-[11px] text-[#86868B] mt-0.5 line-clamp-1">{htl.address}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E8E8ED] flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#86868B]">Nightly rate</span>
                          <p className="text-base font-bold text-[#1D1D1F]">${htl.pricePerNight}</p>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            setSelectedHotel(htl);
                          }}
                          className="px-4 py-2 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Book Stay
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="border-t border-[#E8E8ED] pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-[#1D1D1F]">
                    Traveler Reviews & Ratings
                  </h4>
                  <p className="text-xs text-[#86868B]">Real feedback from verified global travelers</p>
                </div>
                <button
                  onClick={() => {
                    if (!currentUser) openAuthModal('login');
                    else setShowReviewForm(!showReviewForm);
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-[#E8E8ED] text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="mb-6 p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1D1D1F]">Your Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewRating(s)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-amber-400' : 'text-[#E8E8ED]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Headline</label>
                    <input
                      type="text"
                      placeholder="Summarize your experience (e.g., An unforgettable dawn in Arashiyama)"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Your Story & Tips</label>
                    <textarea
                      rows={3}
                      placeholder="Share recommendations on best spots, food, and what to pack..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white rounded-xl border border-[#E8E8ED] text-xs font-medium focus:outline-none focus:border-[#D2D2D7]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#1D1D1F] text-white rounded-xl text-xs font-semibold hover:bg-[#2C2C2E] transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Post Review
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3">
                {destinationReviews.length === 0 ? (
                  <p className="text-xs text-[#86868B] italic py-3 text-center">No direct reviews yet. Be the first to review {destination.name}!</p>
                ) : (
                  destinationReviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={r.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                            alt={r.authorName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#1D1D1F]">{r.authorName}</p>
                            <p className="text-[10px] text-[#86868B]">{r.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs font-bold text-[#1D1D1F]">{r.title}</p>
                      <p className="text-xs text-[#86868B] leading-relaxed">{r.comment}</p>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-[#86868B]">
                        <span className="text-emerald-600 font-medium">✓ Verified Journey</span>
                        <button
                          onClick={() => voteHelpful(r.id)}
                          className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                        >
                          Helpful ({r.helpfulVotes})
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#F5F5F7] border-t border-[#E8E8ED] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#86868B]">Curated by Voyage Specialists</span>
            <p className="text-xs font-bold text-[#1D1D1F]">100% Verified Local Insights</p>
          </div>
          <button
            onClick={() => {
              onClose();
              setActiveTab('packages');
            }}
            className="px-5 py-2.5 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            Explore All Packages
          </button>
        </div>
      </div>
    </div>
  );
};
