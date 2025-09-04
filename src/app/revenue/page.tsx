'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3,
  Calendar,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  UserX,
  TrendingUp as Growth
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { KpiCard } from '@/components/KpiCard';

// Mock revenue and growth data
const revenueMetrics = {
  mrr: { value: 425000, change: 18.5, trend: 'up' as const },
  arr: { value: 5100000, change: 22.3, trend: 'up' as const },
  bookings: { value: 487000, change: 15.2, trend: 'up' as const },
  arpu: { value: 2840, change: 8.1, trend: 'up' as const },
  growthRate: { value: 18.5, change: 2.3, trend: 'up' as const },
  churnRate: { value: 3.2, change: -0.5, trend: 'up' as const }, // positive trend = lower churn
  netRevenueRetention: { value: 108.5, change: 4.2, trend: 'up' as const },
  customerCount: { value: 149, change: 12, trend: 'up' as const }
};

const monthlyRevenue = [
  { month: 'Jul 2024', mrr: 285000, bookings: 320000, newCustomers: 15, churnedCustomers: 3 },
  { month: 'Aug 2024', mrr: 310000, bookings: 350000, newCustomers: 18, churnedCustomers: 4 },
  { month: 'Sep 2024', mrr: 335000, bookings: 380000, newCustomers: 22, churnedCustomers: 5 },
  { month: 'Oct 2024', mrr: 365000, bookings: 415000, newCustomers: 25, churnedCustomers: 4 },
  { month: 'Nov 2024', mrr: 395000, bookings: 455000, newCustomers: 19, churnedCustomers: 6 },
  { month: 'Dec 2024', mrr: 425000, bookings: 487000, newCustomers: 21, churnedCustomers: 5 }
];

const cohortRetention = [
  { month: 'Month 0', jan: 100, feb: 100, mar: 100, apr: 100, may: 100, jun: 100 },
  { month: 'Month 1', jan: 92, feb: 94, mar: 93, apr: 95, may: 94, jun: 96 },
  { month: 'Month 2', jan: 87, feb: 89, mar: 88, apr: 91, may: 90, jun: 92 },
  { month: 'Month 3', jan: 82, feb: 85, mar: 84, apr: 87, may: 86, jun: 89 },
  { month: 'Month 4', jan: 78, feb: 81, mar: 80, apr: 84, may: 83, jun: null },
  { month: 'Month 5', jan: 75, feb: 78, mar: 77, apr: 81, may: null, jun: null },
  { month: 'Month 6', jan: 72, feb: 75, mar: 74, apr: null, may: null, jun: null }
];

const customerSegments = [
  { segment: 'Adventure Tours', customers: 45, mrr: 128000, arpu: 2844, growth: 25.3 },
  { segment: 'Accommodation', customers: 32, mrr: 96000, arpu: 3000, growth: 18.7 },
  { segment: 'Transport & Logistics', customers: 28, mrr: 84000, arpu: 3000, growth: 15.2 },
  { segment: 'Food & Beverage', customers: 24, mrr: 67200, arpu: 2800, growth: 12.8 },
  { segment: 'Experience Providers', customers: 20, mrr: 49800, arpu: 2490, growth: 8.9 }
];

const bookingChannels = [
  { channel: 'Direct Website', bookings: 195000, percentage: 40, growth: 22.5 },
  { channel: 'Tourism Partners', bookings: 146000, percentage: 30, growth: 18.2 },
  { channel: 'Booking Platforms', bookings: 97000, percentage: 20, growth: 8.7 },
  { channel: 'Referrals', bookings: 49000, percentage: 10, growth: 35.8 }
];

