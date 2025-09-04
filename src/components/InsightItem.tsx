'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, TrendingUp, Check, X } from 'lucide-react';
import { Insight } from '@/data/mock';

interface InsightItemProps {
  insight: Insight;
  onApply?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function InsightItem({ insight, onApply, onDismiss }: InsightItemProps) {
  const getIcon = () => {
    switch (insight.severity) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'positive':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getBadgeColor = () => {
    switch (insight.severity) {
      case 'warning':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'positive':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <Card className="transition-all hover:shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Badge variant="outline" className={`${getBadgeColor()}`}>
              {getIcon()}
            </Badge>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {insight.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {insight.description}
            </p>
            
            {insight.suggestion && (
              <div className="bg-gray-50 rounded-md p-2 mb-2">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">Suggestion:</span> {insight.suggestion}
                </p>
                {insight.impact && (
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-medium">Impact:</span> {insight.impact}
                  </p>
                )}
              </div>
            )}
            
            {insight.actionable && (
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 px-2 border-myobLavender text-myobPurple hover:bg-myobMauve"
                  onClick={() => onApply?.(insight.id)}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs h-7 px-2 text-gray-500 hover:text-gray-700"
                  onClick={() => onDismiss?.(insight.id)}
                >
                  <X className="h-3 w-3 mr-1" />
                  Dismiss
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
