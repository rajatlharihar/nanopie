import React from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

export function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center text-[#075056]"
    >
      <div className="relative w-full max-w-lg px-8">
        {/* Decorative Circles */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 -m-20 border-2 border-[#075056]/5 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 -m-40 border border-[#075056]/5 rounded-full"
        />

        {/* Logo Container */}
        <div className="flex flex-col items-center space-y-12 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[280px] md:max-w-[420px]"
          >
            <img src="/logo.svg" alt="Nanopie Logo" className="w-full h-auto object-contain" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center justify-center space-x-3 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#075056]"
          >
            <div className="h-px w-8 bg-[#075056]/20" />
            <span>Security Terminal</span>
            <div className="h-px w-8 bg-[#075056]/20" />
          </motion.div>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 md:w-64 space-y-4">
        <div className="h-[2px] w-full bg-[#075056]/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-[#FF5B04]"
          />
        </div>
        <div className="flex items-center justify-between text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-[#075056]/30">
          <div className="flex items-center space-x-2">
            <Zap size={10} className="text-[#FF5B04] animate-pulse" />
            <span>Establishing Node Connection</span>
          </div>
          <span>v2.0.4</span>
        </div>
      </div>
    </motion.div>
  );
}
