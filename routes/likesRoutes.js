const express = require('express');
const likesController = require('../controllers/likesController');
const api = express.Router();

api.post('/like', likesController.createLikes);
api.get('/likes', likesController.getLikes);


module.exports = api