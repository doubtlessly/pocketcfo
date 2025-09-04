// Industry-specific configurations for tailored experiences

export interface BusinessProfile {
  id: string;
  businessName: string;
  industry: string;
  companySize: string;
  location: string;
  annualRevenue: string;
  businessType: string;
  primaryChallenges: string[];
  setupComplete: boolean;
}

export interface IndustryConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  primaryMetrics: string[];
  alerts: string[];
  dashboardWidgets: DashboardWidget[];
  challenges: string[];
  opportunities: string[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'kpi' | 'chart' | 'table' | 'alert' | 'insight';
  category: string;
  description: string;
  dataSource: string;
  industrySpecific?: boolean;
  size: 'small' | 'medium' | 'large';
  defaultEnabled: boolean;
}

// Tourism Industry Configuration
export const tourismConfig: IndustryConfig = {
  id: 'tourism',
  name: 'Tourism & Hospitality',
  description: 'Adventure tourism, accommodation, and travel experiences',
  icon: '🏔️',
  color: 'from-blue-500 to-cyan-600',
  primaryMetrics: [
    'Seasonal Revenue Variance',
    'Booking Conversion Rate', 
    'Average Booking Value',
    'Cancellation Rate',
    'Peak Season Utilization',
    'Customer Acquisition Cost',
    'Weather Impact Factor'
  ],
  alerts: [
    'Seasonal cash flow planning',
    'Weather-dependent revenue risks',
    'International customer FX exposure',
    'Tourism levy compliance',
    'Peak season pricing optimization'
  ],
  dashboardWidgets: [
    {
      id: 'seasonal-revenue',
      title: 'Seasonal Revenue Tracking',
      type: 'chart',
      category: 'Revenue',
      description: 'Monthly revenue with seasonal patterns and weather correlation',
      dataSource: 'seasonalRevenue',
      industrySpecific: true,
      size: 'large',
      defaultEnabled: true
    },
    {
      id: 'booking-metrics',
      title: 'Booking Performance',
      type: 'kpi',
      category: 'Operations',
      description: 'Booking conversion, cancellations, and average values',
      dataSource: 'bookingData',
      industrySpecific: true,
      size: 'medium',
      defaultEnabled: true
    },
    {
      id: 'weather-impact',
      title: 'Weather Impact Analysis',
      type: 'insight',
      category: 'Risk',
      description: 'How weather conditions affect bookings and revenue',
      dataSource: 'weatherData',
      industrySpecific: true,
      size: 'medium',
      defaultEnabled: true
    },
    {
      id: 'international-fx',
      title: 'Currency Exposure',
      type: 'alert',
      category: 'Risk',
      description: 'FX risk from international customers',
      dataSource: 'fxData',
      industrySpecific: true,
      size: 'small',
      defaultEnabled: true
    }
  ],
  challenges: [
    'Seasonal cash flow management',
    'Weather-dependent revenue',
    'International customer payment processing',
    'Peak season staff management',
    'Equipment and insurance costs'
  ],
  opportunities: [
    'Dynamic pricing optimization',
    'Off-season activity development',
    'Corporate group packages',
    'International market expansion',
    'Digital marketing efficiency'
  ]
};

// Construction Industry Configuration  
export const constructionConfig: IndustryConfig = {
  id: 'construction',
  name: 'Construction & Trades',
  description: 'Building, renovation, and specialized trade services',
  icon: '🏗️',
  color: 'from-orange-500 to-amber-600',
  primaryMetrics: [
    'Project Margin %',
    'Work in Progress Value',
    'Cash Flow from Operations',
    'Materials Cost Variance',
    'Labor Efficiency Ratio',
    'Project Completion Rate',
    'Retentions Held'
  ],
  alerts: [
    'Project cost overruns',
    'Retention release timing',
    'Materials price volatility',
    'Health & safety compliance',
    'Progress billing optimization'
  ],
  dashboardWidgets: [
    {
      id: 'project-margins',
      title: 'Project Profitability',
      type: 'chart',
      category: 'Projects',
      description: 'Margin analysis across active and completed projects',
      dataSource: 'projectData',
      industrySpecific: true,
      size: 'large',
      defaultEnabled: true
    },
    {
      id: 'wip-tracking',
      title: 'Work in Progress',
      type: 'table',
      category: 'Operations',
      description: 'Current project status and financial position',
      dataSource: 'wipData',
      industrySpecific: true,
      size: 'large',
      defaultEnabled: true
    },
    {
      id: 'materials-costs',
      title: 'Materials Cost Analysis',
      type: 'kpi',
      category: 'Costs',
      description: 'Materials cost tracking and variance analysis',
      dataSource: 'materialsData',
      industrySpecific: true,
      size: 'medium',
      defaultEnabled: true
    },
    {
      id: 'retention-tracking',
      title: 'Retentions & Progress Claims',
      type: 'table',
      category: 'Cash Flow',
      description: 'Track retention releases and progress billing',
      dataSource: 'retentionsData',
      industrySpecific: true,
      size: 'medium',
      defaultEnabled: true
    },
    {
      id: 'labor-efficiency',
      title: 'Labor Efficiency',
      type: 'kpi',
      category: 'Operations',
      description: 'Labor hours vs budget across projects',
      dataSource: 'laborData',
      industrySpecific: true,
      size: 'small',
      defaultEnabled: true
    }
  ],
  challenges: [
    'Project cost control and overruns',
    'Cash flow timing with progress billing',
    'Materials price volatility',
    'Skilled labor availability and costs',
    'Health and safety compliance costs'
  ],
  opportunities: [
    'Improved project estimation accuracy',
    'Better supplier relationships and pricing',
    'Technology adoption for efficiency',
    'Specialization in high-margin areas',
    'Government contract opportunities'
  ]
};

