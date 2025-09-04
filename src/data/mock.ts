// Mock data for MYOB Pocket CFO

export interface KPIData {
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  sparkline?: number[];
}

export interface CashflowData {
  month: string;
  operating: number;
  investing: number;
  financing: number;
  total: number;
}

export interface RunwayData {
  month: string;
  cashBalance: number;
  projected: boolean;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'positive';
  actionable: boolean;
  suggestion?: string;
  impact?: string;
}

export interface Obligation {
  id: string;
  type: 'payroll' | 'tax' | 'invoice' | 'loan';
  description: string;
  amount: number;
  dueDate: string;
  status: 'upcoming' | 'due' | 'overdue';
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  isBaseline: boolean;
  parameters: {
    headcount?: { role: string; salary: number; startMonth: number }[];
    marketingSpendChange?: number;
    pricingChange?: number;
    paymentTermsDays?: number;
  };
  results: {
    runwayChange: number;
    breakEvenMonth: number;
    cashflowImpact: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  kpiDeltas?: { name: string; from: number; to: number }[];
  chartData?: any;
  actions?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: ChatMessage[];
}

// Current KPIs
export const currentKPIs: Record<string, KPIData> = {
  runway: {
    value: 12.5,
    change: -0.8,
    trend: 'down',
  },
  monthlyBurn: {
    value: 145000,
    change: 12000,
    trend: 'up',
    sparkline: [130000, 135000, 142000, 138000, 145000, 147000],
  },
  cashOnHand: {
    value: 1850000,
    change: -145000,
    trend: 'down',
  },
  revenueGrowth: {
    value: 15.3,
    change: 2.1,
    trend: 'up',
  },
};

// Historical cashflow data (last 12 months)
export const cashflowHistory: CashflowData[] = [
  { month: 'Jan 2024', operating: 45000, investing: -15000, financing: 0, total: 30000 },
  { month: 'Feb 2024', operating: 52000, investing: -8000, financing: 0, total: 44000 },
  { month: 'Mar 2024', operating: 48000, investing: -12000, financing: 500000, total: 536000 },
  { month: 'Apr 2024', operating: 55000, investing: -20000, financing: 0, total: 35000 },
  { month: 'May 2024', operating: 51000, investing: -15000, financing: 0, total: 36000 },
  { month: 'Jun 2024', operating: 58000, investing: -18000, financing: 0, total: 40000 },
  { month: 'Jul 2024', operating: 62000, investing: -22000, financing: 0, total: 40000 },
  { month: 'Aug 2024', operating: 65000, investing: -25000, financing: 0, total: 40000 },
  { month: 'Sep 2024', operating: 59000, investing: -19000, financing: 0, total: 40000 },
  { month: 'Oct 2024', operating: 48000, investing: -16000, financing: 0, total: 32000 },
  { month: 'Nov 2024', operating: 42000, investing: -14000, financing: 0, total: 28000 },
  { month: 'Dec 2024', operating: 38000, investing: -13000, financing: 0, total: 25000 },
];

// Runway projection data
export const runwayProjection: RunwayData[] = [
  { month: 'Dec 2024', cashBalance: 1850000, projected: false },
  { month: 'Jan 2025', cashBalance: 1705000, projected: true },
  { month: 'Feb 2025', cashBalance: 1560000, projected: true },
  { month: 'Mar 2025', cashBalance: 1415000, projected: true },
  { month: 'Apr 2025', cashBalance: 1270000, projected: true },
  { month: 'May 2025', cashBalance: 1125000, projected: true },
  { month: 'Jun 2025', cashBalance: 980000, projected: true },
  { month: 'Jul 2025', cashBalance: 835000, projected: true },
  { month: 'Aug 2025', cashBalance: 690000, projected: true },
  { month: 'Sep 2025', cashBalance: 545000, projected: true },
  { month: 'Oct 2025', cashBalance: 400000, projected: true },
  { month: 'Nov 2025', cashBalance: 255000, projected: true },
  { month: 'Dec 2025', cashBalance: 110000, projected: true },
  { month: 'Jan 2026', cashBalance: -35000, projected: true },
];

// Insights feed
export const insights: Insight[] = [
  {
    id: '1',
    title: 'Marketing spend increased 18% this month',
    description: 'Digital advertising costs are trending higher than budgeted',
    severity: 'warning',
    actionable: true,
    suggestion: 'Consider reducing ad spend by 10% to extend runway by 0.5 months',
    impact: 'Extends runway to 13.0 months',
  },
  {
    id: '2',
    title: 'Revenue growth accelerating',
    description: 'Monthly recurring revenue up 15.3% vs last month',
    severity: 'positive',
    actionable: false,
    impact: 'On track for 180% annual growth rate',
  },
  {
    id: '3',
    title: 'Consider delaying Q1 hires',
    description: '2 engineering positions planned for January',
    severity: 'info',
    actionable: true,
    suggestion: 'Delay hires to March to extend runway by 2.8 months',
    impact: 'Extends runway to 15.3 months',
  },
  {
    id: '4',
    title: 'Office lease renewal due',
    description: 'Current lease expires in March 2025',
    severity: 'info',
    actionable: true,
    suggestion: 'Negotiate remote-first policy to reduce office space',
    impact: 'Could save $8,000/month in rent',
  },
];

// Upcoming obligations
export const upcomingObligations: Obligation[] = [
  {
    id: '1',
    type: 'payroll',
    description: 'Monthly payroll',
    amount: 125000,
    dueDate: '2025-01-15',
    status: 'upcoming',
  },
  {
    id: '2',
    type: 'tax',
    description: 'GST/VAT payment',
    amount: 18500,
    dueDate: '2025-01-28',
    status: 'upcoming',
  },
  {
    id: '3',
    type: 'invoice',
    description: 'AWS infrastructure',
    amount: 12800,
    dueDate: '2025-01-10',
    status: 'due',
  },
  {
    id: '4',
    type: 'loan',
    description: 'Equipment financing',
    amount: 5200,
    dueDate: '2025-01-20',
    status: 'upcoming',
  },
];

// Sample scenarios
export const scenarios: Scenario[] = [
  {
    id: 'baseline',
    name: 'Base Case',
    description: 'Current trajectory with planned hires',
    isBaseline: true,
    parameters: {
      headcount: [
        { role: 'Senior Engineer', salary: 150000, startMonth: 1 },
        { role: 'Product Manager', salary: 130000, startMonth: 2 },
      ],
      marketingSpendChange: 0,
      pricingChange: 0,
      paymentTermsDays: 30,
    },
    results: {
      runwayChange: 0,
      breakEvenMonth: 18,
      cashflowImpact: 0,
    },
  },
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Delay hires, reduce marketing spend',
    isBaseline: false,
    parameters: {
      headcount: [
        { role: 'Senior Engineer', salary: 150000, startMonth: 4 },
      ],
      marketingSpendChange: -20,
      pricingChange: 0,
      paymentTermsDays: 30,
    },
    results: {
      runwayChange: 3.2,
      breakEvenMonth: 20,
      cashflowImpact: 25000,
    },
  },
  {
    id: 'aggressive',
    name: 'Aggressive Growth',
    description: 'Double marketing, hire faster',
    isBaseline: false,
    parameters: {
      headcount: [
        { role: 'Senior Engineer', salary: 150000, startMonth: 1 },
        { role: 'Product Manager', salary: 130000, startMonth: 1 },
        { role: 'Sales Director', salary: 140000, startMonth: 2 },
        { role: 'Marketing Manager', salary: 120000, startMonth: 2 },
      ],
      marketingSpendChange: 100,
      pricingChange: 15,
      paymentTermsDays: 15,
    },
    results: {
      runwayChange: -2.1,
      breakEvenMonth: 14,
      cashflowImpact: -45000,
    },
  },
];

