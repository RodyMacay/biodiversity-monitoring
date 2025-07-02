'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MonitoringDataForm } from '../../domain/components/form';
import { GET_MONITORING_DATA_BY_ID, UPDATE_MONITORING_DATA } from '@/graphql/monitoring-data';
import { MonitoringDataInput } from '@/types/monitoring-data';

interface PageProps {
  params: {
    monitoringDataId: string;
  };
}

export default function EditMonitoringDataPage({ params }: PageProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_MONITORING_DATA_BY_ID, {
    variables: { id: params.monitoringDataId }
  });
  const [updateMonitoringData, { loading: updating }] = useMutation(UPDATE_MONITORING_DATA);

  const handleSubmit = async (data: MonitoringDataInput) => {
    try {
      await updateMonitoringData({
        variables: { id: params.monitoringDataId, input: data }
      });
      
      toast.success(`Dato de monitoreo ha sido actualizado exitosamente.`);
      
      router.push('/dashboard/monitoring-data');
    } catch (error: any) {
      toast.error(error.message || "No se pudo actualizar el dato de monitoreo.");
    }
  };

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;

  const monitoringData = data?.monitoringDataById;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard/monitoring-data">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Datos
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Editar Dato de Monitoreo</h1>
        <p className="text-gray-600 mt-2">
          Actualiza la información del dato de monitoreo
        </p>
      </div>

      <MonitoringDataForm
        initialData={monitoringData}
        mode="edit"
        onSubmit={handleSubmit}
        isLoading={updating}
      />
    </div>
  );
}