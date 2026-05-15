import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  ShieldAlert, 
  Terminal, 
  MessageSquare,
  Zap,
  MoreHorizontal,
  CheckCircle2,
  Activity,
  RefreshCcw,
  Sparkles,
  Lock,
  Phone,
  DollarSign,
  Target,
  ShieldCheck,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useStakeholder } from "../context";

export function ResolutionTerminal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resolveComplaint } = useStakeholder();
  const [isResolved, setIsResolved] = useState(false);
  const [activeTab, setActiveTab] = useState<'Chat' | 'Protocols'>('Chat');
  const [messages, setMessages] = useState([
    { role: 'system', content: `SECURE_AUDIT_LINE: [${id || 'V-GLOBAL'}]`, timestamp: 'System' },
    { role: 'warning', content: `CRITICAL_ALERT: Intelligence node '${id || 'V-NODE'}' reporting non-standard transaction patterns. Bridge locked.`, timestamp: 'System' },
    { role: 'bot', content: "Protocol initiated. I have flagged this vendor for a manual audit. We need to verify their last 30 days of micro-collections. How would you like to proceed?", timestamp: 'Just now' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const content = text || inputValue;
    if (!content.trim()) return;
    
    const userMsg = { role: 'user', content: content, timestamp: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const isFinishing = content.toLowerCase().includes('authorize') || content.toLowerCase().includes('satisfy') || messages.length > 5;
      
      if (isFinishing) {
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: "AUDIT_SUCCESS: Regional risk factors suppressed. Node bridge restored.", 
          timestamp: 'Just now' 
        }, { 
          role: 'bot', 
          content: "Audit satisfied. You can now close the terminal to authorize the final disbursement. All regional warnings have been cleared for this node.", 
          timestamp: 'Just now' 
        }]);
        setTimeout(() => setIsResolved(true), 500);
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: "Understood. Analyzing regional micro-collection logs. I'm cross-referencing with local GST filings to verify node stability.", 
          timestamp: 'Just now' 
        }]);
      }
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <button onClick={() => navigate(-1)} className="p-3 rounded-2xl border border-[#E4EEF0] bg-white text-[#075056]/40 hover:text-[#075056] transition-all">
              <ArrowLeft size={18} />
           </button>
           <div className="space-y-1">
              <h1 className="text-2xl text-[#075056] font-light">Resolution Terminal</h1>
              <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#FF5B04] animate-pulse"></div>
                 <p className="text-[10px] uppercase tracking-widest text-[#075056]/40">Active Audit: {id || 'SEC_NODE'}</p>
              </div>
           </div>
        </div>
        <div className="flex items-center space-x-3">
           <div className="w-10 h-10 rounded-full bg-[#075056] text-white flex items-center justify-center text-[10px] font-bold">Admin</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Main Interface */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
           {/* Tab Navigation & Actions */}
           <div className="flex items-center justify-between">
              <div className="flex p-1 bg-[#F1F5F9] rounded-2xl w-fit">
                 {['Chat', 'Protocols'].map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                       activeTab === tab ? "bg-white text-[#075056] shadow-sm" : "text-[#075056]/40 hover:text-[#075056]"
                     }`}
                   >
                     {tab}
                   </button>
                 ))}
              </div>
              <button className="flex items-center space-x-2 bg-white border border-[#E4EEF0] px-6 py-2.5 rounded-2xl text-[10px] text-[#075056]/60 font-bold hover:border-[#075056] transition-all shadow-sm">
                 <Phone size={14} className="text-[#16232B]" />
                 <span>Contact Directly</span>
              </button>
           </div>

           <div className="bg-white border border-[#E4EEF0] rounded-[40px] shadow-sm overflow-hidden flex flex-col h-[700px] relative">
              {activeTab === 'Chat' ? (
                <>
                  <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-hide"
                  >
                    {messages.map((msg, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] space-y-1 ${msg.role === 'system' || msg.role === 'warning' ? 'w-full' : ''}`}>
                          {msg.role === 'system' || msg.role === 'warning' ? (
                            <div className="text-center py-4">
                               <span className={`px-4 py-1.5 border rounded-full text-[9px] font-mono uppercase tracking-widest ${
                                 msg.role === 'warning' ? 'bg-red-50 border-red-100 text-red-500 font-bold' : 'bg-[#F8FAFC] border-[#E4EEF0] text-[#075056]/40'
                               }`}>
                                 {msg.content}
                               </span>
                            </div>
                          ) : (
                            <>
                              <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-[#075056] text-white shadow-lg shadow-[#075056]/10' 
                                : 'bg-[#F8FAFC] text-[#075056] border border-[#E4EEF0]'
                              }`}>
                                {msg.content}
                              </div>
                              <p className={`text-[9px] text-[#075056]/20 uppercase font-bold px-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                {msg.timestamp}
                              </p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-8 border-t border-[#F1F5F9] bg-[#F8FAFC]/50">
                    <AnimatePresence mode="wait">
                      {isResolved ? (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={() => {
                            if (id) resolveComplaint(id);
                            navigate('/');
                          }}
                          className="w-full py-5 bg-[#16232B] text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#16232B]/20 flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all"
                        >
                           <CheckCircle2 size={18} />
                           <span>Protocol Satisfied: Close Terminal</span>
                        </motion.button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex-1 bg-white border border-[#E4EEF0] rounded-2xl p-4 flex items-center focus-within:border-[#075056] transition-all group shadow-sm">
                            <input 
                              type="text" 
                              placeholder="Type response or operational command..." 
                              className="flex-1 bg-transparent border-none outline-none text-sm placeholder-[#075056]/20"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={() => handleSend()} className="p-2 bg-[#075056] text-white rounded-xl hover:bg-[#FF5B04] transition-all">
                              <Send size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="p-12 space-y-8 overflow-y-auto">
                   <div className="space-y-2">
                      <h3 className="text-2xl text-[#075056] font-light">Investor Compliance Protocols</h3>
                      <p className="text-sm text-[#075056]/40">Standard operating procedures for liquidity disbursement.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "Money at Hand Verification", status: "Required", desc: "Proof of regional treasury liquidity before bridge execution.", icon: DollarSign },
                        { title: "KYC Final Clearance", status: "Verified", desc: "Stakeholder identification and global sanctions check.", icon: ShieldCheck },
                        { title: "Network Sync Proof", status: "Required", desc: "Evidence of regional node recovery and sync completion.", icon: Zap },
                        { title: "Disbursement Milestone", status: "In Progress", desc: "Gradual release of capital based on vendor performance.", icon: Target },
                      ].map((p, i) => (
                        <div key={i} className="p-6 bg-[#F8FAFC] rounded-3xl border border-[#E4EEF0] space-y-4">
                           <div className="flex justify-between items-center">
                              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E4EEF0] flex items-center justify-center text-[#075056]/60">
                                 <p.icon size={18} />
                              </div>
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                p.status === 'Verified' ? 'bg-[#16232B]/10 text-[#16232B]' : 
                                p.status === 'Required' ? 'bg-[#FF5B04]/10 text-[#FF5B04]' : 
                                'bg-[#075056]/10 text-[#075056]'
                              }`}>
                                {p.status}
                              </span>
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-[#075056]">{p.title}</h4>
                              <p className="text-[11px] text-[#075056]/60 leading-relaxed mt-1">{p.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="p-8 bg-[#075056] rounded-3xl text-white flex items-center justify-between">
                      <div className="space-y-1">
                         <h4 className="text-sm font-bold">Execute Global Bridge</h4>
                         <p className="text-xs text-white/40">Requires 3 protocol verifications to unlock.</p>
                      </div>
                      <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-50 cursor-not-allowed">
                         Awaiting Verification
                      </button>
                   </div>
                </div>
              )}

              {/* Success Overlay */}
              <AnimatePresence>
                 {isResolved && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center text-center p-12 space-y-8"
                   >
                     <motion.div 
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 0.2 }}
                       className="w-24 h-24 rounded-full bg-[#16232B] text-white flex items-center justify-center shadow-2xl"
                     >
                       <CheckCircle2 size={48} />
                     </motion.div>
                     <div className="space-y-2">
                       <h2 className="text-3xl text-[#075056] font-light">Resolution Complete</h2>
                       <p className="text-sm text-[#075056]/40">All investor protocols satisfied.<br/>The vendor liquidity bridge is now active.</p>
                     </div>
                     <button 
                       onClick={() => {
                         if (id) resolveComplaint(id);
                         navigate('/');
                       }}
                       className="px-12 py-4 bg-[#075056] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all"
                     >
                       Return to Terminal
                     </button>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* Side Panel: Case Dossier */}
        <div className="col-span-12 lg:col-span-4 space-y-8 pt-[58px]">
           <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-8 shadow-sm">
              <div className="space-y-1">
                 <h3 className="text-lg text-[#075056]">Regional Metrics</h3>
                 <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Surat North Node</p>
              </div>

              <div className="space-y-4">
                 {[
                   { label: "Treasury Sync", value: "Verified", color: "text-[#16232B]" },
                   { label: "Money at Hand", value: "₹42,80,000", color: "text-[#075056]" },
                   { label: "Investor Confidence", value: "92%", color: "text-[#16232B]" },
                 ].map((stat, i) => (
                   <div key={i} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] flex justify-between items-center">
                      <p className="text-[9px] uppercase tracking-widest text-[#075056]/40">{stat.label}</p>
                      <p className={`text-xs font-bold ${stat.color}`}>{stat.value}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#075056]/40">Priority Actions</h3>
              <div className="space-y-3">
                 {[
                   { label: "Verify Money at Hand", icon: DollarSign, primary: true },
                   { label: "Initiate Investor Protocol", icon: FileText, primary: false },
                   { label: "Alert Local Node Manager", icon: Phone, primary: false },
                 ].map((action, i) => (
                   <button 
                    key={i} 
                    onClick={() => handleSend(action.label)}
                    className={`w-full p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-between transition-all ${
                      action.primary ? "bg-[#FF5B04] text-white" : "bg-white border border-[#E4EEF0] text-[#075056]/60 hover:border-[#075056]"
                    }`}
                   >
                     <span>{action.label}</span>
                     <action.icon size={14} />
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
