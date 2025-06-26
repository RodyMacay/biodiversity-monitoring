import { gql } from '@apollo/client';

// Consultas para métodos de monitoreo
export const GET_ALL_MONITORING_METHODS = gql`
  query GetAllMonitoringMethods {
    monitoringMethods {
      id
      name
      type
      description
      applications
      accuracy
      costEfficiency
      equipment
      createdAt
      updatedAt
    }
  }
`;

export const GET_MONITORING_METHOD_BY_ID = gql`
  query GetMonitoringMethodById($id: ID!) {
    monitoringMethodById(id: $id) {
      id
      name
      type
      description
      applications
      accuracy
      costEfficiency
      equipment
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
        location {
          id
          name
          coordinates {
            latitude
            longitude
          }
        }
      }
    }
  }
`;

export const GET_MONITORING_METHODS_BY_TYPE = gql`
  query GetMonitoringMethodsByType($type: MethodType!) {
    monitoringMethodsByType(type: $type) {
      id
      name
      type
      description
      applications
      accuracy
      costEfficiency
      equipment
      createdAt
      updatedAt
    }
  }
`;

// Mutaciones para métodos de monitoreo
export const CREATE_MONITORING_METHOD = gql`
  mutation CreateMonitoringMethod($input: MonitoringMethodInput!) {
    createMonitoringMethod(input: $input) {
      id
      name
      type
      description
      applications
      accuracy
      costEfficiency
      equipment
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_MONITORING_METHOD = gql`
  mutation UpdateMonitoringMethod($id: ID!, $input: MonitoringMethodInput!) {
    updateMonitoringMethod(id: $id, input: $input) {
      id
      name
      type
      description
      applications
      accuracy
      costEfficiency
      equipment
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_MONITORING_METHOD = gql`
  mutation DeleteMonitoringMethod($id: ID!) {
    deleteMonitoringMethod(id: $id)
  }
`;

