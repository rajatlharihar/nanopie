import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Clock,
  ChevronRight,
  Search,
  Calendar,
  CreditCard,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  MessageSquare,
  Filter,
  Download,
  AlertTriangle,
  Activity,
  HeartPulse,
  BrainCircuit,
  Zap,
  Check,
  ShieldAlert,
  Globe,
  Settings2,
  Rocket,
  ZapOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useStakeholder, SystemMode } from "../context";
import { GeoMap } from "../components/GeoMap";
import { CreditInsight } from "../components/CreditInsight";

export function AdminDashboard() {
  const navigate = useNavigate();
  const { complaints, collections, resolveComplaint, queue, systemMode, setSystemMode } = useStakeholder();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState(['pending', 'complaints', 'collections', 'activity']);

  const pendingVerification = [
    { id: "V-9012", name: "Banaras Handlooms", status: "Limited Data", risk: "Low", category: "Handicrafts" },
    { id: "V-9011", name: "Surat Silk Mills", status: "Risk", risk: "High", category: "Textile" },
    { id: "V-9010", name: "Punjab Dairy", status: "Verified", risk: "Low", category: "Agriculture" },
    { id: "V-9009", name: "Bengal Spices", status: "Limited Data", risk: "Medium", category: "Food" },
  ];

  const filteredQueue = useMemo(() => {
    return pendingVerification.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter]);

  const toggleWidget = (id: string) => {
    if (activeWidgets.includes(id)) {
      setActiveWidgets(activeWidgets.filter(w => w !== id));
    } else {
      setActiveWidgets([...activeWidgets, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 pb-32 px-0 md:px-4 lg:px-12">
      {/* High Alert Intervention Notification */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate('/analysis/RESCUE_77')}
        className="bg-[#FF5B04] rounded-none md:rounded-[32px] p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:scale-[1.01] transition-all shadow-xl shadow-[#FF5B04]/20 overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
          <ShieldAlert size={100} />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <AlertTriangle size={32} className="animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg md:text-2xl font-light">Urgent Intervention Required: <span className="font-bold">Surat Silk Mills</span></h2>
            <p className="text-xs md:text-sm text-white/60">System detected 82% risk of regional network failure. AI analysis ready for review.</p>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-4 bg-[#075056] text-white rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#075056] transition-all relative z-10 shrink-0">
          Analyze Risk Now
        </button>
      </motion.div>

      {/* System Mode Selector & Stats Bar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between bg-white/40 backdrop-blur-md p-6 md:rounded-[32px] border-y md:border border-[#E4EEF0] mx-0 md:mx-0">
        <div className="space-y-4 w-full lg:w-auto px-4 md:px-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#075056]/40 font-bold">Strategic Operational Mode</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {[
              { id: 'Standard', icon: Settings2, label: 'Standard Control' },
              { id: 'High Verification', icon: ShieldCheck, label: 'High Trust Only' },
              { id: 'Growth', icon: Rocket, label: 'Growth Surge' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setSystemMode(mode.id as SystemMode)}
                className={`flex items-center justify-center sm:justify-start space-x-3 px-6 py-3 rounded-2xl border transition-all ${
                  systemMode === mode.id 
                    ? 'bg-[#075056] text-white border-[#075056] shadow-lg shadow-[#075056]/20' 
                    : 'bg-white text-[#075056] border-[#E4EEF0] hover:border-[#075056]/30'
                }`}
              >
                <mode.icon size={16} />
                <span className="text-[10px] md:text-xs font-bold">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E4EEF0] lg:pl-12 px-4 md:px-0">
          {[
            { label: 'Funding Velocity', val: '₹1.2L/day', trend: '+14%', color: 'text-[#075056]' },
            { label: 'Active Campaigns', val: '42', trend: '+2', color: 'text-[#075056]' },
            { label: 'System Risk', val: 'Low', trend: 'Stable', color: 'text-emerald-600' },
            { label: 'Default Rate', val: '0.4%', trend: '-0.1%', color: 'text-[#FF5B04]' }
          ].map(stat => (
            <div key={stat.label} className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold">{stat.label}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm md:text-lg font-medium ${stat.color}`}>{stat.val}</span>
                <span className="text-[8px] text-emerald-600 font-bold">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header & Functional Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl text-[#075056] tracking-tight">Security Terminal</h1>
          <p className="text-xs md:text-sm text-[#075056]/40">Active surveillance of Indian vendor nodes.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 bg-white border border-[#E4EEF0] px-4 py-3 md:py-2.5 rounded-2xl text-[10px] md:text-xs text-[#075056] w-full md:w-64 focus-within:border-[#075056] transition-all">
            <Search size={14} className="text-[#075056]/30 shrink-0" />
            <input 
              type="text" 
              placeholder="Search vendor ID or name..." 
              className="bg-transparent border-none outline-none w-full placeholder-[#075056]/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <button className="w-full flex items-center justify-between sm:justify-start space-x-2 bg-white border border-[#E4EEF0] px-4 py-3 md:py-2.5 rounded-2xl text-[10px] md:text-xs text-[#075056] hover:border-[#075056] transition-all">
                <div className="flex items-center space-x-2">
                  <Filter size={14} className="text-[#075056]/40" />
                  <span>{statusFilter}</span>
                </div>
                <ChevronRight size={14} className="sm:hidden text-[#075056]/40" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-full sm:w-40 bg-white border border-[#E4EEF0] rounded-2xl p-2 hidden group-hover:block z-50 shadow-xl">
                {["All", "Verified", "Risk", "Limited Data"].map(f => (
                  <button 
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] rounded-xl text-[10px] transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowWidgetPanel(true)}
              className="p-3 md:p-2.5 bg-white border border-[#E4EEF0] rounded-2xl hover:border-[#FF5B04] text-[#FF5B04] transition-all"
            >
              <Plus size={18} />
            </button>

            <div className="relative flex-1 sm:flex-none">
              <button 
                onClick={() => setShowReportOptions(!showReportOptions)}
                className={`w-full text-[10px] md:text-xs px-6 py-3 md:py-2.5 rounded-2xl transition-all ${showReportOptions ? 'bg-[#FF5B04] text-white' : 'bg-[#075056] text-white hover:opacity-90'}`}
              >
                Create Report
              </button>
              <AnimatePresence>
                {showReportOptions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-full sm:w-48 bg-white border border-[#E4EEF0] rounded-2xl p-2 shadow-xl z-50 space-y-1"
                  >
                    {["Security Audit (PDF)", "Transaction Log (CSV)", "Risk Summary (XLS)"].map(opt => (
                      <button key={opt} onClick={() => setShowReportOptions(false)} className="w-full text-left px-4 py-2 text-[10px] hover:bg-[#F8FAFC] rounded-xl transition-colors">{opt}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column: Alerts & Operational Queue */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          
          {/* GEOSPATIAL INTELLIGENCE PREVIEW */}
          <div className="space-y-6 px-4 md:px-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe size={20} className="text-[#075056]/20 shrink-0" />
                <h2 className="text-lg md:text-xl text-[#075056]">Regional Surveillance</h2>
              </div>
              <Link to="/intelligence" className="text-[10px] text-[#FF5B04] uppercase tracking-widest font-bold hover:underline">Full Map</Link>
            </div>
            <div className="rounded-[32px] overflow-hidden border border-[#E4EEF0] shadow-inner bg-white/50 p-2 h-[300px] md:h-auto">
              <GeoMap />
            </div>
          </div>

          {/* ATTENTION REQUIRED - PROACTIVE MONITORING */}
          <div className="space-y-6 px-4 md:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                  <ZapOff size={16} />
                </div>
                <h2 className="text-lg md:text-xl text-[#075056]">Attention Required</h2>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-orange-600 font-bold">3 Clusters Detected</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { name: 'Kashmiri Crafts', issue: 'Slow Growth', score: 64, impact: 'Medium' },
                { name: 'Bengal Spices', issue: 'Inconsistent Returns', score: 58, impact: 'High' },
                { name: 'Surat Silk Mills', issue: 'Liquidity Drop', score: 42, impact: 'Critical' }
              ].map(item => (
                <div key={item.name} className="bg-white p-5 rounded-[24px] border border-[#E4EEF0] space-y-4 hover:shadow-lg transition-all border-l-4 border-l-orange-500">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-[#075056]">{item.name}</h4>
                    <p className="text-[10px] text-orange-600 font-bold">{item.issue}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] uppercase text-[#075056]/30 font-bold">Vitality</p>
                      <p className="text-xl text-[#075056]">{item.score}%</p>
                    </div>
                    <span className="text-[9px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-bold uppercase">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* URGENT COMPLAINTS - FLOW 3 (Implicit) */}
          {activeWidgets.includes('complaints') && (
            <div className="space-y-6 px-4 md:px-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5B04]/10 text-[#FF5B04] flex items-center justify-center">
                    <AlertTriangle size={16} />
                  </div>
                  <h2 className="text-lg md:text-xl text-[#075056]">Critical Complaints</h2>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#FF5B04] font-bold">{complaints.length} Urgent</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {complaints.map((comp) => (
                  <motion.div 
                    layout
                    key={comp.id}
                    className="bg-white border-2 border-[#FF5B04]/10 rounded-[24px] md:rounded-[32px] p-6 space-y-4 hover:border-[#FF5B04]/30 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#FF5B04] font-bold">{comp.type}</span>
                        <h4 className="text-sm font-medium text-[#075056]">{comp.vendorName}</h4>
                      </div>
                      <span className="text-[10px] text-[#075056]/30">{comp.id}</span>
                    </div>
                    <p className="text-xs text-[#075056]/60 leading-relaxed italic line-clamp-2">"{comp.message}"</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#F8FAFC]">
                      <span className="text-[10px] text-[#FF5B04]/60">SLA: 2h</span>
                      <button 
                        onClick={() => navigate(`/resolve/${comp.id}`)}
                        className="px-4 py-2 bg-[#075056] text-white rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
                      >
                        Resolve
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* PENDING VERIFICATION - MAIN QUEUE */}
          {activeWidgets.includes('pending') && (
            <div className="space-y-6 px-4 md:px-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity size={20} className="text-[#075056]/20 shrink-0" />
                  <h2 className="text-lg md:text-xl text-[#075056]">Verification Queue</h2>
                </div>
                <Link to="/vendors" className="text-[10px] text-[#075056]/40 uppercase tracking-widest hover:text-[#075056] transition-colors">View All</Link>
              </div>

              <div className="bg-white border border-[#E4EEF0] md:rounded-[40px] overflow-hidden -mx-4 md:mx-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#F8FAFC]">
                        <th className="px-6 md:px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold">Node ID</th>
                        <th className="px-6 md:px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold">Entity</th>
                        <th className="px-6 md:px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold">Status</th>
                        <th className="px-6 md:px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold">AI Signal</th>
                        <th className="px-6 md:px-8 py-6 text-[10px] uppercase tracking-widest text-[#075056]/30 font-bold"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F8FAFC]">
                      {queue.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors group">
                          <td className="px-6 md:px-8 py-5 text-[10px] md:text-xs text-[#075056]/40 font-mono">{item.id}</td>
                          <td className="px-6 md:px-8 py-5">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-[#075056]">{item.vendorName}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-[9px] text-[#075056]/30">{item.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 md:px-8 py-5">
                            <div className="flex items-center space-x-3">
                              <span className={`text-[9px] md:text-[10px] px-3 py-1 rounded-full border ${
                                item.trustStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                item.trustStatus === 'Risk' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                'bg-blue-50 text-blue-700 border-blue-100'
                              }`}>
                                {item.trustStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 md:px-8 py-5">
                            <div className="space-y-1">
                              <p className={`text-[10px] font-bold uppercase tracking-widest ${
                                item.suggestedAction.includes('High Risk') ? 'text-orange-600' : 
                                item.suggestedAction.includes('Recommend') ? 'text-emerald-600' : 'text-[#075056]/40'
                              }`}>
                                {item.suggestedAction}
                              </p>
                              <p className="text-[9px] text-[#075056]/30 italic truncate max-w-[150px]">{item.suggestionReason}</p>
                            </div>
                          </td>
                          <td className="px-6 md:px-8 py-5 text-right">
                            <Link 
                              to={`/review/${item.id}`}
                              className="px-4 py-2 rounded-xl bg-[#075056] text-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#FF5B04] transition-all"
                            >
                              Audit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Collections & Real-time Metrics */}
        <div className="col-span-12 lg:col-span-4 space-y-12">
          
          {/* COLLECTIONS & VIRTUAL CARDS */}
          {activeWidgets.includes('collections') && (
            <div className="space-y-6 px-4 md:px-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl text-[#075056]">Investment Pools</h2>
                <Link to="/investments" className="text-[10px] text-[#075056]/40 uppercase tracking-widest hover:text-[#075056] transition-colors">Tracker</Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                {collections.map((col) => (
                  <motion.div 
                    key={col.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#075056] p-6 rounded-[24px] md:rounded-[32px] text-white relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/40">Active Pool</p>
                          <h4 className="text-sm md:text-base font-light">{col.storeName}</h4>
                        </div>
                        <CreditCard size={18} className="text-white/20 shrink-0" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl md:text-2xl font-light">₹{col.currentAmount.toLocaleString('en-IN')}</p>
                        <div className="flex items-center justify-between text-[9px] md:text-[10px] text-white/40">
                          <span>{col.investors} Investors</span>
                          <span className={col.status === 'Secured' ? 'text-emerald-400' : 'text-[#FF5B04]'}>{col.status}</span>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-2/3"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* VENDOR ACTIVITY CHART */}
          {activeWidgets.includes('activity') && (
            <div className="bg-white border border-[#E4EEF0] md:rounded-[40px] p-6 md:p-8 space-y-6 -mx-4 md:mx-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs md:text-sm font-medium text-[#075056]">Collection Velocity</h3>
                <TrendingUp size={16} className="text-[#16232B] shrink-0" />
              </div>
              <div className="flex items-end space-x-2 h-24 md:h-32 pt-4">
                {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#F8FAFC] rounded-sm relative group cursor-pointer overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#075056] group-hover:bg-[#FF5B04] transition-all" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[7px] md:text-[8px] text-[#075056]/30 uppercase tracking-tighter">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
              <p className="text-[10px] md:text-[11px] text-[#075056]/40 leading-relaxed italic">
                Daily cashflow collections across nodes.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* WIDGET PANEL SLIDE OVER */}
      <AnimatePresence>
        {showWidgetPanel && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWidgetPanel(false)}
              className="fixed inset-0 bg-[#075056]/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 w-80 h-full bg-[#075056] text-white p-10 z-[60] shadow-2xl space-y-10"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-light">Customize Terminal</h3>
                <button onClick={() => setShowWidgetPanel(false)} className="text-white/40 hover:text-white"><XCircle size={20} /></button>
              </div>
              
              <div className="space-y-6">
                {[
                  { id: 'pending', label: 'Verification Queue', icon: Activity },
                  { id: 'complaints', label: 'Urgent Complaints', icon: AlertTriangle },
                  { id: 'collections', label: 'Investment Pools', icon: CreditCard },
                  { id: 'activity', label: 'Cashflow Velocity', icon: TrendingUp },
                ].map(w => (
                  <div 
                    key={w.id} 
                    onClick={() => toggleWidget(w.id)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                      activeWidgets.includes(w.id) ? "border-white bg-white/10" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <w.icon size={18} className={activeWidgets.includes(w.id) ? "text-[#FF5B04]" : "text-white/20"} />
                      <span className="text-xs">{w.label}</span>
                    </div>
                    {activeWidgets.includes(w.id) && <Check size={14} />}
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/5">
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Terminal layouts are persisted to your local Nanopie security node.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
