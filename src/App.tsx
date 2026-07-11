import { useState, useEffect } from 'react';
import { ActiveTab, Treatment, Appointment } from './types/clinic';
import { isAdminAuthenticated } from './services/firebase';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BackToTop } from './components/common/BackToTop';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { PageLoader } from './components/common/PageLoader';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { DoctorsSection } from './components/sections/DoctorsSection';
import { TreatmentsSection } from './components/sections/TreatmentsSection';
import { GallerySection } from './components/sections/GallerySection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { ContactSection } from './components/sections/ContactSection';
import { AppointmentSection } from './components/sections/AppointmentSection';

// Modals
import { TreatmentModal } from './components/modals/TreatmentModal';
import { PrintSlipModal } from './components/modals/PrintSlipModal';
import { FirebaseConfigModal } from './components/modals/FirebaseConfigModal';
import { SourceCodeModal } from './components/modals/SourceCodeModal';

// Admin Portal
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDark, setIsDark] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Selected Treatment for Modal or Booking
  const [selectedTreatmentForModal, setSelectedTreatmentForModal] = useState<Treatment | null>(null);
  const [selectedTreatmentTitleForBooking, setSelectedTreatmentTitleForBooking] = useState<string | undefined>(undefined);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);

  // Print Slip Modal State
  const [printAppointment, setPrintAppointment] = useState<Appointment | null>(null);

  // System Inspection Modals
  const [firebaseModalOpen, setFirebaseModalOpen] = useState(false);
  const [sourceCodeModalOpen, setSourceCodeModalOpen] = useState(false);

  // Legal Modals (Privacy / Terms)
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference or saved class
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    // Check initial admin auth
    setIsAdminLoggedIn(isAdminAuthenticated());

    const handleAuthChange = () => setIsAdminLoggedIn(isAdminAuthenticated());
    window.addEventListener('valli-data-changed', handleAuthChange);
    return () => window.removeEventListener('valli-data-changed', handleAuthChange);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleSelectTreatmentForBooking = (treatmentTitle: string) => {
    setSelectedTreatmentTitleForBooking(treatmentTitle);
    setActiveTab('appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctorForBooking = (doctorName: string) => {
    setSelectedDoctorForBooking(doctorName);
    setActiveTab('appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Page Loader on Initial Load */}
      {!isLoaded && <PageLoader onLoaded={() => setIsLoaded(true)} />}

      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Trailing Cursor */}
      <CustomCursor />

      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenFirebaseModal={() => setFirebaseModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          isAdminLoggedIn ? (
            <AdminDashboard
              onLogout={() => {
                setIsAdminLoggedIn(false);
                setActiveTab('home');
              }}
              onPrintAppointment={(apt) => setPrintAppointment(apt)}
            />
          ) : (
            <AdminLogin
              onSuccess={() => setIsAdminLoggedIn(true)}
              onCancel={() => setActiveTab('home')}
            />
          )
        ) : (
          /* Public Website Sections Controller */
          <>
            {(activeTab === 'home') && (
              <>
                <HeroSection setActiveTab={setActiveTab} />
                <AboutSection />
                <DoctorsSection
                  setActiveTab={setActiveTab}
                  onSelectDoctorForBooking={handleSelectDoctorForBooking}
                />
                <TreatmentsSection
                  setActiveTab={setActiveTab}
                  onSelectTreatment={(t) => setSelectedTreatmentForModal(t)}
                />
                <GallerySection />
                <TestimonialsSection />
                <FaqSection setActiveTab={setActiveTab} />
                <ContactSection />
              </>
            )}

            {activeTab === 'about' && (
              <div className="pt-16">
                <AboutSection />
                <DoctorsSection
                  setActiveTab={setActiveTab}
                  onSelectDoctorForBooking={handleSelectDoctorForBooking}
                />
              </div>
            )}

            {activeTab === 'treatments' && (
              <div className="pt-16">
                <TreatmentsSection
                  setActiveTab={setActiveTab}
                  onSelectTreatment={(t) => setSelectedTreatmentForModal(t)}
                />
                <FaqSection setActiveTab={setActiveTab} />
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="pt-16">
                <DoctorsSection
                  setActiveTab={setActiveTab}
                  onSelectDoctorForBooking={handleSelectDoctorForBooking}
                />
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="pt-16">
                <GallerySection />
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="pt-16">
                <TestimonialsSection />
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="pt-16">
                <FaqSection setActiveTab={setActiveTab} />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="pt-16">
                <ContactSection />
              </div>
            )}

            {activeTab === 'appointment' && (
              <div className="pt-16">
                <AppointmentSection
                  initialTreatment={selectedTreatmentTitleForBooking}
                  initialDoctor={selectedDoctorForBooking}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer (Always visible except possibly inside isolated admin view if wanted, but fine across) */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenTermsModal={() => setTermsModalOpen(true)}
        onToggleSourceCodeModal={() => setSourceCodeModalOpen(!sourceCodeModalOpen)}
      />

      {/* Floating Utilities */}
      <BackToTop />
      <WhatsAppButton />

      {/* Modals Layer */}
      <TreatmentModal
        treatment={selectedTreatmentForModal}
        onClose={() => setSelectedTreatmentForModal(null)}
        onBookTreatment={handleSelectTreatmentForBooking}
      />

      <PrintSlipModal
        appointment={printAppointment}
        onClose={() => setPrintAppointment(null)}
      />

      <FirebaseConfigModal
        isOpen={firebaseModalOpen}
        onClose={() => setFirebaseModalOpen(false)}
      />

      <SourceCodeModal
        isOpen={sourceCodeModalOpen}
        onClose={() => setSourceCodeModalOpen(false)}
      />

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div 
          onClick={() => setPrivacyModalOpen(false)}
          className="fixed inset-0 z-[400] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel dark:bg-slate-900 max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative space-y-4"
          >
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Privacy Policy • Valli Dental Clinic</h3>
            <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>At Valli Dental Clinic (Anna Nagar, Chennai), patient privacy and clinical confidentiality are our absolute priorities. We collect basic personal and medical history data solely for diagnosing dental conditions and scheduling your visits.</p>
              <p>Your medical history is stored securely using hospital-grade encrypted database practices (Firebase Firestore). We never share, sell, or disclose your personal contact numbers or medical X-rays with any unauthorized third party.</p>
              <p>For questions regarding your data or to request record removal from our digital system, contact our Data Protection Officer at <strong className="text-sky-600 dark:text-sky-400">privacy@vallidental.com</strong> or call +91 98842 50607.</p>
            </div>
            <div className="pt-4 flex justify-end border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setPrivacyModalOpen(false)} className="px-6 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs">Close Policy</button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {termsModalOpen && (
        <div 
          onClick={() => setTermsModalOpen(false)}
          className="fixed inset-0 z-[400] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel dark:bg-slate-900 max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative space-y-4"
          >
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Terms of Service • Valli Dental Clinic</h3>
            <p className="text-xs text-slate-500">Last Updated: March 2026</p>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>By scheduling an online appointment through this portal, you agree to provide accurate contact and health details to enable safe clinical evaluation by Dr. A. Ravi MDS and Dr. R. Aarthi MDS.</p>
              <p>Online appointments requested through our form are provisionally confirmed and subject to final clinical scheduling at our Anna Nagar facility (`No. Y19, Sri Sai Apartment, 50/19, 5th Avenue, Y Block`). Please arrive 10 minutes prior to your allocated slot.</p>
              <p>In case of cancellation or rescheduling, kindly notify our reception helpline (+91 98842 50607) at least 3 hours in advance.</p>
            </div>
            <div className="pt-4 flex justify-end border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setTermsModalOpen(false)} className="px-6 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs">Close Terms</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
