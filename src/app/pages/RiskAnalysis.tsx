import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  ShieldAlert, 
  TrendingDown, 
  Target, 
  Activity, 
  Zap, 
  AlertTriangle,
  ChevronRight,
  Download,
  Share2,
  FileSearch,
  Map,
  Layers,
  HeartPulse
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from "motion/react";

const RISK_HISTORY = [
  { time: '08:00', risk: 10 },
  { time: '10:00', risk: 15 },
  { time: '12:00', risk: 45 },
  { time: '14:00', risk: 82 },
  { time: '16:00', risk: 78 },
];

const MITIGATION_STEPS = [
  { id: 1, title: "Liquidity Injection", status: "Recommended", description: "Inject ₹5,00,000 into Commercial Street Silks node to prevent bankruptcy cascade." },
  { id: 2, title: "Logistics Rerouting", status: "Queued", description: "Divert regional shipments through Varanasi hub to bypass logistics failure." },
  { id: 3, title: "Stakeholder Notification", status: "Sent", description: "Automated alert sent to primary investors regarding regional volatility." },
];

export function RiskAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-[#E4EEF0] flex items-center justify-center text-[#075056]/40 hover:bg-white hover:text-[#075056] transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl text-[#075056]">Critical Risk Dossier</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#FF5B04] font-bold">Analysis ID: {id || 'RESCUE_77'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3 rounded-2xl border border-[#E4EEF0] text-[#075056]/40 hover:text-[#075056] hover:bg-white transition-all">
            <Share2 size={18} />
          </button>
          <button className="flex items-center space-x-2 bg-[#075056] text-white px-6 py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-all">
            <Download size={16} />
            <span>Export Full Dossier</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Analysis Panel */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-[#075056] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <ShieldAlert size={160} />
             </div>
             
             <div className="relative z-10 space-y-8">
                <div className="flex items-center space-x-3">
                   <div className="w-12 h-12 rounded-2xl bg-[#FF5B04] flex items-center justify-center">
                      <AlertTriangle size={24} />
                   </div>
                   <div className="space-y-1">
                      <h2 className="text-3xl font-light">Commercial Street Silks: <span className="text-[#FF5B04]">Critical Failure Warning</span></h2>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Regional Logistics Breakdown • Sector: Textile</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-white/40">Risk Probability</p>
                      <p className="text-3xl text-[#FF5B04]">82.4%</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-white/40">Potential Impact</p>
                      <p className="text-3xl">₹42.8L</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-white/40">System Nodes Affected</p>
                      <p className="text-3xl">12</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 md:p-10 space-y-8">
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-lg text-[#075056]">Risk Escalation Timeline</h3>
                   <p className="text-xs text-[#075056]/40">Last 24 hours of operational telemetry</p>
                </div>
                <div className="flex items-center space-x-2 text-[#FF5B04] text-xs font-bold">
                   <TrendingDown size={14} />
                   <span>Critically Increasing</span>
                </div>
             </div>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={RISK_HISTORY}>
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5B04" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF5B04" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8'}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#075056', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '10px' }}
                      itemStyle={{ color: '#FF5B04' }}
                    />
                    <Area type="monotone" dataKey="risk" stroke="#FF5B04" strokeWidth={3} fillOpacity={1} fill="url(#riskGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-8">
             <h3 className="text-lg text-[#075056]">Mitigation Strategy</h3>
             <div className="space-y-6">
                {MITIGATION_STEPS.map((step) => (
                  <div key={step.id} className="space-y-3 p-6 bg-[#F8FAFC] rounded-3xl border border-[#E4EEF0]">
                     <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-[#075056]">{step.title}</h4>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          step.status === 'Recommended' ? 'bg-[#FF5B04]/10 text-[#FF5B04]' : 
                          step.status === 'Queued' ? 'bg-[#075056]/10 text-[#075056]' : 
                          'bg-[#16232B]/10 text-[#16232B]'
                        }`}>
                          {step.status}
                        </span>
                     </div>
                     <p className="text-xs text-[#075056]/60 leading-relaxed">{step.description}</p>
                  </div>
                ))}
             </div>
             <button 
               onClick={() => navigate(`/resolve/${id || 'RESCUE_77'}`)}
               className="w-full py-5 bg-[#FF5B04] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#FF5B04]/20"
             >
                Execute Rescue Protocol
             </button>
          </div>

          <div className="bg-[#16232B] rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <HeartPulse size={80} />
             </div>
             <div className="space-y-2 relative z-10">
                <p className="text-[10px] uppercase tracking-widest text-white/40">System Recovery Projection</p>
                <p className="text-3xl font-light">Expected: 94%</p>
             </div>
             <p className="text-xs text-white/60 leading-relaxed relative z-10">
                Execution of protocol RESCUE_77 is expected to stabilize the Surat node within 6 operational hours.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
