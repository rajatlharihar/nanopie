import React from "react";
import { ShieldCheck, Info, HelpCircle } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface CreditInsightProps {
  score?: number;
  rating?: 'A' | 'B' | 'C';
  variant?: 'compact' | 'full';
}

export function CreditInsight({ score, rating, variant = 'full' }: CreditInsightProps) {
  const getRatingColor = (r: string) => {
    switch (r) {
      case 'A': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'B': return 'text-[#075056] bg-[#075056]/5 border-[#075056]/10';
      case 'C': return 'text-orange-600 bg-orange-50 border-orange-100';
      default: return 'text-gray-400 bg-gray-50 border-gray-100';
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 750) return 'text-emerald-600';
    if (s >= 650) return 'text-[#075056]';
    return 'text-orange-600';
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-3">
        {rating && (
          <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getRatingColor(rating)}`}>
            {rating}
          </div>
        )}
        {score && (
          <div className="flex items-center space-x-1.5">
            <ShieldCheck size={12} className={getScoreColor(score)} />
            <span className={`text-xs font-medium ${getScoreColor(score)}`}>{score}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="flex items-center space-x-4">
        {/* Platform Rating */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className={`flex items-center space-x-3 p-3 rounded-2xl border cursor-help transition-all hover:shadow-sm ${getRatingColor(rating || '')}`}>
              <div className="space-y-0.5">
                <p className="text-[8px] uppercase tracking-widest opacity-60 font-bold">Platform Rating</p>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold">{rating || 'N/A'}</span>
                  <HelpCircle size={10} className="opacity-40" />
                </div>
              </div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content 
              className="bg-[#075056] text-white p-4 rounded-2xl text-[10px] max-w-[200px] shadow-xl z-[100]"
              sideOffset={5}
            >
              <p className="font-bold mb-1">How we calculate {rating} rating:</p>
              <p className="opacity-70 leading-relaxed italic">
                Based on historical repayment behavior, collection velocity, and KYC consistency over 12 months.
              </p>
              <Tooltip.Arrow className="fill-[#075056]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        {/* CIBIL Score */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div className="flex items-center space-x-3 p-3 rounded-2xl border border-[#E4EEF0] bg-white cursor-help transition-all hover:shadow-sm">
              <div className="space-y-0.5 text-[#075056]">
                <p className="text-[8px] uppercase tracking-widest text-[#075056]/40 font-bold">CIBIL Score</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-base font-bold ${getScoreColor(score || 0)}`}>{score || 'N/A'}</span>
                  <ShieldCheck size={12} className="opacity-20" />
                </div>
              </div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content 
              className="bg-white border border-[#E4EEF0] text-[#075056] p-4 rounded-2xl text-[10px] max-w-[200px] shadow-xl z-[100]"
              sideOffset={5}
            >
              <p className="font-bold mb-1">Third-party Credibility:</p>
              <p className="opacity-70 leading-relaxed">
                Direct integration with credit bureaus. Scores above 750 represent high-trust nodes.
              </p>
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  );
}
