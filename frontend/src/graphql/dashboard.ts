import { gql } from '@apollo/client';

// Consulta para estadísticas del dashboard
export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      totalSpecies
      totalMethods
      totalLocations
      totalMonitoringData
      recentData {
        id
        date
        value
        unit
        verified
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
          country
        }
      }
      speciesByStatus {
        status
        count
      }
      methodsByType {
        type
        count
      }
      dataByMonth {
        month
        count
      }
    }
  }
`;

// Consultas para usuarios
export const GET_ME = gql`
  query GetMe {
    me {
      id
      clerkId
      email
      firstName
      lastName
      role
      institution
      specialization
      isActive
      lastLogin
      preferences {
        language
        notifications {
          email
          dashboard
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      clerkId
      email
      firstName
      lastName
      role
      institution
      specialization
      isActive
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      clerkId
      email
      firstName
      lastName
      role
      institution
      specialization
      isActive
      lastLogin
      preferences {
        language
        notifications {
          email
          dashboard
        }
      }
      createdAt
      updatedAt
    }
  }
`;

// Mutaciones para usuarios
export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      clerkId
      email
      firstName
      lastName
      role
      institution
      specialization
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      clerkId
      email
      firstName
      lastName
      role
      institution
      specialization
      isActive
      lastLogin
      preferences {
        language
        notifications {
          email
          dashboard
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

