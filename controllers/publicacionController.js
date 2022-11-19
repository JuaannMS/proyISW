//modelo de publicacion.js
const publicacion = require('../models/publicacion');
const Publicacion = require('../models/publicacion');

const createPublicacion = (req, res) => {
  const Usuario = require('../models/usuario')
  const { titulo, descripcion, idUsuario} = req.body
  const newPublicacion = new Publicacion({
    titulo,
    descripcion,
    idUsuario,

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

}

const getPublicaciones = (req, res) => {
  Publicacion.find({}, (error, publicaciones) => {
    if (error) {
      return res.status(400).send({ message: "No se realizo la busqueda" })
    }
    if (publicaciones.length == 0) {
      return res.status(404).send({ message: "No se han encontrado publicaciones" })
    }
    return res.status(200).send(publicaciones)
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
  Publicacion.findByIdAndDelete(id, req.body, (error, publicacion) => {
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
//git
module.exports = {
  createPublicacion,
  getPublicaciones,
  updatePublicacion,
  deletePublicacion,
  getPublicacion
}