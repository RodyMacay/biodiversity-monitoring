'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UbicationForm } from '../domain/components/form';
import { CREATE_LOCATION } from '@/graphql/queries';
import { LocationInput } from '@/types/maps';

export default function CreateUbicationPage() {
  const router = useRouter();
  const [createLocation, { loading }] = useMutation(CREATE_LOCATION);

  const handleSubmit = async (data: LocationInput) => {
    try {
      await createLocation({
        variables: { input: data }
      });
      
      toast.success(`${data.name} ha sido creada exitosamente.`);
      
      router.push('/dashboard/ubications');
    } catch (error: any) {
      toast.error(error.message || "No se pudo crear la ubicación.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard/ubications">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Ubicaciones
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Crear Nueva Ubicación</h1>
        <p className="text-gray-600 mt-2">
          Agrega una nueva ubicación al sistema de monitoreo
        </p>
      </div>

      <UbicationForm
        mode="create"
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
}