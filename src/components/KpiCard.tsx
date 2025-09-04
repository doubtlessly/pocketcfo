'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  sparkline?: number[];
  format?: 'currency' | 'percentage' | 'number' | 'months';
  suffix?: string;
  onRemove?: () => void;
  removable?: boolean;
}

export function KpiCard({ 
  title, 
  value, 
  change, 
  trend, 
  sparkline, 
  format = 'number',
  suffix,
  onRemove,
  removable = true
}: KpiCardProps) {
  const formatValue = (val: string | number) => {
    const numVal = typeof val === 'string' ? parseFloat(val) : val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numVal);
      case 'percentage':
        return `${numVal.toFixed(1)}%`;
      case 'months':
        return `${numVal.toFixed(1)} months`;
      default:
        return numVal.toLocaleString();
    }
  };

  const formatChange = (changeVal: number) => {
    const absChange = Math.abs(changeVal);
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(absChange);
      case 'percentage':
        return `${absChange.toFixed(1)}pp`;
      case 'months':
        return `${absChange.toFixed(1)}mo`;
      default:
        return absChange.toLocaleString();
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'bg-emerald-100 text-emerald-700 shadow-emerald-100/50';
      case 'down':
        return 'bg-rose-100 text-rose-700 shadow-rose-100/50';
      default:
        return 'bg-slate-100 text-slate-700 shadow-slate-100/50';
    }
  };

  // Prepare sparkline data
  const sparklineData = sparkline?.map((value, index) => ({ value, index })) || [];

  return (
    <Card className="card-modern card-hover animate-fade-in group relative">
      {/* Remove Button */}
      {removable && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600 z-10"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </CardTitle>
        {sparkline && sparkline.length > 0 && (
          <div className="h-10 w-20 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#sparklineGradient)"
                  strokeWidth={3}
                  dot={false}
                />
                <defs>
                  <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7b14ef" />
                    <stop offset="100%" stopColor="#c497fe" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-3xl font-bold text-gray-900 tracking-tight">
            {formatValue(value)}
            {suffix && <span className="text-lg text-gray-500 ml-2 font-normal">{suffix}</span>}
          </div>
          {change !== undefined && (
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getTrendColor()}`}
              >
                <div className="flex items-center space-x-1">
                  {getTrendIcon()}
                  <span>
                    {trend === 'down' ? '' : '+'}
                    {formatChange(change)}
                  </span>
                </div>
              </Badge>
              <span className="text-xs text-gray-500 font-medium">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
