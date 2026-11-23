const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  ubicacion: { type: String, required: true },
  nivelLlenado: { type: String, required: true },
  estado: { type: String, default: 'Activo' }
}, { timestamps: true });

module.exports = mongoose.model('Bin', binSchema);