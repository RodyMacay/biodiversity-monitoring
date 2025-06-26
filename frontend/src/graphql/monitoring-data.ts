import { gql } from '@apollo/client';

// Consultas para datos de monitoreo
export const GET_ALL_MONITORING_DATA = gql`
  query GetAllMonitoringData {
    monitoringData {
      id
      date
      value
      unit
      notes
      dataQuality
      confidence
      researcher
      verified
      verifiedBy
      verifiedAt
      weather {
        temperature
        humidity
        conditions
      }
      attachments {
        filename
        url
        type
      }
      species {
        id
        name
        scientificName
        conservationStatus
      }
      method {
        id
        name
        type
      }
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
        ecosystem
        country
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MONITORING_DATA_BY_ID = gql`
  query GetMonitoringDataById($id: ID!) {
    monitoringDataById(id: $id) {
      id
      date
      value
      unit
      notes
      dataQuality
      confidence
      researcher
      verified
      verifiedBy
      verifiedAt
      weather {
        temperature
        humidity
        conditions
      }
      attachments {
        filename
        url
        type
      }
      species {
        id
        name
        scientificName
        conservationStatus
      }
      method {
        id
        name
        type
        description
      }
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
        ecosystem
        country
        region
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_MONITORING_DATA_BY_SPECIES = gql`
  query GetMonitoringDataBySpecies($speciesId: ID!) {
    monitoringDataBySpecies(speciesId: $speciesId) {
      id
      date
      value
      unit
      notes
      dataQuality
      confidence
      verified
      method {
        id
        name
        type
      }
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
      }
      createdAt
    }
  }
`;

export const GET_MONITORING_DATA_BY_METHOD = gql`
  query GetMonitoringDataByMethod($methodId: ID!) {
    monitoringDataByMethod(methodId: $methodId) {
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
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
      }
      createdAt
    }
  }
`;

export const GET_MONITORING_DATA_BY_LOCATION = gql`
  query GetMonitoringDataByLocation($locationId: ID!) {
    monitoringDataByLocation(locationId: $locationId) {
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
      createdAt
    }
  }
`;

export const GET_MONITORING_DATA_BY_DATE_RANGE = gql`
  query GetMonitoringDataByDateRange($startDate: String!, $endDate: String!) {
    monitoringDataByDateRange(startDate: $startDate, endDate: $endDate) {
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
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
      }
      createdAt
    }
  }
`;

// Mutaciones para datos de monitoreo
export const CREATE_MONITORING_DATA = gql`
  mutation CreateMonitoringData($input: MonitoringDataInput!) {
    createMonitoringData(input: $input) {
      id
      date
      value
      unit
      notes
      dataQuality
      confidence
      researcher
      verified
      weather {
        temperature
        humidity
        conditions
      }
      attachments {
        filename
        url
        type
      }
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
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_MONITORING_DATA = gql`
  mutation UpdateMonitoringData($id: ID!, $input: MonitoringDataInput!) {
    updateMonitoringData(id: $id, input: $input) {
      id
      date
      value
      unit
      notes
      dataQuality
      confidence
      researcher
      verified
      weather {
        temperature
        humidity
        conditions
      }
      attachments {
        filename
        url
        type
      }
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
      location {
        id
        name
        coordinates {
          latitude
          longitude
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_MONITORING_DATA = gql`
  mutation DeleteMonitoringData($id: ID!) {
    deleteMonitoringData(id: $id)
  }
`;

export const VERIFY_MONITORING_DATA = gql`
  mutation VerifyMonitoringData($id: ID!) {
    verifyMonitoringData(id: $id) {
      id
      verified
      verifiedBy
      verifiedAt
    }
  }
`;

