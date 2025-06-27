import { gql } from '@apollo/client';

export const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    locations {
      id
      name
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const GET_LOCATION_DETAILS = gql`
  query GetLocationDetails($locationId: ID!) {
    locationById(id: $locationId) {
      id
      name
      description
      ecosystem
      country
      region
      monitoringData {
        id
        species {
          id
          name
          scientificName
          conservationStatus
          description
        }
      }
    }
  }
`;