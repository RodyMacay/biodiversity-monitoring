'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft, Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { GET_SPECIES_BY_ID, DELETE_SPECIES } from '@/graphql/species';
import { Species } from '@/types/specie';

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

interface PageProps {
  params: {
    speciesId: string;
  };
}

export default function SpeciesDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_SPECIES_BY_ID, {
    variables: { id: params.speciesId }
  });
  const [deleteSpecies] = useMutation(DELETE_SPECIES);

  const species: Species = data?.speciesById;

  const handleDelete = async () => {
    try {
      await deleteSpecies({ variables: { id: params.speciesId } });
      toast.success(`${species.name} ha sido eliminada exitosamente.`);
      router.push('/dashboard/species');
    } catch (error:unknown) {
      toast.error(`No se pudo eliminar la especie.${error instanceof Error ? ` ${error.message}` : ''}`);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;
  if (!species) return <div className="text-center p-8">Especie no encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard/species">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Especies
          </Button>
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{species.name}</h1>
            <p className="text-xl text-gray-600 italic mt-1">{species.scientificName}</p>
            <Badge className={`mt-2 ${statusColors[species.conservationStatus as keyof typeof statusColors]}`}>
              {statusLabels[species.conservationStatus as keyof typeof statusLabels]}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Link href={`/dashboard/species/${species.id}/edit`}>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </Link>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Información General</TabsTrigger>
          <TabsTrigger value="monitoring">Datos de Monitoreo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {species.description || 'No hay descripción disponible.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
                        Hábitat
                      </h4>
                      <p className="mt-1">{species.habitat || 'No especificado'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
                        Estado de Conservación
                      </h4>
                      <p className="mt-1">{statusLabels[species.conservationStatus as keyof typeof statusLabels]}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
                        Fecha de Creación
                      </h4>
                      <p className="mt-1">
                        {new Date(species.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
                        Última Actualización
                      </h4>
                      <p className="mt-1">
                        {new Date(species.updatedAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Datos de Monitoreo</span>
                <Badge variant="outline">
                  {species.monitoringData?.length || 0} registros
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {species.monitoringData && species.monitoringData.length > 0 ? (
                <div className="space-y-4">
                  {species.monitoringData.map((data) => (
                    <div key={data.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{data.method.name}</h4>
                          <p className="text-sm text-gray-600">{data.method.type}</p>
                        </div>
                        <Badge variant={data.verified ? "default" : "secondary"}>
                          {data.verified ? "Verificado" : "Pendiente"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-sm font-medium">Valor</p>
                          <p className="text-lg">{data.value} {data.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Confianza</p>
                          <p className="text-lg">{(data.confidence * 100).toFixed(1)}%</p>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">Fecha</p>
                            <p>{new Date(data.date).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">Ubicación</p>
                            <p>{data.location.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      {data.notes && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium mb-1">Notas:</p>
                          <p className="text-sm text-gray-600">{data.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay datos de monitoreo disponibles para esta especie.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}