const Reporte = require('../models/reporte');

const createReporte = (req,res) => {
    const {idUsuario, idPublicacion, } = req.body
    const newReporte = new Reporte({
        idUsuario,
        idPublicacion,
    })
    newReporte.save((error, reporte) =>{
    if(error){
        return res.status(400).send({
            message: "No se ha podido crear el reporte"
        })
    }
    return res.status(201).send(reporte)
    })
}

const getReportes = (req,res) => {
    Reportes.find({}, (error, reporte) => {
        if(error){
            return res.status(400).send({message: "No se realizó la busqueda"})
        }
        if(usuarios.length == 0){
            return res.status(404).send({message: "No se han encontrado reportes"})
        }
            return res.status(200).send(reportes)
        }
        )
    }
const updateReporte = (req,res) => {
    const { id } = req.params
    Usuario.findByIdAndUpdate(id, req.body, (error, reporte) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el reporte" })
        }
        if (!reporte) {
            return res.status(404).send({ message: "No se encontro el reporte" })
        }
        return res.status(200).send({ message: "Reporte modificado exitosamente" })
    })

}

const deleteReporte = (req, res) => {
    const { id } = req.params
    Reporte.findByIdAndDelete(id, req.body , (error, reporte) => {
      if(error){
        return res.status(400).send({ message: "No se pudo eliminar el reporte"})
      }
      if(!reporte){ // no existe "!"
        return res.status(404).send({ message: "No se encontro el reporte"})
      }
      return res.status(200).send({ message : "Se elimino correctamente la el reporte"})
    }
    )
}

module.exports = {
    createReporte,
    getReportes,
    updateReporte,
    deleteReporte,
}