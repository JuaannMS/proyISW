const { ObjectId } = require('mongodb');
const FileModel = require('../models/file');

const uploadNewFile = (req, res,err) => {
    let objId
    try{
        objId = new ObjectId(""+req.params.id);
    } catch(err) {
        return res.status(400).send({ message: "Error al subir el archivo" })
    }
    const { files } = req;
    let aux = files.map((file) => {
        const newFiles = new FileModel({
            url: file.path,
            name: file.originalname,
            mimeType: file.mimetype,
            idPublicacion: objId
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
    FileModel.find({}, (err, file) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener los archivos" })
        }
        return res.status(200).send(file)
    })
}

// descarga un archivo en especifico
const getSpecificFile = (req, res) => {
    const { id } = req.params
    FileModel.findById(id, (err, file) => {
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

// obtiene los archivos de una publicacion en especifico
const getGeneralFiles = (req, res) => {
    const { idPublicacion } = req.params
    FileModel.find({ idPublicacion: idPublicacion }, (err, file) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ message: "Error al obtener los archivos" })
        }
        if (!file) {
            return res.status(404).send({ message: "Archivo no existe" })
        }
        return res.status(200).send(file)
    })
}


module.exports = {
    uploadNewFile,
    getFiles,
    getSpecificFile,
    getGeneralFiles
}