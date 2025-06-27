'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SpeciesForm } from '../domain/components/form';
import { CREATE_SPECIES } from '@/graphql/species';
import { SpeciesInput } from '@/types/specie';

export default function CreateSpeciesPage() {
  const router = useRouter();
  const [createSpecies, { loading }] = useMutation(CREATE_SPECIES);

  const handleSubmit = async (data: SpeciesInput) => {
    try {
      await createSpecies({
        variables: { input: data }
      });
      
      toast.success(`${data.name} ha sido creada exitosamente.`);
      
      router.push('/dashboard/species');
    } catch (error: any) {
      toast.error(error.message || "No se pudo crear la especie.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard/species">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Especies
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Crear Nueva Especie</h1>
        <p className="text-gray-600 mt-2">
          Agrega una nueva especie al sistema de monitoreo
        </p>
      </div>

      <SpeciesForm
        mode="create"
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
}