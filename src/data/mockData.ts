import { 
  DoctorProfile, 
  Wallet, 
  Merchant, 
  Transaction, 
  Phase2Booking, 
  PartnerReferral, 
  RegistryEntry, 
  CampaignMetrics,
  OnlineFoodRestaurant 
} from '../types';

export const MEDICAL_COUNCILS = [
  'National Medical Commission (NMC)',
  'Delhi Medical Council',
  'Maharashtra Medical Council',
  'Karnataka Medical Council',
  'Tamil Nadu Medical Council',
  'West Bengal Medical Council',
  'Uttar Pradesh Medical Council',
  'Gujarat Medical Council',
  'Telangana State Medical Council',
  'Kerala State Medical Council'
];

export const HOSPITAL_CLUSTERS = [
  'AIIMS New Delhi — Main Campus & Trauma Centre',
  'Apollo Hospitals — Indraprastha & Sarita Vihar',
  'Fortis Memorial Research Institute — Gurugram',
  'Manipal Hospital — Old Airport Road, Bengaluru',
  'Sir Ganga Ram Hospital — Rajinder Nagar, Delhi',
  'Kokilaben Dhirubhai Ambani Hospital — Mumbai'
];

// Authoritative NMC / State Medical Council registry simulation data
export const OFFICIAL_REGISTRY_DATABASE: RegistryEntry[] = [
  {
    regNumber: 'DMC-74892',
    councilState: 'Delhi Medical Council',
    fullName: 'Dr. Siddharth Varma',
    qualification: 'MBBS, MD (Internal Medicine)',
    yearOfRegistration: 2018,
    college: 'AIIMS New Delhi',
    isValid: true,
    councilRegistryId: 'NMC/2018/DMC-74892-IND'
  },
  {
    regNumber: 'MMC-89214',
    councilState: 'Maharashtra Medical Council',
    fullName: 'Dr. Priya Kulkarni',
    qualification: 'MBBS, MS (General Surgery)',
    yearOfRegistration: 2019,
    college: 'Grant Government Medical College, Mumbai',
    isValid: true,
    councilRegistryId: 'NMC/2019/MMC-89214-IND'
  },
  {
    regNumber: 'KMC-63108',
    councilState: 'Karnataka Medical Council',
    fullName: 'Dr. Rohan Nambiar',
    qualification: 'MBBS, DNB (Cardiology)',
    yearOfRegistration: 2017,
    college: 'Bangalore Medical College and Research Institute',
    isValid: true,
    councilRegistryId: 'NMC/2017/KMC-63108-IND'
  },
  {
    regNumber: 'TNMC-51042',
    councilState: 'Tamil Nadu Medical Council',
    fullName: 'Dr. Meera Subramaniam',
    qualification: 'MBBS, MD (Pediatrics)',
    yearOfRegistration: 2020,
    college: 'Madras Medical College, Chennai',
    isValid: true,
    councilRegistryId: 'NMC/2020/TNMC-51042-IND'
  },
  {
    regNumber: 'NMC-99431',
    councilState: 'National Medical Commission (NMC)',
    fullName: 'Dr. Ananya Mukherjee',
    qualification: 'MBBS, MD (Radiology)',
    yearOfRegistration: 2021,
    college: 'Maulana Azad Medical College, New Delhi',
    isValid: true,
    councilRegistryId: 'NMC/2021/NMC-99431-IND'
  },
  {
    regNumber: 'UPMC-38190',
    councilState: 'Uttar Pradesh Medical Council',
    fullName: 'Dr. Amitav Chawla',
    qualification: 'MBBS, MS (Orthopaedics)',
    yearOfRegistration: 2016,
    college: 'King George’s Medical University, Lucknow',
    isValid: true,
    councilRegistryId: 'NMC/2016/UPMC-38190-IND'
  }
];

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'merch-01',
    name: 'Doctors’ Lounge & Espresso Bar',
    category: 'coffee_beverage',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    locationDetail: '2nd Floor, Academic Block / Doctors Common Room',
    distanceStr: 'Inside Doctors Lounge (0 m)',
    rating: 4.9,
    reviewCount: 342,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '07:00 AM – 11:30 PM',
    qrPayload: 'F2-PAY-AIIMS-ESPRESSO-M01',
    iconType: 'Coffee',
    popularItems: [
      { id: 'item-101', name: 'Artisan Cappuccino & Biscotti', price: 95, badge: 'Doctor Favorite', category: 'Beverage' },
      { id: 'item-102', name: 'Iced Hazelnut Latte', price: 120, badge: 'Popular', category: 'Beverage' },
      { id: 'item-103', name: 'Almond Croissant', price: 110, category: 'Bakery' },
      { id: 'item-104', name: 'Cold Brew High-Energy 300ml', price: 130, badge: 'Night Shift Pick', category: 'Beverage' }
    ],
    settlementSummary: {
      totalCollected: 48920,
      pendingSettlement: 8450,
      transactionCount: 394
    }
  },
  {
    id: 'merch-02',
    name: 'Central Hospital Canteen & Food Court',
    category: 'canteen',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    locationDetail: 'Ground Floor, Wing B (Near OT Corridors)',
    distanceStr: 'Wing B (40 m)',
    rating: 4.7,
    reviewCount: 620,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '24 Hours Open',
    qrPayload: 'F2-PAY-AIIMS-CANTEEN-M02',
    iconType: 'Utensils',
    popularItems: [
      { id: 'item-201', name: 'Executive South Indian Thali / Dosa', price: 110, badge: 'Best Value', category: 'Meals' },
      { id: 'item-202', name: 'Grilled Paneer Tikka Wrap', price: 140, badge: 'Chef Special', category: 'Snacks' },
      { id: 'item-203', name: 'Steam Idli-Vada Combo & Filter Coffee', price: 85, category: 'Breakfast' },
      { id: 'item-204', name: 'Nutritious Sprouts & Fruit Bowl', price: 90, badge: 'Healthy Choice', category: 'Healthy' }
    ],
    settlementSummary: {
      totalCollected: 94200,
      pendingSettlement: 14200,
      transactionCount: 712
    }
  },
  {
    id: 'merch-03',
    name: 'Subway & Healthy Wraps (Med Wing)',
    category: 'food_court',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    locationDetail: 'Hospital Gateway Plaza, Shop 4',
    distanceStr: 'Gateway Plaza (90 m)',
    rating: 4.8,
    reviewCount: 215,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '08:00 AM – 10:00 PM',
    qrPayload: 'F2-PAY-SUBWAY-MED-M03',
    iconType: 'Sandwich',
    popularItems: [
      { id: 'item-301', name: '6" Roasted Chicken / Veggie Delite Sub', price: 185, badge: 'Fast Service', category: 'Meals' },
      { id: 'item-302', name: 'Protein Salad Bowl + Ice Tea', price: 210, badge: 'High Protein', category: 'Healthy' },
      { id: 'item-303', name: 'Multi-grain Toasties with Dip', price: 125, category: 'Snacks' }
    ],
    settlementSummary: {
      totalCollected: 31400,
      pendingSettlement: 4800,
      transactionCount: 165
    }
  },
  {
    id: 'merch-04',
    name: 'Apollo Doctors Café & Snack Point',
    category: 'coffee_beverage',
    hospitalCluster: 'Apollo Hospitals — Indraprastha & Sarita Vihar',
    locationDetail: 'Block D, Level 1 (Opposite Doctors Briefing Room)',
    distanceStr: 'Block D Level 1 (20 m)',
    rating: 4.9,
    reviewCount: 198,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '06:30 AM – Midnight',
    qrPayload: 'F2-PAY-APOLLO-CAFE-M04',
    iconType: 'Coffee',
    popularItems: [
      { id: 'item-401', name: 'Single Origin Pour Over & Cookie', price: 110, badge: 'Doctor Favorite', category: 'Beverage' },
      { id: 'item-402', name: 'Smoked Chicken Focaccia Sandwich', price: 160, category: 'Bakery' },
      { id: 'item-403', name: 'Fresh Orange & Pomegranate Detox Juice', price: 120, badge: 'Cold Pressed', category: 'Beverage' }
    ],
    settlementSummary: {
      totalCollected: 52100,
      pendingSettlement: 9100,
      transactionCount: 420
    }
  },
  {
    id: 'merch-05',
    name: 'MedSnack Express & Fresh Juices',
    category: 'snack_stall',
    hospitalCluster: 'Fortis Memorial Research Institute — Gurugram',
    locationDetail: 'OPD Tower 2 Courtyard',
    distanceStr: 'Courtyard (50 m)',
    rating: 4.6,
    reviewCount: 145,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '07:30 AM – 10:30 PM',
    qrPayload: 'F2-PAY-FORTIS-SNACK-M05',
    iconType: 'Apple',
    popularItems: [
      { id: 'item-501', name: 'Nut Mix Energy Pack + Green Tea', price: 80, badge: 'Quick Bite', category: 'Snacks' },
      { id: 'item-502', name: 'Steamed Dimsums & Herbal Soup', price: 130, category: 'Snacks' },
      { id: 'item-503', name: 'Fresh Tender Coconut Water Bottle', price: 65, category: 'Beverage' }
    ],
    settlementSummary: {
      totalCollected: 27800,
      pendingSettlement: 3900,
      transactionCount: 280
    }
  },
  {
    id: 'merch-06',
    name: 'Curated Wellness & Quick Care Pharmacy',
    category: 'pharmacy',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    locationDetail: 'Emergency Gate 3 Arcade',
    distanceStr: 'Emergency Gate (110 m)',
    rating: 4.7,
    reviewCount: 310,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '24 Hours Open',
    qrPayload: 'F2-PAY-AIIMS-PHARM-M06',
    iconType: 'Cross',
    popularItems: [
      { id: 'item-601', name: 'Doctor Hand Sanitizer & N95 Multipack', price: 140, category: 'Hygiene' },
      { id: 'item-602', name: 'Electrolyte & Hydration Fizz Tablets', price: 95, badge: 'Shift Essential', category: 'Supplements' },
      { id: 'item-603', name: 'Organic Energy Protein Bar (Set of 2)', price: 130, category: 'Nutrition' }
    ],
    settlementSummary: {
      totalCollected: 38700,
      pendingSettlement: 5200,
      transactionCount: 245
    }
  }
];

