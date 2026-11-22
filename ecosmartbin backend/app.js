const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const binRoutes = require('./routes/binRoutes');
app.use('/api/bins', binRoutes);

// Conexión a MongoDB y servidor
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecosmartbin')
  .then(() => {
    console.log('Conectado exitosamente a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error('Error de conexión a MongoDB:', err));