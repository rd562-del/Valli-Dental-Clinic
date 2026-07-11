import React, { useState } from 'react';
import { GalleryItem } from '../../types/clinic';
import { GALLERY_ITEMS } from '../../data/mockData';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Treatment Rooms', 'Equipment', 'Before & After', 'Lounge'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((g) => g.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentPhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Clinic Architecture & Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Our Luxury Clinic Gallery
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Step inside our Anna Nagar center. Designed with soothing Apple-inspired ergonomics, ultra-clean Class-B sterilization, and ambient operatory suites for ultimate patient tranquility.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-700/80 hover:text-sky-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:grid-flow-row-dense gap-6">
          {filteredItems.map((item, idx) => {
            const isSpan2 = idx % 5 === 0 && filteredItems.length > 2;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-800/80 ${
                  isSpan2 ? 'sm:col-span-2 sm:row-span-2 h-[340px] sm:h-[480px]' : 'h-[280px] sm:h-[320px]'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {item.category}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {currentPhoto && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn select-none"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors border border-slate-700"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-20 p-3.5 rounded-full bg-slate-900/80 text-white hover:bg-sky-600 transition-colors border border-slate-700"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-20 p-3.5 rounded-full bg-slate-900/80 text-white hover:bg-sky-600 transition-colors border border-slate-700"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative animate-scaleUp"
            >
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl max-h-[72vh]">
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.title}
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>

              {/* Photo Caption Box */}
              <div className="mt-4 glass-panel dark:bg-slate-900/90 px-6 py-4 rounded-2xl text-center max-w-2xl border border-sky-500/30">
                <div className="flex items-center justify-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>{currentPhoto.category}</span>
                  <span>•</span>
                  <span>Photo {lightboxIndex! + 1} of {filteredItems.length}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white font-heading">
                  {currentPhoto.title}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {currentPhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
