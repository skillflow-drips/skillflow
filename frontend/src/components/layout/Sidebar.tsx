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
    <div className="sticky top-0 flex h-screen w-64 flex-col border-r border-[rgba(255,255,255,0.08)] bg-[#0B0F1A] px-4 py-8">
      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center gap-4 rounded-xl px-4 py-3 text-[#64748B] transition-all hover:bg-[#0B0F1A] hover:text-[#F9FAFB]"
          >
            <item.icon className="h-5 w-5 group-hover:text-[#7C3AED]" />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
