const fileModel = require('../models/file');

const uploadNewFile = (req, res) => {
    const { files } = req;
    let aux = files.map((file) => {
        const newFiles = new fileModel({
            url: file.path,
            name: file.originalname,
            mimeType: file.mimetype,
            idPublicacion: req.body.idPublicacion
        })
        newFiles.save((err, fileSaved) => {
            if (err) {
                return res.status(500).send({ message: "Error al guardar el archivo" })
            }
        })
        return newFiles
    })
    return res.status(200).send(aux)
}

const getFiles = (req, res) => {
    fileModel.find({}, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener los archivos" })
        }
        return res.status(200).send(file)
    })
}

// descarga un archivo en especifico
const getSpecificFile = (req, res) => {
    const { id } = req.params
    fileModel.findById(id, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el archivo" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        // cambia el nombre del archivo al original
        return res.download('./' + file.url, file.name)
    })
}

module.exports = {
    uploadNewFile,
    getFiles,
    getSpecificFile
}