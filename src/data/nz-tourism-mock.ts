// NZ Tourism Business Mock Data for MYOB Pocket CFO
// Aroha's tourism operating + booking platform

export interface TourismKPI {
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  sparkline?: number[];
  period: string;
}

export interface CashflowData {
  month: string;
  operating: number;
  investing: number;
  financing: number;
  total: number;
}

export interface SeasonalityData {
  month: string;
  multiplier: number;
  bookings: number;
  revenue: number;
  cancellationRate: number;
}

export interface FXData {
  date: string;
  nzdAudRate: number;
  nzdUsdRate: number;
}

export interface ARAgingBucket {
  bucket: '0-30' | '31-60' | '61-90' | '90+';
  amount: number;
  count: number;
  percentage: number;
}

export interface CollectionItem {
  id: string;
  customerName: string;
  amount: number;
  daysOverdue: number;
  lastContact: string;
  predictedPayDate: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggestedAction: string;
  contactScript?: string;
}

export interface GSTObligation {
  period: string;
  dueDate: string;
  estimatedAmount: number;
  status: 'upcoming' | 'due' | 'paid' | 'overdue';
  taxableSupplies: number;
  zeroRatedExports: number;
  inputTaxCredits: number;
}

export interface TourismInsight {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'positive';
  category: 'runway' | 'seasonality' | 'pricing' | 'collections' | 'gst' | 'fx';
  impact: string;
  actions: string[];
  priority: number;
  seasonRelevant?: boolean;
}

export interface PayrollObligation {
  id: string;
  type: 'salary' | 'wages' | 'kiwisaver' | 'acc' | 'paye';
  description: string;
  amount: number;
  dueDate: string;
  frequency: 'fortnightly' | 'monthly';
  employees: number;
}

export interface AIAlert {
  id: string;
  type: 'warning' | 'opportunity' | 'critical' | 'info';
  category: 'cashflow' | 'growth' | 'risk' | 'compliance' | 'efficiency' | 'fundraising';
  title: string;
  description: string;
  insight: string;
  impact: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedSavings?: number;
  estimatedRisk?: number;
  actions: string[];
  createdAt: string;
  dismissed: boolean;
  businessContext: string;
  relatedMetrics?: string[];
}

// Current Business KPIs (NZD)
export const currentTourismKPIs: Record<string, TourismKPI> = {
  runway: {
    value: 6.8, // months
    change: -0.4,
    trend: 'down',
    period: 'months',
  },
  monthlyBurn: {
    value: 65000, // NZD
    change: 5000,
    trend: 'up',
    sparkline: [58000, 61000, 59000, 63000, 67000, 65000],
    period: 'monthly',
  },
  mrr: {
    value: 45000, // NZD MRR from subscriptions
    change: 3200,
    trend: 'up',
    sparkline: [38000, 40000, 42000, 41500, 43800, 45000],
    period: 'monthly',
  },
  bookingRevenue: {
    value: 28000, // NZD booking fees (varies by season)
    change: -2100, // lower in off-season
    trend: 'down',
    sparkline: [45000, 38000, 32000, 29000, 26000, 28000],
    period: 'monthly',
  },
  bookings30d: {
    value: 847, // number of bookings
    change: -89,
    trend: 'down',
    period: '30 days',
  },
  cancellationRate: {
    value: 12.3, // percentage
    change: 1.8,
    trend: 'up',
    period: '30 days',
  },
};

