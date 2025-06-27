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
  enum: [
    'LEAST_CONCERN',
    'NEAR_THREATENED',
    'VULNERABLE',
    'ENDANGERED',
    'CRITICALLY_ENDANGERED',
    'EXTINCT_IN_THE_WILD',
    'EXTINCT',
    'DATA_DEFICIENT'
  ],
  default: 'DATA_DEFICIENT',
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

