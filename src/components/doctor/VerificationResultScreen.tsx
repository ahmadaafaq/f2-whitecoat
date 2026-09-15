import React from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Wallet as WalletIcon, 
  Award, 
  Building2, 
  Clock, 
  Info,
  QrCode,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';

export const VerificationResultScreen: React.FC = () => {
  const { currentDoctor, currentWallet, activateWallet, setDoctorStep } = useF2();

  const isVerified = currentDoctor?.verificationStatus === 'verified';
  const isPendingReview = currentDoctor?.verificationStatus === 'pending_manual_review';
  const isWalletActive = currentWallet && currentWallet.status === 'active';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 3
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Verification Result & Wallet Issuance
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">F2 White Coat Club</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Main Status Banner */}
        <div className={`rounded-2xl border p-6 sm:p-8 shadow-sm relative overflow-hidden ${
          isVerified 
            ? 'bg-white border-slate-200'
            : 'bg-white border-amber-200'
        }`}>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                isVerified 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}>
                {isVerified ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <AlertTriangle className="w-8 h-8" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                    isVerified 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {isVerified ? '✓ Identity Verified' : 'Manual Review Queued'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {currentDoctor?.verificationConfidence ? `${currentDoctor.verificationConfidence}% Confidence` : 'Controlled Queue'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {isVerified ? `Welcome, ${currentDoctor.name}` : 'Verification Under Fast-Track Review'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {isVerified 
                    ? 'Your medical council registration has been authenticated against national medical registries.' 
                    : 'Our medical compliance desk is verifying your registry record. Estimated completion: ~15 mins.'}
                </p>
              </div>
            </div>

            {/* Privilege Badge */}
            <div className="hidden sm:flex flex-col items-end shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Membership Tier</span>
                <span className="text-xs font-bold text-teal-800 font-serif-title flex items-center gap-1 justify-end">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  White Coat Verified
                </span>
              </div>
            </div>
          </div>

          {/* Verified Doctor Credential Box */}
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Medical Registration No</span>
              <span className="text-sm font-bold text-teal-800 font-code mt-0.5 block">{currentDoctor?.regNumber}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">{currentDoctor?.councilState}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Qualification & College</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{currentDoctor?.qualification}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block truncate">{currentDoctor?.college}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Hospital Workspace</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{currentDoctor?.hospitalCluster}</span>
              <span className="text-[10px] text-emerald-700 mt-0.5 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> F2 Merchant Network Active
              </span>
            </div>
          </div>

        </div>

        {/* ₹500 Wallet Grant Activation Card */}
        {isVerified && (
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                  <WalletIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Your ₹500 F2 Workspace Wallet</h3>
                  <p className="text-xs text-slate-500">Pre-allocated engagement grant for meals, coffee, and canteen refreshments.</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-code">₹500.00</span>
                <span className="text-[10px] text-slate-500 block">INR • 100% Subsidized</span>
              </div>
            </div>

            {/* Grant Rules Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-teal-600" />
                <span>Phase 1 Wallet Terms & Expiry Rules:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                <li>Valid at all participating hospital canteens, cafes, beverage stalls & snack hubs in your cluster.</li>
                <li>Instant QR payment & 6-digit coupon redemption with real-time balance tracking.</li>
                <li>Valid for 90 days from activation date with transparent audit ledger.</li>
                <li>Doctor retains complete data control and explicit communication preferences.</li>
              </ul>
            </div>

            {/* Big Action CTA */}
            <div>
              {isWalletActive ? (
                <button
                  id="btn-go-to-wallet-home"
                  onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
                  className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-xs flex items-center justify-center gap-2 group transition-all"
                >
                  <WalletIcon className="w-5 h-5" />
                  <span>Open Wallet Home (₹{currentWallet.balance} Available)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  id="btn-activate-wallet"
                  onClick={() => activateWallet(currentDoctor.id)}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xs flex items-center justify-center gap-2 group transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Activate ₹500 F2 Wallet Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
