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

const getUsuario = (req, res) => {
    Usuario.find().populate({ path: 'Category' }).exec((error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (usuario.length === 0) {
            return res.status(404).send({ message: "No se encontraron usuarios" })
        }
        return res.status(200).send(usuario)
    })
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

const deleteUsuario = (req,res) => {
    const { id } = req.params
    Usuario.findByIdAndDelete(id, req.body, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo eliminar al usuario" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro el usuario" })
        }
        return res.status(200).send({ message: "Usuario eliminado" })
    })

}

module.exports = {
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario
}