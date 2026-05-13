import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Info, TrendingUp, AlertTriangle, X } from "lucide-react";
import { MOCK_VENDORS, Vendor } from "../data";

export function GeoMap() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Simplified markers for Indian cities based on coordinates
  const markers = MOCK_VENDORS.map(v => ({
    ...v,
    x: ((v.lng - 68) / (97 - 68)) * 100, // Normalize longitude to 0-100%
    y: 100 - ((v.lat - 8) / (37 - 8)) * 100, // Normalize latitude to 0-100%
  }));

  const riskZones = [
    { name: "North-West", risk: "Medium", color: "bg-orange-500", x: 25, y: 30 },
    { name: "South-East", risk: "Low", color: "bg-emerald-500", x: 75, y: 70 },
  ];

  return (
    <div className="relative w-full h-[600px] bg-[#075056]/5 rounded-[40px] border border-[#E4EEF0] overflow-hidden group">
      {/* Background Stylized Map Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Labels */}
      <div className="absolute top-8 left-8 space-y-1 z-10">
        <h3 className="text-xl text-[#075056] font-light">Ecosystem Geography</h3>
        <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Live Node Distribution • India</p>
      </div>

      {/* Map Controls */}
      <div className="absolute top-8 right-8 flex space-x-2 z-10">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#E4EEF0] text-[10px] font-bold text-[#075056]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>94 ACTIVE NODES</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 space-y-3 z-10 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-[#E4EEF0]">
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
