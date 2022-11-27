const express = require('express');
const fileController = require('../controllers/fileController');
const upload = require('../middlewares/handleMulter');
const fileSize = require('../middlewares/fileSize');

const api = express.Router();

api.post("/file/:id", upload.array('archivos'), fileSize, fileController.uploadNewFile);
api.get('/file/get/files', fileController.getFiles)
api.get('/file/get/download/:id', fileController.getSpecificFile)
api.get('/file/get/:idPublicacion', fileController.getGeneralFiles)


module.exports = api