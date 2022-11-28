const Publicacion = require('../models/publicacion');
const Usuario = require('../controllers/usuarioController');

const createPublicacion = (req, res) => {
const Usuario = require('../models/usuario')

  const { titulo, descripcion,cantLikes,etiqueta,diasVisible,idUsuario } = req.body
  const fechaExp = new Date()
  fechaExp.setDate(fechaExp.getDate() + diasVisible)
  // sacar cantLikes, esta solo para probar
  const newPublicacion = new Publicacion({
    titulo,
    descripcion,
    idUsuario,
    cantLikes,
    etiqueta,
    estado: true,
    diasVisible,
    fechaExp
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
  }
  )

}

const getPublicaciones = (req, res) => {  //publicaciones activas y con margen de tiempo
    const now = new Date()
    now.setDate(now.getDate() - 7); //filtro de tiemppo ,segundo parametro son los dias anteriores
  Publicacion.find({
  estado:true, //comentar para que aparezcan todos mostrar solamente los activos
  fechaExp: { $gt:now } //fecha exp > hoy
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

Publicacion.find({
  etiqueta: " ", //se cambiara por la caja de texto del frontend
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

const deletePublicacion = (req, res) => { //puede pausar el admi y el usuario creador
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


const numPublicacionesActXUsuario = (idUsuario) => {

//console.log(idUsuario)
Publicacion.find({ idUsuario ,estado:true }, (err,cant)=>{ console.log(cant)})

//git

}
module.exports = {
  createPublicacion,
  getPublicaciones,
  updatePublicacion,
  deletePublicacion,
  getPublicacion,
  getPublicacionesporEtiqueta,
  numPublicacionesActXUsuario
}