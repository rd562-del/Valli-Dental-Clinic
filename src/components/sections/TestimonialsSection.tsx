import React, { useState, useEffect } from 'react';
import { Review } from '../../types/clinic';
import { getStoredReviews } from '../../services/firebase';
import { Sparkles, Star, Quote, ChevronLeft, ChevronRight, CheckCircle, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loaded = getStoredReviews();
    setReviews(loaded);

    const handleUpdate = () => setReviews(getStoredReviews());
    window.addEventListener('valli-data-changed', handleUpdate);
    return () => window.removeEventListener('valli-data-changed', handleUpdate);
  }, []);

  // Auto sliding carousel timer (5 seconds)
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleNext = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Glows */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Verified Patient Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Loved by Over 12,500+ Patients
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Here is what our patients say about their journey to pain-free, celebrity-grade smiles at Valli Dental Clinic in Anna Nagar.
          </p>

          {/* Google Reviews Badge */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="glass-panel dark:bg-slate-900 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-sky-500/30 shadow-md">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white font-black text-xs">
                G
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <span>4.98 ★★★★★</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Verified Google Business Reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Glass Card for active review */}
          <div className="glass-card dark:bg-slate-900/80 rounded-3xl border border-sky-500/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
            {/* Background watermarked quote icon */}
            <Quote className="absolute top-6 right-8 w-32 h-32 text-sky-500/10 -rotate-12 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
              {/* Patient Avatar & Verified Badge */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-sky-500/40 shadow-lg relative">
                  <img
                    src={reviews[currentIndex].avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                    alt={reviews[currentIndex].patientName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {reviews[currentIndex].verified && (
                  <span className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Patient
                  </span>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                {/* Star Rating & Treatment Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < reviews[currentIndex].rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-300 dark:fill-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20 self-center sm:self-auto">
                    {reviews[currentIndex].treatment}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg italic leading-relaxed font-medium">
                  "{reviews[currentIndex].comment}"
                </p>

                {/* Patient Name & Treated Doctor */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                      {reviews[currentIndex].patientName}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Treated at Anna Nagar Clinic • {reviews[currentIndex].date}
                    </span>
                  </div>

                  {reviews[currentIndex].doctorName && (
                    <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center justify-center sm:justify-end gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{reviews[currentIndex].doctorName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls & Indicators below */}
          <div className="mt-8 flex items-center justify-between px-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 bg-sky-500 shadow-md shadow-sky-500/50'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-sky-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-md hover:border-sky-500 hover:text-sky-600 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-md hover:border-sky-500 hover:text-sky-600 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
