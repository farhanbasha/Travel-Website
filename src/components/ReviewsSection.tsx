import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Send, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, voteHelpful, currentUser, openAuthModal, destinations } = useApp();

  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formTarget, setFormTarget] = useState(destinations[0]?.id || 'dest_kyoto');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2)
    : '5.0';

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    pct: totalReviews > 0 ? Math.round((reviews.filter(r => r.rating === stars).length / totalReviews) * 100) : 0
  }));

  const filteredReviews = selectedRatingFilter
    ? reviews.filter(r => r.rating === selectedRatingFilter)
    : reviews;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!formTitle.trim() || !formComment.trim()) return;

    addReview({
      targetType: 'destination',
      targetId: formTarget,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      rating: formRating,
      title: formTitle,
      comment: formComment
    });

    setFormTitle('');
    setFormComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Community Trust</span>
          <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Traveler Reviews & Ratings
          </h2>
          <p className="text-sm text-[#86868B] mt-1">
            Authentic reflections from travelers who have explored our curated journeys across the globe.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) openAuthModal('login');
            else setShowReviewForm(!showReviewForm);
          }}
          className="px-5 py-2.5 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-full text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer shadow-sm"
        >
          {showReviewForm ? 'Close Form' : 'Write a Review'}
        </button>
      </div>

      {/* Aggregate Score Card */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Big Number */}
        <div className="md:col-span-4 text-center md:text-left md:border-r border-[#E8E8ED] md:pr-8">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-5xl font-bold text-[#1D1D1F] tracking-tight">{avgRating}</span>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-[#86868B] mt-0.5">Overall Satisfaction</span>
            </div>
          </div>
          <p className="text-xs text-[#86868B] mt-3">
            Based on {totalReviews} certified journey audits and guest reviews.
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-8 space-y-2">
          {ratingCounts.map(item => (
            <div
              key={item.stars}
              onClick={() => setSelectedRatingFilter(selectedRatingFilter === item.stars ? null : item.stars)}
              className={`flex items-center gap-3 text-xs cursor-pointer p-1.5 rounded-xl transition-colors ${
                selectedRatingFilter === item.stars ? 'bg-[#F5F5F7] font-bold' : 'hover:bg-[#F5F5F7]'
              }`}
            >
              <div className="flex items-center gap-1 w-14 shrink-0 text-[#1D1D1F]">
                <span>{item.stars}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1 h-2 bg-[#E8E8ED] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1D1D1F] rounded-full transition-all duration-500"
                  style={{ width: `${item.pct}%` }}
                />
              </div>

              <span className="w-10 text-right text-[#86868B] text-[11px]">{item.count}</span>
            </div>
          ))}
          {selectedRatingFilter && (
            <button
              onClick={() => setSelectedRatingFilter(null)}
              className="text-xs text-[#0066CC] hover:underline pt-1 cursor-pointer"
            >
              Clear {selectedRatingFilter}-star filter
            </button>
          )}
        </div>
      </div>

      {/* Review Submission Form Modal/Panel */}
      {showReviewForm && (
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#E8E8ED] shadow-sm mb-8">
          <h3 className="text-lg font-bold text-[#1D1D1F] mb-1">
            Submit Your Experience
          </h3>
          <p className="text-xs text-[#86868B] mb-6">
            Reviewing as <span className="font-semibold text-[#1D1D1F]">{currentUser?.name}</span> ({currentUser?.email})
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Destination / Journey</label>
                <select
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7] cursor-pointer"
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Your Rating</label>
                <div className="flex items-center gap-1 py-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormRating(s)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${s <= formRating ? 'fill-amber-400 text-amber-400' : 'text-[#E8E8ED]'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Review Headline</label>
              <input
                type="text"
                placeholder="e.g. Unrivaled hospitality and majestic alpine sunrises"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1">Your Detailed Review</label>
              <textarea
                rows={4}
                placeholder="Share your personal experience, hotel service quality, scenery, food, and what made the trip special..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#F5F5F7] rounded-xl border border-[#E8E8ED] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#D2D2D7]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#86868B] hover:bg-[#F5F5F7] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1D1D1F] hover:bg-[#2C2C2E] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Post Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-[2rem] bg-white border border-[#E8E8ED] shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={rev.authorName}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E8E8ED]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#1D1D1F]">{rev.authorName}</h4>
                    <p className="text-[10px] text-[#86868B]">{rev.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <h5 className="font-bold text-sm text-[#1D1D1F] pt-1">
                {rev.title}
              </h5>

              <p className="text-xs text-[#86868B] leading-relaxed">
                {rev.comment}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8E8ED] flex items-center justify-between text-xs">
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-emerald-200">
                <CheckCircle className="w-3 h-3" /> Verified Traveler
              </span>

              <button
                onClick={() => voteHelpful(rev.id)}
                className="flex items-center gap-1 text-[#86868B] hover:text-[#1D1D1F] transition-colors text-[11px] cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.helpfulVotes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
