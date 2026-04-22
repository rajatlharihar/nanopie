import React from "react";
import { Link } from "react-router";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  MapPin, 
  Star,
  ShieldCheck,
  TrendingUp,
  Filter
} from "lucide-react";

export function VendorsList() {
  const vendors = [
    { id: "1", name: "Punjab Dairy Farm", type: "Agri-tech", location: "Ludhiana, PB", score: 92, investors: 24, revenue: "₹1.2L", status: "Active", upgradeIntent: "Automation of milk pasteurization line" },
    { id: "2", name: "Surat Silk Mills", type: "Manufacturing", location: "Surat, GJ", score: 84, investors: 42, revenue: "₹2.8L", status: "Active", upgradeIntent: "High-speed power loom installation" },
    { id: "3", name: "Hindustan Logistics", type: "Services", location: "Mumbai, MH", score: 45, investors: 8, revenue: "₹10.5L", status: "Flagged", upgradeIntent: "Cold-chain fleet expansion" },
    { id: "4", name: "Kashmiri Crafts", type: "Handicrafts", location: "Srinagar, JK", score: 98, investors: 15, revenue: "₹0.8L", status: "Active", upgradeIntent: "Artisan e-commerce platform dev" },
    { id: "5", name: "Bengal Spices", type: "Food & Bev", location: "Kolkata, WB", score: 95, investors: 31, revenue: "₹1.9L", status: "Active", upgradeIntent: "Solar-powered spice dehydration unit" },
    { id: "6", name: "Chennai Chipsets", type: "Electronics", location: "Chennai, TN", score: 52, investors: 12, revenue: "₹1.4L", status: "Pending", upgradeIntent: "Precision soldering robotics" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl text-[#075056] leading-none tracking-tight">Vendors</h2>
          <p className="text-sm text-[#075056]/40 italic">Manage and support the nanopie vendor network.</p>
        </div>
        <button className="bg-[#FF5B04] text-white px-6 py-2 rounded-[12px] text-xs flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <Plus size={14} />
          <span>Add New Vendor</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-[12px] border border-[#E4EEF0]">
        <div className="flex items-center space-x-4 flex-1">
          <Search size={16} className="text-[#075056]/30" />
          <input 
            type="text" 
            placeholder="Search by name, location, or type..." 
            className="text-sm bg-transparent border-none focus:outline-none placeholder-[#075056]/30 w-full"
          />
        </div>
        <div className="flex items-center space-x-3 ml-4">
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#E4EEF0] rounded-[8px] text-[10px] text-[#075056] uppercase tracking-widest">
            <Filter size={12} />
            <span>Sort</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#E4EEF0] rounded-[8px] text-[10px] text-[#075056] uppercase tracking-widest">
            <span>Status</span>
          </button>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Link 
            key={vendor.id} 
            to={`/vendors/${vendor.id}`}
            className="group bg-white border border-[#E4EEF0] rounded-[12px] p-6 space-y-6 hover:border-[#075056] transition-all flex flex-col"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-[12px] bg-[#F8FAFC] border border-[#E4EEF0] flex items-center justify-center group-hover:bg-[#FF5B04]/5 group-hover:border-[#FF5B04]/10 transition-colors">
                <ShieldCheck size={24} strokeWidth={1} className="text-[#075056] group-hover:text-[#FF5B04]" />
              </div>
              <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                vendor.status === 'Active' ? 'bg-[#075056]/5 text-[#075056] border-[#075056]/10' : 
                vendor.status === 'Flagged' ? 'bg-[#FF5B04]/5 text-[#FF5B04] border-[#FF5B04]/10' :
                'bg-[#F8FAFC] text-[#075056]/40 border-[#E4EEF0]'
              }`}>
                {vendor.status}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg text-[#075056] tracking-tight">{vendor.name}</h4>
              <div className="flex items-center space-x-2 text-xs text-[#075056]/40">
                <MapPin size={12} />
                <span>{vendor.location}</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
               <div className="space-y-2">
                  <p className="text-[8px] uppercase tracking-widest text-[#075056]/40 font-bold">Upgrade Intent</p>
                  <p className="text-[11px] text-[#075056] leading-tight font-medium bg-[#F8FAFC] p-3 rounded-xl border border-[#F1F5F9] italic">
                     "{vendor.upgradeIntent}"
                  </p>
               </div>
               
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-[8px] uppercase tracking-widest text-[#075056]/40 font-bold">Annual Yield Cycle</p>
                    <span className="text-[9px] text-[#FF5B04] font-bold">Ends in 12 Months</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#075056]/5 p-2 rounded-xl border border-[#075056]/10">
                     {[
                       { q: 'Q1', r: '2%' },
                       { q: 'Q2', r: '4%' },
                       { q: 'Q3', r: '8%' },
                       { q: 'Q4', r: '12%' },
                     ].map((step, idx) => (
                       <div key={idx} className="text-center px-2">
                          <p className="text-[7px] text-[#075056]/40 font-bold">{step.q}</p>
                          <p className="text-[10px] text-[#075056] font-bold">{step.r}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="pt-6 border-t border-[#E4EEF0] grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-widest text-[#075056]/30">Trust</p>
                <p className={`text-sm ${vendor.score > 90 ? 'text-[#075056]' : vendor.score > 70 ? 'text-[#075056]/70' : 'text-[#FF5B04]'}`}>
                  {vendor.score}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-widest text-[#075056]/30">Investors</p>
                <p className="text-sm text-[#075056]">{vendor.investors}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[8px] uppercase tracking-widest text-[#075056]/30">Revenue</p>
                <p className="text-sm text-[#075056] font-medium">{vendor.revenue}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
