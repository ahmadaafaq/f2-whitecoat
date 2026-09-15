import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Store, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Clock, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  Coffee, 
  Utensils, 
  Sparkles, 
  Receipt,
  Building,
  RefreshCw,
  Zap,
  CreditCard,
  Wifi,
  ShieldCheck
} from 'lucide-react';
import { Merchant, Transaction, Wallet } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export const MerchantPOSView: React.FC = () => {
  const { 
    merchants, 
    transactions, 
    merchantRedeemCoupon, 
    merchantCardTapPayment,
    wallets, 
    doctors 
  } = useF2();

  const [posMode, setPosMode] = useState<'CARD_TAP' | 'VOUCHER' | 'QR_STANDEE'>('CARD_TAP');
  const walletList: Wallet[] = Object.values(wallets || {});
  const defaultCard = walletList.find((w: Wallet) => w?.virtualCard?.cardNumber)?.virtualCard?.cardNumber || '4892 5601 3341 8920';
  
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(merchants[0]?.id || 'merch-01');
  const [couponInput, setCouponInput] = useState<string>('F2-WCC-8941');
  const [cardNumberInput, setCardNumberInput] = useState<string>(defaultCard);
  const [billAmount, setBillAmount] = useState<number>(95);
  const [selectedItemName, setSelectedItemName] = useState<string>('Doctor Canteen Thali & Juice');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [posResult, setPosResult] = useState<{ success: boolean; txn?: Transaction; error?: string } | null>(null);

  const fallbackMerchant: Merchant = {
    id: 'merch-01',
    name: 'Apollo Cafeteria & Lounge',
    category: 'canteen',
    hospitalCluster: 'Apollo Hospitals & Medical Research',
    locationDetail: 'Main Wing, 1st Floor Food Court',
    distanceStr: 'Inside Ground Floor',
    rating: 4.8,
    reviewCount: 128,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '07:00 AM – 11:30 PM',
    qrPayload: 'F2-PAY-APOLLO-M01',
    iconType: 'Utensils',
    popularItems: [
      { id: 'item-fallback-1', name: 'Doctor Thali & Juice', price: 95, badge: 'Popular' }
    ],
    settlementSummary: {
      totalCollected: 2450,
      transactionCount: 26,
      pendingSettlement: 2450
    }
  };

  const activeMerchant = merchants.find((m) => m.id === selectedMerchantId) || merchants[0] || fallbackMerchant;

  // Transactions specific to this merchant outlet
  const merchantTxns = transactions.filter((t) => t.merchantId === activeMerchant.id);

  const handleRedeemVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim() || billAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const res = merchantRedeemCoupon({
        couponCode: couponInput.trim(),
        merchantId: activeMerchant.id,
        amount: billAmount
      });
      setIsProcessing(false);
      setPosResult(res);
    }, 600);
  };

  const handleTapCardPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cardNumberInput.trim() || billAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const res = merchantCardTapPayment({
        cardNumber: cardNumberInput.trim(),
        merchantId: activeMerchant.id,
        amount: billAmount,
        itemSummary: selectedItemName
      });
      setIsProcessing(false);
      setPosResult(res);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">F2 Merchant POS & Terminal</h1>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Pluxee Smart Terminal Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hospital food courts, canteens & doctor lounges instant card tap & redemption portal.
            </p>
          </div>
        </div>

        {/* Outlet Selector Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Active Outlet:</span>
          <select
            id="select-active-merchant-pos"
            value={selectedMerchantId}
            onChange={(e) => {
              setSelectedMerchantId(e.target.value);
              setPosResult(null);
            }}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold outline-none focus:border-teal-600 shadow-xs"
          >
            {merchants.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.hospitalCluster.split('—')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Terminal Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold max-w-xl">
        <button
          onClick={() => {
            setPosMode('CARD_TAP');
            setPosResult(null);
          }}
          className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
            posMode === 'CARD_TAP'
              ? 'bg-white text-teal-800 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Tap Virtual Card</span>
        </button>

        <button
          onClick={() => {
            setPosMode('VOUCHER');
            setPosResult(null);
          }}
          className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
            posMode === 'VOUCHER'
              ? 'bg-white text-teal-800 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Verbal Coupon</span>
        </button>

        <button
          onClick={() => {
            setPosMode('QR_STANDEE');
            setPosResult(null);
          }}
          className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
            posMode === 'QR_STANDEE'
              ? 'bg-white text-teal-800 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">QR Standee</span>
        </button>
      </div>

      {/* Outlet Daily Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Today's White Coat Redemptions</span>
          <div className="text-2xl font-extrabold text-slate-900 font-code mt-1">
            ₹{activeMerchant.settlementSummary.totalCollected.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
            {activeMerchant.settlementSummary.transactionCount} Doctor meals served
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Pending Daily Settlement (T+1)</span>
          <div className="text-2xl font-extrabold text-teal-700 font-code mt-1">
            ₹{activeMerchant.settlementSummary.pendingSettlement.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Automated direct bank NEFT
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">F2 Terminal & MCC Whitelist</span>
          <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> MCC 5812 / 5814 Approved
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block font-mono">
            Terminal: {activeMerchant.qrPayload}
          </span>
        </div>
      </div>

      {/* Main POS Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Terminal Screen */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
            
            {posMode === 'CARD_TAP' ? (
              /* Contactless Virtual Card Reader Simulator */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-teal-600 rotate-90" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Contactless NFC & Virtual Card Reader
                    </h3>
                  </div>
                  <span className="text-[10px] text-teal-700 font-mono font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Pluxee EMV Certified
                  </span>
                </div>

                {/* Quick Tap Doctor Preset Cards */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Tap Doctor's F2 Card:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {walletList.slice(0, 4).map((w) => {
                      const doc = doctors.find(d => d.id === w.doctorId);
                      const isSelected = cardNumberInput.replace(/\s+/g, '') === (w.virtualCard?.cardNumber || '').replace(/\s+/g, '');
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => {
                            if (w.virtualCard) {
                              setCardNumberInput(w.virtualCard.cardNumber);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{doc?.name || 'Doctor'}</span>
                            <span className="font-mono font-bold text-teal-700">₹{w.balance}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-1">
                            •••• {w.virtualCard?.cardNumber.slice(-4)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleTapCardPayment} className="space-y-4 text-xs pt-2">
                  <div>
                    <label className="block text-slate-700 font-semibold uppercase tracking-wider mb-1.5">
                      Card Number (16 Digits)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumberInput}
                        onChange={(e) => setCardNumberInput(e.target.value)}
                        placeholder="4892 5601 3341 8920"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-teal-900 font-mono font-bold text-base outline-none shadow-xs"
                      />
                      <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold uppercase tracking-wider mb-1.5">
                      Bill Amount to Settle (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-lg font-bold text-slate-400 font-code">₹</span>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={billAmount}
                        onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-code font-bold text-lg outline-none focus:border-teal-600 shadow-xs"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      {[65, 95, 110, 140, 185].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setBillAmount(amt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-code font-semibold transition-all ${
                            billAmount === amt
                              ? 'bg-teal-600 text-white font-bold shadow-xs'
                              : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status or Errors */}
                  {posResult && (
                    <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                      posResult.success 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }`}>
                      {posResult.success ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      )}
                      <div>
                        {posResult.success ? (
                          <div>
                            <div className="font-bold text-slate-900">Virtual Card Payment Approved!</div>
                            <div className="text-[11px] text-slate-600 mt-0.5">
                              Doctor: {posResult.txn?.doctorName} • Amount: ₹{posResult.txn?.amount} • Remaining Doctor Balance: ₹{posResult.txn?.balanceAfter}
                            </div>
                          </div>
                        ) : (
                          <div>{posResult.error}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Authorizing Pluxee RuPay Card...</span>
                      </>
                    ) : (
                      <>
                        <Wifi className="w-4 h-4 rotate-90" />
                        <span>Tap & Charge ₹{billAmount} (NFC Simulation)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : posMode === 'VOUCHER' ? (
              /* Voucher Code Mode */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Validate Doctor 6-Digit Voucher Code</span>
                  </h3>
                  <span className="text-[10px] text-teal-700 font-mono font-bold">Verbal POS</span>
                </div>

                <form onSubmit={handleRedeemVoucher} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold uppercase tracking-wider mb-1.5">
                      Doctor Spend Voucher / Code / Reg No
                    </label>
                    <div className="relative">
                      <input
                        id="input-pos-voucher"
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="e.g. F2-WCC-8941"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-teal-800 font-code font-bold text-base uppercase outline-none shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold uppercase tracking-wider mb-1.5">
                      Bill Amount to Charge (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-lg font-bold text-slate-400 font-code">₹</span>
                      <input
                        id="input-pos-bill-amount"
                        type="number"
                        min="1"
                        max="500"
                        value={billAmount}
                        onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-code font-bold text-lg outline-none focus:border-teal-600 shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Status or Errors */}
                  {posResult && (
                    <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                      posResult.success 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }`}>
                      {posResult.success ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      )}
                      <div>
                        {posResult.success ? (
                          <div>
                            <div className="font-bold text-slate-900">Payment of ₹{posResult.txn?.amount} Approved!</div>
                            <div className="text-[11px] text-slate-600 mt-0.5">
                              Doctor: {posResult.txn?.doctorName} • Remaining Doctor Balance: ₹{posResult.txn?.balanceAfter}
                            </div>
                          </div>
                        ) : (
                          <div>{posResult.error}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    id="btn-pos-charge"
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Doctor Balance...</span>
                      </>
                    ) : (
                      <>
                        <span>Charge ₹{billAmount} from F2 Wallet</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Standee QR Display */
              <div className="space-y-4 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest">
                    Counter Dynamic QR Standee
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{activeMerchant.name}</h3>
                  <p className="text-xs text-slate-500">{activeMerchant.locationDetail}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 shadow-xs space-y-3 max-w-[260px] mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] font-bold text-slate-700">
                    <span>F2 WHITE COAT CLUB</span>
                    <span className="text-teal-700">VERIFIED OUTLET</span>
                  </div>

                  <div className="w-44 h-44 mx-auto bg-white border border-slate-200 p-2 rounded-xl flex items-center justify-center">
                    <div className="w-full h-full bg-white p-2 rounded-lg flex flex-col items-center justify-center relative">
                      <QrCode className="w-32 h-32 text-slate-900" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-md bg-teal-600 text-white font-bold font-serif-title flex items-center justify-center text-xs shadow-xs border-2 border-white">
                          F2
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5 text-center">
                    <div className="text-[11px] font-bold text-slate-900">Scan with F2 Doctor App</div>
                    <div className="text-[9px] text-slate-500 font-mono">{activeMerchant.qrPayload}</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Terminal Specs & MCC Verification */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Pluxee Card Regulatory Framework
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <span>
                  <strong>MCC Gating:</strong> Card automatically enforces Merchant Category Codes (5812, 5814, 5811, 5411) for zero non-food leakage.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Daily Cap Auto-enforcement:</strong> Prevents unauthorized batch transactions exceeding configured daily limits.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Instant Hospital Cluster Settlement:</strong> Merchants receive daily automated T+1 NEFT settlement directly into their registered bank account.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-1">
              <div className="font-bold flex items-center justify-between">
                <span>Terminal Encryption</span>
                <span className="font-mono text-[10px]">AES-256 GCM</span>
              </div>
              <p className="text-[11px] text-teal-800">
                All transactions generate verifiable immutable hash audit trails visible in Doctor & Hospital Ledgers.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Outlet Settlement History */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-teal-600" />
            <h4 className="text-sm font-bold text-slate-900">Terminal Redemptions Ledger ({activeMerchant.name})</h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">Real-time Sync</span>
        </div>

        {merchantTxns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-2 font-semibold">Txn ID</th>
                  <th className="pb-2 font-semibold">Doctor</th>
                  <th className="pb-2 font-semibold">Item / Description</th>
                  <th className="pb-2 font-semibold">Time</th>
                  <th className="pb-2 font-semibold text-right">Amount</th>
                  <th className="pb-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {merchantTxns.map((t) => (
                  <tr key={t.id} className="text-slate-700">
                    <td className="py-2.5 font-mono text-[11px] text-slate-500">{t.id}</td>
                    <td className="py-2.5 font-semibold text-slate-900">{t.doctorName}</td>
                    <td className="py-2.5">{t.itemSummary || 'Canteen Spend'}</td>
                    <td className="py-2.5 text-slate-500">{new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-2.5 text-right font-code font-bold text-emerald-700">₹{t.amount}</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Settled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-500">
            No redemptions at this terminal yet today.
          </div>
        )}
      </div>

    </div>
  );
};
