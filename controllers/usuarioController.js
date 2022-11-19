const Usuario = require('../models/usuario');

const createUsuario = (req, res) => {
    const { rut, nombre, direccion, fechaCumpleanio, correo, telefono, } = req.body
    const newUsuario = new Usuario({
        rut,
        nombre,
        direccion,
        fechaCumpleanio,
        correo,
        telefono,
    })
    newUsuario.save((error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear el usuario" })
        }
        return res.status(201).send(usuario)
    })

}

const getUsuarios = (req, res) => {
    Usuario.find({}, (error, usuarios) => {
        if (error) {
            return res.status(400).send({ message: "No se realizó la busqueda" })
        }
        if (usuarios.length == 0) {
            return res.status(404).send({ message: "No se han encontrado publicaciones" })
        }
        return res.status(200).send(usuarios)
    }
    )
}
const updateUsuario = (req, res) => {
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
    Usuario.findByIdAndDelete(id, req.body, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo eliminar la publicacion" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro la publicacion" })
        }
        return res.status(200).send({ message: "Se elimino correctamente la publicacion" })
    }
    )
}

const newFavorito = (req, res) => {
    const { id } = req.params
    const { idPublicacion } = req.body
    Usuario.findById(id, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo agregar el favorito" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro el usuario" })
        }
        if (usuario.idFavoritos.includes(idPublicacion)) {
            return res.status(400).send({ message: "Ya se encuentra en favoritos" })
        }


        Usuario.findByIdAndUpdate(id, { $push: { idFavoritos: idPublicacion } }, (error, usuario) => {
            if (error) {
                return res.status(400).send({ message: "No se pudo agregar el favorito" })
            }
            if (!usuario) {
                return res.status(404).send({ message: "No se encontro el usuario" })
            }
            return res.status(200).send({ message: "Favorito agregado" })
        })
    })
}

const deleteFavorito = (req, res) => {
    const { id } = req.params
    const { idPublicacion } = req.body
    Usuario.findByIdAndUpdate(id, { $pull: { idFavoritos: idPublicacion } }, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo eliminar el favorito" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro el usuario" })
        }
        if(!usuario.idFavoritos.includes(idPublicacion)){
            return res.status(400).send({message:"No se encontro el favorito"})
        }
        return res.status(200).send({ message: "Favorito eliminado" })
    })
}

const getFavoritos = (req, res) => {
    const { id } = req.params
    Usuario.findById(id, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo obtener los favoritos" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro el usuario" })
        }
        return res.status(200).send(usuario.idFavoritos)
    })
}

module.exports = {
    createUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    newFavorito,
    deleteFavorito,
    getFavoritos
}