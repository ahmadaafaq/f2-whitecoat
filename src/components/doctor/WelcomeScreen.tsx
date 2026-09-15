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
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 1
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Welcome & Workspace Invitation
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">F2 Fintech — Phase 1</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Hero Invitation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Exclusive for Registered Medical Practitioners</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Welcome to the <br />
              <span className="text-teal-700 font-serif-title">
                White Coat Club
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              F2 Fintech enters your hospital workspace with genuine, everyday benefits. Verify your medical council registration in 30 seconds and receive a pre-funded <strong className="text-amber-900 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">₹500 workspace benefit wallet</strong> for hospital canteens, cafes, and partner food merchants.
            </p>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-2">
                <Coffee className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">₹500 Workspace Grant</h4>
              <p className="text-xs text-slate-500 mt-1">
                Zero fees, zero commitments. Usable immediately across participating hospital food outlets & canteens.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Instant NMC Verification</h4>
              <p className="text-xs text-slate-500 mt-1">
                Authoritative registry lookup with NMC & State Medical Councils. Fast, secure, and doctor-governed.
              </p>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              id="btn-start-verification"
              onClick={() => setDoctorStep('SCREEN_2_VERIFICATION')}
              className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 group transition-all"
            >
              <span>Verify My Doctor Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="btn-explore-wallet-demo"
              onClick={() => {
                selectDoctor(doctors[0].id);
                setDoctorStep('SCREEN_4_WALLET_HOME');
              }}
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Explore Verified Doctor Demo</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              Takes ~30 seconds
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Authoritative Registry API
            </span>
          </div>
        </div>

        {/* Right Column: Visual Card Mockup */}
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Privilege Membership Card */}
            <div className="relative rounded-2xl bg-white border border-slate-200 p-6 shadow-md space-y-6">
              
              {/* Card Top Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-800 font-bold font-serif-title text-base">
                    F2
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-800">White Coat Club</div>
                    <div className="text-[10px] text-teal-700 font-medium">Doctor Privilege Pass</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" />
                  <span>Phase 1 Benefit</span>
                </div>
              </div>

              {/* Balance Showcase */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                  Initial Workspace Grant Balance
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 font-code tracking-tight">₹500.00</span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Ready on Verification
                  </span>
                </div>
              </div>

              {/* Where You Can Spend */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Accepted At Participating Outlets:
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Utensils className="w-3.5 h-3.5 text-teal-600" />
                      <span>Hospital Main Canteens & Food Courts</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold font-code bg-emerald-50 px-1 rounded border border-emerald-200">100% Covered</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Coffee className="w-3.5 h-3.5 text-amber-600" />
                      <span>Doctors' Lounge Cafes & Espresso Outlets</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold font-code bg-emerald-50 px-1 rounded border border-emerald-200">Instant Scan</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Building className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Hospital Wing Subways & Snack Hubs</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold font-code bg-emerald-50 px-1 rounded border border-emerald-200">Zero OTP Friction</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Fast 1-Scan F2 QR / Voucher</span>
                <span className="text-teal-700 font-semibold">100% Funded by F2</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
