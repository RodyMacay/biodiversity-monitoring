
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Species {
  id: string;
  name?: string;
  scientificName?: string;
  conservationStatus?: string;
  imageUrl?: string;
}

export interface MonitoringData {
  id: string;
  species?: Species;
  dateRecorded?: string;
  count?: number;
  notes?: string;
  location?: {
    name: string;
  };
  dataQuality?: string;
  date?: Date;
  method?: {
    id: string;
    name: string;
  };
  quantity?: number;
  unit?: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  ecosystem: string;
  country: string;
  region?: string;
  coordinates: Coordinates;
  monitoringData?: MonitoringData[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationSummary {
  id: string;
  name: string;
  coordinates: Coordinates;
  speciesCount?: number;
  ecosystem?: string;
}

export interface ConservationStats {
  critical: number;
  endangered: number;
  vulnerable: number;
  stable: number;
  unknown: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapFilters {
  ecosystem?: string[];
  conservationStatus?: string[];
  country?: string[];
  hasSpecies?: boolean;
}

// Enums para valores consistentes
export enum ConservationStatus {
  CRITICALLY_ENDANGERED = 'Critically Endangered',
  ENDANGERED = 'Endangered', 
  VULNERABLE = 'Vulnerable',
  NEAR_THREATENED = 'Near Threatened',
  LEAST_CONCERN = 'Least Concern',
  DATA_DEFICIENT = 'Data Deficient',
  NOT_EVALUATED = 'Not Evaluated'
}

export enum EcosystemType {
  TROPICAL_RAINFOREST = 'Tropical Rainforest',
  TEMPERATE_FOREST = 'Temperate Forest',
  BOREAL_FOREST = 'Boreal Forest',
  GRASSLAND = 'Grassland',
  SAVANNA = 'Savanna',
  DESERT = 'Desert',
  TUNDRA = 'Tundra',
  WETLAND = 'Wetland',
  MARINE = 'Marine',
  FRESHWATER = 'Freshwater',
  MOUNTAIN = 'Mountain',
  COASTAL = 'Coastal'
}

// Props de componentes
export interface LocationsMapProps {
  className?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
  onLocationSelect?: (location: Location) => void;
  filters?: MapFilters;
}

export interface LocationDetailsProps {
  locationId: string;
  onClose?: () => void;
  className?: string;
}

export interface MapMarkerProps {
  location: LocationSummary;
  isSelected?: boolean;
  onClick?: (location: LocationSummary) => void;
}

// Estados de la aplicación
export interface MapState {
  selectedLocationId: string | null;
  mapCenter: [number, number];
  mapZoom: number;
  filters: MapFilters;
  isLoading: boolean;
  error: string | null;
}

// Respuestas de la API
export interface GetLocationsResponse {
  locations: LocationSummary[];
}

export interface GetLocationDetailsResponse {
  locationById: Location;
}