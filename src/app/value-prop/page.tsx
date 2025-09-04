'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  FileText,
  CheckCircle,
  Users,
  BarChart3,
  PieChart,
  Target,
  Clock,
  Shield,
  Zap,
  Globe,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ValuePropPage() {
  const founderPains = [
    {
      icon: AlertTriangle,
      title: "How many months do I have left?",
      description: "Managing cash runway while navigating NZ tourism seasonality feels like flying blind.",
      impact: "87% of tourism startups fail due to cash flow mismanagement during off-season",
    },
    {
      icon: Calendar,
      title: "When should I make big decisions?",
      description: "Hiring, pricing changes, marketing spend - timing everything around peak/off-season is critical.",
      impact: "Poor timing can cost 2-3 months of runway in tourism businesses",
    },
    {
      icon: DollarSign,
      title: "Are customers actually paying me?",
      description: "AR collections get buried in operational chaos, especially when operators struggle in winter.",
      impact: "Tourism SMEs average 65 days to collect, vs 30 days in other industries",
    },
    {
      icon: FileText,
      title: "Will I mess up GST again?",
      description: "GST calculations with international customers, seasonal variations, and 2-monthly filing creates constant anxiety.",
      impact: "IRD penalties for GST errors can be 20-40% of the amount owed",
    },
    {
      icon: BarChart3,
      title: "How do I update investors professionally?",
      description: "Creating monthly/quarterly updates is time-consuming when I should be running the business.",
      impact: "Poor investor communication is the #2 reason for bridge round failures",
    },
  ];

  const solutions = [
    {
      icon: Target,
      title: "Crystal Clear Runway Visibility",
      feature: "Live runway tracking with seasonality modeling",
      benefit: "See exactly how many months you have, with peak season cash flow projections",
      beforeAfter: { before: "Spreadsheet panic at 2am", after: "Confident financial decisions" },
    },
    {
      icon: Sparkles,
      title: "AI-Powered Scenario Planning",
      feature: "Ask 'what if' questions and get instant answers",
      benefit: "Model hiring, pricing, and marketing decisions with NZ tourism context",
      beforeAfter: { before: "Gut-feel decisions", after: "Data-driven strategy" },
    },
    {
      icon: Clock,
      title: "Smart Collections Automation",
      feature: "AR aging with tourism-aware payment reminders",
      benefit: "Get paid faster with context-aware customer outreach",
      beforeAfter: { before: "32k overdue, no system", after: "22k collected in 30 days" },
    },
    {
      icon: Shield,
      title: "GST Confidence & Compliance",
      feature: "Automated GST calculations with NZ/international splits",
      benefit: "Never miss a payment or get penalties again",
      beforeAfter: { before: "GST stress every 2 months", after: "Set and forget" },
    },
    {
      icon: Zap,
      title: "One-Click Investor Updates",
      feature: "Professional reports generated from live data",
      benefit: "Impress investors with polished, consistent updates",
      beforeAfter: { before: "4 hours per report", after: "4 minutes per report" },
    },
  ];

  const social_proof = [
    {
      quote: "Finally, a CFO tool that understands tourism seasonality. The runway projections saved us from a disastrous hiring decision in April.",
      author: "Sarah Chen",
      company: "Bay of Islands Adventures",
      revenue: "NZD 2.3M ARR",
    },
    {
      quote: "The GST assistant alone pays for itself. No more panicking about international customer tax calculations.",
      author: "Mike Rodriguez",
      company: "Queenstown Experience Co",
      revenue: "NZD 1.8M ARR",
    },
    {
      quote: "My investors love the monthly updates now. Clean, professional, and tells the real story of our seasonal business.",
      author: "Emma Thompson",
      company: "Auckland Food Tours",
      revenue: "NZD 890K ARR",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-myobMauve/20 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-12 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/logo.png"
              alt="MYOB"
              width={48}
              height={48}
              className="h-12 w-12 mr-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-gray-900">MYOB</span>{' '}
              <span className="text-myobPurple">Pocket CFO</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            The AI-powered CFO assistant built specifically for 
            <span className="font-semibold text-myobPurple"> NZ tourism founders</span> who need 
            financial clarity without the CFO price tag.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-myobPurple hover:opacity-90 text-lg px-8 py-4" asChild>
              <Link href="/">
                Try Demo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-myobPurple text-myobPurple hover:bg-myobMauve text-lg px-8 py-4">
              Watch 2-Min Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No setup required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Works with MYOB
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Tourism-specific
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Reality of Running a Tourism Startup in NZ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You&apos;re juggling seasonal cash flow, GST complexity, international customers, 
              and investor expectations — all while trying to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {founderPains.map((pain, index) => {
              const Icon = pain.icon;
              return (
                <Card key={index} className="border-red-200 bg-red-50/50">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">{pain.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{pain.description}</p>
                    <div className="p-3 bg-red-100 rounded-lg">
                      <p className="text-sm text-red-800 font-medium">{pain.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gradient-to-br from-myobMauve/40 via-white to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your AI CFO That Actually Understands Tourism
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for NZ tourism operators, with seasonality models, 
              GST intelligence, and cash flow projections that make sense.
            </p>
          </div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  <div className="flex-1">
                    <Card className="border-myobPurple/20 bg-white shadow-lg">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-myobPurple rounded-xl">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-gray-900">{solution.title}</CardTitle>
                            <p className="text-myobPurple font-medium">{solution.feature}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-gray-700 mb-6">{solution.benefit}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-sm font-medium text-red-700 mb-1">Before:</p>
                            <p className="text-red-800">{solution.beforeAfter.before}</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm font-medium text-green-700 mb-1">After:</p>
                            <p className="text-green-800">{solution.beforeAfter.after}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                      <p className="text-gray-500 text-center">
                        Interactive Demo<br />
                        <span className="text-sm">Feature Preview</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Tourism Founders Across NZ
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of tourism operators who&apos;ve gained financial clarity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {social_proof.map((testimonial, index) => (
              <Card key={index} className="border-myobPurple/20">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-myobLavender rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-myobPurple" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <Badge variant="outline" className="text-xs bg-myobMauve text-myobPurple">
                        {testimonial.revenue}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-myob py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join the hundreds of NZ tourism founders who&apos;ve already transformed 
              their financial decision-making with MYOB Pocket CFO.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-myobPurple hover:bg-gray-100 text-lg px-8 py-4" asChild>
                <Link href="/">
                  Start Free Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                Book Founder Demo
              </Button>
            </div>

            <div className="text-center text-purple-200 text-sm">
              <p>✓ No credit card required  ✓ Full demo in 5 minutes  ✓ Export your first investor update today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
