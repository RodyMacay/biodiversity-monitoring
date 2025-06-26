const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipos de datos principales

  type User {
    id: ID!
    clerkId: String!
    email: String!
    firstName: String!
    lastName: String!
    role: UserRole!
    institution: String
    specialization: String
    isActive: Boolean!
    lastLogin: String
    preferences: UserPreferences
    createdAt: String!
    updatedAt: String!
  }

  type UserPreferences {
    language: String!
    notifications: NotificationSettings!
  }

  type NotificationSettings {
    email: Boolean!
    dashboard: Boolean!
  }

  enum UserRole {
    investigador
    administrador
    observador
  }

  type Species {
    id: ID!
    name: String!
    scientificName: String!
    description: String
    conservationStatus: ConservationStatus!
    imageUrl: String
    habitat: String
    createdBy: String!
    createdAt: String!
    updatedAt: String!
    monitoringData: [MonitoringData!]!
  }

  enum ConservationStatus {
    LEAST_CONCERN
    NEAR_THREATENED
    VULNERABLE
    ENDANGERED
    CRITICALLY_ENDANGERED
    EXTINCT_IN_THE_WILD
    EXTINCT
    DATA_DEFICIENT
  }

  type MonitoringMethod {
    id: ID!
    name: String!
    type: MethodType!
    description: String!
    applications: [String!]!
    accuracy: Float
    costEfficiency: CostEfficiency!
    equipment: [String!]!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
    monitoringData: [MonitoringData!]!
  }

  enum MethodType {
    GIS
    REMOTE_SENSING
    MOLECULAR
    AI
  }

  enum CostEfficiency {
    LOW
    MEDIUM
    HIGH
  }

  type Location {
    id: ID!
    name: String!
    coordinates: Coordinates!
    description: String
    ecosystem: Ecosystem!
    area: Float
    protectionStatus: ProtectionStatus!
    country: String!
    region: String
    createdBy: String!
    createdAt: String!
    updatedAt: String!
    monitoringData: [MonitoringData!]!
  }

  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  enum Ecosystem {
    FOREST
    MARINE
    FRESHWATER
    GRASSLAND
    DESERT
    TUNDRA
    URBAN
    AGRICULTURAL
  }

  enum ProtectionStatus {
    PROTECTED
    PARTIALLY_PROTECTED
    UNPROTECTED
  }

  type MonitoringData {
    id: ID!
    species: Species!
    method: MonitoringMethod!
    location: Location!
    date: String!
    value: Float!
    unit: String!
    notes: String
    dataQuality: DataQuality!
    confidence: Float!
    weather: Weather
    researcher: String!
    verified: Boolean!
    verifiedBy: String
    verifiedAt: String
    attachments: [Attachment!]!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
  }

  type Weather {
    temperature: Float
    humidity: Float
    conditions: String
  }

  enum DataQuality {
    HIGH
    MEDIUM
    LOW
  }

  type Attachment {
    filename: String!
    url: String!
    type: AttachmentType!
  }

  enum AttachmentType {
    IMAGE
    DOCUMENT
    AUDIO
    VIDEO
  }

  # Tipos de entrada para mutaciones

  input UserInput {
    clerkId: String!
    email: String!
    firstName: String!
    lastName: String!
    role: UserRole
    institution: String
    specialization: String
  }

  input SpeciesInput {
    name: String!
    scientificName: String!
    description: String
    conservationStatus: ConservationStatus!
    imageUrl: String
    habitat: String
  }

  input MonitoringMethodInput {
    name: String!
    type: MethodType!
    description: String!
    applications: [String!]!
    accuracy: Float
    costEfficiency: CostEfficiency!
    equipment: [String!]!
  }

  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  input LocationInput {
    name: String!
    coordinates: CoordinatesInput!
    description: String
    ecosystem: Ecosystem!
    area: Float
    protectionStatus: ProtectionStatus!
    country: String!
    region: String
  }

  input WeatherInput {
    temperature: Float
    humidity: Float
    conditions: String
  }

  input AttachmentInput {
    filename: String!
    url: String!
    type: AttachmentType!
  }

  input MonitoringDataInput {
    speciesId: ID!
    methodId: ID!
    locationId: ID!
    date: String!
    value: Float!
    unit: String!
    notes: String
    dataQuality: DataQuality!
    confidence: Float!
    weather: WeatherInput
    researcher: String!
    attachments: [AttachmentInput!]
  }

  # Tipos para estadísticas del dashboard

  type DashboardStats {
    totalSpecies: Int!
    totalMethods: Int!
    totalLocations: Int!
    totalMonitoringData: Int!
    recentData: [MonitoringData!]!
    speciesByStatus: [SpeciesStatusCount!]!
    methodsByType: [MethodTypeCount!]!
    dataByMonth: [MonthlyDataCount!]!
  }

  type SpeciesStatusCount {
    status: ConservationStatus!
    count: Int!
  }

  type MethodTypeCount {
    type: MethodType!
    count: Int!
  }

  type MonthlyDataCount {
    month: String!
    count: Int!
  }

  # Consultas principales

  type Query {
    # Consultas de usuario
    me: User
    users: [User!]!
    user(id: ID!): User

    # Consultas de especies
    species: [Species!]!
    speciesById(id: ID!): Species
    speciesByStatus(status: ConservationStatus!): [Species!]!

    # Consultas de métodos de monitoreo
    monitoringMethods: [MonitoringMethod!]!
    monitoringMethodById(id: ID!): MonitoringMethod
    monitoringMethodsByType(type: MethodType!): [MonitoringMethod!]!

    # Consultas de ubicaciones
    locations: [Location!]!
    locationById(id: ID!): Location
    locationsByEcosystem(ecosystem: Ecosystem!): [Location!]!
    locationsByCountry(country: String!): [Location!]!

    # Consultas de datos de monitoreo
    monitoringData: [MonitoringData!]!
    monitoringDataById(id: ID!): MonitoringData
    monitoringDataBySpecies(speciesId: ID!): [MonitoringData!]!
    monitoringDataByMethod(methodId: ID!): [MonitoringData!]!
    monitoringDataByLocation(locationId: ID!): [MonitoringData!]!
    monitoringDataByDateRange(startDate: String!, endDate: String!): [MonitoringData!]!

    # Estadísticas del dashboard
    dashboardStats: DashboardStats!
  }

  # Mutaciones principales

  type Mutation {
    # Mutaciones de usuario
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Mutaciones de especies
    createSpecies(input: SpeciesInput!): Species!
    updateSpecies(id: ID!, input: SpeciesInput!): Species!
    deleteSpecies(id: ID!): Boolean!

    # Mutaciones de métodos de monitoreo
    createMonitoringMethod(input: MonitoringMethodInput!): MonitoringMethod!
    updateMonitoringMethod(id: ID!, input: MonitoringMethodInput!): MonitoringMethod!
    deleteMonitoringMethod(id: ID!): Boolean!

    # Mutaciones de ubicaciones
    createLocation(input: LocationInput!): Location!
    updateLocation(id: ID!, input: LocationInput!): Location!
    deleteLocation(id: ID!): Boolean!

    # Mutaciones de datos de monitoreo
    createMonitoringData(input: MonitoringDataInput!): MonitoringData!
    updateMonitoringData(id: ID!, input: MonitoringDataInput!): MonitoringData!
    deleteMonitoringData(id: ID!): Boolean!
    verifyMonitoringData(id: ID!): MonitoringData!
  }
`;

module.exports = typeDefs;

