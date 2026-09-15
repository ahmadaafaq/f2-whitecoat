import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Store, 
  Receipt, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  RotateCcw, 
  Plus, 
  Filter, 
  BarChart3, 
  Building2, 
  DollarSign,
  Lock,
  ArrowRight,
  Eye,
  Check,
  X
} from 'lucide-react';
import { DoctorProfile, Merchant, Transaction } from '../../types';
import { HOSPITAL_CLUSTERS, MEDICAL_COUNCILS } from '../../data/mockData';

export const AdminConsoleView: React.FC = () => {
  const { 
    campaignMetrics, 
    doctors, 
    transactions, 
    merchants, 
    wallets, 
    adminApproveDoctor, 
    adminRejectDoctor, 
    reverseTransaction,
    addNewMerchant 
  } = useF2();

  const [activeTab, setActiveTab] = useState<'METRICS' | 'VERIFICATION_QUEUE' | 'LEDGER_AUDIT' | 'MERCHANT_MGMT' | 'FRAUD_RULES'>('METRICS');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [reversalModalTxn, setReversalModalTxn] = useState<Transaction | null>(null);
  const [reversalReason, setReversalReason] = useState('Duplicate counter scan at merchant');
  const [showAddMerchantModal, setShowAddMerchantModal] = useState(false);

  // New Merchant Form State
  const [newMerchantForm, setNewMerchantForm] = useState({
    name: '',
    category: 'canteen' as Merchant['category'],
    hospitalCluster: HOSPITAL_CLUSTERS[0],
    locationDetail: '',
    distanceStr: 'Inside Ground Floor',
    rating: 4.8,
    reviewCount: 45,
    acceptsF2Wallet: true,
    dailySpendLimit: 500,
    operatingHours: '07:00 AM – 11:00 PM',
    qrPayload: 'F2-PAY-NEW-OUTLET',
    iconType: 'Utensils'
  });

  // Pending doctors
  const pendingDoctors = doctors.filter((d) => d.verificationStatus === 'pending_manual_review' || d.verificationStatus === 'unverified');

  const handleConfirmReversal = () => {
    if (!reversalModalTxn) return;
    reverseTransaction(reversalModalTxn.id, reversalReason);
    setReversalModalTxn(null);
  };

  const handleCreateMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMerchantForm.name.trim()) return;

    addNewMerchant({
      name: newMerchantForm.name,
      category: newMerchantForm.category,
      hospitalCluster: newMerchantForm.hospitalCluster,
      locationDetail: newMerchantForm.locationDetail || 'Hospital Food Plaza',
      distanceStr: newMerchantForm.distanceStr,
      rating: 4.8,
      reviewCount: 12,
      acceptsF2Wallet: true,
      dailySpendLimit: 500,
      operatingHours: newMerchantForm.operatingHours,
      qrPayload: `F2-PAY-${newMerchantForm.name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8)}-M99`,
      iconType: 'Utensils',
      popularItems: [
        { id: 'item-auto-1', name: 'Standard Meal / Beverage Combo', price: 95, badge: 'Popular' },
        { id: 'item-auto-2', name: 'Quick Doctor Snack', price: 65 }
      ]
    });

    setShowAddMerchantModal(false);
    setNewMerchantForm({
      name: '',
      category: 'canteen',
      hospitalCluster: HOSPITAL_CLUSTERS[0],
      locationDetail: '',
      distanceStr: 'Inside Ground Floor',
      rating: 4.8,
      reviewCount: 45,
      acceptsF2Wallet: true,
      dailySpendLimit: 500,
      operatingHours: '07:00 AM – 11:00 PM',
      qrPayload: 'F2-PAY-NEW-OUTLET',
      iconType: 'Utensils'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">F2 Admin & Operations Command Console</h1>
              <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold">
                Phase 1 Live Ops
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Doctor verification queues, wallet ledger auditing, merchant network settlement, and campaign KPIs.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs max-w-full scrollbar-none">
          {[
            { id: 'METRICS', label: 'Phase 1 KPIs', icon: BarChart3 },
            { id: 'VERIFICATION_QUEUE', label: `Verification Queue (${pendingDoctors.length})`, icon: ShieldCheck },
            { id: 'LEDGER_AUDIT', label: 'Ledger & Reversals', icon: Receipt },
            { id: 'MERCHANT_MGMT', label: 'Merchants & Outlets', icon: Store },
            { id: 'FRAUD_RULES', label: 'Fraud & Limits', icon: AlertTriangle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Phase 1 KPI Scorecard (Matching PRD Section 7) */}
      {activeTab === 'METRICS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Doctor Verification Rate */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Doctor Verification Rate
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-emerald-700 font-code">
                  {campaignMetrics.doctorVerificationRate}%
                </span>
                <span className="text-xs text-emerald-600 font-semibold">+4.2% vs target</span>
              </div>
              <p className="text-[11px] text-slate-500">
                % of initiated doctor profiles successfully authenticated via NMC/Council API.
              </p>
            </div>

            {/* Metric 2: Wallet Activation Rate */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Wallet Activation Rate
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-teal-700 font-code">
                  {campaignMetrics.walletActivationRate}%
                </span>
                <span className="text-xs text-teal-600 font-semibold">{campaignMetrics.totalVerifiedDoctors} Docs</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Verified doctors who activated their ₹500 benefit balance.
              </p>
            </div>

            {/* Metric 3: First Spend vs Repeat Spend */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Repeat Spend Rate (Habit Metric)
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-amber-700 font-code">
                  {campaignMetrics.repeatSpendRate}%
                </span>
                <span className="text-xs text-amber-600 font-semibold">1st Spend: {campaignMetrics.firstSpendRate}%</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Doctors completing 2+ canteen / cafe redemptions (Habit & brand penetration).
              </p>
            </div>

            {/* Metric 4: Phase-2 Conversion Rate */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Phase-2 Meeting Booking Rate
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-cyan-700 font-code">
                  {campaignMetrics.phase2BookingRate}%
                </span>
                <span className="text-xs text-cyan-600 font-semibold">Conversion Goal</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Engaged wallet users who booked a 1-on-1 financial planning or partner interaction.
              </p>
            </div>

          </div>

          {/* Unit Economics & Disbursal Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Cost Per Activated Doctor</span>
                <div className="text-2xl font-extrabold text-slate-900 font-code mt-1">₹{campaignMetrics.costPerActivatedDoctor}</div>
                <span className="text-[10px] text-slate-400">Campaign spend ÷ Activated docs</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Total Disbursed F2 Balance</span>
                <div className="text-2xl font-extrabold text-teal-700 font-code mt-1">
                  ₹{campaignMetrics.totalWalletValueDisbursed.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400">₹500 per verified practitioner</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Active Merchant Outlets</span>
                <div className="text-2xl font-extrabold text-amber-700 font-code mt-1">
                  {campaignMetrics.merchantCoverageOutlets} Outlets
                </div>
                <span className="text-[10px] text-slate-400">Across 6 major hospital clusters</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Doctor Verification Queue (Manual Review Fallback) */}
      {activeTab === 'VERIFICATION_QUEUE' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Doctor Identity Verification Desk</h3>
              <p className="text-xs text-slate-500">
                Authoritative registry exceptions, state council matches, and doctor approval workflow.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Doctor Details</th>
                    <th className="py-3 px-4">Council & Reg No</th>
                    <th className="py-3 px-4">Hospital Cluster</th>
                    <th className="py-3 px-4">Status & Source</th>
                    <th className="py-3 px-4">Confidence</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] text-slate-500">{doc.mobile} • {doc.qualification}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-code font-bold text-teal-800">{doc.regNumber}</div>
                        <div className="text-[10px] text-slate-500">{doc.councilState}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="truncate max-w-[200px]">{doc.hospitalCluster}</div>
                        <div className="text-[10px] text-slate-400">{doc.college}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.verificationStatus === 'verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : doc.verificationStatus === 'pending_manual_review'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {doc.verificationStatus.replace(/_/g, ' ')}
                        </span>
                        <div className="text-[9px] text-slate-400 mt-0.5">{doc.verificationSource}</div>
                      </td>

                      <td className="py-3.5 px-4 font-code">
                        <span className={doc.verificationConfidence && doc.verificationConfidence >= 90 ? 'text-emerald-700 font-bold' : 'text-amber-800 font-bold'}>
                          {doc.verificationConfidence ? `${doc.verificationConfidence}%` : 'N/A'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {doc.verificationStatus === 'pending_manual_review' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => adminApproveDoctor(doc.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                              title="Approve & Disburse ₹500 Wallet"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve & Grant ₹500</span>
                            </button>
                            <button
                              onClick={() => adminRejectDoctor(doc.id, 'Council mismatch')}
                              className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] flex items-center gap-1 transition-colors"
                              title="Reject Verification"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Auditable Ledger & Reversals */}
      {activeTab === 'LEDGER_AUDIT' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Full Platform Transaction Audit Ledger</h3>
              <p className="text-xs text-slate-500">
                End-to-end immutability, fraud scoring, and operations-authorized balance reversals.
              </p>
            </div>
            <span className="text-xs text-slate-500">{transactions.length} Ledger Records</span>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Txn ID / Hash</th>
                    <th className="py-3 px-4">Doctor</th>
                    <th className="py-3 px-4">Merchant Outlet</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Reversal Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-slate-900">{t.id}</div>
                        <div className="text-[10px] text-slate-400">{new Date(t.timestamp).toLocaleString()}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{t.doctorName}</div>
                        <div className="text-[10px] text-teal-800 font-mono">{t.doctorRegNo}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        <div>{t.merchantName}</div>
                        <div className="text-[10px] text-slate-400">{t.hospitalCluster.split('—')[0]}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-code font-bold">
                        <span className={t.type === 'INITIAL_GRANT' || t.type === 'REVERSAL' ? 'text-emerald-700' : 'text-amber-800'}>
                          {t.type === 'INITIAL_GRANT' || t.type === 'REVERSAL' ? `+₹${t.amount}` : `-₹${t.amount}`}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === 'SUCCESS' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : t.status === 'REVERSED'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {t.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {t.type === 'SPEND' && t.status !== 'REVERSED' ? (
                          <button
                            onClick={() => setReversalModalTxn(t)}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-[11px] flex items-center gap-1 ml-auto transition-colors shadow-xs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reverse</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">Immutable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Merchant Network Management */}
      {activeTab === 'MERCHANT_MGMT' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hospital Partner Merchant Network</h3>
              <p className="text-xs text-slate-500">
                Manage onboarding, QR payloads, daily limits, and settlement summaries.
              </p>
            </div>
            <button
              onClick={() => setShowAddMerchantModal(true)}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard New Hospital Merchant</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchants.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                    <p className="text-[11px] text-slate-500">{m.hospitalCluster.split('—')[0]}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold uppercase">
                    {m.category}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Total Collected:</span>
                    <span className="text-slate-900 font-bold">₹{m.settlementSummary.totalCollected.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Pending T+1:</span>
                    <span className="text-teal-700 font-bold">₹{m.settlementSummary.pendingSettlement.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Redemptions:</span>
                    <span className="text-slate-700">{m.settlementSummary.transactionCount} txns</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono truncate">
                  QR Payload: {m.qrPayload}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Fraud & Velocity Controls */}
      {activeTab === 'FRAUD_RULES' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Phase 1 Fraud & Velocity Guardrails</span>
            </h3>
            <p className="text-xs text-slate-500">
              Active system rules governing doctor wallet issuance, double spend prevention, and cluster compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>One Wallet Per Verified Registration Number</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Strict deduplication against NMC and State Medical Council IDs. A registration number can only hold one active ₹500 grant.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Geofence & Hospital Cluster Locking</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Redemptions are permitted only at authorized canteens, cafes, and food merchants registered within the hospital vicinity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dynamic Coupon Expiry & Single-Use Tokens</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                6-digit verbal voucher codes expire automatically in 60 minutes and cannot be reused after cashier confirmation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Auditable Reversals & Anti-Bribery Compliance</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                100% auditable digital receipts with cryptographic hash. F2 funds are strictly hospitality workspace refreshments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reversal Confirmation Modal */}
      {reversalModalTxn && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-rose-600" />
              <span>Confirm Transaction Reversal</span>
            </h3>

            <p className="text-xs text-slate-600">
              Reversing Txn <strong className="text-slate-900 font-mono">{reversalModalTxn.id}</strong> of <strong className="text-amber-800">₹{reversalModalTxn.amount}</strong> for <strong className="text-slate-900">{reversalModalTxn.doctorName}</strong>. The wallet will be instantly refunded.
            </p>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 uppercase">Reason for Reversal</label>
              <input
                type="text"
                value={reversalReason}
                onChange={(e) => setReversalReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-rose-600 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setReversalModalTxn(null)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReversal}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-xs transition-colors"
              >
                Execute Reversal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Merchant Modal */}
      {showAddMerchantModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Onboard New Hospital Outlet</h3>
              <button onClick={() => setShowAddMerchantModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMerchant} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Outlet / Merchant Name</label>
                <input
                  type="text"
                  required
                  value={newMerchantForm.name}
                  onChange={(e) => setNewMerchantForm({ ...newMerchantForm, name: e.target.value })}
                  placeholder="e.g. Starbucks Doctors Wing Cafe"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newMerchantForm.category}
                    onChange={(e) => setNewMerchantForm({ ...newMerchantForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                  >
                    <option value="canteen">Hospital Canteen</option>
                    <option value="coffee_beverage">Coffee / Beverage</option>
                    <option value="food_court">Food Court</option>
                    <option value="snack_stall">Snack Stall</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Location Details</label>
                  <input
                    type="text"
                    value={newMerchantForm.locationDetail}
                    onChange={(e) => setNewMerchantForm({ ...newMerchantForm, locationDetail: e.target.value })}
                    placeholder="e.g. Ground Floor, Block C"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Hospital Cluster</label>
                <select
                  value={newMerchantForm.hospitalCluster}
                  onChange={(e) => setNewMerchantForm({ ...newMerchantForm, hospitalCluster: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                >
                  {HOSPITAL_CLUSTERS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors mt-2"
              >
                Create Merchant & Generate Counter QR Standee
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
