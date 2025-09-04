'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KpiCard } from '@/components/KpiCard';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Download, Printer, Mail } from 'lucide-react';
import { currentKPIs, cashflowHistory, runwayProjection } from '@/data/mock';
import Image from 'next/image';

interface ReportPreviewProps {
  dateRange: string;
  scenario: string;
  reportContent: {
    highlights: string;
    lowlights: string;
    kpis: string;
    nextSteps: string;
    asks: string;
  };
}

export function ReportPreview({ dateRange, scenario, reportContent }: ReportPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // In a real app, this would generate a PDF
    console.log('Exporting PDF...');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Sample data for the report
  const recentCashflow = cashflowHistory.slice(-6);
  const projectionSample = runwayProjection.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Export Actions */}
      <div className="flex justify-end space-x-2 no-print">
        <Button variant="outline" onClick={handlePrint} className="border-myobLavender text-myobPurple hover:bg-myobMauve">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button onClick={handleExportPDF} className="bg-myobPurple hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button variant="outline" className="border-myobLavender text-myobPurple hover:bg-myobMauve">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
      </div>

      {/* Report Content */}
      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="MYOB"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <h1 className="text-2xl font-bold text-myobPurple">MYOB Pocket CFO</h1>
                <p className="text-gray-600">Investor Update</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Report Period</p>
              <p className="font-semibold">{dateRange}</p>
              <Badge variant="outline" className="mt-1 bg-myobMauve text-myobPurple border-myobLavender">
                {scenario} Scenario
              </Badge>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Current Runway</p>
                <p className="text-2xl font-bold text-myobPurple">{currentKPIs.runway.value} months</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Monthly Burn</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentKPIs.monthlyBurn.value)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Cash on Hand</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentKPIs.cashOnHand.value)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Revenue Growth</p>
                <p className="text-2xl font-bold text-green-600">+{currentKPIs.revenueGrowth.value}%</p>
              </div>
            </div>
          </div>

          {/* Highlights & Lowlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Highlights</h3>
              <div className="prose prose-sm">
                {reportContent.highlights.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 text-gray-700">{line}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Lowlights</h3>
              <div className="prose prose-sm">
                {reportContent.lowlights.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 text-gray-700">{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard
                title="Runway"
                value={currentKPIs.runway.value}
                change={currentKPIs.runway.change}
                trend={currentKPIs.runway.trend}
                format="months"
              />
              <KpiCard
                title="Monthly Burn"
                value={currentKPIs.monthlyBurn.value}
                change={currentKPIs.monthlyBurn.change}
                trend={currentKPIs.monthlyBurn.trend}
                format="currency"
              />
              <KpiCard
                title="Cash on Hand"
                value={currentKPIs.cashOnHand.value}
                change={currentKPIs.cashOnHand.change}
                trend={currentKPIs.cashOnHand.trend}
                format="currency"
              />
              <KpiCard
                title="Revenue M/M"
                value={currentKPIs.revenueGrowth.value}
                change={currentKPIs.revenueGrowth.change}
                trend={currentKPIs.revenueGrowth.trend}
                format="percentage"
              />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cashflow Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Cashflow</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recentCashflow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="total" fill="#7b14ef" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Runway Projection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Runway Projection</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionSample}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Line 
                      type="monotone" 
                      dataKey="cashBalance" 
                      stroke="#7b14ef" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Next Steps & Asks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Next Steps</h3>
              <div className="prose prose-sm">
                {reportContent.nextSteps.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 text-gray-700">{line}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🤝 Asks</h3>
              <div className="prose prose-sm">
                {reportContent.asks.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 text-gray-700">{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-sm text-gray-500">
            <p>Generated by MYOB Pocket CFO • {new Date().toLocaleDateString()}</p>
            <p>This report contains confidential and proprietary information</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
