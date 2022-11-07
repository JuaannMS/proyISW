const publicacion = require('../models/publicacion');
const Publicacion = require('../models/publicacion');

const createPublicacion = (req , res) => {
const { titulo ,descripcion ,idUsuario} = req.body
const newPublicacion = new Publicacion({
titulo,
etiqueta:' ',
descripcion,
estado :'Activo',
idUsuario
})
newPublicacion.save((error, publicacion) => {
    if(error) {
        return res.status(400).send({ message: "No se pudo crear la publicacion" +error })
    }
    return res.status(201).send(publicacion)
})

}

const getPublicaciones = (req,res) => {
Publicacion.find({}, (error, publicaciones) => {
    if(error){
        return res.status(400).send({message: "No se realizo la busqueda"})
    }
    if(publicaciones.length == 0){
        return res.status(404).send({message: "No se han encontrado publicaciones"})
    }
        return res.status(200).send(publicaciones)
    }
    )
}

const updatePublicacion = (req, res) => {
    const { id } = req.params // {} sirve para definir mas variables al mismo tiempo
    Publicacion.findByIdAndUpdate(id, req.body , (error, publicacion) => {
      if(error){
        return res.status(400).send({ message: "No se pudo actualizar la publicacion"})
      }
      if(!Publicacion){ // no existe "!"
        return res.status(404).send({ message: "No se encontro la publicacion"})
      }
      return res.status(200).send({ message : "Se modifico correctamente la publicacion"})
    }
    )

}

const deletePublicacion = (req, res) => {
    const { id } = req.params
    Publicacion.findByIdAndDelete(id, req.body , (error, publicacion) => {
      if(error){
        return res.status(400).send({ message: "No se pudo eliminar la publicacion"})
      }
      if(!Publicacion){ // no existe "!"
        return res.status(404).send({ message: "No se encontro la publicacion"})
      }
      return res.status(200).send({ message : "Se elimino correctamente la publicacion"})
    }
    )

}
//git 
module.exports = {
    createPublicacion,
    getPublicaciones,
    updatePublicacion,
    deletePublicacion
}