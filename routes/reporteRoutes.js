const express = require('express');
const ReporteController = require('../controllers/reporteController');
const api = express.Router();

api.post('/reporte', ReporteController.createReporte);
api.get('/reportes', ReporteController.getReportes);
api.delete('/reporte/delete/', ReporteController.deleteReportes);


module.exports = api