// Universal Dashboard Widgets (available to all industries)
export const universalWidgets: DashboardWidget[] = [
  {
    id: 'cash-runway',
    title: 'Cash Runway',
    type: 'kpi',
    category: 'Cash Flow',
    description: 'Months of runway based on current burn rate',
    dataSource: 'cashFlow',
    size: 'small',
    defaultEnabled: true
  },
  {
    id: 'monthly-burn',
    title: 'Monthly Burn Rate',
    type: 'kpi',
    category: 'Cash Flow', 
    description: 'Monthly operating expenses and burn',
    dataSource: 'expenses',
    size: 'small',
    defaultEnabled: true
  },
  {
    id: 'revenue-growth',
    title: 'Revenue Growth',
    type: 'chart',
    category: 'Revenue',
    description: 'Monthly revenue trends and growth rates',
    dataSource: 'revenue',
    size: 'large',
    defaultEnabled: true
  },
  {
    id: 'profit-margins',
    title: 'Profit Margins',
    type: 'kpi',
    category: 'Profitability',
    description: 'Gross and net profit margin tracking',
    dataSource: 'profitability',
    size: 'medium',
    defaultEnabled: true
  },
  {
    id: 'accounts-receivable',
    title: 'Accounts Receivable',
    type: 'table',
    category: 'Cash Flow',
    description: 'Outstanding invoices and aging analysis',
    dataSource: 'receivables',
    size: 'large',
    defaultEnabled: false
  },
  {
    id: 'expense-breakdown',
    title: 'Expense Categories',
    type: 'chart',
    category: 'Expenses',
    description: 'Breakdown of operating expenses by category',
    dataSource: 'expenses',
    size: 'medium',
    defaultEnabled: false
  },
  {
    id: 'tax-obligations',
    title: 'Tax & Compliance',
    type: 'alert',
    category: 'Compliance',
    description: 'Upcoming tax obligations and deadlines',
    dataSource: 'compliance',
    size: 'medium',
    defaultEnabled: true
  },
  {
    id: 'kpi-summary',
    title: 'KPI Summary',
    type: 'kpi',
    category: 'Overview',
    description: 'Key performance indicators overview',
    dataSource: 'kpis',
    size: 'large',
    defaultEnabled: true
  },
  {
    id: 'cash-flow-forecast',
    title: 'Cash Flow Forecast',
    type: 'chart',
    category: 'Cash Flow',
    description: '12-month cash flow projection',
    dataSource: 'cashProjection',
    size: 'large',
    defaultEnabled: false
  },
  {
    id: 'budget-variance',
    title: 'Budget vs Actual',
    type: 'chart',
    category: 'Planning',
    description: 'Budget variance analysis',
    dataSource: 'budget',
    size: 'medium',
    defaultEnabled: false
  }
];

// Available Industries for Selection
export const availableIndustries = [
  {
    id: 'tourism',
    name: 'Tourism & Hospitality',
    description: 'Adventure tourism, accommodation, tours, and travel experiences',
    icon: '🏔️',
    examples: ['Adventure tours', 'Hotels & lodges', 'Travel agencies', 'Event venues'],
    config: tourismConfig
  },
  {
    id: 'construction', 
    name: 'Construction & Trades',
    description: 'Building, renovation, and specialized trade services',
    icon: '🏗️',
    examples: ['General contractors', 'Electrical', 'Plumbing', 'Renovation'],
    config: constructionConfig
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Physical and online retail businesses',
    icon: '🛍️',
    examples: ['Online stores', 'Boutiques', 'Specialty retail', 'Marketplaces'],
    config: tourismConfig // Using tourism as template for now
  },
  {
    id: 'services',
    name: 'Professional Services',
    description: 'Consulting, agencies, and service-based businesses',
    icon: '💼',
    examples: ['Consulting', 'Marketing agencies', 'Legal services', 'Accounting'],
    config: tourismConfig // Using tourism as template for now
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production and manufacturing businesses',
    icon: '🏭',
    examples: ['Food production', 'Electronics', 'Textiles', 'Industrial goods'],
    config: constructionConfig // Using construction as template for now
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Wellness',
    description: 'Medical, dental, and wellness services',
    icon: '🏥',
    examples: ['Medical practices', 'Dental clinics', 'Wellness centers', 'Pharmacies'],
    config: tourismConfig // Using tourism as template for now
  }
];

// Default business profile
export const defaultBusinessProfile: BusinessProfile = {
  id: '',
  businessName: '',
  industry: '',
  companySize: '',
  location: '',
  annualRevenue: '',
  businessType: '',
  primaryChallenges: [],
  setupComplete: false
};
