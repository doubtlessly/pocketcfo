'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calculator,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Users,
  Briefcase,
  Building,
  Lightbulb,
  Megaphone
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { KpiCard } from '@/components/KpiCard';

// Mock profitability data
const profitabilityMetrics = {
  grossMargin: { value: 73.2, change: 2.8, trend: 'up' as const },
  operatingMargin: { value: 18.5, change: 1.5, trend: 'up' as const },
  netMargin: { value: 12.3, change: 0.8, trend: 'up' as const },
  ebitdaMargin: { value: 22.1, change: 2.1, trend: 'up' as const },
  cac: { value: 485, change: -12.5, trend: 'up' as const }, // negative change is good for CAC
  ltv: { value: 8450, change: 18.2, trend: 'up' as const },
  ltvCacRatio: { value: 17.4, change: 4.3, trend: 'up' as const },
  paybackPeriod: { value: 8.2, change: -1.1, trend: 'up' as const } // negative change is good
};

const marginTrends = [
  { month: 'Jul 2024', gross: 69.8, operating: 15.2, net: 9.1, ebitda: 18.5 },
  { month: 'Aug 2024', gross: 70.5, operating: 16.1, net: 10.3, ebitda: 19.8 },
  { month: 'Sep 2024', gross: 71.2, operating: 16.8, net: 11.2, ebitda: 20.4 },
  { month: 'Oct 2024', gross: 72.1, operating: 17.5, net: 11.8, ebitda: 21.2 },
  { month: 'Nov 2024', gross: 72.8, operating: 18.1, net: 12.1, ebitda: 21.8 },
  { month: 'Dec 2024', gross: 73.2, operating: 18.5, net: 12.3, ebitda: 22.1 }
];

const unitEconomics = [
  { month: 'Jul 2024', cac: 520, ltv: 7800, ratio: 15.0 },
  { month: 'Aug 2024', cac: 510, ltv: 8000, ratio: 15.7 },
  { month: 'Sep 2024', cac: 505, ltv: 8150, ratio: 16.1 },
  { month: 'Oct 2024', cac: 495, ltv: 8280, ratio: 16.7 },
  { month: 'Nov 2024', cac: 490, ltv: 8380, ratio: 17.1 },
  { month: 'Dec 2024', cac: 485, ltv: 8450, ratio: 17.4 }
];

const costStructure = [
  { category: 'Cost of Goods Sold', amount: 134500, percentage: 26.8, color: '#ef4444' },
  { category: 'Sales & Marketing', amount: 125000, percentage: 25.0, color: '#3b82f6' },
  { category: 'Research & Development', amount: 87500, percentage: 17.5, color: '#8b5cf6' },
  { category: 'General & Administrative', amount: 67500, percentage: 13.5, color: '#f59e0b' },
  { category: 'Customer Success', amount: 42500, percentage: 8.5, color: '#10b981' },
  { category: 'Other Operating', amount: 42500, percentage: 8.5, color: '#6b7280' }
];

const departmentCosts = [
  { 
    department: 'Sales & Marketing',
    icon: Megaphone,
    total: 125000,
    breakdown: [
      { item: 'Digital Marketing', amount: 45000, percentage: 36 },
      { item: 'Sales Team', amount: 38000, percentage: 30.4 },
      { item: 'Marketing Tools', amount: 22000, percentage: 17.6 },
      { item: 'Events & Partnerships', amount: 20000, percentage: 16 }
    ],
    efficiency: { metric: 'CAC', value: 485, trend: 'improving' }
  },
  {
    department: 'R&D',
    icon: Lightbulb,
    total: 87500,
    breakdown: [
      { item: 'Engineering Team', amount: 52500, percentage: 60 },
      { item: 'Product Team', amount: 17500, percentage: 20 },
      { item: 'Dev Tools & Infrastructure', amount: 12250, percentage: 14 },
      { item: 'Third-party Services', amount: 5250, percentage: 6 }
    ],
    efficiency: { metric: 'Revenue per Engineer', value: 285000, trend: 'stable' }
  },
  {
    department: 'G&A',
    icon: Building,
    total: 67500,
    breakdown: [
      { item: 'Finance & Legal', amount: 27000, percentage: 40 },
      { item: 'Office & Admin', amount: 20250, percentage: 30 },
      { item: 'HR & Recruiting', amount: 13500, percentage: 20 },
      { item: 'Insurance & Compliance', amount: 6750, percentage: 10 }
    ],
    efficiency: { metric: '% of Revenue', value: 13.5, trend: 'stable' }
  }
];

