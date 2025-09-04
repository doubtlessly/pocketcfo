'use client';

import { useState } from 'react';
import { AICFOAlerts } from '@/components/AICFOAlerts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain,
  AlertTriangle,
  TrendingUp,
  Info,
  Zap,
  DollarSign,
  Shield,
  Clock,
  Target,
  Filter,
  Settings,
  CheckCircle
} from 'lucide-react';
import { aiCFOAlerts, AIAlert } from '@/data/nz-tourism-mock';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(aiCFOAlerts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Alert statistics
  const stats = {
    total: alerts.filter(alert => !alert.dismissed).length,
    critical: alerts.filter(alert => !alert.dismissed && alert.urgency === 'critical').length,
    high: alerts.filter(alert => !alert.dismissed && alert.urgency === 'high').length,
    opportunities: alerts.filter(alert => !alert.dismissed && alert.type === 'opportunity').length,
    totalSavings: alerts
      .filter(alert => !alert.dismissed && alert.estimatedSavings)
      .reduce((sum, alert) => sum + (alert.estimatedSavings || 0), 0),
    totalRisk: alerts
      .filter(alert => !alert.dismissed && alert.estimatedRisk)
      .reduce((sum, alert) => sum + (alert.estimatedRisk || 0), 0),
  };

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Alerts', icon: Brain, count: stats.total },
    { id: 'critical', label: 'Critical', icon: AlertTriangle, count: stats.critical },
    { id: 'cashflow', label: 'Cash Flow', icon: DollarSign, count: alerts.filter(a => !a.dismissed && a.category === 'cashflow').length },
    { id: 'growth', label: 'Growth', icon: TrendingUp, count: alerts.filter(a => !a.dismissed && a.category === 'growth').length },
    { id: 'risk', label: 'Risk', icon: Shield, count: alerts.filter(a => !a.dismissed && a.category === 'risk').length },
    { id: 'compliance', label: 'Compliance', icon: Clock, count: alerts.filter(a => !a.dismissed && a.category === 'compliance').length },
    { id: 'efficiency', label: 'Efficiency', icon: Zap, count: alerts.filter(a => !a.dismissed && a.category === 'efficiency').length },
    { id: 'fundraising', label: 'Fundraising', icon: Target, count: alerts.filter(a => !a.dismissed && a.category === 'fundraising').length },
  ];

  const filteredAlerts = selectedCategory === 'all' 
    ? alerts
    : selectedCategory === 'critical'
    ? alerts.filter(alert => alert.urgency === 'critical')
    : alerts.filter(alert => alert.category === selectedCategory);

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const handleTakeAction = (alertId: string, action: string) => {
    console.log('Taking action:', alertId, action);
    // In a real app, this would trigger the appropriate action
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xs font-bold text-white">{stats.critical + stats.high}</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI CFO Alerts</h1>
                <p className="text-gray-600">
                  Proactive financial monitoring and recommendations for your tourism business
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button className="btn-modern btn-secondary-modern">
                <Settings className="h-4 w-4 mr-2" />
                Alert Settings
              </Button>
              <Button className="btn-modern btn-primary-modern">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Urgent Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.critical + stats.high}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.opportunities}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Potential Savings</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.totalSavings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Financial Risk</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.totalRisk)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filter Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                      {category.count > 0 && (
                        <Badge 
                          className={`${
                            selectedCategory === category.id
                              ? 'bg-purple-200 text-purple-800'
                              : 'bg-gray-200 text-gray-700'
                          } border-0`}
                        >
                          {category.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === 'all' 
                    ? 'All Alerts' 
                    : categories.find(c => c.id === selectedCategory)?.label || 'Alerts'
                  }
                </h2>
                <div className="text-sm text-gray-600">
                  {filteredAlerts.filter(alert => !alert.dismissed).length} active alerts
                </div>
              </div>
            </div>

            <AICFOAlerts
              alerts={filteredAlerts}
              showAll={true}
              onDismiss={handleDismissAlert}
              onTakeAction={handleTakeAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
