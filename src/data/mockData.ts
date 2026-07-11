import { Treatment, Doctor, Review, GalleryItem, Appointment, Patient, NotificationItem } from '../types/clinic';

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-ravi',
    name: 'Dr. A. Ravi MDS',
    title: 'Senior Dental Specialist',
    qualifications: 'MDS (Master of Dental Surgery) - Conservative Dentistry & Endodontics',
    specialties: ['Cosmetic Dentistry', 'Root Canal', 'Smile Design', 'Full Mouth Rehabilitation'],
    experience: '20+ Years of Excellence',
    bio: 'Dr. A. Ravi is a pioneer in microscopic endodontics and luxury smile transformations. With over two decades of clinical experience in Chennai, he combines art with ultra-modern precision dental engineering to give every patient a painless, celebrity-grade smile.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    consultationDays: 'Mon - Sat (10:00 AM - 8:30 PM)',
    rating: 4.98,
    reviewsCount: 642
  },
  {
    id: 'dr-aarthi',
    name: 'Dr. R. Aarthi MDS',
    title: 'Dental Surgeon & Orthodontic Expert',
    qualifications: 'MDS (Master of Dental Surgery) - Orthodontics & Pediatric Dentistry',
    specialties: ['Pediatric Dentistry', 'Orthodontics', 'Preventive Dentistry', 'Clear Aligners & Braces'],
    experience: '16+ Years of Excellence',
    bio: 'Dr. R. Aarthi specializes in creating harmonious dental alignment and gentle, anxiety-free treatments for children and adults. Known for her compassionate chairside manner and mastery in invisible clear aligners and pediatric preventive care.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80',
    consultationDays: 'Mon - Sat (10:00 AM - 8:00 PM)',
    rating: 4.99,
    reviewsCount: 580
  }
];

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    category: 'Restorative',
    shortDescription: 'Advanced single-visit painless root canal therapy using rotary endodontics and apex locators.',
    fullDescription: 'Our microscopic root canal procedure saves your natural tooth by precisely removing infected pulp tissue, disinfecting the canal with laser-assisted cleaning, and sealing it hermetically. Performed under local anesthesia with 3D CBCT guidance for zero discomfort.',
    benefits: [
      'Single-visit painless procedure in 45-60 minutes',
      'Advanced microscopic and laser disinfection',
      'Preserves your natural tooth structure for life',
      'Zero post-procedure discomfort with biocompatible sealers'
    ],
    duration: '45 - 60 Minutes',
    recovery: 'Immediate return to daily activities',
    priceEstimate: '₹3,500 - ₹6,500',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'Restorative',
    shortDescription: 'Grade-5 titanium bio-compatible tooth replacements that feel and function exactly like natural teeth.',
    fullDescription: 'Dental implants are the permanent gold standard for replacing missing teeth. Using guided 3D surgical navigation, titanium fixtures are embedded seamlessly into the jawbone, topped with natural-looking zirconium crowns designed specifically for your bite.',
    benefits: [
      'Lifetime durability with pure medical titanium & zirconia',
      'Restores 100% natural chewing force and speech',
      'Prevents jawbone loss and preserves facial contours',
      'No trimming of adjacent healthy natural teeth required'
    ],
    duration: '60 - 90 Minutes per implant',
    recovery: '2 - 3 Days mild healing period',
    priceEstimate: '₹25,000 - ₹45,000',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'braces',
    title: 'Braces & Clear Aligners',
    category: 'Orthodontics',
    shortDescription: 'Custom ceramic braces and invisible clear aligners for perfectly aligned teeth at any age.',
    fullDescription: 'Whether you prefer ultra-discreet transparent aligners or self-ligating ceramic braces, our orthodontic solutions correct crooked teeth, overcrowding, and bite alignment with precision computer simulation showing your final smile before treatment begins.',
    benefits: [
      'Transparent invisible aligner options available',
      'Customized digital 3D treatment progress simulation',
      'Shorter treatment duration with self-ligating technology',
      'Improves both dental hygiene and jaw ergonomics'
    ],
    duration: '6 - 18 Months total journey',
    recovery: 'Seamless adjustment every 3-4 weeks',
    priceEstimate: '₹35,000 - ₹1,20,000',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'Cosmetic',
    shortDescription: 'Laser-activated whitening that brightens your teeth up to 8 shades in just one 45-minute clinic session.',
    fullDescription: 'Our professional cold-blue LED laser whitening safely breaks down deep enamel stains caused by coffee, tea, wine, and aging without harming tooth enamel or causing post-treatment sensitivity.',
    benefits: [
      'Instant improvement up to 6-8 shades lighter in 1 hour',
      'Formulated with desensitizing agents for zero sensitivity',
      'Long-lasting brilliant glow with complimentary touch-up gel',
      '100% enamel safe and clinically certified'
    ],
    duration: '45 - 60 Minutes',
    recovery: 'No downtime (avoid dark staining foods for 24h)',
    priceEstimate: '₹5,000 - ₹9,500',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'smile-makeover',
    title: 'Smile Makeover & Veneers',
    category: 'Cosmetic',
    shortDescription: 'Hollywood-style porcelain veneers and digital smile architecture customized for your facial features.',
    fullDescription: 'Using Digital Smile Design (DSD) software, Dr. Ravi crafts ultra-thin ceramic veneers that transform tooth shape, gap closure, color, and symmetry to deliver your dream smile with precision elegance.',
    benefits: [
      'Bespoke digital facial symmetry matching',
      'Stain-resistant high-translucency lithium disilicate porcelain',
      'Minimal or zero-prep conservative enamel preservation',
      'Instant boost in personal confidence and youthful aesthetics'
    ],
    duration: '2 - 3 Visits over 10 days',
    recovery: 'Immediate functionality',
    priceEstimate: '₹12,000 - ₹22,000 per tooth',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    category: 'Pediatric',
    shortDescription: 'Gentle, fun, and fear-free dental care designed exclusively for infants, children, and teens.',
    fullDescription: 'Led by Dr. R. Aarthi, our pediatric wing features child-friendly treatment spaces, fluoride protection treatments, painless pit & fissure sealants, and gentle habit-counseling to ensure your child builds positive dental habits for life.',
    benefits: [
      'Child-centric reassuring environment with interactive distractions',
      'Painless topical anesthetics and gentle techniques',
      'Preventive fluoride gel and cavity-blocking sealants',
      'Habit correction for thumb-sucking and tongue thrusting'
    ],
    duration: '30 - 45 Minutes',
    recovery: 'Immediate play and regular routine',
    priceEstimate: '₹1,000 - ₹3,500',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dental-filling',
    title: 'Tooth Colored Fillings',
    category: 'Restorative',
    shortDescription: 'Aesthetic light-cured composite resin fillings that match your exact tooth shade seamlessly.',
    fullDescription: 'Say goodbye to unsightly dark silver amalgam fillings. We use nano-hybrid composite materials that chemically bond with your enamel to restore cavity-damaged teeth with high mechanical strength and natural luster.',
    benefits: [
      'Exact shade and translucency matching natural tooth structure',
      'Mercury-free, biocompatible and non-toxic materials',
      'Instant hardening under blue curing light for immediate chewing',
      'Prevents further bacterial micro-leakage and decay'
    ],
    duration: '20 - 40 Minutes per tooth',
    recovery: 'Immediate',
    priceEstimate: '₹1,500 - ₹3,000',
    iconName: 'CheckCircle',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tooth-extraction',
    title: 'Painless Extraction & Wisdom Teeth',
    category: 'Surgery',
    shortDescription: 'Trauma-free surgical and wisdom tooth removal under precise local anaesthesia with rapid healing protocols.',
    fullDescription: 'Whether impacted wisdom teeth are causing pain or a severely damaged tooth needs gentle removal, our oral surgery protocol utilizes piezo-surgical instruments and PRF (Platelet Rich Fibrin) for painless extraction and accelerated bone healing.',
    benefits: [
      'Complete pain-free experience with precise localized numbing',
      'Minimally invasive extraction preventing socket trauma',
      'Advanced PRF healing matrix application for rapid recovery',
      'Comprehensive post-operative care and follow-up guidance'
    ],
    duration: '30 - 60 Minutes',
    recovery: '1 - 3 Days with post-care protocol',
    priceEstimate: '₹2,000 - ₹7,500',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'scaling',
    title: 'Ultrasonic Scaling & Polishing',
    category: 'General',
    shortDescription: 'Deep ultrasonic cleaning that removes stubborn tartar, plaque, and surface stains for fresh gum health.',
    fullDescription: 'Regular brushing cannot reach calcified sub-gingival calculus. Our ultrasonic scaling uses high-frequency micro-vibrations paired with soothing water cooling to eliminate plaque buildup, stop bleeding gums, and leave teeth mirror-smooth.',
    benefits: [
      'Prevents gingivitis, bleeding gums, and periodontal bone loss',
      'Eliminates bad breath (halitosis) instantly',
      'Removes surface stains from tea, coffee, and tobacco',
      'Quick, comfortable procedure recommended every 6 months'
    ],
    duration: '30 - 45 Minutes',
    recovery: 'Immediate refreshing clean feel',
    priceEstimate: '₹1,500 - ₹2,500',
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'crowns-bridges',
    title: 'Zirconia Crowns & Bridges',
    category: 'Restorative',
    shortDescription: 'CAD/CAM milled precision metal-free Zirconia crowns offering supreme strength and natural aesthetics.',
    fullDescription: 'We provide computer-engineered full-contour Zirconia and E-max ceramic crowns that protect root-canaled or broken teeth. Custom-crafted with 3D digital impressions for a flawless, comfortable bite.',
    benefits: [
      'Metal-free bio-compatible ceramics with zero gum discoloration',
      'Highest flexural strength suitable for both molars and front teeth',
      'Digital 3D scanning eliminates messy traditional impressions',
      'Backed by up to 10-15 years laboratory warranty'
    ],
    duration: '2 Visits over 3 - 5 days',
    recovery: 'Immediate comfort and bite restoration',
    priceEstimate: '₹6,500 - ₹16,000 per crown',
    iconName: 'Award',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Luxury Operatory & Treatment Suite 1',
    category: 'Treatment Rooms',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    description: 'Equipped with ergonomic, plush memory-foam dental chairs, ceiling entertainment screens, and ambient mood lighting.',
    dateAdded: '2026-01-15'
  },
  {
    id: 'gal-2',
    title: '3D CBCT & Panoramic X-Ray Imaging Suite',
    category: 'Equipment',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-low radiation digital cone beam CT scanners that capture 360-degree precision jaw mapping in 8 seconds.',
    dateAdded: '2026-01-20'
  },
  {
    id: 'gal-3',
    title: 'Sterilization & Autoclave Protocol Center',
    category: 'Equipment',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    description: 'Class-B vacuum autoclaves ensuring 100% sterile instrument pouches opened freshly in front of every patient.',
    dateAdded: '2026-02-01'
  },
  {
    id: 'gal-4',
    title: 'Digital Smile Makeover Transformation',
    category: 'Before & After',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
    description: 'Complete upper arch restoration with 8 E-max porcelain veneers correcting spacing and tooth shade.',
    dateAdded: '2026-02-10'
  },
  {
    id: 'gal-5',
    title: 'Patient Waiting Lounge & Reception',
    category: 'Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Relaxing aroma-infused waiting lounge featuring herbal tea bar, relaxing music, and high-speed Wi-Fi.',
    dateAdded: '2026-02-18'
  },
  {
    id: 'gal-6',
    title: 'Pediatric Dental Wing with Dr. Aarthi',
    category: 'Treatment Rooms',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    description: 'Colorful, non-intimidating pediatric treatment environment designed to keep young patients joyful and comfortable.',
    dateAdded: '2026-02-22'
  },
  {
    id: 'gal-7',
    title: 'Microscopic Endodontics System',
    category: 'Equipment',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    description: 'High-power surgical microscope providing up to 25x magnification for flawless root canal identification and sealing.',
    dateAdded: '2026-02-25'
  },
  {
    id: 'gal-8',
    title: 'Guided Dental Implant Placement Case',
    category: 'Before & After',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    description: 'Seamless replacement of two missing lower molars with premium titanium implants and custom Zirconia crowns.',
    dateAdded: '2026-03-01'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    patientName: 'Rajeshkumar Narayanan',
    treatment: 'Root Canal Treatment',
    rating: 5,
    comment: 'I was always terrified of dental procedures until I visited Valli Dental Clinic in Anna Nagar. Dr. A. Ravi MDS performed a single-sitting root canal with microscopic precision and I truly felt zero pain! The clinic looks and feels like a luxury 5-star hotel.',
    date: '2 Days Ago',
    verified: true,
    doctorName: 'Dr. A. Ravi MDS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    patientName: 'Priya Sundaram',
    treatment: 'Clear Aligners & Orthodontics',
    rating: 5,
    comment: 'Dr. R. Aarthi explained my clear aligner treatment journey with digital 3D scans on my very first consultation. Now at month 6, my teeth are straightening beautifully without anyone noticing I’m wearing braces. Excellent staff and hyper-clean hygiene!',
    date: '1 Week Ago',
    verified: true,
    doctorName: 'Dr. R. Aarthi MDS',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    patientName: 'Suresh Babu K.',
    treatment: 'Dental Implants & Zirconia Crowns',
    rating: 5,
    comment: 'I got two dental implants placed by Dr. Ravi. The 3D surgical guidance made the procedure super quick and precise. I can eat crisp apples and tough food again just like in my twenties. Best dental experience in Chennai!',
    date: '2 Weeks Ago',
    verified: true,
    doctorName: 'Dr. A. Ravi MDS',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-4',
    patientName: 'Lakshmi Venkatesh & Daughter',
    treatment: 'Pediatric Dentistry',
    rating: 5,
    comment: 'My 6-year-old daughter used to cry at other dentists, but Dr. Aarthi is magical! She turned the whole checkup into a fun game with cartoon screens and gentle storytelling. Now my daughter happily reminds me when it is time for her checkup.',
    date: '3 Weeks Ago',
    verified: true,
    doctorName: 'Dr. R. Aarthi MDS',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-5',
    patientName: 'Arun V. Krishnan',
    treatment: 'Laser Teeth Whitening & Scaling',
    rating: 5,
    comment: 'Booked an appointment right before my wedding reception. In 45 minutes, my teeth transformed from coffee-stained to sparkling Hollywood white! No sensitivity at all and the ambience is ultra-modern Apple/Stripe tier design.',
    date: '1 Month Ago',
    verified: true,
    doctorName: 'Dr. A. Ravi MDS',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQ_DATA = [
  {
    question: 'Where exactly is Valli Dental Clinic located in Anna Nagar?',
    answer: 'We are located at No. Y19, Sri Sai Apartment, 50/19, 5th Avenue, Y Block, Anna Nagar, Chennai, Tamil Nadu 600040. We have dedicated parking facilities directly in front of our apartment entrance for easy access.'
  },
  {
    question: 'Is root canal treatment really painless at Valli Dental Clinic?',
    answer: 'Yes, 100%! We utilize high-precision microscopic endodontics, advanced local anesthesia techniques, and laser-assisted disinfection. Most of our patients report feeling less sensation during a root canal than during a routine dental filling.'
  },
  {
    question: 'How long do dental implants last?',
    answer: 'With proper oral hygiene and regular 6-month checkups, our medical-grade titanium dental implants are designed to last a lifetime. They integrate permanently with your jawbone to serve as sturdy roots for customized Zirconia crowns.'
  },
  {
    question: 'Do you offer clear invisible aligners for adults?',
    answer: 'Absolutely. Dr. R. Aarthi specializes in custom transparent clear aligners (like Invisalign and premium Indian aligner brands) that gently align teeth without brackets or wires. They are removable when eating and virtually invisible during work meetings.'
  },
  {
    question: 'What safety and sterilization measures are followed?',
    answer: 'We follow hospital-grade Class-B 4-step vacuum sterilization protocols. Every diagnostic and surgical instrument undergoes multi-stage ultrasonic cleaning, packaging in sterile indicator pouches, and autoclave sterilization before being opened strictly in front of you.'
  },
  {
    question: 'Can I book an emergency dental appointment or same-day consultation?',
    answer: 'Yes, we prioritize dental emergencies such as acute toothache, broken teeth, or lost crowns. You can call us immediately at +91 98842 50607 or use our online instant booking form with same-day time slots.'
  },
  {
    question: 'What are your accepted payment methods and EMI options?',
    answer: 'We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and cash. We also offer 0% interest EMI payment plans for comprehensive treatments like dental implants, braces, and full smile makeovers.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    name: 'Karthik Subramanian',
    mobile: '98401 23456',
    email: 'karthik.subramanian@gmail.com',
    age: 34,
    gender: 'Male',
    treatment: 'Root Canal Treatment',
    preferredDoctor: 'Dr. A. Ravi MDS',
    date: '2026-03-31',
    time: '11:00 AM',
    notes: 'Mild sensitivity on lower left molar when drinking cold water.',
    status: 'Approved',
    createdAt: '2026-03-29T10:30:00Z',
    referenceCode: 'VDC-8421'
  },
  {
    id: 'apt-002',
    name: 'Ananya Raghavan',
    mobile: '98845 67890',
    email: 'ananya.r@yahoo.com',
    age: 27,
    gender: 'Female',
    treatment: 'Braces & Clear Aligners',
    preferredDoctor: 'Dr. R. Aarthi MDS',
    date: '2026-03-31',
    time: '04:30 PM',
    notes: 'Consultation for clear aligners for upper front teeth crowding.',
    status: 'Pending',
    createdAt: '2026-03-30T14:15:00Z',
    referenceCode: 'VDC-9102'
  },
  {
    id: 'apt-003',
    name: 'Deepak Mohan',
    mobile: '99620 11223',
    email: 'deepak.m@outlook.com',
    age: 48,
    gender: 'Male',
    treatment: 'Dental Implants',
    preferredDoctor: 'Dr. A. Ravi MDS',
    date: '2026-03-31',
    time: '06:00 PM',
    notes: 'Review for right lower jaw implant crown fixing.',
    status: 'Completed',
    createdAt: '2026-03-28T09:00:00Z',
    referenceCode: 'VDC-7530'
  },
  {
    id: 'apt-004',
    name: 'Smriti Seshadri',
    mobile: '97890 55443',
    email: 'smriti.s@gmail.com',
    age: 31,
    gender: 'Female',
    treatment: 'Teeth Whitening',
    preferredDoctor: 'Dr. A. Ravi MDS',
    date: '2026-04-01',
    time: '10:30 AM',
    notes: 'Laser whitening session required before corporate conference.',
    status: 'Approved',
    createdAt: '2026-03-30T16:20:00Z',
    referenceCode: 'VDC-6490'
  },
  {
    id: 'apt-005',
    name: 'Aditya Raman (Parent: Divya)',
    mobile: '94441 88990',
    email: 'divya.raman@gmail.com',
    age: 8,
    gender: 'Male',
    treatment: 'Pediatric Dentistry',
    preferredDoctor: 'Dr. R. Aarthi MDS',
    date: '2026-04-01',
    time: '05:00 PM',
    notes: 'Fluoride varnish checkup and small fissure sealing.',
    status: 'Pending',
    createdAt: '2026-03-30T18:45:00Z',
    referenceCode: 'VDC-5832'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-101',
    name: 'Karthik Subramanian',
    mobile: '98401 23456',
    email: 'karthik.subramanian@gmail.com',
    age: 34,
    gender: 'Male',
    lastVisit: '2026-03-15',
    totalAppointments: 3,
    medicalHistory: ['No known allergies', 'Regular checkup'],
    notes: 'Prefers morning appointments.'
  },
  {
    id: 'pat-102',
    name: 'Ananya Raghavan',
    mobile: '98845 67890',
    email: 'ananya.r@yahoo.com',
    age: 27,
    gender: 'Female',
    lastVisit: '2026-02-10',
    totalAppointments: 2,
    medicalHistory: ['Mild penicillin sensitivity reported during childhood'],
    notes: 'Interested in invisible aligners.'
  },
  {
    id: 'pat-103',
    name: 'Deepak Mohan',
    mobile: '99620 11223',
    email: 'deepak.m@outlook.com',
    age: 48,
    gender: 'Male',
    lastVisit: '2026-03-25',
    totalAppointments: 5,
    medicalHistory: ['Controlled Hypertension (taking daily medication)'],
    notes: 'Implant osseointegration completed successfully.'
  },
  {
    id: 'pat-104',
    name: 'Smriti Seshadri',
    mobile: '97890 55443',
    email: 'smriti.s@gmail.com',
    age: 31,
    gender: 'Female',
    lastVisit: '2025-11-20',
    totalAppointments: 4,
    medicalHistory: ['No known medical conditions'],
    notes: 'Regular cosmetic maintenance.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Online Appointment Booked',
    message: 'Ananya Raghavan booked a Clear Aligners consultation with Dr. R. Aarthi MDS.',
    time: '15 Mins Ago',
    type: 'appointment',
    read: false
  },
  {
    id: 'notif-2',
    title: '5-Star Google Review Received',
    message: 'Rajeshkumar Narayanan posted a 5-star review praising painless Root Canal by Dr. Ravi.',
    time: '2 Hours Ago',
    type: 'review',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Contact Form Inquiry',
    message: 'Mr. Vignesh inquired about EMI options for full mouth rehabilitation.',
    time: '4 Hours Ago',
    type: 'message',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Firebase Hybrid Mode Active',
    message: 'Real-time database and local storage synchronization is operating smoothly at 60 FPS.',
    time: 'System Status',
    type: 'system',
    read: true
  }
];
