const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Definir rutas
router.get('/', (req, res) => {
  res.send('¡Hola, API!');
});

// Crear usuario
router.post('/users', usersController.createUser);

// Obtener todos los usuarios
router.get('/users', usersController.getUsers);

// Obtener usuario por ID
router.get('/users/:id', usersController.getUserById);

// Actualizar usuario
router.put('/users/:id', usersController.updateUser);

// Eliminar usuario
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;

// Exportar router
module.exports = router;