// Seasonality patterns for NZ tourism
export const seasonalityData: SeasonalityData[] = [
  { month: 'Jan', multiplier: 1.6, bookings: 1520, revenue: 76000, cancellationRate: 8.2 },
  { month: 'Feb', multiplier: 1.4, bookings: 1330, revenue: 66500, cancellationRate: 9.1 },
  { month: 'Mar', multiplier: 1.3, bookings: 1235, revenue: 61750, cancellationRate: 10.5 },
  { month: 'Apr', multiplier: 1.0, bookings: 950, revenue: 47500, cancellationRate: 11.2 },
  { month: 'May', multiplier: 0.7, bookings: 665, revenue: 33250, cancellationRate: 14.8 },
  { month: 'Jun', multiplier: 0.7, bookings: 665, revenue: 33250, cancellationRate: 15.2 },
  { month: 'Jul', multiplier: 0.7, bookings: 665, revenue: 33250, cancellationRate: 13.9 },
  { month: 'Aug', multiplier: 0.7, bookings: 665, revenue: 33250, cancellationRate: 14.1 },
  { month: 'Sep', multiplier: 0.9, bookings: 855, revenue: 42750, cancellationRate: 12.7 },
  { month: 'Oct', multiplier: 1.0, bookings: 950, revenue: 47500, cancellationRate: 11.8 },
  { month: 'Nov', multiplier: 1.2, bookings: 1140, revenue: 57000, cancellationRate: 10.3 },
  { month: 'Dec', multiplier: 1.45, bookings: 1378, revenue: 68900, cancellationRate: 9.1 },
];

// FX rates over time (NZD perspective)
export const fxRates: FXData[] = [
  { date: '2024-07', nzdAudRate: 0.94, nzdUsdRate: 0.61 },
  { date: '2024-08', nzdAudRate: 0.92, nzdUsdRate: 0.59 },
  { date: '2024-09', nzdAudRate: 0.95, nzdUsdRate: 0.62 },
  { date: '2024-10', nzdAudRate: 0.93, nzdUsdRate: 0.60 },
  { date: '2024-11', nzdAudRate: 0.96, nzdUsdRate: 0.63 },
  { date: '2024-12', nzdAudRate: 0.94, nzdUsdRate: 0.61 },
];

// Accounts Receivable Aging
export const arAging: ARAgingBucket[] = [
  { bucket: '0-30', amount: 52000, count: 34, percentage: 42.6 },
  { bucket: '31-60', amount: 38000, count: 22, percentage: 31.1 },
  { bucket: '61-90', amount: 21000, count: 12, percentage: 17.2 },
  { bucket: '90+', amount: 11000, count: 8, percentage: 9.0 },
];

// Collections Queue
export const collectionsQueue: CollectionItem[] = [
  {
    id: '1',
    customerName: 'Auckland Adventures Ltd',
    amount: 8900,
    daysOverdue: 45,
    lastContact: '2024-12-15',
    predictedPayDate: '2025-01-10',
    riskLevel: 'medium',
    suggestedAction: 'Send payment reminder with seasonal discount offer',
    contactScript: 'Hi Sarah, hope your December bookings are going well! Just following up on invoice #2847 for $8,900. With peak season approaching, would a 5% early payment discount help with your cash flow planning?',
  },
  {
    id: '2',
    customerName: 'Rotorua Experience Co',
    amount: 12400,
    daysOverdue: 67,
    lastContact: '2024-12-01',
    predictedPayDate: '2025-01-25',
    riskLevel: 'high',
    suggestedAction: 'Phone call + payment plan discussion',
    contactScript: 'Hi Mike, calling about invoice #2793 for $12,400 now 67 days overdue. I understand winter was tough for tourism operators. Can we discuss a payment plan that works around your peak season cash flow?',
  },
  {
    id: '3',
    customerName: 'Bay of Islands Tours',
    amount: 4200,
    daysOverdue: 23,
    lastContact: '2024-12-20',
    predictedPayDate: '2025-01-05',
    riskLevel: 'low',
    suggestedAction: 'Automated reminder',
  },
  {
    id: '4',
    customerName: 'Queenstown Action Sports',
    amount: 15600,
    daysOverdue: 89,
    lastContact: '2024-11-28',
    predictedPayDate: '2025-02-15',
    riskLevel: 'high',
    suggestedAction: 'Escalate to collections agency',
  },
];

