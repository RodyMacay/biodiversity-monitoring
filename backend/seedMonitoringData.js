const mongoose = require('mongoose');
const { MonitoringData, Species, MonitoringMethod, Location } = require('./models');

const seedMonitoringData = async () => {
  try {
    // Obtener IDs existentes de las colecciones relacionadas
    const species = await Species.find({});
    const methods = await MonitoringMethod.find({});
    const locations = await Location.find({});

    if (!species.length || !methods.length || !locations.length) {
      throw new Error('Primero debes tener datos en Species, MonitoringMethod y Location');
    }

    const monitoringData = [
      {
        species: species[0]._id,
        method: methods[0]._id,
        location: locations[0]._id,
        value: 15,
        unit: 'individuos/km',
        notes: 'Conteo en transecto matutino',
        dataQuality: 'High',
        confidence: 85,
        weather: {
          temperature: 22,
          humidity: 70,
          conditions: 'Soleado'
        },
        researcher: 'María González',
        createdBy: 'admin'
      },
      {
        species: species[1]._id,
        method: methods[1]._id,
        location: locations[1]._id,
        value: 1.2,
        unit: 'μg/L',
        notes: 'Muestra de agua profunda',
        dataQuality: 'Medium',
        confidence: 70,
        weather: {
          temperature: 26,
          humidity: 80,
          conditions: 'Parcialmente nublado'
        },
        researcher: 'Carlos Rodríguez',
        createdBy: 'admin'
      },
      {
        species: species[0]._id,
        method: methods[1]._id,
        location: locations[1]._id,
        value: 0.5,
        unit: 'μg/L',
        notes: 'Muestra de ADN ambiental',
        dataQuality: 'High',
        confidence: 90,
        weather: {
          temperature: 24,
          humidity: 75,
          conditions: 'Lluvia ligera'
        },
        researcher: 'Ana Martínez',
        createdBy: 'admin'
      }
    ];

    await MonitoringData.insertMany(monitoringData);
    console.log('Datos de monitoreo insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos de monitoreo:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  require('dotenv').config();
  mongoose.connect('mongodb://127.0.0.1:27017/biodiversity')
    .then(() => seedMonitoringData())
    .catch(err => console.error('Error de conexión a MongoDB:', err));
}

module.exports = seedMonitoringData;