import { MOCK_VENDORS } from "../data";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  ExternalLink,
  FileText,
  User,
  Info,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function Requests() {
  const [activeTab, setActiveTab] = useState<'approvals' | 'returns'>('approvals');
  const [requests, setRequests] = useState(MOCK_VENDORS.filter(v => v.status === 'pending'));

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRequests(requests.filter(r => r.id !== id));
    toast.success(`Request ${action}ed`);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-8">
        <div>
          <h2 className="text-xl font-normal tracking-tight">Compliance Queue</h2>
          <p className="text-xs text-[#16232B]">Validation of new vendors and shared returns</p>
        </div>
        <div className="flex gap-2 bg-[#F8FAFC] p-1 rounded-full border border-[#F1F5F9]">
          <button 
            onClick={() => setActiveTab('approvals')}
            className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all ${
              activeTab === 'approvals' ? 'bg-white text-[#FF5B04]' : 'text-[#16232B]'
            }`}
          >
            New Partners
          </button>
          <button 
            onClick={() => setActiveTab('returns')}
            className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all ${
              activeTab === 'returns' ? 'bg-white text-[#FF5B04]' : 'text-[#16232B]'
            }`}
          >
            Returns
          </button>
        </div>
      </div>

      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {activeTab === 'approvals' ? (
            requests.map((vendor) => (
              <motion.div 
                key={vendor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-8 pb-10 border-b border-[#F1F5F9]"
              >
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/3 space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[1.25rem] border border-[#F1F5F9] overflow-hidden">
                        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover grayscale-[0.2]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-normal tracking-tight">{vendor.name}</h3>
                        <p className="text-[11px] text-[#16232B] uppercase tracking-widest">{vendor.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#16232B] leading-relaxed italic">
                      "{vendor.description}"
                    </p>
                    <div className="flex gap-2">
                      <span className="text-[10px] px-2.5 py-1 border border-[#F1F5F9] text-[#075056] rounded-full uppercase tracking-wider">
                        Risk Level {vendor.riskScore}%
                      </span>
                    </div>
                  </div>

                  <div className="lg:w-1/3 space-y-6">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#16232B]">Validation Steps</h4>
                    <div className="space-y-4">
                      <CheckRow label="Legal Entity" status="complete" />
                      <CheckRow label="ID Verification" status="pending" />
                      <CheckRow label="Bank Connection" status="complete" />
                    </div>
                  </div>

                  <div className="lg:w-1/3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#16232B]">Initial Goal</h4>
                      <h3 className="text-3xl font-normal tracking-tight">${vendor.fundingGoal.toLocaleString()}</h3>
                    </div>

                    <div className="flex gap-4 pt-10">
                      <button 
                        onClick={() => handleAction(vendor.id, 'reject')}
                        className="flex-1 py-3 text-xs text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-50 transition-all"
                      >
                        Decline
                      </button>
                      <button 
                        onClick={() => handleAction(vendor.id, 'approve')}
                        className="flex-1 py-3 text-xs text-white bg-[#075056] rounded-xl hover:bg-black transition-all"
                      >
                        Authorize
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            [
              { id: 'ret1', vendor: "Santi's Street Tacos", amount: 450.00, profit: 45.00 },
              { id: 'ret2', vendor: "Pulse Coffee", amount: 1200.00, profit: 180.00 },
            ].map((ret) => (
              <div 
                key={ret.id}
                className="py-10 border-b border-[#F1F5F9] flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl border border-[#F1F5F9] flex items-center justify-center text-[#16232B]">
                    <TrendingUp size={20} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-normal tracking-tight">{ret.vendor}</h4>
                    <p className="text-xs text-[#16232B]">Shared Pool Revenue: ${ret.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-[#16232B]">System Return</p>
                    <p className="text-xl font-normal text-[#FF5B04]">${ret.profit.toLocaleString()}</p>
                  </div>
                  <button className="px-8 py-2.5 bg-[#075056] text-white text-xs rounded-xl hover:bg-black transition-all">
                    Release
                  </button>
                </div>
              </div>
            ))
          )}
        </AnimatePresence>

        {requests.length === 0 && activeTab === 'approvals' && (
          <div className="py-24 text-center space-y-6">
            <div className="w-16 h-16 border border-[#F1F5F9] rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-normal">All clear</h3>
              <p className="text-xs text-[#16232B]">No pending registration requests.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckRow({ label, status }: { label: string, status: 'complete' | 'pending' }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-[#16232B]">{label}</span>
      <div className={`flex items-center gap-2 ${status === 'complete' ? 'text-emerald-500' : 'text-amber-500'}`}>
        {status === 'complete' ? <Check size={14} strokeWidth={2} /> : <Info size={14} strokeWidth={1.5} />}
        <span className="text-[10px] uppercase tracking-wide">{status}</span>
      </div>
    </div>
  );
}
