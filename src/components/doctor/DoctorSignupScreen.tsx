import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  UserPlus, 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  Wallet, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Award,
  Lock,
  Phone,
  Mail,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_SIGNUP_PRESETS = [
  {
    name: 'Dr. Vikram Malhotra',
    mobile: '9820124491',
    regNumber: 'MCI/2018/77412',
    councilState: 'National Medical Commission (NMC)',
    college: 'Grant Government Medical College, Mumbai',
    hospitalCluster: 'Max Super Speciality Hospital, Saket',
    specialty: 'Cardiology',
    email: 'dr.vikram.m@maxhealthcare.com'
  },
  {
    name: 'Dr. Ananya Iyer',
    mobile: '9845019283',
    regNumber: 'KMC/2016/55219',
    councilState: 'Karnataka Medical Council',
    college: 'Bangalore Medical College and Research Institute',
    hospitalCluster: 'Fortis Hospital, Bannerghatta',
    specialty: 'Neurology',
    email: 'ananya.iyer@fortishealthcare.com'
  },
  {
    name: 'Dr. Rohan Sharma',
    mobile: '9811048291',
    regNumber: 'MMC/2019/44821',
    councilState: 'Maharashtra Medical Council',
    college: 'Seth GS Medical College & KEM Hospital, Mumbai',
    hospitalCluster: 'Lilavati Hospital & Research Centre',
    specialty: 'Orthopedic Surgery',
    email: 'rohan.sharma@lilavatihospital.com'
  },
  {
    name: 'Dr. Priya Nair',
    mobile: '9884012894',
    regNumber: 'DMC/2021/88340',
    councilState: 'Delhi Medical Council',
    college: 'Maulana Azad Medical College, New Delhi',
    hospitalCluster: 'Apollo Hospitals, Indraprastha',
    specialty: 'Oncology',
    email: 'dr.priya.nair@apollohospitals.com'
  }
];

