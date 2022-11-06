const Usuario = require('../models/usuario');

const createUsuario = (req,res) => {
    const {rut,nombre, direccion, fechaCumpleanio, correo, telefono, idPublicacion} = req.body
    const newUsuario = new Usuario({
        rut,
        nombre,
        direccion,
        fechaCumpleanio,
        correo,
        telefono,
        idPublicacion
    })
    newUsuario.save((error, usuario) => {
    if(error){
        return res.status(400).send({ message : "No se ha podido crear el usuario"})
    }
    return res.status(201).send(usuario)
    })

}

const getUsuario = (req,res) => {
    Usuario.findById({}, (error, usuarios) => {
        if(error){
            return res.status(400).send({message: "No se realizo la busqueda"})
        }
        if(usuarios.length == 0){
            return res.status(404).send({message: "No se han encontrado publicaciones"})
        }
            return res.status(200).send(usuarios)
        }
        )
    }
const updateUsuario = (req,res) => {
    const { id } = req.params
    Usuario.findByIdAndUpdate(id, req.body, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro el usuario" })
        }
        return res.status(200).send({ message: "Usuario modificado" })
    })

}

const deleteUsuario = (req, res) => {
    const { id } = req.params
    Usuario.findByIdAndDelete(id, req.body , (error, usuario) => {
      if(error){
        return res.status(400).send({ message: "No se pudo eliminar la publicacion"})
      }
      if(!Usuario){ // no existe "!"
        return res.status(404).send({ message: "No se encontro la publicacion"})
      }
      return res.status(200).send({ message : "Se elimino correctamente la publicacion"})
    }
    )
}
module.exports = {
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario,
}