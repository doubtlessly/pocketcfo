'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot,
  TrendingUp,
  DollarSign,
  BarChart3,
  Shield,
  Calculator,
  FileText,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  AlertTriangle,
  Globe,
  Clock,
  Brain,
  Sparkles,
  PieChart,
  CreditCard,
  Building
} from 'lucide-react';

export default function AgentsPage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const agents = [
    {
      id: 'cashflow',
      name: 'Cashflow Agent',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      tagline: 'Survival & Liquidity',
      description: 'Real-time cash monitoring and runway projection to prevent cash crunch surprises',
      features: [
        'Real-time cash position monitoring (bank + accounting feeds)',
        'Burn rate tracking (monthly + trend analysis)',
        'Runway projection (base + seasonality + forecast scenarios)',
        '"What-if" levers (cutting spend, raising funds, delaying hires)'
      ],
      value: [
        'Keeps founders constantly aware of survival horizon',
        'Prevents cash crunch surprises',
        'Turns complex forecasting into simple, actionable signals'
      ],
      metrics: [
        { label: 'Cash Position', value: '$487K', trend: 'down' },
        { label: 'Monthly Burn', value: '$89K', trend: 'stable' },
        { label: 'Runway', value: '5.5 months', trend: 'down' }
      ]
    },
    {
      id: 'growth',
      name: 'Growth Agent',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      tagline: 'Revenue & Customer Traction',
      description: 'Track revenue growth sustainability and customer acquisition health',
      features: [
        'MRR/ARR and revenue trend tracking',
        'New bookings vs churn vs net revenue retention',
        'Customer acquisition funnel health (pipeline to revenue conversion)',
        'Customer concentration and dependency alerts'
      ],
      value: [
        'Shows whether top-line growth is sustainable',
        'Highlights risks of revenue dependence on a few customers',
        'Helps align spend with growth opportunities'
      ],
      metrics: [
        { label: 'MRR', value: '$245K', trend: 'up' },
        { label: 'Growth Rate', value: '15.2%', trend: 'up' },
        { label: 'Churn Rate', value: '3.1%', trend: 'down' }
      ]
    },
    {
      id: 'profitability',
      name: 'Profitability Agent',
      icon: PieChart,
      color: 'from-purple-500 to-indigo-600',
      tagline: 'Efficiency & Margins',
      description: 'Ensure efficient growth with detailed unit economics and margin analysis',
      features: [
        'Gross margin and operating margin analysis',
        'CAC, LTV, and LTV:CAC ratio tracking',
        'Unit economics by product or customer segment',
        'Expense structure analysis (R&D, Marketing, G&A vs revenue)'
      ],
      value: [
        'Ensures growth is efficient, not reckless',
        'Makes profitability levers visible (costs vs pricing vs scale)',
        'Builds investor confidence by proving economics work'
      ],
      metrics: [
        { label: 'Gross Margin', value: '78%', trend: 'up' },
        { label: 'LTV:CAC', value: '4.2x', trend: 'up' },
        { label: 'Operating Margin', value: '12%', trend: 'stable' }
      ]
    },
    {
      id: 'risk',
      name: 'Risk Agent',
      icon: Shield,
      color: 'from-orange-500 to-amber-600',
      tagline: 'Compliance & Resilience',
      description: 'Reduce blind spots and strengthen resilience against financial risks',
      features: [
        'Compliance monitoring (tax, payroll, contributions, GST/VAT)',
        'Accounts receivable/payable risk (late payers, cash gaps)',
        'Customer or supplier concentration exposure',
        'External risk signals (FX, interest rates, regulatory changes)'
      ],
      value: [
        'Reduces blind spots and surprises',
        'Translates compliance tasks into financial impact',
        'Strengthens resilience by surfacing dependency risks'
      ],
      metrics: [
        { label: 'Risk Score', value: 'Low', trend: 'stable' },
        { label: 'Compliance', value: '98%', trend: 'up' },
        { label: 'Overdue AR', value: '$12K', trend: 'down' }
      ]
    },
    {
      id: 'scenario',
      name: 'Scenario Agent',
      icon: Calculator,
      color: 'from-rose-500 to-pink-600',
      tagline: 'Planning & Forecasting',
      description: 'Strategic CFO-level planning with comprehensive scenario modeling',
      features: [
        'Budget vs Actual variance analysis',
        '12–24 month forecasting with best/base/worst case',
        'Simulation of strategic moves (hiring, fundraising, pricing changes)',
        'Fundraising readiness analysis (valuation, dilution, runway extension)'
      ],
      value: [
        'Equips founders with a strategic CFO lens for planning',
        'Helps decide "grow vs conserve" in uncertain markets',
        'Makes fundraising conversations data-driven and confident'
      ],
      metrics: [
        { label: 'Budget Accuracy', value: '94%', trend: 'up' },
        { label: 'Best Case ARR', value: '$3.2M', trend: 'up' },
        { label: 'Fundraise Ready', value: 'Q2 2024', trend: 'stable' }
      ]
    },
    {
      id: 'investor',
      name: 'Investor Agent',
      icon: FileText,
      color: 'from-violet-500 to-purple-600',
      tagline: 'Reporting & Storytelling',
      description: 'Auto-generate professional investor updates and board communications',
      features: [
        'Auto-generated investor updates and board packs',
        'Visualized KPIs and benchmarks vs peers',
        'Narrative generation (growth story, efficiency story, risk story)',
        'Custom report tailoring (conservative vs aggressive messaging)'
      ],
      value: [
        'Saves hours of founder time on reporting',
        'Builds trust and transparency with investors',
        'Positions the business with "CFO-level polish" in communications'
      ],
      metrics: [
        { label: 'Reports Generated', value: '24', trend: 'up' },
        { label: 'Time Saved', value: '12hrs/month', trend: 'up' },
        { label: 'Investor NPS', value: '9.2/10', trend: 'up' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
                <p className="text-gray-600">
                  Your modular virtual CFO team powered by AI
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 px-3 py-1 rounded-full shadow-lg">
                <Brain className="h-4 w-4 mr-1" />
                <span className="font-medium text-sm">6 AI Agents</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-12 text-center animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Your AI CFO Team
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Six specialized AI agents working together to give you world-class financial intelligence, 
              monitoring, and strategic guidance 24/7.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Proactive alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Strategic insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Automated reporting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            const isActive = activeAgent === agent.id;
            
            return (
              <Card 
                key={agent.id}
                className={`card-modern card-hover cursor-pointer transition-all duration-300 ${
                  isActive ? 'ring-2 ring-purple-500 shadow-xl scale-105' : ''
                }`}
                onClick={() => setActiveAgent(isActive ? null : agent.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 bg-gradient-to-br ${agent.color} rounded-xl shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {agent.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500 font-medium">
                          {agent.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      isActive ? 'rotate-90' : ''
                    }`} />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {agent.description}
                  </p>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {agent.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {isActive && (
                    <div className="space-y-4 animate-fade-in pt-4 border-t border-gray-100">
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Features</h4>
                        <ul className="space-y-1">
                          {agent.features.map((feature, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Value */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Value</h4>
                        <ul className="space-y-1">
                          {agent.value.map((item, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                              <Zap className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Activate {agent.name}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Why AI CFO Agents?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your financial operations from reactive to proactive with intelligent automation and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: '24/7 Monitoring',
                description: 'Never miss critical financial changes or opportunities'
              },
              {
                icon: Brain,
                title: 'Smart Insights',
                description: 'AI-powered analysis that learns from your business patterns'
              },
              {
                icon: Target,
                title: 'Proactive Alerts',
                description: 'Get warned about issues before they become problems'
              },
              {
                icon: Building,
                title: 'Scale Ready',
                description: 'Grow your financial operations without adding headcount'
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="card-modern text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Deploy Your AI CFO Team?
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Start with one agent or activate the full suite. Each agent works independently 
            but becomes more powerful when working together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3">
              <Sparkles className="h-4 w-4 mr-2" />
              Activate All Agents
            </Button>
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3">
              <Bot className="h-4 w-4 mr-2" />
              Start with One Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
