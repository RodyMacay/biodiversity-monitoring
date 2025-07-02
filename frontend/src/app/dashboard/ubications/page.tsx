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
import { GET_ALL_LOCATIONS, DELETE_LOCATION } from '@/graphql/queries';
import { Location } from '@/types/maps';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function UbicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, refetch } = useQuery(GET_ALL_LOCATIONS);
  const [deleteLocation] = useMutation(DELETE_LOCATION);

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteLocation({ variables: { id } });
      toast.success(`${name} ha sido eliminada exitosamente.`);
      refetch();
    } catch (error) {
      toast.error("No se pudo eliminar la ubicación.");
    }
  };

  const filteredLocations = data?.locations?.filter((location: Location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold">Gestión de Ubicaciones</h1>
            <p className="text-gray-600 mt-2">
              Administra las ubicaciones en el sistema de monitoreo
            </p>
          </div>
          <Link href="/dashboard/ubications/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Ubicación
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Ubicaciones ({filteredLocations.length})</span>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar ubicaciones..."
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
                  <TableHead>Nombre</TableHead>
                  <TableHead>Coordenadas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location: Location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>
                      {location.coordinates.latitude}, {location.coordinates.longitude}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/ubications/${location.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/ubications/${location.id}/edit`}>
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
                                la ubicación "{location.name}" y todos sus datos asociados.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(location.id, location.name)}
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