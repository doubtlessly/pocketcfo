'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ReportPreview } from '@/components/ReportPreview';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Calendar, 
  Settings, 
  Eye, 
  Sparkles,
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { scenarios } from '@/data/mock';

const WIZARD_STEPS = [
  { id: 'setup', title: 'Setup', icon: Settings },
  { id: 'content', title: 'Content', icon: FileText },
  { id: 'preview', title: 'Preview', icon: Eye },
];

export default function ReportsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [reportData, setReportData] = useState({
    dateRange: 'Q4 2024',
    scenario: 'baseline',
    reportContent: {
      highlights: `• Revenue growth accelerated to 15.3% month-over-month
• Successfully launched new product features driving user engagement
• Reduced customer acquisition cost by 12% through optimized marketing
• Signed 3 enterprise deals worth $50k ARR each`,
      lowlights: `• Monthly burn increased due to accelerated hiring in engineering
• Marketing spend exceeded budget by 18% this quarter
• Delayed product milestone by 3 weeks due to technical challenges
• Churn rate increased slightly to 3.2% from customer segment analysis`,
      kpis: `• Monthly Recurring Revenue: $245k (+15.3% MoM)
• Customer Acquisition Cost: $892 (-12% MoM)  
• Customer Lifetime Value: $18,500 (+8% MoM)
• Gross Revenue Retention: 94%
• Net Revenue Retention: 118%`,
      nextSteps: `• Complete Series B fundraising process by Q1 2025
• Launch enterprise sales team with 2 new hires
• Implement new customer success processes to reduce churn
• Expand product features based on enterprise customer feedback
• Optimize marketing spend allocation across channels`,
      asks: `• Strategic introductions to enterprise prospects
• Feedback on product roadmap and market fit
• Connections to potential Series B lead investors
• Advisory support for international expansion planning
• Technical expertise for scaling infrastructure`
    }
  });

  const currentStepData = WIZARD_STEPS[currentStep];
  const selectedScenario = scenarios.find(s => s.id === reportData.scenario);

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateReportData = (updates: Partial<typeof reportData>) => {
    setReportData(prev => ({ ...prev, ...updates }));
  };

  const updateReportContent = (field: string, value: string) => {
    setReportData(prev => ({
      ...prev,
      reportContent: {
        ...prev.reportContent,
        [field]: value
      }
    }));
  };

  const generateAutoContent = () => {
    // In a real app, this would use AI to generate content based on actual data
    console.log('Generating auto content...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Investor Update Generator 📊
          </h1>
          <p className="text-gray-600">
            Create professional investor updates in under 60 seconds
          </p>
        </div>

        {/* Wizard Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {WIZARD_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-myobPurple text-white' 
                        : isCompleted 
                          ? 'bg-myobMauve text-myobPurple'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                    {isCompleted && <span className="text-xs">✓</span>}
                  </div>
                  {index < WIZARD_STEPS.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Report Setup</span>
                </CardTitle>
                <p className="text-gray-600">Configure the basic parameters for your investor update</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Reporting Period</Label>
                    <Select 
                      value={reportData.dateRange} 
                      onValueChange={(value) => updateReportData({ dateRange: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                        <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                        <SelectItem value="November 2024">November 2024</SelectItem>
                        <SelectItem value="December 2024">December 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scenario">Scenario</Label>
                    <Select 
                      value={reportData.scenario} 
                      onValueChange={(value) => updateReportData({ scenario: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarios.map((scenario) => (
                          <SelectItem key={scenario.id} value={scenario.id}>
                            <div className="flex items-center space-x-2">
                              <span>{scenario.name}</span>
                              {scenario.isBaseline && (
                                <Badge variant="outline" className="text-xs">Base</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedScenario && (
                  <div className="p-4 bg-myobMauve rounded-lg">
                    <h4 className="font-medium text-myobPurple mb-2">Selected Scenario</h4>
                    <p className="text-sm text-gray-700 mb-2">{selectedScenario.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        Runway: {selectedScenario.results.runwayChange > 0 ? '+' : ''}
                        {selectedScenario.results.runwayChange.toFixed(1)}mo
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Break-even: {selectedScenario.results.breakEvenMonth}mo
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Report Content</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAutoContent}
                    className="border-myobLavender text-myobPurple hover:bg-myobMauve"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Auto-Generate
                  </Button>
                </CardTitle>
                <p className="text-gray-600">
                  Customize the content sections for your investor update
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="highlights" className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span>Highlights</span>
                    </Label>
                    <Textarea
                      id="highlights"
                      value={reportData.reportContent.highlights}
                      onChange={(e) => updateReportContent('highlights', e.target.value)}
                      placeholder="Key wins and positive developments..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lowlights" className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span>Lowlights</span>
                    </Label>
                    <Textarea
                      id="lowlights"
                      value={reportData.reportContent.lowlights}
                      onChange={(e) => updateReportContent('lowlights', e.target.value)}
                      placeholder="Challenges and areas for improvement..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nextSteps" className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>Next Steps</span>
                    </Label>
                    <Textarea
                      id="nextSteps"
                      value={reportData.reportContent.nextSteps}
                      onChange={(e) => updateReportContent('nextSteps', e.target.value)}
                      placeholder="Planned actions and strategic initiatives..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="asks" className="flex items-center space-x-2">
                      <span>🤝</span>
                      <span>Asks</span>
                    </Label>
                    <Textarea
                      id="asks"
                      value={reportData.reportContent.asks}
                      onChange={(e) => updateReportContent('asks', e.target.value)}
                      placeholder="How investors can help and support..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">AI Content Assistant</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        Click &quot;Auto-Generate&quot; to populate sections with AI-generated content based on your actual financial data and recent performance.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <ReportPreview
              dateRange={reportData.dateRange}
              scenario={selectedScenario?.name || 'Base Case'}
              reportContent={reportData.reportContent}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-myobLavender text-myobPurple hover:bg-myobMauve"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < WIZARD_STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-myobPurple hover:opacity-90"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-myobPurple hover:opacity-90">
                <FileText className="h-4 w-4 mr-2" />
                Finalize Report
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
