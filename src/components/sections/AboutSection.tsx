import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle, Shield, Award, Heart, Cpu, Smile } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Happy Patients', target: 12500, suffix: '+', icon: Smile, color: 'from-sky-500 to-blue-600' },
    { label: 'Years Experience', target: 18, suffix: '+', icon: Award, color: 'from-blue-600 to-cyan-500' },
    { label: 'Treatments', target: 25, suffix: '+', icon: Cpu, color: 'from-cyan-500 to-teal-500' },
    { label: 'Success Rate', target: 99.8, suffix: '%', icon: Shield, color: 'from-teal-500 to-emerald-500', isFloat: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Beautiful Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Luxury Image Composition & Floating Glass Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-2xl shadow-sky-500/10">
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1000&q=80"
                  alt="Valli Dental Clinic Advanced Operatory"
                  className="w-full h-[440px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>

              {/* Floating Glass Badge 1: Top Left */}
              <div className="absolute -top-6 -left-6 sm:-left-8 glass-panel dark:bg-slate-900/90 p-4 rounded-2xl shadow-xl border border-sky-500/30 flex items-center gap-3 animate-float">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">3D CBCT & Laser Care</div>
                  <div className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">Zero Radiation Diagnostic</div>
                </div>
              </div>

              {/* Floating Glass Badge 2: Bottom Right */}
              <div className="absolute -bottom-6 -right-6 sm:-right-8 glass-panel dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl shadow-xl border border-cyan-500/30 flex items-center gap-3.5 animate-float-slow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                  <Heart className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">Class-B Sterilization</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Hospital-Grade Safety Protocol</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Welcome Text & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>About Valli Dental Clinic</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Valli Dental Clinic.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl font-medium leading-relaxed">
              We provide advanced dental treatments with personalized care using modern technology.
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              Located in the heart of Anna Nagar, Chennai, our clinic blends luxury hospitality with microscopic precision. Every treatment—from routine scaling to full mouth implant rehabilitation—is planned digitally and executed under sedation and high-magnification optics to ensure a 100% anxiety-free experience.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Microscopic Root Canal under 60 mins',
                'Computer-Guided Titanium Implants',
                'Transparent Clear Aligners & Braces',
                'Dedicated Child-Friendly Pediatric Wing',
                'Digital Smile Design Architectural Planning',
                '0% EMI Flexible Payment Plans Available',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Statistics Grid Below */}
        <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center text-center group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                    {inView ? (
                      <Counter end={stat.target} suffix={stat.suffix} isFloat={stat.isFloat} />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for smooth animated counting
const Counter: React.FC<{ end: number; suffix: string; isFloat?: boolean }> = ({ end, suffix, isFloat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
};