export const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-001',
    name: 'Dr. Siddharth Varma',
    mobile: '+91 98112 44921',
    regNumber: 'DMC-74892',
    councilState: 'Delhi Medical Council',
    qualification: 'MBBS, MD (Internal Medicine)',
    college: 'AIIMS New Delhi',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    specialty: 'Internal Medicine & Critical Care',
    verificationStatus: 'verified',
    verificationSource: 'NMC_NATIONAL_REGISTRY',
    verificationConfidence: 99.8,
    verifiedAt: '2026-09-02T10:14:00Z',
    consentAgreed: true,
    consentTimestamp: '2026-09-02T10:13:45Z',
    email: 'siddharth.varma.md@aiims.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-002',
    name: 'Dr. Priya Kulkarni',
    mobile: '+91 98220 89145',
    regNumber: 'MMC-89214',
    councilState: 'Maharashtra Medical Council',
    qualification: 'MBBS, MS (General Surgery)',
    college: 'Grant Government Medical College, Mumbai',
    hospitalCluster: 'Kokilaben Dhirubhai Ambani Hospital — Mumbai',
    specialty: 'Laparo-Endoscopic Surgery',
    verificationStatus: 'verified',
    verificationSource: 'NMC_NATIONAL_REGISTRY',
    verificationConfidence: 99.4,
    verifiedAt: '2026-09-04T14:30:00Z',
    consentAgreed: true,
    consentTimestamp: '2026-09-04T14:28:10Z',
    email: 'priya.kulkarni@kdah.com'
  },
  {
    id: 'doc-003',
    name: 'Dr. Rohan Nambiar',
    mobile: '+91 97411 63108',
    regNumber: 'KMC-63108',
    councilState: 'Karnataka Medical Council',
    qualification: 'MBBS, DNB (Cardiology)',
    college: 'Bangalore Medical College and Research Institute',
    hospitalCluster: 'Manipal Hospital — Old Airport Road, Bengaluru',
    specialty: 'Interventional Cardiology',
    verificationStatus: 'verified',
    verificationSource: 'STATE_COUNCIL_API',
    verificationConfidence: 98.7,
    verifiedAt: '2026-09-06T09:12:00Z',
    consentAgreed: true,
    consentTimestamp: '2026-09-06T09:10:00Z',
    email: 'rohan.nambiar@manipal.edu'
  },
  {
    id: 'doc-004',
    name: 'Dr. Amitav Chawla',
    mobile: '+91 99182 38190',
    regNumber: 'UPMC-38190',
    councilState: 'Uttar Pradesh Medical Council',
    qualification: 'MBBS, MS (Orthopaedics)',
    college: 'King George’s Medical University, Lucknow',
    hospitalCluster: 'Fortis Memorial Research Institute — Gurugram',
    specialty: 'Joint Replacement & Arthroscopy',
    verificationStatus: 'pending_manual_review',
    verificationSource: 'MANUAL_OFFICIAL_REVIEW',
    verificationConfidence: 84.0,
    verifiedAt: undefined,
    consentAgreed: true,
    consentTimestamp: '2026-09-09T18:40:00Z',
    email: 'amitav.chawla@fortishealthcare.com'
  }
];

