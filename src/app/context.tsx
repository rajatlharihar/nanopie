import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Stakeholder = 'admin' | 'investor' | 'vendor';

export interface QueueItem {
  id: string;
  vendorName: string;
  type: 'New Vendor' | 'Funding Request' | 'Flagged Case';
  trustStatus: 'Verified' | 'Limited Data' | 'Risk';
  summary: string;
  suggestedAction: 'Approve' | 'Review' | 'Reject';
  amount?: string;
  // Additional detailed info for review
  category?: string;
  location?: string;
  kycStatus?: string;
  verified?: boolean;
  signals?: { label: string; status: string; description: string; }[];
  trustIndicators?: { type: string; active: boolean; }[];
  request?: { amount: string; purpose: string; returnType: string; };
  suggestionReason?: string;
}

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
  const [queue, setQueue] = useState<QueueItem[]>([
    {
      id: "v-1",
      vendorName: "Rajesh & Sons Logistics",
      type: "New Vendor",
      trustStatus: "Verified",
      suggestedAction: "Approve",
      suggestionReason: "High revenue consistency and verified tax filings in Mumbai.",
      category: "Supply Chain",
      location: "Mumbai, MH",
      kycStatus: "Fully Verified",
      verified: true,
      summary: "Logistics partner for western region distribution.",
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
        amount: "₹12,40,000",
        purpose: "Expansion of delivery fleet",
        returnType: "Fixed Interest"
      }
    },
    {
      id: "v-2",
      vendorName: "Aman Deep Tech Solutions",
      type: "Funding Request",
      trustStatus: "Risk",
      suggestedAction: "Reject",
      suggestionReason: "Recent drop in active user counts and inconsistent server spends.",
      category: "IT Services",
      location: "Bangalore, KA",
      kycStatus: "Partially Verified",
      verified: false,
      summary: "Cloud infrastructure provider for internal tools.",
      signals: [
        { label: "Active Users", status: "Inconsistent", description: "30% drop in active sessions since Oct." },
        { label: "Revenue Growth", status: "Stagnant", description: "No new contracts signed in Q4." }
      ],
      trustIndicators: [
        { type: "Verified", active: false },
        { type: "Risk Flag", active: true },
        { type: "History", active: true }
      ],
      request: {
        amount: "₹45,00,000",
        purpose: "R&D for AI modules",
        returnType: "Equity"
      }
    }
  ]);
  
  const [recentDecisions, setRecentDecisions] = useState<Decision[]>([
    { id: "d1", target: "Punjab Dairy Farm", action: "Approved", timestamp: "2h ago" },
    { id: "d2", target: "Surat Silk Mills", action: "Rejected", timestamp: "5h ago" },
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: "c1", vendorName: "Bengal Spices", message: "Payment Gateway Timeout during bulk collection.", type: "Technical", priority: "Critical", timestamp: "10m ago", status: "Open" },
    { id: "c2", vendorName: "Kashmiri Crafts", message: "Inventory Sync Error in regional warehouse.", type: "Logistics", priority: "High", timestamp: "1h ago", status: "Open" },
  ]);

  const [collections, setCollections] = useState<Collection[]>([
    { id: "col1", storeName: "Punjab Dairy", currentAmount: 500000, investors: 12, status: "Secured" },
    { id: "col2", storeName: "Bengal Spices", currentAmount: 1200000, investors: 45, status: "Processing" },
    { id: "col3", storeName: "Kashmiri Crafts", currentAmount: 250000, investors: 8, status: "Risk" },
  ]);

  const resolveComplaint = (id: string) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  return (
    <StakeholderContext.Provider value={{ 
      stakeholder, setStakeholder, 
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
