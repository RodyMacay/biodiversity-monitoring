import { type LocationWithSpecies } from '@/types';

export async function getLocationsWithSpecies(): Promise<LocationWithSpecies[]> {
  const response = await fetch('/api/locations');
  if (!response.ok) {
    throw new Error('Error al obtener ubicaciones');
  }
  return response.json();
}