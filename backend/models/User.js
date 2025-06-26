const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['investigador', 'administrador', 'observador'],
    default: 'observador',
  },
  institution: {
    type: String,
    trim: true,
  },
  specialization: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  preferences: {
    language: {
      type: String,
      default: 'es',
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      dashboard: {
        type: Boolean,
        default: true,
      },
    },
  },
}, {
  timestamps: true,
});

// Índices para mejorar las consultas
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);

