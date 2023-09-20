import mongoose from 'mongoose';

// Define el esquema del registro de seguridad
const securityLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    description: 'Fecha y hora exacta del registro',
  },
  ipAddress: {
    type: String,
    required: true,
    trim: true,
    description: 'Dirección IP de la solicitud',
  },
  requestPath: {
    type: String,
    required: true,
    trim: true,
    description: 'Ruta de la solicitud',
  },
  requestMethod: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE'],
    required: true,
    trim: true,
    description: 'Método de la solicitud (GET, POST, PUT, DELETE, etc.)',
  },
  bruteForceAttempt: {
    type: Number, 
    enum: [0, 1], 
    default: 0, 
    description: 'Indica si hubo un intento de ataque de fuerza bruta',
  },
  ddosAttack: {
    type: Number, 
    enum: [0, 1], 
    default: 0, 
    description: 'Indica si hubo un intento de ataque DDoS',
  },
  sqlInjectionAttempt: {
    type: Number, 
    enum: [0, 1], 
    default: 0,  
    description: 'Indica si hubo un intento de ataque SQL injection',
  },
  xssAttempt: {
    type: Number, 
    enum: [0, 1],
    default: 0,  
    description: 'Indica si hubo un intento de ataque XSS',
  },
  
});

// Agregar índices para búsquedas eficientes
securityLogSchema.index({ ipAddress: 1, timestamp: -1 });

// Crear el modelo
const Security = mongoose.model('SecurityLog', securityLogSchema);

export default Security;
 