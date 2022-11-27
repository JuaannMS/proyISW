const express = require('express');
const ReporteController = require('../controllers/reporteController');
const api = express.Router();

api.post('/reporte', ReporteController.createReporte);
api.delete('/reporte/delete/', ReporteController.deleteReportes);
api.get('/reporte/get/', ReporteController.getReporte)
api.get('/reporte/getALL/', ReporteController.getALLReportes);
api.put('/reporte/update/', ReporteController.updateReporte);


module.exports = api