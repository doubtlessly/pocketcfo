'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ConversationList } from '@/components/ConversationList';
import { ChatMessage } from '@/components/ChatMessage';
import { 
  Send, 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  Target, 
  AlertTriangle,
  Zap,
  Brain,
  Calculator
} from 'lucide-react';
import { sampleConversations, ChatMessage as ChatMessageType } from '@/data/mock';

export default function AskPage() {
  const [conversations, setConversations] = useState(sampleConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    sampleConversations[0]?.id || null
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  // Common CFO question categories
  const questionCategories = [
    {
      id: 'cash-runway',
      title: 'Cash & Runway',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      questions: [
        'How long is our current runway?',
        'What if we hire 2 more engineers?',
        'Impact of reducing marketing spend by 20%?',
        'Break-even analysis for next quarter',
      ]
    },
    {
      id: 'fundraising',
      title: 'Fundraising Strategy',
      icon: Target,
      color: 'from-purple-500 to-indigo-600',
      questions: [
        'When should we start fundraising?',
        'How much should we raise?',
        'Impact of delaying Series B by 6 months?',
        'Optimal dilution vs runway trade-off',
      ]
    },
    {
      id: 'growth',
      title: 'Growth & Revenue',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      questions: [
        'ROI of increasing marketing spend?',
        'Revenue projections with new pricing?',
        'Customer acquisition cost optimization',
        'Seasonal revenue impact analysis',
      ]
    },
    {
      id: 'costs',
      title: 'Cost Optimization',
      icon: Calculator,
      color: 'from-orange-500 to-amber-600',
      questions: [
        'Which costs should we cut first?',
        'Office vs remote work cost analysis',
        'Software subscription audit insights',
        'Headcount efficiency by department',
      ]
    },
    {
      id: 'scenarios',
      title: 'Scenario Planning',
      icon: Brain,
      color: 'from-rose-500 to-pink-600',
      questions: [
        'Best case vs worst case scenarios',
        'Economic downturn contingency plan',
        'Product launch financial impact',
        'Geographic expansion cost analysis',
      ]
    },
    {
      id: 'risks',
      title: 'Risk Management',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-600',
      questions: [
        'Key financial risks to monitor?',
        'Cash flow stress testing',
        'Customer concentration risk analysis',
        'Currency exposure impact',
      ]
    }
  ];

  // Smart suggestions for the compose input
  const smartSuggestions = [
    'Runway if I hire 2 engineers?',
    'What if marketing spend −20%?',
    'When should I fundraise?',
    'Impact of delaying Series B?',
    'Break-even analysis for Q2',
    'Optimize burn rate strategies',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  // Handle query parameter from dashboard search
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        setInputValue(query);
        // Auto-create conversation if none exists
        if (!activeConversationId) {
          handleNewConversation();
        }
      }
    }
  }, [activeConversationId]);

  const handleNewConversation = () => {
    const newConversationId = `new-${Date.now()}`;
    const newConversation = {
      id: newConversationId,
      title: 'New Conversation',
      lastMessage: '',
      timestamp: new Date().toISOString(),
      messages: [],
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversationId);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeConversationId) return;

    setIsLoading(true);
    
    // Create user message
    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    // Update conversation with user message
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        const updatedMessages = [...conv.messages, userMessage];
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: inputValue,
          timestamp: new Date().toISOString(),
          title: conv.title === 'New Conversation' ? inputValue.slice(0, 50) + '...' : conv.title,
        };
      }
      return conv;
    }));

    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: `Based on your question about "${inputValue}", here's my analysis:\n\n**Financial Impact:**\n- This would affect your runway and cash position\n- Consider the timing and strategic implications\n- Alternative scenarios could provide different outcomes\n\n**Recommendations:**\n- Review your current burn rate trends\n- Consider phased implementation\n- Monitor key metrics closely\n\nWould you like me to create a detailed scenario analysis for this?`,
        timestamp: new Date().toISOString(),
        kpiDeltas: [
          { name: 'Runway', from: 12.5, to: 10.8 },
          { name: 'Monthly Burn', from: 145000, to: 162000 },
        ],
        actions: ['Create Scenario from this', 'Export as Investor Update'],
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, aiResponse],
            lastMessage: 'Based on your question...',
          };
        }
        return conv;
      }));

      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ask CFO AI</h1>
                <p className="text-gray-600">
                  Get instant financial insights and strategic guidance powered by AI
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 px-3 py-1 rounded-full shadow-lg">
                <Sparkles className="h-4 w-4 mr-1" />
                <span className="font-medium text-sm">AI Powered</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-feature text-gray-900">Quick Start</h2>
                <p className="text-sm text-gray-600">Popular CFO questions to get you started</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {questionCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="card-modern card-hover group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.questions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleSuggestionClick(question)}
                          className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 text-sm border border-transparent hover:border-purple-200 group-hover:bg-purple-50"
                        >
                          "{question}"
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px]">
            {/* Conversation List */}
            <div className="lg:col-span-1 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200 bg-white">
                <Button
                  onClick={handleNewConversation}
                  className="w-full btn-modern bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(600px-80px)]">
                <ConversationList
                  conversations={conversations}
                  activeConversationId={activeConversationId || undefined}
                  onSelectConversation={setActiveConversationId}
                  onNewConversation={handleNewConversation}
                />
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {activeConversation.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          AI Financial Assistant
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {activeConversation.messages.length > 0 ? (
                      <div className="space-y-6 max-w-4xl mx-auto">
                        {activeConversation.messages.map((message) => (
                          <ChatMessage
                            key={message.id}
                            message={message}
                            onCreateScenario={() => console.log('Create scenario')}
                            onExportReport={() => console.log('Export report')}
                          />
                        ))}
                        {isLoading && (
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Brain className="h-5 w-5 text-white animate-pulse" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-lg flex-1 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-medium text-purple-700">AI is analyzing...</span>
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">Reviewing your financial data and market conditions...</p>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center h-full">
                        <div className="text-center max-w-lg">
                          <div className="relative mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                              <Brain className="h-10 w-10 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Welcome to your AI CFO
                          </h3>
                          <p className="text-gray-600 mb-8">
                            Ask me anything about your finances, from cash flow analysis to strategic planning. I'm connected to your business data for accurate insights.
                          </p>
                          
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-gray-700">Try asking:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {smartSuggestions.slice(0, 4).map((suggestion, index) => (
                                <button
                                  key={index}
                                  className="p-3 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left text-sm text-gray-700 hover:text-purple-700"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Chat Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex space-x-3">
                        <div className="flex-1 relative">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about cash flow, growth strategies, scenarios, or any financial question..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading}
                            className="pr-12 h-12 rounded-xl border-gray-300 focus:border-purple-400 focus:ring-purple-400 text-base"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                              Enter
                            </kbd>
                          </div>
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          className="h-12 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        AI responses are generated based on your business data and may not always be accurate. Always verify important financial decisions.
                      </p>
                    </div>
                  </div>
              </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center max-w-md">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Brain className="h-8 w-8 text-white opacity-80" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Choose a conversation from the sidebar or start a new one to begin your financial analysis.
                    </p>
                    <Button
                      onClick={handleNewConversation}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start New Chat
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
