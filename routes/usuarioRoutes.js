const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();

api.post('/usuario', usuarioController.createUsuario);
api.get('/usuarios', usuarioController.getUsuario);
api.put('/usuario/update/:id', usuarioController.updateUsuario);

//los get terminaran con s para que no haya fallos con los post
module.exports = api