// Sample conversation data
export const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: 'Runway with new hires',
    lastMessage: 'Your runway would decrease to 9.7 months...',
    timestamp: '2024-12-29 14:30',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'What happens to our runway if I hire 2 engineers next month?',
        timestamp: '2024-12-29 14:28',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'If you hire 2 senior engineers next month at $150k each, your runway would decrease from 12.5 to 9.7 months. Here\'s the breakdown:\n\n**Impact Analysis:**\n- Additional monthly burn: $25k (salary + benefits)\n- New runway: 9.7 months (down 2.8 months)\n- Cash depletion: October 2025 → July 2025\n\n**Recommendations:**\n- Consider staggered hiring (1 in Jan, 1 in Mar)\n- This would extend runway to 11.2 months\n- Alternative: Focus on revenue growth to offset burn',
        timestamp: '2024-12-29 14:30',
        kpiDeltas: [
          { name: 'Runway', from: 12.5, to: 9.7 },
          { name: 'Monthly Burn', from: 145000, to: 170000 },
        ],
        actions: ['Create Scenario from this', 'Export as Investor Update'],
      },
    ],
  },
  {
    id: '2',
    title: 'Marketing budget optimization',
    lastMessage: 'A 20% reduction would extend your runway...',
    timestamp: '2024-12-28 16:45',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Should I reduce marketing spend to extend runway?',
        timestamp: '2024-12-28 16:43',
      },
      {
        id: '2',
        role: 'assistant',
        content: 'A 20% reduction in marketing spend would extend your runway by 0.6 months, but consider the trade-offs:\n\n**Financial Impact:**\n- Monthly savings: $8,000\n- Extended runway: 13.1 months\n- Break-even delay: +1 month\n\n**Growth Trade-offs:**\n- Potential 15% reduction in new customer acquisition\n- May slow path to profitability\n- Consider optimizing spend rather than cutting',
        timestamp: '2024-12-28 16:45',
        actions: ['Analyze marketing ROI', 'Create Conservative Scenario'],
      },
    ],
  },
];

// Chart themes matching MYOB colors
export const chartConfig = {
  colors: {
    primary: '#7b14ef',
    secondary: '#c497fe',
    accent: '#ebdcfd',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
};
