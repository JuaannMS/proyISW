const express = require('express');
const { validate, clean, format, getCheckDigit } = require('rut.js')
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();

api.post('/usuario', usuarioController.createUsuario);
api.get('/usuarios', usuarioController.getUsuarios);
api.put('/usuario/update/:id', usuarioController.updateUsuario);
api.put('/usuario/update/favorito/:id', usuarioController.newFavorito);
api.delete('/usuario/delete/:id', usuarioController.deleteUsuario);
api.delete('/usuario/delete/favorito/:id', usuarioController.deleteFavorito);
api.get('/usuario/favoritos/:id', usuarioController.getFavoritos);
//los get terminaran con s para que no haya fallos con los post
module.exports = api