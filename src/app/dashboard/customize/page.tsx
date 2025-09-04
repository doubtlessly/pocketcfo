'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Plus,
  X,
  BarChart3,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Table,
  Eye,
  EyeOff,
  Grip,
  Save,
  RotateCcw
} from 'lucide-react';
import { 
  DashboardWidget, 
  universalWidgets, 
  tourismConfig, 
  constructionConfig 
} from '@/data/industry-configs';

interface SelectedWidget extends DashboardWidget {
  enabled: boolean;
  position: number;
}

export default function DashboardCustomizePage() {
  // Mock current user industry - in real app this would come from user profile
  const [currentIndustry] = useState('tourism'); // or 'construction'
  
  const industryConfig = currentIndustry === 'tourism' ? tourismConfig : constructionConfig;
  const industryWidgets = industryConfig.dashboardWidgets;
  
  // Combine industry-specific and universal widgets
  const allAvailableWidgets = [...industryWidgets, ...universalWidgets];
  
  // Initialize selected widgets (what user currently has on their dashboard)
  const [selectedWidgets, setSelectedWidgets] = useState<SelectedWidget[]>(
    allAvailableWidgets
      .filter(widget => widget.defaultEnabled)
      .map((widget, index) => ({
        ...widget,
        enabled: true,
        position: index
      }))
  );

  const [availableWidgets] = useState<DashboardWidget[]>(allAvailableWidgets);

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'kpi':
        return TrendingUp;
      case 'chart':
        return BarChart3;
      case 'table':
        return Table;
      case 'alert':
        return AlertTriangle;
      case 'insight':
        return DollarSign;
      default:
        return BarChart3;
    }
  };

  const getWidgetTypeColor = (type: string) => {
    switch (type) {
      case 'kpi':
        return 'bg-blue-100 text-blue-700';
      case 'chart':
        return 'bg-green-100 text-green-700';
      case 'table':
        return 'bg-purple-100 text-purple-700';
      case 'alert':
        return 'bg-orange-100 text-orange-700';
      case 'insight':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSizeDisplay = (size: string) => {
    switch (size) {
      case 'small':
        return '1x1';
      case 'medium':
        return '2x1';
      case 'large':
        return '2x2';
      default:
        return '1x1';
    }
  };

  const addWidget = (widget: DashboardWidget) => {
    const newWidget: SelectedWidget = {
      ...widget,
      enabled: true,
      position: selectedWidgets.length
    };
    setSelectedWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (widgetId: string) => {
    setSelectedWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.map(w => 
        w.id === widgetId ? { ...w, enabled: !w.enabled } : w
      )
    );
  };

  const moveWidget = (widgetId: string, direction: 'up' | 'down') => {
    setSelectedWidgets(prev => {
      const widgets = [...prev];
      const index = widgets.findIndex(w => w.id === widgetId);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= widgets.length) return prev;

      // Swap positions
      [widgets[index], widgets[newIndex]] = [widgets[newIndex], widgets[index]];
      
      // Update position values
      widgets.forEach((widget, idx) => {
        widget.position = idx;
      });
      
      return widgets;
    });
  };

  const resetToDefault = () => {
    setSelectedWidgets(
      allAvailableWidgets
        .filter(widget => widget.defaultEnabled)
        .map((widget, index) => ({
          ...widget,
          enabled: true,
          position: index
        }))
    );
  };

  const saveConfiguration = () => {
    // In a real app, this would save to backend/localStorage
    console.log('Saving dashboard configuration:', selectedWidgets);
    alert('Dashboard configuration saved!');
  };

  // Filter available widgets to show only those not already added
  const unselectedWidgets = availableWidgets.filter(
    widget => !selectedWidgets.some(selected => selected.id === widget.id)
  );

  // Group widgets by category
  const widgetsByCategory = unselectedWidgets.reduce((groups, widget) => {
    const category = widget.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(widget);
    return groups;
  }, {} as Record<string, DashboardWidget[]>);

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Customize Dashboard</h1>
                <p className="text-gray-600">
                  Personalize your {industryConfig.name} dashboard widgets
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={resetToDefault}
                className="btn-modern btn-secondary-modern"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </Button>
              <Button
                onClick={saveConfiguration}
                className="btn-modern btn-primary-modern"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Dashboard Widgets */}
          <div className="lg:col-span-2">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Current Dashboard ({selectedWidgets.length} widgets)</CardTitle>
                <p className="text-sm text-gray-600">
                  {selectedWidgets.filter(w => w.enabled).length} enabled, {selectedWidgets.filter(w => !w.enabled).length} disabled
                </p>
              </CardHeader>
              <CardContent>
                {selectedWidgets.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No widgets selected</h3>
                    <p className="text-gray-600">Add widgets from the library to customize your dashboard</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedWidgets
                      .sort((a, b) => a.position - b.position)
                      .map((widget, index) => {
                        const WidgetIcon = getWidgetIcon(widget.type);
                        return (
                          <div
                            key={widget.id}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              widget.enabled
                                ? 'border-purple-200 bg-purple-50'
                                : 'border-gray-200 bg-gray-50 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex flex-col space-y-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveWidget(widget.id, 'up')}
                                    disabled={index === 0}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Grip className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveWidget(widget.id, 'down')}
                                    disabled={index === selectedWidgets.length - 1}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Grip className="h-3 w-3" />
                                  </Button>
                                </div>
                                
                                <div className={`p-2 rounded-lg ${widget.enabled ? 'bg-purple-200' : 'bg-gray-200'}`}>
                                  <WidgetIcon className={`h-4 w-4 ${widget.enabled ? 'text-purple-700' : 'text-gray-500'}`} />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className={`font-semibold ${widget.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                                      {widget.title}
                                    </h4>
                                    {widget.industrySpecific && (
                                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                                        {industryConfig.name}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className={`text-sm ${widget.enabled ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {widget.description}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Badge variant="outline" className={getWidgetTypeColor(widget.type)}>
                                      {widget.type.toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {getSizeDisplay(widget.size)}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {widget.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleWidget(widget.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  {widget.enabled ? (
                                    <Eye className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeWidget(widget.id)}
                                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Widget Library */}
          <div className="lg:col-span-1">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Widget Library</CardTitle>
                <p className="text-sm text-gray-600">
                  {unselectedWidgets.length} available widgets
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="industry">Industry</TabsTrigger>
                    <TabsTrigger value="universal">Universal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {Object.entries(widgetsByCategory).map(([category, widgets]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                        <div className="space-y-2">
                          {widgets.map((widget) => {
                            const WidgetIcon = getWidgetIcon(widget.type);
                            return (
                              <div
                                key={widget.id}
                                className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 bg-gray-100 rounded-lg">
                                    <WidgetIcon className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h5 className="font-medium text-gray-900 text-sm truncate">
                                        {widget.title}
                                      </h5>
                                      {widget.industrySpecific && (
                                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                                          Industry
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                      {widget.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex space-x-1">
                                        <Badge variant="outline" className={`${getWidgetTypeColor(widget.type)} text-xs`}>
                                          {widget.type}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                          {getSizeDisplay(widget.size)}
                                        </Badge>
                                      </div>
                                      <Button
                                        size="sm"
                                        onClick={() => addWidget(widget)}
                                        className="h-6 px-2 text-xs"
                                      >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="industry" className="space-y-2 mt-4">
                    {unselectedWidgets
                      .filter(widget => widget.industrySpecific)
                      .map((widget) => {
                        const WidgetIcon = getWidgetIcon(widget.type);
                        return (
                          <div
                            key={widget.id}
                            className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <WidgetIcon className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 text-sm mb-1 truncate">
                                  {widget.title}
                                </h5>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                  {widget.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className={`${getWidgetTypeColor(widget.type)} text-xs`}>
                                    {widget.type} • {getSizeDisplay(widget.size)}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    onClick={() => addWidget(widget)}
                                    className="h-6 px-2 text-xs"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </TabsContent>
                  
                  <TabsContent value="universal" className="space-y-2 mt-4">
                    {unselectedWidgets
                      .filter(widget => !widget.industrySpecific)
                      .map((widget) => {
                        const WidgetIcon = getWidgetIcon(widget.type);
                        return (
                          <div
                            key={widget.id}
                            className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <WidgetIcon className="h-4 w-4 text-gray-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 text-sm mb-1 truncate">
                                  {widget.title}
                                </h5>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                  {widget.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className={`${getWidgetTypeColor(widget.type)} text-xs`}>
                                    {widget.type} • {getSizeDisplay(widget.size)}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    onClick={() => addWidget(widget)}
                                    className="h-6 px-2 text-xs"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
