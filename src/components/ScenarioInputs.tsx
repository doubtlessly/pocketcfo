'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Scenario } from '@/data/mock';

interface ScenarioInputsProps {
  scenario: Scenario;
  onUpdateScenario: (scenario: Scenario) => void;
}

export function ScenarioInputs({ scenario, onUpdateScenario }: ScenarioInputsProps) {
  const updateParameters = (updates: Partial<Scenario['parameters']>) => {
    onUpdateScenario({
      ...scenario,
      parameters: { ...scenario.parameters, ...updates },
    });
  };

  const addHeadcountItem = () => {
    const newHeadcount = [...(scenario.parameters.headcount || []), {
      role: 'New Role',
      salary: 100000,
      startMonth: 1,
    }];
    updateParameters({ headcount: newHeadcount });
  };

  const removeHeadcountItem = (index: number) => {
    const newHeadcount = scenario.parameters.headcount?.filter((_, i) => i !== index) || [];
    updateParameters({ headcount: newHeadcount });
  };

  const updateHeadcountItem = (index: number, updates: Partial<{ role: string; salary: number; startMonth: number; }>) => {
    const newHeadcount = scenario.parameters.headcount?.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ) || [];
    updateParameters({ headcount: newHeadcount });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <span>{scenario.name}</span>
          {scenario.isBaseline && (
            <Badge variant="outline" className="bg-myobMauve text-myobPurple border-myobLavender">
              Baseline
            </Badge>
          )}
        </CardTitle>
        <p className="text-sm text-gray-600">{scenario.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="headcount" className="space-y-3">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="headcount" className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Headcount</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="headcount" className="space-y-3 mt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Hiring Plan</h3>
              <Button
                size="sm"
                onClick={addHeadcountItem}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Role
              </Button>
            </div>
            
            <div className="space-y-2">
              {scenario.parameters.headcount?.map((item, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`role-${index}`} className="text-sm font-medium">
                          Role
                        </Label>
                        <Input
                          id={`role-${index}`}
                          value={item.role}
                          onChange={(e) => updateHeadcountItem(index, { role: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`salary-${index}`} className="text-sm font-medium">
                          Annual Salary
                        </Label>
                        <Input
                          id={`salary-${index}`}
                          type="number"
                          value={item.salary}
                          onChange={(e) => updateHeadcountItem(index, { salary: parseInt(e.target.value) || 0 })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`start-${index}`} className="text-sm font-medium">
                          Start Month
                        </Label>
                        <Input
                          id={`start-${index}`}
                          type="number"
                          min="1"
                          max="12"
                          value={item.startMonth}
                          onChange={(e) => updateHeadcountItem(index, { startMonth: parseInt(e.target.value) || 1 })}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHeadcountItem(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No headcount changes planned</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addHeadcountItem}
                    className="mt-2 border-myobLavender text-myobPurple hover:bg-myobMauve"
                  >
                    Add First Role
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-3 mt-3">
            <h3 className="text-base font-semibold">Revenue Adjustments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pricing-change" className="text-sm font-medium">
                  Pricing Change (%)
                </Label>
                <Input
                  id="pricing-change"
                  type="number"
                  value={scenario.parameters.pricingChange || 0}
                  onChange={(e) => updateParameters({ pricingChange: parseFloat(e.target.value) || 0 })}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Positive values increase pricing, negative values decrease
                </p>
              </div>
              <div>
                <Label htmlFor="payment-terms" className="text-sm font-medium">
                  Payment Terms (Days)
                </Label>
                <Input
                  id="payment-terms"
                  type="number"
                  value={scenario.parameters.paymentTermsDays || 30}
                  onChange={(e) => updateParameters({ paymentTermsDays: parseInt(e.target.value) || 30 })}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How long customers take to pay invoices
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-3 mt-3">
            <h3 className="text-base font-semibold">Expense Modifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marketing-change" className="text-sm font-medium">
                  Marketing Spend Change (%)
                </Label>
                <Input
                  id="marketing-change"
                  type="number"
                  value={scenario.parameters.marketingSpendChange || 0}
                  onChange={(e) => updateParameters({ marketingSpendChange: parseFloat(e.target.value) || 0 })}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Positive values increase spend, negative values decrease
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-3 mt-3">
            <h3 className="text-base font-semibold">Pricing Strategy</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Configure pricing changes and their timing to model revenue impact.
                  Consider customer reaction, competitive positioning, and market conditions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    Current Pricing Change
                  </Label>
                  <div className="mt-1 p-3 bg-white border rounded-md">
                    <span className="text-lg font-semibold text-myobPurple">
                      {scenario.parameters.pricingChange > 0 ? '+' : ''}
                      {scenario.parameters.pricingChange || 0}%
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Payment Terms
                  </Label>
                  <div className="mt-1 p-3 bg-white border rounded-md">
                    <span className="text-lg font-semibold text-myobPurple">
                      {scenario.parameters.paymentTermsDays || 30} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
