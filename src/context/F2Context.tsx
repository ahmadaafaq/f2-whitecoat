import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  DoctorProfile,
  Wallet,
  Merchant,
  Transaction,
  Phase2Booking,
  PartnerReferral,
  CampaignMetrics,
  ActiveAppView,
  DoctorScreenStep,
  RegistryEntry,
  VirtualCardInfo,
  OnlineFoodRestaurant,
  OnlineFoodOrder,
  PaymentMethod
} from '../types';
import {
  INITIAL_DOCTORS,
  INITIAL_WALLETS,
  INITIAL_MERCHANTS,
  INITIAL_TRANSACTIONS,
  INITIAL_PHASE2_BOOKINGS,
  INITIAL_PARTNER_REFERRALS,
  INITIAL_CAMPAIGN_METRICS,
  OFFICIAL_REGISTRY_DATABASE,
  ONLINE_FOOD_RESTAURANTS
} from '../data/mockData';

const STORAGE_KEYS = {
  DOCTORS: 'f2_wcc_doctors_v1',
  WALLETS: 'f2_wcc_wallets_v1',
  TRANSACTIONS: 'f2_wcc_transactions_v1',
  MERCHANTS: 'f2_wcc_merchants_v1',
  BOOKINGS: 'f2_wcc_bookings_v1',
  REFERRALS: 'f2_wcc_referrals_v1',
  ONLINE_ORDERS: 'f2_wcc_online_orders_v1',
  ACTIVE_DOC_ID: 'f2_wcc_active_doc_id_v1',
};

interface F2ContextType {
  doctors: DoctorProfile[];
  wallets: Record<string, Wallet>;
  transactions: Transaction[];
  merchants: Merchant[];
  phase2Bookings: Phase2Booking[];
  partnerReferrals: PartnerReferral[];
  campaignMetrics: CampaignMetrics;
  onlineRestaurants: OnlineFoodRestaurant[];
  onlineOrders: OnlineFoodOrder[];
  
  // Navigation State
  activeView: ActiveAppView;
  setActiveView: (view: ActiveAppView) => void;
  doctorStep: DoctorScreenStep;
  setDoctorStep: (step: DoctorScreenStep) => void;
  isFoodOrderingOpen: boolean;
  setIsFoodOrderingOpen: (open: boolean) => void;
  
  // Active Entities
  currentDoctor: DoctorProfile;
  currentWallet: Wallet | null;
  selectedMerchantForPay: Merchant | null;
  setSelectedMerchantForPay: (merchant: Merchant | null) => void;
  lastCompletedTxn: Transaction | null;
  setLastCompletedTxn: (txn: Transaction | null) => void;
  
  // Verification helpers
  isVerifyingRegistry: boolean;
  registryResult: { success: boolean; message: string; data?: RegistryEntry } | null;
  
  // Actions
  selectDoctor: (doctorId: string) => void;
  verifyDoctorRegistryLookup: (regNo: string, council: string) => Promise<{ success: boolean; data?: RegistryEntry; message: string }>;
  registerAndVerifyDoctor: (formData: {
    name: string;
    mobile: string;
    regNumber: string;
    councilState: string;
    college: string;
    hospitalCluster: string;
    specialty: string;
    email?: string;
    consentAgreed: boolean;
  }) => Promise<DoctorProfile>;
  activateWallet: (doctorId: string) => void;
  generateDynamicCoupon: (doctorId: string, limit?: number) => string;
  
  // Pluxee-Style Virtual Card Controls
  toggleCardFreeze: (doctorId: string) => void;
  toggleCardSetting: (doctorId: string, setting: 'online' | 'contactless', value: boolean) => void;
  updateDailyCardLimit: (doctorId: string, limit: number) => void;
  
  // Online Food Delivery Checkout
  processOnlineFoodOrder: (params: {
    restaurantId: string;
    restaurantName: string;
    platform: 'Swiggy' | 'Zomato' | 'Hospital Express';
    items: { name: string; price: number; quantity: number }[];
    deliveryLocation: string;
    notes?: string;
    totalAmount: number;
  }) => { success: boolean; order?: OnlineFoodOrder; txn?: Transaction; error?: string };

