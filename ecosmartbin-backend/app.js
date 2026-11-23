const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz de estado
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'EcoSmartBin API funcionando' });
});

// Ruta de prueba para aislar el enrutamiento bajo /api
app.get('/api/test', (req, res) => {
  res.json({ ok: true, msg: 'Ruta /api/test funcionando' });
});

// Rutas del recurso principal
const binRoutes = require('./routes/binRoutes');
app.use('/api/bins', binRoutes);

// Conexión a MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecosmartbin';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Conectado exitosamente a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

// Solo escuchar puerto en entorno local (no en Vercel serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;