export const DoctorSignupScreen: React.FC = () => {
  const { 
    registerAndVerifyDoctor, 
    activateWallet, 
    setDoctorStep, 
    triggerConfettiAnimation 
  } = useF2();

  const [formData, setFormData] = useState({
    name: 'Dr. Vikram Malhotra',
    mobile: '9820124491',
    regNumber: 'MCI/2018/77412',
    councilState: 'National Medical Commission (NMC)',
    college: 'Grant Government Medical College, Mumbai',
    hospitalCluster: 'Max Super Speciality Hospital, Saket',
    specialty: 'Cardiology',
    email: 'dr.vikram.m@maxhealthcare.com',
    consentAgreed: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successGranted, setSuccessGranted] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const preset = MOCK_SIGNUP_PRESETS[index];
    setFormData({
      ...preset,
      consentAgreed: true
    });
  };

  const handleCustomForm = () => {
    setSelectedPresetIndex(-1);
    setFormData({
      name: '',
      mobile: '',
      regNumber: '',
      councilState: 'National Medical Commission (NMC)',
      college: '',
      hospitalCluster: 'Apollo Hospitals, Indraprastha',
      specialty: 'General Medicine',
      email: '',
      consentAgreed: true
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.regNumber.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Register & verify doctor profile
      const newDoctor = await registerAndVerifyDoctor({
        name: formData.name.startsWith('Dr.') ? formData.name : `Dr. ${formData.name}`,
        mobile: formData.mobile || '9876543210',
        regNumber: formData.regNumber,
        councilState: formData.councilState,
        college: formData.college || 'Government Medical College',
        hospitalCluster: formData.hospitalCluster,
        specialty: formData.specialty,
        email: formData.email,
        consentAgreed: formData.consentAgreed
      });

      // 2. Activate ₹500 wallet
      activateWallet(newDoctor.id);

      // 3. Trigger celebratory confetti
      triggerConfettiAnimation();
      setSuccessGranted(true);

      // 4. Smoothly route directly to Wallet Home (Screen 4) after brief delay
      setTimeout(() => {
        setDoctorStep('SCREEN_4_WALLET_HOME');
      }, 1200);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto px-0.5 sm:px-1 py-1 sm:py-3 space-y-4 max-w-full overflow-hidden">
      
      {/* Header Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
            SIGNUP
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
            Doctor Fast Onboarding
          </span>
        </div>
        <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full shrink-0">
          ₹500 Grant Ready
        </span>
      </div>

      {/* Grant Promo Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-slate-900 text-white p-4 shadow-sm relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1 min-w-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-[10px] font-semibold">
              <Sparkles className="w-3 h-3 text-teal-300" />
              <span>NMC Registry Fast-Track</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Get ₹500 Doctor Benefit Wallet
            </h3>
            <p className="text-[11px] text-teal-100/80 leading-relaxed">
              Sign up with your medical registration to instantly receive ₹500 for canteens & Swiggy/Zomato.
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] font-semibold text-teal-200">GRANT</span>
            <span className="text-sm font-extrabold text-white font-mono">₹500</span>
          </div>
        </div>
      </div>

      {/* 1-Tap Doctor Demo Presets Bar */}
      <div className="rounded-xl bg-white border border-slate-200 p-3 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Select 1-Tap Demo Doctor Profile:</span>
          </label>
          <button
            type="button"
            onClick={handleCustomForm}
            className={`text-[10px] font-semibold transition-colors ${
              selectedPresetIndex === -1 ? 'text-teal-700 underline' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Clear / Custom
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {MOCK_SIGNUP_PRESETS.map((preset, idx) => (
            <button
              key={preset.regNumber}
              type="button"
              onClick={() => handleSelectPreset(idx)}
              className={`p-2 rounded-lg text-left transition-all border ${
                selectedPresetIndex === idx
                  ? 'bg-teal-50/90 border-teal-300 ring-1 ring-teal-400/50 text-teal-900 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold truncate">
                  {preset.name}
                </span>
                {selectedPresetIndex === idx && (
                  <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                )}
              </div>
              <div className="text-[9px] text-slate-500 truncate font-mono">
                {preset.regNumber} • {preset.specialty}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200 p-3.5 sm:p-4 space-y-3.5 shadow-xs">
        
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Stethoscope className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs font-bold text-slate-900">
            Medical Practitioner Information
          </h4>
        </div>

        {/* Doctor Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Full Name (with Dr. prefix) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Dr. Vikram Malhotra"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50/50"
          />
        </div>

        {/* Registration Number & Council */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Medical Reg. Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.regNumber}
            onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
            placeholder="e.g. MCI/2018/77412"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-teal-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Medical Council / State <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.councilState}
            onChange={(e) => setFormData({ ...formData, councilState: e.target.value })}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
          >
            <option value="National Medical Commission (NMC)">NMC (All-India)</option>
            <option value="Maharashtra Medical Council">Maharashtra Medical Council</option>
            <option value="Karnataka Medical Council">Karnataka Medical Council</option>
            <option value="Delhi Medical Council">Delhi Medical Council</option>
            <option value="Tamil Nadu Medical Council">Tamil Nadu Medical Council</option>
          </select>
        </div>

        {/* Specialty & Hospital Cluster */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Specialty
          </label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            placeholder="e.g. Cardiology, Neurology"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Hospital Cluster
          </label>
          <select
            value={formData.hospitalCluster}
            onChange={(e) => setFormData({ ...formData, hospitalCluster: e.target.value })}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
          >
            <option value="Max Super Speciality Hospital, Saket">Max Super Speciality, Saket</option>
            <option value="Fortis Hospital, Bannerghatta">Fortis Hospital, Bannerghatta</option>
            <option value="Lilavati Hospital & Research Centre">Lilavati Hospital, Mumbai</option>
            <option value="Apollo Hospitals, Indraprastha">Apollo Hospitals, Delhi</option>
            <option value="AIIMS New Delhi Cluster">AIIMS New Delhi Cluster</option>
          </select>
        </div>

        {/* Mobile & Email */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Mobile Number (OTP Verified)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-xs font-mono text-slate-400">+91</span>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              placeholder="9820124491"
              className="w-full pl-11 pr-3 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Work Email (Optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="doctor@hospital.com"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.consentAgreed}
              onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
              className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
            />
            <span className="text-[10px] text-slate-600 leading-snug">
              I authorize F2 Fintech to perform real-time NMC & State Medical Council lookup for ₹500 corporate benefit wallet issuance under Section 17(2) IT Act.
            </span>
          </label>
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting || successGranted || !formData.consentAgreed}
          className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
            successGranted
              ? 'bg-emerald-600 text-white'
              : isSubmitting
              ? 'bg-teal-700 text-white opacity-80 cursor-wait'
              : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-700/20'
          }`}
        >
          {successGranted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-200 animate-bounce" />
              <span>₹500 Credited! Opening Wallet...</span>
            </>
          ) : isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying NMC Registry & Creating Card...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Instant Verify & Credit ₹500 to Wallet</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Compliance & Security Guarantee Pill */}
      <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 flex items-center justify-between text-[10px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>NMC & RBI Compliant • 100% Tax Free Meal Benefit</span>
        </div>
        <span className="font-bold text-teal-700">₹0 Joining Fee</span>
      </div>

    </div>
  );
};
