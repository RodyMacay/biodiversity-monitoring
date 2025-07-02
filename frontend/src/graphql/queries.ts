import { gql } from '@apollo/client';

export const GET_ALL_SPECIES = gql`
  query GetAllSpecies {
    species {
      id
      name
      scientificName
    }
  }
`;

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

export const GET_ALL_MONITORING_METHODS = gql`
  query GetAllMethods {
    monitoringMethods {
      id
      name
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
      ecosystem
      description
    }
  }
`;

export const CREATE_LOCATION = gql`
  mutation CreateLocation($input: LocationInput!) {
    createLocation(input: $input) {
      id
      name
      coordinates {
        latitude
        longitude
      }
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
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id) {
      id
    }
  }
`;

export const GET_MONITORING_DATA_BY_ID = gql`
  query GetMonitoringDataById($id: ID!) {
    monitoringDataById(id: $id) {
      id
      species {
        id
        name
        scientificName
      }
      location {
        id
        name
      }
      method {
        id
        name
      }
      date
      quantity
      notes
    }
  }
`;

export const GET_ALL_MONITORING_DATA = gql`
  query GetAllMonitoringData {
    monitoringData {
      id
      species {
        id
        name
      }
      location {
        id
        name
      }
      date
      method {
        id
        name
      }
      quantity
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

