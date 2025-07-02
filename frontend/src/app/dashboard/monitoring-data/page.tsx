'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
import { GET_ALL_MONITORING_DATA, DELETE_MONITORING_DATA } from '@/graphql/monitoring-data';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MonitoringData } from '@/types/maps';

export default function MonitoringDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, refetch } = useQuery(GET_ALL_MONITORING_DATA);
  const [deleteMonitoringData] = useMutation(DELETE_MONITORING_DATA);

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteMonitoringData({ variables: { id } });
      toast.success(`${name} ha sido eliminado exitosamente.`);
      refetch();
    } catch (error) {
      toast.error("No se pudo eliminar el dato de monitoreo.");
    }
  };

  const filteredData = data?.monitoringData?.filter((data: MonitoringData) =>
    data.species?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.location?.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;

  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Resumen general del sistema de monitoreo de biodiversidad"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Datos de Monitoreo</h1>
            <p className="text-gray-600 mt-2">
              Administra los datos de monitoreo en el sistema
            </p>
          </div>
          <Link href="/dashboard/monitoring-data/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Dato
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Datos ({filteredData.length})</span>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar datos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Especie</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>nota</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((data: MonitoringData) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{data.species?.name}</TableCell>
                    <TableCell>{data.location?.name}</TableCell>
                    <TableCell>{data.method?.name}</TableCell>
                    <TableCell>{data.notes}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/monitoring-data/${data.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/monitoring-data/${data.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente
                                el dato de monitoreo de "{data.species?.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(data.id, data.species?.name)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}