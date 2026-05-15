import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Info,
  MapPin,
  Calendar,
  DollarSign,
  Activity,
  Calculator,
  Sparkles,
  Zap,
  Briefcase,
  MessageSquare,
  ShieldAlert,
  Award,
  Rocket,
  BrainCircuit,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStakeholder } from "../context";
import { CreditInsight } from "../components/CreditInsight";
import { ReturnValidator } from "../components/ReturnValidator";

export function VendorReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { queue } = useStakeholder();
  const [decision, setDecision] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [profitScore, setProfitScore] = useState<number | null>(null);

  const vendor = queue.find(v => v.id === id) || queue[0];

  const caseData = {
    id: id || "V-1234",
    vendorName: "Banaras Handlooms",
    category: "Handicrafts & Textiles",
    requestAmount: "₹25,00,000",
    purpose: "Raw Material Inventory Surge",
    term: "18 Months",
    expectedReturn: "14.5% APR",
    status: "Priority Review",
    score: 84
  };

  const [activeTab, setActiveTab] = useState("Context");

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      setProfitScore(92);
      setSimulating(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-32 px-0 md:px-4 lg:px-12 space-y-8 md:space-y-10">
      {/* Top Navigation & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0">
        <div className="flex items-center space-x-4 md:space-x-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white border border-[#E4EEF0] flex items-center justify-center text-[#075056] hover:bg-[#075056] hover:text-white transition-all shadow-sm shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 md:space-x-3">
              <h1 className="text-xl md:text-3xl text-[#075056] font-light">Deep Audit: <span className="font-bold">{vendor.vendorName}</span></h1>
              <span className="hidden sm:inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 shrink-0">
                {vendor.type}
              </span>
            </div>
            <p className="text-[10px] md:text-sm text-[#075056]/40">Underwriter Terminal • {caseData.id}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-md p-1.5 rounded-[20px] md:rounded-[24px] border border-[#E4EEF0] overflow-x-auto no-scrollbar">
          {["Context", "Risk", "AI Insights", "Simulation"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#075056] text-white shadow-lg shadow-[#075056]/20' : 'text-[#075056]/40 hover:text-[#075056]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Data & Insights */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === "Context" && (
              <motion.div 
                key="context"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* AI DECISION SUPPORT SYSTEM (Small version for context) */}
                <div className="bg-[#075056] md:rounded-[40px] p-6 md:p-10 text-white overflow-hidden relative group rounded-none">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                    <BrainCircuit size={160} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-4">
                      <Sparkles size={24} className="text-[#FF5B04]" />
                      <h3 className="text-xl font-light">Contextual Intelligence</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                      System analysis based on current liquidity and node history suggests <span className="text-[#FF5B04] font-bold">{vendor.suggestedAction}</span>.
                    </p>
                  </div>
                </div>

                {/* DATA TABLES / CONTEXT */}
                <div className="bg-white border border-[#E4EEF0] md:rounded-[40px] p-6 md:p-8 space-y-8 rounded-[32px]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg text-[#075056]">Transaction Context</h3>
                    <button className="text-[9px] md:text-[10px] text-[#075056]/40 uppercase tracking-widest font-bold hover:text-[#075056]">View Ledger</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { date: '12 Apr 2026', type: 'Node Collection', amount: '+ ₹1,42,000', status: 'Secured' },
                      { date: '10 Apr 2026', type: 'Investor Payout', amount: '- ₹85,000', status: 'Processing' },
                      { date: '08 Apr 2026', type: 'Node Collection', amount: '+ ₹2,10,000', status: 'Secured' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 md:p-5 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] hover:scale-[1.01] transition-transform">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white border border-[#E4EEF0] flex items-center justify-center text-[#075056]/20 shrink-0">
                            <DollarSign size={14} md:size={16} />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[11px] md:text-xs font-medium text-[#075056]">{tx.type}</p>
                            <p className="text-[8px] md:text-[10px] text-[#075056]/40">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-0.5">
                          <p className={`text-xs md:text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-[#075056]'}`}>{tx.amount}</p>
                          <p className="text-[8px] md:text-[9px] text-[#075056]/30 uppercase tracking-widest font-bold">{tx.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Risk" && (
              <motion.div 
                key="risk"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-[#E4EEF0] md:rounded-[40px] p-8 space-y-6 rounded-[32px]">
                    <div className="flex items-center space-x-3 text-emerald-600">
                      <TrendingUp size={20} />
                      <h3 className="text-sm font-bold text-[#075056] uppercase tracking-widest">Revenue Velocity</h3>
                    </div>
                    <ReturnValidator />
                  </div>

                  <div className="bg-white border border-[#E4EEF0] md:rounded-[40px] p-8 space-y-6 rounded-[32px]">
                    <div className="flex items-center space-x-3 text-orange-600">
                      <ShieldAlert size={20} />
                      <h3 className="text-sm font-bold text-[#075056] uppercase tracking-widest">Credit Insight</h3>
                    </div>
                    <CreditInsight score={vendor.cibilScore} rating={vendor.platformRating} />
                  </div>
                </div>
                
                <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <ShieldCheck size={24} className="text-[#075056]" />
                    <h3 className="text-xl font-light text-[#075056]">Systematic Risk Factor</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {vendor.trustIndicators?.map((ind, i) => (
                      <div key={i} className={`p-6 rounded-3xl border transition-all ${
                        ind.active ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-[#F8FAFC] border-[#E4EEF0] text-[#075056]/40'
                      }`}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2">{ind.type}</p>
                        <p className="text-sm font-medium">{ind.active ? 'Verified' : 'Pending Audit'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "AI Insights" && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-[#075056] md:rounded-[40px] p-10 text-white overflow-hidden relative group rounded-none">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                    <BrainCircuit size={160} />
                  </div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#FF5B04] shrink-0">
                          <Sparkles size={24} className="animate-pulse" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Neural Verification Model</p>
                          <h3 className="text-xl font-light">AI Intelligence recommendation</h3>
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Confidence Score</p>
                        <p className="text-3xl font-medium text-[#FF5B04]">94.8%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 space-y-4">
                        <div className="flex items-center space-x-3 text-[#FF5B04]">
                          <CheckCircle2 size={18} />
                          <h4 className="text-sm font-bold uppercase tracking-widest">Suggested Action</h4>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed font-bold uppercase tracking-widest">
                          {vendor.suggestedAction}
                        </p>
                        <p className="text-sm text-white/50 leading-relaxed italic">
                          {vendor.suggestionReason}
                        </p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 space-y-4">
                        <div className="flex items-center space-x-3 text-emerald-400">
                          <TrendingUp size={18} />
                          <h4 className="text-sm font-bold uppercase tracking-widest">Growth Signal</h4>
                        </div>
                        <div className="space-y-3">
                          {vendor.signals?.map((sig, i) => (
                            <div key={i} className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{sig.label}</span>
                              <span className="text-[10px] text-white font-bold">{sig.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Simulation" && (
              <motion.div 
                key="simulation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-10 space-y-10">
                  <div className="flex items-center space-x-4">
                    <Rocket size={24} className="text-[#FF5B04]" />
                    <h3 className="text-xl font-light text-[#075056]">Scenario Stress Testing</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <p className="text-sm text-[#075056]/60 leading-relaxed">
                        Simulating this intervention across the next 12 billing cycles based on {vendor.vendorName}'s historic cashflow volatility.
                      </p>
                      <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-bold text-[#075056] uppercase tracking-widest">
                          <span>Projected Stability</span>
                          <span>{profitScore ? profitScore + '%' : 'Pending Simulation'}</span>
                        </div>
                        <div className="h-2 w-full bg-[#F8FAFC] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: profitScore ? `${profitScore}%` : '0%' }}
                            className="h-full bg-[#075056]"
                          />
                        </div>
                      </div>
                      <button 
                        onClick={runSimulation}
                        disabled={simulating}
                        className="w-full py-4 bg-[#075056] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF5B04] transition-all shadow-xl shadow-[#075056]/10 disabled:opacity-50"
                      >
                        {simulating ? 'Processing Scenario...' : 'Execute Stress Test'}
                      </button>
                    </div>
                    
                    <div className="p-8 bg-[#F8FAFC] rounded-[32px] border border-[#E4EEF0] flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <p className="text-4xl font-light text-[#075056]">{profitScore || '--'}%</p>
                        <p className="text-[10px] text-[#075056]/40 uppercase tracking-widest font-bold">Safety Margin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Decisions & History */}
        <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8 px-4 md:px-0">
          
          {/* SIMULATOR COMPONENT */}
          <div className="bg-white border-2 border-[#075056] md:rounded-[40px] p-6 md:p-8 space-y-8 relative overflow-hidden rounded-[32px]">
            <div className="absolute top-0 right-0 p-4 opacity-5 hidden sm:block">
              <Calculator size={80} />
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold">Smart Analysis</p>
              <h3 className="text-base md:text-lg text-[#075056]">Profitability Simulator</h3>
            </div>

            {simulating ? (
              <div className="h-48 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#075056]/10 border-t-[#FF5B04] rounded-full animate-spin"></div>
                <p className="text-[10px] text-[#075056]/40 uppercase tracking-[0.2em] font-bold">Calculating Scenarios...</p>
              </div>
            ) : profitScore ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-48 flex flex-col items-center justify-center space-y-2">
                <p className="text-5xl font-light text-[#075056]">{profitScore}%</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Projected Stability</p>
                <button onClick={() => setProfitScore(null)} className="text-[10px] text-[#075056]/30 underline mt-4">Reset Simulation</button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <p className="text-xs text-[#075056]/60 leading-relaxed">
                  Analyze how this funding request will affect your pool liquidity over 12 months.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-[#075056]">
                      <span>INTEREST RATE</span>
                      <span>{caseData.expectedReturn}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden">
                      <div className="h-full bg-[#075056] w-3/4"></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={runSimulation}
                  className="w-full py-4 bg-[#075056] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF5B04] transition-all shadow-xl shadow-[#075056]/10"
                >
                  Run AI Simulation
                </button>
              </div>
            )}
          </div>

          {/* FINAL DECISION PANEL */}
          <div className="bg-white border border-[#E4EEF0] md:rounded-[40px] p-6 md:p-8 space-y-6 md:space-y-8 rounded-[32px]">
            <h3 className="text-[10px] md:text-sm font-bold text-[#075056] uppercase tracking-widest">Final Intervention</h3>
            <div className="space-y-3 md:space-y-4">
              <button 
                onClick={() => setDecision('Approve')}
                className={`w-full py-3.5 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-3 ${
                  decision === 'Approve' ? 'bg-emerald-600 text-white' : 'bg-white border border-[#E4EEF0] text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 size={16} />
                <span>Authorize Funding</span>
              </button>
              <button 
                onClick={() => setDecision('Flag')}
                className={`w-full py-3.5 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-3 ${
                  decision === 'Flag' ? 'bg-orange-600 text-white' : 'bg-white border border-[#E4EEF0] text-orange-600 hover:bg-orange-50'
                }`}
              >
                <AlertTriangle size={16} />
                <span>Flag for Review</span>
              </button>
              <button 
                onClick={() => setDecision('Reject')}
                className={`w-full py-3.5 md:py-4 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-3 ${
                  decision === 'Reject' ? 'bg-[#16232B] text-white' : 'bg-white border border-[#E4EEF0] text-[#16232B] hover:bg-[#16232B] hover:text-white'
                }`}
              >
                <XCircle size={16} />
                <span>Reject Protocol</span>
              </button>
            </div>
            {decision && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-[#F1F5F9]">
                <p className="text-[9px] text-[#075056]/40 italic mb-4 text-center">Decision logged to secure ledger node.</p>
                <button 
                  onClick={() => {
                    const statusMap: Record<string, string> = {
                      'Approve': 'Approved',
                      'Flag': 'Flagged',
                      'Reject': 'Rejected'
                    };
                    navigate(`/vendors?status=${statusMap[decision]}`);
                  }} 
                  className="w-full py-3.5 bg-[#FF5B04] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#FF5B04]/20 hover:scale-[1.02] transition-transform"
                >
                  Confirm & Finalize Audit
                </button>
              </motion.div>
            )}
          </div>

          {/* ENTITY HISTORY */}
          <div className="bg-[#F8FAFC] md:rounded-[40px] p-6 md:p-8 space-y-6 border border-[#E4EEF0] rounded-[32px]">
            <h3 className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Entity History</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { event: 'KYC Renewed', date: 'Jan 2026', icon: ShieldCheck },
                { event: 'Previous Funding', date: 'Sep 2024', icon: Briefcase },
                { event: 'Onboarding', date: 'Feb 2024', icon: Activity },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#075056]/20 shrink-0">
                    <item.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] md:text-xs font-medium text-[#075056]">{item.event}</p>
                    <p className="text-[9px] md:text-[10px] text-[#075056]/30">{item.date}</p>
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
