const mongoose = require('mongoose');
const { Location, MonitoringMethod, Species, User, MonitoringData } = require('./models');

const seedDatabase = async () => {
  try {
    // Datos iniciales para Ubicaciones


    // Insertar datos en la base de datos
    const createdMethods = await MonitoringMethod.insertMany(methods);


    // Crear algunos datos de monitoreo
    const monitoringData = [
  {
    species: createdSpecies[0]._id,
    method: createdMethods[0]._id,
    location: createdLocations[0]._id,
    value: 12,
    unit: 'individuos/km',
    notes: 'Avistamientos en transecto de 5km',
    dataQuality: 'High',
    confidence: 90,
    weather: {
      temperature: 18,
      humidity: 85
    },
    researcher: 'María González',
    createdBy: 'admin'
  },
  {
    species: createdSpecies[1]._id,
    method: createdMethods[1]._id,
    location: createdLocations[1]._id,
    value: 0.8,
    unit: 'μg/L',
    notes: 'Presencia detectada en muestras de agua',
    dataQuality: 'Medium',
    confidence: 75,
    weather: {
      temperature: 28,
      humidity: 75
    },
    researcher: 'Carlos Rodríguez',
    createdBy: 'admin'
  }
];

    await MonitoringData.insertMany(monitoringData);

    console.log('Datos iniciales insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos iniciales:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar la función si se llama directamente
if (require.main === module) {
  require('dotenv').config();
  mongoose.connect('mongodb://127.0.0.1:27017/biodiversity')
    .then(() => seedDatabase())
    .catch(err => console.error('Error de conexión a MongoDB:', err));
}

module.exports = seedDatabase;