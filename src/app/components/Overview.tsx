import { useStakeholder } from "../context";
import { MOCK_VENDORS, MOCK_TRANSACTIONS } from "../data";
import { useId } from "react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Store, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  ShieldCheck,
  Search,
  PieChart as PieChartIcon
} from 'lucide-react';
import { motion } from "motion/react";

const CHART_DATA = [
  { month: 'Jan', volume: 4000 },
  { month: 'Feb', volume: 3000 },
  { month: 'Mar', volume: 2000 },
  { month: 'Apr', volume: 2780 },
  { month: 'May', volume: 1890 },
  { month: 'Jun', volume: 2390 },
  { month: 'Jul', volume: 3490 },
];

const SECTOR_DATA = [
  { name: 'Food', value: 400 },
  { name: 'Agri', value: 300 },
  { name: 'Retail', value: 300 },
  { name: 'Tech', value: 200 },
];

const SECTOR_COLORS = ['#FF5B04', '#16232B', '#075056', '#E4EEF0'];

export function Overview() {
  const { stakeholder } = useStakeholder();
  const chartId = useId();
  const pieId = useId();

  if (stakeholder === 'admin') {
    return (
      <div className="space-y-12" key="admin-overview">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            key="stat-users"
            title="Total Users" 
            value="12,842" 
            trend="+12%" 
            isUp={true} 
            icon={Users} 
            color="text-[#075056]"
          />
          <StatCard 
            key="stat-vendors"
            title="Active Vendors" 
            value="458" 
            trend="+5.4%" 
            isUp={true} 
            icon={Store} 
            color="text-[#075056]"
          />
          <StatCard 
            key="stat-invested"
            title="Total Invested" 
            value="₹42.5L" 
            trend="+28%" 
            isUp={true} 
            icon={TrendingUp} 
            color="text-[#FF5B04]"
          />
          <StatCard 
            key="stat-queue"
            title="Approval Queue" 
            value="24" 
            trend="-3" 
            isUp={false} 
            icon={Clock} 
            color="text-[#16232B]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-normal tracking-tight">Platform Activity</h3>
                <p className="text-xs text-[#16232B]">Transaction volume (last 7 months)</p>
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] px-3 py-1.5 rounded-full border border-[#F1F5F9] text-[#075056]">Daily</button>
                <button className="text-[10px] px-3 py-1.5 rounded-full bg-[#075056] text-white">Monthly</button>
              </div>
            </div>
            <div className="w-full" style={{ height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart id={chartId} data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#16232B', fontSize: 11 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#16232B', fontSize: 11 }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #F1F5F9', boxShadow: 'none', fontSize: '12px' }}
                    cursor={{ stroke: '#F1F5F9' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#FF5B04" 
                    strokeWidth={1.5} 
                    fillOpacity={0.03} 
                    fill="#FF5B04" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Breakdown */}
          <div className="space-y-8">
            <h3 className="text-lg font-normal tracking-tight">Sectors</h3>
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart id={pieId}>
                  <Pie
                    data={SECTOR_DATA}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    stroke="none"
                  >
                    {SECTOR_DATA.map((entry, index) => (
                      <Cell key={`pie-cell-${pieId}-${entry.name}-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-[#16232B] uppercase tracking-widest">Growth</span>
                <span className="text-xl font-normal">+14%</span>
              </div>
            </div>
            <div className="space-y-4">
              {SECTOR_DATA.map((item, index) => (
                <div key={`legend-${pieId}-${item.name}`} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SECTOR_COLORS[index] }}></div>
                    <span className="text-[#075056]">{item.name}</span>
                  </div>
                  <span className="text-[#16232B]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-normal tracking-tight">Recent Transfers</h3>
            <button className="text-xs text-[#FF5B04]">View all activity</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1F5F9]">
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Transaction</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Account</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Date</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Amount</th>
                  <th className="pb-4 text-[11px] font-normal uppercase tracking-widest text-[#16232B]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {MOCK_TRANSACTIONS.map((t) => (
                  <tr key={`row-activity-admin-${t.id}`} className="group hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="py-5 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg border border-[#F1F5F9] flex items-center justify-center text-[#075056]">
                          <ArrowUpRight size={14} strokeWidth={1.5} />
                        </div>
                        <span className="text-[#075056]">{t.description}</span>
                      </div>
                    </td>
                    <td className="py-5 text-xs text-[#075056]">842{t.userId}</td>
                    <td className="py-5 text-xs text-[#16232B]">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="py-5 text-sm text-[#075056]">₹{t.amount * 80}</td>
                    <td className="py-5">
                      <span className={`text-[10px] px-2 py-1 rounded-full border ${
                        t.status === 'completed' ? 'border-emerald-100 text-emerald-600' : 'border-amber-100 text-amber-600'
                      }`}>
                        {t.status}
                      </span>
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

  // Investor / Vendor Mobile Overview
  return (
    <div className="space-y-12 pt-4 pb-24" key="mobile-overview">
      <div className="space-y-1">
        <h2 className="text-2xl font-normal tracking-tight">Hello, Alex</h2>
        <p className="text-xs text-[#16232B]">Your portfolio increased 12% today.</p>
      </div>

      {/* Ultra Minimal Wallet Card */}
      <div className="border border-[#F1F5F9] rounded-[1.5rem] p-8 space-y-10 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] text-[#16232B] uppercase tracking-widest">Available Balance</span>
            <h1 className="text-4xl font-normal tracking-tight">₹1,24,500.00</h1>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#F1F5F9] flex items-center justify-center">
            <ShieldCheck size={18} className="text-[#16232B]" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-[#FF5B04] text-white py-3.5 rounded-xl text-sm transition-all hover:opacity-90">
            Deposit
          </button>
          <button className="flex-1 border border-[#F1F5F9] text-[#075056] py-3.5 rounded-xl text-sm hover:bg-[#F8FAFC]">
            Withdraw
          </button>
        </div>
      </div>

      {/* Clean Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Search, label: "Explore" },
          { icon: Users, label: "Invite" },
          { icon: Store, label: "Shops" },
          { icon: PieChartIcon, label: "Assets" },
        ].map((action) => (
          <button key={`action-btn-mobile-${action.label}`} className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl border border-[#F1F5F9] flex items-center justify-center text-[#075056] hover:bg-[#F8FAFC] transition-colors">
              <action.icon size={22} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-[#16232B]">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Featured Listing */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-normal tracking-tight">New Opportunities</h3>
          <button className="text-[11px] text-[#FF5B04]">See all</button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar">
          {MOCK_VENDORS.map((vendor) => (
            <div 
              key={`vendor-card-mobile-${vendor.id}`}
              className="min-w-[280px] space-y-5"
            >
              <div className="h-44 rounded-[1.25rem] overflow-hidden border border-[#F1F5F9]">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover grayscale-[0.2]" />
              </div>
              <div className="space-y-4 px-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-normal">{vendor.name}</h4>
                    <p className="text-[11px] text-[#16232B]">{vendor.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-normal text-[#075056]">{Math.round((vendor.raisedAmount / vendor.fundingGoal) * 100)}%</p>
                    <p className="text-[10px] text-[#16232B] uppercase">Funded</p>
                  </div>
                </div>
                
                <div className="h-1 bg-[#F8FAFC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF5B04] rounded-full" 
                    style={{ width: `${(vendor.raisedAmount / vendor.fundingGoal) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={`avatar-stack-mobile-${vendor.id}-${i}`} className="w-6 h-6 rounded-full border border-white bg-[#F1F5F9] flex items-center justify-center text-[8px] text-[#16232B]">
                        {i}
                      </div>
                    ))}
                  </div>
                  <button className="text-[11px] px-4 py-2 border border-[#075056] rounded-lg hover:bg-[#075056] hover:text-white transition-all">
                    Invest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isUp, icon: Icon, color }: any) {
  return (
    <div className="border border-[#F1F5F9] p-8 rounded-[1.25rem] space-y-6">
      <div className="flex items-center justify-between text-[#16232B]">
        <Icon size={18} strokeWidth={1.5} />
        <span className={`text-[10px] font-normal ${isUp ? 'text-emerald-500' : 'text-[#FF5B04]'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#16232B] mb-1">{title}</p>
        <p className={`text-2xl font-normal tracking-tight ${color}`}>{value}</p>
      </div>
    </div>
  );
}
