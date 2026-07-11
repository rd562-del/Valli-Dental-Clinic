import React, { useState } from 'react';
import { setAdminAuthenticated } from '../../services/firebase';
import { Shield, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('admin@vallidental.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      // Demo authentication or real admin auth check
      if (
        (email === 'admin@vallidental.com' && password === 'admin123') ||
        (email === 'ravi@vallidental.com' && password === 'doctor123')
      ) {
        setAdminAuthenticated(true);
        onSuccess();
      } else {
        setError("Invalid credentials. Please use the default demo login: admin@vallidental.com / admin123");
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 bg-slate-950 text-white relative overflow-hidden select-none">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass-panel dark:bg-slate-900/90 w-full max-w-md p-8 sm:p-10 rounded-3xl border border-sky-500/30 shadow-2xl relative z-10 animate-scaleUp">
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-sky-500/30">
            <Shield className="w-8 h-8 animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
            Admin Portal Login
          </h1>
          <p className="text-xs text-sky-400 font-bold uppercase tracking-wider">
            Valli Dental Clinic Management System
          </p>
        </div>

        {/* Demo Credentials Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-sky-400">
            <Sparkles className="w-4 h-4" />
            <span>Demo Reviewer Credentials:</span>
          </div>
          <div className="font-mono pt-1">
            Email: <span className="font-bold text-white">admin@vallidental.com</span>
          </div>
          <div className="font-mono">
            Password: <span className="font-bold text-white">admin123</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vallidental.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 transition-all font-mono"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white transition-colors underline"
            >
              Return to Public Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
