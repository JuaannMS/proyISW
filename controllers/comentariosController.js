const Comentarios = require('../models/comentarios');

const createComentario = (req , res) => {
const { idUsuario, idPublicacion, comentario} = req.body
const newComentarios = new Comentarios({
idUsuario,
idPublicacion,
comentario
})
newComentarios.save((error, comentario) => {
    if(error) {
        return res.status(400).send({ message: "No se pudo crear el comentario" +error })
    }
    return res.status(201).send(comentario)
})

}

module.exports = {
    createComentario
}