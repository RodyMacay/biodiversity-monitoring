const mongoose = require('mongoose');

const monitoringMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["GIS" , "REMOTE_SENSING" , "MOLECULAR" ,"AI"]
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  applications: [{
    type: String,
    trim: true,
  }],
  accuracy: {
    type: Number,
    min: 0,
    max: 100,
  },
costEfficiency: {
  type: String,
  enum: ['LOW', 'MEDIUM', 'HIGH'],
  default: 'MEDIUM',
},

  equipment: [{
    type: String,
    trim: true,
  }],
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Índices para mejorar las consultas
monitoringMethodSchema.index({ type: 1 });
monitoringMethodSchema.index({ name: 1 });
monitoringMethodSchema.index({ createdBy: 1 });

module.exports = mongoose.model('MonitoringMethod', monitoringMethodSchema);