export const INITIAL_WALLETS: Record<string, Wallet> = {
  'doc-001': {
    id: 'w-doc-001',
    doctorId: 'doc-001',
    balance: 295,
    initialGrant: 500,
    totalSpent: 205,
    currency: 'INR',
    status: 'active',
    activatedAt: '2026-09-02T10:15:00Z',
    expiresAt: '2026-12-02T23:59:59Z',
    virtualCard: {
      cardNumber: '4192 8834 7291 4028',
      cardholderName: 'DR. SIDDHARTH VARMA',
      expiry: '09/28',
      cvv: '482',
      cardNetwork: 'RuPay',
      isFrozen: false,
      onlineTxnsEnabled: true,
      contactlessEnabled: true,
      dailyLimit: 500,
      allowedMccCategories: [
        'MCC 5812: Restaurants & Cafes',
        'MCC 5814: Fast Food & Hospital Canteens',
        'MCC 5811: Caterers & Duty Meals',
        'MCC 5411: Doctor Lounges & Grocery'
      ],
      tierLabel: 'White Coat Club — Medical Corporate Pass'
    },
    activeDynamicCoupon: {
      code: 'F2-WCC-8941',
      validUntil: '2026-09-10T23:59:59Z',
      amountLimit: 295,
      generatedAt: '2026-09-10T08:00:00Z'
    }
  },
  'doc-002': {
    id: 'w-doc-002',
    doctorId: 'doc-002',
    balance: 500,
    initialGrant: 500,
    totalSpent: 0,
    currency: 'INR',
    status: 'active',
    activatedAt: '2026-09-04T14:31:00Z',
    expiresAt: '2026-12-04T23:59:59Z',
    virtualCard: {
      cardNumber: '4192 6420 9183 5519',
      cardholderName: 'DR. PRIYA KULKARNI',
      expiry: '11/28',
      cvv: '619',
      cardNetwork: 'RuPay',
      isFrozen: false,
      onlineTxnsEnabled: true,
      contactlessEnabled: true,
      dailyLimit: 500,
      allowedMccCategories: [
        'MCC 5812: Restaurants & Cafes',
        'MCC 5814: Fast Food & Hospital Canteens',
        'MCC 5811: Caterers & Duty Meals',
        'MCC 5411: Doctor Lounges & Grocery'
      ],
      tierLabel: 'White Coat Club — Medical Corporate Pass'
    }
  },
  'doc-003': {
    id: 'w-doc-003',
    doctorId: 'doc-003',
    balance: 120,
    initialGrant: 500,
    totalSpent: 380,
    currency: 'INR',
    status: 'active',
    activatedAt: '2026-09-06T09:15:00Z',
    expiresAt: '2026-12-06T23:59:59Z',
    virtualCard: {
      cardNumber: '4192 3381 7402 8190',
      cardholderName: 'DR. ROHAN NAMBIAR',
      expiry: '04/29',
      cvv: '304',
      cardNetwork: 'RuPay',
      isFrozen: false,
      onlineTxnsEnabled: true,
      contactlessEnabled: true,
      dailyLimit: 500,
      allowedMccCategories: [
        'MCC 5812: Restaurants & Cafes',
        'MCC 5814: Fast Food & Hospital Canteens',
        'MCC 5811: Caterers & Duty Meals',
        'MCC 5411: Doctor Lounges & Grocery'
      ],
      tierLabel: 'White Coat Club — Medical Corporate Pass'
    }
  }
};

