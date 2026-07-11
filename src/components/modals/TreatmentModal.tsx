import React from 'react';
import { Treatment } from '../../types/clinic';
import { X, CheckCircle, Clock, Activity, Shield, Calendar, Sparkles } from 'lucide-react';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookTreatment: (treatmentTitle: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatment,
  onClose,
  onBookTreatment,
}) => {
  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel dark:bg-slate-900/90 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-500/30 shadow-2xl relative p-6 sm:p-8 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Treatment Image Banner */}
        <div className="relative h-56 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 rounded-t-3xl overflow-hidden">
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 sm:left-8 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              {treatment.category} Specialist Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {treatment.title}
            </h2>
          </div>
        </div>

        {/* Details Content */}
        <div className="space-y-6">
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            {treatment.fullDescription}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-500/20 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500 text-white shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Duration</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{treatment.duration}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/20 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500 text-white shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Recovery</div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{treatment.recovery}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Estimate Range</div>
                <div className="text-sm font-bold text-sky-600 dark:text-sky-400">{treatment.priceEstimate}</div>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
              Key Clinical Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treatment.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              * Performed under strict hospital-grade 4-step sterilization.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookTreatment(treatment.title);
                }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
