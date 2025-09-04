'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2,
  Mountain,
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
  AlertTriangle,
  Zap,
  Calendar,
  Globe,
  Hammer,
  MapPin,
  Cloud,
  Truck
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';
import { 
  tourismConfig, 
  constructionConfig
} from '@/data/industry-configs';

// Import mock data
import { currentTourismKPIs as tourismKPIs } from '@/data/nz-tourism-mock';
import { currentConstructionKPIs as constructionKPIs } from '@/data/construction-mock';

export default function IndustryPreviewPage() {
  const [activeTab, setActiveTab] = useState('tourism');

  const industries = [
    {
      id: 'tourism',
      name: 'Tourism & Hospitality',
      icon: Mountain,
      color: 'from-blue-500 to-cyan-600',
      description: 'Adventure tourism and accommodation business in Queenstown',
      businessName: 'Alpine Adventures NZ',
      config: tourismConfig,
      kpis: tourismKPIs,
      challenges: [
        'Seasonal cash flow volatility (60% revenue in 4 months)',
        'Weather-dependent bookings and cancellations',
        'International customer FX exposure (AUD/USD)',
        'Peak season staff accommodation costs',
        'Insurance and safety compliance costs'
      ],
      opportunities: [
        'Dynamic pricing during peak season',
        'Corporate team building packages',
        'Off-season local market development',
        'Digital marketing optimization',
        'Multi-day package development'
      ]
    },
    {
      id: 'construction',
      name: 'Construction & Trades',
      icon: Building2,
      color: 'from-orange-500 to-amber-600',
      description: 'Residential and commercial construction contractor in Auckland',
      businessName: 'BuildRight Construction Ltd',
      config: constructionConfig,
      kpis: constructionKPIs,
      challenges: [
        'Project cost overruns and margin protection',
        'Materials price volatility (especially timber)',
        'Progress billing and cash flow timing',
        'Skilled labor shortage and wage pressure',
        'Health and safety compliance costs'
      ],
      opportunities: [
        'Government infrastructure spending',
        'Residential building boom',
        'Specialized high-margin services',
        'Technology adoption for efficiency',
        'Long-term maintenance contracts'
      ]
    }
  ];

  const currentIndustry = industries.find(ind => ind.id === activeTab);
  const IconComponent = currentIndustry?.icon || Mountain;

  return (
    <div className="min-h-screen bg-gradient-myob-subtle">
      <div className="container-modern section-padding">
        {/* Header */}
        <div className="mb-8 animate-fade-in text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-hero bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Industry-Tailored Experience
          </h1>
          <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
            See how MYOB Pocket CFO adapts to different industries with specialized widgets, insights, and recommendations
          </p>
        </div>

        {/* Industry Selector */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
            {industries.map((industry) => {
              const IndustryIcon = industry.icon;
              return (
                <TabsTrigger 
                  key={industry.id}
                  value={industry.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                  <IndustryIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{industry.name}</span>
                  <span className="sm:hidden">{industry.id === 'tourism' ? 'Tourism' : 'Construction'}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {industries.map((industry) => (
            <TabsContent key={industry.id} value={industry.id} className="mt-8">
              {/* Industry Overview */}
              <Card className="card-modern mb-8">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className={`p-4 bg-gradient-to-br ${industry.color} rounded-2xl shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{industry.businessName}</h2>
                          <p className="text-gray-600 mb-3">{industry.description}</p>
                          <Badge className={`bg-gradient-to-r ${industry.color} text-white border-0`}>
                            {industry.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                            Key Challenges
                          </h3>
                          <ul className="space-y-2">
                            {industry.challenges.map((challenge, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                            Growth Opportunities
                          </h3>
                          <ul className="space-y-2">
                            {industry.opportunities.map((opportunity, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {opportunity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <h3 className="font-semibold text-gray-900 mb-4">Industry-Specific Features</h3>
                      <div className="space-y-3">
                        {industry.config.dashboardWidgets.slice(0, 4).map((widget) => (
                          <div key={widget.id} className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                            <h4 className="font-medium text-purple-900 text-sm mb-1">{widget.title}</h4>
                            <p className="text-xs text-purple-700">{widget.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sample KPI Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {industry.id === 'tourism' ? (
                  <>
                    <KpiCard
                      title="Runway"
                      value={industry.kpis.runway.value}
                      change={industry.kpis.runway.change}
                      trend={industry.kpis.runway.trend}
                      format="months"
                    />
                    <KpiCard
                      title="Monthly Burn"
                      value={industry.kpis.monthlyBurn.value}
                      change={industry.kpis.monthlyBurn.change}
                      trend={industry.kpis.monthlyBurn.trend}
                      format="currency"
                      sparkline={industry.kpis.monthlyBurn.sparkline}
                    />
                    <KpiCard
                      title="Booking Revenue"
                      value={industry.kpis.bookingRevenue.value}
                      change={industry.kpis.bookingRevenue.change}
                      trend={industry.kpis.bookingRevenue.trend}
                      format="currency"
                      sparkline={industry.kpis.bookingRevenue.sparkline}
                    />
                    <KpiCard
                      title="Cancellation Rate"
                      value={industry.kpis.cancellationRate.value}
                      change={industry.kpis.cancellationRate.change}
                      trend={industry.kpis.cancellationRate.trend}
                      format="percentage"
                    />
                  </>
                ) : (
                  <>
                    <KpiCard
                      title="Runway"
                      value={industry.kpis.runway.value}
                      change={industry.kpis.runway.change}
                      trend={industry.kpis.runway.trend}
                      format="months"
                    />
                    <KpiCard
                      title="Monthly Burn"
                      value={industry.kpis.monthlyBurn.value}
                      change={industry.kpis.monthlyBurn.change}
                      trend={industry.kpis.monthlyBurn.trend}
                      format="currency"
                      sparkline={industry.kpis.monthlyBurn.sparkline}
                    />
                    <KpiCard
                      title="Avg Project Margin"
                      value={industry.kpis.averageProjectMargin.value}
                      change={industry.kpis.averageProjectMargin.change}
                      trend={industry.kpis.averageProjectMargin.trend}
                      format="percentage"
                      sparkline={industry.kpis.averageProjectMargin.sparkline}
                    />
                    <KpiCard
                      title="Work in Progress"
                      value={industry.kpis.workInProgressValue.value}
                      change={industry.kpis.workInProgressValue.change}
                      trend={industry.kpis.workInProgressValue.trend}
                      format="currency"
                      sparkline={industry.kpis.workInProgressValue.sparkline}
                    />
                  </>
                )}
              </div>

              {/* Industry-Specific Widgets Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle>Specialized Analytics</CardTitle>
                    <p className="text-sm text-gray-600">
                      Industry-specific insights and metrics
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {industry.id === 'tourism' ? (
                        <>
                          <div className="p-4 bg-blue-50 rounded-xl">
                            <div className="flex items-center space-x-3 mb-2">
                              <Cloud className="h-5 w-5 text-blue-600" />
                              <h4 className="font-semibold text-blue-900">Weather Impact Tracking</h4>
                            </div>
                            <p className="text-sm text-blue-800">
                              3-day weather forecast shows 15% booking impact risk. Consider proactive customer communication.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-xl">
                            <div className="flex items-center space-x-3 mb-2">
                              <Globe className="h-5 w-5 text-green-600" />
                              <h4 className="font-semibold text-green-900">Peak Season Pricing</h4>
                            </div>
                            <p className="text-sm text-green-800">
                              Current pricing captures 78% of peak season premium potential. Opportunity for $32k additional revenue.
                            </p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-xl">
                            <div className="flex items-center space-x-3 mb-2">
                              <DollarSign className="h-5 w-5 text-purple-600" />
                              <h4 className="font-semibold text-purple-900">FX Exposure Monitor</h4>
                            </div>
                            <p className="text-sm text-purple-800">
                              22% revenue from AU customers. AUD/NZD at 0.91, monitor for hedging opportunities.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-4 bg-orange-50 rounded-xl">
                            <div className="flex items-center space-x-3 mb-2">
                              <Hammer className="h-5 w-5 text-orange-600" />
                              <h4 className="font-semibold text-orange-900">Project Margin Analysis</h4>
                            </div>
                            <p className="text-sm text-orange-800">
                              Smith House project running 3.2% over materials budget. Tech Startup project margin at risk.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-xl">
                            <div className="flex items-center space-x-3 mb-2">
                              <Truck className="h-5 w-5 text-green-600" />
                              <h4 className="font-semibold text-green-900">Materials Price Tracking</h4>
                            </div>
                            <p className="text-sm text-green-800">
                              Timber prices up 7.2% this month. Consider locking in Q1 2025 pricing with suppliers.
                            </p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-xl">
                            <div className="flex items-center space-x-3 mb-2">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              <h4 className="font-semibold text-blue-900">Retention Release</h4>
                            </div>
                            <p className="text-sm text-blue-800">
                              $15,000 retention from completed office project can be claimed January 15th.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle>Smart Recommendations</CardTitle>
                    <p className="text-sm text-gray-600">
                      AI-powered insights for your industry
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {industry.id === 'tourism' ? (
                        <>
                          <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                            <div>
                              <h5 className="font-medium text-emerald-900 text-sm">Seasonal Cash Planning</h5>
                              <p className="text-xs text-emerald-800 mt-1">
                                Set aside 40% of Dec-Mar revenue for May-Aug operating costs
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <h5 className="font-medium text-blue-900 text-sm">Corporate Package Development</h5>
                              <p className="text-xs text-blue-800 mt-1">
                                3 corporate inquiries this month. Consider team building packages
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                              <h5 className="font-medium text-purple-900 text-sm">Digital Marketing ROI</h5>
                              <p className="text-xs text-purple-800 mt-1">
                                Instagram ads showing 340% ROI. Increase peak season budget
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                            <div>
                              <h5 className="font-medium text-emerald-900 text-sm">Quote Pricing Strategy</h5>
                              <p className="text-xs text-emerald-800 mt-1">
                                Add 8% materials buffer for projects starting after February
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <h5 className="font-medium text-blue-900 text-sm">Progress Billing Optimization</h5>
                              <p className="text-xs text-blue-800 mt-1">
                                Invoice weekly instead of monthly to improve cash flow by 18%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div>
                              <h5 className="font-medium text-orange-900 text-sm">Specialization Opportunity</h5>
                              <p className="text-xs text-orange-800 mt-1">
                                4 bathroom renovation requests. Consider specializing for higher margins
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <Card className="card-modern max-w-2xl mx-auto mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to experience your tailored AI CFO?
            </h3>
            <p className="text-gray-600 mb-6">
              Set up your industry-specific dashboard in under 3 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-modern btn-primary-modern" asChild>
                <a href="/onboarding">
                  Start Setup Process
                </a>
              </Button>
              <Button className="btn-modern btn-secondary-modern" asChild>
                <a href="/dashboard/customize">
                  Customize Existing Dashboard
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
