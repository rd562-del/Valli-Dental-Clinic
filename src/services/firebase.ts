import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { Appointment, Patient, ContactMessage, Review, GalleryItem, Doctor, NotificationItem } from '../types/clinic';
import { INITIAL_APPOINTMENTS, INITIAL_PATIENTS, INITIAL_NOTIFICATIONS, REVIEWS_DATA, GALLERY_ITEMS, DOCTORS_DATA } from '../data/mockData';

// Default Demo Firebase Configuration (Can be replaced via UI or env variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForValliDentalClinic2026X",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "valli-dental-clinic.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "valli-dental-clinic",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "valli-dental-clinic.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "988425060710",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:988425060710:web:8c420f12a3b4c5d6e7f8"
};

// Initialize Firebase SDK safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Local Storage Keys for Hybrid Persistence & Instant Preview
const STORAGE_KEYS = {
  APPOINTMENTS: 'valli_dental_appointments_v1',
  PATIENTS: 'valli_dental_patients_v1',
  MESSAGES: 'valli_dental_messages_v1',
  REVIEWS: 'valli_dental_reviews_v1',
  GALLERY: 'valli_dental_gallery_v1',
  DOCTORS: 'valli_dental_doctors_v1',
  NOTIFICATIONS: 'valli_dental_notifications_v1',
  ADMIN_LOGGED_IN: 'valli_dental_admin_auth_v1'
};

// Helper to broadcast state changes across components right away
const notifyStateChange = () => {
  window.dispatchEvent(new Event('valli-data-changed'));
};

// Initial Data Loaders
export const getStoredAppointments = (): Appointment[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  return INITIAL_APPOINTMENTS;
};

export const getStoredPatients = (): Patient[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
  return INITIAL_PATIENTS;
};

export const getStoredMessages = (): ContactMessage[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  return [];
};

export const getStoredReviews = (): Review[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(REVIEWS_DATA));
  return REVIEWS_DATA;
};

export const getStoredGallery = (): GalleryItem[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(GALLERY_ITEMS));
  return GALLERY_ITEMS;
};

export const getStoredDoctors = (): Doctor[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.DOCTORS);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DOCTORS_DATA));
  return DOCTORS_DATA;
};

export const getStoredNotifications = (): NotificationItem[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fallback */ }
  }
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  return INITIAL_NOTIFICATIONS;
};

// Actions to mutate state (Syncs local storage + Firestore simulation/real API)
export const addAppointmentToFirebase = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'referenceCode' | 'status'>): Promise<Appointment> => {
  const current = getStoredAppointments();
  const refCode = `VDC-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `apt-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    referenceCode: refCode
  };

  const updated = [newAppointment, ...current];
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));

  // Also create or update the patient entry automatically
  const currentPatients = getStoredPatients();
  const existingPatientIdx = currentPatients.findIndex(p => p.mobile === appointmentData.mobile || p.email === appointmentData.email);
  if (existingPatientIdx >= 0) {
    currentPatients[existingPatientIdx] = {
      ...currentPatients[existingPatientIdx],
      lastVisit: appointmentData.date,
      totalAppointments: currentPatients[existingPatientIdx].totalAppointments + 1
    };
  } else {
    currentPatients.unshift({
      id: `pat-${Date.now()}`,
      name: appointmentData.name,
      mobile: appointmentData.mobile,
      email: appointmentData.email,
      age: appointmentData.age,
      gender: appointmentData.gender,
      lastVisit: appointmentData.date,
      totalAppointments: 1,
      medicalHistory: ['New Patient - Online Booking']
    });
  }
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(currentPatients));

  // Add a real-time notification
  const notifs = getStoredNotifications();
  notifs.unshift({
    id: `notif-${Date.now()}`,
    title: 'New Appointment Booked',
    message: `${appointmentData.name} requested an appointment for ${appointmentData.treatment} with ${appointmentData.preferredDoctor}.`,
    time: 'Just Now',
    type: 'appointment',
    read: false
  });
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));

  notifyStateChange();
  return newAppointment;
};

export const updateAppointmentStatus = (id: string, status: Appointment['status'], notes?: string): void => {
  const current = getStoredAppointments();
  const updated = current.map(apt => {
    if (apt.id === id) {
      return { ...apt, status, ...(notes !== undefined ? { notes } : {}) };
    }
    return apt;
  });
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));

  // Notify
  const notifs = getStoredNotifications();
  const target = current.find(a => a.id === id);
  if (target) {
    notifs.unshift({
      id: `notif-${Date.now()}`,
      title: `Appointment ${status}`,
      message: `Appointment (${target.referenceCode}) for ${target.name} has been marked as ${status}.`,
      time: 'Just Now',
      type: 'appointment',
      read: false
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  notifyStateChange();
};

export const addContactMessageToFirebase = async (data: { name: string; email: string; phone: string; subject: string; message: string }): Promise<ContactMessage> => {
  const current = getStoredMessages();
  const newMessage: ContactMessage = {
    ...data,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isRead: false
  };
  const updated = [newMessage, ...current];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

  // Add notification
  const notifs = getStoredNotifications();
  notifs.unshift({
    id: `notif-${Date.now()}`,
    title: 'New Contact Message',
    message: `${data.name} sent a message regarding: "${data.subject}"`,
    time: 'Just Now',
    type: 'message',
    read: false
  });
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));

  notifyStateChange();
  return newMessage;
};

export const addReviewToFirebase = async (data: { patientName: string; treatment: string; rating: number; comment: string; doctorName: string }): Promise<Review> => {
  const current = getStoredReviews();
  const newRev: Review = {
    ...data,
    id: `rev-${Date.now()}`,
    date: 'Just Now',
    verified: true,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*10000000)}?auto=format&fit=crop&w=200&q=80`
  };
  const updated = [newRev, ...current];
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));

  const notifs = getStoredNotifications();
  notifs.unshift({
    id: `notif-${Date.now()}`,
    title: `${data.rating}-Star Patient Review`,
    message: `${data.patientName} reviewed ${data.treatment} (${data.doctorName}).`,
    time: 'Just Now',
    type: 'review',
    read: false
  });
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));

  notifyStateChange();
  return newRev;
};

export const addGalleryPhoto = (photo: Omit<GalleryItem, 'id' | 'dateAdded'>): GalleryItem => {
  const current = getStoredGallery();
  const newItem: GalleryItem = {
    ...photo,
    id: `gal-${Date.now()}`,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
  notifyStateChange();
  return newItem;
};

export const deleteGalleryPhoto = (id: string): void => {
  const current = getStoredGallery();
  const updated = current.filter(g => g.id !== id);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
  notifyStateChange();
};

export const markNotificationRead = (id: string): void => {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  notifyStateChange();
};

export const markAllNotificationsRead = (): void => {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => ({ ...n, read: true }));
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  notifyStateChange();
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_LOGGED_IN) === 'true';
};

export const setAdminAuthenticated = (status: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_LOGGED_IN, status ? 'true' : 'false');
  notifyStateChange();
};

// Reset demo data to clean fresh state
export const resetDemoData = (): void => {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(REVIEWS_DATA));
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(GALLERY_ITEMS));
  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DOCTORS_DATA));
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  notifyStateChange();
};
