import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, Sparkles, ArrowRight, Globe, Users } from "lucide-react";
import { motion } from "motion/react";

export function ApprovalSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Animated Icon Group */}
        <div className="relative flex justify-center">
           <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ 
               type: "spring",
               stiffness: 260,
               damping: 20,
               delay: 0.1 
             }}
             className="w-32 h-32 rounded-full bg-[#075056] text-white flex items-center justify-center shadow-2xl relative z-10"
           >
             <CheckCircle2 size={64} />
           </motion.div>
           
           {/* Decorative Pulses */}
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1.5, opacity: 0 }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 rounded-full bg-[#075056]/20"
           />
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 2, opacity: 0 }}
             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
             className="absolute inset-0 rounded-full bg-[#FF5B04]/10"
           />
           
           {/* Floating Sparkles */}
           <motion.div 
             animate={{ 
               y: [0, -20, 0],
               opacity: [0.5, 1, 0.5]
             }}
             transition={{ duration: 3, repeat: Infinity }}
             className="absolute -top-4 -right-4 text-[#FF5B04]"
           >
              <Sparkles size={32} />
           </motion.div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="text-4xl md:text-5xl text-[#075056] font-light"
           >
             Vendor Approved
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="text-lg text-[#075056]/60 font-medium italic"
           >
             "Listing is now active and looking for global investors."
           </motion.p>
        </div>

        {/* System Stats / Meta */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-4"
        >
           <div className="p-6 bg-white border border-[#E4EEF0] rounded-[32px] flex flex-col items-center space-y-2">
              <Globe size={24} className="text-[#075056]/40" />
              <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Network Status</p>
              <p className="text-sm font-bold text-[#075056]">Global Sync Active</p>
           </div>
           <div className="p-6 bg-white border border-[#E4EEF0] rounded-[32px] flex flex-col items-center space-y-2">
              <Users size={24} className="text-[#FF5B04]/40" />
              <p className="text-[10px] uppercase tracking-widest text-[#075056]/40 font-bold">Inbound Traffic</p>
              <p className="text-sm font-bold text-[#FF5B04]">High Demand</p>
           </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button 
            onClick={() => navigate('/vendors')}
            className="group flex items-center space-x-3 bg-[#075056] text-white px-10 py-5 rounded-[24px] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#075056]/20"
          >
            <span>Back to Terminal</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
