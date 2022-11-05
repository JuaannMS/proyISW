const express = require('express');
const comentariosController = require('../controllers/comentariosController');
const api = express.Router();

api.post('/comentarios', comentariosController.createComentario);

module.exports = api