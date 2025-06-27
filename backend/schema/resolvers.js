const { Species, MonitoringMethod, Location, MonitoringData, User } = require('../models');
const jwt = require('jsonwebtoken');

// Función auxiliar para verificar autenticación
const requireAuth = (user) => {
  if (!user) {
    throw new Error('Debes estar autenticado para realizar esta acción');
  }
  return user;
};

// Función auxiliar para verificar permisos de administrador
const requireAdmin = (user) => {
   
  if (user.role !== 'administrador') {
    throw new Error('No tienes permisos para realizar esta acción');
  }
  return user;
};

const resolvers = {
  Query: {
    // Consultas de usuario
    me: async (_, __, { user="admin" }) => {
       
      return await User.findOne({ clerkId: user });
    },

    users: async (_, __, { user="admin" }) => {
      requireAdmin(user);
      return await User.find().sort({ createdAt: -1 });
    },

    user: async (_, { id }, { user="admin" }) => {
       
      return await User.findById(id);
    },

    // Consultas de especies
    species: async () => {
      return await Species.find().sort({ name: 1 });
    },

    speciesById: async (_, { id }) => {
      return await Species.findById(id);
    },

    speciesByStatus: async (_, { status }) => {
      return await Species.find({ conservationStatus: status }).sort({ name: 1 });
    },

    // Consultas de métodos de monitoreo
    monitoringMethods: async () => {
      return await MonitoringMethod.find().sort({ name: 1 });
    },

    monitoringMethodById: async (_, { id }) => {
      return await MonitoringMethod.findById(id);
    },

    monitoringMethodsByType: async (_, { type }) => {
      return await MonitoringMethod.find({ type }).sort({ name: 1 });
    },

    // Consultas de ubicaciones
    locations: async () => {
      return await Location.find().sort({ name: 1 });
    },

    locationById: async (_, { id }) => {
      return await Location.findById(id);
    },

    locationsByEcosystem: async (_, { ecosystem }) => {
      return await Location.find({ ecosystem }).sort({ name: 1 });
    },

    locationsByCountry: async (_, { country }) => {
      return await Location.find({ country }).sort({ name: 1 });
    },

    // Consultas de datos de monitoreo
    monitoringData: async () => {
      return await MonitoringData.find()
        .populate('species')
        .populate('method')
        .populate('location')
        .sort({ date: -1 });
    },

    monitoringDataById: async (_, { id }) => {
      return await MonitoringData.findById(id)
        .populate('species')
        .populate('method')
        .populate('location');
    },

    monitoringDataBySpecies: async (_, { speciesId }) => {
      return await MonitoringData.find({ species: speciesId })
        .populate('species')
        .populate('method')
        .populate('location')
        .sort({ date: -1 });
    },

    monitoringDataByMethod: async (_, { methodId }) => {
      return await MonitoringData.find({ method: methodId })
        .populate('species')
        .populate('method')
        .populate('location')
        .sort({ date: -1 });
    },

    monitoringDataByLocation: async (_, { locationId }) => {
      return await MonitoringData.find({ location: locationId })
        .populate('species')
        .populate('method')
        .populate('location')
        .sort({ date: -1 });
    },

    monitoringDataByDateRange: async (_, { startDate, endDate }) => {
      return await MonitoringData.find({
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      })
        .populate('species')
        .populate('method')
        .populate('location')
        .sort({ date: -1 });
    },

    // Estadísticas del dashboard
    dashboardStats: async () => {
      const [
        totalSpecies,
        totalMethods,
        totalLocations,
        totalMonitoringData,
        recentData,
        speciesStatusCounts,
        methodTypeCounts
      ] = await Promise.all([
        Species.countDocuments(),
        MonitoringMethod.countDocuments(),
        Location.countDocuments(),
        MonitoringData.countDocuments(),
        MonitoringData.find()
          .populate('species')
          .populate('method')
          .populate('location')
          .sort({ date: -1 })
          .limit(10),
        Species.aggregate([
          { $group: { _id: '$conservationStatus', count: { $sum: 1 } } },
          { $project: { status: '$_id', count: 1, _id: 0 } }
        ]),
        MonitoringMethod.aggregate([
          { $group: { _id: '$type', count: { $sum: 1 } } },
          { $project: { type: '$_id', count: 1, _id: 0 } }
        ])
      ]);

      // Datos por mes (últimos 12 meses)
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      const dataByMonth = await MonitoringData.aggregate([
        { $match: { date: { $gte: twelveMonthsAgo } } },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            month: {
              $concat: [
                { $toString: '$_id.year' },
                '-',
                { $toString: '$_id.month' }
              ]
            },
            count: 1,
            _id: 0
          }
        },
        { $sort: { month: 1 } }
      ]);

      return {
        totalSpecies,
        totalMethods,
        totalLocations,
        totalMonitoringData,
        recentData,
        speciesByStatus: speciesStatusCounts,
        methodsByType: methodTypeCounts,
        dataByMonth
      };
    }
  },

  Mutation: {
    // Mutaciones de usuario
    createUser: async (_, { input }, { user="admin" }) => {
       
      const newUser = new User({
        ...input,
        createdBy: user
      });
      return await newUser.save();
    },

    updateUser: async (_, { id, input }, { user="admin" }) => {
       
      return await User.findByIdAndUpdate(id, input, { new: true });
    },

    deleteUser: async (_, { id }, { user="admin" }) => {
      requireAdmin(user);
      await User.findByIdAndDelete(id);
      return true;
    },

    // Mutaciones de especies
    createSpecies: async (_, { input }, { user="admin" }) => {
      const species = new Species({
        ...input,
        createdBy: user
      });
      return await species.save();
    },

    updateSpecies: async (_, { id, input }, { user="admin" }) => {
       
      return await Species.findByIdAndUpdate(id, input, { new: true });
    },

    deleteSpecies: async (_, { id }, { user="admin" }) => {
       
      await Species.findByIdAndDelete(id);
      return true;
    },

    // Mutaciones de métodos de monitoreo
    createMonitoringMethod: async (_, { input }, { user="admin" }) => {
       
      const method = new MonitoringMethod({
        ...input,
        createdBy: user
      });
      return await method.save();
    },

    updateMonitoringMethod: async (_, { id, input }, { user="admin" }) => {
       
      return await MonitoringMethod.findByIdAndUpdate(id, input, { new: true });
    },

    deleteMonitoringMethod: async (_, { id }, { user="admin" }) => {
       
      await MonitoringMethod.findByIdAndDelete(id);
      return true;
    },

    // Mutaciones de ubicaciones
    createLocation: async (_, { input }, { user="admin" }) => {
       
      const location = new Location({
        ...input,
        createdBy: user
      });
      return await location.save();
    },

    updateLocation: async (_, { id, input }, { user="admin" }) => {
       
      return await Location.findByIdAndUpdate(id, input, { new: true });
    },

    deleteLocation: async (_, { id }, { user="admin" }) => {
       
      await Location.findByIdAndDelete(id);
      return true;
    },

    // Mutaciones de datos de monitoreo
    createMonitoringData: async (_, { input }, { user="admin" }) => {
       
      const data = new MonitoringData({
        ...input,
        species: input.speciesId,
        method: input.methodId,
        location: input.locationId,
        createdBy: user
      });
      const savedData = await data.save();
      return await MonitoringData.findById(savedData._id)
        .populate('species')
        .populate('method')
        .populate('location');
    },

    updateMonitoringData: async (_, { id, input }, { user="admin" }) => {
       
      const updatedData = await MonitoringData.findByIdAndUpdate(
        id,
        {
          ...input,
          species: input.speciesId,
          method: input.methodId,
          location: input.locationId
        },
        { new: true }
      )
        .populate('species')
        .populate('method')
        .populate('location');
      return updatedData;
    },

    deleteMonitoringData: async (_, { id }, { user="admin" }) => {
       
      await MonitoringData.findByIdAndDelete(id);
      return true;
    },

    verifyMonitoringData: async (_, { id }, { user="admin" }) => {
       
      const updatedData = await MonitoringData.findByIdAndUpdate(
        id,
        {
          verified: true,
          verifiedBy: user,
          verifiedAt: new Date()
        },
        { new: true }
      )
        .populate('species')
        .populate('method')
        .populate('location');
      return updatedData;
    }
  },

  // Resolvers para campos anidados
  Species: {
    monitoringData: async (parent) => {
      return await MonitoringData.find({ species: parent._id })
        .populate('method')
        .populate('location')
        .sort({ date: -1 });
    }
  },

  MonitoringMethod: {
    monitoringData: async (parent) => {
      return await MonitoringData.find({ method: parent._id })
        .populate('species')
        .populate('location')
        .sort({ date: -1 });
    }
  },

  Location: {
    monitoringData: async (parent) => {
      return await MonitoringData.find({ location: parent._id })
        .populate('species')
        .populate('method')
        .sort({ date: -1 });
    }
  }
};

module.exports = resolvers;

