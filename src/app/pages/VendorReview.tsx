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
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStakeholder } from "../context";
import { CreditInsight } from "../components/CreditInsight";
import { ReturnValidator } from "../components/ReturnValidator";

export function VendorReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [profitScore, setProfitScore] = useState<number | null>(null);

  const caseData = {
    id: id || "V-1234",
    vendorName: "Banaras Handlooms",
    category: "Handicrafts & Textile",
    location: "Varanasi, UP, India",
    requestAmount: "₹12,50,000",
    kycStatus: "Partially Verified",
    trustSignal: "Limited Data",
    description: "Traditional weaving workshop looking for scale-up capital to modernize handloom equipment for export orders.",
    riskFlags: [
      "New Entity (Surfaced 3 months ago)",
      "Unpredictable Regional Logistics (UP East)",
      "High Seasonality dependence"
    ]
  };

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setProfitScore(87);
      setSimulating(false);
    }, 2000);
  };

  const handleDecision = (type: string) => {
    setDecision(type);
    setTimeout(() => {
      navigate('/vendors');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/vendors')}
          className="flex items-center space-x-2 text-xs text-[#075056]/40 hover:text-[#075056] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Verification Queue</span>
        </button>
        <div className="flex items-center space-x-6">
            <CreditInsight score={vendor.cibilScore} rating={vendor.platformRating} />
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 rounded-[12px] border border-[#E4EEF0] text-xs font-bold uppercase tracking-widest text-[#075056] hover:bg-[#F8FAFC] transition-colors"
              >
                Defer
              </button>
              <button 
                onClick={() => navigate('/success')}
                className="px-8 py-2.5 rounded-[12px] bg-[#FF5B04] text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-[#FF5B04]/20"
              >
                Execute Approval
              </button>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* Left Column: Context & Intelligence */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          
          {/* AI DECISION SUPPORT PANEL - NEW */}
          <div className={`p-8 rounded-[40px] border-2 space-y-6 relative overflow-hidden ${
            vendor.suggestedAction.includes('Recommend') ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'
          }`}>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-3">
                   <div className={`p-2 rounded-xl ${vendor.suggestedAction.includes('Recommend') ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                      <BrainCircuit size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#075056]/40">Neural Decision Model v4.2</p>
                      <h3 className="text-lg font-medium text-[#075056]">AI Recommendation: <span className={vendor.suggestedAction.includes('Recommend') ? 'text-emerald-700' : 'text-orange-700'}>{vendor.suggestedAction}</span></h3>
                   </div>
                </div>
                <p className="text-sm text-[#075056] leading-relaxed italic">
                   "{vendor.suggestionReason}"
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                   {vendor.signals?.map((sig, i) => (
                     <div key={i} className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/40">
                        <div className={`w-1.5 h-1.5 rounded-full ${sig.status === 'Stable' || sig.status === 'Normal' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                        <span className="text-[9px] font-bold text-[#075056] uppercase tracking-widest">{sig.label}: {sig.status}</span>
                     </div>
                   ))}
                </div>
             </div>
             {/* Decorative Background Icon */}
             <div className={`absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 ${vendor.suggestedAction.includes('Recommend') ? 'text-emerald-900' : 'text-orange-900'}`}>
                {vendor.suggestedAction.includes('Recommend') ? <ShieldCheck size={120} /> : <AlertTriangle size={120} />}
             </div>
          </div>
          
          <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-8">
             <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-[#075056] text-white flex items-center justify-center text-3xl font-light">
                  BH
                </div>
                <div>
                  <h2 className="text-2xl text-[#075056]">{caseData.vendorName}</h2>
                  <p className="text-xs text-[#075056]/40">{caseData.category}</p>
                </div>
             </div>

             <div className="space-y-4 pt-6 border-t border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#075056]/40">
                    <MapPin size={14} />
                    <span className="text-xs">Location</span>
                  </div>
                  <span className="text-xs text-[#075056]">{caseData.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#075056]/40">
                    <Briefcase size={14} />
                    <span className="text-xs">Funding Goal</span>
                  </div>
                  <span className="text-xs text-[#075056] font-bold">{caseData.requestAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#075056]/40">
                    <ShieldCheck size={14} />
                    <span className="text-xs">KYC Status</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-[#FF5B04]/10 text-[#FF5B04] rounded-full border border-[#FF5B04]/20 font-bold uppercase">
                    {caseData.kycStatus}
                  </span>
                </div>
             </div>
          </div>

          <div className="bg-[#075056] rounded-[40px] p-8 text-white space-y-6">
             <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Risk Classification</h3>
             <ul className="space-y-4">
               {caseData.riskFlags.map((flag, i) => (
                 <li key={i} className="flex items-start space-x-3 text-xs text-white/60">
                   <AlertCircle size={14} className="text-[#FF5B04] shrink-0 mt-0.5" />
                   <span>{flag}</span>
                 </li>
               ))}
             </ul>
          </div>

          <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5">
                <BrainCircuit size={80} className="text-[#075056]" />
             </div>
             
             <div className="space-y-2 relative z-10">
                <div className="flex items-center space-x-2 text-[#16232B]">
                   <Sparkles size={16} />
                   <h3 className="text-xs font-bold uppercase tracking-widest">AI Strategic Insight</h3>
                </div>
                <p className="text-sm text-[#075056] font-medium">Regional Viability: High Heritage Hub</p>
             </div>

             <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Location Analysis</p>
                   <p className="text-xs text-[#075056]/70 leading-relaxed">Varanasi represents a critical cultural node. While logistics are complex, the artisan density provides a unique supply moat.</p>
                </div>
                
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Business Model</p>
                   <p className="text-xs text-[#075056]/70 leading-relaxed">Direct-to-Consumer export potential is massive. Transition from local middlemen to Nanopie-verified global fulfillment.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F1F5F9]">
                   <div className="space-y-3">
                      <p className="text-[9px] uppercase tracking-widest text-[#16232B] font-bold">Strategic Pros</p>
                      <ul className="space-y-2">
                         <li className="flex items-center space-x-2 text-[10px] text-[#075056]/60">
                            <div className="w-1 h-1 rounded-full bg-[#16232B]"></div>
                            <span>Heritage Supply</span>
                         </li>
                         <li className="flex items-center space-x-2 text-[10px] text-[#075056]/60">
                            <div className="w-1 h-1 rounded-full bg-[#16232B]"></div>
                            <span>High Margin potential</span>
                         </li>
                      </ul>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[9px] uppercase tracking-widest text-[#FF5B04] font-bold">Security Cons</p>
                      <ul className="space-y-2">
                         <li className="flex items-center space-x-2 text-[10px] text-[#075056]/60">
                            <div className="w-1 h-1 rounded-full bg-[#FF5B04]"></div>
                            <span>Seasonal volatility</span>
                         </li>
                         <li className="flex items-center space-x-2 text-[10px] text-[#075056]/60">
                            <div className="w-1 h-1 rounded-full bg-[#FF5B04]"></div>
                            <span>Logistics blindspots</span>
                         </li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Decision Terminal - FLOW 2 */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
           <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 md:p-12 space-y-10">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 max-w-lg">
                  <h3 className="text-2xl text-[#075056] font-light leading-snug">
                    Indian Market <span className="text-[#FF5B04]">Profitability Simulation</span> Required
                  </h3>
                  <p className="text-sm text-[#075056]/60 leading-relaxed">
                    India's retail landscape is highly unpredictable. Before approving this ₹12.5L request, run the profitability simulator to assess regional validity and seasonal risk.
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-8 bg-[#F8FAFC] border border-[#E4EEF0] rounded-[32px] w-full md:w-64 min-h-[160px]">
                  {profitScore ? (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-2">
                       <p className="text-[10px] uppercase tracking-widest text-[#075056]/40">Nanopie Score</p>
                       <p className={`text-5xl ${profitScore > 85 ? 'text-[#16232B]' : 'text-[#FF5B04]'}`}>{profitScore}%</p>
                       <p className="text-[10px] text-[#16232B] font-bold">READY FOR SCALE</p>
                    </motion.div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className={`w-12 h-12 rounded-full border-2 border-dashed border-[#E4EEF0] flex items-center justify-center mx-auto ${simulating ? 'animate-spin border-[#FF5B04]' : 'text-[#075056]/20'}`}>
                         <Calculator size={20} />
                      </div>
                      <p className="text-xs text-[#075056]/40">{simulating ? "Analyzing Regional Data..." : "Simulation Pending"}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-[#F8FAFC] flex flex-col md:flex-row gap-6">
                <button 
                  onClick={handleSimulate}
                  disabled={simulating || profitScore !== null}
                  className="flex-1 py-5 bg-[#075056] text-white rounded-3xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Sparkles size={16} />
                  <span>{simulating ? "Processing Market Data" : "Run Profitability Simulator"}</span>
                </button>
                <button className="flex-1 py-5 border border-[#E4EEF0] text-[#075056]/40 rounded-3xl text-xs font-bold uppercase tracking-widest hover:border-[#075056] hover:text-[#075056] transition-all">
                  View Data Sources
                </button>
              </div>
              <div className="pt-6 border-t border-[#F1F5F9] space-y-3">
                 <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Upgrade Strategy</p>
                 <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0]">
                    <p className="text-xs text-[#075056] font-medium leading-relaxed italic">
                       "Modernizing core production tools and expanding regional footprint to meet 2024 demand."
                    </p>
                 </div>
              </div>
           </div>

           {/* Final Action Bar */}
           <AnimatePresence>
             {profitScore && (
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 className="bg-[#16232B] rounded-[40px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 p-12 opacity-5">
                    <CheckCircle2 size={120} />
                 </div>
                 
                 <div className="space-y-2 relative z-10 text-center md:text-left">
                    <h4 className="text-2xl font-light">Simulation Successful</h4>
                    <p className="text-sm text-white/60">Banaras Handlooms meets the 85% profitability threshold for the Varanasi region.</p>
                 </div>

                 <div className="flex gap-4 relative z-10 w-full md:w-auto">
                    <button 
                      onClick={() => handleDecision('reject')}
                      className="flex-1 md:flex-none px-8 py-4 border border-white/20 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Reject Request
                    </button>
                    <button 
                      onClick={() => handleDecision('approve')}
                      className="flex-1 md:flex-none px-8 py-4 bg-[#075056] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      Approve & Authorize
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Decision Feedback */}
      <AnimatePresence>
        {decision && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 bg-[#075056] flex flex-col items-center justify-center z-[200] text-white space-y-6"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              {decision === 'approve' ? <CheckCircle2 size={80} className="text-[#16232B]" /> : <XCircle size={80} className="text-[#FF5B04]" />}
            </motion.div>
            <h2 className="text-3xl font-light">{decision === 'approve' ? 'Vendor Authorized' : 'Request Denied'}</h2>
            <p className="text-white/40">Redirecting to verification queue...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
