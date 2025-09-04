'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Bot, TrendingUp, FileText, ArrowUpDown } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/data/mock';

interface ChatMessageProps {
  message: ChatMessageType;
  onCreateScenario?: () => void;
  onExportReport?: () => void;
}

export function ChatMessage({ message, onCreateScenario, onExportReport }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={isUser ? 'bg-gray-100' : 'bg-myobLavender text-myobPurple'}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 space-y-2 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block max-w-[85%] ${isUser ? 'ml-auto' : ''}`}>
          <Card className={`${
            isUser 
              ? 'bg-myobPurple text-white border-myobPurple' 
              : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-3">
              <div className="prose prose-sm max-w-none">
                {message.content.split('\n').map((line, index) => {
                  if (line.startsWith('**') && line.endsWith(':**')) {
                    return (
                      <h4 key={index} className={`font-semibold mb-2 ${isUser ? 'text-white' : 'text-gray-900'}`}>
                        {line.slice(2, -3)}
                      </h4>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <p key={index} className={`mb-1 ${isUser ? 'text-white/90' : 'text-gray-700'}`}>
                        • {line.slice(2)}
                      </p>
                    );
                  }
                  return line ? (
                    <p key={index} className={`mb-2 ${isUser ? 'text-white/90' : 'text-gray-700'}`}>
                      {line}
                    </p>
                  ) : (
                    <br key={index} />
                  );
                })}
              </div>

              {/* KPI Deltas */}
              {message.kpiDeltas && message.kpiDeltas.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h5 className="text-sm font-medium text-gray-900">Impact Analysis:</h5>
                  {message.kpiDeltas.map((delta, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2">
                      <span className="text-sm font-medium">{delta.name}:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{delta.from}</span>
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        <span className="text-sm font-bold text-myobPurple">{delta.to}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs border-myobLavender text-myobPurple hover:bg-myobMauve"
                      onClick={() => {
                        if (action.includes('Scenario')) {
                          onCreateScenario?.();
                        } else if (action.includes('Export')) {
                          onExportReport?.();
                        }
                      }}
                    >
                      {action.includes('Scenario') && <TrendingUp className="h-3 w-3 mr-1" />}
                      {action.includes('Export') && <FileText className="h-3 w-3 mr-1" />}
                      {action}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className={`text-xs text-gray-500 ${isUser ? 'text-right' : ''}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