// GST Obligations (NZ 2-monthly filing)
export const gstObligations: GSTObligation[] = [
  {
    period: 'Nov-Dec 2024',
    dueDate: '2025-01-28',
    estimatedAmount: 13400,
    status: 'upcoming',
    taxableSupplies: 102600,
    zeroRatedExports: 8900, // AU customers
    inputTaxCredits: 4730,
  },
  {
    period: 'Sep-Oct 2024',
    dueDate: '2024-11-28',
    estimatedAmount: 11200,
    status: 'paid',
    taxableSupplies: 89400,
    zeroRatedExports: 7200,
    inputTaxCredits: 4850,
  },
];

// Payroll Obligations with NZ specifics
export const payrollObligations: PayrollObligation[] = [
  {
    id: '1',
    type: 'salary',
    description: 'Fortnightly payroll',
    amount: 18200,
    dueDate: '2025-01-09',
    frequency: 'fortnightly',
    employees: 7,
  },
  {
    id: '2',
    type: 'kiwisaver',
    description: 'KiwiSaver employer contributions (3%)',
    amount: 1640,
    dueDate: '2025-01-20',
    frequency: 'monthly',
    employees: 7,
  },
  {
    id: '3',
    type: 'acc',
    description: 'ACC levies (1.45%)',
    amount: 790,
    dueDate: '2025-01-20',
    frequency: 'monthly',
    employees: 7,
  },
  {
    id: '4',
    type: 'paye',
    description: 'PAYE and student loan deductions',
    amount: 7200,
    dueDate: '2025-01-20',
    frequency: 'monthly',
    employees: 7,
  },
];

// AI Insights for tourism business
export const tourismInsights: TourismInsight[] = [
  {
    id: '1',
    title: 'Peak season opportunity window',
    description: 'NZ peak season starts in 6 weeks. Front-load marketing spend now (+NZD 15k) to capture summer bookings.',
    severity: 'positive',
    category: 'seasonality',
    impact: 'Runway +0.7 months from increased Dec-Mar revenue',
    actions: ['Simulate Peak Marketing', 'Create Summer Campaign', 'Adjust Budget'],
    priority: 1,
    seasonRelevant: true,
  },
  {
    id: '2',
    title: 'Delay customer success hire',
    description: 'Postponing CS agent hire from Feb to April aligns with revenue ramp and extends runway.',
    severity: 'warning',
    category: 'runway',
    impact: 'Runway +2.3 months, risk: higher churn in peak season',
    actions: ['Simulate Hiring Delay', 'Apply Change', 'Monitor Churn'],
    priority: 2,
  },
  {
    id: '3',
    title: 'Australian plan pricing opportunity',
    description: 'NZD/AUD rate favourable at 0.94. Increase AU Growth plan +7% to offset FX and boost margins.',
    severity: 'positive',
    category: 'fx',
    impact: '+NZD 2,800/month from AU customers',
    actions: ['Simulate AU Pricing', 'Test Price Sensitivity', 'Implement Change'],
    priority: 3,
  },
  {
    id: '4',
    title: 'GST payment due soon',
    description: 'GST return for Nov-Dec period due 28th Jan. Estimated liability NZD 13,400.',
    severity: 'info',
    category: 'gst',
    impact: 'Ensure sufficient cash buffer for tax payment',
    actions: ['Review GST Calculation', 'Schedule Payment', 'Export Transactions'],
    priority: 4,
  },
  {
    id: '5',
    title: 'Collections focus needed',
    description: 'NZD 32k overdue 60+ days. Winter was tough for operators - time for payment plan outreach.',
    severity: 'warning',
    category: 'collections',
    impact: 'Collecting 70% could improve cash position by NZD 22k',
    actions: ['Review Collection Queue', 'Send Payment Plans', 'Phone Top Debtors'],
    priority: 2,
  },
];

