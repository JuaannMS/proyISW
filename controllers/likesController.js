const Likes = require('../models/likes');
const publicacion = require('../controllers/publicacionController');

const createLikes = (req , res) => {
const {idUsuario, idPublicacion} = req.body
const newLikes = new Likes({
idUsuario,
idPublicacion
})
newLikes.save((error, likes) => {
    if(error) {
        return res.status(400).send({ message: "No se pudo dar like" +error })
    }
    return res.status(201).send(likes)
})

publicacion.setLikes(idPublicacion);

}

const getLikes = (req,res) => {
    Likes.find({}, (error, like) => {
        if(error){
            return res.status(400).send({message: "No se realizó la busqueda"})
        }
        if(like.length == 0){
            return res.status(404).send({message: "No se han encontrado publicaciones"})
        }
            return res.status(200).send(like)
        }
        )
    }

module.exports = {
    createLikes,
    getLikes
}