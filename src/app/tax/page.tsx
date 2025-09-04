'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Receipt, 
  Calendar, 
  Calculator, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  DollarSign,
  FileText,
  Clock,
  Info,
  TrendingUp,
  Building2,
  CreditCard
} from 'lucide-react';
import { gstObligations, revenueBreakdown, currentTourismKPIs } from '@/data/nz-tourism-mock';

export default function GSTAssistantPage() {
  const currentPeriod = gstObligations.find(obligation => obligation.status === 'upcoming');
  const lastPeriod = gstObligations.find(obligation => obligation.status === 'paid');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'due':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const checklist = [
    { id: 1, task: 'Bank reconciliation completed', completed: true, description: 'All bank transactions matched and categorized' },
    { id: 2, task: 'Review high-value refunds/cancellations', completed: true, description: 'Summer booking cancellations reviewed for GST impact' },
    { id: 3, task: 'Verify AU customer zero-rating', completed: false, description: 'Ensure Australian customers properly zero-rated for GST' },
    { id: 4, task: 'Input tax credits compiled', completed: false, description: 'Business expenses with GST component identified' },
    { id: 5, task: 'Seasonal adjustment review', completed: false, description: 'Check for any seasonal business adjustments needed' },
  ];

  const completedTasks = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedTasks / checklist.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GST Assistant 🇳🇿
          </h1>
          <p className="text-gray-600">
            Stay compliant with NZ GST requirements for your tourism business
          </p>
        </div>

        {/* Alert for upcoming GST */}
        {currentPeriod && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>GST Return Due:</strong> Your GST return for {currentPeriod.period} is due on{' '}
              <strong>{new Date(currentPeriod.dueDate).toLocaleDateString('en-NZ')}</strong>.
              Estimated liability: <strong>{formatCurrency(currentPeriod.estimatedAmount)}</strong>
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Receipt className="h-4 w-4 mr-2" />
                Next GST Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(currentPeriod?.estimatedAmount || 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Due {currentPeriod ? new Date(currentPeriod.dueDate).toLocaleDateString('en-NZ') : 'N/A'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Taxable Supplies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentPeriod?.taxableSupplies || 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">NZ domestic sales (15% GST)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Zero-Rated Exports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(currentPeriod?.zeroRatedExports || 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">AU customers (0% GST)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Input Tax Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentPeriod?.inputTaxCredits || 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">GST on business expenses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* GST Calculation Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                GST Calculation Breakdown
              </CardTitle>
              <p className="text-gray-600">Current period: {currentPeriod?.period}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Taxable Supplies (NZ)</span>
                  <span className="font-semibold">{formatCurrency(currentPeriod?.taxableSupplies || 0)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">GST on Sales (15%)</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency((currentPeriod?.taxableSupplies || 0) * 0.15)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Zero-Rated Exports (AU)</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(currentPeriod?.zeroRatedExports || 0)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Input Tax Credits</span>
                  <span className="font-semibold text-green-600">
                    -{formatCurrency(currentPeriod?.inputTaxCredits || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                  <span className="font-semibold text-gray-900">Net GST Payable</span>
                  <span className="font-bold text-xl text-myobPurple">
                    {formatCurrency(currentPeriod?.estimatedAmount || 0)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Tourism Business Note</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Your Australian customers ({Math.round((revenueBreakdown.audRevenue / (revenueBreakdown.audRevenue + revenueBreakdown.bookingFees)) * 100)}% of revenue) 
                      are zero-rated for GST. Ensure you have valid customer addresses and business documentation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Preparation Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Return Preparation
                </div>
                <Badge variant="outline" className={progressPercentage === 100 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                  {completedTasks}/{checklist.length} Complete
                </Badge>
              </CardTitle>
              <Progress value={progressPercentage} className="mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      item.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {item.completed && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.task}
                      </p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-3">
                <Button className="bg-myobPurple hover:opacity-90 flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Transactions
                </Button>
                <Button variant="outline" className="border-myobLavender text-myobPurple hover:bg-myobMauve">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GST History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              GST Filing History
            </CardTitle>
            <p className="text-gray-600">Your 2-monthly GST return track record</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gstObligations.map((period, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      period.status === 'paid' ? 'bg-green-500' :
                      period.status === 'upcoming' ? 'bg-blue-500' :
                      period.status === 'due' ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{period.period}</p>
                      <p className="text-sm text-gray-600">Due: {new Date(period.dueDate).toLocaleDateString('en-NZ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(period.estimatedAmount)}</p>
                      <p className="text-sm text-gray-500">
                        Taxable: {formatCurrency(period.taxableSupplies)} | 
                        Zero-rated: {formatCurrency(period.zeroRatedExports)}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(period.status)}>
                      {period.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-semibold">Ask CFO about GST</div>
                  <div className="text-sm text-gray-600">Get AI guidance on GST questions</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-semibold">Schedule GST Payment</div>
                  <div className="text-sm text-gray-600">Set up automatic GST payments</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 text-left justify-start">
                <div>
                  <div className="font-semibold">Connect MYOB Ledger</div>
                  <div className="text-sm text-gray-600">Automate GST calculations</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
