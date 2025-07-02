'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MonitoringDataForm } from '../domain/components/form';
import { CREATE_MONITORING_DATA } from '@/graphql/monitoring-data';
import { MonitoringDataInput } from '@/types/monitoring-data';

export default function CreateMonitoringDataPage() {
  const router = useRouter();
  const [createMonitoringData, { loading }] = useMutation(CREATE_MONITORING_DATA);

  const handleSubmit = async (data: MonitoringDataInput) => {
    try {
      await createMonitoringData({
        variables: { input: data }
      });
      
      toast.success(`Dato de monitoreo ha sido creado exitosamente.`);
      
      router.push('/dashboard/monitoring-data');
    } catch (error: any) {
      toast.error(error.message || "No se pudo crear el dato de monitoreo.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard/monitoring-data">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Datos
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Crear Nuevo Dato de Monitoreo</h1>
        <p className="text-gray-600 mt-2">
          Agrega un nuevo dato al sistema de monitoreo
        </p>
      </div>

      <MonitoringDataForm
        mode="create"
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
}