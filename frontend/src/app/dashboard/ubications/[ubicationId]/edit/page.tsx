'use client';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { GET_LOCATION_BY_ID, UPDATE_LOCATION } from '@/graphql/queries';
import { LocationInput } from '@/types/maps';
import { UbicationForm } from '../../domain/components/form';

interface PageProps {
  params: {
    ubicationId: string;
  };
}

export default function EditUbicationPage({ params }: PageProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_LOCATION_BY_ID, {
    variables: { id: params.ubicationId }
  });
  const [updateLocation, { loading: updating }] = useMutation(UPDATE_LOCATION);

  const location = data?.locationById;

  const handleSubmit = async (formData: LocationInput) => {
    try {
      await updateLocation({
        variables: { 
          id: params.ubicationId,
          input: formData 
        }
      });
      
      toast.success(`${formData.name} ha sido actualizada exitosamente.`);
      
      router.push(`/dashboard/ubications/${params.ubicationId}`);
    } catch (error: any) {
      toast.error(error.message || "No se pudo actualizar la ubicación.");
    }
  };

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;
  if (!location) return <div className="text-center p-8">Ubicación no encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/dashboard/ubications/${params.ubicationId}`}>
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Detalles
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Editar Ubicación</h1>
        <p className="text-gray-600 mt-2">
          Modifica la información de {location.name}
        </p>
      </div>

      <UbicationForm
        mode="edit"
        initialData={location}
        onSubmit={handleSubmit}
        isLoading={updating}
      />
    </div>
  );
}