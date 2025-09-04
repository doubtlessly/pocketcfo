// Construction Industry Mock Data for MYOB Pocket CFO
// Construction & Trades business specializing in residential and commercial projects

import { TourismKPI } from './nz-tourism-mock';

export interface ProjectData {
  id: string;
  name: string;
  client: string;
  type: 'residential' | 'commercial' | 'renovation' | 'maintenance';
  status: 'quoted' | 'active' | 'completed' | 'on-hold';
  budgetedCost: number;
  actualCost: number;
  budgetedRevenue: number;
  actualRevenue: number;
  marginPercent: number;
  startDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
  retentionHeld: number;
  retentionReleaseDate?: string;
  progressBillingPercent: number;
}

export interface WorkInProgressData {
  projectId: string;
  projectName: string;
  client: string;
  contractValue: number;
  costsToDate: number;
  billedToDate: number;
  remainingToBill: number;
  percentComplete: number;
  estimatedCompletion: string;
  marginToDate: number;
}

export interface MaterialsCost {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  lastUpdated: string;
}

export interface LaborEfficiency {
  projectId: string;
  projectName: string;
  budgetedHours: number;
  actualHours: number;
  variance: number;
  efficiencyRatio: number;
  costPerHour: number;
}

export interface ConstructionKPI {
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  sparkline?: number[];
  period: string;
}

// Current Construction Business KPIs (NZD)
export const currentConstructionKPIs: Record<string, ConstructionKPI> = {
  runway: {
    value: 8.2, // months
    change: +0.3,
    trend: 'up',
    period: 'current'
  },
  monthlyBurn: {
    value: 89000, // NZD
    change: -5.2,
    trend: 'down',
    sparkline: [95000, 92000, 94000, 91000, 89000, 87000],
    period: 'december'
  },
  averageProjectMargin: {
    value: 18.5, // percent
    change: +2.1,
    trend: 'up',
    sparkline: [16.2, 16.8, 17.1, 17.9, 18.1, 18.5],
    period: 'december'
  },
  workInProgressValue: {
    value: 485000, // NZD
    change: +12.3,
    trend: 'up',
    sparkline: [420000, 435000, 450000, 465000, 475000, 485000],
    period: 'december'
  },
  activeProjects: {
    value: 8,
    change: +1,
    trend: 'up',
    period: 'current'
  },
  laborEfficiency: {
    value: 94.2, // percent
    change: -1.8,
    trend: 'down',
    sparkline: [96.1, 95.8, 95.2, 94.8, 94.5, 94.2],
    period: 'december'
  },
  retentionsHeld: {
    value: 67500, // NZD
    change: +8.9,
    trend: 'up',
    period: 'current'
  },
  materialsVariance: {
    value: -3.2, // percent (negative is over budget)
    change: -1.1,
    trend: 'down',
    period: 'december'
  }
};

// Active Projects Data
export const activeProjects: ProjectData[] = [
  {
    id: 'proj-001',
    name: 'Residential Extension - Smith House',
    client: 'John & Mary Smith',
    type: 'residential',
    status: 'active',
    budgetedCost: 85000,
    actualCost: 78500,
    budgetedRevenue: 105000,
    actualRevenue: 78750, // 75% progress billing
    marginPercent: 19.2,
    startDate: '2024-11-15',
    expectedCompletionDate: '2025-02-28',
    retentionHeld: 5250,
    progressBillingPercent: 75
  },
  {
    id: 'proj-002',
    name: 'Office Renovation - Tech Startup',
    client: 'InnovateTech Ltd',
    type: 'commercial',
    status: 'active',
    budgetedCost: 145000,
    actualCost: 152000,
    budgetedRevenue: 180000,
    actualRevenue: 126000, // 70% progress billing
    marginPercent: 15.8,
    startDate: '2024-12-01',
    expectedCompletionDate: '2025-03-15',
    retentionHeld: 9000,
    progressBillingPercent: 70
  },
  {
    id: 'proj-003',
    name: 'Kitchen Renovation - Williams',
    client: 'Sarah Williams',
    type: 'renovation',
    status: 'active',
    budgetedCost: 45000,
    actualCost: 43200,
    budgetedRevenue: 58000,
    actualRevenue: 52200, // 90% progress billing
    marginPercent: 22.1,
    startDate: '2024-12-10',
    expectedCompletionDate: '2025-01-25',
    retentionHeld: 2900,
    progressBillingPercent: 90
  },
  {
    id: 'proj-004',
    name: 'Warehouse Fit-out - Logistics Co',
    client: 'FastTrack Logistics',
    type: 'commercial',
    status: 'quoted',
    budgetedCost: 220000,
    actualCost: 0,
    budgetedRevenue: 275000,
    actualRevenue: 0,
    marginPercent: 20.0,
    startDate: '2025-01-15',
    expectedCompletionDate: '2025-05-30',
    retentionHeld: 0,
    progressBillingPercent: 0
  }
];

