const express = require('express');
const api = express.Router();
const mailerController = require('../controllers/mailerController');

api.post('/mail', mailerController)

module.exports = api;