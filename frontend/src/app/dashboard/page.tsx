'use client';

import { useQuery } from '@apollo/client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsGrid } from '@/components/dashboard/stats-card';
import { RecentData } from '@/components/dashboard/recent-data';
import { BarChartComponent, PieChartComponent, LineChartComponent } from '@/components/dashboard/charts';
import { GET_DASHBOARD_STATS } from '@/graphql/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Leaf, 
  Microscope, 
  MapPin, 
  Database,
  AlertTriangle
} from 'lucide-react';

export default function DashboardPage() {
  const { data, loading, error } = useQuery(GET_DASHBOARD_STATS, {
    pollInterval: 30000, // Actualizar cada 30 segundos
  });

  if (loading) {
    return (
      <DashboardLayout 
        title="Dashboard" 
        description="Resumen general del sistema de monitoreo de biodiversidad"
      >
        <div className="space-y-6">
          {/* Stats skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          
          {/* Charts skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
          
          {/* Recent data skeleton */}
          <Skeleton className="h-96" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout 
        title="Dashboard" 
        description="Resumen general del sistema de monitoreo de biodiversidad"
      >
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error cargando los datos del dashboard: {error.message}
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  const stats = data?.dashboardStats;

  // Preparar datos para las estadísticas
  const statsData = [
    {
      title: 'Total de Especies',
      value: stats?.totalSpecies || 0,
      description: 'Especies registradas en el sistema',
      icon: Leaf,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Métodos de Monitoreo',
      value: stats?.totalMethods || 0,
      description: 'Técnicas de monitoreo disponibles',
      icon: Microscope,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Ubicaciones',
      value: stats?.totalLocations || 0,
      description: 'Sitios de monitoreo activos',
      icon: MapPin,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Datos de Monitoreo',
      value: stats?.totalMonitoringData || 0,
      description: 'Registros de observación totales',
      icon: Database,
      trend: { value: 23, isPositive: true },
    },
  ];

  // Preparar datos para gráficos
  const speciesStatusData = stats?.speciesByStatus?.map((item: any) => ({
    name: getStatusText(item.status),
    value: item.count,
  })) || [];

  const methodTypeData = stats?.methodsByType?.map((item: any) => ({
    name: getMethodTypeText(item.type),
    value: item.count,
  })) || [];

  const monthlyData = stats?.dataByMonth?.map((item: any) => ({
    month: formatMonth(item.month),
    count: item.count,
  })) || [];

  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Resumen general del sistema de monitoreo de biodiversidad"
    >
      <div className="space-y-6">
        {/* Estadísticas principales */}
        <StatsGrid stats={statsData} />

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-2">
          <PieChartComponent
            data={speciesStatusData}
            title="Especies por Estado de Conservación"
            description="Distribución de especies según su estado de conservación"
          />
          
          <BarChartComponent
            data={methodTypeData}
            title="Métodos de Monitoreo por Tipo"
            description="Cantidad de métodos disponibles por categoría"
          />
        </div>

        {/* Tendencia temporal */}
        <LineChartComponent
          data={monthlyData}
          title="Datos de Monitoreo por Mes"
          description="Evolución temporal de los registros de monitoreo"
        />

        {/* Datos recientes */}
        <RecentData 
          data={stats?.recentData || []}
          title="Observaciones Recientes"
        />
      </div>
    </DashboardLayout>
  );
}

// Funciones auxiliares
function getStatusText(status: string): string {
  switch (status) {
    case 'LEAST_CONCERN':
      return 'Preocupación Menor';
    case 'NEAR_THREATENED':
      return 'Casi Amenazada';
    case 'VULNERABLE':
      return 'VULNERABLE';
      
    case 'ENDANGERED':
      return 'En Peligro';
    case 'CRITICALLY_ENDANGERED':
      return 'En Peligro Crítico';
    case 'EXTINCT_IN_THE_WILD':
      return 'Extinta en Vida Silvestre';
    case 'EXTINCT':
      return 'Extinta';
    default:
      return 'Datos Insuficientes';
  }
}

function getMethodTypeText(type: string): string {
  switch (type) {
    case 'GIS':
      return 'Sistemas GIS';
    case 'REMOTE_SENSING':
      return 'Sensores Remotos';
    case 'MOLECULAR':
      return 'Técnicas Moleculares';
    case 'AI':
      return 'Inteligencia Artificial';
    default:
      return type;
  }
}

function formatMonth(monthString: string): string {
  if (!monthString || !monthString.includes('-')) {
    return 'Fecha inválida';
  }

  const [year, month] = monthString.split('-');

  const monthIndex = parseInt(month, 10) - 1;
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  if (monthIndex < 0 || monthIndex > 11 || isNaN(monthIndex)) {
    return 'Fecha inválida';
  }

  return `${monthNames[monthIndex]} ${year}`;
}

