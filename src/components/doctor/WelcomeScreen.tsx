import React from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  ShieldCheck, 
  Sparkles, 
  Coffee, 
  Utensils, 
  Building, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Lock, 
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export const WelcomeScreen: React.FC = () => {
  const { setDoctorStep, doctors, selectDoctor } = useF2();

  return (
    <div className="w-full mx-auto px-0.5 py-1 space-y-4 max-w-full overflow-hidden">
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
            SCREEN 1
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
            Welcome & Workspace Invitation
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono shrink-0">Phase 1</span>
      </div>

      {/* Main Single Column Mobile Layout */}
      <div className="space-y-4">
        
        {/* Hero Invitation Header */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Exclusive for Registered Medical Practitioners</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Welcome to the <br />
              <span className="text-teal-700 font-serif-title">
                White Coat Club
              </span>
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              F2 Fintech enters your hospital workspace with genuine, everyday benefits. Verify your medical council registration in 30 seconds and receive a pre-funded <strong className="text-amber-900 font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">₹500 workspace benefit wallet</strong> for hospital canteens, cafes, and food merchants.
            </p>
          </div>
        </div>

        {/* Visual Card Mockup (Privilege Pass) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-3.5"
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-800 font-bold font-serif-title text-sm shrink-0">
                F2
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 truncate">White Coat Club</div>
                <div className="text-[10px] text-teal-700 font-medium">Doctor Privilege Pass</div>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Award className="w-3 h-3 text-amber-600" />
              <span>Phase 1 Benefit</span>
            </div>
          </div>

          {/* Balance Showcase */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
            <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              Initial Workspace Grant Balance
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-extrabold text-slate-900 font-code tracking-tight">₹500.00</span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 shrink-0">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Ready on Verification
              </span>
            </div>
          </div>

          {/* Where You Can Spend */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Accepted At Participating Outlets:
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                  <Utensils className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">Hospital Canteens & Food Courts</span>
                </div>
                <span className="text-[9px] text-emerald-700 font-semibold font-code bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">100% Covered</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                  <Coffee className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Doctors' Lounge & Espresso Outlets</span>
                </div>
                <span className="text-[9px] text-emerald-700 font-semibold font-code bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">Instant Scan</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                  <Building className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span className="truncate">Hospital Subways & Snack Hubs</span>
                </div>
                <span className="text-[9px] text-emerald-700 font-semibold font-code bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">Zero OTP</span>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
            <span>Fast 1-Scan F2 QR / Voucher</span>
            <span className="text-teal-700 font-semibold">100% Funded by F2</span>
          </div>
        </motion.div>

        {/* Value Pillars (2 Compact Cards) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-1.5">
              <Coffee className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-tight">₹500 Grant</h4>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
              Zero fees. Usable instantly across all hospital food outlets.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-tight">NMC Verified</h4>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
              Authoritative registry lookup with NMC & Medical Councils.
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-1 flex flex-col gap-2">
          <button
            id="btn-quick-signup"
            onClick={() => setDoctorStep('SCREEN_0_SIGNUP')}
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 group transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
            <span>Instant Mock Doctor Sign Up (Get ₹500)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          <button
            id="btn-start-verification"
            onClick={() => setDoctorStep('SCREEN_2_VERIFICATION')}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Verify Existing NMC Registry Record</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pb-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-teal-600" />
            Takes ~30 seconds
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            Authoritative Registry API
          </span>
        </div>

      </div>
    </div>
  );
};
