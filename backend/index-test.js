const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./schema/typeDefs');
const authMiddleware = require('./middleware/auth');

// Datos de ejemplo en memoria para testing
const mockData = {
  species: [
    {
      id: '1',
      name: 'Jaguar',
      scientificName: 'Panthera onca',
      description: 'El felino más grande de América, conocido por su poderosa mordida y habilidades de natación.',
      conservationStatus: 'NEAR_THREATENED',
      habitat: 'Selvas tropicales, humedales y sabanas',
      createdBy: 'sistema',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Quetzal Resplandeciente',
      scientificName: 'Pharomachrus mocinno',
      description: 'Ave tropical conocida por su plumaje colorido y cola larga en los machos.',
      conservationStatus: 'NEAR_THREATENED',
      habitat: 'Bosques nublados de montaña',
      createdBy: 'sistema',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  monitoringMethods: [
    {
      id: '1',
      name: 'Análisis de Imágenes Satelitales',
      type: 'REMOTE_SENSING',
      description: 'Uso de imágenes satelitales para monitorear cambios en el hábitat y distribución de especies.',
      applications: ['Mapeo de hábitat', 'Detección de deforestación', 'Análisis de cobertura vegetal'],
      accuracy: 85,
      costEfficiency: 'HIGH',
      equipment: ['Satélites', 'Software GIS', 'Computadoras especializadas'],
      createdBy: 'sistema',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  locations: [
    {
      id: '1',
      name: 'Parque Nacional Corcovado',
      coordinates: {
        latitude: 8.5167,
        longitude: -83.5833
      },
      description: 'Una de las áreas de mayor biodiversidad del mundo, ubicada en Costa Rica.',
      ecosystem: 'FOREST',
      area: 424,
      protectionStatus: 'PROTECTED',
      country: 'Costa Rica',
      region: 'Península de Osa',
      createdBy: 'sistema',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  monitoringData: [
    {
      id: '1',
      species: '1',
      method: '1',
      location: '1',
      date: new Date().toISOString(),
      value: 15,
      unit: 'individuos',
      notes: 'Observación de Jaguar usando Análisis de Imágenes Satelitales',
      dataQuality: 'HIGH',
      confidence: 85,
      researcher: 'Dr. Investigador',
      verified: true,
      createdBy: 'sistema',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

// Resolvers simplificados para testing
const resolvers = {
  Query: {
    species: () => mockData.species,
    speciesById: (_, { id }) => mockData.species.find(s => s.id === id),
    monitoringMethods: () => mockData.monitoringMethods,
    locations: () => mockData.locations,
    monitoringData: () => {
      return mockData.monitoringData.map(data => ({
        ...data,
        species: mockData.species.find(s => s.id === data.species),
        method: mockData.monitoringMethods.find(m => m.id === data.method),
        location: mockData.locations.find(l => l.id === data.location),
      }));
    },
    dashboardStats: () => ({
      totalSpecies: mockData.species.length,
      totalMethods: mockData.monitoringMethods.length,
      totalLocations: mockData.locations.length,
      totalMonitoringData: mockData.monitoringData.length,
      recentData: mockData.monitoringData.map(data => ({
        ...data,
        species: mockData.species.find(s => s.id === data.species),
        method: mockData.monitoringMethods.find(m => m.id === data.method),
        location: mockData.locations.find(l => l.id === data.location),
      })),
      speciesByStatus: [
        { status: 'NEAR_THREATENED', count: 2 },
        { status: 'VULNERABLE', count: 1 },
      ],
      methodsByType: [
        { type: 'REMOTE_SENSING', count: 1 },
        { type: 'AI', count: 1 },
      ],
      dataByMonth: [
        { month: '2024-6', count: 1 },
      ],
    }),
  },
  Mutation: {
    createSpecies: (_, { input }) => {
      const newSpecies = {
        id: String(mockData.species.length + 1),
        ...input,
        createdBy: 'sistema',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockData.species.push(newSpecies);
      return newSpecies;
    },
  },
};

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  console.log('Iniciando servidor en modo testing (sin MongoDB)');

  // Configurar Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Configurar middleware
  app.use(
    '/graphql',
    cors({
      origin: true,
      credentials: true,
    }),
    express.json(),
    authMiddleware,
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          user: req.user,
        };
      },
    }),
  );

  // Ruta de salud
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente (modo testing)' });
  });

  const PORT = process.env.PORT || 4000;
  
  await new Promise((resolve) => httpServer.listen({ host: '0.0.0.0', port: PORT }, resolve));
  
  console.log(`🚀 Servidor listo en http://0.0.0.0:${PORT}/`);
  console.log(`📊 GraphQL disponible en http://0.0.0.0:${PORT}/graphql`);
  console.log(`🧪 Ejecutándose en modo testing con datos simulados`);
}

startServer().catch((error) => {
  console.error('Error iniciando el servidor:', error);
  process.exit(1);
});

