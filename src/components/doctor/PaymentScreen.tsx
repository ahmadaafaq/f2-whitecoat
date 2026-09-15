import React, { useState, useEffect } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  QrCode, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Wallet as WalletIcon, 
  Coffee, 
  Utensils, 
  Sparkles, 
  Receipt, 
  Share2, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Camera
} from 'lucide-react';
import { Merchant, Transaction } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export const PaymentScreen: React.FC = () => {
  const { 
    currentDoctor, 
    currentWallet, 
    merchants, 
    selectedMerchantForPay, 
    setSelectedMerchantForPay,
    processDoctorPayment, 
    setDoctorStep 
  } = useF2();

  const [selectedMerchant, setSelectedMerchant] = useState<Merchant>(
    selectedMerchantForPay || merchants[0]
  );
  const [amount, setAmount] = useState<number>(95);
  const [customAmountInput, setCustomAmountInput] = useState<string>('95');
  const [selectedItemName, setSelectedItemName] = useState<string>('Artisan Cappuccino & Biscotti');
  const [notes, setNotes] = useState<string>('Morning OT break refreshment');
  const [isScanningMode, setIsScanningMode] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentResult, setPaymentResult] = useState<{ success: boolean; txn?: Transaction; error?: string } | null>(null);

  useEffect(() => {
    if (selectedMerchantForPay) {
      setSelectedMerchant(selectedMerchantForPay);
      if (selectedMerchantForPay.popularItems?.length > 0) {
        setAmount(selectedMerchantForPay.popularItems[0].price);
        setCustomAmountInput(selectedMerchantForPay.popularItems[0].price.toString());
        setSelectedItemName(selectedMerchantForPay.popularItems[0].name);
      }
    }
  }, [selectedMerchantForPay]);

  const balance = currentWallet?.balance ?? 0;
  const remainingAfterSpend = balance - (amount || 0);

  const handleSelectMerchant = (m: Merchant) => {
    setSelectedMerchant(m);
    setSelectedMerchantForPay(m);
    if (m.popularItems && m.popularItems.length > 0) {
      setAmount(m.popularItems[0].price);
      setCustomAmountInput(m.popularItems[0].price.toString());
      setSelectedItemName(m.popularItems[0].name);
    }
  };

  const handleSelectItem = (itemName: string, itemPrice: number) => {
    setSelectedItemName(itemName);
    setAmount(itemPrice);
    setCustomAmountInput(itemPrice.toString());
  };

  const handleAmountInputChange = (val: string) => {
    setCustomAmountInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    } else {
      setAmount(0);
    }
  };

  const handleConfirmPayment = () => {
    if (amount <= 0) return;
    if (amount > balance) return;

    setIsProcessing(true);
    setTimeout(() => {
      const res = processDoctorPayment({
        merchantId: selectedMerchant.id,
        amount: amount,
        notes: notes,
        itemSummary: selectedItemName
      });
      setIsProcessing(false);
      setPaymentResult(res);
    }, 600);
  };

  const handleResetForNewPayment = () => {
    setPaymentResult(null);
    setAmount(95);
    setCustomAmountInput('95');
    setDoctorStep('SCREEN_4_WALLET_HOME');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 5
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Merchant Payment & Balance Deduction
          </span>
        </div>
        <span className="text-[11px] text-teal-800 font-code font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
          Wallet: ₹{balance}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!paymentResult?.success ? (
          <motion.div
            key="payment-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6"
          >
            {/* Merchant Selection Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Select Hospital Merchant
                </label>
                <button
                  type="button"
                  onClick={() => setIsScanningMode(!isScanningMode)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isScanningMode ? 'Hide QR Scanner' : 'Simulate Camera QR Scan'}</span>
                </button>
              </div>

              {/* Simulated Scanner Viewport */}
              {isScanningMode && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
                  <div className="relative h-44 rounded-lg bg-white border-2 border-dashed border-teal-300 flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-24 h-24 border-2 border-teal-500 rounded-lg flex items-center justify-center animate-pulse bg-teal-50/50">
                      <QrCode className="w-12 h-12 text-teal-700" />
                    </div>
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent top-1/2 animate-bounce" />
                    <span className="text-[11px] text-teal-800 font-medium mt-2">
                      Scan Merchant F2 Counter QR Code
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Tap to simulate scan at:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {merchants.slice(0, 4).map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            handleSelectMerchant(m);
                            setIsScanningMode(false);
                          }}
                          className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-left text-[11px] text-slate-700 truncate shadow-xs"
                        >
                          ✓ {m.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Merchant Dropdown Picker */}
              <div className="relative">
                <select
                  id="select-pay-merchant"
                  value={selectedMerchant.id}
                  onChange={(e) => {
                    const found = merchants.find((m) => m.id === e.target.value);
                    if (found) handleSelectMerchant(found);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-sm font-semibold outline-none transition-all shadow-xs"
                >
                  {merchants.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.locationDetail})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-500">
                <span>Location: {selectedMerchant.locationDetail}</span>
                <span className="text-teal-700 font-mono font-semibold">{selectedMerchant.qrPayload}</span>
              </div>
            </div>

            {/* Popular Items Quick Selector */}
            {selectedMerchant.popularItems && selectedMerchant.popularItems.length > 0 && (
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Quick Pick Popular Items:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedMerchant.popularItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectItem(item.name, item.price)}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        amount === item.price && selectedItemName === item.name
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-1">{item.name}</span>
                        <span className="font-code font-bold text-amber-700">₹{item.price}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] text-teal-700 mt-0.5 block">{item.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>Enter Bill Amount (₹)</span>
                <span className="text-[11px] text-slate-500 font-normal">Max wallet balance: ₹{balance}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-xl font-bold text-slate-400 font-code">₹</span>
                <input
                  id="input-payment-amount"
                  type="number"
                  min="1"
                  max={balance}
                  value={customAmountInput}
                  onChange={(e) => handleAmountInputChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-2xl font-bold font-code outline-none shadow-xs"
                  placeholder="0"
                />
              </div>

              {/* Amount Quick Presets */}
              <div className="flex items-center gap-2 pt-1">
                {[65, 95, 110, 140, 185].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmountInput(preset.toString());
                      setSelectedItemName(`Hospital Order (₹${preset})`);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-code font-semibold transition-all ${
                      amount === preset
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Optional Order Note / Tag
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Morning rounds coffee, Post-OT lunch"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-600"
              />
            </div>

            {/* Live Balance Deduction Breakdown Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Current F2 Wallet Balance</span>
                <span className="font-code font-semibold text-slate-800">₹{balance}.00</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Amount to Deduct</span>
                <span className="font-code font-semibold text-amber-700">-₹{amount}.00</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold">
                <span className="text-slate-900">Remaining Balance After Spend</span>
                <span className={`font-code text-sm ${
                  remainingAfterSpend < 0 ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  ₹{remainingAfterSpend}.00
                </span>
              </div>
            </div>

            {remainingAfterSpend < 0 && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Amount exceeds available wallet balance of ₹{balance}. Please enter a lower amount.</span>
              </div>
            )}

            {paymentResult?.error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{paymentResult.error}</span>
              </div>
            )}

            {/* Submit Action */}
            <button
              id="btn-confirm-pay"
              type="button"
              disabled={isProcessing || amount <= 0 || remainingAfterSpend < 0}
              onClick={handleConfirmPayment}
              className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing F2 Wallet Debit...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Confirm & Pay ₹{amount} from F2 Wallet</span>
                </>
              )}
            </button>

          </motion.div>
        ) : (
          
          /* Success Receipt Card (Wireframe Screen 5 Success State) */
          <motion.div
            key="payment-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-8 space-y-6"
          >
            {/* Top Success Badge */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h2>
              <p className="text-xs text-slate-600">
                ₹{paymentResult.txn?.amount} has been paid to <strong className="text-teal-700">{paymentResult.txn?.merchantName}</strong>
              </p>
            </div>

            {/* Auditable Receipt Slip */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300 text-slate-500">
                <span>F2 WHITE COAT CLUB</span>
                <span className="text-teal-700 font-semibold">AUDIT LEDGER RECEIPT</span>
              </div>

              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-slate-900">{paymentResult.txn?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor Name:</span>
                  <span className="text-slate-900">{paymentResult.txn?.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Medical Reg No:</span>
                  <span className="text-teal-800">{paymentResult.txn?.doctorRegNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Merchant Outlet:</span>
                  <span className="text-slate-900">{paymentResult.txn?.merchantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Item Summary:</span>
                  <span className="text-slate-900">{paymentResult.txn?.itemSummary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-slate-900">{new Date().toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-dashed border-slate-300 space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-600">Amount Paid:</span>
                  <span className="text-amber-800 text-base">₹{paymentResult.txn?.amount}.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-600">Remaining Wallet Balance:</span>
                  <span className="text-emerald-700 text-base">₹{paymentResult.txn?.balanceAfter}.00</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>Digital Hash:</span>
                  <span className="truncate max-w-[180px]">{paymentResult.txn?.receiptHash}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn-view-ledger-after-pay"
                  onClick={() => setDoctorStep('SCREEN_6_HISTORY')}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Receipt className="w-4 h-4 text-teal-700" />
                  <span>View Wallet Ledger</span>
                </button>

                <button
                  onClick={handleResetForNewPayment}
                  className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Back to Wallet Home</span>
                </button>
              </div>

              {/* Phase 2 CTA bridge */}
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-center space-y-1.5">
                <span className="text-xs text-slate-700">
                  Ready to explore doctor financial advisory & partnerships?
                </span>
                <button
                  onClick={() => setDoctorStep('SCREEN_7_PHASE2_CTA')}
                  className="block mx-auto text-xs font-bold text-teal-800 hover:text-teal-900"
                >
                  Unlock Your F2 Professional Benefits →
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
