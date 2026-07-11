import React from 'react';
import { Appointment } from '../../types/clinic';
import { X, Printer, MapPin, Phone, Calendar, Clock, User, ShieldCheck } from 'lucide-react';

interface PrintSlipModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export const PrintSlipModal: React.FC<PrintSlipModalProps> = ({ appointment, onClose }) => {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-sky-500/30 shadow-2xl overflow-hidden relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Hidden when printing) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Slip Content */}
        <div id="printable-slip" className="space-y-6 bg-white dark:bg-slate-900 p-2 rounded-2xl text-slate-800 dark:text-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-sky-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold">
                VDC
              </div>
              <div>
                <h3 className="text-lg font-extrabold font-heading tracking-tight text-sky-600 dark:text-sky-400">
                  Valli Dental Clinic
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                  Anna Nagar • Chennai
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                {appointment.status.toUpperCase()}
              </span>
              <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-1">
                Ref: {appointment.referenceCode}
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <User className="w-4 h-4 text-sky-500" />
              <span>Patient Details</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Patient Name</span>
                <span className="font-bold">{appointment.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Mobile Number</span>
                <span className="font-bold">{appointment.mobile}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Age / Gender</span>
                <span className="font-medium">{appointment.age} Yrs / {appointment.gender}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Email Address</span>
                <span className="font-medium truncate block">{appointment.email}</span>
              </div>
            </div>
          </div>

          {/* Appointment Schedule */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-sky-500" />
              <span>Appointment Schedule</span>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-500/30 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Treatment:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{appointment.treatment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Preferred Specialist:</span>
                <span className="font-bold">{appointment.preferredDoctor}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-sky-500/20">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-4 h-4 text-sky-500" />
                  {appointment.date}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  {appointment.time}
                </span>
              </div>
            </div>
          </div>

          {/* Clinic Address & Notes */}
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>No. Y19, Sri Sai Apartment, 50/19, 5th Avenue, Y Block, Anna Nagar, Chennai 600040</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-500" />
                Helpline: +91 98842 50607
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Booking Slip
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/30 hover:scale-[1.02] transition-transform"
          >
            <Printer className="w-4 h-4" />
            <span>Print Appointment Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
