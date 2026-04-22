import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Code, 
  Shield, 
  Terminal, 
  Moon, 
  Sun, 
  Zap, 
  Clock, 
  Database,
  Lock,
  Cpu,
  RefreshCcw,
  User,
  Bell,
  Monitor,
  Check
} from "lucide-react";
import { motion } from "motion/react";

export function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [developerMode, setDeveloperMode] = useState(false);
  const [executingAction, setExecutingAction] = useState<string | null>(null);

  const tabs = ['General', 'Security', 'Operational Shifts', 'Developer Options'];

  const handleDevAction = (action: string) => {
    setExecutingAction(action);
    setTimeout(() => setExecutingAction(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-32 px-4 md:px-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl text-[#075056] tracking-tight">Control Center</h1>
        <p className="text-sm text-[#075056]/40">Manage nanopie system parameters and operational shifts.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Navigation Tabs */}
        <div className="col-span-12 lg:col-span-3">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl text-xs text-left whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? "bg-[#075056] text-white" 
                    : "text-[#075056]/40 hover:bg-white border border-transparent hover:border-[#E4EEF0]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          {activeTab === 'General' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E4EEF0] rounded-[32px] p-8 space-y-6">
                <div className="flex items-center space-x-3 text-[#075056]">
                  <Monitor size={18} />
                  <h3 className="text-sm font-medium">Appearance</h3>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl">
                  <span className="text-xs text-[#075056]/60">Theme Mode</span>
                  <div className="flex bg-white p-1 rounded-xl border border-[#E4EEF0]">
                    <button className="p-2 text-[#FF5B04]"><Sun size={14} /></button>
                    <button className="p-2 text-[#075056]/20"><Moon size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E4EEF0] rounded-[32px] p-8 space-y-6">
                <div className="flex items-center space-x-3 text-[#075056]">
                  <Bell size={18} />
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#075056]/60">Surveillance Alerts</span>
                  <div className="w-10 h-6 bg-[#16232B] rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Operational Shifts' && (
            <div className="bg-white border border-[#E4EEF0] rounded-[40px] p-8 md:p-12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl text-[#075056]">System Response Shifts</h3>
                <p className="text-xs text-[#075056]/40 leading-relaxed">
                  Adjust how nanopie behaves during different operational periods.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { mode: "Standard", desc: "Balanced surveillance and capital flow.", icon: Activity, active: true },
                  { mode: "High-Alert", desc: "Maximum verification for all transactions.", icon: Shield, active: false },
                  { mode: "Liquidity Surge", desc: "Faster authorizations for trusted pools.", icon: Zap, active: false },
                ].map((m) => (
                  <div 
                    key={m.mode}
                    className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer ${
                      m.active ? "border-[#075056] bg-[#F8FAFC]" : "border-[#E4EEF0] hover:border-[#075056]/20"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${m.active ? "bg-[#075056] text-white" : "bg-[#F8FAFC] text-[#075056]/20"}`}>
                      <m.icon size={18} />
                    </div>
                    <h4 className="text-sm font-medium text-[#075056]">{m.mode}</h4>
                    <p className="text-[10px] text-[#075056]/40 mt-1">{m.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-[#F8FAFC]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock size={18} className="text-[#075056]/20" />
                    <span className="text-xs text-[#075056]">Scheduled Shift: <span className="font-medium">Night Watch</span></span>
                  </div>
                  <button className="text-xs text-[#FF5B04] font-medium underline underline-offset-4">Manage Schedule</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Developer Options' && (
            <div className="bg-[#075056] rounded-[40px] p-8 md:p-12 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Terminal size={120} />
               </div>

               <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-xl font-light">Root Access Terminal</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Advanced System Control</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] text-white/40">DEV_MODE</span>
                    <button 
                      onClick={() => setDeveloperMode(!developerMode)}
                      className={`w-12 h-6 rounded-full transition-all relative p-1 ${developerMode ? "bg-[#FF5B04]" : "bg-white/10"}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${developerMode ? "translate-x-6" : "translate-x-0"}`}></div>
                    </button>
                  </div>
               </div>

               {developerMode ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {[
                      { label: "Neural Cache Flush", icon: RefreshCcw, color: "text-[#FF5B04]" },
                      { label: "Bypass KYC Tiers", icon: Lock, color: "text-white/40" },
                      { label: "Simulator Debugger", icon: Cpu, color: "text-white" },
                      { label: "Raw Data Stream", icon: Database, color: "text-white" },
                    ].map(opt => (
                      <button 
                        key={opt.label} 
                        onClick={() => handleDevAction(opt.label)}
                        className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${executingAction === opt.label ? 'bg-[#16232B] border-[#16232B]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center space-x-3">
                          {executingAction === opt.label ? <Check size={18} className="text-white" /> : <opt.icon size={18} className={opt.color} />}
                          <span className="text-xs">{executingAction === opt.label ? 'Execution Success' : opt.label}</span>
                        </div>
                        <Code size={14} className="opacity-20" />
                      </button>
                    ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-[32px] border border-dashed border-white/10 text-center space-y-4">
                    <Lock size={32} className="text-white/20" />
                    <p className="text-sm text-white/60">Developer options are currently restricted.<br/>Please enable DEV_MODE to access system logs.</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
