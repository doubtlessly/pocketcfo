'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Building2, 
  MapPin, 
  Users, 
  DollarSign,
  CheckCircle,
  Zap,
  TrendingUp,
  AlertTriangle,
  Bot,
  BarChart3,
  Shield,
  Calculator,
  FileText,
  PieChart
} from 'lucide-react';
import { BusinessProfile, availableIndustries, IndustryConfig } from '@/data/industry-configs';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    id: '',
    businessName: '',
    industry: '',
    companySize: '',
    location: '',
    annualRevenue: '',
    businessType: '',
    primaryChallenges: [],
    setupComplete: false
  });

  const [selectedIndustry, setSelectedIndustry] = useState<IndustryConfig | null>(null);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const updateProfile = (updates: Partial<BusinessProfile>) => {
    setBusinessProfile(prev => ({ ...prev, ...updates }));
  };

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to MYOB Pocket CFO',
      description: 'Let\'s set up your AI-powered financial assistant',
      component: <WelcomeStep onNext={() => setCurrentStep(1)} />
    },
    {
      id: 'business-basics',
      title: 'Tell us about your business',
      description: 'Basic information to personalize your experience',
      component: (
        <BusinessBasicsStep 
          profile={businessProfile}
          onUpdate={updateProfile}
          onNext={() => setCurrentStep(2)}
          onBack={() => setCurrentStep(0)}
        />
      )
    },
    {
      id: 'industry-selection',
      title: 'What industry are you in?',
      description: 'We\'ll tailor the platform to your specific needs',
      component: (
        <IndustrySelectionStep
          profile={businessProfile}
          onUpdate={updateProfile}
          onIndustrySelect={setSelectedIndustry}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )
    },
    {
      id: 'business-details',
      title: 'Business specifics',
      description: 'Help us understand your business better',
      component: (
        <BusinessDetailsStep
          profile={businessProfile}
          onUpdate={updateProfile}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )
    },
    {
      id: 'challenges',
      title: 'What are your main challenges?',
      description: 'We\'ll prioritize features to help you most',
      component: (
        <ChallengesStep
          profile={businessProfile}
          industry={selectedIndustry}
          onUpdate={updateProfile}
          onNext={() => setCurrentStep(5)}
          onBack={() => setCurrentStep(3)}
        />
      )
    },
    {
      id: 'agent-selection',
      title: 'Select your AI agents',
      description: 'Choose the AI agents that best fit your business needs',
      component: (
        <AgentSelectionStep
          profile={businessProfile}
          industry={selectedIndustry}
          selectedAgents={selectedAgents}
          onAgentToggle={(agentId: string) => {
            setSelectedAgents(prev => 
              prev.includes(agentId) 
                ? prev.filter(id => id !== agentId)
                : [...prev, agentId]
            );
          }}
          onNext={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
        />
      )
    },
    {
      id: 'completion',
      title: 'You\'re all set!',
      description: 'Welcome to your AI-powered financial command center',
      component: (
        <CompletionStep
          profile={businessProfile}
          industry={selectedIndustry}
          selectedAgents={selectedAgents}
        />
      )
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Setup Your AI CFO</h1>
                <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-purple-700 mb-1">{Math.round(progress)}% Complete</div>
              <Progress value={progress} className="w-48" />
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-lg text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          {steps[currentStep].component}
        </div>
      </div>
    </div>
  );
}

