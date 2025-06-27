'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SpeciesForm } from '../../domain/components/form';
import { GET_SPECIES_BY_ID, UPDATE_SPECIES } from '@/graphql/species';
import { SpeciesInput } from '@/types/specie';

interface PageProps {
  params: {
    speciesId: string;
  };
}

export default function EditSpeciesPage({ params }: PageProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_SPECIES_BY_ID, {
    variables: { id: params.speciesId }
  });
  const [updateSpecies, { loading: updating }] = useMutation(UPDATE_SPECIES);

  const species = data?.speciesById;

  const handleSubmit = async (formData: SpeciesInput) => {
    try {
      await updateSpecies({
        variables: { 
          id: params.speciesId,
          input: formData 
        }
      });
      
      toast.success(`${formData.name} ha sido actualizada exitosamente.`);
      
      router.push(`/dashboard/species/${params.speciesId}`);
    } catch (error: any) {
      toast.error(error.message || "No se pudo actualizar la especie.");
    }
  };

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;
  if (!species) return <div className="text-center p-8">Especie no encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/dashboard/species/${params.speciesId}`}>

          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Detalles
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Editar Especie</h1>
        <p className="text-gray-600 mt-2">
          Modifica la información de {species.name}
        </p>
      </div>

      <SpeciesForm
        mode="edit"
        initialData={species}
        onSubmit={handleSubmit}
        isLoading={updating}
      />
    </div>
  );
}