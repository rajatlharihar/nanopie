import { useStakeholder } from "../context";
import { MOCK_INVESTMENTS, MOCK_VENDORS } from "../data";
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  History,
  PieChart,
  Target,
  ShieldCheck,
  Plus
} from "lucide-react";
import { motion } from "motion/react";

export function Investors() {
  const { stakeholder } = useStakeholder();

  if (stakeholder === 'admin') {
    return (
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <AdminStat label="Total Funds" value="₹1.28Cr" trend="+14.2%" color="text-[#075056]" />
          <AdminStat label="Avg Investment" value="₹45,000" trend="Organic" color="text-[#16232B]" />
          <AdminStat label="Total Payouts" value="₹8.4L" trend="Automated" color="text-[#FF5B04]" />
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-normal tracking-tight">Active Investors</h3>
            <div className="flex gap-4">
              <button className="text-[10px] uppercase tracking-widest text-[#FF5B04]">Verified</button>
              <button className="text-[10px] uppercase tracking-widest text-[#16232B]">Pending</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1F5F9]">
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Investor ID</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Allocation</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Assets</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Member Since</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <tr key={`investor-row-${i}`} className="group hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="py-5 text-sm font-normal text-[#075056]">Investor_{482 + i}</td>
                    <td className="py-5 text-sm font-normal text-[#075056]">₹{(Math.random() * 50000 + 5000).toFixed(0)}</td>
                    <td className="py-5 text-xs text-[#16232B]">{Math.floor(Math.random() * 8 + 1)} Positions</td>
                    <td className="py-5 text-xs text-[#16232B]">Jan 2{i}, 2024</td>
                    <td className="py-5">
                      <span className="text-[10px] px-2 py-1 rounded-full border border-emerald-100 text-emerald-600">Standard</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Investor Mobile View (Portfolio)
  return (
    <div className="space-y-12 pt-4 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-normal tracking-tight">My Portfolio</h2>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-white flex items-center justify-center text-[10px] text-[#16232B]">AI</div>
          <div className="w-8 h-8 rounded-full bg-[#F1F5F9] border border-white flex items-center justify-center text-[10px] text-[#16232B]">JS</div>
        </div>
      </div>

      {/* Ultra Minimal Summary */}
      <div className="space-y-10 border border-[#F1F5F9] rounded-[1.5rem] p-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px] uppercase tracking-widest text-[#16232B]">
            <span>Net Asset Value</span>
            <span className="text-emerald-500">+8.2%</span>
          </div>
          <h1 className="text-4xl font-normal tracking-tight text-[#075056]">₹1,85,000</h1>
        </div>
        
        <div className="space-y-4">
          <div className="h-[2px] bg-[#F8FAFC] flex overflow-hidden">
            <div className="h-full bg-[#FF5B04]" style={{ width: '60%' }}></div>
            <div className="h-full bg-[#075056]" style={{ width: '25%' }}></div>
            <div className="h-full bg-[#16232B]" style={{ width: '15%' }}></div>
          </div>
          
          <div className="flex justify-between text-[10px] text-[#16232B] uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF5B04]"></div> Food</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#075056]"></div> Agri</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#16232B]"></div> Tech</span>
          </div>
        </div>
      </div>

      {/* List Style - Ultra Clean */}
      <div className="space-y-8 px-1">
        <h3 className="text-lg font-normal tracking-tight">Active Assets</h3>
        <div className="divide-y divide-[#F1F5F9]">
          {MOCK_INVESTMENTS.map((inv) => {
            const vendor = MOCK_VENDORS.find(v => v.id === inv.vendorId);
            return (
              <div 
                key={inv.id}
                className="py-5 flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#F1F5F9]">
                  <img src={vendor?.image} alt={vendor?.name} className="w-full h-full object-cover grayscale-[0.2]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-normal text-[#075056]">{vendor?.name}</h4>
                  <p className="text-[11px] text-[#16232B]">{new Date(inv.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-normal text-[#075056]">₹{inv.amount * 80}</p>
                  <p className="text-[10px] text-emerald-500 tracking-wide">+₹2,450</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Targeted Banner */}
      <div className="bg-[#075056] rounded-[1.5rem] p-8 text-white space-y-6">
        <div className="space-y-2">
          <h4 className="text-lg font-normal tracking-tight">Silver Milestone</h4>
          <p className="text-[11px] text-white/50 leading-relaxed">Invest ₹50,000 more this month to unlock premium analytics.</p>
        </div>
        <div className="space-y-3">
          <div className="h-[1px] bg-white/10 relative">
            <div className="absolute inset-y-0 left-0 bg-[#FF5B04] w-3/4"></div>
          </div>
          <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-widest">
            <span>Progress</span>
            <span>75%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminStat({ label, value, trend, color }: any) {
  return (
    <div className="p-8 border border-[#F1F5F9] rounded-[1.25rem] space-y-4">
      <p className="text-[10px] uppercase tracking-widest text-[#16232B]">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className={`text-3xl font-normal tracking-tight ${color}`}>{value}</h4>
        <span className="text-[11px] text-emerald-500">{trend}</span>
      </div>
    </div>
  );
}
