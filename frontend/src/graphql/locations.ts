import { gql } from '@apollo/client';

// Consultas para ubicaciones
export const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    locations {
      id
      name
      coordinates {
        latitude
        longitude
      }
      description
      ecosystem
      area
      protectionStatus
      country
      region
      createdAt
      updatedAt
    }
  }
`;

export const GET_LOCATION_BY_ID = gql`
  query GetLocationById($id: ID!) {
    locationById(id: $id) {
      id
      name
      coordinates {
        latitude
        longitude
      }
      description
      ecosystem
      area
      protectionStatus
      country
      region
      createdAt
      updatedAt
      monitoringData {
        id
        date
        value
        unit
        notes
        dataQuality
        confidence
        verified
        species {
          id
          name
          scientificName
        }
        method {
          id
          name
          type
        }
      }
    }
  }
`;

export const GET_LOCATIONS_BY_ECOSYSTEM = gql`
  query GetLocationsByEcosystem($ecosystem: Ecosystem!) {
    locationsByEcosystem(ecosystem: $ecosystem) {
      id
      name
      coordinates {
        latitude
        longitude
      }
      description
      ecosystem
      area
      protectionStatus
      country
      region
      createdAt
      updatedAt
    }
  }
`;

export const GET_LOCATIONS_BY_COUNTRY = gql`
  query GetLocationsByCountry($country: String!) {
    locationsByCountry(country: $country) {
      id
      name
      coordinates {
        latitude
        longitude
      }
      description
      ecosystem
      area
      protectionStatus
      country
      region
      createdAt
      updatedAt
    }
  }
`;

// Mutaciones para ubicaciones
export const CREATE_LOCATION = gql`
  mutation CreateLocation($input: LocationInput!) {
    createLocation(input: $input) {
      id
      name
      coordinates {
        latitude
        longitude
      }
      description
      ecosystem
      area
      protectionStatus
      country
      region
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation UpdateLocation($id: ID!, $input: LocationInput!) {
    updateLocation(id: $id, input: $input) {
      id
      name
      coordinates {
        latitude
        longitude
      }
      description
      ecosystem
      area
      protectionStatus
      country
      region
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id)
  }
`;

