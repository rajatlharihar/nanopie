import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Stakeholder = 'admin' | 'investor' | 'vendor';

export interface QueueItem {
  id: string;
  vendorName: string;
  type: 'New Vendor' | 'Funding Request' | 'Flagged Case';
  trustStatus: 'Verified' | 'Limited Data' | 'Risk';
  summary: string;
  suggestedAction: 'Approve' | 'Review' | 'Reject' | 'Recommend Approval' | 'Needs Review' | 'High Risk Flag';
  amount?: string;
  category?: string;
  location?: string;
  kycStatus?: string;
  verified?: boolean;
  cibilScore?: number;
  platformRating?: 'A' | 'B' | 'C';
  signals?: { label: string; status: string; description: string; }[];
  trustIndicators?: { type: string; active: boolean; }[];
  request?: { amount: string; purpose: string; returnType: string; };
  suggestionReason?: string;
}

export type SystemMode = 'Standard' | 'High Verification' | 'Growth';

export interface Decision {
  id: string;
  target: string;
  action: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  vendorName: string;
  message: string;
  type: string;
  priority: 'Critical' | 'High' | 'Medium';
  timestamp: string;
  status: 'Open' | 'Resolved';
}

export interface Collection {
  id: string;
  storeName: string;
  currentAmount: number;
  investors: number;
  status: 'Secured' | 'Risk' | 'Processing';
}

interface StakeholderContextType {
  stakeholder: Stakeholder;
  setStakeholder: (s: Stakeholder) => void;
  systemMode: SystemMode;
  setSystemMode: (m: SystemMode) => void;
  queue: QueueItem[];
  setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>;
  recentDecisions: Decision[];
  setRecentDecisions: React.Dispatch<React.SetStateAction<Decision[]>>;
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
  resolveComplaint: (id: string) => void;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

const StakeholderContext = createContext<StakeholderContextType | undefined>(undefined);

export function StakeholderProvider({ children }: { children: ReactNode }) {
  const [stakeholder, setStakeholder] = useState<Stakeholder>('admin');
  const [systemMode, setSystemMode] = useState<SystemMode>('Standard');
  const [queue, setQueue] = useState<QueueItem[]>([
    {
      id: "v-1",
      vendorName: "Punjab Dairy Farm",
      type: "New Vendor",
      trustStatus: "Verified",
      suggestedAction: "Recommend Approval",
      suggestionReason: "High revenue consistency (85th percentile) and verified tax filings. CIBIL score 810 indicates elite credibility.",
      category: "Agri-tech",
      location: "Ludhiana, PB",
      kycStatus: "Fully Verified",
      verified: true,
      cibilScore: 810,
      platformRating: 'A',
      summary: "Dairy production partner for northern region distribution.",
      signals: [
        { label: "GST Compliance", status: "Stable", description: "Regular filings for the last 24 months." },
        { label: "Bank Statements", status: "Normal", description: "Healthy cash flow in HDFC accounts." }
      ],
      trustIndicators: [
        { type: "Verified", active: true },
        { type: "Risk Flag", active: false },
        { type: "History", active: true }
      ],
      request: {
        amount: "₹95,000",
        purpose: "Expansion of pasteurization line",
        returnType: "Fixed Interest"
      }
    },
    {
      id: "v-2",
      vendorName: "Chennai Chipsets",
      type: "Funding Request",
      trustStatus: "Risk",
      suggestedAction: "High Risk Flag",
      suggestionReason: "Recent drop in production yields (-12%) and robotics integration risks. CIBIL score 680 is below threshold for direct approval.",
      category: "Electronics",
      location: "Chennai, TN",
      kycStatus: "Partially Verified",
      verified: false,
      cibilScore: 680,
      platformRating: 'B',
      summary: "Micro-electronics assembly node.",
      signals: [
        { label: "Production Yield", status: "Inconsistent", description: "12% drop in yield since integration." },
        { label: "Revenue Growth", status: "Stagnant", description: "No new contracts signed in Q4." }
      ],
      trustIndicators: [
        { type: "Verified", active: false },
        { type: "Risk Flag", active: true },
        { type: "History", active: true }
      ],
      request: {
        amount: "₹85,000",
        purpose: "Robotics Precision Soldering",
        returnType: "Equity"
      }
    }
  ]);
  
  const [recentDecisions, setRecentDecisions] = useState<Decision[]>([
    { id: "d1", target: "Punjab Dairy Farm", action: "Approved", timestamp: "2h ago" },
    { id: "d2", target: "Surat Silk Mills", action: "Approved", timestamp: "5h ago" },
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: "c1", vendorName: "Bengal Spices", message: "Payment Gateway Timeout during bulk collection.", type: "Technical", priority: "Critical", timestamp: "10m ago", status: "Open" },
    { id: "c2", vendorName: "Kashmiri Crafts", message: "Inventory Sync Error in regional warehouse.", type: "Logistics", priority: "High", timestamp: "1h ago", status: "Open" },
  ]);

  const [collections, setCollections] = useState<Collection[]>([
    { id: "col1", storeName: "Punjab Dairy Farm", currentAmount: 85000, investors: 12, status: "Secured" },
    { id: "col2", storeName: "Bengal Spices", currentAmount: 58000, investors: 45, status: "Processing" },
    { id: "col3", storeName: "Kashmiri Crafts", currentAmount: 38000, investors: 8, status: "Risk" },
  ]);

  const resolveComplaint = (id: string) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  return (
    <StakeholderContext.Provider value={{ 
      stakeholder, setStakeholder, 
      systemMode, setSystemMode,
      queue, setQueue, 
      recentDecisions, setRecentDecisions,
      complaints, setComplaints,
      resolveComplaint,
      collections, setCollections
    }}>
      {children}
    </StakeholderContext.Provider>
  );
}

export function useStakeholder() {
  const context = useContext(StakeholderContext);
  if (context === undefined) {
    throw new Error('useStakeholder must be used within a StakeholderProvider');
  }
  return context;
}
