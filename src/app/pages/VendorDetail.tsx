import React from "react";
import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  ExternalLink,
  CheckCircle2,
  XCircle,
  FileText,
  TrendingUp,
  Globe,
  Award,
  Zap,
  Target
} from "lucide-react";
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { motion } from "motion/react";
import { MOCK_VENDORS } from "../data";
import { CreditInsight } from "../components/CreditInsight";
import { ReturnValidator } from "../components/ReturnValidator";

const REVENUE_HISTORY = [
  { month: 'Jan', amount: 420000 },
  { month: 'Feb', amount: 450000 },
  { month: 'Mar', amount: 480000 },
  { month: 'Apr', amount: 510000 },
  { month: 'May', amount: 540000 },
  { month: 'Jun', amount: 580000 },
];

export function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = MOCK_VENDORS.find(v => v.id === id) || MOCK_VENDORS[0];

  return (
    <div className="max-w-7xl mx-auto pb-32 px-4 md:px-8 lg:px-12 space-y-12">
      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-14 h-14 rounded-3xl bg-white border border-[#E4EEF0] flex items-center justify-center text-[#075056] hover:bg-[#075056] hover:text-white transition-all shadow-sm group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl text-[#075056] font-light">Audit Terminal: <span className="font-bold">{vendor.name}</span></h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">
                <MapPin size={12} />
                <span>{vendor.location}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#E4EEF0]"></div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">
                <Calendar size={12} />
                <span>Joined {vendor.joinedDate || 'Jan 2024'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 bg-white border border-[#E4EEF0] text-[#075056] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#075056] transition-all">
            Export Audit
          </button>
          <button 
            onClick={() => navigate(`/review/${vendor.id}`)}
            className="px-8 py-3 bg-[#FF5B04] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF5B04]/20"
          >
            Initiate Intervention
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Total Revenue', val: '₹1.2Cr', trend: '+12%', icon: TrendingUp },
          { label: 'Market Nodes', val: '24', trend: '+2', icon: Globe },
          { label: 'Trust Rating', val: vendor.platformRating || 'A', trend: 'Stable', icon: Award },
          { label: 'Risk Factor', val: vendor.riskScore + '%', trend: '-2%', icon: Target }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-[#E4EEF0] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-[#075056]/5 flex items-center justify-center text-[#075056]/20">
                <stat.icon size={20} />
              </div>
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold">{stat.label}</p>
              <p className="text-2xl text-[#075056] font-medium">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Revenue Velocity Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-[#E4EEF0] rounded-[48px] p-10 space-y-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl text-[#075056]">Revenue Performance</h3>
              <p className="text-sm text-[#075056]/40">Verified collection velocity across 6 months.</p>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-[#F8FAFC] rounded-xl border border-[#E4EEF0]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-bold text-[#075056] uppercase tracking-widest">Live Ledger Verified</span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_HISTORY}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#075056" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#075056" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', padding: '20px' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#075056" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-8 border-t border-[#F8FAFC]">
            <ReturnValidator />
          </div>
        </div>

        {/* Intelligence Side Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-[#075056] rounded-[48px] p-8 text-white space-y-8 shadow-xl shadow-[#075056]/10 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Risk Assessment</p>
              <h3 className="text-xl font-light">Security Profiling</h3>
            </div>
            
            <div className="space-y-6 relative z-10">
              <CreditInsight score={vendor.cibilScore} rating={vendor.platformRating} />
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Verification Status</p>
                <div className="space-y-3">
                  {[
                    { label: 'KYC Document Audit', status: 'Verified', icon: CheckCircle2, color: 'text-emerald-400' },
                    { label: 'Geo-location Match', status: 'High Accuracy', icon: ShieldCheck, color: 'text-emerald-400' },
                    { label: 'Network Stability', status: 'Normal', icon: Zap, color: 'text-orange-400' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3 text-white/60">
                        <item.icon size={14} className={item.color} />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-bold">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white border border-[#E4EEF0] rounded-[48px] p-8 space-y-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#075056] uppercase tracking-widest px-2">Contact Details</h3>
            <div className="space-y-4">
              {[
                { label: 'Mobile Node', val: '+91 98765 43210', icon: Phone },
                { label: 'Primary Email', val: 'contact@banaras.com', icon: Mail },
                { label: 'Regional Office', val: 'Varanasi, UP, India', icon: ExternalLink }
              ].map((info, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] hover:border-[#075056]/20 transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#075056]/20 shadow-sm">
                    <info.icon size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#075056]/30 font-bold">{info.label}</p>
                    <p className="text-sm text-[#075056] font-medium">{info.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
