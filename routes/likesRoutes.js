const express = require('express');
const likesController = require('../controllers/likesController');
const api = express.Router();

api.post('/like', likesController.createLikes);
api.get('/likess', likesController.getLikes);


module.exports = api