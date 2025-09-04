'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { CashflowData } from '@/data/mock';

interface CashflowBarProps {
  data: CashflowData[];
  title?: string;
}

export function CashflowBar({ data, title = "Cashflow Breakdown" }: CashflowBarProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Only show last 6 months for better readability
  const recentData = data.slice(-6);

  return (
    <Card className="card-modern card-hover col-span-full lg:col-span-1">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-feature text-gray-900">{title}</span>
            <p className="text-sm text-gray-600 font-normal mt-1">Operating, investing & financing activities</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeOpacity={0.6} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                tickFormatter={(value) => {
                  const [month, year] = value.split(' ');
                  return month;
                }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card p-4 border border-emerald-200 rounded-2xl shadow-2xl">
                        <p className="font-semibold text-gray-900 mb-3">{label}</p>
                        <div className="space-y-2">
                          {payload.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              ></div>
                              <span className="text-sm font-medium text-gray-700">
                                {entry.name}:
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {formatCurrency(entry.value as number)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <defs>
                <linearGradient id="operatingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="investingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="financingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7b14ef" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#6b21a8" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
                formatter={(value) => (
                  <span className="text-sm font-medium text-gray-700">
                    {value}
                  </span>
                )}
              />
              <Bar 
                dataKey="operating" 
                name="Operating"
                fill="url(#operatingGradient)"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="investing" 
                name="Investing"
                fill="url(#investingGradient)"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="financing" 
                name="Financing"
                fill="url(#financingGradient)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
