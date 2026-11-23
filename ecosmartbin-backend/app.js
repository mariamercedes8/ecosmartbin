const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const binRoutes = require('./routes/binRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecosmartbin';

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB reutilizable para entorno serverless
let cachedPromise = global._mongooseConnectionPromise;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
      })
      .then((m) => {
        console.log('Conectado exitosamente a MongoDB');
        return m.connection;
      })
      .catch((err) => {
        cachedPromise = null;
        global._mongooseConnectionPromise = null;
        console.error('Error de conexión a MongoDB:', err);
        throw err;
      });

    global._mongooseConnectionPromise = cachedPromise;
  }

  return cachedPromise;
}

// Middleware para asegurar la conexión a la base de datos antes de /api/bins
async function ensureDatabaseConnection(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      message: 'Error de conexión con la base de datos',
      error: err.message,
    });
  }
}

// Rutas de estado y diagnóstico
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'EcoSmartBin API funcionando' });
});

app.get('/api/test', (req, res) => {
  res.json({ ok: true, msg: 'Ruta /api/test funcionando' });
});

// Rutas del recurso principal
app.use('/api/bins', ensureDatabaseConnection, binRoutes);

// Solo escuchar puerto en entorno local (no en Vercel serverless)
if (!process.env.VERCEL) {
  connectDB().catch(() => {});
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;