const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentariosSchema = new Schema({

    idUsuario:[{
        type:Schema.Types.ObjectId,
        ref: 'usuario'
    }],
    idPublicacion:[{
        type:Schema.Types.ObjectId,
        ref: 'publicacion'
    }],
    comentarios:{
        type: String,
        required:true,
        minLength:1,
        maxLength:200
    },


})

module.exports = mongoose.model('comentarios', comentariosSchema);