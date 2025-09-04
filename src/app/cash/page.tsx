'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  Phone, 
  Mail, 
  CheckCircle,
  TrendingUp,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { arAging, collectionsQueue, CollectionItem } from '@/data/nz-tourism-mock';

export default function CashCollectionsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  
  // Mock cash flow projection data
  const cashflowProjection = [
    { week: 'This Week', inflow: 28000, outflow: -16000, net: 12000 },
    { week: 'Next Week', inflow: 22000, outflow: -18000, net: 4000 },
    { week: 'Week 3', inflow: 31000, outflow: -15000, net: 16000 },
    { week: 'Week 4', inflow: 19000, outflow: -20000, net: -1000 },
    { week: 'Week 5', inflow: 45000, outflow: -22000, net: 23000 }, // Peak season starts
    { week: 'Week 6', inflow: 52000, outflow: -25000, net: 27000 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const filteredQueue = activeFilter === 'all' 
    ? collectionsQueue 
    : collectionsQueue.filter(item => item.riskLevel === activeFilter);

  const totalOverdue = arAging.reduce((sum, bucket) => sum + bucket.amount, 0);
  const collectionOpportunity = Math.round(totalOverdue * 0.7); // Assuming 70% collection rate

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cash & Collections</h1>
              <p className="text-gray-600">
                Stay on top of cash flow and accounts receivable for your tourism business
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Total Outstanding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalOverdue)}</div>
              <p className="text-xs text-gray-500 mt-1">Across {arAging.reduce((sum, bucket) => sum + bucket.count, 0)} customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Collection Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(collectionOpportunity)}</div>
              <p className="text-xs text-gray-500 mt-1">Estimated at 70% collection rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Average Days to Pay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">47 days</div>
              <p className="text-xs text-gray-500 mt-1">Industry avg: 65 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                High Risk Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {collectionsQueue.filter(item => item.riskLevel === 'high').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Requiring immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AR Aging */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Accounts Receivable Aging</CardTitle>
              <p className="text-gray-600">Tourism operators often struggle in winter months</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {arAging.map((bucket, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ 
                        backgroundColor: ['#16a34a', '#f59e0b', '#ef4444', '#7f1d1d'][index] 
                      }}></div>
                      <span className="font-medium text-gray-900">{bucket.bucket} days</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(bucket.amount)}</div>
                        <div className="text-sm text-gray-500">{bucket.count} customers</div>
                      </div>
                      <div className="w-24">
                        <Progress value={bucket.percentage} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">{bucket.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Winter Collection Strategy</h4>
                <p className="text-sm text-blue-800">
                  Tourism operators typically struggle with cash flow during NZ winter (Jun-Aug). 
                  Consider offering payment plans or seasonal discounts to improve collection rates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Cash Flow Projection</CardTitle>
              <p className="text-gray-600">Next 6 weeks with peak season impact</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashflowProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        formatCurrency(value), 
                        name === 'inflow' ? 'Inflow' : name === 'outflow' ? 'Outflow' : 'Net'
                      ]}
                    />
                    <Bar dataKey="inflow" fill="#16a34a" />
                    <Bar dataKey="outflow" fill="#ef4444" />
                    <Bar dataKey="net" fill="#7b14ef" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Peak season boost:</strong> Expected 40% increase in bookings revenue from Week 5 onwards.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collections Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Collections Queue</CardTitle>
                <p className="text-gray-600">Prioritized by risk level and tourism seasonality</p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex space-x-1">
                  {['all', 'high', 'medium', 'low'].map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveFilter(filter as 'all' | 'high' | 'medium' | 'low')}
                      className={activeFilter === filter ? 'bg-myobPurple hover:opacity-90' : ''}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredQueue.map((item) => (
                <Card key={item.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{item.customerName}</h4>
                          <Badge variant="outline" className={getRiskColor(item.riskLevel)}>
                            {item.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Amount Overdue</p>
                            <p className="font-semibold text-lg">{formatCurrency(item.amount)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Days Overdue</p>
                            <p className="font-semibold text-lg text-red-600">{item.daysOverdue} days</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Predicted Pay Date</p>
                            <p className="font-semibold">{new Date(item.predictedPayDate).toLocaleDateString('en-NZ')}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg mb-3">
                          <p className="text-sm font-medium text-gray-700">Suggested Action:</p>
                          <p className="text-sm text-gray-600">{item.suggestedAction}</p>
                        </div>

                        {item.contactScript && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-700">Contact Script:</p>
                            <p className="text-sm text-blue-600 mt-1">{item.contactScript}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="bg-myobPurple hover:opacity-90">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="border-myobLavender text-myobPurple hover:bg-myobMauve">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Paid
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredQueue.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No {activeFilter === 'all' ? '' : activeFilter + ' risk '}collection items</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
