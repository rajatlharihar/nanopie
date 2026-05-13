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
  status: 'active' | 'pending' | 'approved' | 'rejected';
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
}

export interface Transaction {
  id: string;
  userId: string;
  vendorId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export interface Investment {
  id: string;
  userId: string;
  vendorId: string;
  amount: number;
  status: 'active' | 'matured';
  date: string;
}

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: "Santi's Samosas",
    category: 'Food & Beverage',
    description: 'Popular local snack stall looking to expand to a second location.',
    upgradePlan: 'Acquiring high-capacity deep fryers and expanding storefront to accommodate 50+ guests.',
    location: 'Chandni Chowk, Delhi',
    lat: 28.6505,
    lng: 77.2303,
    fundingGoal: 50000,
    raisedAmount: 32000,
    investorsCount: 45,
    status: 'approved',
    riskScore: 15,
    cibilScore: 780,
    platformRating: 'A',
    fundingVelocity: 1200,
    performanceTrend: 'up',
    investorParticipation: 64,
    returnsPromised: 12,
    returnsActual: 12.5,
    joinedDate: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce70?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified'
  },
  {
    id: 'v2',
    name: 'Green Leaf Nurseries',
    category: 'Agri-tech',
    description: 'Sustainable urban farming providing fresh herbs to local restaurants.',
    upgradePlan: 'Installing automated hydroponic systems and a temperature-controlled solar greenhouse.',
    location: 'Whitefield, Bangalore',
    lat: 12.9698,
    lng: 77.7499,
    fundingGoal: 120000,
    raisedAmount: 85000,
    investorsCount: 120,
    status: 'active',
    riskScore: 22,
    cibilScore: 710,
    platformRating: 'B',
    fundingVelocity: 2500,
    performanceTrend: 'stable',
    investorParticipation: 71,
    returnsPromised: 15,
    returnsActual: 14.8,
    joinedDate: 'Feb 02, 2026',
    image: 'https://images.unsplash.com/photo-1530836361253-efad5cb2f6de?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified'
  },
  {
    id: 'v3',
    name: 'Loom & Thread',
    category: 'Handicrafts',
    description: 'Traditional weaving workshop modernizing their production tools.',
    upgradePlan: 'Replacing manual looms with computerized jacquard machines to increase production speed by 300%.',
    location: 'Varanasi, UP',
    lat: 25.3176,
    lng: 82.9739,
    fundingGoal: 30000,
    raisedAmount: 4500,
    investorsCount: 12,
    status: 'pending',
    riskScore: 35,
    cibilScore: 650,
    platformRating: 'C',
    fundingVelocity: 450,
    performanceTrend: 'down',
    investorParticipation: 15,
    returnsPromised: 18,
    returnsActual: null,
    joinedDate: 'Mar 10, 2026',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'pending'
  },
  {
    id: 'v4',
    name: 'Pulse Chai Roasters',
    category: 'Food & Beverage',
    description: 'Specialty tea roastery scaling their distribution network.',
    upgradePlan: 'Developing a direct-to-consumer mobile app and acquiring 3 electric delivery vans.',
    location: 'Cyber Hub, Gurgaon',
    lat: 28.4951,
    lng: 77.0878,
    fundingGoal: 80000,
    raisedAmount: 78000,
    investorsCount: 89,
    status: 'approved',
    riskScore: 12,
    cibilScore: 820,
    platformRating: 'A',
    fundingVelocity: 3100,
    performanceTrend: 'up',
    investorParticipation: 97,
    returnsPromised: 10,
    returnsActual: 10.2,
    joinedDate: 'Apr 05, 2026',
    image: 'https://images.unsplash.com/photo-1544787210-2211d22736c4?q=80&w=1000&auto=format&fit=crop',
    kycStatus: 'verified'
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
    description: 'Collection from Amit Sharma for Punjab Dairy'
  },
  {
    id: 't2',
    userId: 'u2',
    vendorId: 'v2',
    amount: 120000,
    type: 'deposit',
    status: 'pending',
    date: '2024-03-11T14:30:00Z',
    description: 'Bulk Investment for Bengal Spices'
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
    description: 'Regional Fund Allocation - Surat Silk'
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
