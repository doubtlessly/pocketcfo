'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MessageSquare, Plus, Settings, User, LogOut } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-50">
      <div className="container-modern">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group ml-4">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="MYOB Pocket CFO"
                width={80}
                height={80}
                className="h-16 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { href: '/', label: 'Dashboard' },
              { href: '/cash', label: 'Cash' },
              { href: '/revenue', label: 'Revenue & Growth' },
              { href: '/profitability', label: 'Profitability' },
              { href: '/scenarios', label: 'Scenarios' },
              { href: '/alerts', label: 'Alerts & Risks' },
              { href: '/agents', label: 'Agents' },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === item.href 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            {/* Ask CFO AI - Standout Copilot Feature */}
            <Button 
              className="btn-modern bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hidden md:flex items-center space-x-2"
              asChild
            >
              <Link href="/ask">
                <MessageSquare className="h-4 w-4" />
                <span className="font-semibold">Ask CFO AI</span>
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full focus-modern">
                  <Avatar className="h-10 w-10 ring-2 ring-purple-100">
                    <AvatarImage src="/avatar.png" alt="Aroha" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold">
                      A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card border-purple-200" align="end" forceMount>
                <div className="px-3 py-2 border-b border-purple-100">
                  <p className="text-sm font-medium text-purple-900">Aroha</p>
                  <p className="text-xs text-purple-600">Tourism Founder</p>
                </div>
                <DropdownMenuItem className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-gray-700 hover:text-purple-700" asChild>
                  <Link href="/dashboard/customize">
                    <Settings className="h-4 w-4" />
                    <span>Customize Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-gray-700 hover:text-purple-700" asChild>
                  <Link href="/onboarding">
                    <Settings className="h-4 w-4" />
                    <span>Reconfigure Setup</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-gray-700 hover:text-purple-700" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
