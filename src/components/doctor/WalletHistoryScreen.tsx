import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Receipt, 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Download, 
  CheckCircle2, 
  Building2, 
  Coffee, 
  Utensils, 
  Filter, 
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';
import { Transaction } from '../../types';

export const WalletHistoryScreen: React.FC = () => {
  const { currentDoctor, currentWallet, transactions, setDoctorStep } = useF2();

  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxnForReceipt, setSelectedTxnForReceipt] = useState<Transaction | null>(null);

  // Filter doctor's transactions
  const doctorTxns = transactions.filter((t) => t.doctorId === currentDoctor?.id);

  const filteredTxns = doctorTxns.filter((t) => {
    const matchesType = filterType === 'ALL' || t.type === filterType;
    const matchesSearch = 
      t.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.itemSummary && t.itemSummary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalSpent = currentWallet?.totalSpent ?? 0;
  const currentBalance = currentWallet?.balance ?? 500;

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
            SCREEN 6
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
            Wallet Ledger & Audit
          </span>
        </div>
        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Audited
        </span>
      </div>

      {/* Summary Stat Badges */}
      <div className="space-y-2.5">
        {/* Main Balance Highlight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white shadow-sm space-y-1 relative overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <Receipt className="w-20 h-20 text-white" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-teal-200">
            <span className="font-semibold uppercase tracking-wider">Current Available Balance</span>
            <span className="px-2 py-0.5 rounded-full bg-teal-700/60 border border-teal-500/30 text-[10px] text-teal-100 font-bold">
              Live Wallet
            </span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight pt-0.5">
            ₹{currentBalance}.00
          </div>
          <p className="text-[11px] text-teal-200/80">
            Section 17(2) Tax-Free Medical Benefit Balance
          </p>
        </div>

        {/* Micro Stat Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block truncate">
              Total Canteen Spend
            </span>
            <div className="text-lg font-bold text-amber-800 font-mono mt-0.5">
              ₹{totalSpent}.00
            </div>
            <span className="text-[10px] text-slate-400 truncate block">Across hospital network</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block truncate">
              Audited Entries
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
              {doctorTxns.length}
            </div>
            <span className="text-[10px] text-slate-400 truncate block">With receipt hash</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-0.5 scrollbar-none">
          {['ALL', 'SPEND', 'INITIAL_GRANT', 'REVERSAL'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-medium text-[11px] transition-all whitespace-nowrap shrink-0 ${
                filterType === type
                  ? 'bg-teal-600 text-white font-bold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {type === 'ALL' ? 'All Entries' : type === 'SPEND' ? 'Spends' : type === 'INITIAL_GRANT' ? 'Grants' : 'Refunds'}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search merchant, item or Txn ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 outline-none placeholder:text-slate-400 shadow-2xs focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Transaction List (Mobile-Optimized Cards) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold uppercase tracking-wider text-[10px]">
          <span>Audit Log Activity</span>
          <span>{filteredTxns.length} Entries</span>
        </div>

        {filteredTxns.length > 0 ? (
          <div className="space-y-2">
            {filteredTxns.map((t) => {
              const isCredit = t.type === 'INITIAL_GRANT' || t.type === 'REVERSAL';
              return (
                <div
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-200 transition-all shadow-2xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isCredit ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isCredit ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">
                          {t.merchantName}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">
                          {t.itemSummary || t.notes || 'Hospital transaction'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`font-mono font-extrabold text-xs sm:text-sm ${
                        isCredit ? 'text-emerald-700' : 'text-slate-900'
                      }`}>
                        {isCredit ? `+₹${t.amount}.00` : `-₹${t.amount}.00`}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Bal: ₹{t.balanceAfter}
                      </div>
                    </div>
                  </div>

                  {/* Metadata Strip */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{new Date(t.timestamp).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        t.type === 'INITIAL_GRANT'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : t.type === 'REVERSAL'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {t.type}
                      </span>

                      <button
                        onClick={() => setSelectedTxnForReceipt(t)}
                        className="p-1 rounded-md bg-slate-50 hover:bg-teal-50 text-teal-700 border border-slate-200 hover:border-teal-300 transition-colors"
                        title="View Digital Receipt"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-white border border-slate-200 text-slate-400 space-y-2">
            <Receipt className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">No transactions match the selected filters.</p>
          </div>
        )}
      </div>

      {/* Digital Receipt Modal */}
      {selectedTxnForReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl relative">
            <button
              onClick={() => setSelectedTxnForReceipt(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-2 border-b border-slate-200">
              <span className="text-[10px] font-bold text-teal-700 tracking-widest uppercase">F2 WHITE COAT CLUB</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Transaction Tax Invoice</h3>
              <p className="text-xs text-slate-500">Auditable Ledger Entry</p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Txn Reference:</span>
                <span className="text-slate-900 font-bold">{selectedTxnForReceipt.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Doctor Name:</span>
                <span className="text-slate-900">{selectedTxnForReceipt.doctorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Medical Reg No:</span>
                <span className="text-teal-800 font-semibold">{selectedTxnForReceipt.doctorRegNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Merchant Outlet:</span>
                <span className="text-slate-900">{selectedTxnForReceipt.merchantName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Item Summary:</span>
                <span className="text-slate-900">{selectedTxnForReceipt.itemSummary}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Timestamp:</span>
                <span className="text-slate-900">{new Date(selectedTxnForReceipt.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 text-sm font-bold pt-2">
                <span className="text-slate-600">Amount:</span>
                <span className="text-amber-800">₹{selectedTxnForReceipt.amount}.00</span>
              </div>
              <div className="flex justify-between py-1 text-xs">
                <span className="text-slate-500">Balance After:</span>
                <span className="text-emerald-700 font-bold">₹{selectedTxnForReceipt.balanceAfter}.00</span>
              </div>
              <div className="pt-2 text-[10px] text-slate-400">
                Hash: {selectedTxnForReceipt.receiptHash}
              </div>
            </div>

            <button
              onClick={() => setSelectedTxnForReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
