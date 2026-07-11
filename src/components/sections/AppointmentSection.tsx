import React, { useState } from 'react';
import { addAppointmentToFirebase } from '../../services/firebase';
import { Appointment } from '../../types/clinic';
import { TREATMENTS_DATA, DOCTORS_DATA } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, User, Phone, Mail, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface AppointmentSectionProps {
  initialTreatment?: string;
  initialDoctor?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  initialTreatment,
  initialDoctor
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: 30,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    treatment: initialTreatment || TREATMENTS_DATA[0].title,
    preferredDoctor: initialDoctor || DOCTORS_DATA[0].name,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow by default
    time: '11:00 AM',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const timeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM', '05:00 PM', '06:30 PM', '07:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email) {
      alert("Please enter Name, Mobile, and Email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await addAppointmentToFirebase({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        age: Number(formData.age),
        gender: formData.gender,
        treatment: formData.treatment,
        preferredDoctor: formData.preferredDoctor,
        date: formData.date,
        time: formData.time,
        notes: formData.notes
      });

      setBookedAppointment(created);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0EA5E9', '#2563EB', '#06B6D4', '#10B981']
        });
      } catch { /* fallback if canvas issue */ }
    } catch {
      alert("Error booking appointment. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Cyan background gradient glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Instant Online Booking • Anna Nagar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
            Schedule Your Consultation
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Fill in your preferred date and treatment. All bookings are synced instantly to our clinical calendar with automated confirmation.
          </p>
        </div>

        {/* Form or Success Screen */}
        {bookedAppointment ? (
          /* Success Animation Box */
          <div className="glass-panel dark:bg-slate-900/90 p-8 sm:p-12 rounded-3xl border-2 border-emerald-500/40 shadow-2xl text-center max-w-2xl mx-auto space-y-6 animate-scaleUp">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Appointment Requested Successfully!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Thank you, <strong>{bookedAppointment.name}</strong>. Your appointment code is <span className="font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-lg">{bookedAppointment.referenceCode}</span>.
              </p>
            </div>

            {/* Summary card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2.5">
                <span className="text-slate-500">Treatment Selected:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{bookedAppointment.treatment}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2.5">
                <span className="text-slate-500">Assigned Specialist:</span>
                <span className="font-bold">{bookedAppointment.preferredDoctor}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2.5">
                <span className="text-slate-500">Schedule Date & Time:</span>
                <span className="font-bold">{bookedAppointment.date} at {bookedAppointment.time}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-500">Status:</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                  APPROVED (Instant Auto-Confirmation)
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setBookedAppointment(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Luxury Appointment Form */
          <div className="glass-panel dark:bg-slate-900/90 p-6 sm:p-10 lg:p-12 rounded-3xl border border-sky-500/30 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info Group */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold font-heading text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <User className="w-4 h-4 text-sky-500" />
                  <span>Step 1: Patient Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Raghavan"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="98842 50607"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={120}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Treatment & Specialist Group */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-extrabold font-heading text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Shield className="w-4 h-4 text-cyan-500" />
                  <span>Step 2: Treatment & Doctor Preference</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Select Treatment *
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    >
                      {TREATMENTS_DATA.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title} ({t.category})
                        </option>
                      ))}
                      <option value="General Checkup & Consultation">General Checkup & Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Preferred Specialist *
                    </label>
                    <select
                      value={formData.preferredDoctor}
                      onChange={(e) => setFormData({ ...formData, preferredDoctor: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Dr. A. Ravi MDS">Dr. A. Ravi MDS (Cosmetic & Root Canal Specialist)</option>
                      <option value="Dr. R. Aarthi MDS">Dr. R. Aarthi MDS (Pediatric & Orthodontic Surgeon)</option>
                      <option value="Any Available Specialist">First Available MDS Specialist</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time Group */}
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-extrabold font-heading text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Step 3: Schedule Slot</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Available Time Slot *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, time: slot })}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                              isSelected
                                ? 'bg-sky-500 text-white border-sky-600 shadow-md'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400'
                            }`}
                          >
                            <Clock className="w-3 h-3 inline mr-1 opacity-70" />
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Medical Notes / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Sensitivity to cold water on lower right tooth / Diabetic checkup..."
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                  <span>🔒 Your health data is encrypted and strictly confidential.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all group"
                >
                  {isSubmitting ? (
                    <span>Processing Booking...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
