import React, { useState } from 'react';
import { useF2 } from '../context/F2Context';
import { 
  ShieldCheck, 
  Wallet as WalletIcon, 
  Sparkles, 
  Building2, 
  Users, 
  Layers, 
  FileText, 
  ChevronDown, 
  RefreshCw,
  QrCode,
  CheckCircle2,
  Stethoscope,
  Store,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ActiveAppView, DoctorScreenStep } from '../types';

interface HeaderProps {
  onOpenDocCard: () => void;
  onOpenStrategy: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDocCard, onOpenStrategy }) => {
  const { 
    activeView, 
    setActiveView, 
    doctorStep, 
    setDoctorStep, 
    currentDoctor, 
    currentWallet, 
    doctors, 
    selectDoctor, 
    resetToDefaultData 
  } = useF2();

  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

  const views: { id: ActiveAppView; shortLabel: string; fullLabel: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'DOCTOR_JOURNEY', shortLabel: 'Doctor App', fullLabel: 'Doctor App (7 Screens)', icon: Stethoscope, badge: 'Phase 1 & 2' },
    { id: 'MERCHANT_POS', shortLabel: 'Merchant POS', fullLabel: 'Merchant POS Terminal', icon: Store, badge: 'Hospital Outlets' },
    { id: 'ADMIN_CONSOLE', shortLabel: 'Admin & Ops', fullLabel: 'Admin & Ops Console', icon: Layers, badge: 'Verification & Ledger' },
    { id: 'PHASE2_CRM', shortLabel: 'Phase 2 CRM', fullLabel: 'Phase 2 Advisory CRM', icon: Users, badge: 'Wealth & Partners' },
  ];

  const doctorSteps: { step: DoctorScreenStep; label: string; num: number }[] = [
    { step: 'SCREEN_1_WELCOME', label: '1. Welcome', num: 1 },
    { step: 'SCREEN_2_VERIFICATION', label: '2. Verify Profile', num: 2 },
    { step: 'SCREEN_3_RESULT', label: '3. Status & Grant', num: 3 },
    { step: 'SCREEN_4_WALLET_HOME', label: '4. Wallet Home', num: 4 },
    { step: 'SCREEN_5_PAYMENT', label: '5. Pay / Redeem', num: 5 },
    { step: 'SCREEN_6_HISTORY', label: '6. Ledger History', num: 6 },
    { step: 'SCREEN_7_PHASE2_CTA', label: '7. Phase 2 Growth', num: 7 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      {/* Top Main Nav Bar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div 
              onClick={() => {
                setActiveView('DOCTOR_JOURNEY');
                setDoctorStep('SCREEN_4_WALLET_HOME');
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
              id="header-brand-logo"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <span className="font-serif-title text-lg sm:text-xl tracking-tight">F2</span>
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                    WHITE COAT CLUB
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Phase 1 MVP
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 hidden xl:inline">
                  By F2 Fintech • High-Frequency Doctor Engagement
                </span>
              </div>
            </div>
          </div>

          {/* Platform Persona Mode Switcher (Desktop) */}
          <nav className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            {views.map((v) => {
              const Icon = v.icon;
              const isActive = activeView === v.id;
              return (
                <button
                  key={v.id}
                  id={`nav-tab-${v.id.toLowerCase()}`}
                  onClick={() => setActiveView(v.id)}
                  className={`flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-teal-800 shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span className="hidden xl:inline">{v.fullLabel}</span>
                  <span className="xl:hidden">{v.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Strategy Doc Button */}
            <button
              id="btn-open-strategy-doc"
              onClick={onOpenStrategy}
              className="flex items-center gap-1.5 text-xs px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs shrink-0"
              title="View Internal Product Strategy Document"
            >
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline font-medium">Strategy PRD</span>
            </button>

            {/* Doctor Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                id="btn-doctor-persona-dropdown"
                onClick={() => setShowDoctorDropdown(!showDoctorDropdown)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-teal-500/50 text-xs text-left transition-all shadow-xs shrink-0"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {currentDoctor?.name?.split(' ')?.[1]?.[0] || 'D'}
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-semibold text-slate-800 text-xs leading-none truncate max-w-[100px] xl:max-w-[120px]">
                    {currentDoctor?.name || 'Select Doctor'}
                  </span>
                  <span className="text-[10px] text-teal-700 leading-none mt-0.5 font-code">
                    {currentDoctor?.regNumber || 'No Reg'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {showDoctorDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs"
                  onClick={() => setShowDoctorDropdown(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 flex items-center justify-between">
                    <span>SWITCH DOCTOR PROFILE</span>
                    <span className="text-[10px] text-teal-600 font-bold">Demo Profiles</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {doctors.map((doc) => {
                      const wal = currentWallet && doc.id === currentDoctor?.id ? currentWallet : null;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => selectDoctor(doc.id)}
                          className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                            doc.id === currentDoctor?.id ? 'bg-teal-50 text-teal-900 border-l-2 border-teal-600' : 'text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                              <span>{doc.name}</span>
                              {doc.verificationStatus === 'verified' && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {doc.regNumber} • {doc.specialty || doc.councilState}
                            </div>
                          </div>
                          <span className="font-code text-[11px] font-bold text-amber-700">
                            {wal ? `₹${wal.balance}` : doc.verificationStatus === 'verified' ? '₹500' : 'Unverified'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveView('DOCTOR_JOURNEY');
                        setDoctorStep('SCREEN_2_VERIFICATION');
                      }}
                      className="text-[11px] font-medium text-teal-700 hover:text-teal-800 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>+ Verify New Doctor Profile</span>
                    </button>
                    <button
                      onClick={resetToDefaultData}
                      title="Reset all demo wallets & state"
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wallet Balance Pill */}
            {currentWallet && currentDoctor?.verificationStatus === 'verified' && (
              <div 
                onClick={() => {
                  setActiveView('DOCTOR_JOURNEY');
                  setDoctorStep('SCREEN_4_WALLET_HOME');
                }}
                className="cursor-pointer flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 hover:border-teal-300 text-xs font-bold text-teal-900 shadow-xs group transition-all shrink-0"
                title="Click to open Wallet Home"
              >
                <WalletIcon className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-code text-teal-950 text-xs sm:text-sm tracking-tight font-extrabold">₹{currentWallet.balance}</span>
                <span className="text-[9px] uppercase tracking-wider text-teal-700 hidden 2xl:inline">Available</span>
              </div>
            )}

            {/* Doctor ID Card Trigger */}
            {currentDoctor?.verificationStatus === 'verified' && (
              <button
                id="btn-show-doctor-card"
                onClick={onOpenDocCard}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-teal-700 border border-slate-200 transition-colors shadow-xs shrink-0"
                title="View White Coat Club Digital Card & QR"
              >
                <QrCode className="w-4 h-4" />
              </button>
            )}

          </div>
        </div>

        {/* Mobile / Tablet View Switcher (< lg) */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 border-t border-slate-200 gap-1.5 scrollbar-none text-xs -mx-3 px-3 sm:-mx-4 sm:px-4">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = activeView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-colors shrink-0 ${
                  isActive
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{v.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Header: Screen Journey Breadcrumb (Visible in Doctor Journey View) */}
      {activeView === 'DOCTOR_JOURNEY' && (
        <div className="bg-slate-50 border-t border-slate-200 py-1.5 px-3 sm:px-4 lg:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto gap-2 scrollbar-none">
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1 shrink-0">
                <Compass className="w-3 h-3 text-teal-600" />
                <span className="hidden md:inline">Doctor Flow:</span>
              </span>
              
              <div className="flex items-center gap-1 shrink-0">
                {doctorSteps.map((s, idx) => {
                  const isCurrent = doctorStep === s.step;
                  return (
                    <React.Fragment key={s.step}>
                      <button
                        onClick={() => setDoctorStep(s.step)}
                        id={`step-nav-${s.num}`}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-all shrink-0 ${
                          isCurrent
                            ? 'bg-teal-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        {s.label}
                      </button>
                      {idx < doctorSteps.length - 1 && (
                        <span className="text-slate-300 text-[10px] shrink-0">›</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-600 shrink-0">
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NMC / State Verified</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">
                ₹500 Workspace Grant
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
