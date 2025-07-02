'use client';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft, Edit, Trash2, MapPin } from 'lucide-react';
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
import { GET_LOCATION_BY_ID, DELETE_LOCATION } from '@/graphql/queries';
import { Location } from '@/types/maps';

interface PageProps {
  params: {
    ubicationId: string;
  };
}

export default function UbicationDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_LOCATION_BY_ID, {
    variables: { id: params.ubicationId }
  });
  const [deleteLocation] = useMutation(DELETE_LOCATION);

  const location: Location = data?.locationById;

  const handleDelete = async () => {
    try {
      await deleteLocation({ variables: { id: params.ubicationId } });
      toast.success(`${location.name} ha sido eliminada exitosamente.`);
      router.push('/dashboard/ubications');
    } catch (error:unknown) {
      toast.error(`No se pudo eliminar la ubicación.${error instanceof Error ? ` ${error.message}` : ''}`);
    }
  };

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;
  if (!location) return <div className="text-center p-8">Ubicación no encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard/ubications">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Ubicaciones
          </Button>
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{location.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {location.coordinates.latitude}, {location.coordinates.longitude}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link href={`/dashboard/ubications/${location.id}/edit`}>
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
                    la ubicación "{location.name}" y todos sus datos asociados.
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

      <Card>
        <CardHeader>
          <CardTitle>Información de la Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Ecosistema</h3>
            <p className="text-gray-600">{location.ecosystem || 'No especificado'}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Descripción</h3>
            <p className="text-gray-600">{location.description || 'No especificado'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}