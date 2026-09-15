export type DoctorVerificationStatus = 'unverified' | 'verified' | 'pending_manual_review' | 'rejected';
export type VerificationSource = 'NMC_NATIONAL_REGISTRY' | 'STATE_COUNCIL_API' | 'MANUAL_OFFICIAL_REVIEW' | 'NOT_VERIFIED';

export interface DoctorProfile {
  id: string;
  name: string;
  mobile: string;
  regNumber: string;
  councilState: string;
  qualification: string;
  college: string;
  hospitalCluster: string;
  specialty: string;
  verificationStatus: DoctorVerificationStatus;
  verificationSource: VerificationSource;
  verificationConfidence?: number;
  verifiedAt?: string;
  consentAgreed: boolean;
  consentTimestamp?: string;
  email?: string;
  avatarUrl?: string;
}

export interface VirtualCardInfo {
  cardNumber: string; // 16-digit card number (e.g. 4192 8834 7291 4028)
  cardholderName: string;
  expiry: string; // MM/YY (e.g. 09/28)
  cvv: string; // 3-digit CVV (e.g. 482)
  cardNetwork: 'RuPay' | 'Visa' | 'Mastercard';
  isFrozen: boolean;
  onlineTxnsEnabled: boolean;
  contactlessEnabled: boolean;
  dailyLimit: number;
  allowedMccCategories: string[]; // e.g. ['5812: Restaurants & Cafes', '5814: Hospital Canteens & Fast Food', '5811: Caterers & Meal Prep', '5411: Lounges & Grocery Outlets']
  tierLabel: string; // e.g. 'White Coat Club — Medical Privilege'
}

export interface Wallet {
  id: string;
  doctorId: string;
  balance: number;
  initialGrant: number;
  totalSpent: number;
  currency: string;
  status: 'active' | 'pending_activation' | 'locked' | 'expired';
  activatedAt?: string;
  expiresAt: string;
  virtualCard?: VirtualCardInfo;
  activeDynamicCoupon?: {
    code: string;
    validUntil: string;
    amountLimit: number;
    generatedAt: string;
  };
}

export type PaymentMethod = 
  | 'VIRTUAL_CARD_ONLINE' 
  | 'VIRTUAL_CARD_TAP' 
  | 'QR_CODE' 
  | 'DYNAMIC_COUPON' 
  | 'INITIAL_GRANT' 
  | 'REVERSAL';

export type TransactionType = 'SPEND' | 'INITIAL_GRANT' | 'REVERSAL' | 'BONUS_REWARD';
export type TransactionStatus = 'SUCCESS' | 'FLAGGED' | 'REVERSED' | 'PENDING';
export type MerchantCategory = 'canteen' | 'coffee_beverage' | 'food_court' | 'pharmacy' | 'snack_stall' | 'online_delivery' | 'doctor_lounge';

export interface Transaction {
  id: string;
  walletId: string;
  doctorId: string;
  doctorName: string;
  doctorRegNo: string;
  merchantId: string;
  merchantName: string;
  merchantCategory: MerchantCategory;
  hospitalCluster: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: string;
  receiptHash: string;
  paymentMethod?: PaymentMethod;
  platform?: string; // 'Swiggy' | 'Zomato' | 'Hospital Canteen POS' | 'Lounge Terminal'
  cardLast4?: string;
  mccCode?: string;
  qrToken?: string;
  notes?: string;
  itemSummary?: string;
  deliveryLocation?: string;
  fraudScore?: number;
}

export interface OnlineFoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  category: string;
  badge?: string;
  calories?: string;
}

export interface OnlineFoodRestaurant {
  id: string;
  name: string;
  platform: 'Swiggy' | 'Zomato' | 'Hospital Express';
  cuisine: string;
  rating: number;
  deliveryTimeMins: string;
  distanceStr: string;
  minOrder: number;
  mccCode: string;
  items: OnlineFoodItem[];
  imageUrl?: string;
  tag: string;
}

export interface OnlineFoodOrder {
  id: string;
  orderNumber: string;
  platform: 'Swiggy' | 'Zomato' | 'Hospital Express';
  restaurantId: string;
  restaurantName: string;
  items: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  deliveryLocation: string;
  estimatedDeliveryMins: number;
  status: 'PLACED' | 'PREPARING' | 'DISPATCHED' | 'DELIVERED';
  timestamp: string;
  cardLast4: string;
  txnId: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  badge?: string;
  category?: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: MerchantCategory;
  hospitalCluster: string;
  locationDetail: string;
  distanceStr: string;
  rating: number;
  reviewCount: number;
  acceptsF2Wallet: boolean;
  dailySpendLimit: number;
  operatingHours: string;
  popularItems: MenuItem[];
  qrPayload: string;
  iconType: string;
  imageUrl?: string;
  settlementSummary: {
    totalCollected: number;
    pendingSettlement: number;
    transactionCount: number;
  };
}

export type Phase2Topic = 
  | 'doctor_wealth_planning'
  | 'clinic_expansion_loan'
  | 'equipment_financing'
  | 'tax_structuring'
  | 'partner_network';

export type ConsultationChannel = 'IN_PERSON_HOSPITAL' | 'VIDEO_CALL' | 'PRIVATE_LOUNGE';

export interface Phase2Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  mobile: string;
  regNumber: string;
  preferredDate: string;
  preferredTime: string;
  topic: Phase2Topic;
  channel: ConsultationChannel;
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_DISCUSSION' | 'PROPOSAL_SHARED' | 'CONVERTED';
  assignedAdvisor: string;
  hospitalCluster: string;
  notes?: string;
  createdAt: string;
}

export interface PartnerReferral {
  id: string;
  referrerDoctorId: string;
  referrerName: string;
  referralCode: string;
  totalInvited: number;
  verifiedDoctors: number;
  totalEarnedCredits: number;
  complianceConsentGiven: boolean;
  referredList: {
    name: string;
    hospital: string;
    status: 'Verified & Spent' | 'Verified' | 'Pending Verification';
    joinedDate: string;
  }[];
}

export interface RegistryEntry {
  regNumber: string;
  councilState: string;
  fullName: string;
  qualification: string;
  yearOfRegistration: number;
  college: string;
  isValid: boolean;
  councilRegistryId: string;
}

export interface CampaignMetrics {
  doctorVerificationRate: number; // e.g. 91.4%
  walletActivationRate: number; // e.g. 88.2%
  firstSpendRate: number; // e.g. 78.5%
  repeatSpendRate: number; // e.g. 64.0%
  merchantCoverageOutlets: number; // e.g. 48
  costPerActivatedDoctor: number; // e.g. ₹560
  phase2BookingRate: number; // e.g. 24.8%
  totalVerifiedDoctors: number;
  totalWalletValueDisbursed: number;
  totalMerchantVolume: number;
}

export type ActiveAppView = 
  | 'DOCTOR_JOURNEY'
  | 'MERCHANT_POS'
  | 'ADMIN_CONSOLE'
  | 'PHASE2_CRM'
  | 'STRATEGY_DOC';

export type DoctorScreenStep = 
  | 'SCREEN_1_WELCOME'
  | 'SCREEN_2_VERIFICATION'
  | 'SCREEN_3_RESULT'
  | 'SCREEN_4_WALLET_HOME'
  | 'SCREEN_5_PAYMENT'
  | 'SCREEN_6_HISTORY'
  | 'SCREEN_7_PHASE2_CTA';