// Work in Progress Summary
export const wipData: WorkInProgressData[] = [
  {
    projectId: 'proj-001',
    projectName: 'Smith House Extension',
    client: 'John & Mary Smith',
    contractValue: 105000,
    costsToDate: 78500,
    billedToDate: 78750,
    remainingToBill: 26250,
    percentComplete: 75,
    estimatedCompletion: '2025-02-28',
    marginToDate: 250
  },
  {
    projectId: 'proj-002',
    projectName: 'Tech Startup Office',
    client: 'InnovateTech Ltd',
    contractValue: 180000,
    costsToDate: 152000,
    billedToDate: 126000,
    remainingToBill: 54000,
    percentComplete: 70,
    estimatedCompletion: '2025-03-15',
    marginToDate: -26000
  },
  {
    projectId: 'proj-003',
    projectName: 'Williams Kitchen',
    client: 'Sarah Williams',
    contractValue: 58000,
    costsToDate: 43200,
    billedToDate: 52200,
    remainingToBill: 5800,
    percentComplete: 90,
    estimatedCompletion: '2025-01-25',
    marginToDate: 9000
  }
];

// Materials Cost Analysis
export const materialsCosts: MaterialsCost[] = [
  {
    category: 'Timber & Lumber',
    budgeted: 25000,
    actual: 26800,
    variance: 1800,
    variancePercent: 7.2,
    lastUpdated: '2024-12-28'
  },
  {
    category: 'Concrete & Cement',
    budgeted: 12000,
    actual: 11200,
    variance: -800,
    variancePercent: -6.7,
    lastUpdated: '2024-12-27'
  },
  {
    category: 'Steel & Reinforcement',
    budgeted: 18500,
    actual: 19200,
    variance: 700,
    variancePercent: 3.8,
    lastUpdated: '2024-12-26'
  },
  {
    category: 'Electrical Materials',
    budgeted: 8500,
    actual: 8950,
    variance: 450,
    variancePercent: 5.3,
    lastUpdated: '2024-12-25'
  },
  {
    category: 'Plumbing Materials',
    budgeted: 6500,
    actual: 6100,
    variance: -400,
    variancePercent: -6.2,
    lastUpdated: '2024-12-24'
  },
  {
    category: 'Insulation & Drywall',
    budgeted: 9500,
    actual: 9850,
    variance: 350,
    variancePercent: 3.7,
    lastUpdated: '2024-12-23'
  }
];

// Labor Efficiency Data
export const laborEfficiency: LaborEfficiency[] = [
  {
    projectId: 'proj-001',
    projectName: 'Smith House Extension',
    budgetedHours: 680,
    actualHours: 720,
    variance: 40,
    efficiencyRatio: 94.4,
    costPerHour: 85
  },
  {
    projectId: 'proj-002',
    projectName: 'Tech Startup Office',
    budgetedHours: 920,
    actualHours: 980,
    variance: 60,
    efficiencyRatio: 93.9,
    costPerHour: 88
  },
  {
    projectId: 'proj-003',
    projectName: 'Williams Kitchen',
    budgetedHours: 340,
    actualHours: 325,
    variance: -15,
    efficiencyRatio: 104.6,
    costPerHour: 82
  }
];

// Retention Tracking
export const retentionsData = [
  {
    projectId: 'proj-005',
    projectName: 'Completed - Office Building',
    client: 'Property Developers Ltd',
    retentionAmount: 15000,
    releaseDate: '2025-01-15',
    daysUntilRelease: 18,
    status: 'pending'
  },
  {
    projectId: 'proj-006',
    projectName: 'Completed - Residential Home',
    client: 'Johnson Family',
    retentionAmount: 7500,
    releaseDate: '2025-02-20',
    daysUntilRelease: 54,
    status: 'pending'
  },
  {
    projectId: 'proj-001',
    projectName: 'Smith House Extension',
    client: 'John & Mary Smith',
    retentionAmount: 5250,
    releaseDate: '2025-05-30', // 3 months after completion
    daysUntilRelease: 153,
    status: 'in-progress'
  }
];

