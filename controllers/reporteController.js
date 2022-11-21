const publicacion = require('../models/publicacion');
const reporte = require('../models/reporte');

/*Requerimiento: usuario puede hacer reporte de una publicación
*/
const createReporte = (req, res) => {
    const{ idPublicacion } = req.body
    const newReporte = new reporte({
        idPublicacion
    })
    newReporte.save((error, reporte) =>{
        if(error){return res.status(400).send({ message: "No se pudo crear el reporte" })}

        publicacion.findByIdAndUpdate(idPublicacion, { $push: { idReportes: reporte.id } }, (error, publicacion) => {
            if (error) {
              return res.status(400).send({ message: "No se pudo actualizar la cantidad de reportes" })
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

//para verificar que los cambios en la base de datos
const getReportes = (req, res) => {
    reporte.find({}, (error, reportes) => {
        if(error){
            return res.status(400).send({message: "No se realizó la busqueda"})
        }
        if(reportes.length == 0){
            return res.status(404).send({message: "No se han encontrado reportes"})
        }

       return res.status(200).send(reportes)})
    }



module.exports = {
    createReporte,
    getReportes,
    deleteReportes
}