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
    <div className="relative w-full h-full bg-[#075056]/5 rounded-[40px] border border-[#E4EEF0] overflow-hidden group">
      {/* Actual India Map Background Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none p-12">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-[600px] text-[#075056]" fill="currentColor">
          <path d="M50,5 C55,8 60,5 65,10 C70,15 68,25 72,30 C76,35 85,38 88,45 C91,52 85,65 80,75 C75,85 65,92 55,95 C45,98 35,95 25,90 C15,85 5,75 8,65 C11,55 20,45 25,35 C30,25 35,15 42,10 C45,8 48,5 50,5 Z" />
          {/* Simple representative shape of India - a bit more refined than a circle */}
          <path d="M51.5 5.5L54 8.5L57 10L61.5 12L65 16L68 19L72 23L75 28L78.5 33L82 39L84 46L85.5 54L84.5 61L81 68L76 74L70 80L63 85L55 89L46 91L37 91L29 88L22 83L17 76L13 68L10 59L9.5 50L11.5 41L15 33L20 26L26 20L33 14L41 9L48 6.5L51.5 5.5Z" />
          {/* More accurate India outline (simplified) */}
          <path d="M48.5,4.5 C52.2,4.8 55.4,7.4 58.1,9.8 C61.2,12.5 64.1,15.6 67.2,18.5 C70.5,21.6 74.2,24.5 77.4,27.8 C80.4,30.9 83.1,34.5 85.3,38.5 C87.3,42.4 88.5,46.8 88.8,51.2 C89.1,55.9 88.2,60.6 86.4,65.0 C84.5,69.5 81.6,73.5 77.9,76.8 C73.9,80.4 69.1,83.1 64.1,85.2 C58.9,87.4 53.3,88.7 47.7,88.9 C42.1,89.1 36.4,88.4 31.1,86.6 C26.1,84.9 21.4,82.3 17.5,78.8 C13.9,75.6 11.1,71.7 9.3,67.3 C7.5,62.8 6.8,58.0 7.2,53.2 C7.6,48.4 9.1,43.8 11.5,39.7 C14.0,35.4 17.4,31.7 21.3,28.6 C25.4,25.4 30.1,23.0 35.1,21.5 C39.6,20.2 44.3,19.6 48.9,19.8 C53.4,20.0 57.8,21.1 61.9,23.0" fill="none" stroke="currentColor" strokeWidth="0.5" />
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
