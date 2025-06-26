const mongoose = require('mongoose');

const monitoringDataSchema = new mongoose.Schema({
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  method: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonitoringMethod',
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  dataQuality: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
  weather: {
    temperature: Number,
    humidity: Number,
    conditions: String,
  },
  researcher: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: String,
  },
  verifiedAt: {
    type: Date,
  },
  attachments: [{
    filename: String,
    url: String,
    type: {
      type: String,
      enum: ['image', 'document', 'audio', 'video'],
    },
  }],
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Índices para mejorar las consultas
monitoringDataSchema.index({ species: 1 });
monitoringDataSchema.index({ method: 1 });
monitoringDataSchema.index({ location: 1 });
monitoringDataSchema.index({ date: -1 });
monitoringDataSchema.index({ createdBy: 1 });
monitoringDataSchema.index({ verified: 1 });

// Índice compuesto para consultas complejas
monitoringDataSchema.index({ species: 1, location: 1, date: -1 });

module.exports = mongoose.model('MonitoringData', monitoringDataSchema);

