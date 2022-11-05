const express = require('express');
const likesController = require('../controllers/likesController');
const api = express.Router();

api.post('/comentarios', comentariosController.createComentario);

module.exports = api