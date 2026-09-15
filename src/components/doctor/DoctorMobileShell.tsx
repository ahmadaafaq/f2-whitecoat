import React, { useState, useEffect } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  Bell, 
  QrCode, 
  Wallet, 
  Receipt, 
  Utensils, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Wifi, 
  Battery, 
  Home, 
  CreditCard,
  User,
  ArrowRight,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoctorScreenStep } from '../../types';

interface DoctorMobileShellProps {
  children: React.ReactNode;
  onOpenDocCard: () => void;
  onOpenStrategy: () => void;
}

export const DoctorMobileShell: React.FC<DoctorMobileShellProps> = ({ 
  children,
  onOpenDocCard,
  onOpenStrategy
}) => {
  const { 
    doctorStep, 
    setDoctorStep, 
    currentDoctor, 
    currentWallet, 
    setIsFoodOrderingOpen,
    doctors,
    selectDoctor
  } = useF2();

  // Mode: 'PHONE_FRAME' (realistic bezel device) or 'EXPANDED' (standard responsive container)
  const [deviceMode, setDeviceMode] = useState<'PHONE_FRAME' | 'EXPANDED'>('PHONE_FRAME');
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const balance = currentWallet?.balance ?? 500;
  const isVerified = currentDoctor?.verificationStatus === 'verified';

  // Navigation steps config
  const quickScreens: { step: DoctorScreenStep; label: string; num: string }[] = [
    { step: 'SCREEN_0_SIGNUP', label: '0. Signup (₹500)', num: '0' },
    { step: 'SCREEN_1_WELCOME', label: '1. Welcome', num: '1' },
    { step: 'SCREEN_2_VERIFICATION', label: '2. Registry KYC', num: '2' },
    { step: 'SCREEN_3_RESULT', label: '3. Approval', num: '3' },
    { step: 'SCREEN_4_WALLET_HOME', label: '4. Mobile Wallet', num: '4' },
    { step: 'SCREEN_FOOD_ORDERING', label: 'Food Order', num: 'F' },
    { step: 'SCREEN_5_PAYMENT', label: '5. Scan & Pay', num: '5' },
    { step: 'SCREEN_6_HISTORY', label: '6. Ledger', num: '6' },
    { step: 'SCREEN_7_PHASE2_CTA', label: '7. Privileges', num: '7' },
  ];

  // Map active bottom navigation tab
  const getActiveNavTab = () => {
    if (
      doctorStep === 'SCREEN_4_WALLET_HOME' || 
      doctorStep === 'SCREEN_1_WELCOME' || 
      doctorStep === 'SCREEN_0_SIGNUP' ||
      doctorStep === 'SCREEN_2_VERIFICATION' || 
      doctorStep === 'SCREEN_3_RESULT'
    ) {
      return 'HOME';
    }
    if (doctorStep === 'SCREEN_FOOD_ORDERING') return 'FOOD';
    if (doctorStep === 'SCREEN_5_PAYMENT') return 'PAY';
    if (doctorStep === 'SCREEN_6_HISTORY') return 'LEDGER';
    if (doctorStep === 'SCREEN_7_PHASE2_CTA') return 'PRIVILEGES';
    return 'HOME';
  };

  const activeNav = getActiveNavTab();

  return (
    <div className="w-full flex flex-col items-center py-2 sm:py-4 px-1 sm:px-4 max-w-full overflow-x-hidden">
      
      {/* Top Mobile App Switcher & Quick Controls Bar */}
      <div className="w-full max-w-4xl mb-3 bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        
        {/* Left: Device & Persona Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                F2 Doctor Mobile App
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-100 text-teal-800 border border-teal-200 shrink-0">
                Native App UI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              Simulated smartphone wallet, instant ₹500 grant & canteen QR pay
            </p>
          </div>
        </div>

        {/* Right: View Mode & Doctor Quick Actions */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0 flex-wrap">
          {/* Quick Doctor ID Card launcher */}
          <button
            onClick={onOpenDocCard}
            className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="View Physical & Badge ID"
          >
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-[11px]">Doctor Pass</span>
          </button>

          {/* Quick Signup CTA */}
          <button
            onClick={() => setDoctorStep('SCREEN_0_SIGNUP')}
            className="px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
            title="Fast Mock Signup to get ₹500"
          >
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[11px]">Get ₹500</span>
          </button>

          {/* Device Frame View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setDeviceMode('PHONE_FRAME')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all text-[11px] ${
                deviceMode === 'PHONE_FRAME'
                  ? 'bg-white text-teal-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Phone</span>
            </button>

            <button
              onClick={() => setDeviceMode('EXPANDED')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all text-[11px] ${
                deviceMode === 'EXPANDED'
                  ? 'bg-white text-teal-800 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>Full</span>
            </button>
          </div>
        </div>
      </div>

      {/* Screen Journey Rapid Selector Bar */}
      <div className="w-full max-w-4xl mb-4 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1 shrink-0">
          Jump:
        </span>
        {quickScreens.map((s) => (
          <button
            key={s.step}
            onClick={() => setDoctorStep(s.step)}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium text-[11px] transition-all shrink-0 ${
              doctorStep === s.step
                ? 'bg-teal-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main Container: Mobile Frame vs Expanded Responsive */}
      {deviceMode === 'PHONE_FRAME' ? (
        <div className="relative flex justify-center w-full max-w-full px-0 sm:px-2">
          
          {/* Realistic Smartphone Shell Frame - Responsive for Mobile Screen Sizes */}
          <div className="relative w-full max-w-full sm:max-w-[420px] rounded-2xl sm:rounded-[44px] bg-white sm:bg-slate-900 p-0 sm:p-3 shadow-none sm:shadow-2xl sm:ring-1 sm:ring-slate-800/60 sm:ring-offset-4 sm:ring-offset-slate-100 overflow-hidden">
            
            {/* Phone Outer Hardware Edge Buttons Visuals (Desktop only) */}
            <div className="hidden sm:block absolute -left-1 top-24 w-1 h-10 bg-slate-700 rounded-l-md opacity-70" />
            <div className="hidden sm:block absolute -left-1 top-38 w-1 h-12 bg-slate-700 rounded-l-md opacity-70" />
            <div className="hidden sm:block absolute -left-1 top-52 w-1 h-12 bg-slate-700 rounded-l-md opacity-70" />
            <div className="hidden sm:block absolute -right-1 top-32 w-1 h-16 bg-slate-700 rounded-r-md opacity-70" />

            {/* Phone Screen Container */}
            <div className="relative w-full rounded-2xl sm:rounded-[36px] bg-slate-50 overflow-hidden flex flex-col h-[760px] sm:h-[780px] max-h-[85vh] border border-slate-200 sm:border-slate-800 shadow-inner">
              
              {/* Native Mobile Status Bar */}
              <div className="bg-slate-900 text-white px-4 sm:px-6 pt-2.5 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-tight z-30 shrink-0 select-none">
                {/* Time */}
                <span className="font-mono font-bold tracking-normal">{currentTime}</span>

                {/* iPhone Dynamic Island Cutout */}
                <div className="w-20 sm:w-24 h-4.5 sm:h-5 bg-black rounded-full flex items-center justify-between px-2 shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-[8px] text-teal-400 font-mono font-bold">F2 WCC</span>
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                </div>

                {/* System Icons: 5G, Wifi, Battery */}
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[9px] font-bold font-mono">5G</span>
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Native Mobile App Navigation Bar */}
              <div className="bg-white border-b border-slate-200 px-3 sm:px-4 py-2 flex items-center justify-between z-20 shrink-0 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  {doctorStep !== 'SCREEN_4_WALLET_HOME' && doctorStep !== 'SCREEN_1_WELCOME' ? (
                    <button
                      onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
                      className="p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
                      title="Back to Home"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold font-serif-title text-[11px] shadow-xs shrink-0">
                      F2
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-xs font-extrabold text-slate-900 tracking-tight truncate">
                        {currentDoctor?.name || 'Dr. Doctor'}
                      </span>
                      {isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium truncate">
                      {currentDoctor?.hospitalCluster.split('—')[0] || 'Hospital Cluster'}
                    </div>
                  </div>
                </div>

                {/* Right quick actions in app header */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold font-mono">
                    ₹{balance}
                  </div>

                  <button
                    onClick={() => setDoctorStep('SCREEN_5_PAYMENT')}
                    className="p-1 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                    title="Scan Canteen QR"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Mobile App Screen Viewport */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 sm:px-3 pt-3 pb-8 space-y-3.5 scrollbar-none overscroll-contain">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={doctorStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16 }}
                    className="w-full max-w-full pb-4"
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Native Mobile Bottom Navigation Bar */}
              <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pt-1.5 pb-4 flex items-center justify-around z-20 shrink-0 shadow-lg">
                
                {/* 1. Home / Card Tab */}
                <button
                  id="mobile-nav-home"
                  onClick={() => setDoctorStep(isVerified ? 'SCREEN_4_WALLET_HOME' : 'SCREEN_0_SIGNUP')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeNav === 'HOME'
                      ? 'text-teal-700 font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Home className="w-4.5 h-4.5" />
                  <span className="text-[9px]">Wallet</span>
                </button>

                {/* 2. Food Order Tab (Direct Screen Launch) */}
                <button
                  id="mobile-nav-food"
                  onClick={() => setDoctorStep('SCREEN_FOOD_ORDERING')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeNav === 'FOOD'
                      ? 'text-teal-700 font-bold'
                      : 'text-slate-400 hover:text-teal-700'
                  }`}
                >
                  <div className="relative">
                    <Utensils className="w-4.5 h-4.5" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-[9px]">Food</span>
                </button>

                {/* 3. Center Highlight: Scan & Pay Floating Button */}
                <button
                  id="mobile-nav-pay"
                  onClick={() => setDoctorStep('SCREEN_5_PAYMENT')}
                  className="flex flex-col items-center -mt-4"
                >
                  <div className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform active:scale-95">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-bold text-teal-800 mt-0.5">Scan & Pay</span>
                </button>

                {/* 4. Ledger History Tab */}
                <button
                  id="mobile-nav-ledger"
                  onClick={() => setDoctorStep('SCREEN_6_HISTORY')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeNav === 'LEDGER'
                      ? 'text-teal-700 font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Receipt className="w-4.5 h-4.5" />
                  <span className="text-[9px]">Ledger</span>
                </button>

                {/* 5. Phase 2 Privileges Tab */}
                <button
                  id="mobile-nav-privileges"
                  onClick={() => setDoctorStep('SCREEN_7_PHASE2_CTA')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeNav === 'PRIVILEGES'
                      ? 'text-amber-700 font-bold'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Award className="w-4.5 h-4.5 text-amber-600" />
                  <span className="text-[9px]">Privileges</span>
                </button>

              </div>

              {/* iOS Home Indicator Bar */}
              <div className="bg-white pb-1 flex justify-center z-20 shrink-0">
                <div className="w-28 h-1 bg-slate-300 rounded-full" />
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* Full Screen Responsive Layout (Maintains standard width) */
        <div className="w-full max-w-4xl space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                F2 Doctor Web & Tablet View
              </span>
            </div>
            <button
              onClick={() => setDeviceMode('PHONE_FRAME')}
              className="px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Switch to Phone View</span>
            </button>
          </div>
          {children}
        </div>
      )}

    </div>
  );
};

