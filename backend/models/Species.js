const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  scientificName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  conservationStatus: {
    type: String,
    enum: ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild', 'Extinct', 'Data Deficient'],
    default: 'Data Deficient',
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  habitat: {
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

// Índices para mejorar las consultas
speciesSchema.index({ conservationStatus: 1 });
speciesSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Species', speciesSchema);

