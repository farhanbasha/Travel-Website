import React, { useState } from 'react';
import {
  X, ChevronLeft, ChevronRight, Camera, MapPin, Maximize2, Sparkles
} from 'lucide-react';
import { INITIAL_GALLERY } from '../data/mockData';
import { PhotoGalleryItem } from '../types';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotoGalleryItem | null>(null);

  const categories = ['All', 'Landscapes', 'Coastal', 'Culture', 'Architecture', 'Wildlife'];

  const filteredPhotos = selectedCategory === 'All'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter(p => p.category === selectedCategory);

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIdx = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const nextIdx = (currentIdx + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIdx = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const prevIdx = (currentIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">Visual Expeditions</span>
          <h2 className="text-3xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
            Global Photo Gallery
          </h2>
          <p className="text-sm text-[#86868B] mt-1">
            Moments captured in raw dawn light and alpine stillness by our resident photographers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1D1D1F] text-white shadow-xs font-semibold'
                  : 'bg-white border border-[#E8E8ED] hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photography Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative rounded-[2rem] overflow-hidden bg-[#F5F5F7] border border-[#E8E8ED] cursor-pointer aspect-4/5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">
                {photo.category}
              </span>
              <h4 className="font-bold text-sm leading-tight mt-0.5">
                {photo.title}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-white/80 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/70" />
                  {photo.location}, {photo.country}
                </span>
                <span className="text-[10px] text-white/60">© {photo.photographer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Minimalist Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />

            <div className="w-full text-center mt-4 text-white">
              <h3 className="text-xl font-bold font-['Space_Grotesk']">{activePhoto.title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {activePhoto.location}, {activePhoto.country} • Captured by {activePhoto.photographer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
