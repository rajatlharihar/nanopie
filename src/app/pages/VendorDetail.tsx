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
  Target,
  Users,
  Star,
  Layers,
  Activity
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
  { month: 'Jan', amount: 42000 },
  { month: 'Feb', amount: 45000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 51000 },
  { month: 'May', amount: 54000 },
  { month: 'Jun', amount: 58000 },
];

export function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = MOCK_VENDORS.find(v => v.id === id) || MOCK_VENDORS[0];

  return (
    <div className="max-w-7xl mx-auto pb-32 px-0 md:px-4 lg:px-12 space-y-8 md:space-y-12 relative">
      {/* INTELLIGENCE INSIGHT NOTIFICATION */}
      {vendor.insightNotification && (
        <motion.div 
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          className="fixed top-24 right-6 md:top-28 md:right-10 z-50 w-[calc(100%-3rem)] md:w-[440px]"
        >
          <div className="bg-white/90 backdrop-blur-xl p-5 rounded-[32px] shadow-2xl shadow-[#075056]/10 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#E4EEF0]">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5B04]/10 flex items-center justify-center shrink-0">
                <Zap size={24} className="text-[#FF5B04] animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#075056]/40">Intelligence Insight</p>
                <h4 className="text-sm font-bold leading-tight text-[#075056]">{vendor.insightNotification.title}</h4>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/review/${vendor.id}`)}
              className="px-6 py-3 bg-[#FF5B04] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#FF5B04]/20 shrink-0"
            >
              {vendor.insightNotification.actionLabel}
            </button>
          </div>
        </motion.div>
      )}

      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-4 md:px-0">
        <div className="flex items-center space-x-4 md:space-x-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-white border border-[#E4EEF0] flex items-center justify-center text-[#075056] hover:bg-[#075056] hover:text-white transition-all shadow-sm group shrink-0"
          >
            <ArrowLeft size={20} md:size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="space-y-1">
            <h1 className="text-xl md:text-4xl text-[#075056] font-light">Audit Terminal: <span className="font-bold">{vendor.name}</span></h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
              <div className="flex items-center space-x-2 text-[8px] md:text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">
                <MapPin size={12} />
                <span>{vendor.location}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[#E4EEF0]"></div>
              <div className="flex items-center space-x-2 text-[8px] md:text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">
                <Calendar size={12} />
                <span>Started in {vendor.joinedDate?.split(',')[1] || ' 2022'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto px-6 py-3.5 md:py-3 bg-white border border-[#E4EEF0] text-[#075056] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#075056] transition-all">
            Export Audit
          </button>
          <button 
            onClick={() => navigate(`/review/${vendor.id}`)}
            className="w-full sm:w-auto px-8 py-3.5 md:py-3 bg-[#FF5B04] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF5B04]/20"
          >
            Initiate Intervention
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0">
        {[
          { label: 'Monthly Revenue', val: '₹' + (vendor.raisedAmount / 2).toLocaleString('en-IN'), trend: '+12%', icon: TrendingUp },
          { label: 'Avg Daily Earnings', val: '₹' + Math.floor(vendor.raisedAmount / 60).toLocaleString('en-IN'), trend: '+2%', icon: Activity },
          { label: 'Trust Factor', val: vendor.platformRating || 'A', trend: 'Stable', icon: Award },
          { label: 'Risk Factor', val: vendor.riskScore + '%', trend: '-2%', icon: Target }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-[#E4EEF0] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-[#075056]/5 flex items-center justify-center text-[#075056]/20 shrink-0">
                <stat.icon size={20} />
              </div>
              <span className={`text-[8px] md:text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold">{stat.label}</p>
              <p className="text-xl md:text-2xl text-[#075056] font-medium">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 md:gap-8 px-4 md:px-0">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Revenue Velocity Chart */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-10 space-y-8 md:space-y-10 shadow-sm rounded-[32px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl text-[#075056]">Revenue Performance</h3>
                <p className="text-xs md:text-sm text-[#075056]/40">Verified monthly collections (Capped at 1L).</p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#F8FAFC] rounded-xl border border-[#E4EEF0] self-start sm:self-auto">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] md:text-[9px] font-bold text-[#075056] uppercase tracking-widest">Live Ledger Verified</span>
              </div>
            </div>

            <div className="h-64 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vendor.revenueHistory} margin={{ left: -20 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#075056" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#075056" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', padding: '15px' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#075056" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Competitor Analysis */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-10 space-y-8 shadow-sm rounded-[32px]">
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl text-[#075056]">Competitor Analysis</h3>
              <p className="text-xs md:text-sm text-[#075056]/40">Market share vs local micro-competitors.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {vendor.competitors.map(comp => (
                  <div key={comp.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#075056]">
                      <span>{comp.name}</span>
                      <span>{comp.share}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#F8FAFC] rounded-full overflow-hidden">
                      <div className={`h-full ${comp.color}`} style={{ width: `${comp.share}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-[#E4EEF0] space-y-4">
                <h4 className="text-xs font-bold text-[#075056] uppercase tracking-widest">Market Insight</h4>
                <p className="text-xs text-[#075056]/60 leading-relaxed italic">
                  "{vendor.name} holds a strong {vendor.competitors[1].share}% niche in {vendor.location.split(',')[0]}, primarily driven by customer loyalty and verified high-frequency transactions."
                </p>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-10 space-y-8 shadow-sm rounded-[32px]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl text-[#075056]">Sentiment Node</h3>
                <p className="text-xs md:text-sm text-[#075056]/40">Verified customer feedback logs.</p>
              </div>
              <div className="flex items-center space-x-1 text-[#FF5B04]">
                <Star size={16} fill="#FF5B04" />
                <span className="text-lg font-bold">4.8</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendor.reviews.map((rev, i) => (
                <div key={i} className="p-6 bg-[#F8FAFC] rounded-3xl border border-[#E4EEF0] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#075056] uppercase">{rev.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < rev.rating ? "#FF5B04" : "none"} className="text-[#FF5B04]" />)}
                    </div>
                  </div>
                  <p className="text-xs text-[#075056]/60 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Artifacts / Documents */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-10 space-y-8 shadow-sm rounded-[32px]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl text-[#075056]">Verification Artifacts</h3>
                <p className="text-xs md:text-sm text-[#075056]/40">Secured KYC and legal documentation vault.</p>
              </div>
              <div className="px-4 py-2 bg-[#F8FAFC] rounded-xl border border-[#E4EEF0]">
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">All Verified</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vendor.documents.map((doc, i) => (
                <div key={i} className="group p-5 bg-[#F8FAFC] rounded-[32px] border border-[#E4EEF0] hover:border-[#075056]/30 transition-all cursor-pointer flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#075056]/20 group-hover:text-[#075056]/40 transition-colors shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#075056]">{doc.name}</p>
                      <p className="text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold">{doc.type} • {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#075056]/40">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capital Stack / Investor Ledger */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-10 space-y-8 shadow-sm rounded-[32px]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl text-[#075056]">Capital Stack</h3>
                <p className="text-xs md:text-sm text-[#075056]/40">Active backing and return structure for this node.</p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#F8FAFC] rounded-xl border border-[#E4EEF0]">
                <Users size={16} className="text-[#075056]/40" />
                <span className="text-[9px] font-bold text-[#075056] uppercase tracking-widest">{vendor.investorsCount} Backers</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {vendor.investments.map((inv, i) => (
                <div key={i} className="group p-6 bg-[#F8FAFC] rounded-[32px] border border-[#E4EEF0] hover:border-[#FF5B04]/30 transition-all flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-5 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#075056]/20 group-hover:text-[#FF5B04]/40 transition-colors shadow-sm shrink-0">
                      <Users size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[#075056]">{inv.investorName}</p>
                      <p className="text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold">Verified Backer • {inv.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-12">
                    <div className="space-y-1 text-left sm:text-right">
                      <p className="text-[8px] uppercase tracking-widest text-[#075056]/30 font-bold">Contribution</p>
                      <p className="text-sm font-bold text-[#075056]">₹{inv.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[8px] uppercase tracking-widest text-[#075056]/30 font-bold">Return Plan</p>
                      <div className="px-3 py-1 bg-white rounded-full border border-[#E4EEF0] inline-block">
                        <span className="text-[10px] font-bold text-[#FF5B04]">{inv.returnPlan}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex items-center justify-center">
              <button className="text-[10px] font-bold text-[#075056]/40 uppercase tracking-[0.2em] hover:text-[#075056] transition-colors">
                View All Transaction Nodes
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Risk Assessment Panel */}
          <div className="bg-[#075056] md:rounded-[48px] p-6 md:p-8 text-white space-y-8 shadow-xl shadow-[#075056]/10 relative overflow-hidden rounded-[32px]">
            <div className="absolute bottom-0 right-0 p-8 opacity-10 hidden sm:block">
              <ShieldCheck size={120} />
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Risk Assessment</p>
              <h3 className="text-lg md:text-xl font-light">Security Profiling</h3>
            </div>
            
            <div className="space-y-6 relative z-10">
              <CreditInsight score={vendor.cibilScore} rating={vendor.platformRating} />
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 font-bold">Verification Status</p>
                <div className="space-y-3">
                  {[
                    { label: 'KYC Document Audit', status: 'Verified', icon: CheckCircle2, color: 'text-emerald-400' },
                    { label: 'CIBIL Score Context', status: vendor.cibilScore > 700 ? 'Excellent' : 'Average', icon: Layers, color: 'text-emerald-400' },
                    { label: 'Regional Network', status: 'Normal', icon: Globe, color: 'text-emerald-400' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] md:text-xs">
                      <div className="flex items-center space-x-3 text-white/60">
                        <item.icon size={14} className={item.color + " shrink-0"} />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-bold whitespace-nowrap">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Geospatial Map Context */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-8 space-y-6 shadow-sm rounded-[32px]">
            <div className="flex items-center space-x-3 px-2">
              <Globe size={18} className="text-[#075056]/20" />
              <h3 className="text-xs md:text-sm font-bold text-[#075056] uppercase tracking-widest">Geo Context</h3>
            </div>
            <div className="h-40 bg-[#F8FAFC] rounded-3xl border border-[#E4EEF0] flex flex-col items-center justify-center space-y-2 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50"></div>
              <div className="relative z-10 text-center space-y-1">
                <p className="text-[10px] font-bold text-[#075056]">{vendor.lat.toFixed(4)}° N, {vendor.lng.toFixed(4)}° E</p>
                <p className="text-[9px] text-[#075056]/40 uppercase tracking-widest font-bold">{vendor.location}</p>
              </div>
              <div className="w-full h-full absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <Layers size={100} />
              </div>
            </div>
          </div>

          {/* Direct Chat & Communications */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[48px] p-6 md:p-8 space-y-6 shadow-sm rounded-[32px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 hidden sm:block">
              <MessageSquare size={80} />
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#075056]/40 font-bold">Encrypted Comms</p>
              <h3 className="text-base md:text-lg font-light text-[#075056]">Direct Chat</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4 relative z-10">
              <div className="flex items-center space-x-4 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] hover:border-[#FF5B04]/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#FF5B04] shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] md:text-sm text-[#075056] font-medium truncate">Open Secure Chat</p>
                  <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold">Vendor is Online</p>
                </div>
                <ExternalLink size={14} className="text-[#075056]/20 group-hover:text-[#FF5B04]" />
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] hover:border-[#075056]/20 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#075056]/20 shadow-sm shrink-0">
                  <Phone size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#075056]/30 font-bold">Mobile Node</p>
                  <p className="text-[11px] md:text-sm text-[#075056] font-medium truncate">+91 98765 43210</p>
                </div>
              </div>
            </div>
            
            <button className="relative z-10 w-full py-4 bg-[#075056] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF5B04] transition-all shadow-xl shadow-[#075056]/10 flex items-center justify-center space-x-2">
              <Zap size={14} className="text-[#FF5B04]" />
              <span>Send Urgent Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

