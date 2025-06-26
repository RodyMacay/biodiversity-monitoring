const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const authMiddleware = require('./middleware/auth');

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Conectar a MongoDB
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/biodiversity');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }

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
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
  });

  // Ruta para poblar datos de ejemplo
  app.post('/seed-data', async (req, res) => {
    try {
      const seedData = require('./seedData');
      await seedData();
      res.json({ success: true, message: 'Datos de ejemplo creados exitosamente' });
    } catch (error) {
      console.error('Error poblando datos:', error);
      res.status(500).json({ success: false, message: 'Error poblando datos', error: error.message });
    }
  });

  const PORT = process.env.PORT || 4000;
  
  await new Promise((resolve) => httpServer.listen({ host: '0.0.0.0', port: PORT }, resolve));
  
  console.log(`🚀 Servidor listo en http://0.0.0.0:${PORT}/`);
  console.log(`📊 GraphQL disponible en http://0.0.0.0:${PORT}/graphql`);
  console.log(`🌱 Poblar datos de ejemplo: POST http://0.0.0.0:${PORT}/seed-data`);
}

startServer().catch((error) => {
  console.error('Error iniciando el servidor:', error);
  process.exit(1);
});

