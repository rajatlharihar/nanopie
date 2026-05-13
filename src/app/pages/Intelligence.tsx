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
    <div className="max-w-7xl mx-auto space-y-12 pb-32 px-4 md:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl text-[#075056] tracking-tight">Intelligence Terminal</h1>
          <p className="text-sm text-[#075056]/40 italic">System reports and analytical insights for nanopie.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-white border border-[#E4EEF0] px-4 py-2.5 rounded-2xl text-[10px] text-[#075056] font-bold">
            <LocateFixed size={14} className="text-[#FF5B04]" />
            <span>INDIA REGION: ACTIVE</span>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-[#075056] text-white px-6 py-2.5 rounded-2xl text-xs hover:opacity-90 transition-all shadow-lg shadow-[#075056]/20">
              <Download size={14} />
              <span>Export intelligence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Geospatial Map Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-3">
            <Globe size={24} className="text-[#075056]/40" />
            <h2 className="text-2xl text-[#075056]">Spatial Node Distribution</h2>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#075056]/10 flex items-center justify-center overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Admin" className="w-full h-full object-cover" />
                 </div>
               ))}
             </div>
             <span className="text-[10px] text-[#075056]/40 font-bold uppercase tracking-widest">4 Analysts Viewing</span>
          </div>
        </div>
        <GeoMap />
      </div>

      {/* Main Intelligence Engine */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-[#075056] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5B04] rounded-full blur-[140px] opacity-15 -mr-48 -mt-48"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-6 max-w-md">
                <div className="flex items-center space-x-2 text-[#FF5B04]">
                  <Sparkles size={16} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Predictive Engine v2.4</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light leading-tight">
                  Liquidity demand is projected to scale <span className="text-[#FF5B04]">24.8%</span> by Q3.
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">
                  Our neural patterns indicate a significant shift in rural vendor adoption. We recommend increasing the primary investment pool by ₹85L to maintain efficiency.
                </p>
                <div className="flex gap-8 pt-4">
                  <div className="space-y-1">
                    <p className="text-2xl">₹1.4Cr</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Projected Flow</p>
                  </div>
                  <div className="w-[1px] bg-white/10"></div>
                  <div className="space-y-1">
                    <p className="text-2xl text-[#FF5B04]">94%</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Confidence Score</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64 h-48 bg-white/5 rounded-[32px] p-6 border border-white/10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={FORECAST_DATA}>
                    <Line type="monotone" dataKey="projected" stroke="#FF5B04" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="actual" stroke="white" strokeWidth={2} dot={{ r: 4, fill: 'white' }} />
                    <Tooltip contentStyle={{ display: 'none' }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/40">Projection vs Reality</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
              {[
                { label: "Network Vitality", val: "Optimal", icon: Activity, color: "text-emerald-400" },
                { label: "Capital Velocity", val: "1.4x Avg", icon: Zap, color: "text-[#FF5B04]" },
                { label: "Risk Mitigation", val: "99.8%", icon: ShieldAlert, color: "text-white" },
                { label: "Market Growth", val: "+12%", icon: TrendingUp, color: "text-white" },
              ].map(item => (
                <div key={item.label} className="space-y-3">
                  <div className="flex items-center space-x-2 text-white/30">
                    <item.icon size={12} />
                    <span className="text-[9px] uppercase tracking-widest">{item.label}</span>
                  </div>
                  <p className={`text-xl ${item.color}`}>{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#075056]">Sector Risk Intensity</h3>
              <Layers size={16} className="text-[#075056]/20" />
            </div>
            <div className="space-y-6">
              {SECTOR_INTENSITY.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-[#075056]/40">{item.name}</span>
                    <span className={item.trend === 'up' ? 'text-[#FF5B04]' : 'text-emerald-600'}>
                      {item.score}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      className={`h-full rounded-full ${item.trend === 'up' ? 'bg-[#FF5B04]' : 'bg-[#075056]'}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            onClick={() => setShowIntervention(true)}
            className="bg-[#FF5B04] rounded-[40px] p-8 text-white relative overflow-hidden group cursor-pointer ring-offset-4 hover:ring-2 ring-[#FF5B04] transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Target size={80} />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">Urgent Recommendation</span>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              </div>
              <h4 className="text-xl leading-tight">Authorize Emergency Pool: Surat Silk Mills</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                System detected a 30% revenue downfall. AI suggests immediate liquidity rescue to prevent network failure.
              </p>
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-mono">FLOW_ID: RESCUE_77</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/analysis/RESCUE_77');
                  }}
                  className="flex items-center space-x-2 bg-white text-[#FF5B04] px-6 py-3 rounded-2xl text-xs font-bold hover:scale-105 transition-all"
                >
                  <span>Analyze Downfall Risk</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Downfall Analysis Intervention Modal - FLOW 1 */}
      <AnimatePresence>
        {showIntervention && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIntervention(false)}
              className="fixed inset-0 bg-[#075056]/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-[48px] p-10 md:p-16 z-[101] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#FF5B04]"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-7 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-[#FF5B04]">
                      <HeartPulse size={24} />
                      <h3 className="text-xl font-medium">Business Downfall Analysis</h3>
                    </div>
                    <h2 className="text-3xl text-[#075056] font-light">Surat Silk Mills: <span className="text-[#FF5B04]">Liquidity Crisis</span></h2>
                    <p className="text-sm text-[#075056]/60 leading-relaxed">
                      Nanopie AI has analyzed 12 months of transaction history. The vendor is experiencing a sudden 30% drop in B2B collections due to regional logistics instability.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-[#F8FAFC] rounded-[32px] space-y-2 border border-[#E4EEF0]">
                      <p className="text-[10px] uppercase tracking-widest text-[#075056]/40">Risk of Failure</p>
                      <p className="text-3xl text-[#FF5B04]">82%</p>
                    </div>
                    <div className="p-6 bg-[#F8FAFC] rounded-[32px] space-y-2 border border-[#E4EEF0]">
                      <p className="text-[10px] uppercase tracking-widest text-[#075056]/40">Recovery Potential</p>
                      <p className="text-3xl text-[#16232B]">High</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#075056]">AI Recommended Inputs</h4>
                    <ul className="space-y-3">
                      {[
                        "Immediate ₹12.5L liquidity injection to bridge collection gap.",
                        "Shift logistics surveillance to alternate regional partners.",
                        "Pause investor withdrawals from this specific pool for 14 days."
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm text-[#075056]/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5B04] mt-2 shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-8 flex flex-col justify-center border-l border-[#F1F5F9] md:pl-12">
                   <div className="bg-[#075056] p-8 rounded-[40px] text-white space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-white/30">Action Required</p>
                        <p className="text-lg">Prevent System Breakage</p>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed italic">
                        "Failure to intervene may trigger a cascade of defaults across 14 connected secondary vendors."
                      </p>
                      <button 
                        onClick={() => setShowIntervention(false)}
                        className="w-full py-4 bg-[#FF5B04] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF5B04]/20"
                      >
                        Execute Rescue Plan
                      </button>
                      <button 
                        onClick={() => setShowIntervention(false)}
                        className="w-full py-4 bg-white/5 text-white/60 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                      >
                        Dismiss Analysis
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Merged Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
             <h3 className="text-lg text-[#075056]">Archived System Reports</h3>
             <button className="text-[10px] uppercase tracking-widest text-[#FF5B04] flex items-center space-x-2">
                <Plus size={14} />
                <span>Custom Dataset</span>
             </button>
          </div>
          <div className="space-y-3">
            {systemReports.map((report) => (
              <div key={report.title} className="group flex items-center justify-between p-5 rounded-[28px] border border-[#E4EEF0] hover:border-[#075056] transition-all bg-white">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#075056]/20 group-hover:text-[#FF5B04] transition-colors border border-[#E4EEF0]">
                    <FileText size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm text-[#075056] font-medium">{report.title}</p>
                    <p className="text-[10px] text-[#075056]/30 uppercase tracking-tight font-light">{report.date} • {report.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] text-[#075056]/20">{report.size}</span>
                  <button className="p-2 rounded-full text-[#075056]/20 hover:text-[#075056] hover:bg-[#F8FAFC] transition-all">
                    <Download size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#075056]/30 font-medium">Compliance Health</h3>
              <div className="space-y-1">
                 <p className="text-4xl text-[#16232B] font-light">99.2%</p>
                 <div className="flex items-center gap-1 text-[#16232B] text-[10px]">
                    <ArrowUpRight size={12} />
                    <span>0.4% from last week</span>
                 </div>
              </div>
              <p className="text-xs text-[#075056]/60 leading-relaxed font-light">
                 All systems operating within acceptable risk thresholds. 2 pending cases require verification.
              </p>
           </div>

           <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#075056]/30 font-medium">Network Liquidity</h3>
              <div className="space-y-1">
                 <p className="text-4xl text-[#075056] font-light">₹14.2Cr</p>
                 <span className="text-[10px] text-[#075056]/40 bg-[#F8FAFC] px-2 py-0.5 rounded-full border border-[#E4EEF0]">Optimal</span>
              </div>
              <p className="text-xs text-[#075056]/60 leading-relaxed font-light">
                 Liquidity levels are optimal for the current vendor growth trajectory. No immediate capital calls.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
