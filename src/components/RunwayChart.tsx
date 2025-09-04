'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { RunwayData } from '@/data/mock';

interface RunwayChartProps {
  data: RunwayData[];
  title?: string;
  subtitle?: string;
}

export function RunwayChart({ data, title = "Cash Runway Projection", subtitle = "12-month cash projection with seasonal trends" }: RunwayChartProps) {
  // Format currency for tooltip and axis
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Find where cash goes to zero
  const zeroPoint = data.find(item => item.cashBalance <= 0);
  
  return (
    <Card className="card-modern card-hover col-span-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-feature text-gray-900">{title}</span>
            <p className="text-sm text-gray-600 font-normal mt-1">{subtitle}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
              <defs>
                <linearGradient id="runwayStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7b14ef" />
                  <stop offset="50%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#c497fe" />
                </linearGradient>
                <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7b14ef" stopOpacity={0.4}/>
                  <stop offset="40%" stopColor="#9333ea" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#c497fe" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
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
                      <div className="glass-card p-4 border border-purple-200 rounded-2xl shadow-2xl">
                        <p className="font-semibold text-gray-900 mb-2">{label}</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                          <span className="text-purple-700 font-medium">
                            Cash Balance: {formatCurrency(payload[0].value as number)}
                          </span>
                        </div>
                        {payload[0].payload.projected && (
                          <p className="text-xs text-gray-500 mt-2 px-2 py-1 bg-purple-50 rounded-full inline-block">
                            ✨ Projected
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="cashBalance"
                stroke="url(#runwayStroke)"
                strokeWidth={4}
                fill="url(#cashGradient)"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={payload?.projected ? 3 : 4}
                      fill="url(#runwayStroke)"
                      stroke="#fff"
                      strokeWidth={2}
                      className="drop-shadow-sm"
                    />
                  );
                }}
                activeDot={{ 
                  r: 7, 
                  stroke: '#fff', 
                  strokeWidth: 3, 
                  fill: 'url(#runwayStroke)',
                  className: 'drop-shadow-lg'
                }}
              />
              {/* Zero line */}
              <ReferenceLine 
                y={0} 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{ value: "Zero Cash", position: "top", fill: "#ef4444" }}
              />
              {/* Zero point marker */}
              {zeroPoint && (
                <ReferenceLine 
                  x={zeroPoint.month} 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ 
                    value: "Runway End", 
                    position: "top", 
                    fill: "#ef4444",
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {zeroPoint && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Runway Alert</h4>
                <p className="text-sm text-red-800">
                  Based on current burn rate, cash will be depleted by <span className="font-bold">{zeroPoint.month}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
