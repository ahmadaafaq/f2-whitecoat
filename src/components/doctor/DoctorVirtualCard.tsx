import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  CreditCard, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Lock, 
  Unlock, 
  Wifi, 
  Globe, 
  ShieldCheck, 
  Sliders, 
  Utensils, 
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DoctorVirtualCard: React.FC = () => {
  const { 
    currentDoctor, 
    currentWallet, 
    toggleCardFreeze, 
    toggleCardSetting, 
    updateDailyCardLimit,
    setIsFoodOrderingOpen 
  } = useF2();

  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [customLimit, setCustomLimit] = useState(currentWallet?.virtualCard?.dailyLimit || 500);

  const card = currentWallet?.virtualCard;
  const balance = currentWallet?.balance ?? 500;

  if (!card) {
    return null;
  }

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const maskedCardNumber = showFullDetails 
    ? card.cardNumber 
    : `•••• •••• •••• ${card.cardNumber.slice(-4)}`;

  return (
    <div className="space-y-4">
      
      {/* Card Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center font-bold">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">F2 Corporate Medical Card</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                Pluxee Ecosystem
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Approved for food, canteens, doctor lounges & online delivery apps (Swiggy / Zomato)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toggleCardFreeze(currentDoctor.id)}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs border ${
              card.isFrozen
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {card.isFrozen ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            <span>{card.isFrozen ? 'Card Frozen' : 'Card Active'}</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Card Controls</span>
            {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Visual Virtual Card Container */}
      <div className="relative">
        <div className={`w-full rounded-2xl p-5 sm:p-7 text-white shadow-lg transition-all duration-300 relative overflow-hidden ${
          card.isFrozen 
            ? 'bg-slate-800 opacity-90 grayscale-[30%]' 
            : 'bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900'
        }`}>
          
          {/* Subtle Background Art / Security Watermark */}
          <div className="absolute right-0 top-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Card Top Row */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center font-serif-title font-extrabold text-sm text-teal-200 shadow-inner">
                F2
              </div>
              <div>
                <span className="text-xs font-extrabold tracking-wider uppercase text-teal-200 block">
                  White Coat Club
                </span>
                <span className="text-[10px] text-teal-300/80 font-medium">
                  Doctor Corporate Benefit Card
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-teal-300 text-xs font-mono">
                <Wifi className="w-4 h-4 rotate-90" />
                <span className="text-[10px] font-bold hidden xs:inline">NFC</span>
              </div>
              <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold font-mono tracking-wider sm:tracking-widest text-teal-100">
                {card.cardNetwork}
              </div>
            </div>
          </div>

          {/* EMV Chip & Balance indicator */}
          <div className="my-4 sm:my-5 flex items-center justify-between relative z-10">
            <div className="w-10 h-7 sm:w-11 sm:h-8 rounded-md bg-gradient-to-tr from-amber-300 to-amber-100 border border-amber-400/80 shadow-xs flex items-center justify-center">
              <div className="w-6 h-4 sm:w-7 sm:h-5 border border-amber-600/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                <div className="border-r border-amber-600/40" />
                <div />
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-teal-200 uppercase tracking-wider font-semibold block">
                Benefit Balance
              </span>
              <span className="text-xl sm:text-3xl font-extrabold font-code text-white tracking-tight">
                ₹{balance}
              </span>
            </div>
          </div>

          {/* Card Number */}
          <div className="relative z-10 my-2 sm:my-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-teal-300 font-semibold uppercase tracking-wider">
                Card Number
              </span>
              <button
                onClick={() => setShowFullDetails(!showFullDetails)}
                className="text-[11px] text-teal-200 hover:text-white flex items-center gap-1 transition-colors"
              >
                {showFullDetails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showFullDetails ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-base sm:text-2xl font-mono font-bold tracking-wider sm:tracking-widest text-teal-50 select-all truncate">
                {maskedCardNumber}
              </span>
              <button
                onClick={() => handleCopy(card.cardNumber, 'card')}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-200 hover:text-white transition-colors shrink-0"
                title="Copy Card Number"
              >
                {copiedField === 'card' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Cardholder Name, Expiry & CVV */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-teal-700/50 relative z-10 text-xs">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-teal-300/80 block">Cardholder</span>
              <span className="font-bold tracking-wide text-teal-100 truncate block mt-0.5 text-[11px] sm:text-xs">
                {card.cardholderName}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase tracking-wider text-teal-300/80 block">Valid Thru</span>
              <span className="font-mono font-bold text-teal-100 block mt-0.5 text-[11px] sm:text-xs">
                {card.expiry}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] uppercase tracking-wider text-teal-300/80 block">CVV / CVC</span>
              <div className="flex items-center justify-end gap-1.5 mt-0.5">
                <span className="font-mono font-bold text-teal-100 text-[11px] sm:text-xs">
                  {showCVV ? card.cvv : '•••'}
                </span>
                <button
                  onClick={() => setShowCVV(!showCVV)}
                  className="text-teal-300 hover:text-white"
                  title="Reveal CVV"
                >
                  {showCVV ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Frozen Overlay */}
          {card.isFrozen && (
            <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 z-20">
              <Lock className="w-8 h-8 text-rose-400 mb-2 animate-bounce" />
              <div className="text-sm font-bold text-white">Card is Temporarily Frozen</div>
              <p className="text-xs text-slate-300 max-w-xs mt-1">
                All transactions (POS, Canteens, Swiggy, Zomato) are blocked for security.
              </p>
              <button
                onClick={() => toggleCardFreeze(currentDoctor.id)}
                className="mt-3 px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                Unfreeze Card Now
              </button>
            </div>
          )}

        </div>

        {/* Instant Action Strip Below Card */}
        <div className="mt-3 flex flex-col gap-2 p-3 rounded-xl bg-teal-50/70 border border-teal-100 text-xs">
          <div className="flex items-center gap-2 text-teal-900">
            <Utensils className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold text-[11px] sm:text-xs">Order Food to Hospital or Lounge</span>
          </div>

          <button
            onClick={() => setIsFoodOrderingOpen(true)}
            className="w-full py-2 px-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Order on Swiggy / Zomato / Canteen</span>
          </button>
        </div>
      </div>

      {/* Expandable Card Controls Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Rule Engine & Controls
                  </h4>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Instant Sync</span>
              </div>

              {/* Toggles (Single column for mobile clarity) */}
              <div className="grid grid-cols-1 gap-2.5">
                
                {/* Online Ordering Toggle */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div className="space-y-0.5 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-800">
                      <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Online Delivery Apps</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Allow Swiggy, Zomato & hospital food apps
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCardSetting(currentDoctor.id, 'online', !card.onlineTxnsEnabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                      card.onlineTxnsEnabled ? 'bg-teal-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      card.onlineTxnsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Contactless Tap Toggle */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div className="space-y-0.5 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-800">
                      <Wifi className="w-3.5 h-3.5 text-teal-600 rotate-90 shrink-0" />
                      <span>Contactless POS Tap</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Tap-to-pay at hospital canteen terminals
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCardSetting(currentDoctor.id, 'contactless', !card.contactlessEnabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                      card.contactlessEnabled ? 'bg-teal-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      card.contactlessEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

              </div>

              {/* Daily Limit Slider */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">Daily Spending Limit</span>
                  <span className="font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded text-[11px]">
                    ₹{customLimit} / day
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={customLimit}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCustomLimit(val);
                    updateDailyCardLimit(currentDoctor.id, val);
                  }}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹100 (Min)</span>
                  <span>₹500 (Default Grant)</span>
                  <span>₹1,000 (Max)</span>
                </div>
              </div>

              {/* Allowed MCC Categories */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>Configured MCC Spend Whitelist (Pluxee Spec)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {card.allowedMccCategories.map((mcc, idx) => (
                    <div 
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-teal-50/50 border border-teal-100 text-[11px] text-teal-800 font-medium flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                      <span>{mcc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
