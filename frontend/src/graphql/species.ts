import { gql } from '@apollo/client';

// Consultas para especies
export const GET_ALL_SPECIES = gql`
  query GetAllSpecies {
    species {
      id
      name
      scientificName
      description
      conservationStatus
      imageUrl
      habitat
      createdAt
      updatedAt
    }
  }
`;

export const GET_SPECIES_BY_ID = gql`
  query GetSpeciesById($id: ID!) {
    speciesById(id: $id) {
      id
      name
      scientificName
      description
      conservationStatus
      imageUrl
      habitat
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
      }
    }
  }
`;

export const GET_SPECIES_BY_STATUS = gql`
  query GetSpeciesByStatus($status: ConservationStatus!) {
    speciesByStatus(status: $status) {
      id
      name
      scientificName
      description
      conservationStatus
      imageUrl
      habitat
      createdAt
      updatedAt
    }
  }
`;

// Mutaciones para especies
export const CREATE_SPECIES = gql`
  mutation CreateSpecies($input: SpeciesInput!) {
    createSpecies(input: $input) {
      id
      name
      scientificName
      description
      conservationStatus
      imageUrl
      habitat
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SPECIES = gql`
  mutation UpdateSpecies($id: ID!, $input: SpeciesInput!) {
    updateSpecies(id: $id, input: $input) {
      id
      name
      scientificName
      description
      conservationStatus
      imageUrl
      habitat
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SPECIES = gql`
  mutation DeleteSpecies($id: ID!) {
    deleteSpecies(id: $id)
  }
`;

