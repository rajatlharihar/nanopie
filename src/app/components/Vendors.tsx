import { useStakeholder } from "../context";
import { MOCK_VENDORS } from "../data";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  DollarSign, 
  Users,
  ExternalLink,
  Edit3
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Vendors() {
  const { stakeholder } = useStakeholder();
  const [filter, setFilter] = useState('all');

  if (stakeholder === 'admin') {
    return (
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#16232B]" size={16} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Search local businesses..." 
              className="w-full pl-8 pr-4 py-2 border-b border-[#F1F5F9] focus:border-[#FF5B04] outline-none text-sm transition-all bg-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-[#F1F5F9] rounded-xl text-xs text-[#075056] hover:bg-[#F8FAFC] transition-all">
              <Filter size={16} strokeWidth={1.5} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FF5B04] text-white rounded-xl text-xs transition-all hover:opacity-90">
              <Plus size={16} strokeWidth={1.5} />
              Register Vendor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {MOCK_VENDORS.map((vendor) => (
            <div 
              key={vendor.id}
              className="space-y-6 group"
            >
              <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-[#F1F5F9]">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              
              <div className="space-y-5 px-1">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-lg font-normal tracking-tight">{vendor.name}</h4>
                    <div className="flex items-center gap-2 text-[#16232B] text-xs">
                      <MapPin size={12} strokeWidth={1.5} />
                      {vendor.location}
                    </div>
                  </div>
                  <button className="text-[#16232B] p-1">
                    <MoreVertical size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border ${
                    vendor.status === 'active' ? 'border-emerald-100 text-emerald-600' : 
                    vendor.status === 'approved' ? 'border-blue-100 text-blue-600' : 'border-amber-100 text-amber-600'
                  }`}>
                    {vendor.status}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full border border-[#F1F5F9] text-[#16232B]">
                    KYC {vendor.kycStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#F1F5F9]">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#16232B]">Raised</p>
                    <p className="text-sm font-normal">${vendor.raisedAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1 border-x border-[#F1F5F9] px-4">
                    <p className="text-[9px] uppercase tracking-widest text-[#16232B]">Target</p>
                    <p className="text-sm font-normal">${vendor.fundingGoal.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[9px] uppercase tracking-widest text-[#16232B]">Risk</p>
                    <p className={`text-sm font-normal ${vendor.riskScore < 20 ? 'text-emerald-600' : 'text-[#FF5B04]'}`}>
                      {vendor.riskScore}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vendor Mobile View (My Shop)
  const myShop = MOCK_VENDORS[0]; 

  return (
    <div className="space-y-12 pt-4 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-normal tracking-tight">Business Profile</h2>
        <button className="w-10 h-10 rounded-full border border-[#F1F5F9] flex items-center justify-center text-[#075056]">
          <Edit3 size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="space-y-10">
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-[#F1F5F9] p-1">
            <img src={myShop.image} alt={myShop.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-normal tracking-tight">{myShop.name}</h3>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#16232B]">
              <MapPin size={12} strokeWidth={1.5} />
              {myShop.location}
            </div>
          </div>
          <p className="text-sm text-[#16232B] leading-relaxed max-w-xs">
            {myShop.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 border border-[#F1F5F9] rounded-2xl space-y-1 text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#16232B]">Total Payouts</p>
            <p className="text-lg font-normal text-[#075056]">$4,250.00</p>
          </div>
          <div className="p-6 border border-[#F1F5F9] rounded-2xl space-y-1 text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#16232B]">Returns Shared</p>
            <p className="text-lg font-normal text-[#FF5B04]">$842.20</p>
          </div>
        </div>
      </div>

      {/* Funding Progress - Ultra Minimal */}
      <div className="space-y-8 px-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-normal tracking-tight">Active Round</h3>
          <span className="text-[11px] text-[#FF5B04]">Phase 2</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-3xl font-normal">$3,200 <span className="text-sm text-[#16232B]">/ $5k</span></span>
            <span className="text-[11px] text-[#16232B] uppercase tracking-widest">64%</span>
          </div>
          <div className="h-1 bg-[#F8FAFC] rounded-full overflow-hidden">
            <div className="h-full bg-[#FF5B04] w-[64%] rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#16232B]">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={`avatar-stack-${i}`} className="w-5 h-5 rounded-full border border-white bg-[#F1F5F9]"></div>)}
          </div>
          <span>45 investors involved</span>
        </div>
      </div>

      <button className="w-full bg-[#075056] text-white py-4 rounded-xl text-sm transition-all hover:bg-black">
        Manage Funding Requests
      </button>
    </div>
  );
}
