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
            SCREEN 6
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Wallet Transaction Ledger & Audit Trail
          </span>
        </div>
        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Immutable Audit Ledger
        </span>
      </div>

      {/* Summary Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Current Available Balance</span>
          <div className="text-2xl font-extrabold text-teal-700 font-code mt-1">₹{currentBalance}.00</div>
          <span className="text-[10px] text-slate-400">Live in F2 Wallet</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Canteen & Cafe Spend</span>
          <div className="text-2xl font-extrabold text-amber-700 font-code mt-1">₹{totalSpent}.00</div>
          <span className="text-[10px] text-slate-400">Across hospital network</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Audited Transactions</span>
          <div className="text-2xl font-extrabold text-slate-900 font-code mt-1">{doctorTxns.length}</div>
          <span className="text-[10px] text-slate-400">Recorded with receipt hash</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['ALL', 'SPEND', 'INITIAL_GRANT', 'REVERSAL'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                filterType === type
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {type === 'ALL' ? 'All Transactions' : type === 'SPEND' ? 'Spends' : type === 'INITIAL_GRANT' ? 'Grants' : 'Refunds'}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search merchant or Txn ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-60 pl-9 pr-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 outline-none placeholder:text-slate-400 shadow-xs focus:border-teal-600"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Merchant / Event</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Balance After</th>
                <th className="py-3 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTxns.length > 0 ? (
                filteredTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      <div>{new Date(t.timestamp).toLocaleDateString()}</div>
                      <div className="text-[10px] text-slate-400">{new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{t.merchantName}</div>
                      <div className="text-[11px] text-slate-500">{t.itemSummary || t.notes || 'Hospital transaction'}</div>
                      <div className="text-[9px] text-slate-400 font-mono">ID: {t.id}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.type === 'INITIAL_GRANT'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : t.type === 'REVERSAL'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {t.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-code font-bold">
                      <span className={t.type === 'INITIAL_GRANT' || t.type === 'REVERSAL' ? 'text-emerald-700' : 'text-amber-800'}>
                        {t.type === 'INITIAL_GRANT' || t.type === 'REVERSAL' ? `+₹${t.amount}` : `-₹${t.amount}`}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-code font-bold text-slate-800">
                      ₹{t.balanceAfter}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedTxnForReceipt(t)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 text-teal-700 border border-slate-200 hover:border-teal-300 transition-colors shadow-xs"
                        title="View Digital Receipt"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No transactions match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
