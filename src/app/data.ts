export interface RevenuePoint {
  month: string;
  amount: number;
}

export interface Competitor {
  name: string;
  share: number;
  color: string;
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface Document {
  name: string;
  status: string;
  date: string;
  type: string;
}

export interface VendorInvestment {
  investorName: string;
  amount: number;
  returnPlan: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  upgradePlan: string;
  location: string;
  lat: number;
  lng: number;
  fundingGoal: number;
  raisedAmount: number;
  investorsCount: number;
  status: 'active' | 'pending' | 'approved' | 'rejected' | 'flagged';
  riskScore: number;
  kycStatus: 'pending' | 'verified' | 'flagged';
  image: string;
  cibilScore?: number;
  platformRating?: 'A' | 'B' | 'C';
  fundingVelocity?: number; // ₹/day
  performanceTrend?: 'up' | 'down' | 'stable';
  investorParticipation?: number; // percentage
  returnsPromised?: number; // percentage
  returnsActual?: number; // percentage
  joinedDate?: string;
  revenueHistory: RevenuePoint[];
  competitors: Competitor[];
  reviews: Review[];
  documents: Document[];
  investments: VendorInvestment[];
  insightNotification?: {
    title: string;
    description: string;
    actionLabel: string;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  vendorId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'investment';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

export interface Investment {
  id: string;
  userId: string;
  vendorId: string;
  amount: number;
  status: 'active' | 'exited' | 'pending';
  date: string;
}

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: "Cubbon Park Organics",
    category: 'Agri-tech',
    description: 'Specializing in high-yield urban farming and automated hydroponics.',
    upgradePlan: 'Automation of hydroponic lines and expansion of cold storage.',
    location: 'Ashok Nagar, BLR',
    lat: 12.9730,
    lng: 77.6010,
    fundingGoal: 95000,
    raisedAmount: 85000,
    investorsCount: 24,
    status: 'approved',
    riskScore: 8,
    cibilScore: 810,
    platformRating: 'A',
    fundingVelocity: 2800,
    performanceTrend: 'up',
    investorParticipation: 92,
    returnsPromised: 12,
    returnsActual: 12.5,
    joinedDate: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified',
    revenueHistory: [
      { month: 'Jan', amount: 42000 }, { month: 'Feb', amount: 45000 }, { month: 'Mar', amount: 48000 },
      { month: 'Apr', amount: 51000 }, { month: 'May', amount: 54000 }, { month: 'Jun', amount: 58000 }
    ],
    competitors: [
      { name: 'Local Farms', share: 45, color: 'bg-[#075056]' },
      { name: "Cubbon Organics", share: 32, color: 'bg-[#FF5B04]' },
      { name: 'Others', share: 23, color: 'bg-[#E4EEF0]' }
    ],
    reviews: [
      { user: 'Amit S.', comment: 'Purest greens in Ashok Nagar.', rating: 5 },
      { user: 'Gurpreet K.', comment: 'Reliable delivery every morning.', rating: 5 }
    ],
    documents: [
      { name: 'Aadhar Card', status: 'Attached', date: '12 Jan 2024', type: 'Identity' },
      { name: 'Trade License', status: 'Attached', date: '14 Jan 2024', type: 'Legal' }
    ],
    investments: [
      { investorName: 'Rahul Khanna', amount: 25000, returnPlan: '12% APR Fixed', date: '10 Jan 2024' },
      { investorName: 'Priya Mehta', amount: 35000, returnPlan: '14.5% Yield Cycle', date: '15 Jan 2024' },
      { investorName: 'Suresh Iyer', amount: 25000, returnPlan: 'Revenue Share (2%)', date: '20 Jan 2024' }
    ],
    insightNotification: {
      title: 'Automation Efficiency Gain',
      description: 'The new hydroponic line has reduced energy costs by 18%. Recommend re-investing surplus.',
      actionLabel: 'Audit Energy'
    }
  },
  {
    id: 'v2',
    name: 'Commercial Street Silks',
    category: 'Manufacturing',
    description: 'Premium silk weaving and distribution for local luxury boutiques.',
    upgradePlan: 'High-speed power loom installation to triple production output.',
    location: 'Shivajinagar, BLR',
    lat: 12.9820,
    lng: 77.6080,
    fundingGoal: 98000,
    raisedAmount: 92000,
    investorsCount: 42,
    status: 'approved',
    riskScore: 12,
    cibilScore: 780,
    platformRating: 'A',
    fundingVelocity: 3100,
    performanceTrend: 'up',
    investorParticipation: 84,
    returnsPromised: 15,
    returnsActual: 14.8,
    joinedDate: 'Feb 02, 2026',
    image: 'https://images.unsplash.com/photo-1544787210-2211d22736c4?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified',
    revenueHistory: [
      { month: 'Jan', amount: 62000 }, { month: 'Feb', amount: 65000 }, { month: 'Mar', amount: 60000 },
      { month: 'Apr', amount: 68000 }, { month: 'May', amount: 72000 }, { month: 'Jun', amount: 75000 }
    ],
    competitors: [
      { name: 'Regional Mills', share: 50, color: 'bg-[#075056]' },
      { name: 'Comm Street Silks', share: 25, color: 'bg-[#FF5B04]' },
      { name: 'Others', share: 25, color: 'bg-[#E4EEF0]' }
    ],
    reviews: [
      { user: 'Rajiv M.', comment: 'Quality is exceptional.', rating: 5 },
      { user: 'Leila D.', comment: 'Delivery times can improve.', rating: 4 }
    ],
    documents: [
      { name: 'PAN Card', status: 'Attached', date: '05 Feb 2024', type: 'Identity' },
      { name: 'GST Certificate', status: 'Attached', date: '08 Feb 2024', type: 'Legal' }
    ],
    investments: [
      { investorName: 'Amit Shah', amount: 45000, returnPlan: '15% Equity Payout', date: '01 Feb 2024' },
      { investorName: 'Neha Gupta', amount: 25000, returnPlan: '14.8% Fixed Yield', date: '05 Feb 2024' },
      { investorName: 'Vikram Seth', amount: 22000, returnPlan: 'Revenue Share (1.5%)', date: '10 Feb 2024' }
    ],
    insightNotification: {
      title: 'Regional Supply Chain Fluctuation',
      description: 'Raw silk prices have spiked in the Shivajinagar cluster. Verify contract pricing.',
      actionLabel: 'Verify Contracts'
    }
  },
  {
    id: 'v3',
    name: 'Indiranagar Cold Chain',
    category: 'Services',
    description: 'Specialized logistics for pharmaceutical and cold-chain goods.',
    upgradePlan: 'Cold-chain fleet expansion with 5 new refrigerated trucks.',
    location: 'Indiranagar, BLR',
    lat: 12.9780,
    lng: 77.6380,
    fundingGoal: 100000,
    raisedAmount: 45000,
    investorsCount: 8,
    status: 'flagged',
    riskScore: 45,
    cibilScore: 620,
    platformRating: 'C',
    fundingVelocity: 1200,
    performanceTrend: 'down',
    investorParticipation: 45,
    returnsPromised: 18,
    returnsActual: null,
    joinedDate: 'Mar 10, 2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'pending',
    revenueHistory: [
      { month: 'Jan', amount: 15000 }, { month: 'Feb', amount: 12000 }, { month: 'Mar', amount: 10000 },
      { month: 'Apr', amount: 9000 }, { month: 'May', amount: 8000 }, { month: 'Jun', amount: 7500 }
    ],
    competitors: [
      { name: 'Global Logistics', share: 70, color: 'bg-[#075056]' },
      { name: 'Indiranagar Cold', share: 10, color: 'bg-[#FF5B04]' },
      { name: 'Others', share: 20, color: 'bg-[#E4EEF0]' }
    ],
    reviews: [
      { user: 'Sanjay R.', comment: 'Struggling with traffic delays.', rating: 2 },
      { user: 'Vikram A.', comment: 'Good intent, but execution is lagging.', rating: 3 }
    ],
    documents: [
      { name: 'Truck RC', status: 'Attached', date: '10 Mar 2024', type: 'Asset' },
      { name: 'Insurance Policy', status: 'Expired', date: '12 Mar 2024', type: 'Legal' }
    ],
    investments: [
      { investorName: 'Rohan Mehra', amount: 15000, returnPlan: '18% High Yield', date: '01 Mar 2024' },
      { investorName: 'Sia Khan', amount: 15000, returnPlan: '18% APR Fixed', date: '05 Mar 2024' },
      { investorName: 'Arjun Das', amount: 15000, returnPlan: 'Exit Plan B', date: '10 Mar 2024' }
    ],
    insightNotification: {
      title: 'Liquidity Warning',
      description: 'Fleet maintenance costs are exceeding monthly revenue. Urgent audit required.',
      actionLabel: 'Review Fleet'
    }
  },
  {
    id: 'v4',
    name: 'Ulsoor Handicrafts',
    category: 'Handicrafts',
    description: 'Traditional wood carving and pottery.',
    upgradePlan: 'Artisan e-commerce platform development to bypass middlemen.',
    location: 'Ulsoor, BLR',
    lat: 12.9780,
    lng: 77.6240,
    fundingGoal: 40000,
    raisedAmount: 38000,
    investorsCount: 15,
    status: 'approved',
    riskScore: 5,
    cibilScore: 750,
    platformRating: 'A',
    fundingVelocity: 950,
    performanceTrend: 'up',
    investorParticipation: 98,
    returnsPromised: 14,
    returnsActual: 14.2,
    joinedDate: 'Apr 05, 2026',
    image: 'https://images.unsplash.com/photo-1610116303244-cd4398696032?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified',
    revenueHistory: [
      { month: 'Jan', amount: 25000 }, { month: 'Feb', amount: 28000 }, { month: 'Mar', amount: 32000 },
      { month: 'Apr', amount: 35000 }, { month: 'May', amount: 38000 }, { month: 'Jun', amount: 42000 }
    ],
    competitors: [
      { name: 'State Emporium', share: 55, color: 'bg-[#075056]' },
      { name: 'Ulsoor Crafts', share: 20, color: 'bg-[#FF5B04]' },
      { name: 'Others', share: 25, color: 'bg-[#E4EEF0]' }
    ],
    reviews: [
      { user: 'Zaid H.', comment: 'Best sandalwood carving I have ever seen.', rating: 5 },
      { user: 'Sarah L.', comment: 'The pottery is incredibly detailed.', rating: 5 }
    ],
    documents: [
      { name: 'Handicraft ID', status: 'Attached', date: '05 Apr 2024', type: 'Identity' },
      { name: 'Address Proof', status: 'Attached', date: '08 Apr 2024', type: 'Address' }
    ],
    investments: [
      { investorName: 'Farhan Sheikh', amount: 15000, returnPlan: '14.2% Fixed APR', date: '01 Apr 2024' },
      { investorName: 'Ananya Birla', amount: 13000, returnPlan: 'Impact Yield', date: '05 Apr 2024' },
      { investorName: 'Kabir Vohra', amount: 10000, returnPlan: 'Artisan Revenue Share', date: '10 Apr 2024' }
    ],
    insightNotification: {
      title: 'E-commerce Potential',
      description: 'Direct sales could increase margins by 220%. Ready for platform launch.',
      actionLabel: 'Launch Platform'
    }
  },
  {
    id: 'v5',
    name: 'Richmond Town Spices',
    category: 'Food & Bev',
    description: 'Organic spice processing and organic farm-to-table supply.',
    upgradePlan: 'Solar-powered spice dehydration unit to maintain nutrient density.',
    location: 'Richmond Town, BLR',
    lat: 12.9660,
    lng: 77.5960,
    fundingGoal: 65000,
    raisedAmount: 58000,
    investorsCount: 31,
    status: 'approved',
    riskScore: 10,
    cibilScore: 790,
    platformRating: 'A',
    fundingVelocity: 1800,
    performanceTrend: 'up',
    investorParticipation: 95,
    returnsPromised: 11,
    returnsActual: 11.4,
    joinedDate: 'May 12, 2026',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified',
    revenueHistory: [
      { month: 'Jan', amount: 35000 }, { month: 'Feb', amount: 38000 }, { month: 'Mar', amount: 42000 },
      { month: 'Apr', amount: 45000 }, { month: 'May', amount: 48000 }, { month: 'Jun', amount: 52000 }
    ],
    competitors: [
      { name: 'Mass Brands', share: 65, color: 'bg-[#075056]' },
      { name: 'Richmond Spices', share: 15, color: 'bg-[#FF5B04]' },
      { name: 'Others', share: 20, color: 'bg-[#E4EEF0]' }
    ],
    reviews: [
      { user: 'Rina B.', comment: 'The aroma is totally different from store bought.', rating: 5 },
      { user: 'Anil D.', comment: 'Packaging could be better.', rating: 4 }
    ],
    documents: [
      { name: 'Organic Cert', status: 'Attached', date: '12 May 2024', type: 'Legal' },
      { name: 'Trade License', status: 'Attached', date: '15 May 2024', type: 'Legal' }
    ],
    investments: [
      { investorName: 'Debu Das', amount: 20000, returnPlan: '11.4% Fixed APR', date: '01 May 2024' },
      { investorName: 'Sumit Roy', amount: 20000, returnPlan: 'Organic Yield Cycle', date: '05 May 2024' },
      { investorName: 'Pooja Sen', amount: 18000, returnPlan: 'Eco-Impact Share', date: '10 May 2024' }
    ],
    insightNotification: {
      title: 'Solar Efficiency Audit',
      description: 'Solar dehydration has reduced drying time by 60%. Supply chain optimized.',
      actionLabel: 'Verify Supply'
    }
  },
  {
    id: 'v6',
    name: 'SP Road Electronics',
    category: 'Electronics',
    description: 'Micro-electronics assembly and precision soldering.',
    upgradePlan: 'Precision soldering robotics for high-density component boards.',
    location: 'SP Road, BLR',
    lat: 12.9640,
    lng: 77.5790,
    fundingGoal: 85000,
    raisedAmount: 42000,
    investorsCount: 12,
    status: 'pending',
    riskScore: 28,
    cibilScore: 680,
    platformRating: 'B',
    fundingVelocity: 1500,
    performanceTrend: 'stable',
    investorParticipation: 52,
    returnsPromised: 20,
    returnsActual: null,
    joinedDate: 'Jun 20, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'pending',
    revenueHistory: [
      { month: 'Jan', amount: 30000 }, { month: 'Feb', amount: 32000 }, { month: 'Mar', amount: 35000 },
      { month: 'Apr', amount: 38000 }, { month: 'May', amount: 41000 }, { month: 'Jun', amount: 45000 }
    ],
    competitors: [
      { name: 'Component Co.', share: 45, color: 'bg-[#075056]' },
      { name: 'SP Road Traders', share: 20, color: 'bg-[#FF5B04]' },
      { name: 'Others', share: 35, color: 'bg-[#E4EEF0]' }
    ],
    reviews: [
      { user: 'Karthik P.', comment: 'High precision, but scaling is slow.', rating: 4 },
      { user: 'Meena S.', comment: 'Good technical skills.', rating: 4 }
    ],
    documents: [
      { name: 'Factory Audit', status: 'Attached', date: '20 Jun 2024', type: 'Legal' },
      { name: 'ISO 9001', status: 'In Process', date: '25 Jun 2024', type: 'Legal' }
    ],
    investments: [
      { investorName: 'Madhavan R.', amount: 15000, returnPlan: '20% Tech Alpha', date: '01 Jun 2024' },
      { investorName: 'Vijay K.', amount: 15000, returnPlan: 'Fixed 18% Yield', date: '05 Jun 2024' },
      { investorName: 'Sneha M.', amount: 12000, returnPlan: 'Revenue Share (3%)', date: '10 Jun 2024' }
    ],
    insightNotification: {
      title: 'Robotics Integration',
      description: 'Proposed robotics unit requires specialized power grid setup. Verify node capacity.',
      actionLabel: 'Verify Grid'
    }
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    userId: 'u1',
    vendorId: 'v1',
    amount: 50000,
    type: 'deposit',
    status: 'completed',
    date: '2024-03-10T10:00:00Z',
    description: 'Collection from Amit Sharma for Cubbon Park Organics'
  },
  {
    id: 't2',
    userId: 'u2',
    vendorId: 'v2',
    amount: 120000,
    type: 'deposit',
    status: 'pending',
    date: '2024-03-11T14:30:00Z',
    description: 'Bulk Investment for Richmond Town Spices'
  },
  {
    id: 't3',
    userId: 'u3',
    vendorId: 'v1',
    amount: 25000,
    type: 'withdrawal',
    status: 'completed',
    date: '2024-03-12T09:15:00Z',
    description: 'Payout to Rahul K. (Earnings)'
  },
  {
    id: 't4',
    userId: 'u4',
    vendorId: 'v4',
    amount: 85000,
    type: 'deposit',
    status: 'completed',
    date: '2024-03-13T16:45:00Z',
    description: 'Regional Fund Allocation - Commercial Street Silks'
  }
];

export const MOCK_INVESTMENTS: Investment[] = [
  {
    id: 'inv1',
    userId: 'u1',
    vendorId: 'v1',
    amount: 1200,
    status: 'active',
    date: '2024-01-15T00:00:00Z'
  },
  {
    id: 'inv2',
    userId: 'u1',
    vendorId: 'v2',
    amount: 850,
    status: 'active',
    date: '2024-02-01T00:00:00Z'
  }
];
