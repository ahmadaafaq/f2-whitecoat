import React from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  X, 
  Award, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  Building2, 
  Calendar, 
  CheckCircle2,
  Copy
} from 'lucide-react';

interface DoctorIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorIDCardModal: React.FC<DoctorIDCardModalProps> = ({ isOpen, onClose }) => {
  const { currentDoctor, currentWallet } = useF2();

  if (!isOpen || !currentDoctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-4 sm:p-6 space-y-5 shadow-2xl relative overflow-hidden my-auto max-h-[95vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Digital Membership Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital White Coat Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-4 sm:p-6 border border-slate-700 shadow-lg space-y-4 sm:space-y-5 text-white relative">
          
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black font-serif-title tracking-wider text-teal-300">F2 FINTECH</span>
                <span className="px-2 py-0.2 rounded-full bg-teal-500/20 text-teal-300 text-[9px] font-bold border border-teal-500/30">
                  TIER 1
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">WHITE COAT CLUB</h3>
            </div>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold">
              ⚕️
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-base sm:text-lg font-extrabold text-white">{currentDoctor.name}</div>
            <div className="text-xs text-teal-400 font-medium">{currentDoctor.qualification} • {currentDoctor.specialty}</div>
            <div className="text-[11px] text-slate-300 truncate">{currentDoctor.hospitalCluster}</div>
          </div>

          <div className="pt-3 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">COUNCIL REG NO</span>
              <span className="font-bold text-teal-300">{currentDoctor.regNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">CURRENT WALLET</span>
              <span className="font-bold text-amber-400">₹{currentWallet?.balance ?? 500}.00</span>
            </div>
          </div>

          {/* Mini QR Code */}
          <div className="p-3 rounded-xl bg-white text-slate-950 flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-slate-900">Hospital Canteen QR Token</div>
              <div className="text-[9px] text-slate-500 font-mono truncate max-w-[180px]">
                CODE: {currentWallet?.activeDynamicCoupon?.code || 'F2-WCC-8941'}
              </div>
            </div>
            <QrCode className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 shrink-0" />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" /> NMC & State Verified
            </span>
            <span>Exp: {currentWallet?.expiresAt || '31 Dec 2026'}</span>
          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
        >
          Close Member Pass
        </button>

      </div>
    </div>
  );
};
