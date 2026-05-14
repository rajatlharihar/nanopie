import React, { useState } from "react";
import { 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Activity, 
  Download, 
  ChevronDown,
  ArrowUpRight,
  Target,
  Layers,
  FileText,
  Plus,
  AlertTriangle,
  HeartPulse,
  BrainCircuit,
  ArrowRight,
  FileDown,
  Check,
  Globe,
  MapPin,
  LocateFixed,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router";
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from "motion/react";
import { GeoMap } from "../components/GeoMap";
import { MOCK_VENDORS } from "../data";

const FORECAST_DATA = [
  { month: 'Apr', projected: 450000, actual: 420000 },
  { month: 'May', projected: 520000, actual: null },
  { month: 'Jun', projected: 480000, actual: null },
  { month: 'Jul', projected: 610000, actual: null },
  { month: 'Aug', projected: 700000, actual: null },
];

const SECTOR_INTENSITY = [
  { name: 'Agri', score: 12, trend: 'up' },
  { name: 'Food', score: 45, trend: 'down' },
  { name: 'Retail', score: 22, trend: 'stable' },
  { name: 'Tech', score: 8, trend: 'up' },
  { name: 'Logistics', score: 34, trend: 'up' },
];

export function Intelligence() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<'Weekly' | 'Monthly'>('Monthly');
  const [showIntervention, setShowIntervention] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const systemReports = [
    { title: "Quarterly Compliance Audit", date: "Mar 31, 2026", type: "Security", size: "2.4 MB" },
    { title: "Monthly Vendor Distribution", date: "Apr 01, 2026", type: "Operational", size: "1.1 MB" },
    { title: "Investment Risk Analysis", date: "Apr 15, 2026", type: "Financial", size: "4.8 MB" },
    { title: "KYC/AML Batch Review", date: "Yesterday", type: "Compliance", size: "0.8 MB" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 pb-32 px-0 md:px-4 lg:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl text-[#075056] tracking-tight">Intelligence Terminal</h1>
          <p className="text-xs md:text-sm text-[#075056]/40 italic">System reports and analytical insights.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 bg-white border border-[#E4EEF0] px-4 py-2.5 rounded-2xl text-[9px] md:text-[10px] text-[#075056] font-bold w-full sm:w-auto justify-center">
            <LocateFixed size={14} className="text-[#FF5B04]" />
            <span>INDIA REGION: ACTIVE</span>
          </div>
          <button className="flex items-center justify-center space-x-2 bg-[#075056] text-white px-6 py-3 md:py-2.5 rounded-2xl text-[10px] md:text-xs hover:opacity-90 transition-all shadow-lg shadow-[#075056]/20 w-full sm:w-auto">
            <Download size={14} />
            <span>Export Intelligence</span>
          </button>
        </div>
      </div>

      {/* Geospatial Map Section */}
      <div className="space-y-6 px-4 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#075056]/5 flex items-center justify-center text-[#075056]">
              <Globe size={20} />
            </div>
            <h2 className="text-lg md:text-xl text-[#075056]">Global Node Surveillance</h2>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 self-start sm:self-auto">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">98.4% Uptime</span>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden border border-[#E4EEF0] bg-white p-2 h-[350px] md:h-[500px] shadow-sm">
          <GeoMap />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8 px-4 md:px-0">
        {/* Risk Forecaster */}
        <div className="col-span-12 lg:col-span-7 bg-white border border-[#E4EEF0] md:rounded-[40px] p-6 md:p-10 space-y-8 md:space-y-10 rounded-[32px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base md:text-lg text-[#075056]">Network Growth</h3>
              <p className="text-[10px] md:text-xs text-[#075056]/40">Projected vs Actual node distribution.</p>
            </div>
            <div className="flex space-x-2 bg-[#F8FAFC] p-1 rounded-xl self-start sm:self-auto">
              {['Weekly', 'Monthly'].map(t => (
                <button 
                  key={t}
                  onClick={() => setReportType(t as any)}
                  className={`px-4 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold transition-all ${reportType === t ? 'bg-white shadow-sm text-[#075056]' : 'text-[#075056]/30'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FORECAST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#075056" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#075056" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '15px' }}
                  itemStyle={{ fontSize: '9px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="projected" stroke="#075056" strokeWidth={3} fillOpacity={1} fill="url(#colorProj)" />
                <Line type="monotone" dataKey="actual" stroke="#FF5B04" strokeWidth={3} dot={{ r: 4, fill: '#FF5B04', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-[#F1F5F9]">
            {[
              { label: 'Forecast', val: '94.2%', color: 'text-[#075056]' },
              { label: 'Signal', val: 'High', color: 'text-emerald-600' },
              { label: 'Latency', val: '142ms', color: 'text-[#075056]' }
            ].map(stat => (
              <div key={stat.label} className="space-y-1 text-center sm:text-left">
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#075056]/30 font-bold">{stat.label}</p>
                <p className={`text-sm md:text-lg font-medium ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Intensity Bar Chart */}
        <div className="col-span-12 lg:col-span-5 bg-[#075056] rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-8 md:space-y-10 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-5 hidden sm:block">
            <Target size={200} />
          </div>
          
          <div className="relative z-10 space-y-1">
            <h3 className="text-base md:text-lg font-light">Sector Intensity</h3>
            <p className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-widest">Market Penetration</p>
          </div>

          <div className="h-48 md:h-64 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SECTOR_INTENSITY} margin={{ left: -30 }}>
                <Bar dataKey="score" radius={[8, 8, 8, 8]}>
                  {SECTOR_INTENSITY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? '#FF5B04' : 'rgba(255,255,255,0.1)'} />
                  ))}
                </Bar>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.4)' }} dy={10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#075056', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 relative z-10">
            {SECTOR_INTENSITY.slice(0, 3).map(sector => (
              <div key={sector.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${sector.trend === 'up' ? 'bg-emerald-500' : 'bg-[#FF5B04]'}`}></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{sector.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs">{sector.score}%</span>
                  <ArrowUpRight size={14} className={sector.trend === 'up' ? 'text-emerald-500' : 'text-white/20'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Library Section */}
      <div className="space-y-8 px-4 md:px-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF5B04]/5 flex items-center justify-center text-[#FF5B04]">
            <FileText size={20} />
          </div>
          <h2 className="text-lg md:text-xl text-[#075056]">Report Library</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {systemReports.map((report, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white border border-[#E4EEF0] rounded-[32px] p-6 space-y-6 hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-[#075056]/40 group-hover:bg-[#075056] group-hover:text-white transition-all">
                  <FileDown size={20} />
                </div>
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#075056]/30 group-hover:text-[#FF5B04]">{report.type}</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs md:text-sm font-medium text-[#075056] group-hover:text-[#075056]">{report.title}</h4>
                <p className="text-[9px] md:text-[10px] text-[#075056]/40">{report.date} • {report.size}</p>
              </div>
              <button 
                onClick={() => {
                  setDownloadingId(report.title);
                  setTimeout(() => setDownloadingId(null), 2000);
                }}
                className={`w-full py-3 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  downloadingId === report.title 
                    ? 'bg-emerald-500 text-white border-emerald-500' 
                    : 'bg-white text-[#075056] border-[#E4EEF0] hover:bg-[#075056] hover:text-white hover:border-[#075056]'
                }`}
              >
                {downloadingId === report.title ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Check size={12} />
                    <span>Success</span>
                  </span>
                ) : 'Download'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
