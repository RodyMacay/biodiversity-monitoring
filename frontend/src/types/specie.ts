export interface Species {
  id: string | number;
  name: string;
  scientificName: string;
  conservationStatus: string;
  habitat: string | null;
  description: string | null;
  createdAt: string;
}

export enum ConservationStatus {
  LEAST_CONCERN = 'LEAST_CONCERN',
  NEAR_THREATENED = 'NEAR_THREATENED',
  VULNERABLE = 'VULNERABLE',
  ENDANGERED = 'ENDANGERED',
  CRITICALLY_ENDANGERED = 'CRITICALLY_ENDANGERED',
  EXTINCT_IN_THE_WILD = 'EXTINCT_IN_THE_WILD',
  EXTINCT = 'EXTINCT',
  DATA_DEFICIENT = 'DATA_DEFICIENT'
}

export interface SpeciesInput {
  name: string;
  scientificName: string;
  description?: string;
  conservationStatus: ConservationStatus;
  imageUrl?: string;
  habitat?: string;
}

export interface MonitoringData {
  id: string;
  date: string;
  value: number;
  unit: string;
  notes?: string;
  dataQuality: string;
  confidence: number;
  verified: boolean;
  method: {
    id: string;
    name: string;
    type: string;
  };
  location: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}