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
  LogOut
} from 'lucide-react';

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
    name: 'Métodos de Monitoreo',
    href: '/dashboard/methods',
    icon: Microscope,
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
    name: 'Análisis',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Usuarios',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    name: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();

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

      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-green-100 text-green-700">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Usuario Demo
            </p>
            <p className="text-xs text-gray-500 truncate">
              Investigador
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