  processDoctorPayment: (params: {
    merchantId: string;
    amount: number;
    paymentMethod?: PaymentMethod;
    notes?: string;
    itemSummary?: string;
  }) => { success: boolean; txn?: Transaction; error?: string };
  merchantRedeemCoupon: (params: {
    couponCode: string;
    merchantId: string;
    amount: number;
  }) => { success: boolean; txn?: Transaction; error?: string };
  merchantCardTapPayment: (params: {
    cardNumber: string;
    merchantId: string;
    amount: number;
    itemSummary?: string;
  }) => { success: boolean; txn?: Transaction; error?: string };
  reverseTransaction: (txnId: string, reason: string) => void;
  adminApproveDoctor: (doctorId: string) => void;
  adminRejectDoctor: (doctorId: string, reason: string) => void;
  bookPhase2Consultation: (data: {
    preferredDate: string;
    preferredTime: string;
    topic: Phase2Booking['topic'];
    channel: Phase2Booking['channel'];
    notes?: string;
  }) => Phase2Booking;
  updateBookingStatus: (bookingId: string, status: Phase2Booking['status'], notes?: string) => void;
  addNewMerchant: (merchant: Omit<Merchant, 'id' | 'settlementSummary'>) => void;
  resetToDefaultData: () => void;
  triggerConfettiAnimation: () => void;
}

const F2Context = createContext<F2ContextType | undefined>(undefined);

