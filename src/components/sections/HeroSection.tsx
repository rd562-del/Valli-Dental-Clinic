import React from 'react';
import { ActiveTab } from '../../types/clinic';
import { FloatingDental3D } from '../3d/FloatingDental3D';
import { Calendar, PhoneCall, Sparkles, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 flex items-center overflow-hidden bg-slate-950 text-white select-none">
      {/* Background Cinematic Video Layer with Blur Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-35 blur-[2px]"
          poster="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patient-40540-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Deep luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* Ambient Floating Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Call to Action */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider animate-fadeIn">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>World-Class Luxury Dental Care • Anna Nagar</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-[1.1]">
              Your Smile, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 pr-0 lg:pr-4">
              Premium dental care with modern technology and experienced specialists. Experience painless root canals, 3D dental implants, and celebrity smile makeovers in a relaxing, 5-star environment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-bold text-base flex items-center justify-center gap-3 shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/60 hover:scale-105 active:scale-95 transition-all group"
              >
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-white dark:text-white font-bold text-base flex items-center justify-center gap-3 border border-white/20 hover:bg-white/10 hover:border-sky-400 transition-all"
              >
                <PhoneCall className="w-5 h-5 text-sky-400" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Trust Highlights below CTA */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">100% Painless</div>
                  <div className="text-[10px] text-slate-400">Microscopic care</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">4.98 ★ Rating</div>
                  <div className="text-[10px] text-slate-400">Verified reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">MDS Specialists</div>
                  <div className="text-[10px] text-slate-400">20+ Yrs clinical</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Floating 3D Illustration */}
          <div className="lg:col-span-6 relative">
            {/* Glowing Backdrop Ring for 3D */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-sky-500/20 bg-gradient-to-tr from-sky-500/10 via-transparent to-cyan-500/10 animate-pulse" />
            </div>

            {/* 3D WebGL Canvas */}
            <FloatingDental3D />
          </div>
        </div>
      </div>
    </section>
  );
};
