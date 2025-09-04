'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, TrendingUp, CreditCard, DollarSign, BarChart3, AlertTriangle, Bot } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/cash', icon: CreditCard, label: 'Cash' },
    { href: '/revenue', icon: BarChart3, label: 'Revenue' },
    { href: '/profitability', icon: DollarSign, label: 'Profit' },
    { href: '/scenarios', icon: TrendingUp, label: 'Scenarios' },
    { href: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { href: '/agents', icon: Bot, label: 'Agents' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-purple-100/50 z-50 safe-area-pb">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-200 min-w-0 ${
                isActive
                  ? 'text-purple-700 bg-purple-100 shadow-sm'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-purple-200/50' : ''
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
