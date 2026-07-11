export interface Appointment {
  id: string;
  name: string;
  mobile: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  treatment: string;
  preferredDoctor: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected' | 'Cancelled' | 'Rescheduled';
  createdAt: string;
  referenceCode: string;
}

export interface Patient {
  id: string;
  name: string;
  mobile: string;
  email: string;
  age: number;
  gender: string;
  lastVisit: string;
  totalAppointments: number;
  medicalHistory: string[];
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  specialties: string[];
  experience: string;
  bio: string;
  image: string;
  consultationDays: string;
  rating: number;
  reviewsCount: number;
}

export interface Treatment {
  id: string;
  title: string;
  category: 'General' | 'Cosmetic' | 'Restorative' | 'Orthodontics' | 'Surgery' | 'Pediatric';
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  duration: string;
  recovery: string;
  priceEstimate: string;
  iconName: string;
  image: string;
}

export interface Review {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar?: string;
  doctorName?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Treatment Rooms' | 'Equipment' | 'Before & After' | 'Lounge' | 'Treatments';
  imageUrl: string;
  description: string;
  dateAdded: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'message' | 'review' | 'system';
  read: boolean;
}

export type ActiveTab = 
  | 'home'
  | 'about'
  | 'treatments'
  | 'doctors'
  | 'gallery'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'appointment'
  | 'admin';