const cohortProfitability = [
  { cohort: 'Jan 2024', customers: 25, revenue: 71000, costs: 18500, margin: 73.9 },
  { cohort: 'Feb 2024', customers: 28, revenue: 79800, costs: 20200, margin: 74.7 },
  { cohort: 'Mar 2024', customers: 22, revenue: 62700, costs: 15800, margin: 74.8 },
  { cohort: 'Apr 2024', customers: 30, revenue: 85500, costs: 21200, margin: 75.2 },
  { cohort: 'May 2024', customers: 26, revenue: 74100, costs: 18000, margin: 75.7 },
  { cohort: 'Jun 2024', customers: 21, revenue: 59900, costs: 14200, margin: 76.3 }
];

export default function ProfitabilityPage() {
  const [selectedView, setSelectedView] = useState('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-NZ').format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profitability</h1>
              <p className="text-gray-600">
                Unit economics, margins, and cost efficiency analysis
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={selectedView} onValueChange={setSelectedView}>
          <div className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="costs">Cost Structure</TabsTrigger>
              <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
            </TabsList>
          </div>

              <TabsContent value="overview" className="space-y-8 mt-6">
                {/* Key Profitability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Gross Margin"
              value={profitabilityMetrics.grossMargin.value}
              change={profitabilityMetrics.grossMargin.change}
              trend={profitabilityMetrics.grossMargin.trend}
              format="percentage"
              sparkline={marginTrends.slice(-6).map(d => d.gross)}
            />
            <KpiCard
              title="Operating Margin"
              value={profitabilityMetrics.operatingMargin.value}
              change={profitabilityMetrics.operatingMargin.change}
              trend={profitabilityMetrics.operatingMargin.trend}
              format="percentage"
              sparkline={marginTrends.slice(-6).map(d => d.operating)}
            />
            <KpiCard
              title="Net Margin"
              value={profitabilityMetrics.netMargin.value}
              change={profitabilityMetrics.netMargin.change}
              trend={profitabilityMetrics.netMargin.trend}
              format="percentage"
              sparkline={marginTrends.slice(-6).map(d => d.net)}
            />
            <KpiCard
              title="EBITDA Margin"
              value={profitabilityMetrics.ebitdaMargin.value}
              change={profitabilityMetrics.ebitdaMargin.change}
              trend={profitabilityMetrics.ebitdaMargin.trend}
              format="percentage"
              sparkline={marginTrends.slice(-6).map(d => d.ebitda)}
            />
          </div>

          {/* Unit Economics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Customer Acquisition Cost"
              value={profitabilityMetrics.cac.value}
              change={profitabilityMetrics.cac.change}
              trend={profitabilityMetrics.cac.trend}
              format="currency"
              sparkline={unitEconomics.slice(-6).map(d => d.cac)}
            />
            <KpiCard
              title="Lifetime Value"
              value={profitabilityMetrics.ltv.value}
              change={profitabilityMetrics.ltv.change}
              trend={profitabilityMetrics.ltv.trend}
              format="currency"
              sparkline={unitEconomics.slice(-6).map(d => d.ltv)}
            />
            <KpiCard
              title="LTV:CAC Ratio"
              value={profitabilityMetrics.ltvCacRatio.value}
              change={profitabilityMetrics.ltvCacRatio.change}
              trend={profitabilityMetrics.ltvCacRatio.trend}
              format="number"
              suffix=":1"
              sparkline={unitEconomics.slice(-6).map(d => d.ratio)}
            />
            <KpiCard
              title="Payback Period"
              value={profitabilityMetrics.paybackPeriod.value}
              change={profitabilityMetrics.paybackPeriod.change}
              trend={profitabilityMetrics.paybackPeriod.trend}
              format="number"
              suffix=" months"
            />
          </div>

          {/* Margin Trends & Unit Economics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>Margin Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marginTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: '#666' }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#666' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: number | string) => [`${value}%`, '']}
                    />
                    <Line type="monotone" dataKey="gross" stroke="#10b981" strokeWidth={3} name="Gross Margin" />
                    <Line type="monotone" dataKey="operating" stroke="#3b82f6" strokeWidth={3} name="Operating Margin" />
                    <Line type="monotone" dataKey="net" stroke="#8b5cf6" strokeWidth={3} name="Net Margin" />
                    <Line type="monotone" dataKey="ebitda" stroke="#f59e0b" strokeWidth={3} name="EBITDA Margin" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-green-600" />
                  <span>Unit Economics Evolution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={unitEconomics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: '#666' }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 12, fill: '#666' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 12, fill: '#666' }}
                      tickFormatter={(value) => `${value}:1`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="cac" stroke="#ef4444" strokeWidth={3} name="CAC" />
                    <Line yAxisId="left" type="monotone" dataKey="ltv" stroke="#10b981" strokeWidth={3} name="LTV" />
                    <Line yAxisId="right" type="monotone" dataKey="ratio" stroke="#8b5cf6" strokeWidth={3} name="LTV:CAC Ratio" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-8">
          {/* Cost Structure Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-indigo-600" />
                  <span>Cost Structure Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={costStructure}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="amount"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {costStructure.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number | string) => [formatCurrency(Number(value)), '']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Cost Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costStructure.map((cost, index) => (
                    <div key={cost.category} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: cost.color }}
                        ></div>
                        <span className="font-medium text-gray-900">{cost.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(cost.amount)}</p>
                        <p className="text-sm text-gray-600">{cost.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Deep Dive */}
          <div className="space-y-6">
            {departmentCosts.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <Card key={dept.department} className="card-modern">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-purple-600" />
                        <span>{dept.department}</span>
                      </CardTitle>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{formatCurrency(dept.total)}</p>
                        <Badge className={`${
                          dept.efficiency.trend === 'improving' ? 'bg-emerald-100 text-emerald-700' :
                          dept.efficiency.trend === 'stable' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {dept.efficiency.metric}: {typeof dept.efficiency.value === 'number' && dept.efficiency.value > 1000 
                            ? formatCurrency(dept.efficiency.value) 
                            : dept.efficiency.value}{dept.efficiency.metric.includes('%') ? '' : ''}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {dept.breakdown.map((item, idx) => (
                        <div key={item.item} className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900 text-sm">{item.item}</h5>
                            <span className="text-xs font-semibold text-gray-600">{item.percentage}%</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(item.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-8">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>Cohort Profitability Analysis</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Revenue and margin performance by customer acquisition cohort</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cohortProfitability.map((cohort, index) => (
                  <div key={cohort.cohort} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{cohort.cohort}</p>
                          <p className="text-xs text-gray-600">Cohort</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{cohort.customers}</p>
                          <p className="text-xs text-gray-600">Customers</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(cohort.revenue)}</p>
                          <p className="text-xs text-gray-600">Revenue</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(cohort.costs)}</p>
                          <p className="text-xs text-gray-600">Costs</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-bold text-emerald-700">{cohort.margin.toFixed(1)}%</p>
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                              Margin
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>

        {/* Strategic Recommendations */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Profitability Insights & Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-emerald-900">Strong Unit Economics</h4>
                </div>
                <p className="text-sm text-emerald-800 mb-3">
                  LTV:CAC ratio of 17.4:1 is excellent (&gt;3:1 is good). Payback period of 8.2 months is healthy.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Optimize Further
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Percent className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900">Improving Margins</h4>
                </div>
                <p className="text-sm text-blue-800 mb-3">
                  Gross margin trending up to 73.2%. Operating leverage showing with 18.5% operating margin.
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Margin Analysis
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-orange-900">Cost Optimization</h4>
                </div>
                <p className="text-sm text-orange-800 mb-3">
                  CAC declining 12.5% while LTV growing 18.2%. Consider increasing marketing spend efficiency.
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Cost Strategy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