// Individual Step Components

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <Card className="card-modern max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30 animate-float">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to the future of financial management
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Get personalized insights, automated monitoring, and strategic guidance tailored 
          specifically to your industry and business needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-purple-50 rounded-xl">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Smart Analytics</h4>
            <p className="text-sm text-gray-600">AI-powered insights for your industry</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <AlertTriangle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Proactive Alerts</h4>
            <p className="text-sm text-gray-600">Early warnings and opportunities</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900 mb-1">Automated Tasks</h4>
            <p className="text-sm text-gray-600">Streamlined financial operations</p>
          </div>
        </div>

        <Button 
          onClick={onNext}
          className="btn-modern btn-primary-modern px-8 py-3 text-lg"
        >
          Let's Get Started
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function BusinessBasicsStep({ 
  profile, 
  onUpdate, 
  onNext, 
  onBack 
}: { 
  profile: BusinessProfile;
  onUpdate: (updates: Partial<BusinessProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canProceed = profile.businessName.length > 0;

  return (
    <Card className="card-modern max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="businessName" className="text-base font-semibold text-gray-900">
              What&apos;s your business name?
            </Label>
            <Input
              id="businessName"
              value={profile.businessName}
              onChange={(e) => onUpdate({ businessName: e.target.value })}
              placeholder="Enter your business name"
              className="mt-2 text-lg p-4 rounded-xl focus-visible-modern"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-base font-semibold text-gray-900">
              Where are you located?
            </Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => onUpdate({ location: e.target.value })}
                placeholder="City, Country"
                className="pl-12 text-lg p-4 rounded-xl focus-visible-modern"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="btn-modern btn-secondary-modern"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={!canProceed}
              className="btn-modern btn-primary-modern"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IndustrySelectionStep({ 
  profile, 
  onUpdate, 
  onIndustrySelect,
  onNext, 
  onBack 
}: { 
  profile: BusinessProfile;
  onUpdate: (updates: Partial<BusinessProfile>) => void;
  onIndustrySelect: (industry: IndustryConfig) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const handleIndustrySelect = (industryId: string) => {
    const industry = availableIndustries.find(ind => ind.id === industryId);
    if (industry) {
      onUpdate({ industry: industryId });
      onIndustrySelect(industry.config);
    }
  };

  const canProceed = profile.industry.length > 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableIndustries.map((industry) => (
          <Card 
            key={industry.id}
            className={`card-modern card-hover cursor-pointer transition-all duration-200 ${
              profile.industry === industry.id 
                ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-100' 
                : ''
            }`}
            onClick={() => handleIndustrySelect(industry.id)}
          >
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {industry.description}
                </p>
                <div className="space-y-1">
                  {industry.examples.map((example, index) => (
                    <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                      {example}
                    </Badge>
                  ))}
                </div>
                {profile.industry === industry.id && (
                  <div className="mt-4">
                    <CheckCircle className="h-6 w-6 text-purple-600 mx-auto" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-modern max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="btn-modern btn-secondary-modern"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={!canProceed}
              className="btn-modern btn-primary-modern"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BusinessDetailsStep({ 
  profile, 
  onUpdate, 
  onNext, 
  onBack 
}: { 
  profile: BusinessProfile;
  onUpdate: (updates: Partial<BusinessProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const companySizes = [
    { id: 'solo', label: 'Solo Founder', icon: Users },
    { id: 'small', label: '2-10 employees', icon: Users },
    { id: 'medium', label: '11-50 employees', icon: Users },
    { id: 'large', label: '50+ employees', icon: Building2 }
  ];

  const revenueRanges = [
    { id: 'pre-revenue', label: 'Pre-revenue' },
    { id: '0-100k', label: '$0 - $100k' },
    { id: '100k-500k', label: '$100k - $500k' },
    { id: '500k-1m', label: '$500k - $1M' },
    { id: '1m-5m', label: '$1M - $5M' },
    { id: '5m+', label: '$5M+' }
  ];

  const canProceed = profile.companySize && profile.annualRevenue;

  return (
    <Card className="card-modern max-w-2xl mx-auto">
      <CardContent className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Size</h3>
          <div className="grid grid-cols-2 gap-4">
            {companySizes.map((size) => {
              const IconComponent = size.icon;
              return (
                <button
                  key={size.id}
                  onClick={() => onUpdate({ companySize: size.id })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    profile.companySize === size.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <IconComponent className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{size.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Revenue</h3>
          <div className="grid grid-cols-2 gap-3">
            {revenueRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => onUpdate({ annualRevenue: range.id })}
                className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm ${
                  profile.annualRevenue === range.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="btn-modern btn-secondary-modern"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="btn-modern btn-primary-modern"
          >
            Continue
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ChallengesStep({ 
  profile, 
  industry,
  onUpdate, 
  onNext, 
  onBack 
}: { 
  profile: BusinessProfile;
  industry: IndustryConfig | null;
  onUpdate: (updates: Partial<BusinessProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const challenges = industry?.challenges || [
    'Cash flow management',
    'Revenue forecasting', 
    'Cost control',
    'Tax compliance',
    'Financial planning'
  ];

  const toggleChallenge = (challenge: string) => {
    const current = profile.primaryChallenges || [];
    const updated = current.includes(challenge)
      ? current.filter(c => c !== challenge)
      : [...current, challenge];
    onUpdate({ primaryChallenges: updated });
  };

  return (
    <Card className="card-modern max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select your main challenges (choose any that apply)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {challenges.map((challenge) => {
                const isSelected = profile.primaryChallenges?.includes(challenge);
                return (
                  <button
                    key={challenge}
                    onClick={() => toggleChallenge(challenge)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className="font-medium">{challenge}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="btn-modern btn-secondary-modern"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={onNext}
              className="btn-modern btn-primary-modern"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AgentSelectionStep({ 
  profile, 
  industry,
  selectedAgents,
  onAgentToggle,
  onNext, 
  onBack 
}: { 
  profile: BusinessProfile;
  industry: IndustryConfig | null;
  selectedAgents: string[];
  onAgentToggle: (agentId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const agents = [
    {
      id: 'cashflow',
      name: 'Cashflow Agent',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      tagline: 'Survival & Liquidity',
      description: 'Real-time cash monitoring and runway projection to prevent cash crunch surprises',
      value: 'Keeps you constantly aware of survival horizon and prevents cash surprises',
      recommended: true
    },
    {
      id: 'growth',
      name: 'Growth Agent',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      tagline: 'Revenue & Customer Traction',
      description: 'Track revenue growth sustainability and customer acquisition health',
      value: 'Shows whether top-line growth is sustainable and highlights customer risks',
      recommended: industry?.name.toLowerCase().includes('tourism') || profile.primaryChallenges.includes('Revenue growth')
    },
    {
      id: 'profitability',
      name: 'Profitability Agent',
      icon: PieChart,
      color: 'from-purple-500 to-indigo-600',
      tagline: 'Efficiency & Margins',
      description: 'Ensure efficient growth with detailed unit economics and margin analysis',
      value: 'Ensures growth is efficient, not reckless, and builds investor confidence',
      recommended: profile.primaryChallenges.includes('Profitability analysis')
    },
    {
      id: 'risk',
      name: 'Risk Agent',
      icon: Shield,
      color: 'from-orange-500 to-amber-600',
      tagline: 'Compliance & Resilience',
      description: 'Reduce blind spots and strengthen resilience against financial risks',
      value: 'Reduces compliance surprises and strengthens business resilience',
      recommended: profile.primaryChallenges.includes('Compliance management')
    },
    {
      id: 'scenario',
      name: 'Scenario Agent',
      icon: Calculator,
      color: 'from-rose-500 to-pink-600',
      tagline: 'Planning & Forecasting',
      description: 'Strategic CFO-level planning with comprehensive scenario modeling',
      value: 'Equips you with strategic CFO lens and makes fundraising data-driven',
      recommended: profile.primaryChallenges.includes('Financial planning')
    },
    {
      id: 'investor',
      name: 'Investor Agent',
      icon: FileText,
      color: 'from-violet-500 to-purple-600',
      tagline: 'Reporting & Storytelling',
      description: 'Auto-generate professional investor updates and board communications',
      value: 'Saves hours on reporting and builds trust with CFO-level polish',
      recommended: profile.primaryChallenges.includes('Investor reporting')
    }
  ];

  // Auto-select recommended agents on first load
  React.useEffect(() => {
    if (selectedAgents.length === 0) {
      const recommendedIds = agents.filter(agent => agent.recommended).map(agent => agent.id);
      recommendedIds.forEach(id => onAgentToggle(id));
    }
  }, []);

  return (
    <div className="space-y-8">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-center">
            Choose Your AI CFO Team
          </CardTitle>
          <p className="text-center text-gray-600">
            Select the agents that best match your business needs. You can always add more later.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              const isSelected = selectedAgents.includes(agent.id);
              
              return (
                <div 
                  key={agent.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg scale-105' 
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                  onClick={() => onAgentToggle(agent.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-gradient-to-br ${agent.color} rounded-lg shadow-md`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{agent.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{agent.tagline}</p>
                      </div>
                    </div>
                    {agent.recommended && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{agent.description}</p>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg mb-3">
                    <p className="text-xs text-purple-700 font-medium flex items-start">
                      <Zap className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      {agent.value}
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      isSelected 
                        ? 'bg-purple-500 border-purple-500' 
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Your AI CFO Team</h4>
            <p className="text-sm text-blue-800 leading-relaxed mb-3">
              {selectedAgents.length === 0 
                ? 'Select at least one agent to get started. Each agent works independently but becomes more powerful when working together.'
                : `You've selected ${selectedAgents.length} agent${selectedAgents.length !== 1 ? 's' : ''}. They'll work together to provide comprehensive financial intelligence for your business.`
              }
            </p>
            {selectedAgents.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedAgents.map(agentId => {
                  const agent = agents.find(a => a.id === agentId);
                  return agent ? (
                    <Badge key={agentId} className="bg-purple-200 text-purple-800 text-xs">
                      {agent.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Card className="card-modern max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="btn-modern btn-secondary-modern"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={selectedAgents.length === 0}
              className="btn-modern btn-primary-modern"
            >
              Complete Setup
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompletionStep({ 
  profile, 
  industry,
  selectedAgents
}: { 
  profile: BusinessProfile;
  industry: IndustryConfig | null;
  selectedAgents: string[];
}) {
  const agentNames = {
    'cashflow': 'Cashflow Agent',
    'growth': 'Growth Agent', 
    'profitability': 'Profitability Agent',
    'risk': 'Risk Agent',
    'scenario': 'Scenario Agent',
    'investor': 'Investor Agent'
  };

  return (
    <Card className="card-modern max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to your AI CFO, {profile.businessName}!
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your AI CFO team is ready to provide {industry?.name.toLowerCase()} insights, 
          proactive monitoring, and strategic guidance tailored to your business.
        </p>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Bot className="h-6 w-6 text-purple-600" />
            <h4 className="font-semibold text-purple-900">Your Active AI Agents</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedAgents.map(agentId => (
              <Badge key={agentId} className="bg-purple-200 text-purple-800 text-sm px-3 py-1">
                {agentNames[agentId as keyof typeof agentNames]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-emerald-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Personalized for {industry?.name}</h4>
            <p className="text-sm text-gray-600">{selectedAgents.length} AI agents configured for your needs</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">🚨 Smart Monitoring Active</h4>
            <p className="text-sm text-gray-600">24/7 AI monitoring for {profile.primaryChallenges?.length || 0} key challenges</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            className="btn-modern btn-primary-modern w-full py-3"
            asChild
          >
            <Link href="/">
              Meet Your AI CFO Team
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="btn-modern btn-secondary-modern w-full"
            asChild
          >
            <Link href="/agents">
              View All Agents
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
