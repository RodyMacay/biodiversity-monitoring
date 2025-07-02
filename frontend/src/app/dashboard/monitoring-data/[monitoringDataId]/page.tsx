'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { GET_MONITORING_DATA_BY_ID, DELETE_MONITORING_DATA } from '@/graphql/monitoring-data';
import { MonitoringData } from '@/types/monitoring-data';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

interface PageProps {
  params: {
    monitoringDataId: string;
  };
}

export default function MonitoringDataDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_MONITORING_DATA_BY_ID, {
    variables: { id: params.monitoringDataId }
  });
  const [deleteMonitoringData] = useMutation(DELETE_MONITORING_DATA);

  const monitoringData: MonitoringData = data?.monitoringDataById;

  const handleDelete = async () => {
    try {
      await deleteMonitoringData({ variables: { id: params.monitoringDataId } });
      toast.success(`Dato de monitoreo ha sido eliminado exitosamente.`);
      router.push('/dashboard/monitoring-data');
    } catch (error: any) {
      toast.error(`No se pudo eliminar el dato de monitoreo.${error instanceof Error ? ` ${error.message}` : ''}`);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;

  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Resumen general del sistema de monitoreo de biodiversidad"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard/monitoring-data">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Datos
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dato de Monitoreo</h1>
              <p className="text-gray-600 mt-2">
                Detalles del registro de monitoreo
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/monitoring-data/${params.monitoringDataId}/edit`}>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-500">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará permanentemente
                      este dato de monitoreo y todos sus datos asociados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Especie</h3>
                <p className="mt-1 text-sm">
                  {monitoringData.species?.name} ({monitoringData.species?.scientificName})
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ubicación</h3>
                <p className="mt-1 text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {monitoringData.location?.name}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
                <p className="mt-1 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(monitoringData.date).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Detalles del Monitoreo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Método</h3>
                <p className="mt-1 text-sm">
                  {monitoringData.method?.name}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Cantidad</h3>
                <p className="mt-1 text-sm">
                  {monitoringData.quantity}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notas</h3>
                <p className="mt-1 text-sm">
                  {monitoringData.notes || 'No hay notas adicionales'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}