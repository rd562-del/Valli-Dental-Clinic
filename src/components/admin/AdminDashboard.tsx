import React, { useState, useEffect } from 'react';
import { 
  Appointment, Patient, ContactMessage, Review, GalleryItem, Doctor, NotificationItem 
} from '../../types/clinic';
import { 
  getStoredAppointments, getStoredPatients, getStoredMessages, getStoredReviews, 
  getStoredGallery, getStoredDoctors, getStoredNotifications, updateAppointmentStatus, 
  addGalleryPhoto, deleteGalleryPhoto, markNotificationRead, markAllNotificationsRead, 
  setAdminAuthenticated 
} from '../../services/firebase';
import { 
  Users, Calendar, MessageSquare, Star, Image, Shield, Bell, Settings, LogOut, 
  Search, Download, CheckCircle, XCircle, Clock, RotateCcw, Printer, Send, 
  Plus, Trash2, Filter, Activity, Sparkles, AlertCircle 
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onPrintAppointment: (appointment: Appointment) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onPrintAppointment
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'messages' | 'gallery' | 'reviews' | 'doctors' | 'notifications' | 'settings'>('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Gallery Add Form State
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<GalleryItem['category']>('Treatment Rooms');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');

  const loadData = () => {
    setAppointments(getStoredAppointments());
    setPatients(getStoredPatients());
    setMessages(getStoredMessages());
    setReviews(getStoredReviews());
    setGallery(getStoredGallery());
    setDoctors(getStoredDoctors());
    setNotifications(getStoredNotifications());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('valli-data-changed', loadData);
    return () => window.removeEventListener('valli-data-changed', loadData);
  }, []);

  // Statistics calculations
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => a.date === todayDateStr || a.date === '2026-03-31').length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.mobile.includes(searchQuery) ||
      a.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV Helper
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      alert("No appointments to export.");
      return;
    }
    const headers = ['ID,Reference Code,Patient Name,Mobile,Email,Treatment,Doctor,Date,Time,Status,Notes'];
    const rows = appointments.map(a => 
      [
        `"${a.id}"`, `"${a.referenceCode}"`, `"${a.name}"`, `"${a.mobile}"`, `"${a.email}"`,
        `"${a.treatment}"`, `"${a.preferredDoctor}"`, `"${a.date}"`, `"${a.time}"`, `"${a.status}"`,
        `"${(a.notes || '').replace(/"/g, '""')}"`
      ].join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Valli_Dental_Appointments_${todayDateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Export Excel / TSV Helper
  const handleExportExcel = () => {
    if (appointments.length === 0) {
      alert("No appointments to export.");
      return;
    }
    const headers = ['Reference Code\tPatient Name\tMobile\tEmail\tTreatment\tPreferred Doctor\tDate\tTime\tStatus'];
    const rows = appointments.map(a => 
      [
        a.referenceCode, a.name, a.mobile, a.email, a.treatment, a.preferredDoctor, a.date, a.time, a.status
      ].join('\t')
    );
    const tsvContent = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent([headers, ...rows].join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', tsvContent);
    link.setAttribute('download', `Valli_Dental_Appointments_${todayDateStr}.xls`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Simulated Email / SMS reminder actions
  const sendEmailReminder = (apt: Appointment) => {
    alert(`[Simulated Email Service]\n\nAutomated email sent to: ${apt.email}\nSubject: Appointment Confirmation for ${apt.treatment}\nDate/Time: ${apt.date} at ${apt.time}\nHelpline: +91 98842 50607`);
  };

  const sendSMSReminder = (apt: Appointment) => {
    alert(`[Simulated SMS Service]\n\nSMS Gateway dispatched to +91 ${apt.mobile}:\n"Dear ${apt.name}, your dental consultation with ${apt.preferredDoctor} at Valli Dental Clinic is confirmed for ${apt.date} (${apt.time}). Ref: ${apt.referenceCode}"`);
  };

  // Add Gallery Photo Submission
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle || !newPhotoUrl) {
      alert("Please provide Title and Image URL.");
      return;
    }
    addGalleryPhoto({
      title: newPhotoTitle,
      category: newPhotoCategory,
      imageUrl: newPhotoUrl,
      description: newPhotoDesc || 'Clinical showcase image.'
    });
    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setNewPhotoDesc('');
    alert("New photo successfully added to live Clinic Gallery!");
  };

  const handleLogoutAdmin = () => {
    setAdminAuthenticated(false);
    onLogout();
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Header Bar */}
        <div className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-sky-500/20 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                  Admin Dashboard Portal
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Valli Dental Clinic • Senior Specialists Center Management
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-sky-500 transition-colors"
            >
              <Download className="w-4 h-4 text-sky-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportExcel}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-500 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>Export Excel</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-sky-500 transition-colors"
              title="Notification Center"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            <button
              onClick={handleLogoutAdmin}
              className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-2 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Dashboard Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-8 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: Activity },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'patients', label: `Patients (${patients.length})`, icon: Users },
            { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Image },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'doctors', label: `Doctors (${doctors.length})`, icon: Shield },
            { id: 'notifications', label: `Notifications (${unreadNotifsCount} New)`, icon: Bell },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Stats */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card dark:bg-slate-900/80 p-6 rounded-3xl border border-sky-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Today's Appointments
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-sky-600 dark:text-sky-400 mt-1">
                    {todaysAppointments}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Confirmed for clinical slots</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-500">
                  <Calendar className="w-7 h-7" />
                </div>
              </div>

              <div className="glass-card dark:bg-slate-900/80 p-6 rounded-3xl border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Pending Approval
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-amber-500 mt-1">
                    {pendingAppointments}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Requires doctor review</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Clock className="w-7 h-7" />
                </div>
              </div>

              <div className="glass-card dark:bg-slate-900/80 p-6 rounded-3xl border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Completed Treatments
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-emerald-500 mt-1">
                    {completedAppointments}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Painless care delivered</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <CheckCircle className="w-7 h-7" />
                </div>
              </div>

              <div className="glass-card dark:bg-slate-900/80 p-6 rounded-3xl border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Registered Patients
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-cyan-500 mt-1">
                    {patients.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Active patient database</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-500">
                  <Users className="w-7 h-7" />
                </div>
              </div>
            </div>

            {/* Simulated Interactive Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Bar Chart simulation */}
              <div className="lg:col-span-8 glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                      Monthly Appointment & Patient Influx
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Comparison across Root Canal, Implants, Orthodontics & General Care
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs">
                    Last 6 Months
                  </span>
                </div>

                {/* Bars */}
                <div className="grid grid-cols-6 gap-3 items-end h-48 pt-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {[
                    { month: 'Oct', val: 65, color: 'from-sky-400 to-blue-500' },
                    { month: 'Nov', val: 75, color: 'from-blue-500 to-cyan-500' },
                    { month: 'Dec', val: 82, color: 'from-cyan-500 to-teal-500' },
                    { month: 'Jan', val: 90, color: 'from-teal-500 to-emerald-500' },
                    { month: 'Feb', val: 88, color: 'from-sky-500 to-blue-600' },
                    { month: 'Mar', val: 98, color: 'from-blue-600 to-indigo-600' },
                  ].map((b, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {b.val * 3} Pts
                      </span>
                      <div 
                        className={`w-full max-w-[44px] rounded-t-xl bg-gradient-to-t ${b.color} transition-all duration-500 group-hover:brightness-110 shadow-md`}
                        style={{ height: `${b.val}%` }}
                      />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{b.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Treatment Breakdown */}
              <div className="lg:col-span-4 glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Popular Treatments
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Distribution of procedures requested this month.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { label: 'Root Canal Treatment', percent: 35, color: 'bg-sky-500' },
                    { label: 'Clear Aligners & Braces', percent: 25, color: 'bg-cyan-500' },
                    { label: 'Dental Implants', percent: 20, color: 'bg-blue-600' },
                    { label: 'Laser Teeth Whitening', percent: 12, color: 'bg-teal-500' },
                    { label: 'Pediatric Dentistry', percent: 8, color: 'bg-emerald-500' },
                  ].map((t, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span>{t.label}</span>
                        <span className="font-mono font-bold">{t.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Recent Appointments Table Preview */}
            <div className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Recent Appointment Requests
                </h3>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  View All {appointments.length} Appointments →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Treatment</th>
                      <th className="py-3 px-4">Specialist</th>
                      <th className="py-3 px-4">Schedule</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 4).map((apt) => (
                      <tr key={apt.id} className="border-b border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{apt.referenceCode}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{apt.name}</td>
                        <td className="py-3 px-4">{apt.treatment}</td>
                        <td className="py-3 px-4 font-semibold">{apt.preferredDoctor}</td>
                        <td className="py-3 px-4 font-mono">{apt.date} ({apt.time})</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                            apt.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                            apt.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                            apt.status === 'Completed' ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400' :
                            'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onPrintAppointment(apt)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition-colors"
                            title="Print Appointment Slip"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search & Filter Bar */}
            <div className="glass-panel dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, phone, ref code..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                {['ALL', 'Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Cards List */}
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="glass-panel dark:bg-slate-900 p-12 rounded-3xl text-center text-slate-500">
                  No appointments found matching your search or filter criteria.
                </div>
              ) : (
                filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-sky-500/40 transition-all"
                  >
                    {/* Patient Summary */}
                    <div className="space-y-2 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono font-extrabold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-lg text-xs">
                          {apt.referenceCode}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                          {apt.name}
                        </h4>
                        <span className="text-xs text-slate-500">({apt.age} Yrs / {apt.gender})</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <div>📞 Mobile: <strong className="font-mono">{apt.mobile}</strong></div>
                        <div>✉️ Email: <strong>{apt.email}</strong></div>
                        <div>🦷 Treatment: <strong className="text-sky-600 dark:text-sky-400">{apt.treatment}</strong></div>
                        <div>👨‍⚕️ Specialist: <strong>{apt.preferredDoctor}</strong></div>
                      </div>

                      {apt.notes && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 italic">
                          "{apt.notes}"
                        </div>
                      )}
                    </div>

                    {/* Schedule Date + Status Badge */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
                      <div className="text-left lg:text-right">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled Slot</div>
                        <div className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                          📅 {apt.date} • ⏰ {apt.time}
                        </div>
                      </div>

                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                        apt.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                        apt.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                        apt.status === 'Completed' ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400' :
                        'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                      }`}>
                        Status: {apt.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Admin Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-0 border-slate-200 dark:border-slate-800">
                      {apt.status !== 'Approved' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Approved')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-600 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}

                      {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                          className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-sky-600 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Complete
                        </button>
                      )}

                      {apt.status !== 'Rejected' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Rejected')}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 hover:bg-rose-500 hover:text-white transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'Rescheduled')}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-colors"
                        title="Mark Rescheduled"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => sendEmailReminder(apt)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                        title="Send Email Reminder"
                      >
                        <Send className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => sendSMSReminder(apt)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors font-bold text-xs"
                        title="Send SMS Gateway Reminder"
                      >
                        SMS
                      </button>

                      <button
                        onClick={() => onPrintAppointment(apt)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Slip
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Patients Management */}
        {activeTab === 'patients' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Patient Medical Database ({patients.length} Registered)
                </h3>
                <p className="text-xs text-slate-500">
                  Comprehensive patient medical history, allergies, and visit records.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patients.map((pat) => (
                <div key={pat.id} className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                        {pat.name}
                      </h4>
                      <span className="text-xs text-slate-500">{pat.age} Yrs / {pat.gender} • ID: {pat.id}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs">
                      {pat.totalAppointments} Visits
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                    <div>📱 Mobile: <strong className="font-mono">{pat.mobile}</strong></div>
                    <div>✉️ Email: <strong>{pat.email}</strong></div>
                    <div>📅 Last Visit Date: <strong className="font-mono">{pat.lastVisit}</strong></div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Medical History & Notes:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {pat.medicalHistory.map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-medium border border-amber-500/20">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Messages / Inquiries */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                Contact Messages & Inquiries ({messages.length})
              </h3>
            </div>

            {messages.length === 0 ? (
              <div className="glass-panel dark:bg-slate-900 p-12 rounded-3xl text-center text-slate-500">
                No contact form messages recorded yet. Messages submitted via the Contact section will show here immediately.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{msg.name}</h4>
                        <span className="text-xs text-slate-500 font-mono">{msg.email} • {msg.phone}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">Received: {msg.createdAt}</span>
                    </div>
                    <div className="text-xs font-bold text-sky-600 dark:text-sky-400">Subject: {msg.subject || 'Dental Consultation Inquiry'}</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Gallery Management (Upload & Delete) */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Add Photo Form */}
            <form onSubmit={handleAddPhoto} className="glass-panel dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-500/30 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-500" />
                <span>Upload New Clinic / Case Photo to Gallery</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="e.g. VIP Recovery Suite 2"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500 font-semibold"
                  >
                    <option value="Treatment Rooms">Treatment Rooms</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Before & After">Before & After</option>
                    <option value="Lounge">Lounge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={newPhotoDesc}
                  onChange={(e) => setNewPhotoDesc(e.target.value)}
                  placeholder="e.g. High-definition surgical microscope station..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish to Gallery</span>
                </button>
              </div>
            </form>

            {/* Existing Gallery Grid with Delete Option */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="glass-panel dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                      {item.category}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                          deleteGalleryPhoto(item.id);
                        }
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-rose-500/80 hover:bg-rose-600 text-white shadow-md transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Reviews Management */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fadeIn">
            {reviews.map((rev) => (
              <div key={rev.id} className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                <img src={rev.avatar} alt={rev.patientName} className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-300 dark:border-slate-700" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">{rev.patientName}</h4>
                    <span className="text-xs text-amber-500 font-bold">{rev.rating} ★ Rating</span>
                  </div>
                  <div className="text-xs text-sky-600 dark:text-sky-400 font-semibold">{rev.treatment} • ({rev.doctorName || 'Anna Nagar Clinic'})</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 7: Doctors Profiles Overview */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {doctors.map((doc) => (
              <div key={doc.id} className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-6">
                <img src={doc.image} alt={doc.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 border-2 border-sky-500/40" />
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold font-heading text-slate-900 dark:text-white">{doc.name}</h4>
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400">{doc.title}</div>
                  <p className="text-xs text-slate-500">{doc.qualifications}</p>
                  <div className="text-xs text-amber-500 font-bold pt-1">{doc.rating} ★ Rating ({doc.reviewsCount} verified reviews)</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 8: Notification Center */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-panel dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Realtime System Notification Center ({unreadNotifsCount} Unread)
                </h3>
              </div>
              <button
                onClick={markAllNotificationsRead}
                className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs hover:bg-sky-500 hover:text-white transition-all"
              >
                Mark All as Read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    !notif.read
                      ? 'bg-sky-50/60 dark:bg-sky-950/40 border-sky-500 shadow-sm'
                      : 'glass-panel dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />}
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{notif.title}</h4>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">
                        {notif.type}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{notif.message}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 shrink-0">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 9: Settings & Hybrid Database Reset */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto glass-panel dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-sky-500" />
              <span>Admin System Configuration & Security</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                The Admin Dashboard connects directly to the <strong>Hybrid Firestore State Engine</strong>. All status modifications immediately trigger real-time updates across the public appointment portal.
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Session Security Note:</strong> You are authenticated as senior administrative staff (`admin@vallidental.com`). Please log out when stepping away from the operatory terminal.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={handleLogoutAdmin}
                className="px-6 py-3 rounded-2xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-colors shadow-lg"
              >
                Log Out of Admin Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