// Historical cashflow data (last 12 months) - tourism business
export const cashflowHistory: CashflowData[] = [
  { month: 'Jan 2024', operating: 35000, investing: -15000, financing: 0, total: 20000 },
  { month: 'Feb 2024', operating: 42000, investing: -8000, financing: 0, total: 34000 },
  { month: 'Mar 2024', operating: 38000, investing: -12000, financing: 500000, total: 526000 },
  { month: 'Apr 2024', operating: 25000, investing: -20000, financing: 0, total: 5000 },
  { month: 'May 2024', operating: 18000, investing: -15000, financing: 0, total: 3000 },
  { month: 'Jun 2024', operating: 16000, investing: -18000, financing: 0, total: -2000 },
  { month: 'Jul 2024', operating: 19000, investing: -22000, financing: 0, total: -3000 },
  { month: 'Aug 2024', operating: 22000, investing: -25000, financing: 0, total: -3000 },
  { month: 'Sep 2024', operating: 28000, investing: -19000, financing: 0, total: 9000 },
  { month: 'Oct 2024', operating: 35000, investing: -16000, financing: 0, total: 19000 },
  { month: 'Nov 2024', operating: 48000, investing: -14000, financing: 0, total: 34000 },
  { month: 'Dec 2024', operating: 52000, investing: -13000, financing: 0, total: 39000 },
];

// Cash projection data with seasonality
export const cashProjection = [
  { month: 'Dec 2024', actual: 420000, projected: 420000, seasonal: true },
  { month: 'Jan 2025', actual: null, projected: 445000, seasonal: true },
  { month: 'Feb 2025', actual: null, projected: 468000, seasonal: true },
  { month: 'Mar 2025', actual: null, projected: 485000, seasonal: true },
  { month: 'Apr 2025', actual: null, projected: 445000, seasonal: false },
  { month: 'May 2025', actual: null, projected: 395000, seasonal: false },
  { month: 'Jun 2025', actual: null, projected: 345000, seasonal: false },
  { month: 'Jul 2025', actual: null, projected: 295000, seasonal: false },
  { month: 'Aug 2025', actual: null, projected: 245000, seasonal: false },
  { month: 'Sep 2025', actual: null, projected: 205000, seasonal: false },
  { month: 'Oct 2025', actual: null, projected: 165000, seasonal: false },
  { month: 'Nov 2025', actual: null, projected: 135000, seasonal: false },
];

// Revenue breakdown by source
export const revenueBreakdown = {
  subscriptionMRR: 45000, // SaaS platform subscriptions
  bookingFees: 28000, // Commission on bookings (seasonal)
  audRevenue: 9800, // Revenue from AU customers (22% of total, subject to FX)
  oneOffServices: 3200, // Setup fees, consulting
};

// Expense categories
export const expenseCategories = {
  payroll: 54500, // Including on-costs
  marketing: 12000, // Heavily weighted to pre-season
  infrastructure: 8500, // AWS, SaaS tools
  office: 4200, // Auckland office
  insurance: 1800,
  legal: 2200,
  other: 3800,
};

