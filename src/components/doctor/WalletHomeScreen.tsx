import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Wallet as WalletIcon, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  Utensils, 
  Coffee, 
  Building, 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Receipt, 
  CheckCircle2, 
  Copy, 
  RefreshCw,
  Award,
  Zap,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Globe
} from 'lucide-react';
import { Merchant, MerchantCategory } from '../../types';
import { DoctorVirtualCard } from './DoctorVirtualCard';
import { motion } from 'motion/react';

export const WalletHomeScreen: React.FC = () => {
  const { 
    currentDoctor, 
    currentWallet, 
    merchants, 
    transactions, 
    setDoctorStep, 
    setSelectedMerchantForPay,
    generateDynamicCoupon 
  } = useF2();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const balance = currentWallet?.balance ?? 500;
  const initialGrant = currentWallet?.initialGrant ?? 500;
  const totalSpent = currentWallet?.totalSpent ?? 0;
  const progressPercent = Math.min(100, Math.round((balance / initialGrant) * 100));

  // Filter merchants based on category and query
  const filteredMerchants = merchants.filter((m) => {
    const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
    const matchesQuery = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.hospitalCluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.locationDetail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Recent transactions for this doctor
  const doctorTransactions = transactions
    .filter((t) => t.doctorId === currentDoctor?.id)
    .slice(0, 4);

  const handleStartPay = (merchant?: Merchant) => {
    if (merchant) {
      setSelectedMerchantForPay(merchant);
    } else {
      setSelectedMerchantForPay(null);
    }
    setDoctorStep('SCREEN_5_PAYMENT');
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const dynamicCoupon = currentWallet?.activeDynamicCoupon;

  return (
    <div className="w-full mx-auto px-0.5 sm:px-1 py-1 sm:py-3 space-y-5">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 4
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
            Doctor Mobile Wallet Hub
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Active</span>
        </div>
      </div>

      {/* Interactive Pluxee-Style Doctor Corporate Virtual Card */}
      <DoctorVirtualCard />

      {/* Section: Recent Wallet Transactions Preview (Placed directly below card) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-teal-600" />
            <h4 className="text-sm font-bold text-slate-900">Recent Transactions & Audit Trail</h4>
          </div>
          <button
            onClick={() => setDoctorStep('SCREEN_6_HISTORY')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>View Full Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {doctorTransactions.length > 0 ? (
          <div className="space-y-2">
            {doctorTransactions.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800">{t.merchantName}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {new Date(t.timestamp).toLocaleDateString()} • {t.itemSummary || 'Spend'} • Txn ID: {t.id}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-code font-bold ${
                    t.type === 'INITIAL_GRANT' ? 'text-emerald-700' : 'text-amber-800'
                  }`}>
                    {t.type === 'INITIAL_GRANT' ? `+₹${t.amount}` : `-₹${t.amount}`}
                  </span>
                  <div className="text-[10px] text-slate-500">Balance: ₹{t.balanceAfter}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-500">
            No transactions yet. Spend your ₹500 balance at any partner outlet below!
          </div>
        )}
      </div>

      {/* Quick Spend Method Tiles */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => handleStartPay()}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition-all text-left shadow-2xs group flex items-center justify-between gap-3 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                Scan Canteen QR
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Scan at hospital canteens & doctor espresso bars
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
        </button>

        <button
          onClick={() => setDoctorStep('SCREEN_FOOD_ORDERING')}
          className="p-3.5 rounded-2xl bg-white border border-teal-200 hover:border-teal-400 transition-all text-left shadow-2xs group flex items-center justify-between gap-3 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700">
                  Online Food Delivery
                </h4>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[9px] font-bold shrink-0">
                  Swiggy / Zomato
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                Direct delivery to OT, ICU or Doctors' Rest Suite
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        <button
          onClick={() => handleStartPay()}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition-all text-left shadow-2xs group flex items-center justify-between gap-3 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                Tap / Verbal POS
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Contactless tap or state 6-digit voucher at cashier
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
        </button>
      </div>

      {/* Dynamic 6-Digit One-Time Spend Coupon Generator */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-xs font-bold text-slate-800 truncate">
              Dynamic Verbal Voucher Code
            </span>
          </div>
          <span className="text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-200 font-semibold shrink-0">
            Cashier Alternate
          </span>
        </div>

        <p className="text-[11px] text-slate-500 leading-snug">
          State or show this code at any hospital canteen counter for instant verbal checkout.
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-teal-300 text-sm font-mono font-bold text-teal-900 tracking-wider select-all shadow-2xs shrink-0 whitespace-nowrap">
            {dynamicCoupon?.code || 'F2-WCC-8941'}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleCopyCoupon(dynamicCoupon?.code || 'F2-WCC-8941')}
              className="px-2.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs active:scale-95"
              title="Copy voucher code"
            >
              {copiedCode ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={() => generateDynamicCoupon(currentDoctor?.id)}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 transition-colors shadow-2xs active:scale-95"
              title="Generate fresh code"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Section: Nearby Partner Merchants Discovery */}
      <div className="space-y-3 pt-1">
        
        <div className="space-y-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Participating Outlets in Hospital Cluster</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Instant spend accepted at canteens, cafes, snack outlets and permitted pharmacies.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search canteen, cafe or dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 outline-none placeholder:text-slate-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Merchants' },
            { id: 'canteen', label: 'Hospital Canteens' },
            { id: 'coffee_beverage', label: 'Doctors Lounge & Coffee' },
            { id: 'food_court', label: 'Food Courts' },
            { id: 'snack_stall', label: 'Snacks & Juices' },
            { id: 'pharmacy', label: 'Care & Pharmacy' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium text-[11px] transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Merchant Cards Grid (Single column for mobile clarity) */}
        <div className="grid grid-cols-1 gap-3">
          {filteredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                      {merchant.category === 'coffee_beverage' ? (
                        <Coffee className="w-4 h-4" />
                      ) : merchant.category === 'canteen' ? (
                        <Utensils className="w-4 h-4" />
                      ) : (
                        <Building className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-teal-700 transition-colors truncate">
                        {merchant.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {merchant.locationDetail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold shrink-0">
                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    <span>{merchant.rating}</span>
                  </div>
                </div>

                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-medium text-slate-700">
                    {merchant.distanceStr}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 flex items-center gap-1 font-mono text-slate-700">
                    <Clock className="w-2.5 h-2.5 text-teal-600" />
                    {merchant.operatingHours}
                  </span>
                </div>

                {/* Popular items for doctors */}
                <div className="space-y-1">
                  <div className="text-[9px] uppercase font-bold text-slate-400">
                    Popular Doctor Picks:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {merchant.popularItems.slice(0, 2).map((item) => (
                      <div 
                        key={item.id}
                        className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-700 flex items-center gap-1.5"
                      >
                        <span className="truncate max-w-[150px]">{item.name}</span>
                        <span className="font-mono font-bold text-teal-700 shrink-0">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Action */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>F2 Wallet Accepted</span>
                </span>

                <button
                  id={`btn-pay-merchant-${merchant.id}`}
                  onClick={() => handleStartPay(merchant)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 shrink-0"
                >
                  <span>Pay Here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Phase 2 Relationship Teaser Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
            <Award className="w-3 h-3 text-amber-600" />
            <span>Phase 2 Doctor Privileges</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Unlock Your F2 Professional Benefits
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Beyond workspace meals: 1-on-1 financial planning, clinic equipment finance structuring, and accredited partner network benefits.
          </p>
        </div>

        <button
          id="btn-explore-phase2-banner"
          onClick={() => setDoctorStep('SCREEN_7_PHASE2_CTA')}
          className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-98"
        >
          <span>Explore Professional Benefits</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
