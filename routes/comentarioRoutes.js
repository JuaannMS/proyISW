const express = require('express');
const comentarioController = require('../controllers/comentarioController');
const api = express.Router();

api.post('/comentario', comentarioController.createComentario);
api.delete('/comentario/delete', comentarioController.deleteComentario);
api.get('/comentario/getFromPublicacion', comentarioController.getComentariosFromPublicacion);
api.get('/comentarios', comentarioController.getALLComentarios);
api.put('/comentario/update', comentarioController.updateComentario);

module.exports = api