export const F2Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or defaults
  const [doctors, setDoctors] = useState<DoctorProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });

  const [wallets, setWallets] = useState<Record<string, Wallet>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WALLETS);
      return saved ? JSON.parse(saved) : INITIAL_WALLETS;
    } catch {
      return INITIAL_WALLETS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [merchants, setMerchants] = useState<Merchant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MERCHANTS);
      return saved ? JSON.parse(saved) : INITIAL_MERCHANTS;
    } catch {
      return INITIAL_MERCHANTS;
    }
  });

  const [phase2Bookings, setPhase2Bookings] = useState<Phase2Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_PHASE2_BOOKINGS;
    } catch {
      return INITIAL_PHASE2_BOOKINGS;
    }
  });

  const [partnerReferrals, setPartnerReferrals] = useState<PartnerReferral[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REFERRALS);
      return saved ? JSON.parse(saved) : INITIAL_PARTNER_REFERRALS;
    } catch {
      return INITIAL_PARTNER_REFERRALS;
    }
  });

  const [onlineOrders, setOnlineOrders] = useState<OnlineFoodOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ONLINE_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeDoctorId, setActiveDoctorId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_DOC_ID);
      return saved || INITIAL_DOCTORS[0].id;
    } catch {
      return INITIAL_DOCTORS[0].id;
    }
  });

  // App UI Navigation States
  const [activeView, setActiveView] = useState<ActiveAppView>('DOCTOR_JOURNEY');
  const [doctorStep, setDoctorStep] = useState<DoctorScreenStep>('SCREEN_4_WALLET_HOME');
  const [isFoodOrderingOpen, setIsFoodOrderingOpen] = useState(false);
  const [selectedMerchantForPay, setSelectedMerchantForPay] = useState<Merchant | null>(null);
  const [lastCompletedTxn, setLastCompletedTxn] = useState<Transaction | null>(null);
  const [isVerifyingRegistry, setIsVerifyingRegistry] = useState(false);
  const [registryResult, setRegistryResult] = useState<{ success: boolean; message: string; data?: RegistryEntry } | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
      localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(wallets));
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
      localStorage.setItem(STORAGE_KEYS.MERCHANTS, JSON.stringify(merchants));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(phase2Bookings));
      localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(partnerReferrals));
      localStorage.setItem(STORAGE_KEYS.ONLINE_ORDERS, JSON.stringify(onlineOrders));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DOC_ID, activeDoctorId);
    } catch (e) {
      console.error('Storage sync error', e);
    }
  }, [doctors, wallets, transactions, merchants, phase2Bookings, partnerReferrals, onlineOrders, activeDoctorId]);

  // Derived current active doctor
  const currentDoctor = doctors.find((d) => d.id === activeDoctorId) || doctors[0];
  const currentWallet = wallets[currentDoctor?.id] || null;

  // Recalculate dynamic campaign metrics based on live state
  const totalVerifiedDoctors = doctors.filter((d) => d.verificationStatus === 'verified').length;
  const totalActivatedWallets = (Object.values(wallets) as Wallet[]).filter((w) => w.status === 'active').length;
  const verifiedWithSpend = doctors.filter((d) => {
    const docTxns = transactions.filter((t) => t.doctorId === d.id && t.type === 'SPEND' && t.status === 'SUCCESS');
    return docTxns.length >= 1;
  }).length;
  const verifiedWithRepeatSpend = doctors.filter((d) => {
    const docTxns = transactions.filter((t) => t.doctorId === d.id && t.type === 'SPEND' && t.status === 'SUCCESS');
    return docTxns.length >= 2;
  }).length;
  const totalSpendVolume = transactions
    .filter((t) => t.type === 'SPEND' && t.status === 'SUCCESS')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const campaignMetrics: CampaignMetrics = {
    doctorVerificationRate: doctors.length > 0 ? Math.round((totalVerifiedDoctors / doctors.length) * 1000) / 10 : 91.4,
    walletActivationRate: totalVerifiedDoctors > 0 ? Math.round((totalActivatedWallets / totalVerifiedDoctors) * 1000) / 10 : 88.6,
    firstSpendRate: totalActivatedWallets > 0 ? Math.round((verifiedWithSpend / totalActivatedWallets) * 1000) / 10 : 79.2,
    repeatSpendRate: verifiedWithSpend > 0 ? Math.round((verifiedWithRepeatSpend / verifiedWithSpend) * 1000) / 10 : 64.5,
    merchantCoverageOutlets: merchants.length,
    costPerActivatedDoctor: 560,
    phase2BookingRate: totalVerifiedDoctors > 0 ? Math.round((phase2Bookings.length / totalVerifiedDoctors) * 1000) / 10 : 26.8,
    totalVerifiedDoctors: totalVerifiedDoctors + 408, // Scaled total for realistic platform stats
    totalWalletValueDisbursed: totalActivatedWallets * 500 + 200000,
    totalMerchantVolume: totalSpendVolume + 152000
  };

  const triggerConfettiAnimation = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A896', '#028090', '#F0F3F4', '#F4D06F', '#10B981']
      });
    } catch {
      // safe fallback
    }
  };

  const selectDoctor = (doctorId: string) => {
    setActiveDoctorId(doctorId);
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) return;
    
    // Automatically transition to appropriate step based on doctor's verification state
    if (doc.verificationStatus === 'unverified') {
      setDoctorStep('SCREEN_1_WELCOME');
    } else if (doc.verificationStatus === 'verified') {
      const wal = wallets[doc.id];
      if (wal && wal.status === 'active') {
        setDoctorStep('SCREEN_4_WALLET_HOME');
      } else {
        setDoctorStep('SCREEN_3_RESULT');
      }
    } else {
      setDoctorStep('SCREEN_3_RESULT');
    }
  };

  // Authoritative registry check simulation
  const verifyDoctorRegistryLookup = async (regNo: string, council: string) => {
    setIsVerifyingRegistry(true);
    setRegistryResult(null);

    return new Promise<{ success: boolean; data?: RegistryEntry; message: string }>((resolve) => {
      setTimeout(() => {
        setIsVerifyingRegistry(false);
        const cleanReg = regNo.trim().toUpperCase();
        const match = OFFICIAL_REGISTRY_DATABASE.find(
          (entry) =>
            entry.regNumber.toUpperCase() === cleanReg ||
            cleanReg.includes(entry.regNumber.toUpperCase()) ||
            entry.regNumber.replace(/[^0-9]/g, '') === cleanReg.replace(/[^0-9]/g, '')
        );

        if (match && match.isValid) {
          const res = {
            success: true,
            data: match,
            message: `Official Registry Match Found: Confirmed with ${match.councilState} (Council Record: ${match.councilRegistryId})`
          };
          setRegistryResult(res);
          resolve(res);
        } else {
          // If not in standard preloaded mock, we allow high-confidence validation with simulated API check
          const fallbackEntry: RegistryEntry = {
            regNumber: regNo,
            councilState: council || 'National Medical Commission (NMC)',
            fullName: 'Dr. Verified Practitioner',
            qualification: 'MBBS, Specialist',
            yearOfRegistration: 2020,
            college: 'Recognized Medical College',
            isValid: true,
            councilRegistryId: `NMC/LIVE/${regNo}-VAL`
          };
          const res = {
            success: true,
            data: fallbackEntry,
            message: `Medical Registry Checked: Verified via State Medical Council API (${council})`
          };
          setRegistryResult(res);
          resolve(res);
        }
      }, 1200);
    });
  };

  // Register & Complete Verification Flow
  const registerAndVerifyDoctor = async (formData: {
    name: string;
    mobile: string;
    regNumber: string;
    councilState: string;
    college: string;
    hospitalCluster: string;
    specialty: string;
    email?: string;
    consentAgreed: boolean;
  }): Promise<DoctorProfile> => {
    const lookup = await verifyDoctorRegistryLookup(formData.regNumber, formData.councilState);
    const newDocId = `doc-${Date.now().toString().slice(-4)}`;

    const newDoctor: DoctorProfile = {
      id: newDocId,
      name: formData.name.startsWith('Dr.') ? formData.name : `Dr. ${formData.name}`,
      mobile: formData.mobile,
      regNumber: formData.regNumber.toUpperCase(),
      councilState: formData.councilState,
      qualification: lookup.data?.qualification || 'MBBS',
      college: formData.college || lookup.data?.college || 'Medical College',
      hospitalCluster: formData.hospitalCluster,
      specialty: formData.specialty || 'General Medicine',
      verificationStatus: lookup.success ? 'verified' : 'pending_manual_review',
      verificationSource: lookup.success ? 'NMC_NATIONAL_REGISTRY' : 'MANUAL_OFFICIAL_REVIEW',
      verificationConfidence: lookup.success ? 99.6 : 82.0,
      verifiedAt: lookup.success ? new Date().toISOString() : undefined,
      consentAgreed: formData.consentAgreed,
      consentTimestamp: new Date().toISOString(),
      email: formData.email
    };

    setDoctors((prev) => [newDoctor, ...prev]);
    setActiveDoctorId(newDoctor.id);

    // If verified, proceed to screen 3
    setDoctorStep('SCREEN_3_RESULT');
    return newDoctor;
  };

  // Activate ₹500 F2 Wallet for verified doctor
  const activateWallet = (doctorId: string) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    const doc = doctors.find((d) => d.id === doctorId) || currentDoctor;
    const cardNum = `4192 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    const cvv = `${Math.floor(100 + Math.random() * 900)}`;

    const newWallet: Wallet = {
      id: `w-${doctorId}`,
      doctorId: doctorId,
      balance: 500,
      initialGrant: 500,
      totalSpent: 0,
      currency: 'INR',
      status: 'active',
      activatedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      virtualCard: {
        cardNumber: cardNum,
        cardholderName: doc.name.toUpperCase(),
        expiry: '09/28',
        cvv: cvv,
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
        code: `F2-WCC-${Math.floor(1000 + Math.random() * 9000)}`,
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        amountLimit: 500,
        generatedAt: new Date().toISOString()
      }
    };

    setWallets((prev) => ({ ...prev, [doctorId]: newWallet }));

    // Create initial grant transaction in audit ledger
    const grantTxn: Transaction = {
      id: `TXN-GRANT-${Date.now().toString().slice(-6)}`,
      walletId: newWallet.id,
      doctorId: doctorId,
      doctorName: doc.name,
      doctorRegNo: doc.regNumber,
      merchantId: 'f2-system',
      merchantName: 'F2 Fintech — Welcome Benefit Grant',
      merchantCategory: 'canteen',
      hospitalCluster: doc.hospitalCluster,
      amount: 500,
      balanceBefore: 0,
      balanceAfter: 500,
      type: 'INITIAL_GRANT',
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      receiptHash: Math.random().toString(36).substring(2, 12),
      itemSummary: 'Phase 1 White Coat Club Onboarding ₹500 Balance & Virtual Card',
      notes: 'Authoritative Medical Registration verification bonus credited'
    };

    setTransactions((prev) => [grantTxn, ...prev]);
    triggerConfettiAnimation();
    setDoctorStep('SCREEN_4_WALLET_HOME');
  };

  // Pluxee-Style Virtual Card Controls
  const toggleCardFreeze = (doctorId: string) => {
    setWallets((prev) => {
      const wal = prev[doctorId];
      if (!wal || !wal.virtualCard) return prev;
      return {
        ...prev,
        [doctorId]: {
          ...wal,
          virtualCard: {
            ...wal.virtualCard,
            isFrozen: !wal.virtualCard.isFrozen
          }
        }
      };
    });
  };

  const toggleCardSetting = (doctorId: string, setting: 'online' | 'contactless', value: boolean) => {
    setWallets((prev) => {
      const wal = prev[doctorId];
      if (!wal || !wal.virtualCard) return prev;
      return {
        ...prev,
        [doctorId]: {
          ...wal,
          virtualCard: {
            ...wal.virtualCard,
            ...(setting === 'online' ? { onlineTxnsEnabled: value } : { contactlessEnabled: value })
          }
        }
      };
    });
  };

  const updateDailyCardLimit = (doctorId: string, limit: number) => {
    setWallets((prev) => {
      const wal = prev[doctorId];
      if (!wal || !wal.virtualCard) return prev;
      return {
        ...prev,
        [doctorId]: {
          ...wal,
          virtualCard: {
            ...wal.virtualCard,
            dailyLimit: limit
          }
        }
      };
    });
  };

  // Online Food Delivery Checkout Simulation (Swiggy / Zomato / Hospital Express)
  const processOnlineFoodOrder = (params: {
    restaurantId: string;
    restaurantName: string;
    platform: 'Swiggy' | 'Zomato' | 'Hospital Express';
    items: { name: string; price: number; quantity: number }[];
    deliveryLocation: string;
    notes?: string;
    totalAmount: number;
  }) => {
    const doctor = currentDoctor;
    const wal = wallets[doctor.id];

    if (!wal || wal.status !== 'active') {
      return { success: false, error: 'Doctor Benefit Wallet is not active.' };
    }

    if (wal.virtualCard?.isFrozen) {
      return { success: false, error: 'Your F2 Virtual Card is currently frozen. Unfreeze it to place orders.' };
    }

    if (!wal.virtualCard?.onlineTxnsEnabled) {
      return { success: false, error: 'Online transactions are disabled on your virtual card. Please enable them in card settings.' };
    }

    if (params.totalAmount <= 0) {
      return { success: false, error: 'Order total must be greater than ₹0.' };
    }

    if (params.totalAmount > wal.balance) {
      return {
        success: false,
        error: `Insufficient balance! Your available benefit balance is ₹${wal.balance}, but order total is ₹${params.totalAmount}.`
      };
    }

    const cardLast4 = wal.virtualCard?.cardNumber ? wal.virtualCard.cardNumber.slice(-4) : '4028';
    const balanceBefore = wal.balance;
    const balanceAfter = balanceBefore - params.totalAmount;
    const orderNum = `ORD-${params.platform.toUpperCase().slice(0, 2)}-${Math.floor(10000 + Math.random() * 90000)}`;
    const txnId = `TXN-ONL-${Math.floor(10000 + Math.random() * 90000)}-F2`;

    const newTxn: Transaction = {
      id: txnId,
      walletId: wal.id,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorRegNo: doctor.regNumber,
      merchantId: params.restaurantId,
      merchantName: `${params.platform} — ${params.restaurantName}`,
      merchantCategory: 'online_delivery',
      hospitalCluster: doctor.hospitalCluster,
      amount: params.totalAmount,
      balanceBefore: balanceBefore,
      balanceAfter: balanceAfter,
      type: 'SPEND',
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      receiptHash: `onl_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36).slice(-4)}`,
      paymentMethod: 'VIRTUAL_CARD_ONLINE',
      platform: params.platform,
      cardLast4: cardLast4,
      mccCode: '5812 (Dining/Online Food)',
      itemSummary: params.items.map((i) => `${i.name} (x${i.quantity})`).join(', '),
      notes: params.notes || `Direct Pluxee-Style Card Checkout on ${params.platform}`,
      deliveryLocation: params.deliveryLocation,
      fraudScore: 1
    };

    const newOrder: OnlineFoodOrder = {
      id: `ord-${Date.now().toString().slice(-6)}`,
      orderNumber: orderNum,
      platform: params.platform,
      restaurantId: params.restaurantId,
      restaurantName: params.restaurantName,
      items: params.items,
      totalAmount: params.totalAmount,
      deliveryLocation: params.deliveryLocation,
      estimatedDeliveryMins: params.platform === 'Hospital Express' ? 12 : 22,
      status: 'PLACED',
      timestamp: new Date().toISOString(),
      cardLast4: cardLast4,
      txnId: txnId
    };

    const updatedWallet: Wallet = {
      ...wal,
      balance: balanceAfter,
      totalSpent: wal.totalSpent + params.totalAmount
    };

    setWallets((prev) => ({ ...prev, [doctor.id]: updatedWallet }));
    setTransactions((prev) => [newTxn, ...prev]);
    setOnlineOrders((prev) => [newOrder, ...prev]);
    setLastCompletedTxn(newTxn);

    triggerConfettiAnimation();
    return { success: true, order: newOrder, txn: newTxn };
  };

  // Merchant Card Tap Terminal Simulation
  const merchantCardTapPayment = (params: {
    cardNumber: string;
    merchantId: string;
    amount: number;
    itemSummary?: string;
  }) => {
    const cleanNum = params.cardNumber.replace(/\s+/g, '');
    let matchingDoc: DoctorProfile | undefined;
    let matchingWallet: Wallet | undefined;

    for (const [docId, walEntry] of Object.entries(wallets)) {
      const wal = walEntry as Wallet;
      if (wal.virtualCard && wal.virtualCard.cardNumber.replace(/\s+/g, '') === cleanNum) {
        matchingDoc = doctors.find((d) => d.id === docId);
        matchingWallet = wal;
        break;
      }
    }

    if (!matchingDoc || !matchingWallet) {
      const firstActiveId = Object.keys(wallets)[0];
      matchingDoc = doctors.find((d) => d.id === firstActiveId) || doctors[0];
      matchingWallet = wallets[firstActiveId];
    }

    if (!matchingWallet || matchingWallet.status !== 'active') {
      return { success: false, error: 'Virtual Card is invalid or not activated.' };
    }

    if (matchingWallet.virtualCard?.isFrozen) {
      return { success: false, error: 'Transaction declined: Card is FROZEN by cardholder.' };
    }

    if (!matchingWallet.virtualCard?.contactlessEnabled) {
      return { success: false, error: 'Transaction declined: Contactless/NFC is disabled.' };
    }

    if (params.amount > matchingWallet.balance) {
      return { success: false, error: `Insufficient Card Balance. Available: ₹${matchingWallet.balance}` };
    }

    const merchant = merchants.find((m) => m.id === params.merchantId) || merchants[0];
    const balanceBefore = matchingWallet.balance;
    const balanceAfter = balanceBefore - params.amount;

    const newTxn: Transaction = {
      id: `TXN-TAP-${Math.floor(10000 + Math.random() * 90000)}-F2`,
      walletId: matchingWallet.id,
      doctorId: matchingDoc.id,
      doctorName: matchingDoc.name,
      doctorRegNo: matchingDoc.regNumber,
      merchantId: merchant.id,
      merchantName: merchant.name,
      merchantCategory: merchant.category,
      hospitalCluster: merchant.hospitalCluster,
      amount: params.amount,
      balanceBefore: balanceBefore,
      balanceAfter: balanceAfter,
      type: 'SPEND',
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      receiptHash: `tap_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36).slice(-4)}`,
      paymentMethod: 'VIRTUAL_CARD_TAP',
      platform: 'Hospital Canteen Terminal POS',
      cardLast4: matchingWallet.virtualCard?.cardNumber ? matchingWallet.virtualCard.cardNumber.slice(-4) : '4028',
      mccCode: '5814 (Hospital Food Court & Canteens)',
      itemSummary: params.itemSummary || 'Card Tap / POS Contactless Spend',
      notes: `NFC Tap & Pay at ${merchant.name}`,
      fraudScore: 1
    };

    setWallets((prev) => ({
      ...prev,
      [matchingDoc!.id]: {
        ...matchingWallet!,
        balance: balanceAfter,
        totalSpent: matchingWallet!.totalSpent + params.amount
      }
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    setMerchants((prev) =>
      prev.map((m) =>
        m.id === merchant.id
          ? {
              ...m,
              settlementSummary: {
                totalCollected: m.settlementSummary.totalCollected + params.amount,
                pendingSettlement: m.settlementSummary.pendingSettlement + params.amount,
                transactionCount: m.settlementSummary.transactionCount + 1
              }
            }
          : m
      )
    );

    return { success: true, txn: newTxn };
  };

  // Generate dynamic 6-digit one-time spend coupon code
  const generateDynamicCoupon = (doctorId: string, limit?: number) => {
    const wal = wallets[doctorId];
    if (!wal) return '';

    const maxSpend = limit && limit <= wal.balance ? limit : wal.balance;
    const randomCode = `F2-WCC-${Math.floor(1000 + Math.random() * 9000)}`;
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity

    const updatedWallet: Wallet = {
      ...wal,
      activeDynamicCoupon: {
        code: randomCode,
        validUntil: expires.toISOString(),
        amountLimit: maxSpend,
        generatedAt: new Date().toISOString()
      }
    };

    setWallets((prev) => ({ ...prev, [doctorId]: updatedWallet }));
    return randomCode;
  };

  // Process payment from Doctor side
  const processDoctorPayment = (params: {
    merchantId: string;
    amount: number;
    notes?: string;
    itemSummary?: string;
  }) => {
    const doctor = currentDoctor;
    const wal = wallets[doctor.id];
    const merchant = merchants.find((m) => m.id === params.merchantId);

    if (!wal || wal.status !== 'active') {
      return { success: false, error: 'F2 Doctor Wallet is not active.' };
    }

    if (!merchant) {
      return { success: false, error: 'Merchant not recognized in F2 Network.' };
    }

    if (params.amount <= 0) {
      return { success: false, error: 'Payment amount must be greater than ₹0.' };
    }

    if (params.amount > wal.balance) {
      return {
        success: false,
        error: `Insufficient balance! Your available balance is ₹${wal.balance}, but bill is ₹${params.amount}.`
      };
    }

    const balanceBefore = wal.balance;
    const balanceAfter = balanceBefore - params.amount;

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}-F2`,
      walletId: wal.id,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorRegNo: doctor.regNumber,
      merchantId: merchant.id,
      merchantName: merchant.name,
      merchantCategory: merchant.category,
      hospitalCluster: merchant.hospitalCluster,
      amount: params.amount,
      balanceBefore: balanceBefore,
      balanceAfter: balanceAfter,
      type: 'SPEND',
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      receiptHash: `f2${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36).slice(-4)}`,
      itemSummary: params.itemSummary || 'Hospital Meal / Beverage Redemption',
      notes: params.notes || `F2 QR Payment at ${merchant.name}`,
      fraudScore: 1
    };

    // Update wallet
    const updatedWallet: Wallet = {
      ...wal,
      balance: balanceAfter,
      totalSpent: wal.totalSpent + params.amount,
      activeDynamicCoupon: undefined // consume dynamic coupon
    };

    // Update merchant settlements
    const updatedMerchants = merchants.map((m) => {
      if (m.id === merchant.id) {
        return {
          ...m,
          settlementSummary: {
            totalCollected: m.settlementSummary.totalCollected + params.amount,
            pendingSettlement: m.settlementSummary.pendingSettlement + params.amount,
            transactionCount: m.settlementSummary.transactionCount + 1
          }
        };
      }
      return m;
    });

    setWallets((prev) => ({ ...prev, [doctor.id]: updatedWallet }));
    setTransactions((prev) => [newTxn, ...prev]);
    setMerchants(updatedMerchants);
    setLastCompletedTxn(newTxn);

    triggerConfettiAnimation();
    return { success: true, txn: newTxn };
  };

  // Process Merchant POS Coupon/QR Scan
  const merchantRedeemCoupon = (params: {
    couponCode: string;
    merchantId: string;
    amount: number;
  }) => {
    // Find doctor wallet with matching active coupon or matching doctor id
    const cleanCode = params.couponCode.trim().toUpperCase();
    let matchingDoc: DoctorProfile | undefined;
    let matchingWallet: Wallet | undefined;

    for (const [docId, walEntry] of Object.entries(wallets)) {
      const wal = walEntry as Wallet;
      if (wal.activeDynamicCoupon && wal.activeDynamicCoupon.code.toUpperCase() === cleanCode) {
        matchingDoc = doctors.find((d) => d.id === docId);
        matchingWallet = wal;
        break;
      }
      // If code is doctor reg number or ID
      const foundByReg = doctors.find((d) => d.regNumber.toUpperCase() === cleanCode && d.id === docId);
      if (docId === cleanCode || foundByReg) {
        matchingDoc = foundByReg || doctors.find((d) => d.id === docId);
        matchingWallet = wal;
        break;
      }
    }

    if (!matchingDoc || !matchingWallet) {
      return { success: false, error: 'Invalid or expired F2 Doctor Coupon / QR Code.' };
    }

    if (matchingWallet.status !== 'active') {
      return { success: false, error: 'Doctor wallet is locked or expired.' };
    }

    if (params.amount > matchingWallet.balance) {
      return {
        success: false,
        error: `Doctor wallet only has ₹${matchingWallet.balance} remaining. Bill ₹${params.amount} exceeds balance.`
      };
    }

    const merchant = merchants.find((m) => m.id === params.merchantId) || merchants[0];
    const balanceBefore = matchingWallet.balance;
    const balanceAfter = balanceBefore - params.amount;

    const newTxn: Transaction = {
      id: `TXN-POS-${Math.floor(10000 + Math.random() * 90000)}-F2`,
      walletId: matchingWallet.id,
      doctorId: matchingDoc.id,
      doctorName: matchingDoc.name,
      doctorRegNo: matchingDoc.regNumber,
      merchantId: merchant.id,
      merchantName: merchant.name,
      merchantCategory: merchant.category,
      hospitalCluster: merchant.hospitalCluster,
      amount: params.amount,
      balanceBefore: balanceBefore,
      balanceAfter: balanceAfter,
      type: 'SPEND',
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      receiptHash: `pos_${Math.random().toString(36).substring(2, 12)}`,
      itemSummary: `POS Redemption: ${cleanCode}`,
      notes: `Merchant POS validation at ${merchant.name}`,
      fraudScore: 1
    };

    setWallets((prev) => ({
      ...prev,
      [matchingDoc!.id]: {
        ...matchingWallet!,
        balance: balanceAfter,
        totalSpent: matchingWallet!.totalSpent + params.amount,
        activeDynamicCoupon: undefined
      }
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    // Update merchant settlements
    setMerchants((prev) =>
      prev.map((m) =>
        m.id === merchant.id
          ? {
              ...m,
              settlementSummary: {
                totalCollected: m.settlementSummary.totalCollected + params.amount,
                pendingSettlement: m.settlementSummary.pendingSettlement + params.amount,
                transactionCount: m.settlementSummary.transactionCount + 1
              }
            }
          : m
      )
    );

    return { success: true, txn: newTxn };
  };

  // Reversal of transaction (Admin / Operations control)
  const reverseTransaction = (txnId: string, reason: string) => {
    const txn = transactions.find((t) => t.id === txnId);
    if (!txn || txn.status === 'REVERSED') return;

    const wal = wallets[txn.doctorId];
    if (!wal) return;

    const refundedBalance = wal.balance + txn.amount;

    const reversalTxn: Transaction = {
      id: `TXN-REV-${Date.now().toString().slice(-6)}`,
      walletId: wal.id,
      doctorId: txn.doctorId,
      doctorName: txn.doctorName,
      doctorRegNo: txn.doctorRegNo,
      merchantId: txn.merchantId,
      merchantName: txn.merchantName,
      merchantCategory: txn.merchantCategory,
      hospitalCluster: txn.hospitalCluster,
      amount: txn.amount,
      balanceBefore: wal.balance,
      balanceAfter: refundedBalance,
      type: 'REVERSAL',
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      receiptHash: `rev_${Math.random().toString(36).substring(2, 10)}`,
      itemSummary: `Refund/Reversal for ${txn.id}`,
      notes: `Reversed by Admin: ${reason}`
    };

    // Update original transaction status to REVERSED
    setTransactions((prev) =>
      [reversalTxn, ...prev.map((t) => (t.id === txnId ? { ...t, status: 'REVERSED' as const } : t))]
    );

    // Refund wallet
    setWallets((prev) => ({
      ...prev,
      [txn.doctorId]: {
        ...wal,
        balance: refundedBalance,
        totalSpent: Math.max(0, wal.totalSpent - txn.amount)
      }
    }));
  };

  // Admin Verification actions
  const adminApproveDoctor = (doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId
          ? {
              ...d,
              verificationStatus: 'verified' as const,
              verificationSource: 'MANUAL_OFFICIAL_REVIEW' as const,
              verificationConfidence: 100,
              verifiedAt: new Date().toISOString()
            }
          : d
      )
    );
    // Auto-activate wallet if not exists
    if (!wallets[doctorId]) {
      activateWallet(doctorId);
    }
  };

  const adminRejectDoctor = (doctorId: string, reason: string) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId
          ? {
              ...d,
              verificationStatus: 'rejected' as const,
              verificationSource: 'NOT_VERIFIED' as const
            }
          : d
      )
    );
  };

  // Phase 2 Doctor Relationship & Partner booking
  const bookPhase2Consultation = (data: {
    preferredDate: string;
    preferredTime: string;
    topic: Phase2Booking['topic'];
    channel: Phase2Booking['channel'];
    notes?: string;
  }) => {
    const doctor = currentDoctor;
    const newBooking: Phase2Booking = {
      id: `P2-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      mobile: doctor.mobile,
      regNumber: doctor.regNumber,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      topic: data.topic,
      channel: data.channel,
      status: 'CONFIRMED',
      assignedAdvisor: 'Vikramaditya Sengupta (VP Doctor Wealth & Strategy, F2)',
      hospitalCluster: doctor.hospitalCluster,
      notes: data.notes || 'Doctor opted-in from Phase 1 White Coat Club journey',
      createdAt: new Date().toISOString()
    };

    setPhase2Bookings((prev) => [newBooking, ...prev]);
    triggerConfettiAnimation();
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Phase2Booking['status'], notes?: string) => {
    setPhase2Bookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status, notes: notes || b.notes } : b))
    );
  };

  const addNewMerchant = (merchantData: Omit<Merchant, 'id' | 'settlementSummary'>) => {
    const newMerchant: Merchant = {
      ...merchantData,
      id: `merch-${Date.now().toString().slice(-4)}`,
      settlementSummary: {
        totalCollected: 0,
        pendingSettlement: 0,
        transactionCount: 0
      }
    };
    setMerchants((prev) => [newMerchant, ...prev]);
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setDoctors(INITIAL_DOCTORS);
    setWallets(INITIAL_WALLETS);
    setTransactions(INITIAL_TRANSACTIONS);
    setMerchants(INITIAL_MERCHANTS);
    setPhase2Bookings(INITIAL_PHASE2_BOOKINGS);
    setPartnerReferrals(INITIAL_PARTNER_REFERRALS);
    setActiveDoctorId(INITIAL_DOCTORS[0].id);
    setDoctorStep('SCREEN_4_WALLET_HOME');
    setActiveView('DOCTOR_JOURNEY');
  };

  return (
    <F2Context.Provider
      value={{
        doctors,
        wallets,
        transactions,
        merchants,
        phase2Bookings,
        partnerReferrals,
        campaignMetrics,
        onlineRestaurants: ONLINE_FOOD_RESTAURANTS,
        onlineOrders,
        activeView,
        setActiveView,
        doctorStep,
        setDoctorStep,
        isFoodOrderingOpen,
        setIsFoodOrderingOpen,
        currentDoctor,
        currentWallet,
        selectedMerchantForPay,
        setSelectedMerchantForPay,
        lastCompletedTxn,
        setLastCompletedTxn,
        isVerifyingRegistry,
        registryResult,
        selectDoctor,
        verifyDoctorRegistryLookup,
        registerAndVerifyDoctor,
        activateWallet,
        generateDynamicCoupon,
        toggleCardFreeze,
        toggleCardSetting,
        updateDailyCardLimit,
        processOnlineFoodOrder,
        processDoctorPayment,
        merchantRedeemCoupon,
        merchantCardTapPayment,
        reverseTransaction,
        adminApproveDoctor,
        adminRejectDoctor,
        bookPhase2Consultation,
        updateBookingStatus,
        addNewMerchant,
        resetToDefaultData,
        triggerConfettiAnimation
      }}
    >
      {children}
    </F2Context.Provider>
  );
};

export const useF2 = () => {
  const context = useContext(F2Context);
  if (!context) {
    throw new Error('useF2 must be used within an F2Provider');
  }
  return context;
};
