const express = require('express');
const ReporteController = require('../controllers/reporteController');
const api = express.Router();

api.post('/reporte', ReporteController.createReporte);
api.get('/reportes', ReporteController.getReportes);
api.put('/reporte/update/:id', ReporteController.updateReporte);
api.delete('/reporte/delete/:id', ReporteController.deleteReporte);


module.exports = api