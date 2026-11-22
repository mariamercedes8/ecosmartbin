const express = require('express');
const router = express.Router();
const Bin = require('../models/Bin');

// GET: Obtener todos los contenedores
router.get('/', async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (error) {
    console.error('Error detallado en GET:', error);
    res.status(500).json({ message: 'Error al obtener los contenedores', error: error.message });
  }
});

// POST: Crear un nuevo contenedor
router.post('/', async (req, res) => {
  try {
    const nuevoBin = new Bin(req.body);
    const binGuardado = await nuevoBin.save();
    res.status(201).json(binGuardado);
  } catch (error) {
    console.error('Error detallado en POST:', error);
    res.status(400).json({ message: 'Error al registrar el contenedor', error: error.message });
  }
});

// PUT: Actualizar un contenedor por su ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const binActualizado = await Bin.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!binActualizado) {
      return res.status(404).json({ message: 'Contenedor no encontrado' });
    }
    
    res.json(binActualizado);
  } catch (error) {
    console.error('Error detallado en PUT:', error);
    res.status(400).json({ message: 'Error al actualizar el contenedor', error: error.message });
  }
});

// DELETE: Eliminar un contenedor por su ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const binEliminado = await Bin.findByIdAndDelete(id);
    
    if (!binEliminado) {
      return res.status(404).json({ message: 'Contenedor no encontrado' });
    }
    
    res.json({ message: 'Contenedor eliminado exitosamente', binEliminado });
  } catch (error) {
    console.error('Error detallado en DELETE:', error);
    res.status(500).json({ message: 'Error al eliminar el contenedor', error: error.message });
  }
});

module.exports = router;