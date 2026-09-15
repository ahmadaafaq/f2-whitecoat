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
    <div className="w-full mx-auto px-0.5 py-1 space-y-3.5 max-w-full overflow-hidden">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
            SCREEN 3
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
            Verification & Grant
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono shrink-0">White Coat Club</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3.5"
      >
        {/* Main Status Banner */}
        <div className={`rounded-2xl border p-4 shadow-sm relative overflow-hidden space-y-3.5 ${
          isVerified 
            ? 'bg-white border-slate-200'
            : 'bg-white border-amber-200'
        }`}>

          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
              isVerified 
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}>
              {isVerified ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <AlertTriangle className="w-6 h-6" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                  isVerified 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {isVerified ? '✓ Identity Verified' : 'Manual Review Queued'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {currentDoctor?.verificationConfidence ? `${currentDoctor.verificationConfidence}% Match` : 'Controlled Queue'}
                </span>
              </div>

              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 leading-tight truncate">
                {isVerified ? `Welcome, ${currentDoctor.name}` : 'Verification Under Review'}
              </h1>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                {isVerified 
                  ? 'Medical council registration authenticated against authoritative registries.' 
                  : 'Compliance desk is verifying your registry record. Estimated: ~15 mins.'}
              </p>
            </div>
          </div>

          {/* Verified Doctor Credential Details (Stacked Clean Cards) */}
          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-semibold block">Medical Registration</span>
                <span className="text-xs font-bold text-teal-800 font-code">{currentDoctor?.regNumber}</span>
              </div>
              <span className="text-[10px] text-slate-600 font-medium bg-white px-2 py-0.5 rounded border border-slate-200">
                {currentDoctor?.councilState}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Qualification</span>
                <span className="text-[11px] font-bold text-slate-800">{currentDoctor?.qualification}</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">{currentDoctor?.college}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase font-semibold block">Hospital Workspace</span>
              <div className="text-[11px] font-bold text-slate-800 truncate">{currentDoctor?.hospitalCluster}</div>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium pt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>F2 Merchant Outlets & Canteens Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* ₹500 Wallet Grant Activation Card */}
        {isVerified && (
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm relative space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                  <WalletIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">₹500 Workspace Wallet</h3>
                  <p className="text-[10px] text-slate-500">Welcome grant for hospital meals & cafes.</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-extrabold text-amber-700 font-code">₹500.00</span>
                <span className="text-[9px] text-slate-500 block">Subsidized</span>
              </div>
            </div>

            {/* Grant Rules Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[11px] text-slate-700">
              <div className="font-semibold text-slate-900 flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Phase 1 Wallet Terms:</span>
              </div>
              <ul className="space-y-1 text-[10px] text-slate-600 pl-1">
                <li className="flex items-start gap-1">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Valid at hospital canteens, cafes, beverage stalls & snack hubs.</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Instant QR payment & 6-digit coupon redemption with real-time ledger.</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Valid 90 days from activation with zero commitments.</span>
                </li>
              </ul>
            </div>

            {/* Action CTA */}
            <div className="pt-0.5">
              {isWalletActive ? (
                <button
                  id="btn-go-to-wallet-home"
                  onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 group transition-all"
                >
                  <WalletIcon className="w-4 h-4" />
                  <span>Open Wallet Home (₹{currentWallet.balance})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  id="btn-activate-wallet"
                  onClick={() => activateWallet(currentDoctor.id)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 group transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate ₹500 F2 Wallet Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
