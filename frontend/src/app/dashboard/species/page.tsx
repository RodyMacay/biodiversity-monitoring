'use client';

import { useQuery } from '@apollo/client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GET_ALL_SPECIES } from '@/graphql/species';
import { Plus, Search, Filter, AlertTriangle, Leaf } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function SpeciesPage() {
  const { data, loading, error } = useQuery(GET_ALL_SPECIES);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Least Concern':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Near Threatened':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Vulnerable':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Endangered':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Critically Endangered':
        return 'bg-red-100 text-red-900 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Least Concern':
        return 'Preocupación Menor';
      case 'Near Threatened':
        return 'Casi Amenazada';
      case 'Vulnerable':
        return 'Vulnerable';
      case 'Endangered':
        return 'En Peligro';
      case 'Critically Endangered':
        return 'En Peligro Crítico';
      case 'Extinct in the Wild':
        return 'Extinta en Vida Silvestre';
      case 'Extinct':
        return 'Extinta';
      default:
        return 'Datos Insuficientes';
    }
  };

  if (loading) {
    return (
      <DashboardLayout 
        title="Especies" 
        description="Gestión y monitoreo de especies registradas en el sistema"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout 
        title="Especies" 
        description="Gestión y monitoreo de especies registradas en el sistema"
      >
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error cargando las especies: {error.message}
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  const species = data?.species || [];

  return (
    <DashboardLayout 
      title="Especies" 
      description="Gestión y monitoreo de especies registradas en el sistema"
    >
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {species.length} especies registradas
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Especie
            </Button>
          </div>
        </div>

        {/* Tabla de especies */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Especies</CardTitle>
          </CardHeader>
          <CardContent>
            {species.length === 0 ? (
              <div className="text-center py-12">
                <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay especies registradas
                </h3>
                <p className="text-gray-500 mb-4">
                  Comienza agregando la primera especie al sistema
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Especie
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre Común</TableHead>
                      <TableHead>Nombre Científico</TableHead>
                      <TableHead>Estado de Conservación</TableHead>
                      <TableHead>Hábitat</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {species.map((specie: any) => (
                      <TableRow key={specie.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {specie.name}
                        </TableCell>
                        <TableCell className="italic text-gray-600">
                          {specie.scientificName}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(specie.conservationStatus)}
                          >
                            {getStatusText(specie.conservationStatus)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {specie.habitat || 'No especificado'}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {specie.createdAt && !isNaN(new Date(specie.createdAt).getTime())
                          ? format(new Date(specie.createdAt), 'dd MMM yyyy', { locale: es })
                          : 'Fecha no válida'}

                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

