'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { GET_ALL_SPECIES, DELETE_SPECIES } from '@/graphql/species';
import { Species } from '@/types/specie';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const statusColors = {
  LEAST_CONCERN: 'bg-green-100 text-green-800',
  NEAR_THREATENED: 'bg-yellow-100 text-yellow-800',
  VULNERABLE: 'bg-orange-100 text-orange-800',
  ENDANGERED: 'bg-red-100 text-red-800',
  CRITICALLY_ENDANGERED: 'bg-red-200 text-red-900',
  EXTINCT_IN_THE_WILD: 'bg-gray-100 text-gray-800',
  EXTINCT: 'bg-black text-white',
  DATA_DEFICIENT: 'bg-blue-100 text-blue-800'
};

const statusLabels = {
  LEAST_CONCERN: 'Preocupación Menor',
  NEAR_THREATENED: 'Casi Amenazada',
  VULNERABLE: 'Vulnerable',
  ENDANGERED: 'En Peligro',
  CRITICALLY_ENDANGERED: 'En Peligro Crítico',
  EXTINCT_IN_THE_WILD: 'Extinta en Estado Silvestre',
  EXTINCT: 'Extinta',
  DATA_DEFICIENT: 'Datos Insuficientes'
};

export default function SpeciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, refetch } = useQuery(GET_ALL_SPECIES);
  const [deleteSpecies] = useMutation(DELETE_SPECIES);

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteSpecies({ variables: { id } });
      toast.success(`${name} ha sido eliminada exitosamente.`);
      refetch();
    } catch (error) {
      toast.error("No se pudo eliminar la especie.");
    }
  };

  const filteredSpecies = data?.species?.filter((species: Species) =>
    species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    species.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold">Gestión de Especies</h1>
          <p className="text-gray-600 mt-2">
            Administra las especies en el sistema de monitoreo
          </p>
        </div>
        <Link href="/dashboard/species/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Especie
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Especies ({filteredSpecies.length})</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar especies..."
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
                <TableHead>Nombre Científico</TableHead>
                <TableHead>Estado de Conservación</TableHead>
                <TableHead>Hábitat</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecies.map((species: Species) => (
                <TableRow key={species.id}>
                  <TableCell className="font-medium">{species.name}</TableCell>
                  <TableCell className="italic text-gray-600">
                    {species.scientificName}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[species.conservationStatus]}>
                      {statusLabels[species.conservationStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>{species.habitat || 'No especificado'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/species/${species.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/species/${species.id}/edit`}>
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
                              la especie "{species.name}" y todos sus datos asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(species.id, species.name)}
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