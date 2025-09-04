'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScenarioInputs } from '@/components/ScenarioInputs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Plus, 
  MoreHorizontal, 
  Copy, 
  Trash2, 
  Share, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Target
} from 'lucide-react';
import { scenarios as initialScenarios, Scenario } from '@/data/mock';

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);

  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);
  const baselineScenario = scenarios.find(s => s.isBaseline);

  // Generate projection data for selected scenarios
  const generateProjectionData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      const baseRunway = 1850000 - (index * 145000); // Base case
      
      return {
        month,
        baseline: Math.max(0, baseRunway),
        conservative: Math.max(0, baseRunway + (index * 25000)), // Better runway
        aggressive: Math.max(0, baseRunway - (index * 45000)), // Worse runway
      };
    });
  };

  const projectionData = generateProjectionData();

  const handleUpdateScenario = (updatedScenario: Scenario) => {
    setScenarios(prev => prev.map(s => 
      s.id === updatedScenario.id ? updatedScenario : s
    ));
  };

  const handleDuplicateScenario = (scenarioId: string) => {
    const scenarioToDuplicate = scenarios.find(s => s.id === scenarioId);
    if (scenarioToDuplicate) {
      const newScenario = {
        ...scenarioToDuplicate,
        id: `${scenarioId}-copy-${Date.now()}`,
        name: `${scenarioToDuplicate.name} (Copy)`,
        isBaseline: false,
      };
      setScenarios(prev => [...prev, newScenario]);
    }
  };

  const handleDeleteScenario = (scenarioId: string) => {
    setScenarios(prev => prev.filter(s => s.id !== scenarioId));
    if (selectedScenarioId === scenarioId) {
      setSelectedScenarioId(scenarios.find(s => s.id !== scenarioId)?.id || '');
    }
  };

  const handleCreateScenario = () => {
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name: 'New Scenario',
      description: 'Custom scenario',
      isBaseline: false,
      parameters: {
        headcount: [],
        marketingSpendChange: 0,
        pricingChange: 0,
        paymentTermsDays: 30,
      },
      results: {
        runwayChange: 0,
        breakEvenMonth: 18,
        cashflowImpact: 0,
      },
    };
    setScenarios(prev => [...prev, newScenario]);
    setSelectedScenarioId(newScenario.id);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Scenario Planner</h1>
                <p className="text-gray-600">
                  Model different business scenarios and their impact on runway
                </p>
              </div>
            </div>
            <Button
              onClick={handleCreateScenario}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Scenario
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Scenario List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Scenarios</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                        selectedScenarioId === scenario.id
                          ? 'border-myobPurple bg-myobMauve'
                          : 'border-transparent'
                      }`}
                      onClick={() => setSelectedScenarioId(scenario.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {scenario.name}
                            </h4>
                            {scenario.isBaseline && (
                              <Badge variant="outline" className="text-xs bg-myobMauve text-myobPurple border-myobLavender">
                                Base
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {scenario.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center text-xs">
                              {scenario.results.runwayChange > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                              ) : scenario.results.runwayChange < 0 ? (
                                <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                              ) : null}
                              <span className={
                                scenario.results.runwayChange > 0 
                                  ? 'text-green-600' 
                                  : scenario.results.runwayChange < 0 
                                    ? 'text-red-600' 
                                    : 'text-gray-500'
                              }>
                                {scenario.results.runwayChange > 0 ? '+' : ''}
                                {scenario.results.runwayChange.toFixed(1)}mo
                              </span>
                            </div>
                          </div>
                        </div>
                        {!scenario.isBaseline && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDuplicateScenario(scenario.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteScenario(scenario.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {selectedScenario && (
              <>
                {/* Scenario Inputs */}
                <ScenarioInputs
                  scenario={selectedScenario}
                  onUpdateScenario={handleUpdateScenario}
                />

                {/* Results Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Runway Impact */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Runway Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {selectedScenario.results.runwayChange > 0 ? '+' : ''}
                        {selectedScenario.results.runwayChange.toFixed(1)}
                        <span className="text-sm text-gray-500 ml-1">months</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        vs {baselineScenario?.name}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Break-even */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Break-even
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {selectedScenario.results.breakEvenMonth}
                        <span className="text-sm text-gray-500 ml-1">months</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Time to profitability
                      </p>
                    </CardContent>
                  </Card>

                  {/* Cashflow Impact */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Monthly Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {selectedScenario.results.cashflowImpact > 0 ? '+' : ''}
                        {formatCurrency(selectedScenario.results.cashflowImpact)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Monthly cashflow change
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Projection Chart */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        Cashflow Projection Comparison
                      </CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-myobLavender text-myobPurple hover:bg-myobMauve">
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Share Scenario</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Generate a shareable link for this scenario analysis.
                            </p>
                            <div className="p-3 bg-gray-50 rounded border">
                              <code className="text-sm">
                                https://pocket-cfo.myob.com/share/{selectedScenario.id}
                              </code>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                Copy Link
                              </Button>
                              <Button variant="outline" size="sm">
                                Email Link
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={projectionData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickFormatter={formatCurrency}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            formatter={(value: number, name: string) => [
                              formatCurrency(value), 
                              name.charAt(0).toUpperCase() + name.slice(1)
                            ]}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="baseline"
                            stroke="#7b14ef"
                            strokeWidth={2}
                            name="Base Case"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="conservative"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Conservative"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="aggressive"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Aggressive"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-2">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Save Scenario
                  </Button>
                  <Button variant="outline" className="border-myobLavender text-myobPurple hover:bg-myobMauve">
                    Export to Report
                  </Button>
                  <Button variant="outline">
                    Compare Scenarios
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
