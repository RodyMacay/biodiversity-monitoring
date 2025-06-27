"use client";

import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

// Importación dinámica para evitar problemas de SSR con Leaflet
const LocationsMapWithNoSSR = dynamic(
  () => import('@/components/locations/LocationsMap'),
  {
    ssr: false,
    loading: () => <MapLoadingSkeleton />,
  }
);

// Componente de carga personalizado
const MapLoadingSkeleton = () => (
  <DashboardLayout 
      title="Dashboard" 
      description="Resumen general del sistema de monitoreo de biodiversidad"
    >
  <div className="h-full w-full bg-gray-50">
    <div className="flex flex-col lg:flex-row h-full">
      {/* Skeleton del mapa */}
      <div className="flex-1 p-4">
        <div className="relative h-full bg-gray-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 font-medium">Cargando mapa interactivo...</p>
              <p className="text-gray-500 text-sm mt-1">Preparando ubicaciones y datos</p>
            </div>
          </div>
          
          {/* Efectos de carga animados */}
          <div className="absolute top-4 left-4">
            <Skeleton className="h-16 w-48 rounded-lg" />
          </div>
          
          {/* Marcadores simulados */}
          <div className="absolute top-20 left-32">
            <div className="w-6 h-6 bg-blue-300 rounded-full animate-pulse" />
          </div>
          <div className="absolute top-40 right-48">
            <div className="w-6 h-6 bg-green-300 rounded-full animate-pulse delay-300" />
          </div>
          <div className="absolute bottom-32 left-64">
            <div className="w-6 h-6 bg-red-300 rounded-full animate-pulse delay-700" />
          </div>
        </div>
      </div>
      
      {/* Skeleton del panel lateral */}
      <div className="w-full lg:w-96 p-4">
        <Card className="h-full">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-green-50">
            <Skeleton className="h-6 w-3/4" />
          </div>
          <div className="p-6 space-y-4">
            <div className="text-center space-y-4">
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-5 w-2/3 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
            <div className="flex justify-center gap-2 mt-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
    </DashboardLayout>
);

const MapPage = () => {
  return (
      <DashboardLayout 
      title="Dashboard" 
      description="Resumen general del sistema de monitoreo de biodiversidad"
    >
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header mejorado */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Mapa Interactivo de Ubicaciones
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Explora ecosistemas y biodiversidad
              </p>
            </div>
          </div>
          
          {/* Indicadores del header */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Datos en Tiempo Real</p>
              <p className="text-xs text-gray-500">Última actualización: Hoy</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="h-[calc(100vh-4rem)]">
        <LocationsMapWithNoSSR className="h-full" />
      </main>
    </div>
    </DashboardLayout>
  );
};

export default MapPage;