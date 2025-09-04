'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Info, 
  X, 
  ChevronRight,
  Brain,
  DollarSign,
  Clock,
  Target,
  Shield,
  AlertCircle
} from 'lucide-react';
import { AIAlert } from '@/data/nz-tourism-mock';

interface AICFOAlertsProps {
  alerts: AIAlert[];
  onDismiss?: (alertId: string) => void;
  onTakeAction?: (alertId: string, action: string) => void;
  showAll?: boolean;
  limit?: number;
}

export function AICFOAlerts({ 
  alerts, 
  onDismiss, 
  onTakeAction, 
  showAll = false, 
  limit = 3 
}: AICFOAlertsProps) {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  
  // Filter out dismissed alerts and sort by urgency and date
  const activeAlerts = alerts
    .filter(alert => !alert.dismissed)
    .sort((a, b) => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const displayAlerts = showAll ? activeAlerts : activeAlerts.slice(0, limit);

  const getAlertIcon = (type: AIAlert['type']) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return AlertCircle;
      case 'opportunity':
        return TrendingUp;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getCategoryIcon = (category: AIAlert['category']) => {
    switch (category) {
      case 'cashflow':
        return DollarSign;
      case 'growth':
        return TrendingUp;
      case 'risk':
        return Shield;
      case 'compliance':
        return Clock;
      case 'efficiency':
        return Zap;
      case 'fundraising':
        return Target;
      default:
        return Info;
    }
  };

  const getAlertColors = (type: AIAlert['type'], urgency: AIAlert['urgency']) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-br from-red-500 to-rose-600',
          border: 'border-red-300',
          cardBg: 'from-red-50 to-rose-50',
          text: 'text-red-700',
          urgencyBg: 'bg-red-100 text-red-800'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
          border: 'border-orange-300',
          cardBg: 'from-orange-50 to-amber-50',
          text: 'text-orange-700',
          urgencyBg: 'bg-orange-100 text-orange-800'
        };
      case 'opportunity':
        return {
          bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
          border: 'border-emerald-300',
          cardBg: 'from-emerald-50 to-green-50',
          text: 'text-emerald-700',
          urgencyBg: 'bg-emerald-100 text-emerald-800'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
          border: 'border-blue-300',
          cardBg: 'from-blue-50 to-indigo-50',
          text: 'text-blue-700',
          urgencyBg: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
          border: 'border-gray-300',
          cardBg: 'from-gray-50 to-gray-50',
          text: 'text-gray-700',
          urgencyBg: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeAgo = (dateString: string) => {
    return '1d ago';
  };

  if (displayAlerts.length === 0) {
    return (
      <Card className="card-modern">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
          <p className="text-gray-600">Your AI CFO hasn't detected any urgent issues requiring attention.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {displayAlerts.map((alert) => {
        const AlertIcon = getAlertIcon(alert.type);
        const CategoryIcon = getCategoryIcon(alert.category);
        const colors = getAlertColors(alert.type, alert.urgency);
        const isExpanded = expandedAlert === alert.id;

        return (
          <Card 
            key={alert.id} 
            className={`card-modern card-hover group bg-gradient-to-r ${colors.cardBg} border-2 ${colors.border}`}
          >
            <CardContent className="p-5">
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 ${colors.bg} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <AlertIcon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`text-base font-semibold ${colors.text} group-hover:text-opacity-90 transition-colors`}>
                        {alert.title}
                      </h4>
                      <Badge className={`${colors.urgencyBg} border-0 text-xs font-medium`}>
                        {alert.urgency.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <CategoryIcon className="h-3 w-3" />
                        <span className="capitalize">{alert.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(alert.createdAt)}</span>
                      </div>
                      {(alert.estimatedSavings || alert.estimatedRisk) && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3" />
                          <span className={alert.estimatedSavings ? 'text-emerald-600' : 'text-red-600'}>
                            {alert.estimatedSavings 
                              ? `Save ${formatCurrency(alert.estimatedSavings)}`
                              : `Risk ${formatCurrency(alert.estimatedRisk!)}`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                    className="h-8 w-8 p-0 hover:bg-white/50"
                  >
                    <ChevronRight 
                      className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                  </Button>
                  {onDismiss && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismiss(alert.id)}
                      className="h-8 w-8 p-0 hover:bg-white/50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/30 space-y-4 animate-slide-up">
                  <div className="glass p-4 rounded-xl border border-white/20">
                    <h5 className="font-semibold text-gray-800 mb-2">AI Insight</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {alert.insight}
                    </p>
                  </div>

                  <div className="glass p-4 rounded-xl border border-white/20">
                    <h5 className="font-semibold text-gray-800 mb-2">Business Impact</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {alert.impact}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Recommended Actions</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {alert.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => onTakeAction?.(alert.id, action)}
                          className="justify-start text-left h-auto py-2 px-3 bg-white/50 hover:bg-white/80 border-white/30 text-gray-700 hover:text-gray-900"
                        >
                          <div className="text-xs">
                            <div className="font-medium">{action}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <div className="text-xs text-gray-600">
                      Context: {alert.businessContext}
                    </div>
                    <Badge variant="outline" className="bg-white/50 text-gray-700 border-white/30">
                      AI-Generated
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