export default function RevenuePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Revenue & Growth</h1>
                <p className="text-gray-600">
                  Top-line performance, growth metrics, and customer insights
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <TabsList>
                  <TabsTrigger value="3months">3M</TabsTrigger>
                  <TabsTrigger value="6months">6M</TabsTrigger>
                  <TabsTrigger value="12months">12M</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Key Revenue Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="MRR"
            value={revenueMetrics.mrr.value}
            change={revenueMetrics.mrr.change}
            trend={revenueMetrics.mrr.trend}
            format="currency"
            sparkline={monthlyRevenue.slice(-6).map(d => d.mrr)}
          />
          <KpiCard
            title="ARR"
            value={revenueMetrics.arr.value}
            change={revenueMetrics.arr.change}
            trend={revenueMetrics.arr.trend}
            format="currency"
          />
          <KpiCard
            title="Monthly Bookings"
            value={revenueMetrics.bookings.value}
            change={revenueMetrics.bookings.change}
            trend={revenueMetrics.bookings.trend}
            format="currency"
            sparkline={monthlyRevenue.slice(-6).map(d => d.bookings)}
          />
          <KpiCard
            title="ARPU"
            value={revenueMetrics.arpu.value}
            change={revenueMetrics.arpu.change}
            trend={revenueMetrics.arpu.trend}
            format="currency"
          />
        </div>

        {/* Growth & Retention Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Growth Rate"
            value={revenueMetrics.growthRate.value}
            change={revenueMetrics.growthRate.change}
            trend={revenueMetrics.growthRate.trend}
            format="percentage"
          />
          <KpiCard
            title="Churn Rate"
            value={revenueMetrics.churnRate.value}
            change={revenueMetrics.churnRate.change}
            trend={revenueMetrics.churnRate.trend}
            format="percentage"
          />
          <KpiCard
            title="Net Revenue Retention"
            value={revenueMetrics.netRevenueRetention.value}
            change={revenueMetrics.netRevenueRetention.change}
            trend={revenueMetrics.netRevenueRetention.trend}
            format="percentage"
          />
          <KpiCard
            title="Active Customers"
            value={revenueMetrics.customerCount.value}
            change={revenueMetrics.customerCount.change}
            trend={revenueMetrics.customerCount.trend}
            format="number"
          />
        </div>

        {/* Revenue Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <span>Revenue Growth Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#666' }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#666' }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number | string) => [formatCurrency(Number(value)), '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mrr" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="url(#mrrGradient)" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stackId="2"
                    stroke="#3b82f6" 
                    fill="url(#bookingsGradient)" 
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="mrrGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="bookingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Customer Acquisition</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#666' }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="newCustomers" fill="#7b14ef" name="New Customers" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churnedCustomers" fill="#c497fe" name="Churned Customers" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Customer Segments & Channel Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Customer Segments</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Revenue breakdown by tourism segment</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={segment.segment} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{segment.segment}</h4>
                        <Badge className={`${
                          segment.growth > 20 ? 'bg-emerald-100 text-emerald-700' :
                          segment.growth > 15 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          +{segment.growth}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customers</p>
                          <p className="font-semibold">{segment.customers}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">MRR</p>
                          <p className="font-semibold">{formatCurrency(segment.mrr)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">ARPU</p>
                          <p className="font-semibold">{formatCurrency(segment.arpu)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                <span>Booking Channels</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Revenue sources and growth by channel</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingChannels.map((channel, index) => (
                  <div key={channel.channel} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{channel.channel}</h4>
                        <div className="flex items-center space-x-2">
                          {channel.growth > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-semibold ${
                            channel.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {channel.growth > 0 ? '+' : ''}{channel.growth}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Monthly Bookings</p>
                          <p className="font-semibold">{formatCurrency(channel.bookings)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 text-sm">Share</p>
                          <p className="font-semibold">{channel.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Insights */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Growth className="h-5 w-5 text-purple-600" />
              <span>Growth Insights & Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-emerald-900">Strong Growth Momentum</h4>
                </div>
                <p className="text-sm text-emerald-800 mb-3">
                  18.5% MRR growth with improving unit economics. Adventure tours segment leading growth at 25.3%.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Analyze Growth Drivers
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900">Healthy Retention</h4>
                </div>
                <p className="text-sm text-blue-800 mb-3">
                  3.2% churn rate (improving) with 108.5% net revenue retention indicates strong product-market fit.
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Retention Analysis
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-orange-900">Channel Optimization</h4>
                </div>
                <p className="text-sm text-orange-800 mb-3">
                  Referrals growing 35.8% - consider incentive programs. Direct bookings at 40% are strong.
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Channel Strategy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