// Proactive AI CFO Alerts - Always monitoring business health
export const aiCFOAlerts: AIAlert[] = [
  {
    id: 'runway-critical-001',
    type: 'critical',
    category: 'cashflow',
    title: 'Critical: Runway Below 9 Months',
    description: 'Your current runway of 6.8 months is approaching dangerous territory for tourism businesses facing seasonal volatility.',
    insight: 'Tourism businesses need 12+ months runway to survive off-season periods. With summer ending, you\'re entering lower revenue months without adequate buffer.',
    impact: 'Risk of cash-out during May-August off-season. Potential forced closure or emergency funding at unfavorable terms.',
    urgency: 'critical',
    estimatedRisk: 420000,
    actions: ['Reduce non-essential spend immediately', 'Accelerate collections', 'Consider bridge funding', 'Review Q1 scenarios'],
    createdAt: '2024-12-28T10:30:00Z',
    dismissed: false,
    businessContext: 'NZ tourism with high seasonality',
    relatedMetrics: ['runway', 'monthlyBurn', 'seasonalRevenue']
  },
  {
    id: 'customer-concentration-002',
    type: 'warning',
    category: 'risk',
    title: 'Customer Concentration Risk Detected',
    description: 'Top 3 corporate clients represent 47% of booking revenue. This creates dangerous dependency during economic uncertainty.',
    insight: 'Tourism businesses often over-rely on large corporate accounts. Economic downturns hit corporate travel budgets first, creating sudden revenue drops.',
    impact: 'Loss of major client could reduce revenue by $15k/month immediately. Recovery typically takes 6-12 months.',
    urgency: 'high',
    estimatedRisk: 180000,
    actions: ['Diversify client base', 'Create client retention program', 'Develop SME market strategy', 'Add contract terms protection'],
    createdAt: '2024-12-28T09:15:00Z',
    dismissed: false,
    businessContext: 'High client concentration typical in NZ tourism',
    relatedMetrics: ['bookingRevenue', 'customerMix']
  },
  {
    id: 'gst-optimization-003',
    type: 'opportunity',
    category: 'compliance',
    title: 'GST Optimization Opportunity',
    description: 'You\'re missing $4,200 in GST input credits monthly by not claiming eligible expenses properly.',
    insight: 'Many tourism operators under-claim GST on legitimate business expenses like equipment, marketing, and vehicle costs.',
    impact: 'Recovering missed credits could improve cash flow by $50k annually while staying fully compliant.',
    urgency: 'medium',
    estimatedSavings: 50400,
    actions: ['Review expense categorization', 'Audit vehicle claims', 'Optimize supplier GST', 'Set up monthly reconciliation'],
    createdAt: '2024-12-28T08:45:00Z',
    dismissed: false,
    businessContext: 'NZ GST compliance with tourism-specific deductions',
    relatedMetrics: ['gstCredits', 'expenses']
  },
  {
    id: 'seasonal-pricing-004',
    type: 'opportunity',
    category: 'growth',
    title: 'Seasonal Pricing Strategy Gap',
    description: 'Current pricing doesn\'t fully capture peak season demand. Analysis shows 18% revenue upside.',
    insight: 'Your peak season pricing is only 40% above off-season rates. Market analysis shows 60-80% premiums are standard and accepted.',
    impact: 'Optimized seasonal pricing could generate additional $32k in Q1 alone without affecting booking volumes.',
    urgency: 'high',
    estimatedSavings: 128000,
    actions: ['Implement dynamic pricing', 'Test premium packages', 'Add peak season surcharges', 'Monitor competitor rates'],
    createdAt: '2024-12-28T07:20:00Z',
    dismissed: false,
    businessContext: 'NZ summer peak season pricing optimization',
    relatedMetrics: ['bookingRevenue', 'seasonalMultiplier']
  },
  {
    id: 'forex-hedge-005',
    type: 'warning',
    category: 'risk',
    title: 'Currency Exposure Risk Rising',
    description: 'Australian customer revenue (22% of total) is unhedged while AUD/NZD volatility increases.',
    insight: 'Tourism businesses often ignore FX risk until it hurts. A 10% AUD decline could reduce annual revenue by $25k.',
    impact: 'Unhedged FX exposure of $280k annually. Recent volatility could impact cash flow unpredictably.',
    urgency: 'medium',
    estimatedRisk: 28000,
    actions: ['Implement FX hedging strategy', 'Consider NZD pricing for AU customers', 'Review contract terms', 'Set up FX monitoring'],
    createdAt: '2024-12-27T16:30:00Z',
    dismissed: false,
    businessContext: 'Trans-Tasman tourism operations',
    relatedMetrics: ['fxExposure', 'auRevenue']
  },
  {
    id: 'collection-efficiency-006',
    type: 'opportunity',
    category: 'cashflow',
    title: 'Accounts Receivable Optimization',
    description: 'Average collection period is 42 days vs industry best practice of 28 days. Slow collections hurt cash flow.',
    insight: 'Tourism businesses often extend payment terms to win corporate deals, but poor collection processes compound the problem.',
    impact: 'Faster collections could free up $18k in working capital and reduce bad debt by $3k annually.',
    urgency: 'medium',
    estimatedSavings: 21000,
    actions: ['Implement automated reminders', 'Offer early payment discounts', 'Tighten credit terms', 'Use collection agencies for overdue'],
    createdAt: '2024-12-27T14:10:00Z',
    dismissed: false,
    businessContext: 'Tourism industry payment cycles',
    relatedMetrics: ['arAging', 'badDebt']
  },
  {
    id: 'fundraising-window-007',
    type: 'info',
    category: 'fundraising',
    title: 'Optimal Fundraising Window Approaching',
    description: 'Market conditions and your metrics suggest Q2 2025 as ideal timing for Series A fundraising.',
    insight: 'Tourism businesses should raise during or just after peak season when metrics look strongest. Waiting too long into off-season hurts valuation.',
    impact: 'Timing fundraising correctly could improve valuation by 15-25% and reduce dilution significantly.',
    urgency: 'low',
    estimatedSavings: 75000,
    actions: ['Prepare pitch materials', 'Clean up financials', 'Identify target investors', 'Set roadshow timeline'],
    createdAt: '2024-12-27T11:45:00Z',
    dismissed: false,
    businessContext: 'Tourism startup funding cycles',
    relatedMetrics: ['growth', 'seasonality', 'burn']
  },
  {
    id: 'cost-efficiency-008',
    type: 'warning',
    category: 'efficiency',
    title: 'Software Subscription Bloat Detected',
    description: 'Monthly SaaS costs increased 34% in 6 months to $2,847/month. Several subscriptions appear underutilized.',
    insight: 'Growing companies often accumulate software subscriptions faster than they optimize them. Regular audits can cut 20-30% without impact.',
    impact: 'Subscription optimization could save $8k annually while improving operational efficiency.',
    urgency: 'low',
    estimatedSavings: 8400,
    actions: ['Audit all subscriptions', 'Consolidate overlapping tools', 'Negotiate annual discounts', 'Cancel unused licenses'],
    createdAt: '2024-12-26T13:20:00Z',
    dismissed: false,
    businessContext: 'Scale-up operational efficiency',
    relatedMetrics: ['operatingExpenses', 'softwareCosts']
  },
  {
    id: 'tax-deadline-009',
    type: 'info',
    category: 'compliance',
    title: 'IRD Provisional Tax Planning',
    description: 'Provisional tax payment due March 28th. Current estimates may be under-calculated based on seasonal performance.',
    insight: 'Tourism businesses often underestimate provisional tax due to seasonal revenue spikes, leading to penalties and cash flow surprises.',
    impact: 'Accurate provisioning prevents penalties and spreads tax burden. Under-estimation could cost $2-5k in penalties.',
    urgency: 'medium',
    estimatedRisk: 3500,
    actions: ['Review tax calculations', 'Consider payments on account', 'Plan cash flow for March', 'Consult tax advisor'],
    createdAt: '2024-12-26T09:30:00Z',
    dismissed: false,
    businessContext: 'NZ provisional tax for tourism businesses',
    relatedMetrics: ['tax', 'seasonalRevenue']
  }
];

// Chart configurations
export const chartConfig = {
  colors: {
    primary: '#7b14ef',
    secondary: '#c497fe', 
    accent: '#ebdcfd',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#ef4444',
    nzd: '#0ea5e9',
    aud: '#f97316',
    peak: '#22c55e',
    offPeak: '#64748b',
  },
};
