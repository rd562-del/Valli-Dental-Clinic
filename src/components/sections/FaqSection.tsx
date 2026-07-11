import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/mockData';
import { Sparkles, ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { ActiveTab } from '../../types/clinic';

interface FaqSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ setActiveTab }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Here are honest answers to the most common questions our patients ask before their dental consultation.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`glass-card dark:bg-slate-800/60 rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-sky-500 shadow-xl bg-white/90 dark:bg-slate-800/90'
                    : 'border-slate-200/80 dark:border-slate-700/80 hover:border-sky-500/40'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white group focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-sky-500' : 'text-slate-400 group-hover:text-sky-500'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-sky-500 text-white rotate-180 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-sky-50 dark:group-hover:bg-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 px-6 pb-7 pt-1 sm:px-7' : 'max-h-0 opacity-0 px-6 sm:px-7'
                  }`}
                >
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pl-8 border-l-2 border-sky-500/30">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still need help callout */}
        <div className="mt-16 glass-panel dark:bg-slate-800/80 p-8 rounded-3xl border border-sky-500/30 text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            Have a Specific Dental Question or Emergency?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
            Our specialized coordinators and doctors are ready to assist with insurance plans, second opinions, or urgent tooth pain relief.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:+919884250607"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-105 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 98842 50607</span>
            </a>
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 transition-colors"
            >
              Send Us a Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
