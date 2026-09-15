import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Building, 
  Lock, 
  FileCheck,
  Stethoscope,
  Info
} from 'lucide-react';
import { MEDICAL_COUNCILS, HOSPITAL_CLUSTERS, OFFICIAL_REGISTRY_DATABASE } from '../../data/mockData';

export const VerificationScreen: React.FC = () => {
  const { 
    registerAndVerifyDoctor, 
    setDoctorStep, 
    isVerifyingRegistry 
  } = useF2();

  const [formData, setFormData] = useState({
    name: 'Dr. Siddharth Varma',
    mobile: '+91 98112 44921',
    regNumber: 'DMC-74892',
    councilState: 'Delhi Medical Council',
    college: 'AIIMS New Delhi',
    hospitalCluster: 'AIIMS New Delhi — Main Campus & Trauma Centre',
    specialty: 'Internal Medicine & Critical Care',
    email: 'siddharth.varma.md@aiims.edu',
    consentAgreed: true,
    dataRetentionAgreed: true
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedPreset, setSelectedPreset] = useState<string>('DMC-74892');

  const handlePresetSelect = (regNo: string) => {
    setSelectedPreset(regNo);
    const entry = OFFICIAL_REGISTRY_DATABASE.find((e) => e.regNumber === regNo);
    if (entry) {
      setFormData({
        name: entry.fullName,
        mobile: '+91 98' + Math.floor(10000000 + Math.random() * 90000000).toString().slice(0, 8),
        regNumber: entry.regNumber,
        councilState: entry.councilState,
        college: entry.college,
        hospitalCluster: HOSPITAL_CLUSTERS[0],
        specialty: entry.qualification,
        email: `${entry.fullName.toLowerCase().replace(/[^a-z]/g, '')}@hospital.org`,
        consentAgreed: true,
        dataRetentionAgreed: true
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Doctor name is required';
    if (!formData.mobile.trim()) errors.mobile = 'Mobile number is required';
    if (!formData.regNumber.trim()) errors.regNumber = 'Medical registration number is required';
    if (!formData.councilState) errors.councilState = 'Please select your registration council';
    if (!formData.consentAgreed) errors.consentAgreed = 'Doctor consent is required under F2 Phase 1 guidelines';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await registerAndVerifyDoctor({
      name: formData.name,
      mobile: formData.mobile,
      regNumber: formData.regNumber,
      councilState: formData.councilState,
      college: formData.college,
      hospitalCluster: formData.hospitalCluster,
      specialty: formData.specialty,
      email: formData.email,
      consentAgreed: formData.consentAgreed
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDoctorStep('SCREEN_1_WELCOME')}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 2
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Doctor Profile Verification
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Registry API Lookup</span>
      </div>

      {/* Preset Auto-Fill Bar for Fast Demo Testing */}
      <div className="mb-6 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Select Demo Registered Doctor for instant verification:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {OFFICIAL_REGISTRY_DATABASE.slice(0, 4).map((entry) => (
              <button
                key={entry.regNumber}
                type="button"
                onClick={() => handlePresetSelect(entry.regNumber)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-code transition-all ${
                  formData.regNumber === entry.regNumber
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {entry.regNumber} ({entry.fullName.split(' ')[1]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Verification Card */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Card Header */}
        <div className="px-6 py-5 bg-slate-50/80 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Enter Your Medical Registration Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                We verify against official National Medical Commission & State Medical Council databases.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Doctor Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name (As registered in Council) <span className="text-teal-600">*</span>
              </label>
              <input
                id="input-doctor-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Siddharth Varma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-sm font-medium outline-none transition-all placeholder:text-slate-400"
              />
              {formErrors.name && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.name}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number <span className="text-teal-600">*</span>
              </label>
              <input
                id="input-doctor-mobile"
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="+91 98112 44921"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-sm font-code outline-none transition-all placeholder:text-slate-400"
              />
              {formErrors.mobile && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.mobile}
                </p>
              )}
            </div>

            {/* Medical Registration Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Medical Registration Number <span className="text-teal-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="input-doctor-regno"
                  type="text"
                  value={formData.regNumber}
                  onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                  placeholder="e.g. DMC-74892"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-teal-800 text-sm font-code font-bold uppercase outline-none transition-all placeholder:text-slate-400"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 uppercase font-bold">
                  NMC / State
                </span>
              </div>
              {formErrors.regNumber && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.regNumber}
                </p>
              )}
            </div>

            {/* Registration Council / State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Registration Council / State <span className="text-teal-600">*</span>
              </label>
              <select
                id="select-doctor-council"
                value={formData.councilState}
                onChange={(e) => setFormData({ ...formData, councilState: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-sm font-medium outline-none transition-all"
              >
                {MEDICAL_COUNCILS.map((council) => (
                  <option key={council} value={council}>
                    {council}
                  </option>
                ))}
              </select>
            </div>

            {/* Medical College / Alma Mater */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Medical College / Qualification
              </label>
              <input
                id="input-doctor-college"
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. AIIMS New Delhi / MBBS, MD"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-sm font-medium outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Current Hospital / Workspace Cluster */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Current Hospital Workspace Cluster
              </label>
              <select
                id="select-doctor-hospital-cluster"
                value={formData.hospitalCluster}
                onChange={(e) => setFormData({ ...formData, hospitalCluster: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-slate-900 text-sm font-medium outline-none transition-all"
              >
                {HOSPITAL_CLUSTERS.map((hosp) => (
                  <option key={hosp} value={hosp}>
                    {hosp}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Verification Engine Governance Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">Controlled Verification Protocol: </span>
                F2 verifies credentials using live authoritative registry lookup. In accordance with medical ethics and anti-bribery regulations, the ₹500 benefit is strictly a welcome engagement balance for workspace canteen meals.
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAgreed}
                  onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                  className="mt-0.5 rounded bg-white border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>
                  I declare that I am a registered medical practitioner and consent to F2 validating my registration with medical council records.
                </span>
              </label>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              id="btn-submit-verification"
              type="submit"
              disabled={isVerifyingRegistry}
              className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {isVerifyingRegistry ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to NMC / Medical Council Registry...</span>
                </>
              ) : (
                <>
                  <span>Verify Identity & Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
