import { useStakeholder } from "../context";
import { MOCK_TRANSACTIONS } from "../data";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download,
  Calendar,
  Wallet,
  ArrowRightLeft
} from "lucide-react";
import { motion } from "motion/react";

export function Transactions() {
  const { stakeholder } = useStakeholder();

  const getIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="text-emerald-500" size={16} strokeWidth={1.5} />;
      case 'investment': return <ArrowUpRight className="text-[#FF5B04]" size={16} strokeWidth={1.5} />;
      case 'payout': return <ArrowRightLeft className="text-[#16232B]" size={16} strokeWidth={1.5} />;
      case 'withdrawal': return <ArrowUpRight className="text-rose-500" size={16} strokeWidth={1.5} />;
      default: return <ArrowRightLeft size={16} strokeWidth={1.5} />;
    }
  };

  if (stakeholder === 'admin') {
    return (
      <div className="space-y-12">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-8">
          <div className="relative w-96">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#16232B]" size={16} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Filter by reference, user, or amount..." 
              className="w-full pl-8 pr-4 py-2 border-none bg-transparent outline-none text-sm text-[#075056]"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs text-[#16232B] px-4 py-2 border border-[#F1F5F9] rounded-lg">
              <Calendar size={14} strokeWidth={1.5} />
              Apr 2026
            </button>
            <button className="flex items-center gap-2 text-xs text-white bg-[#075056] px-6 py-2 rounded-lg">
              <Download size={14} strokeWidth={1.5} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-normal uppercase tracking-widest text-[#16232B]">
                <th className="pb-6">Reference</th>
                <th className="pb-6">Category</th>
                <th className="pb-6">Sender/Receiver</th>
                <th className="pb-6">Value</th>
                <th className="pb-6">Date</th>
                <th className="pb-6 text-right">Confirmation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {MOCK_TRANSACTIONS.map((t, idx) => (
                <tr key={`admin-tx-${t.id}-${idx}`} className="group hover:bg-[#F8FAFC]/50 transition-colors">
                  <td className="py-6 text-[11px] font-normal font-mono text-[#16232B]">{t.id.toUpperCase()}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg border border-[#F1F5F9] flex items-center justify-center">
                        {getIcon(t.type)}
                      </div>
                      <span className="text-sm font-normal text-[#075056] capitalize">{t.type}</span>
                    </div>
                  </td>
                  <td className="py-6 text-sm text-[#075056]">System Account 84{t.userId}</td>
                  <td className="py-6 text-sm text-[#075056]">${t.amount.toLocaleString()}</td>
                  <td className="py-6 text-xs text-[#16232B]">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="py-6 text-right">
                    <span className="text-[10px] px-2 py-1 border border-[#F1F5F9] rounded-full text-[#075056] uppercase tracking-wide">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Mobile View
  return (
    <div className="space-y-12 pt-4 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-normal tracking-tight">Activity</h2>
        <button className="text-[11px] text-[#16232B] uppercase tracking-widest">Filters</button>
      </div>

      {/* Subtle Balance Highlight */}
      <div className="p-8 border border-[#F1F5F9] rounded-[1.5rem] flex flex-col items-center gap-6 text-center">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#16232B]">Wallet Account</p>
          <h1 className="text-3xl font-normal tracking-tight">$1,250.45</h1>
        </div>
        <button className="text-[11px] px-8 py-2.5 bg-[#FF5B04] text-white rounded-full transition-all hover:opacity-90">
          Add Funds
        </button>
      </div>

      <div className="space-y-10 px-1">
        <div className="space-y-8">
          <h3 className="text-[10px] uppercase tracking-widest text-[#16232B] pl-1">Recent Activity</h3>
          <div className="divide-y divide-[#F1F5F9]">
            {MOCK_TRANSACTIONS.map((t, idx) => (
              <div 
                key={`mobile-tx-${t.id}-${idx}`}
                className="py-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-2xl border border-[#F1F5F9] flex items-center justify-center">
                    {getIcon(t.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-normal text-[#075056]">{t.description}</h4>
                    <p className="text-[11px] text-[#16232B]">{new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-normal ${
                    t.type === 'deposit' || t.type === 'payout' ? 'text-emerald-500' : 'text-[#075056]'
                  }`}>
                    {t.type === 'deposit' || t.type === 'payout' ? '+' : '-'}${t.amount}
                  </p>
                  <p className="text-[9px] text-[#16232B] uppercase tracking-widest">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
