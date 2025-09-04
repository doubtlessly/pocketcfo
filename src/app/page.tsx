'use client';

import { useState } from 'react';
import { KpiCard } from '@/components/KpiCard';
import { RunwayChart } from '@/components/RunwayChart';
import { CashflowBar } from '@/components/CashflowBar';
import { InsightItem } from '@/components/InsightItem';
import { AICFOAlerts } from '@/components/AICFOAlerts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Waves, 
  Sun,
  Users,
  Receipt,
  Globe,
  Plus,
  Settings,
  Search,
  Mic,
  Send
} from 'lucide-react';
import {
  currentTourismKPIs,
  cashProjection,
  cashflowHistory,
  tourismInsights,
  seasonalityData,
  aiCFOAlerts,
  AIAlert
} from '@/data/nz-tourism-mock';
import { universalWidgets, tourismConfig, DashboardWidget } from '@/data/industry-configs';

export default function Dashboard() {
  // State for dismissed alerts
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  // Filter out dismissed alerts
  const activeAlerts = aiCFOAlerts.filter(alert => !dismissedAlerts.includes(alert.id));

  // State for dashboard widgets - initialize with default tourism widgets
  const defaultWidgets = [
    'runway', 'monthlyBurn', 'bookingRevenue', 'cancellationRate', 
    'bookings30d', 'cash-runway', 'revenue-growth'
  ];
  const [enabledWidgets, setEnabledWidgets] = useState<string[]>(defaultWidgets);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);

  // State for search/chat functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get available widgets (combine industry-specific and universal)
  const allWidgets = [...tourismConfig.dashboardWidgets, ...universalWidgets];
  const availableToAdd = allWidgets.filter(widget => !enabledWidgets.includes(widget.id));
  
  const handleApplyInsight = (id: string) => {
    console.log('Apply insight:', id);
    // In a real app, this would trigger the suggested action
  };

  const handleDismissInsight = (id: string) => {
    console.log('Dismiss insight:', id);
    // In a real app, this would remove the insight from the feed
  };

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
    console.log('Dismissed alert:', alertId);
  };

  const handleTakeAction = (alertId: string, action: string) => {
    console.log('Taking action for alert:', alertId, action);
    // In a real app, this would execute the specific action
  };

  // Widget management functions
  const addWidget = (widgetId: string) => {
    if (!enabledWidgets.includes(widgetId)) {
      setEnabledWidgets(prev => [...prev, widgetId]);
      setShowWidgetLibrary(false);
    }
  };

  const removeWidget = (widgetId: string) => {
    setEnabledWidgets(prev => prev.filter(id => id !== widgetId));
  };

  // Handle search/chat functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Navigate to Ask CFO AI with the query
    window.location.href = `/ask?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    // @ts-ignore - Speech Recognition API types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onstart = () => {
      setIsListening(true);
    };

    // @ts-ignore - SpeechRecognitionEvent type
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Render widget based on ID
  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'runway':
        return (
          <KpiCard
            key={widgetId}
            title="Runway"
            value={currentTourismKPIs.runway.value}
            change={currentTourismKPIs.runway.change}
            trend={currentTourismKPIs.runway.trend}
            format="months"
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'monthlyBurn':
        return (
          <KpiCard
            key={widgetId}
            title="Monthly Burn"
            value={currentTourismKPIs.monthlyBurn.value}
            change={currentTourismKPIs.monthlyBurn.change}
            trend={currentTourismKPIs.monthlyBurn.trend}
            format="currency"
            sparkline={currentTourismKPIs.monthlyBurn.sparkline}
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'bookingRevenue':
        return (
          <KpiCard
            key={widgetId}
            title="Booking Revenue"
            value={currentTourismKPIs.bookingRevenue.value}
            change={currentTourismKPIs.bookingRevenue.change}
            trend={currentTourismKPIs.bookingRevenue.trend}
            format="currency"
            sparkline={currentTourismKPIs.bookingRevenue.sparkline}
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'cancellationRate':
        return (
          <KpiCard
            key={widgetId}
            title="Cancellation Rate"
            value={currentTourismKPIs.cancellationRate.value}
            change={currentTourismKPIs.cancellationRate.change}
            trend={currentTourismKPIs.cancellationRate.trend}
            format="percentage"
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'bookings30d':
        return (
          <KpiCard
            key={widgetId}
            title="Bookings (30d)"
            value={currentTourismKPIs.bookings30d.value}
            change={currentTourismKPIs.bookings30d.change}
            trend={currentTourismKPIs.bookings30d.trend}
            format="number"
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'cash-runway':
        return (
          <KpiCard
            key={widgetId}
            title="Cash Runway"
            value={currentTourismKPIs.runway.value}
            change={currentTourismKPIs.runway.change}
            trend={currentTourismKPIs.runway.trend}
            format="months"
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'revenue-growth':
        return (
          <KpiCard
            key={widgetId}
            title="Revenue Growth"
            value={15.2}
            change={2.3}
            trend="up"
            format="percentage"
            sparkline={[12.5, 13.1, 14.2, 14.8, 15.2]}
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'profit-margins':
        return (
          <KpiCard
            key={widgetId}
            title="Profit Margin"
            value={23.5}
            change={1.8}
            trend="up"
            format="percentage"
            onRemove={() => removeWidget(widgetId)}
          />
        );
      case 'monthly-burn':
        return (
          <KpiCard
            key={widgetId}
            title="Monthly Burn"
            value={currentTourismKPIs.monthlyBurn.value}
            change={currentTourismKPIs.monthlyBurn.change}
            trend={currentTourismKPIs.monthlyBurn.trend}
            format="currency"
            sparkline={currentTourismKPIs.monthlyBurn.sparkline}
            onRemove={() => removeWidget(widgetId)}
          />
        );
      default:
        return null;
    }
  };

  // Check if we're in peak season (Dec-Mar)
  const currentMonth = new Date().getMonth();
  const isPeakSeason = currentMonth >= 11 || currentMonth <= 2; // Dec(11), Jan(0), Feb(1), Mar(2)

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Welcome back, Aroha
              </h1>
              <p className="text-gray-600">
                See what matters most, before it matters most
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isPeakSeason && (
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-3 py-1 rounded-full shadow-lg animate-pulse">
                  <Sun className="h-4 w-4 mr-1" />
                  <span className="font-medium text-sm">Peak Season</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Smart Search / AI Chat Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center p-2">
                  {/* Search Icon */}
                  <div className="p-3 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                  
                  {/* Input Field */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Ask your AI CFO anything: 'How's our runway?' • 'Should we hire?' • 'Cash flow trends?'"
                    className="flex-1 px-2 py-4 text-base text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none focus:ring-0"
                  />
                  
                  {/* Voice Button */}
                  <button
                    onClick={handleVoiceSearch}
                    disabled={isListening}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      isListening 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                    title="Voice search"
                  >
                    <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
                  </button>
                  
                  {/* Send Button */}
                  <button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    className="ml-2 mr-1 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl transition-all duration-200 shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
                    title="Ask AI CFO"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agent Alerts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-feature text-gray-900">AI Agent Alerts</h2>
                <p className="text-sm text-gray-600">Always-on financial monitoring and recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-3 py-1 rounded-full shadow-lg animate-pulse">
                {activeAlerts.filter(alert => alert.urgency === 'critical' || alert.urgency === 'high').length} urgent
              </Badge>
              <Button className="btn-modern btn-secondary-modern" asChild>
                <a href="/alerts">
                  View All
                </a>
              </Button>
            </div>
          </div>
          <AICFOAlerts 
            alerts={activeAlerts}
            limit={2}
            onDismiss={handleDismissAlert}
            onTakeAction={handleTakeAction}
          />
        </div>

        {/* Modern Alert Cards */}
        <div className="space-y-4 mb-8">
          {isPeakSeason && (
            <div className="glass-card rounded-2xl p-6 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 animate-slide-up">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
                  <Sun className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-feature text-orange-900 mb-2">Peak Season Opportunity</h3>
                  <p className="text-orange-800 mb-3">
                    NZ summer booking demand is high. Monitor capacity and consider front-loading marketing spend for maximum ROI.
                  </p>
                  <div className="flex space-x-3">
                    <button className="btn-modern bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm">
                      Optimize Marketing
                    </button>
                    <button className="btn-modern btn-secondary-modern text-orange-700 border-orange-300 px-4 py-2 text-sm">
                      View Capacity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Customizable Widgets Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-feature text-gray-900">Key Metrics</h2>
                <p className="text-sm text-gray-600">Your customized business performance indicators</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowWidgetLibrary(!showWidgetLibrary)}
                className="btn-modern btn-secondary-modern"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>
            </div>
          </div>

          {/* Widget Library */}
          {showWidgetLibrary && (
            <Card className="card-modern mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Add Widget</CardTitle>
                <p className="text-sm text-gray-600">Choose from available CFO metrics and insights</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableToAdd.map((widget) => (
                    <div
                      key={widget.id}
                      className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 cursor-pointer"
                      onClick={() => addWidget(widget.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{widget.title}</h4>
                        {widget.industrySpecific && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Tourism</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{widget.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">{widget.type}</Badge>
                        <Badge variant="outline" className="text-xs">{widget.category}</Badge>
                      </div>
                    </div>
                  ))}
                  {availableToAdd.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-600">All available widgets are currently added to your dashboard.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dynamic Widget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enabledWidgets.map((widgetId) => renderWidget(widgetId)).filter(Boolean)}
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-12">
          <RunwayChart 
            data={cashProjection.map(item => ({
              month: item.month,
              cashBalance: item.projected || item.actual || 0,
              projected: !item.actual,
            }))} 
            title="Cash Runway"
            subtitle="12 month cash projection"
          />
        </div>

        {/* AI Insights Section */}
        <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-feature text-gray-900">AI Insights</h2>
                  <p className="text-sm text-gray-600">Tourism business intelligence</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 px-3 py-1 rounded-full shadow-lg">
                {tourismInsights.length} new insights
              </Badge>
            </div>
            <div className="space-y-3">
              {tourismInsights.slice(0, 4).map((insight) => (
                <Card key={insight.id} className="card-modern card-hover group">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`p-3 rounded-xl shadow-lg ${
                          insight.severity === 'positive' ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                          insight.severity === 'warning' ? 'bg-gradient-to-br from-orange-500 to-amber-600' :
                          'bg-gradient-to-br from-blue-500 to-indigo-600'
                        }`}>
                          {insight.severity === 'positive' ? <TrendingUp className="h-4 w-4 text-white" /> :
                           insight.severity === 'warning' ? <AlertCircle className="h-4 w-4 text-white" /> :
                           <DollarSign className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {insight.description}
                        </p>
                        
                        <div className="glass p-3 rounded-xl mb-3 border border-purple-100">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-purple-700">Impact:</span> {insight.impact}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {insight.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              className="btn-modern btn-secondary-modern text-xs px-3 py-2"
                              onClick={() => handleApplyInsight(insight.id)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}