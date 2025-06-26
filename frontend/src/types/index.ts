import { type Location, type Species } from '@prisma/client';

export type LocationWithSpecies = Location & {
  species: Species[];
};