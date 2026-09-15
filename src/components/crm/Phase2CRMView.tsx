import React, { useState } from 'react';
import { useF2 } from '../../context/F2Context';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building2, 
  TrendingUp, 
  Briefcase, 
  FileText, 
  Phone, 
  Mail, 
  Search, 
  MessageSquare, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  UserCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Phase2Booking, DoctorProfile } from '../../types';

export const Phase2CRMView: React.FC = () => {
  const { 
    phase2Bookings, 
    doctors, 
    partnerReferrals, 
    updateBookingStatus 
  } = useF2();

  const [selectedBooking, setSelectedBooking] = useState<Phase2Booking | null>(
    phase2Bookings[0] || null
  );
  const [advisorNoteInput, setAdvisorNoteInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredBookings = phase2Bookings.filter((b) => {
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchesQuery = 
      b.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hospitalCluster.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const handleUpdateStatus = (status: Phase2Booking['status']) => {
    if (!selectedBooking) return;
    updateBookingStatus(selectedBooking.id, status, advisorNoteInput || undefined);
    setSelectedBooking({
      ...selectedBooking,
      status: status,
      notes: advisorNoteInput || selectedBooking.notes
    });
    setAdvisorNoteInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Phase 2 Doctor Relationship & CRM Portal</h1>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                Wealth & Partner Desk
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Doctor profile 360°, consultation lead pipelines, and accredited referral governance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            {phase2Bookings.length} Active Consultations
          </span>
        </div>
      </div>

      {/* Main CRM Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Lead Queue & Search */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search doctor or reg no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 shadow-xs"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-700 font-medium outline-none focus:border-teal-600 shadow-xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_DISCUSSION">In Discussion</option>
              <option value="CONVERTED">Converted</option>
            </select>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredBookings.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border text-xs space-y-2 ${
                    isSelected
                      ? 'bg-teal-50/50 border-teal-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{b.doctorName}</h4>
                      <span className="text-[11px] text-teal-800 font-mono font-semibold">{b.regNumber}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'CONFIRMED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : b.status === 'CONVERTED'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 truncate">
                    Topic: <strong className="text-slate-900">{b.topic.replace(/_/g, ' ')}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-700" />
                      {b.preferredDate} ({b.preferredTime})
                    </span>
                    <span>{b.channel.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: 360° Doctor Profile & Consultation Action */}
        <div className="lg:col-span-7 space-y-6">
          {selectedBooking ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-5">
              
              {/* Profile Top Banner */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{selectedBooking.doctorName}</h3>
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold">
                      White Coat Verified
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Reg No: {selectedBooking.regNumber} • Phone: {selectedBooking.mobile}
                  </div>
                  <div className="text-xs text-slate-600">{selectedBooking.hospitalCluster}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Lead Reference</span>
                  <div className="text-xs font-bold text-slate-700 font-mono">{selectedBooking.id}</div>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Meeting Slot & Mode</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{selectedBooking.preferredDate} • {selectedBooking.preferredTime}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">{selectedBooking.channel.replace(/_/g, ' ')}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Assigned Advisor</span>
                  <div className="font-bold text-teal-800 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span className="truncate">{selectedBooking.assignedAdvisor}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Doctor Wealth Practice Group</div>
                </div>
              </div>

              {/* Doctor's Stated Goals & Notes */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Doctor's Stated Goals & Discussion Scope:
                </span>
                <p className="text-slate-700 leading-relaxed italic">
                  "{selectedBooking.notes || 'Looking for clinic expansion advisory and medical practice wealth planning.'}"
                </p>
              </div>

              {/* Status Update & Interaction Notes */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                  Update Lead Interaction Stage:
                </label>
                
                <div className="flex flex-wrap gap-2 text-xs">
                  {['CONFIRMED', 'IN_DISCUSSION', 'PROPOSAL_SHARED', 'CONVERTED'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleUpdateStatus(status as any)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        selectedBooking.status === status
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {status.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-semibold block">Add Advisor CRM Notes</label>
                  <input
                    type="text"
                    value={advisorNoteInput}
                    onChange={(e) => setAdvisorNoteInput(e.target.value)}
                    placeholder="e.g. Conducted preliminary OPD asset review. Sharing 8.25% equipment lease proposal."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none focus:border-teal-600 shadow-xs"
                  />
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 rounded-2xl bg-white border border-slate-200 shadow-xs">
              Select a doctor consultation lead from the list to view profile details and update status.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
