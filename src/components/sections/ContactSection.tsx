import React, { useState } from 'react';
import { addContactMessageToFirebase } from '../../services/firebase';
import { Sparkles, MapPin, Phone, Clock, Send, Navigation, MessageCircle, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await addContactMessageToFirebase(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      alert("Error submitting message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addressString = "No. Y19, Sri Sai Apartment, 50/19, 5th Avenue, Y Block, Anna Nagar, Chennai, Tamil Nadu 600040";
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Connect With Our Care Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Get in Touch With Us
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Whether you have a general inquiry, want to verify your dental coverage, or need urgent directions to our Anna Nagar apartment center, we are here for you.
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start mb-16">
          {/* Left Col: Contact Cards & Quick Triggers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-sky-500/20 space-y-6 shadow-xl">
              <div>
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                  Valli Dental Clinic
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mt-0.5">
                  Senior Specialist Center • Anna Nagar
                </p>
              </div>

              {/* Exact Address Requirement */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <div className="p-3 rounded-2xl bg-sky-500 text-white shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Clinic Location
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                    No. Y19, Sri Sai Apartment, <br />
                    50/19, 5th Avenue, <br />
                    Y Block, <br />
                    Anna Nagar, <br />
                    Chennai, <br />
                    Tamil Nadu 600040
                  </div>
                </div>
              </div>

              {/* Exact Phone Requirement */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shrink-0 shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Direct Phone Line
                  </div>
                  <a href="tel:+919884250607" className="text-lg sm:text-xl font-extrabold text-sky-600 dark:text-sky-400 hover:underline">
                    98842 50607
                  </a>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <div className="p-3 rounded-2xl bg-slate-800 text-white shrink-0 shadow-md">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Consultation Hours
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <div>Mon – Sat: 10:00 AM – 8:30 PM</div>
                    <div>Sunday: 10:00 AM – 2:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call Now, Get Directions, WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <a
                  href="tel:+919884250607"
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-400 dark:text-sky-600" />
                  <span>Directions</span>
                </a>

                <a
                  href="https://wa.me/919884250607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Col: Contact Message Form (Saves to Firestore) */}
          <div className="lg:col-span-7">
            <div className="glass-panel dark:bg-slate-900/90 p-6 sm:p-10 rounded-3xl border border-sky-500/30 shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                  Send Us a Direct Message
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                  Have a question? Fill out this quick form and our clinic reception will get back to you promptly.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold flex items-center gap-3 animate-fadeIn">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    Your message has been sent successfully! Our team will contact you soon.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Karthik Subramanian"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. karthik@example.com"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98401 23456"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Root Canal Inquiry / Insurance"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you with your dental checkup or treatment..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Google Map Requirement */}
        <div className="mt-12 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative h-96">
          <iframe
            title="Valli Dental Clinic Anna Nagar Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.295289947942!2d80.2079!3d13.0850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52641f021307eb%3A0x1010101010!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter dark:invert dark:hue-rotate-180 dark:contrast-90"
          />
          <div className="absolute top-4 left-4 glass-panel dark:bg-slate-900/90 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg border border-sky-500/30 pointer-events-none">
            <MapPin className="w-4 h-4 text-sky-500" />
            <span>5th Avenue, Y Block, Anna Nagar, Chennai 600040</span>
          </div>
        </div>
      </div>
    </section>
  );
};
