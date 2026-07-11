import React from 'react';
import { Treatment, ActiveTab } from '../../types/clinic';
import { TREATMENTS_DATA } from '../../data/mockData';
import { Sparkles, ShieldCheck, Cpu, Zap, Heart, Smile, CheckCircle, Activity, Droplet, Award, ArrowRight } from 'lucide-react';

interface TreatmentsSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectTreatment: (treatment: Treatment) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatment
}) => {
  // Map icon name string to exact Lucide Icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Cpu': return Cpu;
      case 'Sparkles': return Sparkles;
      case 'Zap': return Zap;
      case 'Heart': return Heart;
      case 'Smile': return Smile;
      case 'CheckCircle': return CheckCircle;
      case 'Activity': return Activity;
      case 'Droplet': return Droplet;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Comprehensive Dental Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Advanced Clinical Treatments
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            From single-visit microscopic root canals to full-mouth 3D digital implant restorations, every treatment is delivered with uncompromising comfort and clinical safety.
          </p>
        </div>

        {/* Treatments Grid (10 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {TREATMENTS_DATA.map((t) => {
            const Icon = getIconComponent(t.iconName);
            return (
              <div
                key={t.id}
                onClick={() => onSelectTreatment(t)}
                className="glass-card dark:bg-slate-900/70 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 flex flex-col justify-between group shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-400 relative overflow-hidden"
              >
                {/* Top Shimmer border effect on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Category Pill + Large Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-950 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {t.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white mb-2.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {t.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {t.shortDescription}
                  </p>
                </div>

                {/* Card Footer: Duration + Learn More Button */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {t.duration}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTreatment(t);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
