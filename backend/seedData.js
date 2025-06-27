const mongoose = require('mongoose');
const { Species, MonitoringMethod, Location, MonitoringData } = require('./models');
require('dotenv').config();

const seedData = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/biodiversity');
    console.log('Conectado a MongoDB para poblar datos');

    // Limpiar datos existentes
    await Promise.all([
      Species.deleteMany({}),
      MonitoringMethod.deleteMany({}),
      Location.deleteMany({}),
      MonitoringData.deleteMany({})
    ]);

    // Crear especies de ejemplo (conservationStatus en mayúsculas y guiones bajos)
    const species = await Species.insertMany([
      {
        name: 'Tucán de pico iris',
        scientificName: 'Ramphastos sulfuratus',
        description: 'Ave tropical conocida por su pico colorido y gran tamaño.',
        conservationStatus: 'LEAST_CONCERN',
        habitat: 'Selvas tropicales y bosques húmedos',
        createdBy: 'sistema'
      },
      {
        name: 'Oso de anteojos',
        scientificName: 'Tremarctos ornatus',
        description: 'Único oso nativo de Sudamérica, con marcas faciales distintivas.',
        conservationStatus: 'VULNERABLE',
        habitat: 'Bosques nublados andinos',
        createdBy: 'sistema'
      },
      {
        name: 'Jaguar',
        scientificName: 'Panthera onca',
        description: 'El felino más grande de América, conocido por su poderosa mordida y habilidades de natación.',
        conservationStatus: 'NEAR_THREATENED',
        habitat: 'Selvas tropicales, humedales y sabanas',
        createdBy: 'sistema'
      },
      {
        name: 'Quetzal Resplandeciente',
        scientificName: 'Pharomachrus mocinno',
        description: 'Ave tropical conocida por su plumaje colorido y cola larga en los machos.',
        conservationStatus: 'NEAR_THREATENED',
        habitat: 'Bosques nublados de montaña',
        createdBy: 'sistema'
      },
      {
        name: 'Rana Dorada Venenosa',
        scientificName: 'Phyllobates aurotaenia',
        description: 'Pequeña rana venenosa endémica de Colombia, conocida por sus colores brillantes.',
        conservationStatus: 'ENDANGERED',
        habitat: 'Selvas húmedas tropicales',
        createdBy: 'sistema'
      },
      {
        name: 'Manatí del Caribe',
        scientificName: 'Trichechus manatus',
        description: 'Mamífero marino herbívoro que habita en aguas costeras cálidas.',
        conservationStatus: 'VULNERABLE',
        habitat: 'Aguas costeras, ríos y estuarios',
        createdBy: 'sistema'
      }
    ]);

    // Crear métodos de monitoreo de ejemplo (costEfficiency y type en mayúsculas)
    const methods = await MonitoringMethod.insertMany([
      {
        name: 'Telemetría por GPS',
        type: 'AI',
        description: 'Seguimiento de animales mediante collares con GPS para estudiar sus movimientos.',
        applications: ['Estudio de migración', 'Patrones de movimiento', 'Uso de hábitat'],
        accuracy: 95,
        costEfficiency: 'MEDIUM',
        equipment: ['Collares GPS', 'Receptores', 'Software de análisis'],
        createdBy: 'sistema'
      },
      {
        name: 'Análisis de Imágenes Satelitales',
        type: 'REMOTE_SENSING',
        description: 'Uso de imágenes satelitales para monitorear cambios en el hábitat y distribución de especies.',
        applications: ['Mapeo de hábitat', 'Detección de deforestación', 'Análisis de cobertura vegetal'],
        accuracy: 85,
        costEfficiency: 'HIGH',
        equipment: ['Satélites', 'Software GIS', 'Computadoras especializadas'],
        createdBy: 'sistema'
      },
      {
        name: 'Cámaras Trampa con IA',
        type: 'AI',
        description: 'Cámaras automáticas con reconocimiento de especies mediante inteligencia artificial.',
        applications: ['Conteo de poblaciones', 'Estudio de comportamiento', 'Monitoreo nocturno'],
        accuracy: 94,
        costEfficiency: 'MEDIUM',
        equipment: ['Cámaras trampa', 'Algoritmos de IA', 'Baterías solares'],
        createdBy: 'sistema'
      },
      {
        name: 'Análisis de ADN Ambiental',
        type: 'MOLECULAR',
        description: 'Detección de especies a través del análisis de ADN presente en muestras ambientales.',
        applications: ['Detección de especies raras', 'Monitoreo acuático', 'Biodiversidad microbiana'],
        accuracy: 92,
        costEfficiency: 'LOW',
        equipment: ['Kits de extracción de ADN', 'Secuenciadores', 'Laboratorio especializado'],
        createdBy: 'sistema'
      },
      {
        name: 'Mapeo con Drones y LiDAR',
        type: 'GIS',
        description: 'Uso de drones equipados con sensores LiDAR para mapeo detallado de ecosistemas.',
        applications: ['Mapeo 3D de bosques', 'Conteo de árboles', 'Análisis de estructura forestal'],
        accuracy: 88,
        costEfficiency: 'MEDIUM',
        equipment: ['Drones', 'Sensores LiDAR', 'Software de procesamiento'],
        createdBy: 'sistema'
      }
    ]);

    // Crear ubicaciones de ejemplo (ecosystem y protectionStatus en mayúsculas)
    const locations = await Location.insertMany([
      {
        name: 'Parque Nacional Yasuní',
        coordinates: {
          latitude: -0.6833,
          longitude: -76.4000
        },
        description: 'Uno de los lugares con mayor biodiversidad en el planeta, ubicado en Ecuador.',
        ecosystem: 'FOREST',
        area: 9823,
        protectionStatus: 'PROTECTED',
        country: 'Ecuador',
        region: 'Amazonía',
        createdBy: 'sistema'
      },
      {
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
        createdBy: 'sistema'
      },
      {
        name: 'Reserva de la Biosfera Maya',
        coordinates: {
          latitude: 17.2500,
          longitude: -89.7500
        },
        description: 'Área protegida en Guatemala que conserva selva tropical y sitios arqueológicos mayas.',
        ecosystem: 'FOREST',
        area: 21602,
        protectionStatus: 'PROTECTED',
        country: 'Guatemala',
        region: 'Petén',
        createdBy: 'sistema'
      },
      {
        name: 'Arrecife Mesoamericano',
        coordinates: {
          latitude: 18.0000,
          longitude: -87.0000
        },
        description: 'El segundo sistema de arrecifes de coral más grande del mundo.',
        ecosystem: 'MARINE',
        area: 1000,
        protectionStatus: 'PARTIALLY_PROTECTED',
        country: 'México',
        region: 'Caribe Mexicano',
        createdBy: 'sistema'
      },
      {
        name: 'Humedales del Iberá',
        coordinates: {
          latitude: -28.0000,
          longitude: -57.0000
        },
        description: 'Sistema de humedales en Argentina, importante para aves migratorias.',
        ecosystem: 'FRESHWATER',
        area: 13000,
        protectionStatus: 'PROTECTED',
        country: 'Argentina',
        region: 'Corrientes',
        createdBy: 'sistema'
      }
    ]);

    // Crear datos de monitoreo de ejemplo (dataQuality en mayúsculas)
    const monitoringData = await MonitoringData.insertMany([
      {
        species: species[0]._id,
        method: methods[0]._id,
        location: locations[0]._id,
        date: new Date('2023-05-15'),
        value: 12,
        unit: 'individuos',
        researcher: 'Dr. Ana López',
        notes: 'Avistamiento durante censo matutino',
        dataQuality: 'HIGH',
        confidence: 90,
        weather: {
          temperature: 28,
          humidity: 60,
          conditions: 'Soleado'
        },
        createdBy: 'sistema'
      },
      {
        species: species[1]._id,
        method: methods[1]._id,
        location: locations[1]._id,
        date: new Date('2023-06-20'),
        value: 8,
        unit: 'individuos',
        researcher: 'Dr. Carlos Méndez',
        notes: 'Registro mediante cámaras trampa',
        dataQuality: 'MEDIUM',
        confidence: 75,
        weather: {
          temperature: 25,
          humidity: 80,
          conditions: 'Parcialmente nublado'
        },
        createdBy: 'sistema'
      }
    ]);

    console.log('✅ Datos de ejemplo creados exitosamente:');
    console.log(`- ${species.length} especies`);
    console.log(`- ${methods.length} métodos de monitoreo`);
    console.log(`- ${locations.length} ubicaciones`);
    console.log(`- ${monitoringData.length} registros de monitoreo`);

  } catch (error) {
    console.error('Error poblando datos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
};

// Ejecutar solo si se llama directamente
if (require.main === module) {
  seedData();
}

module.exports = seedData;
