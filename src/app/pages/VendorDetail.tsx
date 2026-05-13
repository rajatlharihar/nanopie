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
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { CreditInsight } from "../components/CreditInsight";
import { ReturnValidator } from "../components/ReturnValidator";
import { MOCK_VENDORS } from "../data";

const CHART_DATA = [
  { name: 'Jan', revenue: 85000, investors: 12 },
  { name: 'Feb', revenue: 92000, investors: 15 },
  { name: 'Mar', revenue: 105000, investors: 18 },
  { name: 'Apr', revenue: 124000, investors: 24 },
];

export function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vendor = MOCK_VENDORS.find(v => v.id === id) || MOCK_VENDORS[0];

  const metrics = [
    { label: "Monthly Revenue", value: `₹${vendor.raisedAmount.toLocaleString()}`, change: "+8%" },
    { label: "Active Investors", value: vendor.investorsCount.toString(), change: "+2" },
    { label: "Funding Velocity", value: `₹${vendor.fundingVelocity?.toLocaleString()}/day`, change: "Stable" },
  ];

  const documents = [
    { name: "Business License.pdf", status: "Verified", date: "Apr 10" },
    { name: "Tax Returns 2025.pdf", status: "Verified", date: "Apr 10" },
    { name: "KYC Proof of ID.pdf", status: vendor.kycStatus === 'verified' ? 'Verified' : 'Pending', date: "Apr 11" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 px-4">
      {/* Back & Title */}
      <div className="space-y-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sm text-[#075056]/40 hover:text-[#FF5B04] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Terminal</span>
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-[24px] bg-[#F8FAFC] border border-[#E4EEF0] flex items-center justify-center text-[#075056]">
              <ShieldCheck size={40} strokeWidth={1} />
            </div>
            <div>
              <h1 className="text-3xl text-[#075056] tracking-tight">{vendor.name}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-[#075056]/60">{vendor.type}</span>
                <span className="text-[#E4EEF0]">•</span>
                <span className="text-xs uppercase tracking-widest text-[#FF5B04] font-bold">{vendor.status}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <CreditInsight score={vendor.cibilScore} rating={vendor.platformRating} />
            <div className="w-[1px] h-10 bg-[#E4EEF0] mx-2 hidden md:block"></div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-2.5 rounded-[12px] border border-[#E4EEF0] text-xs font-bold uppercase tracking-widest text-[#075056] hover:bg-[#F8FAFC] transition-colors">
                Reject
              </button>
              <button 
                onClick={() => navigate('/success')}
                className="px-8 py-2.5 rounded-[12px] bg-[#FF5B04] text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-[#FF5B04]/20"
              >
                Approve Node
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Details & Docs */}
        <div className="lg:col-span-8 space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-6 rounded-[24px] border border-[#E4EEF0] bg-white space-y-2 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#075056]/30 font-bold">{metric.label}</p>
                <p className="text-2xl text-[#075056]">{metric.value}</p>
                <div className="flex items-center space-x-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${metric.change.includes('+') ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                   <p className="text-[10px] text-[#075056]/60 font-bold uppercase">{metric.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Smart Validation Layer - NEW */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E4EEF0] pb-4">
               <h3 className="text-lg text-[#075056]">System Validation</h3>
               <span className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Mathematical Integrity</span>
            </div>
            <ReturnValidator 
              revenue={vendor.raisedAmount / 12} 
              promisedReturn={vendor.returnsPromised || 12} 
              actualReturn={vendor.returnsActual}
            />
          </section>

          {/* Revenue Intelligence Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-[#F8FAFC] p-6 rounded-[32px] border border-[#E4EEF0] h-[240px]">
                  <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold mb-4">Revenue Growth Trend</p>
                  <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={CHART_DATA}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#075056" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#075056" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="revenue" stroke="#075056" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="bg-[#F8FAFC] p-6 rounded-[32px] border border-[#E4EEF0] h-[240px]">
                  <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold mb-4">Investor Engagement</p>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={CHART_DATA}>
                      <Bar dataKey="investors" fill="#FF5B04" radius={[4, 4, 0, 0]} />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </section>

          {/* Documents */}
          <section className="space-y-6">
            <h3 className="text-lg text-[#075056] border-b border-[#E4EEF0] pb-4">Verification Documents</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-5 rounded-[24px] border border-[#E4EEF0] bg-white hover:border-[#075056] transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#075056]/20 group-hover:text-[#075056] transition-colors">
                       <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#075056] font-medium">{doc.name}</p>
                      <p className="text-[10px] text-[#075056]/30 uppercase font-bold">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold ${doc.status === 'Verified' ? 'bg-[#075056]/5 text-[#075056]' : 'bg-[#FF5B04]/5 text-[#FF5B04]'}`}>
                      {doc.status}
                    </span>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#075056]/20 hover:bg-[#075056] hover:text-white transition-all">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Audit History */}
          <section className="space-y-6">
            <h3 className="text-lg text-[#075056] border-b border-[#E4EEF0] pb-4">Audit History</h3>
            <div className="space-y-8 pl-4 border-l-2 border-[#F1F5F9] ml-2">
              {[
                { event: "Application Submitted", date: "Apr 10, 2026", user: "System" },
                { event: "Document Review Started", date: "Apr 11, 2026", user: "Alex Rivera" },
                { event: "Revenue Verified", date: "Apr 12, 2026", user: "Alex Rivera" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#075056]" />
                  <div className="space-y-1">
                    <p className="text-sm text-[#075056] font-medium">{item.event}</p>
                    <p className="text-[10px] text-[#075056]/40 uppercase tracking-widest font-bold">{item.date} • Authorized By {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Profile Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[12px] bg-[#F8FAFC] border border-[#E4EEF0] space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#075056]/30">Node Intelligence</h4>
              <div className="p-5 bg-white border border-[#E4EEF0] rounded-[24px] space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-[#075056]/40 uppercase font-bold">Investor Participation</p>
                  <span className="text-sm font-bold text-[#075056]">{vendor.investorParticipation}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${vendor.investorParticipation}%` }}></div>
                </div>
                <div className="flex items-center space-x-2 text-[#075056]/60">
                   <Target size={12} className="text-[#FF5B04]" />
                   <span className="text-[9px] italic">Targeting {vendor.investorsCount + 10} investors by next cycle.</span>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-sm text-[#075056]">
                  <MapPin size={16} className="text-[#075056]/20" />
                  <span>{vendor.location} (Node {vendor.lat}, {vendor.lng})</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[#075056]">
                  <Calendar size={16} className="text-[#075056]/20" />
                  <span>Joined {vendor.joinedDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[#075056]">
                  <Mail size={16} className="text-[#075056]/20" />
                  <span>{vendor.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-[#075056]">
                  <Phone size={16} className="text-[#075056]/20" />
                  <span>{vendor.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E4EEF0] space-y-4">
               <h4 className="text-xs uppercase tracking-[0.2em] text-[#075056]/30 font-bold">Annual Yield Cycle</h4>
               <div className="p-6 bg-[#075056] rounded-[32px] space-y-6 shadow-xl shadow-[#075056]/20 relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Projected Returns</p>
                          <p className="text-2xl text-white font-light">Escalating Model</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] text-[#FF5B04] uppercase tracking-widest font-bold">Duration</p>
                          <p className="text-sm text-white font-bold">12 Months</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                       {[
                         { q: 'Q1', r: '2%' },
                         { q: 'Q2', r: '4%' },
                         { q: 'Q3', r: '8%' },
                         { q: 'Q4', r: '12%' },
                       ].map((step, idx) => (
                         <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10 hover:bg-white/20 transition-colors">
                            <p className="text-[8px] text-white/40 font-bold mb-1">{step.q}</p>
                            <p className="text-sm text-white font-bold">{step.r}</p>
                         </div>
                       ))}
                    </div>
                    <p className="text-[9px] text-white/30 italic text-center">
                       *Yield terminates after completion of the 12-month capital cycle.
                    </p>
                  </div>
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5B04]/10 rounded-full blur-3xl -mr-16 -mt-16" />
               </div>
            </div>

            <div className="pt-8 border-t border-[#E4EEF0] space-y-4">
               <h4 className="text-xs uppercase tracking-[0.2em] text-[#075056]/30 font-bold">Smart Recommendation</h4>
               <div className={`p-5 border rounded-[24px] space-y-3 shadow-sm ${
                 vendor.platformRating === 'A' ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'
               }`}>
                  <div className="flex items-center space-x-2 text-[#075056]">
                     <Zap size={14} className={vendor.platformRating === 'A' ? 'text-emerald-600' : 'text-orange-600'} />
                     <p className="text-[10px] uppercase tracking-widest font-bold">AI Decision Support</p>
                  </div>
                  <p className="text-xs text-[#075056] leading-relaxed font-medium">
                    {vendor.platformRating === 'A' 
                      ? "Highly recommended for approval. Node shows exceptional liquidity and return consistency."
                      : "Exercise caution. Node has limited historical data in this specific category."
                    }
                  </p>
               </div>
            </div>

            <div className="pt-8 border-t border-[#E4EEF0] space-y-4">
               <h4 className="text-xs uppercase tracking-[0.2em] text-[#075056]/30">Compliance Check</h4>
               <div className="p-4 bg-[#FF5B04]/5 rounded-[12px] border border-[#FF5B04]/10 flex items-start space-x-3">
                 <AlertTriangle size={18} className="text-[#FF5B04] shrink-0 mt-0.5" />
                 <p className="text-xs text-[#075056]/70 leading-relaxed font-medium">
                   One document (Proof of ID) is still awaiting manual verification. Review before final approval.
                 </p>
               </div>
            </div>

            <div className="pt-8 border-t border-[#E4EEF0] space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#075056]/30">Internal Notes</h4>
              <textarea 
                className="w-full h-32 p-3 bg-white border border-[#E4EEF0] rounded-[12px] text-xs focus:outline-none focus:border-[#FF5B04] placeholder-[#075056]/20"
                placeholder="Add private note for other admins..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
