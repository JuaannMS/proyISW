
const publicacion = require('../models/publicacion');
const Publicacion = require('../models/publicacion');

const createPublicacion = (req, res) => {
  const Usuario = require('../models/usuario')
  const { titulo, descripcion,cantLikes,etiqueta,idUsuario } = req.body
  const newPublicacion = new Publicacion({
    titulo,
    descripcion,
    idUsuario,
    cantLikes,
    etiqueta,
    estado: true
  })
  newPublicacion.save((error, publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo crear la publicacion" + error })
    }
    Usuario.findByIdAndUpdate(idUsuario, { $push: { idPublicacion: publicacion.id } }, (error, usuario) => {
      if (error) {
        return res.status(400).send({ message: "No se pudo crear la publicacion" })
      }
      if (!usuario) {
        return res.status(404).send({ message: "No se encontro el usuario" })
      }
    })

    return res.status(201).send(publicacion)
  })
  setTimeout(function(){

    Publicacion.findOne().
    console.log(titulo)
    Publicacion.findByIdAndUpdate( this._id,{ $set: { estado: false }})
}, 5000); // unidad de tiempo de visibilidad


}

const getPublicaciones = (req, res) => { //mostrar solamente los activos
Publicacion.find({
  //estado:true //comentar para que aparezcan todos
}
).sort({cantLikes : -1}).exec(
function(error, publicaciones) {
    if (error) {
      return res.status(400).send({ message: "No se realizo la busqueda" })
    }
    if (publicaciones.length == 0) {
      return res.status(404).send({ message: "No se han encontrado publicaciones" })
    }
    return res.status(200).send(publicaciones);
  }
  )
}

const getPublicacionesporEtiqueta = (req, res) => {


  //filtrar letras para igualar bien y sacar los {}:
const tag = JSON.stringify(req.body);
const tags =  tag.substr(13,15);
const pal = tags.replace('"}' ," ")
console.log(pal);

Publicacion.find({
  etiqueta: "0",
  estado:true

}, (error, publicacionesx) => {
  if(error){
      return res.status(400).send({message: "No se realizó la busqueda"})
  }
  if(publicacionesx.length == 0){
      return res.status(404).send({message: "No se han encontrado publicaciones"})
  }
      return res.status(200).send(publicacionesx)
  }
  )

}


const updatePublicacion = (req, res) => {
  const { id } = req.params // {} sirve para definir mas variables al mismo tiempo
  Publicacion.findByIdAndUpdate(id, req.body, (error, publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo actualizar la publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontro la publicacion" })
    }
    return res.status(200).send({ message: "Se modifico correctamente la publicacion" })
  }
  )

}

const deletePublicacion = (req, res) => {
  const { id } = req.params
  Publicacion.findByIdAndUpdate(id,{ $set: { estado: false }}//cambia estado de estadopublicacion
    , (error, Publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo eliminar la publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontro la publicacion" })
    }
    return res.status(200).send({ message: "Se elimino correctamente la publicacion" })
  }
  )

}

const getPublicacion = (req, res) => {
  const { id } = req.params
  Publicacion.findById(id, (error, publicacion) => {
      if (error) {
          return res.status(400).send({ message: "No se ha podido cambiar la publicacion" })
      }
      if (!publicacion) {
          return res.status(404).send({ message: "No se ha podido encontrar la publicacion" })
      }
      return res.status(200).send(publicacion)
  })
}



function setLikes(idPubli) {// retornar cantLikes de la publicacion
  console.log(idPubli)
  console.log()
//Publicacion.findByIdAndUpdate( idPubli , { $set: { cantLikes: cantLikes+1 }} )
  console.log("Se dio me gusta");
}





//git
module.exports = {
  createPublicacion,
  getPublicaciones,
  updatePublicacion,
  deletePublicacion,
  getPublicacion,
  getPublicacionesporEtiqueta,
  setLikes
}