import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Award, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  Video, 
  Copy, 
  Share2, 
  Lock,
  ArrowRight,
  FileText,
  BadgePercent
} from 'lucide-react';
import { Phase2Topic, ConsultationChannel, Phase2Booking } from '../../types';
import { motion } from 'motion/react';

export const Phase2Screen: React.FC = () => {
  const { 
    currentDoctor, 
    partnerReferrals, 
    phase2Bookings, 
    bookPhase2Consultation, 
    setDoctorStep 
  } = useF2();

  const [activeTab, setActiveTab] = useState<'CONSULTATION' | 'PARTNER_NETWORK' | 'GOALS_PLANNER'>('CONSULTATION');
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState<{
    preferredDate: string;
    preferredTime: string;
    topic: Phase2Topic;
    channel: ConsultationChannel;
    notes: string;
  }>({
    preferredDate: '2026-09-18',
    preferredTime: '04:30 PM',
    topic: 'doctor_wealth_planning',
    channel: 'IN_PERSON_HOSPITAL',
    notes: 'Looking to structure private OPD practice expansion & tax-efficient wealth management.'
  });

  const [bookingSuccess, setBookingSuccess] = useState<Phase2Booking | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Goal assessment calculator state
  const [goalType, setGoalType] = useState<'clinic_setup' | 'equipment' | 'wealth'>('clinic_setup');
  const [targetCorpus, setTargetCorpus] = useState<number>(50); // in Lakhs
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(3);

  // Doctor's referral data
  const doctorReferral = partnerReferrals.find((r) => r.referrerDoctorId === currentDoctor?.id) || {
    id: 'REF-NEW',
    referrerDoctorId: currentDoctor?.id || 'doc-001',
    referrerName: currentDoctor?.name || 'Dr. Doctor',
    referralCode: `DOC-${currentDoctor?.name?.split(' ')?.[1]?.toUpperCase() || 'F2'}-WCC`,
    totalInvited: 4,
    verifiedDoctors: 3,
    totalEarnedCredits: 1500,
    complianceConsentGiven: true,
    referredList: [
      { name: 'Dr. Neha Gupta (Pediatrician)', hospital: 'AIIMS Main', status: 'Verified & Spent', joinedDate: '2026-09-06' },
      { name: 'Dr. Tarun Saxena (Orthopedic)', hospital: 'Fortis', status: 'Verified & Spent', joinedDate: '2026-09-08' },
      { name: 'Dr. Alok Verma (Pathologist)', hospital: 'Max Hospital', status: 'Verified', joinedDate: '2026-09-09' }
    ]
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = bookPhase2Consultation({
      preferredDate: bookingForm.preferredDate,
      preferredTime: bookingForm.preferredTime,
      topic: bookingForm.topic,
      channel: bookingForm.channel,
      notes: bookingForm.notes
    });
    setBookingSuccess(newBooking);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://f2fintech.club/join?ref=${doctorReferral.referralCode}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const topics: { id: Phase2Topic; title: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
    {
      id: 'doctor_wealth_planning',
      title: 'Doctor Wealth & Practice Advisory',
      desc: 'Holistic wealth planning designed around variable consulting income and multi-hospital retainerships.',
      icon: TrendingUp
    },
    {
      id: 'clinic_expansion_loan',
      title: 'Private Chamber & Clinic Setup',
      desc: 'Tailored infrastructure financing, interior fit-outs, and customized flexible repayment loans.',
      icon: Building2
    },
    {
      id: 'equipment_financing',
      title: 'Advanced Medical Equipment Leasing',
      desc: 'Subsidized leasing & loans for Ultrasound, Endoscopy, Laser & Diagnostic equipment.',
      icon: Briefcase
    },
    {
      id: 'tax_structuring',
      title: 'Medical Professional Tax Structuring',
      desc: 'Section 44ADA presumptive taxation review and legal entity optimization for doctors.',
      icon: FileText
    }
  ];

  return (
    <div className="w-full mx-auto px-0.5 sm:px-1 py-1 sm:py-3 space-y-4">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 7
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
            Phase 2 Privileges
          </span>
        </div>
        <span className="text-[10px] text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
          <Award className="w-3.5 h-3.5 text-amber-600" /> Club Benefits
        </span>
      </div>

      {/* Hero Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] sm:text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>F2 Phase 2 Ecosystem • Doctor Professional Growth</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-base sm:text-xl font-extrabold text-slate-900">
            Unlock Your F2 Professional Benefits
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-600 max-w-2xl leading-relaxed">
            Now that you have experienced F2 daily in your hospital workspace, we invite you to access bespoke professional financial interactions, clinic growth capital, and accredited doctor partnership benefits.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="pt-1.5 flex items-center gap-1.5 overflow-x-auto text-xs border-t border-slate-100 scrollbar-none pb-0.5">
          <button
            id="tab-book-consultation"
            onClick={() => setActiveTab('CONSULTATION')}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'CONSULTATION'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>1-on-1 Advisory</span>
          </button>

          <button
            id="tab-partner-network"
            onClick={() => setActiveTab('PARTNER_NETWORK')}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'PARTNER_NETWORK'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Referral Network</span>
          </button>

          <button
            id="tab-goals-planner"
            onClick={() => setActiveTab('GOALS_PLANNER')}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'GOALS_PLANNER'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Practice Estimator</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Book 1-on-1 Consultation */}
      {activeTab === 'CONSULTATION' && (
        <div className="space-y-4">
          
          {/* Main Booking Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
            
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate">Schedule Subsidized Advisory Meeting</h3>
                <p className="text-[10px] text-slate-500 truncate">Positioned around your goals — zero aggressive pitches.</p>
              </div>
            </div>

            {bookingSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Meeting Confirmed with F2 Wealth Advisor</h4>
                    <p className="text-[10px] text-slate-600 mt-0.5 font-mono">Ref: {bookingSuccess.id}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Slot:</span>
                    <span className="text-slate-900 font-bold">{bookingSuccess.preferredDate} at {bookingSuccess.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Channel:</span>
                    <span className="text-teal-700 font-semibold">{bookingSuccess.channel.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Advisor:</span>
                    <span className="text-slate-800">{bookingSuccess.assignedAdvisor}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingSuccess(null)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
                >
                  Schedule Another Session
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                
                {/* Topic Selector */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Select Primary Interaction Topic
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {topics.map((t) => {
                      const Icon = t.icon;
                      const isSelected = bookingForm.topic === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setBookingForm({ ...bookingForm, topic: t.id })}
                          className={`p-2.5 rounded-xl cursor-pointer border transition-all ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-2xs ring-1 ring-teal-600'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-teal-700' : 'text-slate-500'}`} />
                            <span className="font-bold text-xs">{t.title}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-tight pl-5.5">{t.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Channel Picker */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block">
                    Preferred Interaction Channel
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'IN_PERSON_HOSPITAL', label: 'Lounge', icon: Building2 },
                      { id: 'VIDEO_CALL', label: 'Video Call', icon: Video },
                      { id: 'PRIVATE_LOUNGE', label: 'Doctor Suite', icon: Award }
                    ].map((c) => {
                      const Icon = c.icon;
                      const isSelected = bookingForm.channel === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setBookingForm({ ...bookingForm, channel: c.id as ConsultationChannel })}
                          className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="text-[10px] truncate">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-teal-600 shadow-2xs text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-teal-600 shadow-2xs text-xs"
                    >
                      <option value="08:00 AM">08:00 AM (Pre-Rounds)</option>
                      <option value="01:30 PM">01:30 PM (Lunch Break)</option>
                      <option value="04:30 PM">04:30 PM (Post-OPD)</option>
                      <option value="07:00 PM">07:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                    Professional Goals / Specific Needs
                  </label>
                  <textarea
                    rows={2}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    placeholder="e.g. Planning clinic expansion, acquiring sonography machine, optimizing taxes"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-teal-600 shadow-2xs text-xs resize-none"
                  />
                </div>

                <button
                  id="btn-submit-phase2-booking"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all active:scale-98"
                >
                  <span>Confirm Doctor Advisory Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

          </div>

          {/* Doctor Privilege Charter Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>The F2 Doctor Financial Charter</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">1. Goal-First Advisory</div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  We never pitch unsolicited loans. All discussions begin with your practice milestones and personal tax-wealth architecture.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">2. Regulatory & Medical Ethics Compliant</div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  100% compliant with National Medical Commission ethical codes, anti-bribery regulations, and RBI lender disclosures.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">3. Institutional Rates for White Coat Members</div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                  Verified doctors gain access to subsidized equipment leasing rates and specialized clinic moratorium terms.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Partner Network & Referral Tracking */}
      {activeTab === 'PARTNER_NETWORK' && (
        <div className="space-y-4">
          
          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-4 shadow-2xs">
            <div className="space-y-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">White Coat Doctor Partner Network</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Invite fellow medical practitioners into F2 White Coat Club with transparent referral tracking.
                </p>
              </div>

              {/* Referral Code Share */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-teal-300 font-mono font-bold text-teal-800 text-xs shadow-2xs">
                  {doctorReferral.referralCode}
                </div>
                <button
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                >
                  {copiedReferral ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReferral ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-center">
                <span className="text-[9px] text-slate-500 uppercase font-semibold block truncate">Invited</span>
                <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">{doctorReferral.totalInvited}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-center">
                <span className="text-[9px] text-slate-500 uppercase font-semibold block truncate">Active</span>
                <div className="text-base font-extrabold text-emerald-700 font-mono mt-0.5">{doctorReferral.verifiedDoctors}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs text-center">
                <span className="text-[9px] text-slate-500 uppercase font-semibold block truncate">Credit</span>
                <div className="text-base font-extrabold text-amber-700 font-mono mt-0.5">₹{doctorReferral.totalEarnedCredits}</div>
              </div>
            </div>

            {/* Referred Colleague Cards */}
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider block">
                Referred Colleague Status
              </span>
              <div className="space-y-2">
                {doctorReferral.referredList.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{item.hospital} • {item.joinedDate}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                      item.status === 'Verified & Spent'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Box */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-600 flex items-start gap-1.5 leading-snug">
              <Lock className="w-3 h-3 text-teal-600 mt-0.5 shrink-0" />
              <span>
                <strong className="text-slate-800">Regulatory Disclosure:</strong> Governed strictly by NMC ethical codes & RBI rules. Credits cannot be redeemed for patient referrals or prescriptions.
              </span>
            </div>

          </div>

        </div>
      )}

      {/* Tab 3: Goal Assessment Estimator */}
      {activeTab === 'GOALS_PLANNER' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-4 shadow-2xs">
          <div className="pb-2.5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Practice & Clinic Growth Estimator</h3>
            <p className="text-[10px] text-slate-500">Estimate project capital, equipment EMI, and structured timelines.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-3 text-xs">
              
              <div>
                <label className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                  Select Milestone Goal
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'clinic_setup', label: 'Clinic Setup' },
                    { id: 'equipment', label: 'Equipment' },
                    { id: 'wealth', label: 'Corpus' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoalType(g.id as any)}
                      className={`p-2 rounded-xl border text-center font-bold text-[10px] transition-all ${
                        goalType === g.id
                          ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                  <span>Target Outlay</span>
                  <span className="text-teal-700 font-mono font-bold">₹{targetCorpus} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={targetCorpus}
                  onChange={(e) => setTargetCorpus(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                  <span>Financing Horizon</span>
                  <span className="text-teal-700 font-mono font-bold">{timeHorizonYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={timeHorizonYears}
                  onChange={(e) => setTimeHorizonYears(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

            </div>

            {/* Estimation Output Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block">
                F2 Institutional Structure Preview
              </span>

              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="text-[11px]">Monthly Need:</span>
                  <span className="text-amber-800 font-bold">
                    ₹{Math.round(((targetCorpus * 100000) / (timeHorizonYears * 12)) * 1.08).toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-[11px]">Subsidized Rate:</span>
                  <span className="text-emerald-700 font-bold">8.25% p.a.</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-[11px]">Moratorium:</span>
                  <span className="text-slate-900 font-bold">6 Mo Grace</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => setActiveTab('CONSULTATION')}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-2xs active:scale-98"
                >
                  Discuss in 1-on-1 Meeting →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
