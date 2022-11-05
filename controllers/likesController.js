const Likes = require('../models/likes');

const createLikes = (req , res) => {
const {idUsuario, idPublicacion} = req.body
const newLikes = new Likes({
idUsuario,
idPublicacion
})
newLikes.save((error, publicacion) => {
    if(error) {
        return res.status(400).send({ message: "No se pudo dar like" +error })
    }
    return res.status(201).send(likes)
})

}

module.exports = {
    createLikes
}