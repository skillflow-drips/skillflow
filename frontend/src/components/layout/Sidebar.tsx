import React from 'react';
import Link from 'next/link';
import { Home, Briefcase, CreditCard, ShieldAlert, User, Settings } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'My Gigs', icon: Briefcase, href: '/dashboard/gigs' },
    { name: 'Credits', icon: CreditCard, href: '/tokens' },
    { name: 'Disputes', icon: ShieldAlert, href: '/disputes' },
    { name: 'Profile', icon: User, href: '/profile/me' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-2xl h-screen sticky top-0 px-4 py-8 flex flex-col">
      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <item.icon className="w-5 h-5 group-hover:text-blue-400" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
