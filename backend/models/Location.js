const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
  },
  description: {
    type: String,
    trim: true,
  },
  ecosystem: {
    type: String,
    enum: ['Forest', 'Marine', 'Freshwater', 'Grassland', 'Desert', 'Tundra', 'Urban', 'Agricultural'],
    required: true,
  },
  area: {
    type: Number, // en km²
    min: 0,
  },
  protectionStatus: {
    type: String,
    enum: ['Protected', 'Partially Protected', 'Unprotected'],
    default: 'Unprotected',
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Índice geoespacial para consultas de proximidad
locationSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
locationSchema.index({ ecosystem: 1 });
locationSchema.index({ country: 1 });
locationSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Location', locationSchema);

