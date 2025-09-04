'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Database,
  CreditCard,
  Building2,
  Bell,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Settings2,
  Crown,
  Users
} from 'lucide-react';

export default function SettingsPage() {
  const [connections, setConnections] = useState({
    myobLedger: { connected: false, lastSync: null },
    bankFeeds: { connected: true, lastSync: '2024-12-29 09:15 AM' },
    payrollSystem: { connected: false, lastSync: null },
  });

  const [preferences, setPreferences] = useState({
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/New_York',
    notifications: {
      weeklyReports: true,
      monthlyReports: true,
      alerts: true,
      insights: true,
    }
  });

  const [currentPlan] = useState({
    name: 'Growth',
    price: 49,
    features: ['Unlimited scenarios', '5 team members', 'API access', 'Priority support'],
    usage: {
      scenarios: { current: 12, limit: null },
      reports: { current: 8, limit: 50 },
      teamMembers: { current: 3, limit: 5 },
    }
  });

  const toggleConnection = (connectionKey: keyof typeof connections) => {
    setConnections(prev => ({
      ...prev,
      [connectionKey]: {
        ...prev[connectionKey],
        connected: !prev[connectionKey].connected,
        lastSync: !prev[connectionKey].connected ? new Date().toLocaleString() : null,
      }
    }));
  };

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const updateNotificationPreference = (key: keyof typeof preferences.notifications, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Settings ⚙️
          </h1>
          <p className="text-gray-600">
            Manage your connections, preferences, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Data Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Data Connections</span>
                </CardTitle>
                <p className="text-gray-600">
                  Connect your financial systems for real-time data
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* MYOB Ledger */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-myobPurple rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">MYOB Business</h4>
                      <p className="text-sm text-gray-600">Connect your MYOB ledger for real-time financial data</p>
                      {connections.myobLedger.connected && connections.myobLedger.lastSync && (
                        <p className="text-xs text-green-600 mt-1">
                          Last synced: {connections.myobLedger.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {connections.myobLedger.connected ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant={connections.myobLedger.connected ? "outline" : "default"}
                      onClick={() => toggleConnection('myobLedger')}
                      className={!connections.myobLedger.connected ? "bg-myobPurple hover:opacity-90" : ""}
                    >
                      {connections.myobLedger.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>

                {/* Bank Feeds */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bank Feeds</h4>
                      <p className="text-sm text-gray-600">Automatic bank transaction imports</p>
                      {connections.bankFeeds.connected && connections.bankFeeds.lastSync && (
                        <p className="text-xs text-green-600 mt-1">
                          Last synced: {connections.bankFeeds.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {connections.bankFeeds.connected ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant={connections.bankFeeds.connected ? "outline" : "default"}
                      onClick={() => toggleConnection('bankFeeds')}
                      className={!connections.bankFeeds.connected ? "bg-myobPurple hover:opacity-90" : ""}
                    >
                      {connections.bankFeeds.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>

                {/* Payroll System */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Payroll System</h4>
                      <p className="text-sm text-gray-600">Sync payroll data for accurate burn rate calculations</p>
                      {connections.payrollSystem.connected && connections.payrollSystem.lastSync && (
                        <p className="text-xs text-green-600 mt-1">
                          Last synced: {connections.payrollSystem.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {connections.payrollSystem.connected ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant={connections.payrollSystem.connected ? "outline" : "default"}
                      onClick={() => toggleConnection('payrollSystem')}
                      className={!connections.payrollSystem.connected ? "bg-myobPurple hover:opacity-90" : ""}
                    >
                      {connections.payrollSystem.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Security & Privacy</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        All connections use bank-level encryption and read-only access. We never store your login credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings2 className="h-5 w-5" />
                  <span>Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={preferences.currency} onValueChange={(value) => updatePreference('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select value={preferences.dateFormat} onValueChange={(value) => updatePreference('dateFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => updatePreference('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'weeklyReports' as const, label: 'Weekly financial summaries', description: 'Get weekly insights delivered to your inbox' },
                  { key: 'monthlyReports' as const, label: 'Monthly investor updates', description: 'Automated monthly report generation reminders' },
                  { key: 'alerts' as const, label: 'Critical alerts', description: 'Important notifications about cash flow and runway' },
                  { key: 'insights' as const, label: 'AI insights', description: 'New recommendations and scenario suggestions' },
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{notif.label}</h4>
                      <p className="text-sm text-gray-600">{notif.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={preferences.notifications[notif.key] ? "default" : "outline"}
                      onClick={() => updateNotificationPreference(notif.key, !preferences.notifications[notif.key])}
                      className={preferences.notifications[notif.key] ? "bg-myobPurple hover:opacity-90" : ""}
                    >
                      {preferences.notifications[notif.key] ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-myobPurple" />
                  <span>Current Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-myobPurple text-white mb-2">{currentPlan.name}</Badge>
                  <div className="text-2xl font-bold text-gray-900">
                    ${currentPlan.price}<span className="text-sm text-gray-500">/month</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Features included:</h4>
                  <ul className="space-y-1">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Usage this month:</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reports generated</span>
                      <span>{currentPlan.usage.reports.current}/{currentPlan.usage.reports.limit}</span>
                    </div>
                    <Progress value={(currentPlan.usage.reports.current / currentPlan.usage.reports.limit) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Team members</span>
                      <span>{currentPlan.usage.teamMembers.current}/{currentPlan.usage.teamMembers.limit}</span>
                    </div>
                    <Progress value={(currentPlan.usage.teamMembers.current / currentPlan.usage.teamMembers.limit) * 100} className="h-2" />
                  </div>
                </div>

                <Button className="w-full bg-myobPurple hover:opacity-90">
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-myobLavender text-myobPurple hover:bg-myobMauve">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Support Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Team Members
                </Button>
              </CardContent>
            </Card>

            {/* Account */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>Signed in as:</p>
                  <p className="font-medium text-gray-900">cfo@company.com</p>
                </div>
                <Button variant="outline" className="w-full">
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
