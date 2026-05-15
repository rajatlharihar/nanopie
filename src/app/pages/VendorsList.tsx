import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  MapPin, 
  Star,
  ShieldCheck,
  TrendingUp,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { MOCK_VENDORS } from "../data";

export function VendorsList() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('status') || 'All';
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = useMemo(() => {
    return MOCK_VENDORS.filter(v => {
      const matchesStatus = activeFilter === 'All' || v.status.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           v.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const filterTabs = [
    { id: 'All', icon: MoreHorizontal },
    { id: 'Approved', icon: CheckCircle2 },
    { id: 'Flagged', icon: AlertTriangle },
    { id: 'Rejected', icon: XCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 pb-32 px-4 md:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl text-[#075056] leading-none tracking-tight">Vendor Network</h2>
          <p className="text-xs md:text-sm text-[#075056]/40 italic">Global distribution of verified nanopie nodes.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-[#E4EEF0]">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeFilter === tab.id 
                  ? 'bg-[#075056] text-white shadow-lg' 
                  : 'text-[#075056]/40 hover:text-[#075056]'
              }`}
            >
              <tab.icon size={12} />
              <span className="hidden sm:inline">{tab.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#E4EEF0] shadow-sm">
        <div className="flex items-center space-x-4 flex-1 w-full">
          <Search size={16} className="text-[#075056]/30" />
          <input 
            type="text" 
            placeholder="Search by name, location, or type..." 
            className="text-sm bg-transparent border-none focus:outline-none placeholder-[#075056]/30 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#F8FAFC] border border-[#E4EEF0] rounded-xl text-[10px] text-[#075056] uppercase tracking-widest hover:border-[#075056] transition-colors">
            <Filter size={12} />
            <span>Sort</span>
          </button>
          <button className="bg-[#FF5B04] text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <Plus size={14} />
            <span>Add Node</span>
          </button>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredVendors.map((vendor) => (
            <motion.div
              layout
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                to={`/vendors/${vendor.id}`}
                className="group bg-white border border-[#E4EEF0] rounded-[32px] p-8 space-y-8 hover:border-[#075056] transition-all flex flex-col h-full shadow-sm hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E4EEF0] flex items-center justify-center group-hover:bg-[#FF5B04]/5 group-hover:border-[#FF5B04]/10 transition-colors">
                    <ShieldCheck size={28} strokeWidth={1} className="text-[#075056] group-hover:text-[#FF5B04]" />
                  </div>
                  <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border font-bold ${
                    vendor.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    vendor.status === 'flagged' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                    vendor.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                    'bg-[#F8FAFC] text-[#075056]/40 border-[#E4EEF0]'
                  }`}>
                    {vendor.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl text-[#075056] font-medium tracking-tight group-hover:text-[#FF5B04] transition-colors">{vendor.name}</h4>
                  <div className="flex items-center space-x-2 text-xs text-[#075056]/40">
                    <MapPin size={14} />
                    <span>{vendor.location}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-[#075056]/30 font-bold">Risk Profile</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-1.5 bg-[#F8FAFC] rounded-full overflow-hidden">
                        <div className={`h-full ${vendor.riskScore > 60 ? 'bg-red-500' : vendor.riskScore > 30 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${100 - vendor.riskScore}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-[#075056]">{100 - vendor.riskScore}% Stability</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0]">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#075056]/40">
                      <span>Annual Yield Cycle</span>
                      <TrendingUp size={12} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#075056]">Q4 Expansion</p>
                      <span className="text-xs text-[#FF5B04] font-bold">12.4% APR</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#F1F5F9] grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-[8px] uppercase tracking-widest text-[#075056]/30 font-bold">Trust</p>
                    <p className="text-sm text-[#075056] font-medium">{vendor.investorParticipation || 0}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] uppercase tracking-widest text-[#075056]/30 font-bold">Nodes</p>
                    <p className="text-sm text-[#075056] font-medium">{vendor.investorsCount}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[8px] uppercase tracking-widest text-[#075056]/30 font-bold">Raised</p>
                    <p className="text-sm text-[#075056] font-bold">₹{(vendor.raisedAmount / 1000).toFixed(1)}K</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
