const publicacion = require('../models/publicacion');
const reporte = require('../models/reporte');

/*Requerimiento: usuario puede hacer reporte de una publicación
*/
const createReporte = (req, res) => {
    const{ idPublicacion, motivo, gravedad } = req.body
    const newReporte = new reporte({
        idPublicacion,
        motivo,
        gravedad
    })
    newReporte.save((error, reporte) =>{
        if(error){return res.status(400).send({ message: "No se pudo crear el reporte" })}

        publicacion.findByIdAndUpdate(idPublicacion, { $push: { idReportes: reporte.id } }, (error, publicacion) => {
            if (error) {
              return res.status(421).send({ message: "No se pudo agregar el reporte a la publicación" })
            }
            if (!publicacion) {
              return res.status(404).send({ message: "No se encontró la publicacion" })
            }
          })

          return res.status(201).send(reporte)
    })
}



/*Requerimiento: el moderador decide si banea al usuario o bien desestima los reportes. Cuando se desestiman deben borrarse
*/
const deleteReportes = (req, res) => {
 const { idPublicacion} = req.body

 //borrar los reportes en la publicación
 publicacion.findByIdAndUpdate(idPublicacion, { $unset: { idReportes : "" } }, (error, publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo eliminar reportes de la publicación" })
    }
    if (!publicacion) {
      return res.status(404).send({ message: "No se encontró la publicación" })
    }
  })

  //borrar reportes de la base de datos
  reporte.deleteMany({idPublicacion: idPublicacion}, (error,reporte) => {
    if (error) {
        return res.status(400).send({ message: "No se pudo eliminar los reportes" })
      }
      if (!reporte) {
        return res.status(404).send({ message: "No se encontraron los reportes" })
      }
    })

  return res.status(200).send({ message: "reportes eliminados" })

}

//get de los reportes de una sola publicación
const getReporte = (req, res) => {
  const { idPublicacion} = req.body

  publicacion.findById(idPublicacion, (error, publicacion) => {
    if (error) {
      return res.status(204).send({ message: "error al buscar la publicación de referencia" })
    }
    if (!publicacion) {
      return res.status(404).send({ message: "No se ha encontrado la publicacion" })
    }
  })

  reporte.find( {idPublicacion }, (error, reportes) => {
  if(error){
      return res.status(400).send({message: "No se realizó la busqueda del reporte"})}

  if(!reportes){
      return res.status(204).send({message: "La publicación no tiene reportes"})}

  return res.status(200).send(reportes)
  })
}

//get de todos los reportes en la base de datos
const getALLReportes = (req, res) => {
    reporte.find({}, (error, reportes) => {
        if(error){
            return res.status(400).send({message: "No se realizó la busqueda"})
        }
        if(!reportes){
            return res.status(204).send({message: "No se han encontrado reportes"})
        }

       return res.status(200).send(reportes)})
    }

//update
const updateReporte = (req, res) => {
  const{ id } = req.params
  reporte.findByIdAndUpdate(id, req.body, (error, reporte) =>{
    if (error) {
      return res.status(304).send({ message: "No se pudo actualizar el reporte" })}
    if (!reporte) {
    return res.status(404).send({ message: "No se encontró el reporte" })
    }
    return res.status(204).send({ message: "reporte modificado exitosamente" })
  })
}

module.exports = {
    createReporte,
    deleteReportes,
    getReporte,
    getALLReportes,
    updateReporte
}