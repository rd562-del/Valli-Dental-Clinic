import React, { useState } from 'react';
import { X, Code, CheckCircle, Cpu, Database, Layout, Terminal, Copy } from 'lucide-react';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<'architecture' | 'firebase' | 'three' | 'admin'>('architecture');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const codeSnippets = {
    architecture: `// Project Architecture Summary - Valli Dental Clinic
// Built strictly with React, Vite, Tailwind CSS, Three.js & Firebase SDK

├── index.html                   # SEO, Open Graph, Schema.org MedicalClinic JSON-LD
├── src/
│   ├── App.tsx                  # Main Entry & Navigation Controller
│   ├── index.css                # 60 FPS Keyframes, Custom Scrollbar & Luxury Glassmorphism
│   ├── types/
│   │   └── clinic.ts            # Strongly-typed models for Appointments, Patients & Treatments
│   ├── services/
│   │   └── firebase.ts          # Firebase Auth, Firestore DB & 60FPS Hybrid State Engine
│   ├── data/
│   │   └── mockData.ts          # Initial 10 Treatments, Dr. Ravi & Dr. Aarthi Profiles, Gallery
│   ├── components/
│   │   ├── 3d/
│   │   │   └── FloatingDental3D.tsx  # Three.js WebGL Interactive 3D Tooth & Implant Showcase
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Cinematic Video Background + 3D Canvas
│   │   │   ├── AboutSection.tsx      # Split Layout & Animated Statistics
│   │   │   ├── DoctorsSection.tsx    # Dr. A. Ravi MDS & Dr. R. Aarthi MDS Cards
│   │   │   ├── TreatmentsSection.tsx # 10 Treatments with Detailed Modals
│   │   │   ├── GallerySection.tsx    # Masonry Gallery & Lightbox Viewer
│   │   │   ├── TestimonialsSection.tsx # Glass Carousel & Verified Reviews
│   │   │   ├── FaqSection.tsx        # Animated Accordion
│   │   │   ├── ContactSection.tsx    # Map, Address & WhatsApp Triggers
│   │   │   └── AppointmentSection.tsx# Booking Form + Confetti & Firestore Sync
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx        # Secure Admin Authentication
│   │   │   └── AdminDashboard.tsx    # Stats, Interactive Charts, CSV/Excel Export & Calendar
│   │   ├── common/                   # Sticky Navbar, Footer, WhatsApp, Loader & Cursor
│   │   └── modals/                   # Treatment, Print Slip & Firebase Status Modals
└── dist/                         # Optimized Production Build for Firebase Hosting`,
    firebase: `// src/services/firebase.ts snippet
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForValliDentalClinic2026X",
  authDomain: "valli-dental-clinic.firebaseapp.com",
  projectId: "valli-dental-clinic",
  storageBucket: "valli-dental-clinic.appspot.com",
  messagingSenderId: "988425060710",
  appId: "1:988425060710:web:8c420f12a3b4c5d6e7f8"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);`,
    three: `// src/components/3d/FloatingDental3D.tsx snippet
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Luxury Ceramic Material with Transmission & Clearcoat
const ceramicMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.12,
  metalness: 0.05,
  transmission: 0.25,
  ior: 1.5,
  clearcoat: 1.0,
  reflectivity: 0.9,
});`,
    admin: `// Admin Dashboard CSV Export Trigger
export const handleExportCSV = (appointments: Appointment[]) => {
  const headers = ['ID,Reference Code,Patient Name,Mobile,Email,Treatment,Doctor,Date,Time,Status'];
  const rows = appointments.map(a => 
    [a.id, a.referenceCode, a.name, a.mobile, a.email, a.treatment, a.preferredDoctor, a.date, a.time, a.status].join(',')
  );
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'Valli_Dental_Appointments.csv');
  document.body.appendChild(link);
  link.click();
};`
  };

  return (
    <div className="fixed inset-0 z-[350] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-sky-500/30 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-100/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500 text-white shadow-md">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
                Project Source Code & Architecture Viewer
              </h2>
              <p className="text-xs text-sky-600 dark:text-sky-400 font-bold">
                Hidden by Default • Explicitly Requested via Footer Action
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'architecture', label: 'Architecture & Tree', icon: Layout },
            { id: 'firebase', label: 'Firebase Backend SDK', icon: Database },
            { id: 'three', label: 'Three.js 3D Engine', icon: Cpu },
            { id: 'admin', label: 'Admin Export & Logic', icon: Terminal },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeFile === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveFile(t.id as any)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border-sky-500 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content Area */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 relative group">
          <button
            onClick={() => handleCopy(codeSnippets[activeFile])}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
          </button>

          <pre className="whitespace-pre-wrap leading-relaxed pr-16 pt-2">
            <code>{codeSnippets[activeFile]}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>All HTML, CSS, JavaScript/TypeScript source code is cleanly separated and modular.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-sky-500 text-white font-bold hover:bg-sky-600 transition-colors"
          >
            Close Code View
          </button>
        </div>
      </div>
    </div>
  );
};
