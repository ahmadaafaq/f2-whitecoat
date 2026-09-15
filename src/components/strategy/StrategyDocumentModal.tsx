import React from 'react';
import { 
  FileText, 
  X, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Target, 
  DollarSign, 
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface StrategyDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyDocumentModal: React.FC<StrategyDocumentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">F2 FINTECH — WHITE COAT CLUB</h2>
              <p className="text-xs text-slate-500">Business & Product Strategy — Phase 1 Document</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-xs text-slate-600 leading-relaxed font-sans">
          
          {/* Section 1 */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-bold uppercase tracking-wider text-[10px]">
              1. Product Vision
            </div>
            <h3 className="text-base font-bold text-slate-900">High-Frequency Doctor Engagement Ecosystem</h3>
            <p>
              Create a branded digital ecosystem that enters the doctor's everyday workspace first through real, useful benefits, then builds a trusted relationship that can later convert into financial services, consultations, referrals and partnerships.
            </p>
            <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-900 font-medium italic">
              "Core idea: Don't start by selling a loan. Start by creating repeated positive F2 touchpoints."
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold uppercase tracking-wider text-[10px]">
              2. The Two-Phase Customer Journey
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-teal-800 text-sm">Phase 1 — Workspace Penetration</h4>
                <p className="text-slate-700">
                  A verified doctor receives a <strong>₹500 F2-funded wallet/benefit balance</strong> usable at hospital canteens, food courts, coffee stalls, and pharmacy snacks.
                </p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>Scan F2 link or counter standee</li>
                  <li>Fast verification against NMC / State Council</li>
                  <li>Instant ₹500 wallet credit with countdown/validity</li>
                  <li>Pay via dynamic QR / 6-digit cashier voucher</li>
                  <li>Complete auditable ledger receipts</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-amber-800 text-sm">Phase 2 — Relationship Conversion</h4>
                <p className="text-slate-700">
                  Once repeated trust is established, F2 invites the doctor for subsidized 1-on-1 financial planning and accredited partnership privileges.
                </p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>Goal-positioned advisory (Clinic setup, equipment lease)</li>
                  <li>Transparent doctor referral & partner network</li>
                  <li>Institutional pricing for White Coat Club members</li>
                  <li>Zero unsolicited high-pressure cold calling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold uppercase tracking-wider text-[10px]">
              3. System Architecture Modules
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">1. Doctor Identity & Verification Engine</strong>
                <span className="text-slate-500">Registry API simulation, council lookup, deduplication, OCR fallback.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">2. F2 Benefit Wallet & Ledger</strong>
                <span className="text-slate-500">₹500 issuance, balance deduction, single-use vouchers, immutability.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">3. Merchant POS & Standee Terminal</strong>
                <span className="text-slate-500">Hospital QR standees, instant cashier confirmation, T+1 settlement.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">4. Operations & CRM Console</strong>
                <span className="text-slate-500">Doctor 360°, reversal engine, campaign KPIs, partner compliance.</span>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase tracking-wider text-[10px]">
              4. Key Success Metrics (Phase 1 Target)
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Doctor Verification</span>
                <span className="text-emerald-700 font-code font-bold text-sm">80%+ Target</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Repeat Spend Rate</span>
                <span className="text-amber-800 font-code font-bold text-sm">60%+ Target</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Phase 2 Booking</span>
                <span className="text-cyan-700 font-code font-bold text-sm">15-20% Target</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Close Strategy Document
          </button>
        </div>

      </div>
    </div>
  );
};
