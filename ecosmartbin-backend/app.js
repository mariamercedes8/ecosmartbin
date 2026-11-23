const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const binRoutes = require('./routes/binRoutes');
app.use('/api/bins', binRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'EcoSmartBin API funcionando' });
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecosmartbin';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Conectado exitosamente a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;