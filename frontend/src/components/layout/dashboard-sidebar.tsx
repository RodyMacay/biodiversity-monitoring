'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BarChart3, 
  Leaf, 
  MapPin, 
  Microscope, 
  Database,
  Settings,
  Users,
  Home,
  LogOut,
  MapPlus
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Especies',
    href: '/dashboard/species',
    icon: Leaf,
  },

  {
    name: 'Ubicaciones',
    href: '/dashboard/locations',
    icon: MapPin,
  },
  {
    name: 'Datos de Monitoreo',
    href: '/dashboard/monitoring-data',
    icon: Database,
  },
  {
    name: 'Localizaciones',
    href: '/dashboard/ubications',
    icon: MapPlus,
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className={cn('flex h-full w-64 flex-col bg-white border-r', className)}>
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold text-gray-900">BiodiversityMonitor</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <span className='text-sm font-medium text-gray-600'>{user?.firstName} {user?.lastName}</span>
          <div className="flex-1 min-w-0">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

