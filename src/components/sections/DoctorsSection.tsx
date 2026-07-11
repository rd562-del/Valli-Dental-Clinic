import React from 'react';
import { ActiveTab } from '../../types/clinic';
import { DOCTORS_DATA } from '../../data/mockData';
import { Award, Sparkles, Star, Calendar, ShieldCheck } from 'lucide-react';

interface DoctorsSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDoctorForBooking: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  setActiveTab,
  onSelectDoctorForBooking
}) => {
  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Cyan background gradient glow */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Experienced MDS Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Meet Our Senior Specialists
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Our founding MDS specialists bring decades of combined clinical expertise, combining empathetic chairside care with mastery of modern digital diagnostics.
          </p>
        </div>

        {/* Premium Doctor Profile Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 max-w-5xl mx-auto">
          {DOCTORS_DATA.map((doc) => {
            return (
              <div
                key={doc.id}
                className="glass-card dark:bg-slate-800/80 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between group shadow-xl hover:shadow-2xl relative overflow-hidden transition-all duration-500"
              >
                {/* Floating Decorative Medical Badge inside card */}
                <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified MDS Specialist</span>
                </div>

                <div>
                  {/* Doctor Profile Header Split */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                    {/* Professional Photo Placeholder with Glass Border & Floating Icon */}
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg animate-float">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Titles and Qualifications */}
                    <div className="text-center sm:text-left space-y-1 sm:pt-2">
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{doc.rating} ★ Rating</span>
                        <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {doc.name}
                      </h3>

                      <div className="text-sm font-bold text-sky-600 dark:text-sky-400">
                        {doc.title}
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {doc.qualifications}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                    {doc.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Core Clinical Specialties:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doc.specialties.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-500/20 text-sky-700 dark:text-sky-300 font-semibold text-xs transition-colors group-hover:border-sky-500/40"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                    <span className="font-semibold block text-slate-700 dark:text-slate-300">Consultation Days:</span>
                    {doc.consultationDays}
                  </div>

                  <button
                    onClick={() => {
                      onSelectDoctorForBooking(doc.name);
                      setActiveTab('appointment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all group-hover:shadow-sky-500/50"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
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
