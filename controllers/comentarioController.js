const comentario = require('../models/comentario');
const publicacion = require('../models/publicacion');


//añadir comentario a la publicación
const createComentario = (req, res) => {

    const{ idUsuario, idPublicacion, contenido} = req.body
    const newComentario = new comentario({
        idUsuario,
        idPublicacion,
        contenido
    })
    newComentario.save((error, comentario) =>{
        if(error){return res.status(400).send({ message: "No se pudo crear el reporte" })}

        publicacion.findByIdAndUpdate(idPublicacion, { $push: { idComentarios: comentario.id } }, (error, comentario) => {
            if (error) {
              return res.status(421).send({ message: "No se pudo agregar el comentario a la publicación" })
            }
            if (!publicacion) {
              return res.status(404).send({ message: "No se encontró la publicación" })
            }
          })

          return res.status(201).send(comentario)
    })
}

//borrar comentario de la publicación
const deleteComentario = (req, res) => {
    const { id } = req.body

    comentario.findByIdAndDelete(id, (error, res) => {
        if (error) {
        return res.status(400).send({ message: "No se eliminó el comentario" })}

        if (!comentario) {
        return res.status(404).send({ message: "No se encontró el comentario" }) }
    })

    publicacion.findOneAndUpdate({idComentarios: id},
        { $pull: { idComentarios: comentario.id } }, (error, publicacion) => {
        if (error) {
          return res.status(421).send({ message: "No se pudo borrar el comentario de la publicación" })}

        if (!publicacion) {
          return res.status(404).send({ message: "No se encontró la publicacion" })}

      })

  return res.status(200).send({ message: "comentario borrado con éxito" });
}


//ver los comentarios de UNA publicación
const getComentariosFromPublicacion = (req, res) => {
  const {idPublicacion} = req.body

  publicacion.findById(idPublicacion, (error, publicacion) => {
    if (error) {
      return res.status(204).send({ message: "error al buscar la publicación de referencia" })
    }
    if (!publicacion) {
      return res.status(404).send({ message: "No se ha encontrado la publicacion" })
    }
  })

  comentario.find( {idPublicacion}, (error, comentarios) => {
  if(error){
      return res.status(400).send({message: "No se realizó la busqueda del comentario"})}

  if(!comentarios){
      return res.status(204).send({message: "La publicación no tiene comentarios"})}

  return res.status(200).send(comentarios)
  })
}

//get de todos los comentarios en la base de datos
const getALLComentarios = (req, res) => {
  comentario.find({}, (error, comentarios) => {
      if(error){
          return res.status(400).send({message: "No se realizó la busqueda"})
      }
      if(!comentarios){
          return res.status(204).send({message: "No se han encontrado comentarios"})
      }
     return res.status(200).send(comentarios)})
  }

//update para modificar sólo el contenido del comentario
const updateComentario = (req, res) => {
  const{ id } = req.params
  const{ contenido } = req.body

  comentario.findOneAndUpdate(id, {contenido}, (error, comentario) => {
    if (error) {
      return res.status(304).send({ message: "No se pudo actualizar el comentario" })}

    if (!comentario) {
    return res.status(404).send({ message: "No se encontró el comentario" })}
  })

  return res.status(200).send({ message: "comentario modificado" })
}


module.exports = {
    createComentario,
    deleteComentario,
    getComentariosFromPublicacion,
    getALLComentarios,
    updateComentario
}