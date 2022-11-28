const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({

    //Usuario que comenta
    idUsuario:{
        type:Schema.Types.ObjectId,
        ref: 'usuario'
    },
    //publicación que recibe el comentario
    idPublicacion:{
        type:Schema.Types.ObjectId,
        ref: 'publicacion'
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    contenido:{
        type: String,
        required:true,
        minLength:1,
        maxLength:150
    },


})

module.exports = mongoose.model('comentario', comentarioSchema);