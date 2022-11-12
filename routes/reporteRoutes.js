const express = require('express');
const reportecontroller = require('../controllers/reportecontroller');
const api = express.Router();

api.post('/reporte', reportecontroller.createReporte);
api.get('/reportes', reportecontroller.getReportes);
api.put('/reporte/update/:id', reportecontroller.updateReporte);
api.delete('/reporte/delete/:id', reportecontroller.deleteReporte);

//los get terminaran con s para que no haya fallos con los post
module.exports = api