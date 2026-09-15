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
import { DoctorFoodOrderingModal } from './DoctorFoodOrderingModal';
import { motion } from 'motion/react';

export const WalletHomeScreen: React.FC = () => {
  const { 
    currentDoctor, 
    currentWallet, 
    merchants, 
    transactions, 
    setDoctorStep, 
    setSelectedMerchantForPay,
    generateDynamicCoupon,
    setIsFoodOrderingOpen 
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 4
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Doctor Virtual Card & Meal Spend Hub
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">F2 Pluxee Ecosystem Active</span>
        </div>
      </div>

      {/* Interactive Pluxee-Style Doctor Corporate Virtual Card */}
      <DoctorVirtualCard />

      {/* Quick Spend Method Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => handleStartPay()}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition-all text-left shadow-2xs group flex items-start justify-between"
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700">Scan Canteen QR</h4>
            <p className="text-[11px] text-slate-500">Scan at hospital canteens & doctor espresso bars</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors mt-1" />
        </button>

        <button
          onClick={() => setIsFoodOrderingOpen(true)}
          className="p-4 rounded-2xl bg-white border border-teal-200 hover:border-teal-400 transition-all text-left shadow-2xs group flex items-start justify-between"
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700">Online Food Apps</h4>
              <span className="px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 text-[9px] font-bold">Swiggy/Zomato</span>
            </div>
            <p className="text-[11px] text-slate-500">Direct delivery to OT, ICU or Doctors' Rest Suite</p>
          </div>
          <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-0.5 transition-all mt-1" />
        </button>

        <button
          onClick={() => handleStartPay()}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition-all text-left shadow-2xs group flex items-start justify-between"
        >
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700">Tap / Verbal POS</h4>
            <p className="text-[11px] text-slate-500">Contactless tap or tell 6-digit coupon at cashier</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors mt-1" />
        </button>
      </div>

      {/* Dynamic 6-Digit One-Time Spend Coupon Generator */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-bold text-slate-800">Dynamic One-Time Verbal Voucher Code</span>
            <span className="text-[10px] text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded border border-teal-200 font-semibold">
              Cashier Alternate
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Show or state this code at any hospital canteen counter if you prefer verbal checkout.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-teal-300 text-sm font-bold text-teal-800 font-code tracking-wider select-all shadow-xs">
            {dynamicCoupon?.code || 'F2-WCC-8941'}
          </div>

          <button
            onClick={() => handleCopyCoupon(dynamicCoupon?.code || 'F2-WCC-8941')}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 transition-colors shadow-xs"
            title="Copy voucher code"
          >
            {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => generateDynamicCoupon(currentDoctor?.id)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 transition-colors shadow-xs"
            title="Generate fresh code"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section: Nearby Partner Merchants Discovery */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>Participating Outlets in Your Hospital Cluster</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant spend accepted at canteens, cafes, snack outlets and permitted pharmacies.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search outlet or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 outline-none placeholder:text-slate-400 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Merchants' },
            { id: 'canteen', label: 'Hospital Canteens' },
            { id: 'coffee_beverage', label: 'Doctors Lounge & Coffee' },
            { id: 'food_court', label: 'Food Courts & Plaza' },
            { id: 'snack_stall', label: 'Quick Snacks & Juices' },
            { id: 'pharmacy', label: 'Care & Pharmacy' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Merchant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs group flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                      {merchant.category === 'coffee_beverage' ? (
                        <Coffee className="w-5 h-5" />
                      ) : merchant.category === 'canteen' ? (
                        <Utensils className="w-5 h-5" />
                      ) : (
                        <Building className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                        {merchant.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{merchant.locationDetail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold shrink-0">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{merchant.rating}</span>
                  </div>
                </div>

                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-medium text-slate-700">
                    {merchant.distanceStr}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 flex items-center gap-1 font-mono text-slate-700">
                    <Clock className="w-3 h-3 text-teal-600" />
                    {merchant.operatingHours}
                  </span>
                </div>

                {/* Popular items for doctors */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Popular Doctor Picks:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {merchant.popularItems.slice(0, 2).map((item) => (
                      <div 
                        key={item.id}
                        className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-center gap-1.5"
                      >
                        <span>{item.name}</span>
                        <span className="font-code font-bold text-teal-700">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Action */}
              <div className="pt-4 mt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> F2 Wallet Accepted
                </span>

                <button
                  id={`btn-pay-merchant-${merchant.id}`}
                  onClick={() => handleStartPay(merchant)}
                  className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <span>Pay Here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Section: Recent Wallet Transactions Preview */}
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
            No transactions yet. Spend your ₹500 balance at any partner outlet above!
          </div>
        )}
      </div>

      {/* Phase 2 Relationship Teaser Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
            <Award className="w-3 h-3 text-amber-600" />
            <span>Phase 2 Doctor Privileges</span>
          </div>
          <h4 className="text-base font-bold text-slate-900">Unlock Your F2 Professional Benefits</h4>
          <p className="text-xs text-slate-600 max-w-xl">
            Beyond workspace meals: 1-on-1 financial planning, clinic equipment finance structuring, and accredited partner network benefits.
          </p>
        </div>

        <button
          id="btn-explore-phase2-banner"
          onClick={() => setDoctorStep('SCREEN_7_PHASE2_CTA')}
          className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-teal-800 hover:text-teal-900 border border-slate-300 font-bold text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Explore Professional Benefits</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Online Food Ordering Modal */}
      <DoctorFoodOrderingModal />

    </div>
  );
};
