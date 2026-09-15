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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Wireframe Marker */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDoctorStep('SCREEN_4_WALLET_HOME')}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            SCREEN 7
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Phase 2 Doctor Relationship & Partner Network
          </span>
        </div>
        <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-600" /> High-Trust Relationship
        </span>
      </div>

      {/* Hero Header */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>F2 Phase 2 Ecosystem • Doctor Professional Growth</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Unlock Your F2 Professional Benefits
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Now that you have experienced F2 daily in your hospital workspace, we invite you to access bespoke professional financial interactions, clinic growth capital, and accredited doctor partnership benefits.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto text-xs border-t border-slate-200">
          <button
            id="tab-book-consultation"
            onClick={() => setActiveTab('CONSULTATION')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'CONSULTATION'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>1-on-1 Advisory Interaction</span>
          </button>

          <button
            id="tab-partner-network"
            onClick={() => setActiveTab('PARTNER_NETWORK')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'PARTNER_NETWORK'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Doctor Partner & Referral Network</span>
          </button>

          <button
            id="tab-goals-planner"
            onClick={() => setActiveTab('GOALS_PLANNER')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'GOALS_PLANNER'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Practice Expansion Estimator</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Book 1-on-1 Consultation */}
      {activeTab === 'CONSULTATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-5">
              
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Schedule Subsidized Advisory Meeting</h3>
                  <p className="text-xs text-slate-500">Positioned around your goals — zero aggressive loan pitches.</p>
                </div>
              </div>

              {bookingSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Meeting Confirmed with F2 Wealth Advisor</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Booking Ref: {bookingSuccess.id}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs space-y-1.5 font-mono">
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
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors shadow-xs"
                  >
                    Schedule Another Session
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                  
                  {/* Topic Selector */}
                  <div className="space-y-2">
                    <label className="font-semibold text-slate-700 uppercase tracking-wider block">
                      Select Primary Interaction Topic
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topics.map((t) => {
                        const Icon = t.icon;
                        const isSelected = bookingForm.topic === t.id;
                        return (
                          <div
                            key={t.id}
                            onClick={() => setBookingForm({ ...bookingForm, topic: t.id })}
                            className={`p-3 rounded-xl cursor-pointer border transition-all ${
                              isSelected
                                ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-xs'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-700' : 'text-slate-500'}`} />
                              <span className="font-bold text-xs">{t.title}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">{t.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Channel Picker */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 uppercase tracking-wider block">
                      Preferred Interaction Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'IN_PERSON_HOSPITAL', label: 'Hospital Lounge', icon: Building2 },
                        { id: 'VIDEO_CALL', label: 'Private Video Call', icon: Video },
                        { id: 'PRIVATE_LOUNGE', label: 'F2 Doctor Lounge', icon: Award }
                      ].map((c) => {
                        const Icon = c.icon;
                        const isSelected = bookingForm.channel === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, channel: c.id as ConsultationChannel })}
                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                              isSelected
                                ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[11px] whitespace-nowrap">{c.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={bookingForm.preferredTime}
                        onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
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
                    <label className="font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                      Professional Goals / Specific Needs
                    </label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="e.g. Planning clinic expansion, looking to acquire sonography machine, optimizing income taxes"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                    />
                  </div>

                  <button
                    id="btn-submit-phase2-booking"
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Confirm Doctor Advisory Interaction</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Doctor Privilege Context */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>The F2 Doctor Financial Charter</span>
              </h4>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs">1. Goal-First Advisory</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    We never pitch unsolicited loans. All discussions begin with your practice milestones and personal tax-wealth architecture.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs">2. Regulatory & Medical Ethics Compliant</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    100% compliant with National Medical Commission ethical codes, anti-bribery regulations, and RBI lender disclosures.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs">3. Institutional Rates for White Coat Members</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Verified doctors gain access to subsidized equipment leasing rates and specialized clinic moratorium terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Partner Network & Referral Tracking */}
      {activeTab === 'PARTNER_NETWORK' && (
        <div className="space-y-6">
          
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">White Coat Doctor Partner Network</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Invite fellow medical practitioners into F2 White Coat Club with transparent referral tracking.
                </p>
              </div>

              {/* Referral Code Share */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-teal-300 font-code font-bold text-teal-800 text-xs shadow-xs">
                  {doctorReferral.referralCode}
                </div>
                <button
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  {copiedReferral ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReferral ? 'Copied Link' : 'Copy Invite Link'}</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Doctors Invited</span>
                <div className="text-2xl font-extrabold text-slate-900 font-code mt-1">{doctorReferral.totalInvited}</div>
                <span className="text-[10px] text-slate-400">Across hospital clusters</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Verified & Active In Canteens</span>
                <div className="text-2xl font-extrabold text-emerald-700 font-code mt-1">{doctorReferral.verifiedDoctors}</div>
                <span className="text-[10px] text-slate-400">75% activation rate</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Accredited Partner Balance</span>
                <div className="text-2xl font-extrabold text-amber-700 font-code mt-1">₹{doctorReferral.totalEarnedCredits}</div>
                <span className="text-[10px] text-slate-400">Compliant professional credit</span>
              </div>
            </div>

            {/* Referred Colleague Ledger */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                Referred Colleague Status
              </span>
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Colleague Name</th>
                      <th className="py-2.5 px-3">Hospital</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {doctorReferral.referredList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{item.name}</td>
                        <td className="py-2.5 px-3 text-slate-600">{item.hospital}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Verified & Spent'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono">{item.joinedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
              <span>
                <strong className="text-slate-800">Regulatory Disclosure:</strong> Commercial partner incentives and credit programs are governed strictly by applicable Indian financial regulations and medical council codes. Credits cannot be redeemed for patient referrals or medical prescriptions.
              </span>
            </div>

          </div>

        </div>
      )}

      {/* Tab 3: Goal Assessment Estimator */}
      {activeTab === 'GOALS_PLANNER' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Interactive Practice & Clinic Growth Estimator</h3>
            <p className="text-xs text-slate-500">Estimate project capital, equipment EMI, and structured wealth timelines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Select Milestone Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'clinic_setup', label: 'New Clinic Setup' },
                    { id: 'equipment', label: 'Diagnostic Equipment' },
                    { id: 'wealth', label: 'Family Corpus' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoalType(g.id as any)}
                      className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                        goalType === g.id
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span>Target Outlay (in ₹ Lakhs)</span>
                  <span className="text-teal-700 font-code font-bold">₹{targetCorpus} Lakhs (₹{targetCorpus * 100000})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={targetCorpus}
                  onChange={(e) => setTargetCorpus(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span>Financing / Goal Horizon (Years)</span>
                  <span className="text-teal-700 font-code font-bold">{timeHorizonYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={timeHorizonYears}
                  onChange={(e) => setTimeHorizonYears(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

            </div>

            {/* Estimation Output Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block">
                F2 Institutional Structure Preview
              </span>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Monthly Cash Flow Need:</span>
                  <span className="text-amber-800 font-bold">
                    ₹{Math.round(((targetCorpus * 100000) / (timeHorizonYears * 12)) * 1.08).toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Subsidized F2 Equipment Rate:</span>
                  <span className="text-emerald-700 font-bold">8.25% p.a. (Tier 1 Verified)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>OPD Gestation Moratorium:</span>
                  <span className="text-slate-900 font-bold">6 Months Principal Grace</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={() => setActiveTab('CONSULTATION')}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Discuss this proposal in 1-on-1 Meeting →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
