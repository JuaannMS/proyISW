const express = require('express');
const favoritosController = require('../controllers/favoritosController');
const api = express.Router();

api.put('/favorito/put/createFavorito/', favoritosController.createFavorito);
api.get('/favorito/get/getFavoritos/:idUsuario', favoritosController.getFavoritos);
api.delete('/favorito/delete/deleteFavorito/', favoritosController.deleteFavorito);

module.exports = api