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
  FormDescription,
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
import { Species, SpeciesInput, ConservationStatus } from '@/types/specie';

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  scientificName: z.string().min(1, 'El nombre científico es requerido'),
  description: z.string().optional(),
  conservationStatus: z.nativeEnum(ConservationStatus),
  imageUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  habitat: z.string().optional(),
});

interface SpeciesFormProps {
  initialData?: Species;
  onSubmit: (data: SpeciesInput) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const statusOptions = [
  { value: ConservationStatus.LEAST_CONCERN, label: 'Preocupación Menor' },
  { value: ConservationStatus.NEAR_THREATENED, label: 'Casi Amenazada' },
  { value: ConservationStatus.VULNERABLE, label: 'Vulnerable' },
  { value: ConservationStatus.ENDANGERED, label: 'En Peligro' },
  { value: ConservationStatus.CRITICALLY_ENDANGERED, label: 'En Peligro Crítico' },
  { value: ConservationStatus.EXTINCT_IN_THE_WILD, label: 'Extinta en Estado Silvestre' },
  { value: ConservationStatus.EXTINCT, label: 'Extinta' },
  { value: ConservationStatus.DATA_DEFICIENT, label: 'Datos Insuficientes' },
];

export function SpeciesForm({ initialData, onSubmit, isLoading, mode }: SpeciesFormProps) {
  const form = useForm<SpeciesInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      scientificName: initialData?.scientificName || '',
      description: initialData?.description || '',
      conservationStatus: initialData?.conservationStatus || ConservationStatus.DATA_DEFICIENT,
      imageUrl: initialData?.imageUrl || '',
      habitat: initialData?.habitat || '',
    },
  });

  const handleSubmit = async (data: SpeciesInput) => {
    await onSubmit(data);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Crear Nueva Especie' : 'Editar Especie'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Común *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Jaguar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scientificName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Científico *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Panthera onca" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="conservationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado de Conservación *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              name="habitat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hábitat</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Selva tropical" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Imagen</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://ejemplo.com/imagen.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    URL de una imagen representativa de la especie
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descripción detallada de la especie..."
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
                {isLoading ? 'Guardando...' : mode === 'create' ? 'Crear Especie' : 'Actualizar Especie'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}