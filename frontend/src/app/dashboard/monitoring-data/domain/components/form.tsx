'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MonitoringDataInput } from '@/types/monitoring-data';
import { useQuery } from '@apollo/client';
import { GET_ALL_SPECIES, GET_ALL_LOCATIONS, GET_ALL_MONITORING_METHODS } from '@/graphql/queries';

const dataQualityOptions = ['HIGH', 'MEDIUM', 'LOW'] as const;

const formSchema = z.object({
  speciesId: z.string().min(1, 'La especie es requerida'),
  locationId: z.string().min(1, 'La ubicación es requerida'),
  date: z.string().min(1, 'La fecha es requerida'),
  methodId: z.string().min(1, 'El método es requerido'),
  value: z.number().min(0, 'El valor debe ser mayor o igual a 0'),
  unit: z.string().min(1, 'La unidad es requerida'),
  researcher: z.string().min(1, 'El nombre del investigador es requerido'),
  confidence: z.number().min(0).max(100, 'El nivel de confianza debe estar entre 0 y 100'),
  dataQuality: z.enum(dataQualityOptions),
  notes: z.string().optional(),
});

interface MonitoringDataFormProps {
  initialData?: MonitoringDataInput;
  onSubmit: (data: MonitoringDataInput) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export function MonitoringDataForm({ initialData, onSubmit, isLoading, mode }: MonitoringDataFormProps) {
  const { data: speciesData } = useQuery(GET_ALL_SPECIES);
  const { data: locationsData } = useQuery(GET_ALL_LOCATIONS);
  const { data: methodsData } = useQuery(GET_ALL_MONITORING_METHODS);

  const form = useForm<MonitoringDataInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      speciesId: initialData?.speciesId || '',
      locationId: initialData?.locationId || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      methodId: initialData?.methodId || '',
      value: initialData?.value || 1,
      unit: initialData?.unit || '',
      researcher: initialData?.researcher || '',
      confidence: initialData?.confidence ?? 50,
      dataQuality: initialData?.dataQuality || 'MEDIUM',
      notes: initialData?.notes || '',
    },
  });

  const handleSubmit = async (data: MonitoringDataInput) => {
    await onSubmit(data);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Crear Nuevo Dato' : 'Editar Dato'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="speciesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especie *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una especie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {speciesData?.species?.map((species: any) => (
                          <SelectItem key={species.id} value={species.id}>
                            {species.name} ({species.scientificName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una ubicación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationsData?.locations?.map((location: any) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="methodId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un método" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {methodsData?.monitoringMethods?.map((method: any) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad *</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: individuos, m², ppm..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="researcher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investigador *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del investigador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confianza (%) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dataQuality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calidad de Datos *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona calidad de datos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataQualityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0) + option.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observaciones adicionales..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Guardando...' : mode === 'create' ? 'Crear Dato' : 'Actualizar Dato'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
