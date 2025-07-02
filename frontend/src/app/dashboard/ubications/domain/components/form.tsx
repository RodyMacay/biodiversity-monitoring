import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LocationInput } from '@/types/maps';

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }),
  description: z.string().optional(),
  ecosystem: z.enum(["FOREST", "MARINE", "FRESHWATER", "GRASSLAND", "DESERT", "TUNDRA", "URBAN", "AGRICULTURAL"]),
  area: z.number().min(0).optional(),
  protectionStatus: z.enum(["PROTECTED", "PARTIALLY_PROTECTED", "UNPROTECTED"]).default('UNPROTECTED'),
  country: z.string().min(1, { message: 'El país es requerido' }),
  region: z.string().optional(),
});

interface UbicationFormProps {
  initialData?: LocationInput;
  onSubmit: (data: LocationInput) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export function UbicationForm({ 
  initialData, 
  onSubmit, 
  isLoading, 
  mode 
}: UbicationFormProps) {
  const form = useForm<LocationInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      coordinates: {
        latitude: initialData?.coordinates?.latitude || 0,
        longitude: initialData?.coordinates?.longitude || 0
      },
      description: initialData?.description || '',
      ecosystem: initialData?.ecosystem || 'FOREST',
      area: initialData?.area || undefined,
      protectionStatus: initialData?.protectionStatus || 'UNPROTECTED',
      country: initialData?.country || '',
      region: initialData?.region || '',
    },
  });

  const handleSubmit = async (data: LocationInput) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la ubicación" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coordinates.latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitud</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.000001"
                    placeholder="Latitud" 
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
            name="coordinates.longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitud</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.000001"
                    placeholder="Longitud" 
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
            name="ecosystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ecosistema</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {["FOREST", "MARINE", "FRESHWATER", "GRASSLAND", "DESERT", "TUNDRA", "URBAN", "AGRICULTURAL"].map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="protectionStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado de Protección</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {["PROTECTED", "PARTIALLY_PROTECTED", "UNPROTECTED"].map((status) => (
                      <option key={status} value={status}>
                        {status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input placeholder="País" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Región</FormLabel>
                <FormControl>
                  <Input placeholder="Región" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área (km²)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="Área en km²" 
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción adicional" {...field} />
              </FormControl>
              <FormDescription>
                Información adicional sobre la ubicación.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : mode === 'create' ? 'Crear Ubicación' : 'Actualizar Ubicación'}
          </Button>
        </div>
      </form>
    </Form>
  );
}