import React, { useState } from 'react';
import { ActiveTab } from '../../types/clinic';
import { Sparkles, Phone, MapPin, Mail, Send, CheckCircle, Code, ArrowRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
  onToggleSourceCodeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenPrivacyModal,
  onOpenTermsModal,
  onToggleSourceCodeModal
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Cyan background gradient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Newsletter Banner */}
      <div className="border-b border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="glass-panel dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-sky-500/20">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Stay Informed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Subscribe to Our Dental Health Newsletter
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Get monthly dental care tips, smile checkup reminders, and exclusive offers delivered directly to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5 min-w-[320px]">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {subscribed && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Thank you for subscribing! We have sent a welcome gift package to your email.</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-heading text-white">
                Valli Dental Clinic
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-6">
              Valli Dental Clinic is Anna Nagar's premier luxury dental care center. We combine microscopic diagnostics with gentle, personalized care to craft confident, lifelong healthy smiles.
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  No. Y19, Sri Sai Apartment, 50/19, 5th Avenue, Y Block, Anna Nagar, Chennai, Tamil Nadu 600040
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="tel:+919884250607" className="hover:text-sky-400 font-bold transition-colors">
                  +91 98842 50607
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="mailto:appointments@vallidental.com" className="hover:text-sky-400 transition-colors">
                  appointments@vallidental.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-sky-600 hover:border-sky-500 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-sky-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', id: 'home' as ActiveTab },
                { label: 'About Us', id: 'about' as ActiveTab },
                { label: 'All Treatments', id: 'treatments' as ActiveTab },
                { label: 'Our Doctors', id: 'doctors' as ActiveTab },
                { label: 'Clinic Gallery', id: 'gallery' as ActiveTab },
                { label: 'Patient Reviews', id: 'testimonials' as ActiveTab },
                { label: 'FAQ Answers', id: 'faq' as ActiveTab },
                { label: 'Contact & Map', id: 'contact' as ActiveTab },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-slate-400 hover:text-sky-400 flex items-center gap-2 transition-colors text-left"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500/60" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Treatments */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-sky-500 pl-3">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                'Root Canal Treatment',
                'Dental Implants',
                'Braces & Aligners',
                'Laser Whitening',
                'Smile Makeover',
                'Pediatric Dentistry',
                'Zirconia Crowns',
                'Tooth Extractions',
              ].map((t, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick('treatments')}
                    className="hover:text-sky-400 transition-colors text-left flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>{t}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Doctors & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-sky-500 pl-3">
              Specialists
            </h4>
            <div className="space-y-3 text-sm">
              <div 
                onClick={() => handleNavClick('doctors')} 
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-sky-500/40 cursor-pointer transition-all"
              >
                <div className="font-bold text-white">Dr. A. Ravi MDS</div>
                <div className="text-xs text-sky-400">Cosmetic & Root Canal Specialist</div>
              </div>
              <div 
                onClick={() => handleNavClick('doctors')} 
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-sky-500/40 cursor-pointer transition-all"
              >
                <div className="font-bold text-white">Dr. R. Aarthi MDS</div>
                <div className="text-xs text-sky-400">Pediatric & Orthodontic Surgeon</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Consultation Hours:</div>
              <div>Mon - Sat: 10:00 AM - 8:30 PM</div>
              <div>Sunday: 10:00 AM - 2:00 PM</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Source Code Request */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Valli Dental Clinic • Anna Nagar, Chennai. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-300 transition-colors underline decoration-slate-700"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTermsModal}
              className="hover:text-slate-300 transition-colors underline decoration-slate-700"
            >
              Terms of Service
            </button>

            {/* Source Code Toggle Requirement */}
            <button
              onClick={onToggleSourceCodeModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-400 hover:text-sky-400 border border-slate-700/80 transition-all font-mono"
            >
              <Code className="w-3.5 h-3.5 text-sky-400" />
              <span>Source Code & Architecture (Hidden)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
