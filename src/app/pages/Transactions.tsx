import React, { useId, useState } from "react";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock,
  MoreHorizontal,
  AlertTriangle,
  Activity,
  ShieldAlert,
  Zap,
  Download,
  Calendar,
  ChevronDown,
  ArrowRight,
  Check
} from "lucide-react";
import { useNavigate } from "react-router";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from "motion/react";

const VOLUME_DATA = [
  { day: 'Mon', volume: 45000, risk: 1200 },
  { day: 'Tue', volume: 52000, risk: 800 },
  { day: 'Wed', volume: 48000, risk: 2400 },
  { day: 'Thu', volume: 61000, risk: 1500 },
  { day: 'Fri', volume: 55000, risk: 3200 },
  { day: 'Sat', volume: 67000, risk: 900 },
  { day: 'Sun', volume: 72000, risk: 400 },
];

const RISK_DISTRIBUTION = [
  { name: 'Secure', value: 85, color: '#16232B' },
  { name: 'Warn', value: 10, color: '#FF5B04' },
  { name: 'Critical', value: 5, color: '#075056' },
];

export function Transactions() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<'Weekly' | 'Monthly'>('Monthly');
  const [authorizedId, setAuthorizedId] = useState<string | null>(null);
  
  const transactions = [
    { id: "TX-9012", vendor: "Cubbon Park Organics", amount: "₹1,20,000.00", type: "Investment", status: "Pending Review", date: "22 Apr 2026, 10:45 AM", risk: "Low", alert: false },
    { id: "TX-9011", vendor: "Commercial Street Silks", amount: "₹45,000.00", type: "Payout", status: "Approved", date: "22 Apr 2026, 09:20 AM", risk: "Low", alert: false },
    { id: "TX-9010", vendor: "Indiranagar Cold Chain", amount: "₹8,90,000.00", type: "Funding", status: "Flagged", date: "21 Apr 2026, 04:15 PM", risk: "High", alert: true },
    { id: "TX-9009", vendor: "Ulsoor Handicrafts", amount: "₹30,000.00", type: "Payout", status: "Approved", date: "21 Apr 2026, 02:30 PM", risk: "Low", alert: false },
    { id: "TX-9008", vendor: "Richmond Town Spices", amount: "₹1,50,000.00", type: "Investment", status: "Approved", date: "20 Apr 2026, 11:10 AM", risk: "Low", alert: false },
    { id: "TX-9007", vendor: "SP Road Electronics", amount: "₹2,20,000.00", type: "Funding", status: "Rejected", date: "20 Apr 2026, 09:45 AM", risk: "Medium", alert: true },
  ];

  const highAlertItems = transactions.filter(tx => tx.alert);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-32 px-4 md:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl text-[#075056] tracking-tight">Financial Surveillance</h1>
          <p className="text-sm text-[#075056]/40">Monitor and authorize nanopie financial flows with real-time risk assessment.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-white border border-[#E4EEF0] px-4 py-2.5 rounded-2xl text-xs text-[#075056]">
            <Calendar size={14} className="text-[#075056]/30" />
            <span>22 Apr, 2026</span>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-[#075056] text-white px-6 py-2.5 rounded-2xl text-xs hover:opacity-90 transition-all">
              <Download size={14} />
              <span>{reportType} Security Log</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#E4EEF0] rounded-2xl p-2 hidden group-hover:block z-50">
              <button onClick={() => setReportType('Weekly')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#F8FAFC] rounded-xl">Weekly Report</button>
              <button onClick={() => setReportType('Monthly')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#F8FAFC] rounded-xl">Monthly Report</button>
            </div>
          </div>
        </div>
      </div>

      {/* High Alert / Attention Needed Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <ShieldAlert size={20} className="text-[#FF5B04]" />
          <h2 className="text-xl text-[#075056]">High Alert: Attention Required</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highAlertItems.map((tx) => (
            <motion.div 
              key={`alert-${tx.id}`}
              whileHover={{ y: -2 }}
              className="bg-white border-2 border-[#FF5B04]/20 rounded-[28px] p-6 space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <AlertTriangle size={64} className="text-[#FF5B04]" />
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#FF5B04] font-medium">Critical Risk</span>
                  <h3 className="text-lg text-[#075056]">{tx.vendor}</h3>
                </div>
                <span className="text-xs font-mono text-[#075056]/30">{tx.id}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-medium text-[#075056]">{tx.amount}</p>
                  <p className="text-[10px] text-[#075056]/40 uppercase mt-1">{tx.date}</p>
                </div>
                <button 
                  onClick={() => navigate(`/resolve/${tx.id}`)}
                  className="px-5 py-2 bg-[#075056] text-white rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#FF5B04] transition-all"
                >
                  Intervene
                </button>
              </div>
            </motion.div>
          ))}
          <div className="bg-[#F8FAFC] border-2 border-dashed border-[#E4EEF0] rounded-[28px] flex flex-col items-center justify-center p-8 text-center space-y-3 min-h-[160px]">
            <div className="w-12 h-12 rounded-full bg-white border border-[#E4EEF0] flex items-center justify-center text-[#075056]/20">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-sm text-[#075056]">Automated Shield Active</p>
              <p className="text-[10px] text-[#075056]/40">4 minor threats neutralized today.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphs & Insights Section */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Volume Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-[#E4EEF0] rounded-[32px] p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-[#075056]">Transaction Velocity</h3>
              <p className="text-xs text-[#075056]/40">Daily volume vs identified risk spikes</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#075056]" />
                <span className="text-[10px] uppercase tracking-widest text-[#075056]/60">Volume</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5B04]" />
                <span className="text-[10px] uppercase tracking-widest text-[#075056]/60">Risk Spike</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VOLUME_DATA}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#075056" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#075056" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#075056', fontSize: 10, opacity: 0.4 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#075056', fontSize: 10, opacity: 0.4 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#075056" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#FF5B04" 
                  strokeWidth={2}
                  fillOpacity={0.1} 
                  fill="#FF5B04" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-[#E4EEF0] rounded-[32px] p-8 space-y-8">
          <div>
            <h3 className="text-lg text-[#075056]">Network Health</h3>
            <p className="text-xs text-[#075056]/40">Security classification distribution</p>
          </div>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-medium text-[#075056]">95%</span>
              <span className="text-[10px] uppercase tracking-widest text-[#16232B]">Healthy</span>
            </div>
          </div>
          <div className="space-y-3">
            {RISK_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-[#075056]/60">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-[#075056]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Feed - Responsive Table */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="flex items-center space-x-3">
            <Activity size={20} className="text-[#075056]" />
            <h2 className="text-xl text-[#075056]">Live Transaction Feed</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-white border border-[#E4EEF0] px-4 py-2 rounded-xl text-xs text-[#075056]/60 flex-1 md:flex-none">
              <Search size={14} />
              <input type="text" placeholder="Search logs..." className="bg-transparent border-none focus:outline-none w-full md:w-32 placeholder-[#075056]/20" />
            </div>
            <button className="p-2 border border-[#E4EEF0] rounded-xl text-[#075056]/40 hover:text-[#075056] transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#E4EEF0] rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#F1F5F9]">
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/40 font-normal">Surveillance ID</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/40 font-normal">Entity</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/40 font-normal">Classification</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/40 font-normal">Volume</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/40 font-normal">Timestamp</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/40 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {transactions.map((tx, idx) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#F8FAFC]/50 transition-colors group"
                  >
                    <td className="px-8 py-5 text-xs text-[#075056]/60 font-mono">{tx.id}</td>
                    <td className="px-8 py-5 text-sm text-[#075056] font-medium">{tx.vendor}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] px-3 py-1 rounded-full border ${tx.type === 'Payout' ? 'bg-[#16232B]/5 text-[#16232B] border-[#16232B]/10' : 'bg-[#075056]/5 text-[#075056] border-[#075056]/10'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-[#075056]">{tx.amount}</td>
                    <td className="px-8 py-5 text-xs text-[#075056]/40 whitespace-nowrap">{tx.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => setAuthorizedId(tx.id)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${authorizedId === tx.id ? 'bg-[#16232B] text-white border-[#16232B]' : 'text-[#075056]/40 border-[#E4EEF0] hover:border-[#075056] hover:text-[#075056]'}`}
                        >
                          {authorizedId === tx.id ? <Check size={14} /> : <Zap size={14} />}
                        </button>
                        <button 
                          onClick={() => navigate(`/resolve/${tx.id}`)}
                          className="w-8 h-8 rounded-full border border-[#E4EEF0] flex items-center justify-center text-[#075056]/40 hover:border-[#FF5B04] hover:text-[#FF5B04] transition-all"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