// Construction-specific insights
export const constructionInsights = [
  {
    id: 'materials-price-alert',
    title: 'Timber Prices Rising Faster Than Budget',
    description: 'Timber costs are 7.2% over budget across projects. Consider locking in prices for upcoming projects or adjusting quotes.',
    severity: 'warning' as const,
    category: 'materials' as const,
    impact: 'Current projects showing $1,800 over budget. Future projects at risk if prices continue rising.',
    actions: ['Lock in timber supplier pricing', 'Review upcoming project quotes', 'Consider alternative materials'],
    priority: 1
  },
  {
    id: 'labor-efficiency-concern',
    title: 'Labor Efficiency Declining Across Projects',
    description: 'Average labor efficiency dropped to 94.2% this month. Weather delays and material delivery issues are contributing factors.',
    severity: 'info' as const,
    category: 'labor' as const,
    impact: 'Additional 95 hours across active projects. Potential margin impact of $8,075.',
    actions: ['Review project scheduling', 'Improve material coordination', 'Weather contingency planning'],
    priority: 2
  },
  {
    id: 'retention-release-opportunity',
    title: 'Retention Release Due Soon',
    description: '$15,000 retention from completed office building project can be claimed January 15th.',
    severity: 'positive' as const,
    category: 'cashflow' as const,
    impact: 'Improve cash flow by $15,000. Set up automated reminders for future releases.',
    actions: ['Submit retention release claim', 'Set up automated tracking', 'Contact client for release'],
    priority: 1
  },
  {
    id: 'project-margin-improvement',
    title: 'Project Margins Improving',
    description: 'Average project margin increased to 18.5% this quarter, up from 16.4% last quarter.',
    severity: 'positive' as const,
    category: 'profitability' as const,
    impact: 'Improved pricing strategy and cost control adding $12,000+ per project.',
    actions: ['Document successful practices', 'Apply learnings to new quotes', 'Train team on best practices'],
    priority: 3
  }
];

// Historical project performance (for charts)
export const projectHistory = [
  { month: 'Jul 2024', completed: 2, revenue: 145000, margin: 16.2 },
  { month: 'Aug 2024', completed: 3, revenue: 178000, margin: 16.8 },
  { month: 'Sep 2024', completed: 2, revenue: 156000, margin: 17.1 },
  { month: 'Oct 2024', completed: 4, revenue: 234000, margin: 17.9 },
  { month: 'Nov 2024', completed: 3, revenue: 189000, margin: 18.1 },
  { month: 'Dec 2024', completed: 2, revenue: 167000, margin: 18.5 }
];

// Cash flow projection (construction-specific)
export const constructionCashProjection = [
  { month: 'Dec 2024', actual: 185000, projected: 185000 },
  { month: 'Jan 2025', actual: null, projected: 210000 }, // Retention release + progress billing
  { month: 'Feb 2025', actual: null, projected: 245000 }, // Project completions
  { month: 'Mar 2025', actual: null, projected: 215000 }, // New project starts
  { month: 'Apr 2025', actual: null, projected: 190000 },
  { month: 'May 2025', actual: null, projected: 205000 },
  { month: 'Jun 2025', actual: null, projected: 175000 },
  { month: 'Jul 2025', actual: null, projected: 160000 },
  { month: 'Aug 2025', actual: null, projected: 145000 },
  { month: 'Sep 2025', actual: null, projected: 130000 },
  { month: 'Oct 2025', actual: null, projected: 115000 },
  { month: 'Nov 2025', actual: null, projected: 100000 }
];

// Construction industry cash flow pattern (more project-based lumpy cash flow)
export const constructionCashflowHistory = [
  { month: 'Jan 2024', operating: 45000, investing: -25000, financing: 0, total: 20000 },
  { month: 'Feb 2024', operating: 78000, investing: -15000, financing: 0, total: 63000 },
  { month: 'Mar 2024', operating: 123000, investing: -30000, financing: 0, total: 93000 }, // Large project completion
  { month: 'Apr 2024', operating: 34000, investing: -20000, financing: 150000, total: 164000 }, // Equipment finance
  { month: 'May 2024', operating: 67000, investing: -25000, financing: -5000, total: 37000 },
  { month: 'Jun 2024', operating: 89000, investing: -18000, financing: -5000, total: 66000 },
  { month: 'Jul 2024', operating: 112000, investing: -22000, financing: -5000, total: 85000 },
  { month: 'Aug 2024', operating: 145000, investing: -35000, financing: -5000, total: 105000 }, // Two project completions
  { month: 'Sep 2024', operating: 56000, investing: -15000, financing: -5000, total: 36000 },
  { month: 'Oct 2024', operating: 187000, investing: -28000, financing: -5000, total: 154000 }, // Large commercial project
  { month: 'Nov 2024', operating: 89000, investing: -20000, financing: -5000, total: 64000 },
  { month: 'Dec 2024', operating: 98000, investing: -18000, financing: -5000, total: 75000 }
];
