import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Info, TrendingUp, AlertTriangle, X } from "lucide-react";
import { MOCK_VENDORS, Vendor } from "../data";

export function GeoMap() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Simplified markers for Central Bangalore based on coordinates
  const markers = MOCK_VENDORS.map(v => ({
    ...v,
    x: ((v.lng - 77.55) / 0.1) * 100, // Normalize longitude around Bangalore (77.55 to 77.65)
    y: 100 - ((v.lat - 12.95) / 0.05) * 100, // Normalize latitude around Bangalore (12.95 to 13.00)
  }));

  const riskZones = [
    { name: "North-West", risk: "Medium", color: "bg-orange-500", x: 25, y: 30 },
    { name: "South-East", risk: "Low", color: "bg-emerald-500", x: 75, y: 70 },
  ];

  return (
    <div className="relative w-full h-full bg-[#075056]/5 rounded-[40px] border border-[#E4EEF0] overflow-hidden group">
      {/* Abstract City Grid/Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none p-12">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-[600px] text-[#075056]" fill="none" stroke="currentColor" strokeWidth="0.5">
          {/* Concentric Circles */}
          <circle cx="50" cy="50" r="10" />
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="40" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="55" />
          {/* Grid Lines */}
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="15" y1="15" x2="85" y2="85" strokeDasharray="1,3" />
          <line x1="15" y1="85" x2="85" y2="15" strokeDasharray="1,3" />
        </svg>
      </div>

      {/* Map Labels */}
      <div className="absolute top-8 left-8 space-y-1 z-10">
        <h3 className="text-xl text-[#075056] font-light">Ecosystem Geography</h3>
        <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Live Node Distribution • Central Bangalore</p>
      </div>

      {/* Map Controls */}
      <div className="absolute top-8 right-8 flex space-x-2 z-10">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#E4EEF0] text-[10px] font-bold text-[#075056]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>94 ACTIVE NODES</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-12 left-8 space-y-3 z-10 bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-[#E4EEF0] shadow-xl">
        <p className="text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold mb-1">Density Legend</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-[#FF5B04]"></div>
            <span className="text-[10px] text-[#075056]/60">High Funding Demand</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-[#075056]"></div>
            <span className="text-[10px] text-[#075056]/60">Established Stable Nodes</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/40 animate-pulse"></div>
            <span className="text-[10px] text-[#075056]/60">Risk Cluster detected</span>
          </div>
        </div>
      </div>

      {/* The "Map" Area */}
      <div className="relative w-full h-full p-20">
        {/* Risk Zones (Blurred Orbs) */}
        {riskZones.map((zone, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            className={`absolute w-64 h-64 rounded-full blur-3xl ${zone.color}`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}

        {/* Vendor Markers */}
        {markers.map((vendor) => (
          <motion.button
            key={vendor.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.2, zIndex: 20 }}
            onClick={() => setSelectedVendor(vendor)}
            className="absolute group/marker"
            style={{ left: `${vendor.x}%`, top: `${vendor.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className={`relative p-2 rounded-full border-2 bg-white transition-all ${
              vendor.status === 'pending' ? 'border-[#FF5B04] text-[#FF5B04]' : 'border-[#075056] text-[#075056]'
            } shadow-lg group-hover/marker:shadow-[#075056]/20`}>
              <MapPin size={16} />
              {/* Pulse effect for high funding or risk */}
              {vendor.riskScore > 30 && (
                <div className="absolute inset-0 rounded-full border-2 border-[#FF5B04] animate-ping opacity-40"></div>
              )}
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#075056] text-white text-[10px] rounded-lg opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {vendor.name}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick Summary Card */}
      <AnimatePresence>
        {selectedVendor && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-8 right-8 w-80 bg-white rounded-[32px] shadow-2xl border border-[#E4EEF0] overflow-hidden z-20"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-[#075056]/40 font-bold">{selectedVendor.category}</p>
                  <h4 className="text-lg text-[#075056] font-medium">{selectedVendor.name}</h4>
                </div>
                <button 
                  onClick={() => setSelectedVendor(null)}
                  className="p-2 hover:bg-[#F8FAFC] rounded-full transition-colors text-[#075056]/20 hover:text-[#075056]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-[#075056]/40 font-bold">Trust Rating</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-[#075056]">{selectedVendor.platformRating}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E4EEF0] space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-[#075056]/40 font-bold">CIBIL Score</p>
                  <p className="text-lg text-[#075056] font-medium">{selectedVendor.cibilScore || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px]">
                  <span className="text-[#075056]/40">Funding Velocity</span>
                  <span className="text-[#075056] font-bold">₹{selectedVendor.fundingVelocity?.toLocaleString()}/day</span>
                </div>
                <div className="h-1.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden">
                  <div className="h-full bg-[#075056] w-2/3"></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F8FAFC]">
                <div className="flex items-center space-x-2 text-[10px] text-emerald-600 font-bold">
                  <TrendingUp size={12} />
                  <span>{selectedVendor.performanceTrend === 'up' ? '+12% Growth' : 'Stable'}</span>
                </div>
                <button className="text-[10px] uppercase tracking-widest text-[#FF5B04] font-bold hover:underline">
                  View Full Node Detail
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