export const ONLINE_FOOD_RESTAURANTS: OnlineFoodRestaurant[] = [
  {
    id: 'rest-swiggy-01',
    name: 'Swiggy Gourmet — Green Protein Bowls & Salads',
    platform: 'Swiggy',
    cuisine: 'Healthy • Continental • Cold Pressed Juices',
    rating: 4.8,
    deliveryTimeMins: '18-24 mins',
    distanceStr: '1.2 km (Dedicated Hospital Delivery)',
    minOrder: 100,
    mccCode: '5812 (Restaurants/Dining)',
    tag: 'Doctor Favorite',
    items: [
      {
        id: 'item-sw-1',
        name: 'Herb Grilled Chicken & Quinoa Superbowl',
        price: 219,
        description: 'Tender chicken breast, warm quinoa, avocado slices, edamame and balsamic drizzle.',
        isVeg: false,
        category: 'Protein Bowls',
        badge: 'Top Pick',
        calories: '480 kcal • 38g Protein'
      },
      {
        id: 'item-sw-2',
        name: 'Avocado, Feta & Roasted Walnut Salad',
        price: 189,
        description: 'Fresh organic greens, Persian feta, toasted walnuts with lemon olive dressing.',
        isVeg: true,
        category: 'Salads',
        calories: '340 kcal • 12g Protein'
      },
      {
        id: 'item-sw-3',
        name: 'Cold-Pressed Valencia Orange & Carrot Juice 300ml',
        price: 99,
        description: '100% natural, no added sugar, rich in Vitamin C and beta-carotene.',
        isVeg: true,
        category: 'Cold-Pressed',
        badge: 'Immunity Booster',
        calories: '110 kcal'
      }
    ]
  },
  {
    id: 'rest-zomato-01',
    name: 'Zomato 24/7 — Night Duty Rolls & Executive Box',
    platform: 'Zomato',
    cuisine: 'North Indian • Wraps & Rolls • Fast Duty Dining',
    rating: 4.7,
    deliveryTimeMins: '15-20 mins',
    distanceStr: '0.8 km (Campus Express)',
    minOrder: 80,
    mccCode: '5814 (Fast Food/Quick Bites)',
    tag: '24/7 Night Shift Delivery',
    items: [
      {
        id: 'item-zo-1',
        name: 'Double Egg Mughlai Kathi Roll (Whole Wheat)',
        price: 135,
        description: 'Pan-tossed whole wheat paratha, 2 farm fresh eggs, spiced onions and mint chutney.',
        isVeg: false,
        category: 'Rolls & Wraps',
        badge: 'OT Night Fuel',
        calories: '360 kcal • 18g Protein'
      },
      {
        id: 'item-zo-2',
        name: 'Paneer Butter Masala Mini Meal with 2 Parathas',
        price: 160,
        description: 'Cottage cheese cubes in rich tomato-cashew gravy served with lacha parathas.',
        isVeg: true,
        category: 'Executive Boxes',
        calories: '520 kcal'
      },
      {
        id: 'item-zo-3',
        name: 'Midnight Filter Cold Coffee 350ml',
        price: 85,
        description: 'South Indian dark roast cold coffee with condensed milk.',
        isVeg: true,
        category: 'Cold Beverages',
        badge: 'Alertness Booster',
        calories: '140 kcal'
      }
    ]
  },
  {
    id: 'rest-hospital-01',
    name: 'Hospital Express — Doctors’ Private Lounge Kitchen',
    platform: 'Hospital Express',
    cuisine: 'Chef Gourmet • Fresh Bakes • Artisan Coffee',
    rating: 4.9,
    deliveryTimeMins: '8-12 mins',
    distanceStr: 'Internal Delivery to ICU / OT / OPD Cabin',
    minOrder: 50,
    mccCode: '5811 (Hospital Caterers)',
    tag: 'Zero Delivery Fee • Ward Priority',
    items: [
      {
        id: 'item-he-1',
        name: 'Smoked Turkey & English Cheddar Croissant Sandwich',
        price: 145,
        description: 'Buttery flaky croissant, sliced smoked turkey, aged cheddar and honey mustard.',
        isVeg: false,
        category: 'Sandwiches',
        badge: 'Chef Signature',
        calories: '390 kcal'
      },
      {
        id: 'item-he-2',
        name: 'Mediterranean Mezze Platter (Hummus, Falafel, Pita)',
        price: 175,
        description: 'Creamy garlic hummus, 4 crispy herb falafels, warm pita bread and olive pickles.',
        isVeg: true,
        category: 'Snacks & Platters',
        badge: 'Doctor Lounge Special',
        calories: '420 kcal • 16g Protein'
      },
      {
        id: 'item-he-3',
        name: 'Double Shot Flat White with Biscotti',
        price: 85,
        description: 'Velvety micro-foam espresso using 100% Arabica beans from Chikmagalur.',
        isVeg: true,
        category: 'Coffee',
        calories: '90 kcal'
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-90821-F2',
    walletId: 'w-doc-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. Siddharth Varma',
    doctorRegNo: 'DMC-74892',
    merchantId: 'merch-01',
    merchantName: 'Doctors’ Lounge & Espresso Bar',
    merchantCategory: 'coffee_beverage',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    amount: 95,
    balanceBefore: 500,
    balanceAfter: 405,
    type: 'SPEND',
    status: 'SUCCESS',
    timestamp: '2026-09-05T08:42:15Z',
    receiptHash: 'f2a7b8e19c02d449ab6e',
    itemSummary: 'Artisan Cappuccino & Biscotti',
    notes: 'Morning shift coffee - AIIMS lounge terminal',
    fraudScore: 2
  },
  {
    id: 'TXN-90822-F2',
    walletId: 'w-doc-001',
    doctorId: 'doc-001',
    doctorName: 'Dr. Siddharth Varma',
    doctorRegNo: 'DMC-74892',
    merchantId: 'merch-02',
    merchantName: 'Central Hospital Canteen & Food Court',
    merchantCategory: 'canteen',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    amount: 110,
    balanceBefore: 405,
    balanceAfter: 295,
    type: 'SPEND',
    status: 'SUCCESS',
    timestamp: '2026-09-07T13:20:00Z',
    receiptHash: 'f2c99a01dd2298bc3341',
    itemSummary: 'Executive South Indian Thali',
    notes: 'Post-rounds lunch redemption',
    fraudScore: 1
  },
  {
    id: 'TXN-90710-F2',
    walletId: 'w-doc-003',
    doctorId: 'doc-003',
    doctorName: 'Dr. Rohan Nambiar',
    doctorRegNo: 'KMC-63108',
    merchantId: 'merch-02',
    merchantName: 'Central Hospital Canteen & Food Court',
    merchantCategory: 'canteen',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    amount: 250,
    balanceBefore: 500,
    balanceAfter: 250,
    type: 'SPEND',
    status: 'SUCCESS',
    timestamp: '2026-09-07T19:40:00Z',
    receiptHash: 'f2887bb12cc9940aa201',
    itemSummary: 'Dinner Thali + Fresh Juice Combo',
    fraudScore: 4
  },
  {
    id: 'TXN-90711-F2',
    walletId: 'w-doc-003',
    doctorId: 'doc-003',
    doctorName: 'Dr. Rohan Nambiar',
    doctorRegNo: 'KMC-63108',
    merchantId: 'merch-01',
    merchantName: 'Doctors’ Lounge & Espresso Bar',
    merchantCategory: 'coffee_beverage',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    amount: 130,
    balanceBefore: 250,
    balanceAfter: 120,
    type: 'SPEND',
    status: 'SUCCESS',
    timestamp: '2026-09-08T22:15:00Z',
    receiptHash: 'f2771cc33e4499bb8812',
    itemSummary: 'Cold Brew High-Energy 300ml',
    fraudScore: 3
  }
];

export const INITIAL_PHASE2_BOOKINGS: Phase2Booking[] = [
  {
    id: 'P2-BK-1049',
    doctorId: 'doc-001',
    doctorName: 'Dr. Siddharth Varma',
    mobile: '+91 98112 44921',
    regNumber: 'DMC-74892',
    preferredDate: '2026-09-15',
    preferredTime: '04:30 PM',
    topic: 'doctor_wealth_planning',
    channel: 'IN_PERSON_HOSPITAL',
    status: 'CONFIRMED',
    assignedAdvisor: 'Vikramaditya Sengupta (VP Doctor Wealth, F2)',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    notes: 'Doctor interested in structuring multi-source consulting income, tax-optimized PMS, and private OPD setup roadmap.',
    createdAt: '2026-09-08T15:20:00Z'
  },
  {
    id: 'P2-BK-1050',
    doctorId: 'doc-003',
    doctorName: 'Dr. Rohan Nambiar',
    mobile: '+91 97411 63108',
    regNumber: 'KMC-63108',
    preferredDate: '2026-09-18',
    preferredTime: '07:00 PM',
    topic: 'equipment_financing',
    channel: 'VIDEO_CALL',
    status: 'SCHEDULED',
    assignedAdvisor: 'Kavita Menon (Principal Partner, F2 HealthTech Finance)',
    hospitalCluster: 'Manipal Hospital — Old Airport Road, Bengaluru',
    notes: 'Planning to acquire high-end 3D Cardiac Ultrasound Echo machine for private chamber. Exploring subsidised loan + leaseback structure.',
    createdAt: '2026-09-09T11:00:00Z'
  }
];

export const INITIAL_PARTNER_REFERRALS: PartnerReferral[] = [
  {
    id: 'REF-001',
    referrerDoctorId: 'doc-001',
    referrerName: 'Dr. Siddharth Varma',
    referralCode: 'DOC-VARMA-F2',
    totalInvited: 8,
    verifiedDoctors: 6,
    totalEarnedCredits: 3000,
    complianceConsentGiven: true,
    referredList: [
      { name: 'Dr. Tanya Khurana (Cardiologist)', hospital: 'AIIMS Delhi', status: 'Verified & Spent', joinedDate: '2026-09-04' },
      { name: 'Dr. Naveen Goel (Neurosurgeon)', hospital: 'Safdarjung Hospital', status: 'Verified & Spent', joinedDate: '2026-09-05' },
      { name: 'Dr. Harshdeep Singh (Pediatrician)', hospital: 'Max Saket', status: 'Verified', joinedDate: '2026-09-07' },
      { name: 'Dr. Rashmi Desai (Radiologist)', hospital: 'Fortis Vasant Kunj', status: 'Verified & Spent', joinedDate: '2026-09-08' },
      { name: 'Dr. Kunal Singhal (Anesthetist)', hospital: 'AIIMS Delhi', status: 'Pending Verification', joinedDate: '2026-09-09' }
    ]
  }
];

export const INITIAL_CAMPAIGN_METRICS: CampaignMetrics = {
  doctorVerificationRate: 91.4,
  walletActivationRate: 88.6,
  firstSpendRate: 79.2,
  repeatSpendRate: 64.5,
  merchantCoverageOutlets: 54,
  costPerActivatedDoctor: 565,
  phase2BookingRate: 26.8,
  totalVerifiedDoctors: 412,
  totalWalletValueDisbursed: 206000,
  totalMerchantVolume: 154800
};
