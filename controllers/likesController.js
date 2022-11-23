const Likes = require('../models/likes');
const publicacion = require('../controllers/publicacionController');

const createLikes = (req , res) => {
const {idUsuario, idPublicacion} = req.body
const newLikes = new Likes({
idUsuario,
idPublicacion
})

if(null == Likes.find({
    idPublicacion : idPublicacion,
    idUsuario : idUsuario
    }))

{

    console.log("entro aca")
newLikes.save((error, Likes) => {
    if(error) {
        return res.status(400).send({ message: "No se pudo dar like" +error })
    }
    return res.status(201).send(Likes)
})
publicacion.setLikes(idPublicacion);

}
return res.status(400).send({ message: "Like repetido"})



}

const getLikes = (req,res) => {
    Likes.find({}, (error, likess) => {
        if(error){
            return res.status(400).send({message: "No se realizó la busqueda"})
        }
        if(likess.length == 0){
            return res.status(404).send({message: "No se han encontrado publicaciones"})
        }
            return res.status(200).send(likess)
        }
        )
    }

module.exports = {
    createLikes,
    getLikes
}